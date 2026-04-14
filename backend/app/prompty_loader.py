from __future__ import annotations

from dataclasses import dataclass
import os
from pathlib import Path
import re
from typing import Any

import yaml


@dataclass(frozen=True)
class PromptProfile:
    name: str
    description: str
    system_prompt: str
    few_shot_messages: list[dict[str, str]]
    model: dict[str, Any]
    tools: list[dict[str, Any]]
    mcp_servers: list[dict[str, Any]]
    max_iterations: int


_ENV_EXPR = re.compile(r"\$\{env:([A-Za-z_][A-Za-z0-9_]*)(?::([^}]*))?\}")


def _resolve_env_template(value: str) -> str:
    def _replace(match: re.Match[str]) -> str:
        env_name = match.group(1)
        default_value = match.group(2) or ""
        return os.getenv(env_name, default_value)

    return _ENV_EXPR.sub(_replace, value)


def _resolve_value_templates(value: Any) -> Any:
    if isinstance(value, str):
        return _resolve_env_template(value)
    if isinstance(value, list):
        return [_resolve_value_templates(item) for item in value]
    if isinstance(value, dict):
        return {str(k): _resolve_value_templates(v) for k, v in value.items()}
    return value


def _extract_front_matter(raw_text: str) -> tuple[dict[str, Any], str]:
    if not raw_text.startswith("---\n"):
        return {}, raw_text

    parts = raw_text.split("---\n", 2)
    if len(parts) < 3:
        return {}, raw_text

    metadata_text = parts[1]
    body = parts[2]

    metadata = yaml.safe_load(metadata_text) or {}
    if not isinstance(metadata, dict):
        metadata = {}

    return metadata, body


def _extract_system_prompt(metadata: dict[str, Any], body: str) -> str:
    meta_system = metadata.get("system")
    if isinstance(meta_system, str) and meta_system.strip():
        return meta_system.strip()

    body = body.strip()
    if not body:
        return "You are Agent Plane Talk, a humorous aviation-themed AI assistant."

    return body


def _coerce_parameter_type(kind: Any) -> str:
    text = str(kind or "string").strip().lower()
    allowed = {"string", "number", "integer", "boolean", "object", "array"}
    return text if text in allowed else "string"


def _extract_few_shots(metadata: dict[str, Any]) -> list[dict[str, str]]:
    raw_messages = metadata.get("fewShots") or metadata.get("few_shots") or metadata.get("messages") or []
    if not isinstance(raw_messages, list):
        return []

    few_shots: list[dict[str, str]] = []
    for msg in raw_messages:
        if not isinstance(msg, dict):
            continue
        role = str(msg.get("role", "")).strip().lower()
        content = str(msg.get("content", "")).strip()
        if role in {"user", "assistant", "system"} and content:
            few_shots.append({"role": role, "content": content})
    return few_shots


def _extract_model(metadata: dict[str, Any]) -> dict[str, Any]:
    raw_model = metadata.get("model")
    if not isinstance(raw_model, dict):
        return {}

    model = _resolve_value_templates(raw_model)
    model_id = str(model.get("id", "")).strip()
    provider = str(model.get("provider", "")).strip().lower()
    api_type = str(model.get("apiType", "chat")).strip().lower() or "chat"

    options = model.get("options") if isinstance(model.get("options"), dict) else {}
    additional = options.get("additionalProperties") if isinstance(options.get("additionalProperties"), dict) else {}
    connection = model.get("connection") if isinstance(model.get("connection"), dict) else {}

    parsed: dict[str, Any] = {
        "id": model_id,
        "provider": provider,
        "api_type": api_type,
        "temperature": options.get("temperature"),
        "max_output_tokens": options.get("maxOutputTokens"),
        "additional_properties": additional,
        "connection": connection,
    }
    return parsed


def _extract_tools(metadata: dict[str, Any]) -> list[dict[str, Any]]:
    raw_tools = metadata.get("tools")
    if not isinstance(raw_tools, list):
        return []

    tools: list[dict[str, Any]] = []
    for raw_tool in raw_tools:
        if not isinstance(raw_tool, dict):
            continue

        kind = str(raw_tool.get("kind", "")).strip().lower()
        if kind != "function":
            continue

        name = str(raw_tool.get("name", "")).strip()
        if not name:
            continue

        description = str(raw_tool.get("description", "")).strip()
        strict = bool(raw_tool.get("strict", False))
        raw_parameters = raw_tool.get("parameters", {})

        if isinstance(raw_parameters, list):
            entries = raw_parameters
        elif isinstance(raw_parameters, dict):
            properties = raw_parameters.get("properties")
            entries = properties if isinstance(properties, list) else []
        else:
            entries = []

        properties: dict[str, Any] = {}
        required: list[str] = []

        for entry in entries:
            if not isinstance(entry, dict):
                continue
            param_name = str(entry.get("name", "")).strip()
            if not param_name:
                continue

            schema: dict[str, Any] = {
                "type": _coerce_parameter_type(entry.get("kind", "string")),
            }

            param_desc = str(entry.get("description", "")).strip()
            if param_desc:
                schema["description"] = param_desc

            if "default" in entry:
                schema["default"] = entry["default"]

            enum_values = entry.get("enum")
            if isinstance(enum_values, list) and enum_values:
                schema["enum"] = enum_values

            properties[param_name] = schema
            if bool(entry.get("required", False)):
                required.append(param_name)

        parameters_schema: dict[str, Any] = {
            "type": "object",
            "properties": properties,
            "required": required,
        }
        if strict:
            parameters_schema["additionalProperties"] = False

        function_block: dict[str, Any] = {
            "name": name,
            "description": description,
            "parameters": parameters_schema,
        }
        if strict:
            function_block["strict"] = True

        tools.append({"type": "function", "function": function_block})

    return tools


def _extract_mcp_servers(metadata: dict[str, Any]) -> list[dict[str, Any]]:
    raw_tools = metadata.get("tools")
    if not isinstance(raw_tools, list):
        return []

    servers: list[dict[str, Any]] = []
    for raw_tool in raw_tools:
        if not isinstance(raw_tool, dict):
            continue

        resolved_tool = _resolve_value_templates(raw_tool)
        kind = str(resolved_tool.get("kind", "")).strip().lower()
        if kind != "mcp":
            continue

        connection = resolved_tool.get("connection") if isinstance(resolved_tool.get("connection"), dict) else {}
        endpoint = str(connection.get("endpoint", "")).strip()
        if not endpoint:
            continue

        allowed_tools = resolved_tool.get("allowedTools")
        if isinstance(allowed_tools, list):
            allowed = [str(name).strip() for name in allowed_tools if str(name).strip()]
        else:
            allowed = []

        servers.append(
            {
                "name": str(resolved_tool.get("name", "")).strip() or str(resolved_tool.get("serverName", "")).strip(),
                "server_name": str(resolved_tool.get("serverName", "")).strip(),
                "server_description": str(resolved_tool.get("serverDescription", "")).strip(),
                "endpoint": endpoint,
                "allowed_tools": allowed,
            }
        )

    return servers


def load_prompty(path: str | Path) -> PromptProfile:
    prompty_path = Path(path)
    raw_text = prompty_path.read_text(encoding="utf-8")
    metadata, body = _extract_front_matter(raw_text)

    name = str(metadata.get("name", "Agent Plane Talk")).strip() or "Agent Plane Talk"
    description = str(metadata.get("description", "A humorous aviation-focused AI chat assistant.")).strip()
    system_prompt = _extract_system_prompt(metadata, body)
    few_shot_messages = _extract_few_shots(metadata)
    model = _extract_model(metadata)
    tools = _extract_tools(metadata)
    mcp_servers = _extract_mcp_servers(metadata)

    raw_max_iterations = metadata.get("agent", {}).get("maxIterations") if isinstance(metadata.get("agent"), dict) else None
    if isinstance(raw_max_iterations, int) and raw_max_iterations > 0:
        max_iterations = raw_max_iterations
    else:
        max_iterations = 10

    return PromptProfile(
        name=name,
        description=description,
        system_prompt=system_prompt,
        few_shot_messages=few_shot_messages,
        model=model,
        tools=tools,
        mcp_servers=mcp_servers,
        max_iterations=max_iterations,
    )
