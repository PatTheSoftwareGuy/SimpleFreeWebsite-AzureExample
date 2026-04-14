from __future__ import annotations

import json
import logging
import os
from pathlib import Path
import re
from typing import Any, Literal
from urllib.error import HTTPError, URLError
from urllib.request import Request as UrlRequest, urlopen

from fastapi import FastAPI, HTTPException, Request as FastAPIRequest
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.responses import RedirectResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from openai import APIStatusError, OpenAI
from pydantic import BaseModel, Field

from app.prompty_loader import load_prompty


logger = logging.getLogger("chat_backend")
if not logger.handlers:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
logger.setLevel(logging.INFO)


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str = Field(min_length=1, max_length=8000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


class ChatResponse(BaseModel):
    assistant_message: str
    model: str


def _load_agent_profile():
    app_root = Path(__file__).resolve().parents[1]
    default_path = app_root / "prompts" / "agent-plane-talk.prompty"

    configured_path = os.getenv("PROMPTY_PATH")
    candidates: list[Path] = []

    if configured_path:
        env_path = Path(configured_path)
        if env_path.is_absolute():
            candidates.append(env_path)
        else:
            candidates.append(app_root / env_path)
            candidates.append(Path.cwd() / env_path)

    candidates.append(default_path)

    prompty_path = next((candidate for candidate in candidates if candidate.exists()), None)
    if prompty_path is None:
        checked_paths = ", ".join(str(candidate) for candidate in candidates)
        raise RuntimeError(f"Unable to locate prompty file. Checked: {checked_paths}")

    return load_prompty(prompty_path)


def _resolve_api_credentials(profile_model: dict[str, object]) -> tuple[str | None, str | None]:
    connection = profile_model.get("connection")
    if not isinstance(connection, dict):
        return None, None

    endpoint = connection.get("endpoint")
    api_key = connection.get("apiKey")

    endpoint_text = str(endpoint).strip() if endpoint else None
    api_key_text = str(api_key).strip() if api_key else None
    return endpoint_text, api_key_text


def _build_client(profile_model: dict[str, object]) -> OpenAI:
    configured_endpoint, configured_api_key = _resolve_api_credentials(profile_model)
    api_key = configured_api_key or os.getenv("AIHORDE_API_KEY")
    if not api_key:
        raise RuntimeError("AIHORDE_API_KEY environment variable is required (or set model.connection.apiKey in .prompty).")

    base_url = configured_endpoint or os.getenv("AIHORDE_BASE_URL", "https://oai.aihorde.net/v1")
    return OpenAI(api_key=api_key, base_url=base_url)


def _tool_get_current_utc_time() -> str:
    from datetime import datetime, timezone

    return datetime.now(timezone.utc).isoformat()


def _tool_lookup_aviation_term(term: str) -> str:
    glossary = {
        "runway": "A defined rectangular area prepared for aircraft takeoff and landing.",
        "crosswind": "Wind blowing across the runway direction, which pilots must correct for during takeoff/landing.",
        "holding pattern": "A racetrack-shaped flight path flown while awaiting further clearance.",
        "final approach": "The last segment of an instrument approach before landing.",
        "taxi": "Aircraft movement on the ground under its own power, excluding takeoff and landing.",
    }
    key = term.strip().lower()
    if key in glossary:
        return glossary[key]
    return f"No glossary entry found for '{term}'."


def _build_tool_functions() -> dict[str, object]:
    return {
        "get_current_utc_time": _tool_get_current_utc_time,
        "lookup_aviation_term": _tool_lookup_aviation_term,
    }


def _mcp_json_rpc_call(endpoint: str, method: str, params: dict[str, object] | None = None) -> dict[str, object]:
    logger.info("mcp_jsonrpc_start method=%s endpoint=%s", method, endpoint)
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": method,
        "params": params or {},
    }

    request = UrlRequest(
        url=endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    timeout_seconds = int(os.getenv("MCP_HTTP_TIMEOUT_SECONDS", "20"))

    try:
        with urlopen(request, timeout=timeout_seconds) as response:
            response_text = response.read().decode("utf-8", errors="replace")
    except HTTPError as ex:
        response_text = ex.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"MCP HTTP error {ex.code} calling {method}: {response_text[:300]}") from ex
    except URLError as ex:
        raise RuntimeError(f"MCP network error calling {method}: {ex}") from ex

    try:
        body = json.loads(response_text)
    except json.JSONDecodeError as ex:
        raise RuntimeError(f"MCP returned non-JSON response for {method}: {response_text[:300]}") from ex

    if not isinstance(body, dict):
        raise RuntimeError(f"MCP returned invalid JSON-RPC payload for {method}: expected object")

    error = body.get("error")
    if isinstance(error, dict):
        message = str(error.get("message") or "Unknown MCP error")
        raise RuntimeError(f"MCP error calling {method}: {message}")

    result = body.get("result")
    if not isinstance(result, dict):
        raise RuntimeError(f"MCP returned invalid result for {method}: expected object")

    logger.info("mcp_jsonrpc_success method=%s endpoint=%s", method, endpoint)
    return result


def _stringify_mcp_tool_result(result: dict[str, object]) -> str:
    content = result.get("content")
    if isinstance(content, list):
        text_parts: list[str] = []
        for item in content:
            if not isinstance(item, dict):
                continue
            if str(item.get("type") or "") != "text":
                continue
            text = item.get("text")
            if text:
                text_parts.append(str(text))

        if text_parts:
            return "\n".join(text_parts).strip()

    return json.dumps(result, ensure_ascii=True)


def _make_mcp_tool_function(endpoint: str, tool_name: str):
    def _call_mcp_tool(**kwargs) -> str:
        result = _mcp_json_rpc_call(
            endpoint=endpoint,
            method="tools/call",
            params={
                "name": tool_name,
                "arguments": kwargs,
            },
        )
        return _stringify_mcp_tool_result(result)

    return _call_mcp_tool


def _build_mcp_tools(profile: dict[str, object]) -> tuple[list[dict[str, object]], dict[str, object]]:
    mcp_tools: list[dict[str, object]] = []
    mcp_functions: dict[str, object] = {}

    raw_servers = profile.get("mcp_servers")
    if not isinstance(raw_servers, list):
        return mcp_tools, mcp_functions

    for raw_server in raw_servers:
        if not isinstance(raw_server, dict):
            continue

        endpoint = str(raw_server.get("endpoint") or "").strip()
        if not endpoint:
            continue

        allowed_tools_raw = raw_server.get("allowed_tools")
        allowed_tools = (
            {str(name).strip() for name in allowed_tools_raw if str(name).strip()}
            if isinstance(allowed_tools_raw, list)
            else set()
        )

        try:
            result = _mcp_json_rpc_call(endpoint=endpoint, method="tools/list")
        except Exception as ex:
            logger.warning("mcp_tools_list_failed endpoint=%s error=%s", endpoint, ex)
            continue

        tools = result.get("tools")
        if not isinstance(tools, list):
            continue

        for tool in tools:
            if not isinstance(tool, dict):
                continue

            name = str(tool.get("name") or "").strip()
            if not name:
                continue
            if allowed_tools and name not in allowed_tools:
                continue
            if name in mcp_functions:
                continue

            description = str(tool.get("description") or "").strip()
            input_schema = tool.get("inputSchema") if isinstance(tool.get("inputSchema"), dict) else {}
            parameters = input_schema if input_schema else {"type": "object", "properties": {}}

            mcp_tools.append(
                {
                    "type": "function",
                    "function": {
                        "name": name,
                        "description": description,
                        "parameters": parameters,
                    },
                }
            )
            mcp_functions[name] = _make_mcp_tool_function(endpoint=endpoint, tool_name=name)
            logger.info("mcp_tool_registered endpoint=%s tool=%s", endpoint, name)

    return mcp_tools, mcp_functions


_WEATHER_INTENT_EXPR = re.compile(
    r"\b(weather|forecast|temperature|rain|snow|wind|humidity|precipitation|storm|sunny|cloudy)\b",
    flags=re.IGNORECASE,
)
_WEATHER_CITY_STATE_EXPR = re.compile(r"\b(?:in|for)\s+([A-Za-z .'-]+?)(?:,\s*|\s+)([A-Za-z]{2})\b", flags=re.IGNORECASE)
_WEATHER_DAYS_EXPR = re.compile(r"\b(\d{1,2})\s*(?:day|days)\b", flags=re.IGNORECASE)


def _latest_user_message(messages: list[dict[str, str]]) -> str:
    for msg in reversed(messages):
        if msg.get("role") == "user":
            return str(msg.get("content") or "")
    return ""


def _is_weather_intent(text: str) -> bool:
    return bool(_WEATHER_INTENT_EXPR.search(text or ""))


def _extract_weather_args(text: str) -> dict[str, object] | None:
    if not text:
        return None

    city = ""
    state = ""
    match = _WEATHER_CITY_STATE_EXPR.search(text)
    if match:
        city = match.group(1).strip(" ,")
        state = match.group(2).strip().upper()

    if not city or not state:
        return None

    days = 3
    days_match = _WEATHER_DAYS_EXPR.search(text)
    if days_match:
        try:
            parsed_days = int(days_match.group(1))
            if 1 <= parsed_days <= 7:
                days = parsed_days
        except ValueError:
            days = 3

    return {
        "city": city,
        "state": state,
        "days": days,
    }


def _supports_model_tool_calling(base_url: str) -> bool:
    force_disable = os.getenv("DISABLE_MODEL_TOOL_CALLING", "").strip().lower() in {"1", "true", "yes", "on"}
    if force_disable:
        return False

    # AI Horde OpenAPI schema for /v1/chat/completions does not include tools/tool_choice.
    if "oai.aihorde.net" in base_url.lower():
        return False

    return True


def _is_aihorde_base_url(base_url: str) -> bool:
    return "oai.aihorde.net" in (base_url or "").lower()


def _normalize_model_name(candidate: str, fallback_model: str) -> str:
    text = (candidate or "").strip()
    if not text or text.lower() in {"none", "null"}:
        return fallback_model
    return text


def _estimate_text_tokens(text: str) -> int:
    # Lightweight approximation: ~4 characters per token for English text.
    if not text:
        return 0
    return max(1, (len(text) + 3) // 4)


def _estimate_prompt_tokens_from_messages(messages: list[dict[str, Any]]) -> int:
    total = 0
    for message in messages:
        role = str(message.get("role") or "")
        content = message.get("content")
        if isinstance(content, str):
            content_text = content
        elif content is None:
            content_text = ""
        else:
            content_text = json.dumps(content, ensure_ascii=True)

        total += 4
        total += _estimate_text_tokens(role)
        total += _estimate_text_tokens(content_text)

        tool_calls = message.get("tool_calls")
        if tool_calls is not None:
            total += _estimate_text_tokens(json.dumps(tool_calls, ensure_ascii=True))

        tool_call_id = message.get("tool_call_id")
        if tool_call_id is not None:
            total += _estimate_text_tokens(str(tool_call_id))

    # Small assistant priming overhead for chat format.
    return total + 2


def _truncate_at_end_of_text(text: str) -> str:
    marker = "<|end_of_text|>"
    idx = text.find(marker)
    if idx < 0:
        return text
    return text[:idx]


def _build_completion_call_kwargs(
    *,
    context: dict[str, Any],
    outbound_messages: list[dict[str, Any]],
    stream: bool,
) -> dict[str, object]:
    completion_kwargs = context["completion_kwargs"]
    tools = context["tools"]
    forced_tool_choice = context.get("forced_tool_choice")
    model_tools_supported = bool(context.get("model_tools_supported", True))
    is_aihorde = bool(context.get("is_aihorde", False))

    fallback_model = "openai/gpt-oss-20b"
    model = _normalize_model_name(str(completion_kwargs.get("model") or ""), fallback_model)

    call_kwargs: dict[str, object] = {
        "messages": outbound_messages,
        "model": model,
    }

    temperature = completion_kwargs.get("temperature")
    if isinstance(temperature, (int, float)):
        call_kwargs["temperature"] = float(temperature)

    max_tokens = completion_kwargs.get("max_tokens")
    if isinstance(max_tokens, int) and max_tokens > 0:
        call_kwargs["max_tokens"] = max_tokens

    if stream:
        call_kwargs["stream"] = True

    if not is_aihorde:
        for key, value in completion_kwargs.items():
            if key in {"model", "temperature", "max_tokens", "stream"}:
                continue
            call_kwargs[key] = value

    if model_tools_supported and tools:
        call_kwargs["tools"] = tools
    if forced_tool_choice:
        call_kwargs["tool_choice"] = forced_tool_choice

    return call_kwargs


def _extract_text_response_from_payload(payload: dict[str, object]) -> dict[str, object]:
    choices = payload.get("choices")
    if not isinstance(choices, list) or not choices:
        return {
            "finish_reason": "stop",
            "content": "",
            "tool_calls": [],
        }

    first_choice = choices[0]
    if not isinstance(first_choice, dict):
        return {
            "finish_reason": "stop",
            "content": "",
            "tool_calls": [],
        }

    message = first_choice.get("message")
    content = ""
    if isinstance(message, dict):
        content = str(message.get("content") or "")

    return {
        "finish_reason": str(first_choice.get("finish_reason") or "stop"),
        "content": content,
        "tool_calls": [],
    }


def _post_json(url: str, payload: dict[str, object], headers: dict[str, str], timeout_seconds: int) -> tuple[int, str]:
    request = UrlRequest(
        url=url,
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    try:
        with urlopen(request, timeout=timeout_seconds) as response:
            return int(response.status), response.read().decode("utf-8", errors="replace")
    except HTTPError as ex:
        return int(ex.code), ex.read().decode("utf-8", errors="replace")


def _get_json(url: str, headers: dict[str, str], timeout_seconds: int) -> tuple[int, str]:
    request = UrlRequest(url=url, headers=headers, method="GET")
    try:
        with urlopen(request, timeout=timeout_seconds) as response:
            return int(response.status), response.read().decode("utf-8", errors="replace")
    except HTTPError as ex:
        return int(ex.code), ex.read().decode("utf-8", errors="replace")


def _build_aihorde_headers(api_key: str | None) -> dict[str, str]:
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    return headers


def _list_aihorde_models(base_url: str, api_key: str | None) -> list[str]:
    timeout_seconds = int(os.getenv("AIHORDE_HTTP_TIMEOUT_SECONDS", "60"))
    models_url = f"{base_url.rstrip('/')}/models"
    status_code, body_text = _get_json(models_url, _build_aihorde_headers(api_key), timeout_seconds)
    if status_code != 200:
        return []

    try:
        payload = json.loads(body_text)
    except json.JSONDecodeError:
        return []

    data = payload.get("data") if isinstance(payload, dict) else None
    if not isinstance(data, list):
        return []

    known: list[str] = []
    unknown: list[str] = []
    for item in data:
        if not isinstance(item, dict):
            continue
        model_id = str(item.get("id") or "").strip()
        if not model_id:
            continue
        if bool(item.get("known_to_horde", False)):
            known.append(model_id)
        else:
            unknown.append(model_id)

    return known or unknown


def _choose_aihorde_fallback_model(current_model: str, available_models: list[str]) -> str | None:
    if not available_models:
        return None

    preferred = os.getenv("AIHORDE_FALLBACK_MODEL", "").strip()
    if preferred and preferred in available_models:
        return preferred

    if current_model in available_models:
        return current_model

    return available_models[0]


def _aihorde_chat_completion(
    *,
    base_url: str,
    api_key: str | None,
    model: str,
    messages: list[dict[str, Any]],
    temperature: float | None,
    max_tokens: int | None,
) -> dict[str, object]:
    timeout_seconds = int(os.getenv("AIHORDE_HTTP_TIMEOUT_SECONDS", "60"))
    url = f"{base_url.rstrip('/')}/chat/completions"

    request_payload: dict[str, object] = {
        "messages": messages,
        "model": model,
        "stream": False,
    }
    if isinstance(temperature, (int, float)):
        request_payload["temperature"] = float(temperature)
    if isinstance(max_tokens, int) and max_tokens > 0:
        request_payload["max_tokens"] = max_tokens

    estimated_prompt_tokens = _estimate_prompt_tokens_from_messages(messages)
    logger.info(
        "llm_request provider=aihorde model=%s stream=false estimated_prompt_tokens=%s",
        model,
        estimated_prompt_tokens,
    )

    headers = _build_aihorde_headers(api_key)
    status_code, body_text = _post_json(url, request_payload, headers, timeout_seconds)

    def _try_parse(text: str) -> dict[str, object]:
        try:
            parsed = json.loads(text)
            return parsed if isinstance(parsed, dict) else {}
        except json.JSONDecodeError:
            return {}

    payload = _try_parse(body_text)
    if status_code == 200:
        return _extract_text_response_from_payload(payload)

    detail = str(payload.get("detail") or body_text)
    if status_code == 406:
        available_models = _list_aihorde_models(base_url, api_key)
        fallback_model = _choose_aihorde_fallback_model(model, available_models)
        if fallback_model and fallback_model != model:
            logger.warning("aihorde_model_retry old_model=%s fallback_model=%s", model, fallback_model)
            retry_payload = dict(request_payload)
            retry_payload["model"] = fallback_model
            logger.info(
                "llm_request provider=aihorde model=%s stream=false estimated_prompt_tokens=%s retry=true",
                fallback_model,
                estimated_prompt_tokens,
            )
            retry_status, retry_body = _post_json(url, retry_payload, headers, timeout_seconds)
            retry_json = _try_parse(retry_body)
            if retry_status == 200:
                return _extract_text_response_from_payload(retry_json)
            raise RuntimeError(f"AI Horde completion failed ({retry_status}): {retry_json.get('detail') or retry_body[:300]}")

    raise RuntimeError(f"AI Horde completion failed ({status_code}): {detail}")


def _consume_streamed_completion(stream) -> dict[str, object]:
    content_parts: list[str] = []
    tool_calls_by_index: dict[int, dict[str, object]] = {}
    finish_reason: str | None = None

    for chunk in stream:
        if not chunk.choices:
            continue

        choice = chunk.choices[0]
        finish_reason = choice.finish_reason or finish_reason
        delta = choice.delta
        if not delta:
            continue

        if delta.content:
            content_parts.append(delta.content)

        delta_tool_calls = delta.tool_calls or []
        for tool_call in delta_tool_calls:
            idx = tool_call.index if tool_call.index is not None else 0
            existing = tool_calls_by_index.setdefault(
                idx,
                {
                    "id": "",
                    "type": "function",
                    "function": {"name": "", "arguments": ""},
                },
            )

            if tool_call.id:
                existing["id"] = tool_call.id

            fn = tool_call.function
            if fn and fn.name:
                existing["function"]["name"] = fn.name
            if fn and fn.arguments:
                existing["function"]["arguments"] += fn.arguments

    tool_calls = [tool_calls_by_index[idx] for idx in sorted(tool_calls_by_index)]

    if finish_reason is None:
        finish_reason = "tool_calls" if tool_calls else "stop"

    return {
        "finish_reason": finish_reason,
        "content": "".join(content_parts),
        "tool_calls": tool_calls,
    }


def _consume_streamed_completion_with_deltas(stream):
    content_parts: list[str] = []
    tool_calls_by_index: dict[int, dict[str, object]] = {}
    finish_reason: str | None = None

    for chunk in stream:
        if not chunk.choices:
            continue

        choice = chunk.choices[0]
        finish_reason = choice.finish_reason or finish_reason
        delta = choice.delta
        if not delta:
            continue

        if delta.content:
            content_parts.append(delta.content)
            yield {
                "type": "delta",
                "content": delta.content,
            }

        delta_tool_calls = delta.tool_calls or []
        for tool_call in delta_tool_calls:
            idx = tool_call.index if tool_call.index is not None else 0
            existing = tool_calls_by_index.setdefault(
                idx,
                {
                    "id": "",
                    "type": "function",
                    "function": {"name": "", "arguments": ""},
                },
            )

            if tool_call.id:
                existing["id"] = tool_call.id

            fn = tool_call.function
            if fn and fn.name:
                existing["function"]["name"] = fn.name
            if fn and fn.arguments:
                existing["function"]["arguments"] += fn.arguments

    tool_calls = [tool_calls_by_index[idx] for idx in sorted(tool_calls_by_index)]

    if finish_reason is None:
        finish_reason = "tool_calls" if tool_calls else "stop"

    yield {
        "type": "final",
        "finish_reason": finish_reason,
        "content": "".join(content_parts),
        "tool_calls": tool_calls,
    }


def _normalize_completion(completion) -> dict[str, object]:
    choice = completion.choices[0]
    message = choice.message

    tool_calls: list[dict[str, object]] = []
    raw_calls = message.tool_calls or []
    for call in raw_calls:
        function_block = call.function
        tool_calls.append(
            {
                "id": call.id,
                "type": "function",
                "function": {
                    "name": function_block.name if function_block else "",
                    "arguments": function_block.arguments if function_block else "{}",
                },
            }
        )

    return {
        "finish_reason": choice.finish_reason or "stop",
        "content": message.content or "",
        "tool_calls": tool_calls,
    }


def _execute_tool_call(tool_call: dict[str, object], tool_functions: dict[str, object]) -> tuple[str, str]:
    tool_call_id = str(tool_call.get("id") or "")
    function_block = tool_call.get("function")
    if not isinstance(function_block, dict):
        return tool_call_id, "Error: malformed tool call payload"

    tool_name = str(function_block.get("name") or "")
    raw_arguments = str(function_block.get("arguments") or "{}")
    logger.info("tool_call_received tool=%s raw_args=%s", tool_name, raw_arguments)

    if tool_name not in tool_functions:
        return tool_call_id, f"Error: tool '{tool_name}' not found in tools dict"

    tool_fn = tool_functions[tool_name]

    try:
        parsed_args = json.loads(raw_arguments) if raw_arguments.strip() else {}
        if not isinstance(parsed_args, dict):
            return tool_call_id, "Error parsing arguments: top-level JSON must be an object"
    except json.JSONDecodeError as ex:
        return tool_call_id, f"Error parsing arguments: {ex}"

    try:
        result = tool_fn(**parsed_args)
        logger.info("tool_call_success tool=%s", tool_name)
        return tool_call_id, str(result)
    except Exception as ex:
        logger.warning("tool_call_failure tool=%s error=%s", tool_name, ex)
        return tool_call_id, f"Error executing {tool_name}: {ex}"


def _resolve_agent_request_context(request: ChatRequest) -> dict[str, Any]:
    profile = _load_agent_profile()
    client = _build_client(profile.model)

    configured_model = os.getenv("AIHORDE_MODEL")
    profile_model = str(profile.model.get("id") or "").strip()
    fallback_model = "openai/gpt-oss-20b"
    model = profile_model or (
        configured_model.strip() if configured_model and configured_model.strip().lower() != "none" else fallback_model
    )
    model = _normalize_model_name(model, fallback_model)

    outbound_messages = [{"role": "system", "content": profile.system_prompt}]
    outbound_messages.extend(profile.few_shot_messages)
    for msg in request.messages:
        if msg.role in {"user", "assistant"}:
            outbound_messages.append({"role": msg.role, "content": msg.content})

    latest_user_text = _latest_user_message(outbound_messages)

    model_temperature = profile.model.get("temperature")
    temperature = float(model_temperature) if isinstance(model_temperature, (int, float)) else 0.7
    max_output_tokens = profile.model.get("max_output_tokens")
    additional_properties = profile.model.get("additional_properties")

    completion_kwargs: dict[str, object] = {
        "model": model,
        "temperature": temperature,
    }
    if isinstance(max_output_tokens, int) and max_output_tokens > 0:
        completion_kwargs["max_tokens"] = max_output_tokens
    if isinstance(additional_properties, dict):
        completion_kwargs.update(additional_properties)

    tools = list(profile.tools)
    tool_functions = _build_tool_functions()

    mcp_tools, mcp_functions = _build_mcp_tools({"mcp_servers": profile.mcp_servers})
    if mcp_tools:
        tools.extend(mcp_tools)
    if mcp_functions:
        tool_functions.update(mcp_functions)

    tool_names = {
        str(tool.get("function", {}).get("name") or "")
        for tool in tools
        if isinstance(tool, dict) and isinstance(tool.get("function"), dict)
    }
    if "get_weather_forecast" in tool_names:
        outbound_messages.append(
            {
                "role": "system",
                "content": (
                    "Tool policy: For weather requests (current weather or forecast), call get_weather_forecast "
                    "before answering. Do not guess weather values from memory. If city or state is missing, ask "
                    "a concise follow-up question."
                ),
            }
        )

    base_url = str(getattr(client, "base_url", "") or "")
    is_aihorde = _is_aihorde_base_url(base_url)
    configured_endpoint, configured_api_key = _resolve_api_credentials(profile.model)
    aihorde_api_key = configured_api_key or os.getenv("AIHORDE_API_KEY")
    aihorde_base_url = configured_endpoint or os.getenv("AIHORDE_BASE_URL", "https://oai.aihorde.net/v1")
    model_tools_supported = _supports_model_tool_calling(base_url)
    force_weather_tool = os.getenv("FORCE_WEATHER_TOOL", "true").strip().lower() in {"1", "true", "yes", "on"}
    weather_intent = _is_weather_intent(latest_user_text)
    forced_tool_choice: dict[str, object] | None = None
    if model_tools_supported and force_weather_tool and weather_intent and "get_weather_forecast" in tool_names:
        forced_tool_choice = {
            "type": "function",
            "function": {"name": "get_weather_forecast"},
        }

    direct_response: str | None = None
    if weather_intent and not model_tools_supported and "get_weather_forecast" in tool_functions:
        weather_args = _extract_weather_args(latest_user_text)
        if weather_args is None:
            direct_response = (
                "Agent Plane Talk requesting a holding pattern: please include city and 2-letter state "
                "(for example: Chicago IL) so I can pull a live forecast."
            )
        else:
            try:
                direct_response = str(tool_functions["get_weather_forecast"](**weather_args))
            except Exception as ex:
                direct_response = (
                    "Agent Plane Talk attempted a weather tool call but hit turbulence: "
                    f"{ex}"
                )

    logger.info(
        "chat_context model=%s tools=%s weather_tool_present=%s weather_intent=%s force_weather_tool=%s model_tools_supported=%s",
        model,
        sorted(name for name in tool_names if name),
        "get_weather_forecast" in tool_names,
        weather_intent,
        force_weather_tool,
        model_tools_supported,
    )

    max_iterations = int(os.getenv("AGENT_MAX_ITERATIONS", str(profile.max_iterations or 10)))
    if max_iterations <= 0:
        max_iterations = 10

    stream_requested = isinstance(additional_properties, dict) and bool(additional_properties.get("stream", False))

    return {
        "client": client,
        "model": model,
        "outbound_messages": outbound_messages,
        "completion_kwargs": completion_kwargs,
        "tools": tools,
        "tool_functions": tool_functions,
        "max_iterations": max_iterations,
        "stream_requested": stream_requested,
        "forced_tool_choice": forced_tool_choice,
        "model_tools_supported": model_tools_supported,
        "is_aihorde": is_aihorde,
        "aihorde_base_url": aihorde_base_url,
        "aihorde_api_key": aihorde_api_key,
        "direct_response": direct_response,
    }


def _run_agent_non_stream_or_buffered(context: dict[str, Any], force_stream: bool) -> str:
    client = context["client"]
    outbound_messages = context["outbound_messages"]
    completion_kwargs = context["completion_kwargs"]
    tool_functions = context["tool_functions"]
    max_iterations = context["max_iterations"]
    stream_requested = bool(context["stream_requested"]) or force_stream
    direct_response = context.get("direct_response")

    if isinstance(direct_response, str) and direct_response.strip():
        logger.info("chat_direct_response_used mode=non_stream")
        return direct_response.strip()

    if bool(context.get("is_aihorde", False)) and not bool(context.get("model_tools_supported", True)):
        try:
            completion = _aihorde_chat_completion(
                base_url=str(context.get("aihorde_base_url") or "https://oai.aihorde.net/v1"),
                api_key=str(context.get("aihorde_api_key") or "") or None,
                model=str(completion_kwargs.get("model") or "openai/gpt-oss-20b"),
                messages=outbound_messages,
                temperature=float(completion_kwargs.get("temperature")) if isinstance(completion_kwargs.get("temperature"), (int, float)) else None,
                max_tokens=int(completion_kwargs.get("max_tokens")) if isinstance(completion_kwargs.get("max_tokens"), int) else None,
            )
            text = _truncate_at_end_of_text(str(completion.get("content") or "")).strip()
            if text:
                return text
        except Exception as ex:
            logger.warning("aihorde_completion_failed_non_stream error=%s", ex)

        return "Agent Plane Talk hit turbulence with the model service. Please retry in a moment."

    answer = ""
    for _ in range(max_iterations):
        call_kwargs = _build_completion_call_kwargs(
            context=context,
            outbound_messages=outbound_messages,
            stream=stream_requested,
        )
        estimated_prompt_tokens = _estimate_prompt_tokens_from_messages(outbound_messages)
        logger.info(
            "llm_request provider=openai_compatible model=%s stream=%s estimated_prompt_tokens=%s",
            call_kwargs.get("model"),
            bool(call_kwargs.get("stream", False)),
            estimated_prompt_tokens,
        )

        if stream_requested:
            try:
                stream = client.chat.completions.create(**call_kwargs)
                normalized = _consume_streamed_completion(stream)
            except APIStatusError as ex:
                if int(getattr(ex, "status_code", 0) or 0) != 406:
                    raise
                logger.warning("model_stream_406_fallback_to_non_stream status=%s", getattr(ex, "status_code", "unknown"))
                retry_kwargs = {k: v for k, v in call_kwargs.items() if k != "stream"}
                try:
                    completion = client.chat.completions.create(**retry_kwargs)
                    normalized = _normalize_completion(completion)
                except APIStatusError as retry_ex:
                    if int(getattr(retry_ex, "status_code", 0) or 0) != 406:
                        raise
                    logger.warning("model_non_stream_406_final_fallback status=%s", getattr(retry_ex, "status_code", "unknown"))
                    return "Agent Plane Talk hit turbulence with the model service. Please retry in a moment."
        else:
            try:
                completion = client.chat.completions.create(**call_kwargs)
                normalized = _normalize_completion(completion)
            except APIStatusError as ex:
                if int(getattr(ex, "status_code", 0) or 0) != 406:
                    raise
                logger.warning("model_non_stream_406_final_fallback status=%s", getattr(ex, "status_code", "unknown"))
                return "Agent Plane Talk hit turbulence with the model service. Please retry in a moment."

        tool_calls = normalized.get("tool_calls", [])
        finish_reason = str(normalized.get("finish_reason") or "")
        logger.info("model_turn_result finish_reason=%s tool_calls=%s", finish_reason, len(tool_calls) if isinstance(tool_calls, list) else 0)

        if finish_reason != "tool_calls" or not isinstance(tool_calls, list) or not tool_calls:
            answer = _truncate_at_end_of_text(str(normalized.get("content") or ""))
            break

        outbound_messages.append({"role": "assistant", "tool_calls": tool_calls, "content": None})
        for tool_call in tool_calls:
            if not isinstance(tool_call, dict):
                continue
            tool_call_id, tool_result = _execute_tool_call(tool_call, tool_functions)
            outbound_messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tool_call_id,
                    "content": tool_result,
                }
            )
    else:
        raise HTTPException(status_code=500, detail=f"Agent loop exceeded max_iterations ({max_iterations})")

    return answer


def _sse_event(event_name: str, payload: dict[str, object]) -> str:
    return f"event: {event_name}\ndata: {json.dumps(payload)}\n\n"


app = FastAPI(title="Simple Chat Bubble API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = Path(__file__).resolve().parents[1] / "static"
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


@app.get("/", include_in_schema=False)
def root_redirect() -> RedirectResponse:
    return RedirectResponse(url="/static/test-host.html")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: FastAPIRequest, exc: RequestValidationError):
    logger.warning("request_validation_failed path=%s errors=%s", request.url.path, exc.errors())
    return JSONResponse(status_code=422, content={"detail": exc.errors()})


@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    try:
        logger.info("chat_request_start endpoint=/api/chat messages=%s", len(request.messages))
        context = _resolve_agent_request_context(request)
        model = str(context["model"])
        answer = _run_agent_non_stream_or_buffered(context, force_stream=False)

        if not answer.strip():
            raise HTTPException(status_code=502, detail="Model response was empty.")

        response = ChatResponse(assistant_message=answer.strip(), model=model)
        logger.info("chat_request_success endpoint=/api/chat model=%s", model)
        return response
    except HTTPException:
        raise
    except Exception as ex:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Chat request failed: {ex}") from ex


@app.post("/api/chat/stream")
def chat_stream(request: ChatRequest) -> StreamingResponse:
    def event_generator():
        try:
            logger.info("chat_stream_start endpoint=/api/chat/stream messages=%s", len(request.messages))
            context = _resolve_agent_request_context(request)
            client = context["client"]
            model = str(context["model"])
            outbound_messages = context["outbound_messages"]
            completion_kwargs = context["completion_kwargs"]
            tool_functions = context["tool_functions"]
            max_iterations = context["max_iterations"]
            direct_response = context.get("direct_response")

            if isinstance(direct_response, str) and direct_response.strip():
                logger.info("chat_direct_response_used mode=stream")
                yield _sse_event("start", {"model": model})
                yield _sse_event("done", {"assistant_message": direct_response.strip(), "model": model})
                return

            if bool(context.get("is_aihorde", False)) and not bool(context.get("model_tools_supported", True)):
                assistant_message = ""
                try:
                    completion = _aihorde_chat_completion(
                        base_url=str(context.get("aihorde_base_url") or "https://oai.aihorde.net/v1"),
                        api_key=str(context.get("aihorde_api_key") or "") or None,
                        model=str(completion_kwargs.get("model") or "openai/gpt-oss-20b"),
                        messages=outbound_messages,
                        temperature=float(completion_kwargs.get("temperature")) if isinstance(completion_kwargs.get("temperature"), (int, float)) else None,
                        max_tokens=int(completion_kwargs.get("max_tokens")) if isinstance(completion_kwargs.get("max_tokens"), int) else None,
                    )
                    assistant_message = _truncate_at_end_of_text(str(completion.get("content") or "")).strip()
                except Exception as ex:
                    logger.warning("aihorde_completion_failed_stream error=%s", ex)

                if not assistant_message:
                    assistant_message = "Agent Plane Talk hit turbulence with the model service. Please retry in a moment."
                yield _sse_event("start", {"model": model})
                yield _sse_event("done", {"assistant_message": assistant_message, "model": model})
                return

            yield _sse_event("start", {"model": model})

            answer_parts: list[str] = []
            emitted_text_len = 0
            saw_end_of_text = False
            for _ in range(max_iterations):
                call_kwargs = _build_completion_call_kwargs(
                    context=context,
                    outbound_messages=outbound_messages,
                    stream=True,
                )
                estimated_prompt_tokens = _estimate_prompt_tokens_from_messages(outbound_messages)
                logger.info(
                    "llm_request provider=openai_compatible model=%s stream=%s estimated_prompt_tokens=%s",
                    call_kwargs.get("model"),
                    bool(call_kwargs.get("stream", False)),
                    estimated_prompt_tokens,
                )

                normalized: dict[str, object] | None = None
                try:
                    stream = client.chat.completions.create(**call_kwargs)

                    for item in _consume_streamed_completion_with_deltas(stream):
                        if item.get("type") == "delta":
                            delta = str(item.get("content") or "")
                            if delta and not saw_end_of_text:
                                answer_parts.append(delta)
                                visible_text = _truncate_at_end_of_text("".join(answer_parts))
                                if len(visible_text) < len("".join(answer_parts)):
                                    saw_end_of_text = True
                                if len(visible_text) > emitted_text_len:
                                    next_delta = visible_text[emitted_text_len:]
                                    emitted_text_len = len(visible_text)
                                    yield _sse_event("delta", {"content": next_delta})
                        elif item.get("type") == "final":
                            normalized = item
                except APIStatusError as ex:
                    if int(getattr(ex, "status_code", 0) or 0) != 406:
                        raise
                    logger.warning("chat_stream_406_fallback_to_non_stream status=%s", getattr(ex, "status_code", "unknown"))
                    retry_kwargs = {k: v for k, v in call_kwargs.items() if k != "stream"}
                    try:
                        completion = client.chat.completions.create(**retry_kwargs)
                        normalized = _normalize_completion(completion)
                        retry_content = _truncate_at_end_of_text(str(normalized.get("content") or ""))
                        if retry_content:
                            answer_parts = [retry_content]
                            emitted_text_len = len(retry_content)
                    except APIStatusError as retry_ex:
                        if int(getattr(retry_ex, "status_code", 0) or 0) != 406:
                            raise
                        logger.warning("chat_stream_non_stream_406_final_fallback status=%s", getattr(retry_ex, "status_code", "unknown"))
                        fallback_text = "Agent Plane Talk hit turbulence with the model service. Please retry in a moment."
                        yield _sse_event("done", {"assistant_message": fallback_text, "model": model})
                        return

                if normalized is None:
                    raise RuntimeError("Stream ended without a final payload.")

                tool_calls = normalized.get("tool_calls", [])
                finish_reason = str(normalized.get("finish_reason") or "")
                logger.info(
                    "chat_stream_turn model=%s finish_reason=%s tool_calls=%s",
                    model,
                    finish_reason,
                    len(tool_calls) if isinstance(tool_calls, list) else 0,
                )

                if finish_reason != "tool_calls" or not isinstance(tool_calls, list) or not tool_calls:
                    break

                outbound_messages.append({"role": "assistant", "tool_calls": tool_calls, "content": None})
                for tool_call in tool_calls:
                    if not isinstance(tool_call, dict):
                        continue
                    tool_call_id, tool_result = _execute_tool_call(tool_call, tool_functions)
                    outbound_messages.append(
                        {
                            "role": "tool",
                            "tool_call_id": tool_call_id,
                            "content": tool_result,
                        }
                    )
            else:
                raise RuntimeError(f"Agent loop exceeded max_iterations ({max_iterations})")

            assistant_message = "".join(answer_parts).strip()
            assistant_message = _truncate_at_end_of_text(assistant_message).strip()
            if not assistant_message:
                raise RuntimeError("Model response was empty.")

            logger.info("chat_stream_success endpoint=/api/chat/stream model=%s", model)
            yield _sse_event("done", {"assistant_message": assistant_message, "model": model})
        except Exception as ex:
            logger.exception("chat_stream_failure endpoint=/api/chat/stream")
            yield _sse_event("error", {"message": f"Chat stream failed: {ex}"})

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
