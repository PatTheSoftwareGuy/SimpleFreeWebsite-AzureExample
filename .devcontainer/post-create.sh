#!/usr/bin/env bash
set -euo pipefail

# Install Azure Developer CLI (azd) if it is not already present.
if ! command -v azd >/dev/null 2>&1; then
  curl -fsSL https://aka.ms/install-azd.sh | bash
fi

# Verify tooling is available for the container user session.
az version >/dev/null
azd version >/dev/null
