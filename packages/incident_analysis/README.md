# `incident_analysis`

Reusable Python package for validating and summarising Brasaland operational incident reports (see [docs/incidents-analysis/CONTEXT-brasaland.md](../../docs/incidents-analysis/CONTEXT-brasaland.md)).

- **Consumers**: [`scripts/analyze.py`](../../scripts/analyze.py) (CLI), and the future FastAPI backend under `services/api`.
- **Scope**: pure validation and aggregation logic only — no CLI, file I/O, or web framework code lives here.

## Modules

- `models.py` — valid location/category/status constants and required-field list.
- `validation.py` — `validate_record(row)` returns the list of validation rules a raw CSV row violates.
- `metrics.py` — `analyze(rows)` returns an `AnalysisResult` with invalid breakdown, category/status totals and satisfaction-score statistics.
- `report.py` — formats an `AnalysisResult` into a console report string or `(metric, value, percentage)` export rows.
