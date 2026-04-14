from pathlib import Path

from app.prompty_loader import load_prompty


def test_load_prompty_reads_name_and_prompt() -> None:
    prompty_file = Path(__file__).resolve().parents[1] / "prompts" / "agent-plane-talk.prompty"
    profile = load_prompty(prompty_file)

    assert profile.name == "Agent Plane Talk"
    assert "aviation" in profile.system_prompt.lower()
    assert profile.model["provider"] == "openai"
    assert profile.model["api_type"] == "chat"
    assert profile.max_iterations == 8
    assert len(profile.few_shot_messages) >= 2
    assert any(tool["function"]["name"] == "lookup_aviation_term" for tool in profile.tools)
    assert len(profile.mcp_servers) >= 1
    assert any(server["endpoint"].endswith("/api/mcp") for server in profile.mcp_servers)
