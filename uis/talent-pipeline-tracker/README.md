# Brasaland Talent Pipeline Tracker

Internal People & Talent application for managing recruitment candidates and hiring pipeline activity.

## Purpose

This application provides Brasaland's People & Talent team with a dedicated interface to:

- review candidate applications
- search and filter candidates
- inspect candidate details
- update status and hiring stage
- create and edit candidate applications
- manage internal notes

The application is independent from:

- `uis/website`
- `uis/backoffice`

## Technology

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- ESLint

## API

The application consumes the external Talent Tracker REST API.

Configure the API base URL through:

`NEXT_PUBLIC_API_URL`

Local development values belong in:

`.env.local`

A safe template may be documented in:

`.env.example`

Do not hardcode environment-specific API URLs in application code.

## Run Locally

From this directory:

    npm install
    npm run dev

Then open:

`http://localhost:3000`

## Validation

Run:

    npm run lint
    npm run build

For functional changes, also verify the affected candidate workflow in the browser.

## Development Notes

- Keep the application independent from other Brasaland frontends.
- Preserve the existing Next.js, React, TypeScript and Tailwind stack.
- Use the assigned Talent Tracker API as the source of truth for candidate data and API behavior.
- Do not invent candidate statuses, stages, fields or endpoint behavior.
- Keep loading, success and error states visible to users.
- Keep search and filtering interactions client-friendly and avoid unnecessary full page reloads.
- Prefer local component state and framework hooks unless shared state is genuinely required.

## Related Documentation

Milestone 3 context:

`docs/talent-pipeline/CONTEXT-brasaland.md`

Development rules:

`.agents/rules/talent-pipeline.md`
