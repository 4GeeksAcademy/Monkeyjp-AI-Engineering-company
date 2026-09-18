# Technical Context — Brasaland

## Monorepo Structure

- `uis/` — user-facing applications
- `services/` — backend APIs and workers
- `packages/` — shared libraries
- `docs/` — milestone and architecture documentation
- `.agents/` — development-agent configuration
- `agents/`, `skills/`, `mcps/` — product AI functionality

Repository workflow and modification rules are defined in `AGENTS.md`.

## Current Applications

- `uis/website` — legacy static HTML, Tailwind CDN and JavaScript; pending migration
- `uis/backoffice` — Next.js, React, TypeScript and Tailwind
- `uis/talent-pipeline-tracker` — Next.js, React, TypeScript and Tailwind
- `services/api` — FastAPI centralized backend

Each application remains independently structured.

## Frontend Direction

Brasaland frontend applications are converging on:

- Next.js
- React
- TypeScript
- Tailwind CSS
- App Router

The migration is incremental.

Do not assume that all applications have already migrated.

Current migration status:

- `uis/backoffice` — migrated
- `uis/talent-pipeline-tracker` — already uses the target stack
- `uis/website` — migration pending

Applications must continue to maintain their own layouts, dependencies, routing and environment configuration.

## Backend Direction

Brasaland uses a centralized FastAPI backend under:

`services/api`

The architectural direction is a Layered Modular Monolith.

Current backend tooling and storage:

- FastAPI is used for the centralized API.
- Backend features follow the `models/`, `routes/`, `services/`, and `repositories/` structure.
- TinyDB is currently used as lightweight persistent storage for the Supplier Directory milestone.
- Python backend dependencies are managed with `uv`.

Detailed architectural decisions live in:

`docs/ARCHITECTURE_PROPOSAL.md`

Read that document only for architecture-related work.

## Shared Logic

Reusable cross-application or cross-transport logic belongs under:

`packages/`

Current shared packages include:

- `packages/brasaland-domain`
- `packages/incident_analysis`

Shared business logic should remain transport-independent where practical.

## Configuration

Application-specific environment and runtime configuration belongs to the application that consumes it.

Frontend applications using Next.js must use application-level environment configuration for environment-specific API URLs.

Do not hardcode environment-specific URLs or secrets.

## Technical Source Priority

For implementation decisions:

1. `CONTEXT.md` — company-wide facts
2. Relevant milestone context — feature requirements
3. `AGENTS.md` and applicable `.agents/rules/` — development constraints
4. `docs/ARCHITECTURE_PROPOSAL.md` — only when architecture is relevant
5. Application documentation and existing implementation conventions

Do not load unrelated sources by default.
