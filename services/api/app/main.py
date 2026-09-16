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
from fastapi.middleware.cors import CORSMiddleware

from app.domains.incidents.router import router as incidents_router

app = FastAPI(title="Brasaland Incident Analysis API")

# Development backoffice origins; Codespaces forwards each app to its own
# `https://<id>-<port>.app.github.dev` subdomain, hence the regex.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_origin_regex=r"https://.*\.app\.github\.dev",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(incidents_router)
