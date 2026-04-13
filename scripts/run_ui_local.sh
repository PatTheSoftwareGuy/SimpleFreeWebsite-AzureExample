#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"

# Optional first argument: explicit AZD .env path.
# Example: ./scripts/run_ui_local.sh .azure/bubble-chat/.env
source "$script_dir/load_azd_env.sh" "${1:-}"

# Enable quicker local widget build by default.
export CHAT_BUBBLE_FAST_BUILD="${CHAT_BUBBLE_FAST_BUILD:-1}"

# Build the widget bundle and serve it from the backend test host.
cd "$repo_root"
build_succeeded=false

if [[ "${UI_SKIP_FRONTEND_BUILD:-0}" != "1" ]]; then
  if "$script_dir/build_frontend.sh"; then
    build_succeeded=true
  else
    echo "Warning: frontend build failed; using existing backend/static assets." >&2
  fi
else
  echo "Skipping frontend build because UI_SKIP_FRONTEND_BUILD=1"
fi

if [[ "$build_succeeded" == false ]]; then
  echo "Warning: frontend build skipped or failed; using existing backend/static assets." >&2
fi

if [[ ! -f "$repo_root/backend/static/chat-bubble.iife.js" || ! -f "$repo_root/backend/static/chat-bubble.css" ]]; then
  echo "Error: missing backend/static widget assets and frontend build was unavailable." >&2
  exit 1
fi

cd "$repo_root/backend"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Error: python3 is not installed or not on PATH." >&2
  exit 1
fi

ensure_python_tooling() {
  local -a packages=()

  if ! python3 -m pip --version >/dev/null 2>&1; then
    packages+=(python3-pip)
  fi

  if ! python3 -m venv --help >/dev/null 2>&1; then
    packages+=(python3-venv)
  fi

  if [[ "${#packages[@]}" -eq 0 ]]; then
    return 0
  fi

  if ! command -v sudo >/dev/null 2>&1; then
    echo "Error: missing Python tooling (${packages[*]}) and sudo is unavailable." >&2
    exit 1
  fi

  echo "Installing missing Python tooling: ${packages[*]}"
  sudo apt-get update -y
  sudo apt-get install -y "${packages[@]}"
}

ensure_python_tooling

if [[ ! -x .venv/bin/python ]]; then
  echo "Creating backend virtual environment..."
  python3 -m venv .venv
fi

PYTHON_BIN="$(pwd)/.venv/bin/python"

if ! "$PYTHON_BIN" -m pip --version >/dev/null 2>&1; then
  "$PYTHON_BIN" -m ensurepip --upgrade || true
fi

if ! "$PYTHON_BIN" -m pip --version >/dev/null 2>&1; then
  echo "Error: pip is unavailable in backend virtual environment." >&2
  echo "Try installing python venv/pip support in the container and retry." >&2
  exit 1
fi

if ! "$PYTHON_BIN" -c "import uvicorn" >/dev/null 2>&1; then
  echo "Installing backend dependencies..."
  "$PYTHON_BIN" -m pip install -r requirements.txt
fi

export PATH="$(pwd)/.venv/bin:$PATH"

echo "Starting UI app on http://localhost:${UI_PORT:-8000}/static/test-host.html"
exec "$PYTHON_BIN" -m uvicorn app.main:app --reload --host 0.0.0.0 --port "${UI_PORT:-8000}"
