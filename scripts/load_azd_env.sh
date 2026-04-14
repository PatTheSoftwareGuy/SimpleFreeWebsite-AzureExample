#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  eval "$(./scripts/load_azd_env.sh [path-to-.env])"
  source ./scripts/load_azd_env.sh [path-to-.env]

Behavior:
  - If executed, prints export commands to stdout (best used with eval).
  - If sourced, exports variables directly into your current shell.

If no path is provided, the script tries:
  1) .azure/${AZURE_ENV_NAME}/.env (when AZURE_ENV_NAME is set)
  2) exactly one match of .azure/*/.env
EOF
}

is_sourced() {
  [[ "${BASH_SOURCE[0]}" != "$0" ]]
}

trim() {
  local value="$1"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  printf '%s' "$value"
}

find_env_file() {
  local script_dir repo_root candidate
  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  repo_root="$(cd "$script_dir/.." && pwd)"

  if [[ -n "${1:-}" ]]; then
    candidate="$1"
    if [[ ! -f "$candidate" ]]; then
      echo "Error: env file not found: $candidate" >&2
      return 1
    fi
    printf '%s' "$candidate"
    return 0
  fi

  if [[ -n "${AZURE_ENV_NAME:-}" ]]; then
    candidate="$repo_root/.azure/${AZURE_ENV_NAME}/.env"
    if [[ -f "$candidate" ]]; then
      printf '%s' "$candidate"
      return 0
    fi
  fi

  mapfile -t matches < <(compgen -G "$repo_root/.azure/*/.env" || true)
  if [[ "${#matches[@]}" -eq 1 ]]; then
    printf '%s' "${matches[0]}"
    return 0
  fi

  if [[ "${#matches[@]}" -gt 1 ]]; then
    echo "Error: multiple AZD .env files found. Pass one explicitly." >&2
    for match in "${matches[@]}"; do
      echo "  - $match" >&2
    done
    return 1
  fi

  echo "Error: no AZD .env file found under $repo_root/.azure" >&2
  return 1
}

collect_keys() {
  local env_file="$1"
  local line parsed
  local -n keys_ref="$2"

  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%$'\r'}"
    parsed="$(trim "$line")"

    [[ -z "$parsed" ]] && continue
    [[ "${parsed:0:1}" == "#" ]] && continue

    if [[ "$parsed" =~ ^([A-Za-z_][A-Za-z0-9_]*)= ]]; then
      keys_ref+=("${BASH_REMATCH[1]}")
    fi
  done < "$env_file"
}

load_env() {
  local env_file="$1"
  set -a
  # shellcheck disable=SC1090
  source "$env_file"
  set +a
}

main() {
  if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
    usage
    return 0
  fi

  local env_file
  env_file="$(find_env_file "${1:-}")"

  local -a keys=()
  collect_keys "$env_file" keys

  load_env "$env_file"

  if is_sourced; then
    echo "Loaded ${#keys[@]} variables from $env_file" >&2
    return 0
  fi

  local key
  for key in "${keys[@]}"; do
    if [[ -v "$key" ]]; then
      printf 'export %s=%q\n' "$key" "${!key}"
    fi
  done

  echo "Tip: run with eval to set vars in your shell:" >&2
  echo "  eval \"\$($0 ${1:-})\"" >&2
}

main "$@"
