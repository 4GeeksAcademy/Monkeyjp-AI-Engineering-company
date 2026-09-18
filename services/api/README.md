# `services/api` — Brasaland API

Centralized Brasaland backend built with FastAPI.

The service currently exposes:

- Incident Analysis
- Supplier Directory
- JWT authentication
- User credential management
- User profile management

## Technology

- Python 3.12+
- FastAPI
- Uvicorn
- Pydantic
- TinyDB
- python-jose
- libpass / bcrypt
- python-dotenv
- uv

Python dependencies are managed with `uv` and defined in:

`pyproject.toml`

Resolved dependency versions are locked in:

`uv.lock`

## Structure

services/api/
├── main.py
├── models/
│ ├── auth.py
│ ├── incidents.py
│ ├── profiles.py
│ ├── suppliers.py
│ └── users.py
├── routes/
│ ├── auth.py
│ ├── incidents.py
│ ├── profiles.py
│ ├── suppliers.py
│ └── users.py
├── services/
│ ├── auth.py
│ ├── incidents.py
│ ├── profiles.py
│ ├── suppliers.py
│ └── users.py
└── repositories/
├── incidents.py
├── profiles.py
├── suppliers.py
└── users.py

Each layer has a clear responsibility:

- `main.py` — FastAPI application entry point and global configuration
- `models/` — Pydantic request and response models
- `routes/` — HTTP endpoints and transport-layer concerns
- `services/` — application and business orchestration logic
- `repositories/` — state and persistence access

The incidents service reuses shared business logic from:

`packages/incident_analysis`

Do not duplicate incident validation, aggregation, or export logic inside the API.

## Run Locally

From the repository root:

cd services/api
uv sync
cp .env.example .env

Set a local authentication secret in `.env` before starting the API.

Example:

AUTH_SECRET_KEY=change-me
ACCESS_TOKEN_EXPIRE_MINUTES=30

Then run:

uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000

The API documentation is available through FastAPI's `/docs` endpoint while the service is running.

## Authentication

Authentication uses signed JWT bearer tokens.

Passwords are hashed with bcrypt and are never stored or compared in plain text.

Authentication configuration is loaded from environment variables:

AUTH_SECRET_KEY=change-me
ACCESS_TOKEN_EXPIRE_MINUTES=30

Use `.env.example` as the local configuration template.

Do not commit `.env`.

### Authentication Endpoints

`POST /auth/login`

Validates email and password credentials and returns a signed JWT access token.

`GET /auth/me`

Returns the currently authenticated user.

### User Endpoints

`POST /users`

Creates a user account and its associated profile.

`GET /users`

Returns all users.

`GET /users/{user_id}`

Returns a user by ID.

`PATCH /users/{user_id}`

Updates user credentials or account fields.

`DELETE /users/{user_id}`

Deletes a user and its associated profile.

### Profile Endpoints

`GET /profiles/me`

Returns the profile associated with the authenticated user.

`PATCH /profiles/me`

Updates the profile associated with the authenticated user.

User credentials and profiles are persisted in TinyDB.

Supplier and Incident Analysis routes require a valid bearer token.

## Incident Analysis Endpoints

### Analyze Incidents

`POST /api/incidents/analyze`

Accepts an incidents CSV as multipart form data using the `file` field.

The endpoint:

- parses the uploaded CSV
- validates the required CSV structure
- delegates record validation and analysis to `packages/incident_analysis`
- returns the analysis summary as JSON
- stores the result as the latest analysis for the current process

Authentication is required.

### Export Latest Analysis

`GET /api/incidents/results/export`

Exports the latest successful analysis as CSV using:

`metric,value,percentage`

Returns `404` when no analysis is available in the current process.

Authentication is required.

## Supplier Endpoints

The Supplier Directory is available under:

`/suppliers`

Supported operations include:

- create supplier
- list suppliers
- get supplier details
- update supplier rate
- update supplier status
- delete supplier
- filter by country
- filter by category

Supplier data is persisted in TinyDB.

All supplier routes require authentication.

## State and Persistence

Different API domains currently use different repository implementations.

### Incident Analysis

The latest incident analysis is stored in process-local memory.

This means:

- state is lost when the API restarts
- state is process-local
- multiple workers do not share the same result

Persistent storage for incident analysis is currently outside the milestone scope.

### Suppliers

Supplier data is persisted with TinyDB under:

`services/api/data/`

TinyDB document IDs are exposed through the API as supplier IDs.

### Authentication

User and Profile data are persisted with TinyDB under:

`services/api/data/`

The authentication JWT stores the TinyDB user ID in the token subject claim.

Runtime data files under `data/` are ignored by Git.

## CORS

CORS is configured for the frontend development environments required by the Brasaland UIs.

Do not use unrestricted production origins.

Production CORS configuration should use explicitly approved Brasaland origins.

## Validation

For authentication changes, verify:

- valid credentials return a JWT
- invalid credentials return `401`
- authenticated requests can access protected routes
- missing tokens return `401`
- invalid tokens return `401`
- expired tokens are rejected
- passwords are never returned by the API

For incident API changes, verify:

- valid CSV upload returns the expected analysis
- malformed or empty CSV uploads return an appropriate client error
- export returns the latest analysis
- export without a previous analysis returns `404`
- protected routes reject unauthenticated requests
- the provided milestone fixture produces the expected metrics

For supplier API changes, verify:

- protected routes reject unauthenticated requests
- authenticated requests preserve existing supplier CRUD behavior
- filtering by country and category continues to work
- persisted supplier data survives process restarts

## Related Documentation

Incident milestone requirements:

`docs/incidents-analysis/CONTEXT-brasaland.md`

Supplier Directory requirements:

`docs/supplier-directory/CONTEXT-brasaland.md`

Shared incident logic:

`packages/incident_analysis/README.md`

Architecture decisions:

`docs/ARCHITECTURE_PROPOSAL.md`

Read the architecture proposal only when the task has architectural implications.
