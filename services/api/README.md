# `services/api` — Brasaland API

Centralized Brasaland backend built with FastAPI.

The service currently exposes the Incident Analysis domain.

## Technology

- Python
- FastAPI
- Uvicorn

Dependencies are defined in:

`requirements.txt`

## Structure

```text
app/
├── main.py
└── domains/
    └── incidents/
        ├── router.py
        ├── schemas.py
        ├── service.py
        └── repository.py
```

The incidents domain reuses shared business logic from:

`packages/incident_analysis`

Do not duplicate incident validation, aggregation, or export logic inside the API.

## Run Locally

From the repository root:

    cd services/api
    pip install -r requirements.txt
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

The API documentation is available through FastAPI's `/docs` endpoint while the service is running.

## Endpoints

### Analyze Incidents

`POST /api/incidents/analyze`

Accepts an incidents CSV as multipart form data using the `file` field.

The endpoint:

- parses the uploaded CSV
- validates the required CSV structure
- delegates record validation and analysis to `packages/incident_analysis`
- returns the analysis summary as JSON
- stores the result as the latest analysis for the current process

### Export Latest Analysis

`GET /api/incidents/results/export`

Exports the latest successful analysis as CSV using:

`metric,value,percentage`

Returns `404` when no analysis is available in the current process.

## State

The latest analysis is stored in memory.

This means:

- state is lost when the API restarts
- state is process-local
- multiple workers do not share the same result

Persistent storage is currently outside the milestone scope.

## CORS

CORS is configured for the frontend development environments required by the backoffice integration.

Do not use unrestricted production origins.

Production CORS configuration should use explicitly approved Brasaland origins.

## Validation

For incident API changes, verify:

- valid CSV upload returns the expected analysis
- malformed or empty CSV uploads return an appropriate client error
- export returns the latest analysis
- export without a previous analysis returns `404`
- the provided milestone fixture produces the expected metrics

## Related Documentation

Incident milestone requirements:

`docs/incidents-analysis/CONTEXT-brasaland.md`

Shared incident logic:

`packages/incident_analysis/README.md`

Architecture decisions:

`docs/ARCHITECTURE_PROPOSAL.md`

Read the architecture proposal only when the task has architectural implications.
