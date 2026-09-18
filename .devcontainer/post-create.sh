#!/usr/bin/env bash
set -euo pipefail

# Enable Corepack and make pnpm available for JS/TS workspaces.
corepack enable || true
corepack prepare pnpm@latest --activate || true

python -m pip install --upgrade pip uv

uv sync --project services/api

echo "Devcontainer setup complete."
