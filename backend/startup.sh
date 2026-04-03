#!/usr/bin/env bash
set -euo pipefail

exec gunicorn --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000 app.main:app
