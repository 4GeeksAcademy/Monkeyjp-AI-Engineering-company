# `services/api`

Brasaland centralized backend API (FastAPI). Currently exposes the Incident Analysis domain only (Phase 2 of the Brasaland Incident Analysis milestone).

## Run locally

```bash
cd services/api
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Endpoints

- `POST /api/incidents/analyze` — multipart upload of an incidents CSV (`file` field). Validates and analyzes it using the reusable `packages/incident_analysis` logic and returns the summary as JSON. Stores the result as the "latest analysis" for the current process.
- `GET /api/incidents/results/export` — exports the most recent analysis as CSV (`metric,value,percentage`). Returns `404` if no analysis has been run yet in this process.

## Notes

- Business validation and aggregation logic is not duplicated here — it lives entirely in [`packages/incident_analysis`](../../packages/incident_analysis/README.md). This service only handles HTTP transport, upload parsing, and response formatting.
- The "latest analysis" state is a simple in-memory, process-local store for this milestone: it is lost on restart and is not shared across multiple worker processes. Persistence (database or disk) is out of scope for this milestone.
- CORS is intentionally not configured yet; it will be added once the backoffice integration defines the actual frontend origin.
