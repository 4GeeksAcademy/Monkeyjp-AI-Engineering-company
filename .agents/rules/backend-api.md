---

description: Backend development rules for the centralized Brasaland FastAPI service
globs:

* "services/api/**/*.py"
* "services/api/pyproject.toml"
* "services/api/uv.lock"
  alwaysApply: false

---

# Brasaland Backend API Rules

## Scope

This rule applies to the centralized FastAPI backend under:

`services/api/`

## Backend Structure

Keep the API organized using the established lightweight layered structure:

```text
services/api/
├── main.py
├── models/
├── routes/
├── services/
└── repositories/
```

Use each layer according to its responsibility:

- `models/` → Pydantic request and response models
- `routes/` → HTTP transport and endpoint definitions
- `services/` → application and business logic
- `repositories/` → state and persistence access

Do not reintroduce the previous `app/domains/` structure unless an explicit architecture decision requires it.

Do not create layers that have no concrete responsibility.

## Shared Business Logic

Reuse existing shared business logic from `packages/` when available.

For incident analysis, continue using:

`packages/incident_analysis`

Do not duplicate incident validation, aggregation, or export logic inside the API.

## Dependency Management

Python dependencies for `services/api` are managed with `uv`.

Use:

- `pyproject.toml` for dependency declarations
- `uv.lock` for resolved dependency versions
- `uv sync` to synchronize the environment
- `uv add <package>` to add dependencies
- `uv remove <package>` to remove dependencies
- `uv run` to execute backend commands

Do not introduce or restore `requirements.txt` for this service unless explicitly requested.

## FastAPI Entry Point

The FastAPI application entry point is:

`services/api/main.py`

Run the development server from `services/api` with:

```bash
uv run uvicorn main:app --reload
```

Register feature routers from `main.py`.

## Change Discipline

Keep routes thin.

Business logic should live in `services/`, not directly inside route handlers.

Persistence or state access should be isolated behind `repositories/` when appropriate.

Do not refactor unrelated backend features while implementing a scoped change.
