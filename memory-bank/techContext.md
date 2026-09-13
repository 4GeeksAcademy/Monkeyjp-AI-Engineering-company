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

Planned application:

- `/uis/talent-pipeline-tracker` — internal People & Talent application for managing recruitment candidates and pipeline activity.

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

## Talent Pipeline Tracker

The People & Talent application lives under:

`uis/talent-pipeline-tracker`

It is an independent frontend application and must not be merged into either the public website or the backoffice.

### Technology Stack

The Talent Pipeline Tracker uses:

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- ESLint

The application maintains its own:

- `package.json`
- application entry point
- routing
- layout
- environment configuration
- frontend dependencies

### API Integration

The application consumes the external Talent Tracker REST API:

`https://playground.4geeks.com/tracker/api/v1`

The API base URL must be configured through:

`NEXT_PUBLIC_API_URL`

Local development configuration belongs in:

`.env.local`

A safe configuration template should be committed as:

`.env.example`

All API communication must be asynchronous.

The user interface must explicitly communicate:

- loading states
- mutation success
- API errors

Failures must not occur silently.

### Functional Scope

The Talent Pipeline Tracker must support:

- Listing all candidate applications.
- Displaying candidate name, position, current status and current stage.
- Searching candidates by name or email without reloading the page.
- Filtering candidates by status.
- Filtering candidates by stage.
- Keeping status and stage filters in URL query parameters.
- Opening a candidate detail view.
- Updating candidate status.
- Updating candidate stage.
- Adding internal notes.
- Deleting internal notes.
- Creating new candidate applications.
- Editing existing candidate applications.

### State Management Direction

Use React component state and framework hooks unless shared state becomes genuinely necessary.

Do not introduce global state libraries solely for this milestone.

Status and stage filters should be represented in the URL query string so navigation and filtering state can be preserved.

Search input may remain local component state.

### Separation from Existing Interfaces

The Talent Pipeline Tracker is separate from:

- `uis/website`
- `uis/backoffice`

The public website remains a static HTML/Tailwind/JavaScript application.

The backoffice remains an independent internal interface.

The Talent Pipeline Tracker introduces Next.js only within its own application directory and does not require migrating existing interfaces.

## Backend and API Decision

No Brasaland-owned backend service needs to be created for the Talent Pipeline Tracker.

The application consumes the externally provided Talent Tracker REST API.

The existing public website and backoffice may continue using frontend-local data where appropriate.

A new service under `/services` should only be introduced when future functionality specifically requires Brasaland-owned server-side processing, persistence or APIs.
