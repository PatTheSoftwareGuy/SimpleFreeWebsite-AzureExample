#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"

# Optional first argument: explicit AZD .env path.
# Example: ./scripts/run_weather_function_local.sh .azure/bubble-chat/.env
source "$script_dir/load_azd_env.sh" "${1:-}"

cd "$repo_root/function"

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
  echo "Creating function virtual environment..."
  python3 -m venv .venv
fi

PYTHON_BIN="$(pwd)/.venv/bin/python"

if ! "$PYTHON_BIN" -m pip --version >/dev/null 2>&1; then
  "$PYTHON_BIN" -m ensurepip --upgrade || true
fi

if ! "$PYTHON_BIN" -m pip --version >/dev/null 2>&1; then
  echo "Error: pip is unavailable in function virtual environment." >&2
  echo "Try installing python venv/pip support in the container and retry." >&2
  exit 1
fi

if ! "$PYTHON_BIN" -c "import azure.functions" >/dev/null 2>&1; then
  echo "Installing function dependencies..."
  "$PYTHON_BIN" -m pip install -r requirements.txt
fi

export PATH="$(pwd)/.venv/bin:$PATH"

if ! command -v func >/dev/null 2>&1; then
  if ! command -v sudo >/dev/null 2>&1; then
    echo "Error: Azure Functions Core Tools (func) is not installed and sudo is unavailable." >&2
    exit 1
  fi

  echo "Installing Azure Functions Core Tools..."
  sudo apt-get update -y
  sudo apt-get install -y azure-functions-core-tools-4
fi

if ! command -v func >/dev/null 2>&1; then
  echo "Error: Azure Functions Core Tools installation did not add 'func' to PATH." >&2
  exit 1
fi

if [[ ! -f local.settings.json && -f local.settings.sample.json ]]; then
  cp local.settings.sample.json local.settings.json
fi

export FUNCTIONS_WORKER_RUNTIME="${FUNCTIONS_WORKER_RUNTIME:-python}"
export AzureWebJobsStorage="${AzureWebJobsStorage:-UseDevelopmentStorage=true}"

echo "Starting Weather Function app on http://localhost:${WEATHER_FUNC_PORT:-7071}"
exec func start --port "${WEATHER_FUNC_PORT:-7071}"
