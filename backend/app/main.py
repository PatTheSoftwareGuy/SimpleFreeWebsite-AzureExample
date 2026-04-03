from __future__ import annotations

import os
from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
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


def _load_agent_prompt() -> str:
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

    profile = load_prompty(prompty_path)
    return profile.system_prompt


def _build_client() -> OpenAI:
    api_key = os.getenv("AIHORDE_API_KEY")
    if not api_key:
        raise RuntimeError("AIHORDE_API_KEY environment variable is required.")

    base_url = os.getenv("AIHORDE_BASE_URL", "https://oai.aihorde.net/v1")
    return OpenAI(api_key=api_key, base_url=base_url)


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
        client = _build_client()
        configured_model = os.getenv("AIHORDE_MODEL")
        model = configured_model.strip() if configured_model and configured_model.strip().lower() != "none" else "openai/gpt-oss-20b"
        system_prompt = _load_agent_prompt()

        outbound_messages = [{"role": "system", "content": system_prompt}]
        for msg in request.messages:
            if msg.role in {"user", "assistant"}:
                outbound_messages.append({"role": msg.role, "content": msg.content})

        completion = client.chat.completions.create(
            model=model,
            messages=outbound_messages,
            temperature=0.7,
        )

        answer = completion.choices[0].message.content or ""
        if not answer.strip():
            raise HTTPException(status_code=502, detail="Model response was empty.")

        return ChatResponse(assistant_message=answer.strip(), model=model)
    except HTTPException:
        raise
    except Exception as ex:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Chat request failed: {ex}") from ex
