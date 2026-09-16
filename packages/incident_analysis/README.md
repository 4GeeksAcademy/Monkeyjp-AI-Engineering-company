# `incident_analysis`

Reusable Python package for validating and summarising Brasaland operational incident reports.

Milestone requirements are defined in:

`docs/incidents-analysis/CONTEXT-brasaland.md`

## Consumers

Current consumers:

- `scripts/analyze.py` — CLI
- `services/api` — FastAPI backend

## Scope

This package contains shared business logic only.

It must remain independent from:

- CLI interaction
- filesystem-specific workflows
- FastAPI
- HTTP transport
- frontend code

Do not duplicate incident validation, aggregation, or export logic in its consumers.

## Modules

- `models.py` — valid location, category and status constants, plus required-field definitions.
- `validation.py` — `validate_record(row)` returns the validation rules violated by a raw CSV row.
- `metrics.py` — `analyze(rows)` returns an `AnalysisResult` with invalid-record breakdowns, category/status totals, and satisfaction statistics.
- `report.py` — converts an `AnalysisResult` into console output or `(metric, value, percentage)` export rows.

## Design Principle

Keep this package transport-agnostic and reusable.

Consumers are responsible for:

- reading input
- handling HTTP or CLI interaction
- presenting responses
- choosing where exported data is written or returned

This package is responsible only for incident-analysis business rules and derived metrics.
