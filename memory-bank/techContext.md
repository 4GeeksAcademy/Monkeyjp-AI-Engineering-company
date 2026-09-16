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

- `uis/website` — static HTML, Tailwind CDN and JavaScript
- `uis/backoffice` — static HTML, Tailwind CDN and JavaScript
- `uis/talent-pipeline-tracker` — Next.js, React, TypeScript and Tailwind
- `services/api` — FastAPI centralized backend

Each application remains independently structured.

## Backend Direction

Brasaland uses a centralized FastAPI backend under:

`services/api`

The architectural direction is a Layered Modular Monolith.

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

Do not hardcode environment-specific URLs or secrets.

## Technical Source Priority

For implementation decisions:

1. `CONTEXT.md` — company-wide facts
2. Relevant milestone context — feature requirements
3. `AGENTS.md` and applicable `.agents/rules/` — development constraints
4. `docs/ARCHITECTURE_PROPOSAL.md` — only when architecture is relevant
5. Application documentation and existing implementation conventions

Do not load unrelated sources by default.
