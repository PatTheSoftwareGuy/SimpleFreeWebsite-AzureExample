from pathlib import Path

from app.prompty_loader import load_prompty


def test_load_prompty_reads_name_and_prompt() -> None:
    prompty_file = Path(__file__).resolve().parents[1] / "prompts" / "agent-plane-talk.prompty"
    profile = load_prompty(prompty_file)

    assert profile.name == "Agent Plane Talk"
    assert "aviation" in profile.system_prompt.lower()
