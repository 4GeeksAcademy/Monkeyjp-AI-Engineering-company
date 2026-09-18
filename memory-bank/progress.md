# Progress — Brasaland

## Current Milestone

AUTH-01 — Authentication and Route Protection

## Current Status

### Completed

- Incident analysis CLI implemented in `scripts/analyze.py`.
- Shared incident validation and aggregation logic implemented in `packages/incident_analysis/`.
- FastAPI incident endpoints implemented in `services/api`.
- Backend API reorganized into `models/`, `routes/`, `services/`, and `repositories/` layers.
- Python dependency management migrated from `requirements.txt` to `uv` using `pyproject.toml` and `uv.lock`.
- Backoffice incident-analysis UI integrated with the API.
- Backoffice migrated from static HTML/JavaScript to Next.js, React, TypeScript and Tailwind CSS.
- Backoffice API configuration moved to `NEXT_PUBLIC_API_URL`.
- `.env.local` is used for local or Codespaces-specific frontend values and `.env.example` documents the required configuration.
- CSV upload, analysis rendering and CSV export verified end-to-end.
- Provided 100-row fixture produces the expected 96 valid / 4 invalid result and satisfaction average of 3.46.
- Supplier Directory backend implemented in `services/api` using FastAPI, TinyDB and Pydantic.
- Supplier API supports create, list, detail, rate update, status update, delete, country filtering and category filtering.
- Supplier seeder loads the 15 Brasaland suppliers from the milestone context and is idempotent.
- Supplier rate changes update `updated_at` for audit traceability.
- Backoffice Supplier Directory implemented in `uis/backoffice`.
- Supplier UI supports country/category filtering, supplier creation, rate updates and active/suspended status changes.
- Supplier list uses responsive cards on mobile and a table on larger screens.
- Frontend production build passes with `/suppliers` included.
- JWT authentication implemented in `services/api`.
- Authentication uses `OAuth2PasswordBearer`, `python-jose` and bcrypt password hashing.
- `User` credentials and one-to-one `Profile` data are persisted in TinyDB.
- User credentials are limited to authentication and account fields; display name and contact data live in `Profile`.
- Passwords are stored only as hashes and are never returned by API responses.
- `POST /auth/login` validates credentials and issues signed JWT bearer tokens.
- `GET /auth/me` resolves the authenticated user through the reusable `get_current_user` dependency.
- `/users` supports user creation, listing, detail, update and deletion.
- `/profiles/me` supports authenticated profile retrieval and update.
- JWT tokens include the TinyDB user ID in the `sub` claim.
- JWT expiration is configurable through `ACCESS_TOKEN_EXPIRE_MINUTES`.
- Authentication secrets are loaded from environment configuration through `.env`.
- `.env` is ignored by Git and `.env.example` documents the required API configuration.
- Supplier routes require a valid bearer token.
- Incident Analysis routes require a valid bearer token.
- Missing, invalid and expired tokens return `401`.
- Valid JWT authentication against protected Supplier routes has been verified end-to-end.
- Authentication API compilation and staged diff validation pass.

### Current Integration Notes

- The incident API currently stores the latest result in process-local memory.
- State is lost when the API restarts and is not shared between multiple workers.
- Incident result persistence remains outside the current milestone scope.
- Browser access from GitHub Codespaces requires the forwarded API port to be accessible to the frontend.
- The backoffice reads its API base URL from `NEXT_PUBLIC_API_URL`.
- Supplier data is persisted locally with TinyDB under `services/api/data/`.
- User and Profile authentication data are persisted locally with TinyDB under `services/api/data/`.
- TinyDB document IDs are exposed as Supplier IDs and User IDs through the API.
- Runtime TinyDB data files are ignored by Git.
- The API requires `AUTH_SECRET_KEY` to start authentication services.
- `ACCESS_TOKEN_EXPIRE_MINUTES` defaults to 30 minutes when not explicitly configured.
- The current backoffice frontend does not yet send JWT bearer tokens.
- Existing backoffice API calls to protected Supplier and Incident routes may therefore fail until frontend authentication support is implemented in a later milestone.

## Open Tasks

- Integrate JWT login and bearer-token handling into the backoffice frontend when required by a future milestone.
- Confirm production authentication secrets are provided through deployment environment configuration and never committed.
- Confirm CORS configuration remains limited to appropriate development and production origins.
- Capture required milestone screenshots if requested by the course.
- Push the `feature/auth-api` branch and prepare the PR if required.
- Migrate `uis/website` from static HTML/JavaScript to Next.js, React, TypeScript and Tailwind CSS.

## Active Architectural Decisions

- Central backend: `services/api` using FastAPI.
- Backend structure follows a lightweight layered architecture using `models/`, `routes/`, `services/`, and `repositories/`.
- Python backend dependencies are managed with `uv`; `pyproject.toml` defines project dependencies and `uv.lock` pins resolved versions.
- Incident business logic remains in `packages/incident_analysis` and is shared by CLI and API.
- Explicit milestone API contracts take precedence over proposed future route conventions.
- Incident result persistence remains intentionally in-memory for this milestone.
- Supplier data uses TinyDB persistence through the repository layer.
- Authentication User and Profile data use TinyDB persistence through the repository layer.
- Authentication uses signed JWT bearer tokens with `OAuth2PasswordBearer`.
- Password hashing uses bcrypt and plaintext passwords must never be persisted or compared directly.
- `User` stores credentials and account state; personal display and contact data belong to `Profile`.
- `get_current_user` is the reusable authentication dependency for protected API routes.
- Internal Supplier and Incident Analysis routes require authentication.
- Authentication secrets come from environment configuration; `.env` is local-only and `.env.example` is versioned.
- Brasaland frontend applications are converging on Next.js, React, TypeScript and Tailwind CSS.
- `uis/backoffice` has migrated to the target frontend stack.
- `uis/website` remains on the legacy static stack until its migration is completed.

## Known Issues

- The backoffice frontend does not yet implement authentication or attach JWT bearer tokens to protected API requests.
- Talent Pipeline Tracker has an intermittent browser Web Vitals console error during client-side navigation.
- The Talent Pipeline Tracker Web Vitals issue does not currently affect application business functionality.

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
- Supplier Directory — Lightweight Storage API
- AUTH-01 — Authentication and Route Protection
  - JWT login and current-user resolution implemented.
  - User and Profile persistence implemented with TinyDB.
  - Password hashing and configurable token expiration implemented.
  - Supplier and Incident Analysis routes protected with bearer authentication.
  - Missing, invalid and expired token behavior validated.
- Milestone 2 was realigned with the official context and now includes the exact domain models for menu items, sales, locations, waste, and country metrics; collection and search utilities; financial calculations; performance scoring; aggregations/reports; and business validations. The legacy Brasa Points-based implementation was removed, and the package typecheck and build pass.
