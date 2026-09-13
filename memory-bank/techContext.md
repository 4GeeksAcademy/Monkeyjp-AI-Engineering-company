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
- Maintain consistent and reusable interface patterns.
- Support the Brasa Points business requirements.
- Be SEO friendly.

The current public website uses Tailwind CSS through CDN and vanilla JavaScript.

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

## Existing Public Website

The existing public website uses static HTML, Tailwind CSS through CDN and vanilla JavaScript.

Current files:

- `uis/website/index.html`
- `uis/website/application.html`
- `uis/website/validation.js`

The website does not currently use a JavaScript package manager or frontend bundler.

For the current milestone, this architecture will be preserved.

The public website contains:

- Corporate Brasaland landing page
- Responsive navigation
- Business and location information
- Brasa Points information
- Brasa Points registration application
- Client-side form validation

## Existing Domain Package

A TypeScript domain package already exists under:

`packages/brasaland-domain`

It contains:

- Domain models
- Restaurant data
- Validation utilities
- Transformation utilities
- Search utilities
- Collection utilities

Because the current public website runs directly in the browser without a TypeScript build process, it does not directly import the domain package.

Do not introduce a frontend bundler solely to remove this duplication unless explicitly requested.

## Backoffice

The internal application lives under:

`uis/backoffice`

The current implementation uses static HTML and Tailwind CSS through CDN, matching the lightweight approach already used by the public website.

The backoffice:

- Has its own independent layout.
- Has its own `index.html` entry point.
- Does not reuse the public website layout.
- Shows Brasaland-specific operational information.
- Does not currently require a backend service.

Current business information displayed includes:

- 14 total restaurant locations
- 10 locations in Colombia
- 4 locations in Florida
- Brasa Points information
- Brasaland Digital priorities

## Backend Decision

No backend service is required for the current milestone.

The information displayed by the initial website and backoffice can be rendered using existing frontend-local data.

A service under `/services` should only be introduced when future functionality requires server-side processing, persistence or APIs.