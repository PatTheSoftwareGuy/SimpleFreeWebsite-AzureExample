#!/usr/bin/env bash
set -euo pipefail

echo "Building frontend..."
cd frontend
npm ci
npm run build

echo "Copying built frontend assets to backend static directory..."
mkdir -p ../backend/static
cp dist/chat-bubble.iife.js ../backend/static/chat-bubble.iife.js
cp dist/chat-bubble.css ../backend/static/chat-bubble.css
echo "Frontend build complete."
