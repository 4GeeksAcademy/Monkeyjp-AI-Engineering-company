"""FastAPI application entry point for the Brasaland centralized API."""

import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


API_DIR = Path(__file__).resolve().parent
REPO_ROOT = API_DIR.parent.parent

# Allow imports from shared packages located at the monorepo root.
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


from routes.incidents import router as incidents_router
from routes.suppliers import router as suppliers_router


app = FastAPI(title="Brasaland API")


# Development frontend origins.
# Codespaces forwards each app to its own
# https://<id>-<port>.app.github.dev subdomain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_origin_regex=r"https://.*\.app\.github\.dev",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


app.include_router(incidents_router)
app.include_router(suppliers_router)