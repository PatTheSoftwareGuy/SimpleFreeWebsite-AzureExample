from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml


@dataclass(frozen=True)
class PromptProfile:
    name: str
    description: str
    system_prompt: str


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


def load_prompty(path: str | Path) -> PromptProfile:
    prompty_path = Path(path)
    raw_text = prompty_path.read_text(encoding="utf-8")
    metadata, body = _extract_front_matter(raw_text)

    name = str(metadata.get("name", "Agent Plane Talk")).strip() or "Agent Plane Talk"
    description = str(metadata.get("description", "A humorous aviation-focused AI chat assistant.")).strip()
    system_prompt = _extract_system_prompt(metadata, body)

    return PromptProfile(name=name, description=description, system_prompt=system_prompt)
