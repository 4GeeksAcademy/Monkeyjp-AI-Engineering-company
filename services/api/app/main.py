"""FastAPI application entry point for the Brasaland centralized API."""
import sys
from pathlib import Path

_APP_DIR = Path(__file__).resolve().parent
_API_DIR = _APP_DIR.parent
_REPO_ROOT = _API_DIR.parent.parent

for _path in (_REPO_ROOT, _API_DIR):
    if str(_path) not in sys.path:
        sys.path.insert(0, str(_path))

from fastapi import FastAPI

from app.domains.incidents.router import router as incidents_router

app = FastAPI(title="Brasaland Incident Analysis API")
app.include_router(incidents_router)
