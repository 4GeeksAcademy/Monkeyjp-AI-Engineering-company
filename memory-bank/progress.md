# Progress

## Current Milestone

Milestone 3 — Talent Pipeline Tracker

## Current Objective

Build Brasaland's internal Talent Pipeline Tracker as a new Next.js application under:

`uis/talent-pipeline-tracker`

The application will consume the provided Talent Tracker REST API and allow the People & Talent team to manage candidates, filters, pipeline stages, statuses and internal notes.

## Completed

### Milestone 1 — Web Fundamentals

- Built the Brasaland public website under `uis/website`.
- Created `index.html`.
- Created `application.html`.
- Added `validation.js` for client-side form validation.
- Implemented responsive navigation and page structure.
- Added Brasaland business and location information.
- Implemented Brasa Points registration requirements and age validation.

### Milestone 2 — Programming and TypeScript

- Created the Brasaland domain package under `packages/brasaland-domain`.
- Defined TypeScript interfaces and domain models.
- Added restaurant/location domain data.
- Implemented validation utilities.
- Implemented collection filtering.
- Implemented sorting utilities.
- Implemented data transformations.
- Implemented linear search.
- Implemented binary search.
- Added collection and business utility functions.
- Verified the package with TypeScript checks and demo execution.

### Agent Infrastructure

- Added root `AGENTS.md`.
- Added `memory-bank/`.
- Added repository agent rules under `.agents/rules/`.
- Added supporting agent and skill infrastructure.
- Merged the Agent Memory Bank work into `main`.

## In Progress

### Milestone 3 — Talent Pipeline Tracker

Preparing the repository and project context before implementation.

Current work:

- Validate and update the Memory Bank.
- Review the Talent Tracker API contract.
- Create the new Next.js application under `uis/talent-pipeline-tracker`.

## Planned

### Talent Pipeline Tracker

- Initialize Next.js with TypeScript, App Router, Tailwind CSS and ESLint.
- Configure `NEXT_PUBLIC_API_URL`.
- Define candidate and note API types.
- Implement the API service layer.
- Display all applications.
- Search candidates by name or email without reloading the page.
- Filter applications by status.
- Filter applications by stage.
- Persist status and stage filters in URL query parameters.
- Open candidate detail views without losing list context.
- Update candidate status and stage.
- Add internal notes.
- Delete internal notes.
- Create new applications.
- Edit existing applications.
- Implement loading states.
- Implement clear error states.
- Provide success feedback for mutations.
- Run lint and production build validation.

## Next Steps

1. Finish synchronizing the Memory Bank with the current repository state.
2. Review the Talent Tracker REST API documentation.
3. Create `uis/talent-pipeline-tracker`.
4. Initialize the Next.js application.
5. Begin implementation with API types and service functions.

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

The Talent Pipeline Tracker will be implemented as a separate application under:

`uis/talent-pipeline-tracker`

It will use Next.js, React and TypeScript as required by Milestone 3.

Existing Brasaland interfaces will not be migrated to Next.js solely to align technology stacks.

The application will consume the externally provided Talent Tracker REST API rather than introducing a Brasaland-owned backend service for candidate management.
