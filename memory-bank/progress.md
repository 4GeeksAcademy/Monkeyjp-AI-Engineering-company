# Progress

## Current Milestone

Milestone 5 — Backend Architecture Proposal

## Current Objective

Document the proposed architecture for Brasaland's centralized FastAPI backend in `docs/ARCHITECTURE_PROPOSAL.md`, defining its architectural pattern, domain boundaries, module organization, frontend/backend communication, and key technical risks.

## Completed

### Milestone 1 — Project Foundation & AI Context

- Added root `AGENTS.md`.
- Added persistent memory bank (`projectbrief.md`, `techContext.md`, `progress.md`).
- Added repository agent rules under `.agents/rules/`.
- Added supporting agent and skill infrastructure.
- Configured company context and guidelines for AI engineering workflows.

### Milestone 2 — Brasaland Corporate Website

- Built the Brasaland public website under `uis/website`.
- Created `index.html`.
- Created `application.html`.
- Added `validation.js` for client-side form validation.
- Implemented responsive navigation and page structure.
- Added Brasaland business and location information.
- Implemented Brasa Points registration requirements and age validation.

### Milestone 3 — Domain Models & TypeScript Utilities

- Created the Brasaland domain package under `packages/brasaland-domain`.
- Defined TypeScript interfaces and domain models (`models.ts`).
- Added restaurant and location domain data.
- Implemented validation utilities.
- Implemented collection filtering and transformations.
- Implemented sorting and search utilities (linear and binary search).
- Added collection and business utility functions.
- Verified the package with TypeScript checks and demo execution.

### Milestone 4 — Talent Pipeline Tracker

- Implemented the Next.js 16 application under `uis/talent-pipeline-tracker` with TypeScript, App Router, Tailwind CSS and ESLint.
- Integrated the external Talent Tracker REST API through the centralized service layer.
- Implemented the candidate list with URL filters for status, stage and page.
- Added local debounced search by candidate name or email.
- Added API pagination with 20 candidates per page and invalid-page normalization.
- Implemented candidate detail views with status and stage PATCH updates.
- Implemented internal notes CRUD and synchronized notes counts.
- Implemented create and edit candidate flows using the shared form.
- Preserved filtered and paginated list context through detail and edit navigation.
- Added safe internal return URL handling.
- Added the responsive internal Brasaland People & Talent UI.
- Migrated component presentation styling to Tailwind utilities while retaining global design tokens and accessibility foundations.
- Added readable status/stage badges, responsive tablet behavior, visible focus states and reduced-motion support.
- Fixed the `experience_years` form UX so the field can be empty while editing and submits a validated number.
- Confirmed TypeScript, lint and production build validation pass.

### Milestone 5 — Backend Architecture Proposal

- Created the technical proposal under `docs/ARCHITECTURE_PROPOSAL.md`.
- Evaluated architectural patterns and selected a Layered Modular Monolith on FastAPI.
- Defined initial business domains: `locations`, `loyalty` (Brasa Points), and `talent`.
- Identified transversal capabilities: configuration via environment variables, CORS policies, and `/health`.
- Documented frontend/backend decoupling via HTTP/JSON.
- Analyzed technical risks (fat routers, cross-domain coupling, validation drift, CORS configuration, data privacy).
- Documented references to official FastAPI and Pydantic best practices.

## Known Issues

- A browser console Web Vitals `reportAllChanges` / `startTime` TypeError may occur intermittently during client-side navigation.

- The issue was reproduced on Next.js 16.3.3 and 16.3.5, including production builds using `next start`.

- There is no application-level `useReportWebVitals` integration and no Sentry integration.

- The Talent Pipeline Tracker continues to function correctly, and the issue currently appears external to the application business logic.

## Next Steps

1. Investigate the browser console Web Vitals-related error during client-side navigation.
2. Continue maintenance and focused UX improvements for the Talent Pipeline Tracker.

## Notes

- Brasaland is the company context and `CONTEXT.md` remains the source of truth for company-specific requirements.
- The Talent Pipeline Tracker is an internal People & Talent application.
- It is a separate frontend from the public Brasaland website.
- Existing milestone implementations should remain intact.

## Decisions

### 2026-08-28 — Memory Bank

The project uses three persistent context documents:

- `projectbrief.md`
- `techContext.md`
- `progress.md`

### 2026-08-28 — Agent Configuration

Development-agent configuration uses `.agents/`.

The top-level `/agents` and `/skills` directories remain reserved for product-level AI functionality.

### 2026-08-28 — Existing Website Reuse

The existing public Brasaland website under `uis/website` is preserved rather than replaced.

The website remains a static HTML, Tailwind CSS and JavaScript application.

### 2026-08-28 — Backoffice Independence

The Brasaland backoffice under `uis/backoffice` maintains its own layout and remains independent from the public website.

### 2026-09-13 — Talent Pipeline Tracker

The Talent Pipeline Tracker was implemented as a separate application under:

`uis/talent-pipeline-tracker`

It uses Next.js, React and TypeScript as required by Milestone 3.

Existing Brasaland interfaces will not be migrated to Next.js solely to align technology stacks.

The application consumes the externally provided Talent Tracker REST API rather than introducing a Brasaland-owned backend service for candidate management.

### 2026-09-14 — Talent Pipeline Tracker Completion

Completed the core candidate management workflows, responsive People & Talent UI, Tailwind component styling, accessibility improvements, and form UX refinements. TypeScript, lint and production build checks pass. A browser console Web Vitals-related error remains under separate investigation.

### 2026-09-14 — Backend Architecture Proposal

Created the technical proposal for Brasaland's centralized backend under `docs/ARCHITECTURE_PROPOSAL.md`. Selected a Layered Modular Monolith pattern implemented in FastAPI, defining initial business domains (`locations`, `loyalty`, `talent`), transversal core capabilities, separated transport/service/repository layers, and decoupled frontend-backend communication via HTTP/JSON with CORS policies.
