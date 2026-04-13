from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from pydantic import BaseModel, Field

from app.prompty_loader import load_prompty


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
        return tool_call_id, str(result)
    except Exception as ex:
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

    outbound_messages = [{"role": "system", "content": profile.system_prompt}]
    outbound_messages.extend(profile.few_shot_messages)
    for msg in request.messages:
        if msg.role in {"user", "assistant"}:
            outbound_messages.append({"role": msg.role, "content": msg.content})

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

    tools = profile.tools
    tool_functions = _build_tool_functions()

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
    }


def _run_agent_non_stream_or_buffered(context: dict[str, Any], force_stream: bool) -> str:
    client = context["client"]
    outbound_messages = context["outbound_messages"]
    completion_kwargs = context["completion_kwargs"]
    tools = context["tools"]
    tool_functions = context["tool_functions"]
    max_iterations = context["max_iterations"]
    stream_requested = bool(context["stream_requested"]) or force_stream

    answer = ""
    for _ in range(max_iterations):
        call_kwargs = {"messages": outbound_messages, **completion_kwargs}
        if tools:
            call_kwargs["tools"] = tools

        if stream_requested:
            call_kwargs["stream"] = True
            stream = client.chat.completions.create(**call_kwargs)
            normalized = _consume_streamed_completion(stream)
        else:
            completion = client.chat.completions.create(**call_kwargs)
            normalized = _normalize_completion(completion)

        tool_calls = normalized.get("tool_calls", [])
        finish_reason = str(normalized.get("finish_reason") or "")

        if finish_reason != "tool_calls" or not isinstance(tool_calls, list) or not tool_calls:
            answer = str(normalized.get("content") or "")
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


@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    try:
        context = _resolve_agent_request_context(request)
        model = str(context["model"])
        answer = _run_agent_non_stream_or_buffered(context, force_stream=False)

        if not answer.strip():
            raise HTTPException(status_code=502, detail="Model response was empty.")

        return ChatResponse(assistant_message=answer.strip(), model=model)
    except HTTPException:
        raise
    except Exception as ex:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Chat request failed: {ex}") from ex


@app.post("/api/chat/stream")
def chat_stream(request: ChatRequest) -> StreamingResponse:
    def event_generator():
        try:
            context = _resolve_agent_request_context(request)
            client = context["client"]
            model = str(context["model"])
            outbound_messages = context["outbound_messages"]
            completion_kwargs = context["completion_kwargs"]
            tools = context["tools"]
            tool_functions = context["tool_functions"]
            max_iterations = context["max_iterations"]

            yield _sse_event("start", {"model": model})

            answer_parts: list[str] = []
            for _ in range(max_iterations):
                call_kwargs = {"messages": outbound_messages, **completion_kwargs}
                if tools:
                    call_kwargs["tools"] = tools
                call_kwargs["stream"] = True

                stream = client.chat.completions.create(**call_kwargs)
                normalized: dict[str, object] | None = None

                for item in _consume_streamed_completion_with_deltas(stream):
                    if item.get("type") == "delta":
                        delta = str(item.get("content") or "")
                        if delta:
                            answer_parts.append(delta)
                            yield _sse_event("delta", {"content": delta})
                    elif item.get("type") == "final":
                        normalized = item

                if normalized is None:
                    raise RuntimeError("Stream ended without a final payload.")

                tool_calls = normalized.get("tool_calls", [])
                finish_reason = str(normalized.get("finish_reason") or "")

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
            if not assistant_message:
                raise RuntimeError("Model response was empty.")

            yield _sse_event("done", {"assistant_message": assistant_message, "model": model})
        except Exception as ex:
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
