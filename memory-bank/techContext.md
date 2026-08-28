# Technical Context — Brasaland

## Repository Architecture

This project follows the existing AI Engineering company monorepo structure.

Applications must be placed according to their responsibility.

### User Interfaces

All human-facing applications belong under:

`/uis`

Current applications:

- `/uis/website` — public Brasaland corporate website.
- `/uis/backoffice` — internal Brasaland operations application.

These applications must remain independent and maintain their own layout and application entry points.

### Backend Services

Backend APIs and background services belong under:

`/services`

The monorepo recommends keeping backend functionality centralized rather than introducing unnecessary microservices.

No backend service should be created unless the current feature requires server-side behavior.

### AI Product Code

The existing top-level directories:

- `/agents`
- `/skills`
- `/mcps`

belong to AI product functionality.

They must not be confused with:

`.agents/`

which configures development agents working on this repository.

## Agent Infrastructure

Development-agent configuration lives in:

`.agents/`

Rules are stored in:

`.agents/rules/`

Reusable development-agent skills are stored in:

`.agents/skills/`

The repository-wide agent workflow is defined in:

`AGENTS.md`

Persistent project context is stored in:

`memory-bank/`

## Frontend Direction

The public website must follow the requirements defined in `CONTEXT.md`.

The website should:

- Represent the Brasaland brand.
- Be responsive.
- Be accessible.
- Use reusable UI components.
- Support the Brasa Points business requirements.
- Be SEO friendly.

Tailwind is the required styling approach described by the company context.

## Website Information Architecture

The public landing page includes:

1. Header/navigation
2. Hero
3. Our Story
4. What Makes Us Unique
5. Locations
6. Brasa Points
7. Contact
8. Footer

## Business Data

Known location distribution:

### Colombia

- Medellín
- Bogotá
- Cali

10 restaurants total.

### United States

- Miami
- Orlando

4 restaurants total.

## Brasa Points Rules

Brasa Points awards:

- 1 point per 10,000 COP.
- 1 point per 5 USD.

Registration is restricted to users aged 18 or older.

## Engineering Constraints

Agents must:

- Reuse existing repository structure.
- Avoid unnecessary folder duplication.
- Read the relevant directory README before creating an application or service.
- Avoid moving files between top-level domains without developer confirmation.
- Avoid introducing backend services when frontend-local data is sufficient for the current milestone.
- Keep the public website and backoffice layouts independent.
- Keep business decisions aligned with `CONTEXT.md`.

## Source of Truth Priority

When implementing a feature, consult sources in this order:

1. `CONTEXT.md`
2. `memory-bank/`
3. `AGENTS.md`
4. `.agents/rules/`
5. application-specific documentation
6. implementation code

`CONTEXT.md` remains authoritative for business facts.