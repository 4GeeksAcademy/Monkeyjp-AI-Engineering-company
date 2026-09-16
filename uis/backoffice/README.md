# Brasaland Backoffice

Internal operational interface for Brasaland.

## Purpose

This application provides internal tools for Brasaland staff.

It is independent from the public website and maintains its own layout, routing, dependencies and application structure.

## Technology

- Next.js
- React
- TypeScript
- Tailwind CSS
- App Router

## Current Structure

    uis/backoffice/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/
    │   └── incidents/
    ├── services/
    │   └── incidents.ts
    ├── types/
    │   └── incidents.ts
    ├── public/
    ├── package.json
    └── tsconfig.json

### Responsibilities

- `app/` — routes, layouts and page composition
- `components/` — reusable React UI components
- `services/` — communication with external or backend APIs
- `types/` — application TypeScript contracts
- `public/` — static assets

## Incident Analysis

The backoffice integrates with the Brasaland FastAPI service for incident analysis.

Relevant API endpoints:

- `POST /api/incidents/analyze`
- `GET /api/incidents/results/export`

The frontend flow is:

    React components
           ↓
    services/incidents.ts
           ↓
    NEXT_PUBLIC_API_URL
           ↓
    services/api
           ↓
    packages/incident_analysis

Business validation and aggregation logic is owned by the shared incident-analysis package and backend service.

Do not duplicate that logic in the frontend.

## Configuration

The backend API base URL is configured with:

    NEXT_PUBLIC_API_URL=http://localhost:8000

Use `.env.local` for local or Codespaces-specific values.

Example:

    NEXT_PUBLIC_API_URL=https://<codespace>-8000.app.github.dev

Environment-specific URLs must not be hardcoded in application source code.

Do not commit `.env.local` or secrets.

## Run Locally

Install dependencies:

    npm install

Start the development server:

    npm run dev

The application is normally available at:

    http://localhost:3000

The FastAPI backend must run separately under:

    services/api

When using GitHub Codespaces, the backend port may need to be forwarded or made public for browser access.

## Build

Validate the production build with:

    npm run build

## Incident Validation

For incident-analysis changes, verify:

- CSV upload works
- analysis results render correctly
- invalid-record information is visible
- category and status summaries render correctly
- satisfaction metrics render correctly
- CSV export works
- API errors are communicated to the user

## Related Context

For milestone-specific incident requirements, use:

`docs/incidents-analysis/CONTEXT-brasaland.md`

For company-wide Brasaland facts, use:

`CONTEXT.md`
