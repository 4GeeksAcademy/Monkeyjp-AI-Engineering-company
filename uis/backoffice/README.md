# Brasaland Backoffice

Internal operational interface for Brasaland.

## Purpose

This application provides internal tools for Brasaland staff.

It is independent from the public website and must maintain its own layout and application structure.

## Technology

- Static HTML
- Tailwind CSS via CDN
- Vanilla JavaScript

## Current Structure

- `index.html` — main backoffice interface
- `incidents.js` — incident analysis integration and UI behavior
- `config.js` — runtime frontend configuration, when used

## Incident Analysis

The backoffice integrates with the Brasaland FastAPI service for incident analysis.

Relevant API endpoints:

- `POST /api/incidents/analyze`
- `GET /api/incidents/results/export`

Business validation and aggregation logic is owned by the shared incident-analysis package and backend service, not duplicated in this frontend.

## Run Locally

From this directory:

    python3 -m http.server 5500

Then open the local or forwarded development URL for port `5500`.

The API must be running separately under `services/api`.

## Configuration

Do not hardcode user-specific or environment-specific backend URLs in application logic.

Use the existing runtime configuration mechanism for the API base URL.

Do not store secrets in frontend configuration.

## Validation

For incident-analysis changes, verify:

- CSV upload works
- analysis results render correctly
- invalid-record information is visible
- CSV export works
- API errors are communicated to the user

## Related Context

For milestone-specific incident requirements, use:

`docs/incidents-analysis/CONTEXT-brasaland.md`

For company-wide Brasaland facts, use:

`CONTEXT.md`
