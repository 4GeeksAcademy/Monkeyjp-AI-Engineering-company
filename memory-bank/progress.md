# Progress — Brasaland

## Current Milestone

Milestone 6 — Brasaland Incident Analysis

## Current Status

### Completed

- Incident analysis CLI implemented in `scripts/analyze.py`.
- Shared incident validation and aggregation logic implemented in `packages/incident_analysis/`.
- FastAPI incident endpoints implemented in `services/api`.
- Backoffice incident-analysis UI integrated with the API.
- Backoffice migrated from static HTML/JavaScript to Next.js, React, TypeScript and Tailwind CSS.
- Backoffice API configuration moved to `NEXT_PUBLIC_API_URL`.
- `.env.local` is used for local or Codespaces-specific values and `.env.example` documents the required configuration.
- CSV upload, analysis rendering and CSV export verified end-to-end.
- Provided 100-row fixture produces the expected 96 valid / 4 invalid result and satisfaction average of 3.46.

### Current Integration Notes

- The incident API currently stores the latest result in process-local memory.
- State is lost when the API restarts and is not shared between multiple workers.
- Persistence is outside the current milestone scope.
- Browser access from GitHub Codespaces requires the forwarded API port to be accessible to the frontend.
- The backoffice reads its API base URL from `NEXT_PUBLIC_API_URL`.

## Open Tasks

- Confirm CORS configuration is committed and limited to appropriate development origins.
- Run final milestone validation.
- Capture required CLI and UI screenshots.
- Prepare final commit/push/PR.
- Migrate `uis/website` from static HTML/JavaScript to Next.js, React, TypeScript and Tailwind CSS.

## Active Architectural Decisions

- Central backend: `services/api` using FastAPI.
- Backend structure follows the Layered Modular Monolith direction.
- Incident business logic remains in `packages/incident_analysis` and is shared by CLI and API.
- Explicit milestone API contracts take precedence over proposed future route conventions.
- Incident result persistence remains intentionally in-memory for this milestone.
- Brasaland frontend applications are converging on Next.js, React, TypeScript and Tailwind CSS.
- `uis/backoffice` has migrated to the target frontend stack.
- `uis/website` remains on the legacy static stack until its migration is completed.

## Known Issues

- Talent Pipeline Tracker has an intermittent browser Web Vitals console error during client-side navigation.
- It currently does not affect application business functionality.

## Completed Milestones

- Public Website
- Domain Models & TypeScript Utilities
- Talent Pipeline Tracker
  - Aligned with the official Milestone 3 context.
  - Status and stage UI labels match the required human-readable values.
  - Milestone-specific context and agent rules are documented.
  - Lint and build pass.
- Backend Architecture Proposal
- Incident Analysis Phase 1
- Incident Analysis Phase 2 backend
- Incident Analysis backoffice integration

- Milestone 2 was realigned with the official context and now includes the exact domain models for menu items, sales, locations, waste, and country metrics; collection and search utilities; financial calculations; performance scoring; aggregations/reports; and business validations. The legacy Brasa Points-based implementation was removed, and the package typecheck and build pass.
