#!/usr/bin/env bash
set -euo pipefail

ensure_frontend_deps() {
	if [[ "${SKIP_FRONTEND_INSTALL:-0}" == "1" ]]; then
		return 0
	fi

	if [[ "${CI:-}" == "true" ]]; then
		npm ci
		return 0
	fi

	local lock_hash_file="node_modules/.package-lock.sha256"
	local current_hash=""
	local previous_hash=""

	current_hash="$(sha256sum package-lock.json | awk '{print $1}')"

	if [[ -x node_modules/.bin/vite && -f "$lock_hash_file" ]]; then
		previous_hash="$(cat "$lock_hash_file")"
	fi

	if [[ -x node_modules/.bin/vite && "$current_hash" == "$previous_hash" ]]; then
		return 0
	fi

	npm install --no-audit --no-fund --prefer-offline
	mkdir -p node_modules
	printf '%s' "$current_hash" > "$lock_hash_file"
}

echo "Building frontend..."
cd frontend
ensure_frontend_deps
npm run build

echo "Copying built frontend assets to backend static directory..."
mkdir -p ../backend/static
cp dist/chat-bubble.iife.js ../backend/static/chat-bubble.iife.js
cp dist/chat-bubble.css ../backend/static/chat-bubble.css
echo "Frontend build complete."
