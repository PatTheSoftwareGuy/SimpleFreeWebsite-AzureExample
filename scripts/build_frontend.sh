#!/usr/bin/env bash
set -euo pipefail

pushd frontend >/dev/null
npm ci
npm run build
popd >/dev/null

mkdir -p backend/static
cp frontend/dist/chat-bubble.iife.js backend/static/chat-bubble.iife.js
cp frontend/dist/chat-bubble.css backend/static/chat-bubble.css
