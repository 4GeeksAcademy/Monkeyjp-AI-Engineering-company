# Backend Architecture — Brasaland

This document captures the current architectural direction and durable technical decisions for the Brasaland backend.

It is intentionally concise. Operational details, endpoints, run commands, environment variables, and validation steps belong in the relevant application README or milestone context.

---

## 1. Architectural Direction

Brasaland uses a centralized backend under:

`services/api`

The selected pattern is a **Layered Modular Monolith** implemented with FastAPI.

This approach keeps deployment simple while separating responsibilities clearly enough for the backend to grow without becoming tightly coupled.

The architecture is designed to support incremental evolution rather than introducing microservices or distributed infrastructure prematurely.

---

## 2. Backend Structure

The API follows a lightweight layered structure:

`models/`

- Pydantic request and response schemas.
- Validation and serialization concerns.
- Must not contain business logic.

`routes/`

- FastAPI transport layer.
- Defines endpoints, HTTP methods, response models, status codes, and dependencies.
- Should remain thin.

`services/`

- Application and business logic.
- Coordinates use cases and domain rules.
- Contains authentication orchestration where applicable.

`repositories/`

- Persistence and state access.
- Isolates services from storage implementation details.

`main.py`

- FastAPI application entry point.
- Registers routers and global middleware such as CORS.

Not every capability must use every layer if a layer would add no useful responsibility.

---

## 3. Current Backend Capabilities

The centralized API currently includes:

- Incident Analysis
- Supplier Directory
- User credential management
- User Profile management
- JWT authentication and route protection

Future domains may include:

- locations
- loyalty
- menu
- orders
- internally owned talent persistence

The current Talent Pipeline Tracker continues to use its milestone-specific external API.

---

## 4. Persistence Strategy

Persistence is intentionally abstracted behind repositories.

Different domains may currently use different storage mechanisms.

### Incident Analysis

The latest analysis result is stored in process-local memory.

Consequences:

- state is lost on API restart
- multiple workers do not share the latest result
- persistence can be introduced later without changing the transport contract

### Supplier Directory

Supplier data is persisted using TinyDB.

### Authentication

User and Profile data are persisted using TinyDB.

TinyDB document IDs are exposed through the application layer as string IDs.

Runtime data under `services/api/data/` is not committed.

TinyDB is a lightweight milestone-level persistence solution, not a commitment to use it for every future domain.

---

## 5. Authentication and Authorization

Authentication is a transversal backend capability.

The implementation currently uses:

- FastAPI `OAuth2PasswordBearer`
- signed JWT bearer tokens
- `python-jose`
- bcrypt password hashing
- reusable `get_current_user` dependency
- environment-based secret configuration

The JWT stores the TinyDB User ID in the `sub` claim.

`User` contains credential and account-related data.

`Profile` contains display and contact data and has a one-to-one relationship with User.

Plaintext passwords must never be persisted.

Password hashes must never be exposed through API response models.

Internal Supplier and Incident Analysis routes currently require authentication.

Frontend login and JWT propagation are intentionally deferred to a later integration milestone.

---

## 6. Configuration

Environment-specific configuration and secrets must not be hardcoded.

The backend currently uses environment configuration for authentication, including:

- `AUTH_SECRET_KEY`
- `ACCESS_TOKEN_EXPIRE_MINUTES`

Local secrets belong in ignored `.env` files.

Required variables are documented through `.env.example`.

Frontend applications must also keep environment-specific backend URLs outside source code.

The backoffice currently uses:

`NEXT_PUBLIC_API_URL`

---

## 7. API Route Strategy

FastAPI routers are grouped by resource or capability.

The original architecture proposal considered a global `/api/v1` prefix.

Current milestone implementations define explicit route contracts that take precedence over that earlier convention.

Existing routes should therefore not be renamed solely to conform to the original proposal.

Formal versioning such as `/api/v1` may be introduced later when there is a concrete compatibility or migration requirement.

---

## 8. Frontend and Backend Separation

Frontend applications and backend services remain independent systems communicating over HTTP.

User interfaces must not access TinyDB, repository internals, or other backend storage mechanisms directly.

All backend data access is mediated through the API.

Current applications include:

- `uis/website`
- `uis/backoffice`
- `uis/talent-pipeline-tracker`
- `services/api`

The backoffice is already integrated with the centralized API for Incident Analysis and Supplier Directory functionality.

The public website has not yet been migrated to consume the centralized API for its core business flows.

---

## 9. Shared Logic

Reusable transport-independent business logic belongs under:

`packages/`

Current examples include:

- `packages/brasaland-domain`
- `packages/incident_analysis`

Incident Analysis business logic remains in `packages/incident_analysis` and is reused by the API rather than duplicated inside FastAPI routes or services.

Shared logic should remain transport-independent where practical.

---

## 10. Core Architectural Decisions

1. Use one centralized FastAPI backend under `services/api`.

2. Maintain a lightweight layered architecture using:
   - `models/`
   - `routes/`
   - `services/`
   - `repositories/`

3. Keep HTTP transport logic thin.

4. Keep business logic outside routers.

5. Isolate persistence behind repositories.

6. Allow different domains to use different persistence implementations when justified.

7. Use explicit milestone API contracts instead of refactoring working routes only to match older architectural proposals.

8. Use environment configuration for URLs, secrets, and runtime-specific values.

9. Treat authentication as a reusable transversal capability.

10. Avoid exposing persistence records directly when they contain internal or sensitive fields.

---

## 11. Key Risks

### Business Logic in Routers

Risk:

- transport and business concerns become tightly coupled

Mitigation:

- delegate application logic to services

### Persistence Coupling

Risk:

- services become dependent on TinyDB or another specific database implementation

Mitigation:

- keep persistence behind repositories

### Sensitive Data Exposure

Risk:

- password hashes or internal fields are returned accidentally

Mitigation:

- use dedicated Pydantic response models

### Weak Authentication Configuration

Risk:

- predictable or committed JWT signing secrets

Mitigation:

- require environment-provided secrets and never commit `.env`

### CORS Misconfiguration

Risk:

- production API becomes accessible from unintended origins

Mitigation:

- use explicit approved origins in production

### Frontend Authentication Gap

Risk:

- existing backoffice requests return `401` after backend routes are protected

Mitigation:

- add frontend login and bearer-token propagation in a later integration milestone

### Lightweight Storage Limitations

Risk:

- TinyDB becomes unsuitable as requirements grow

Mitigation:

- preserve repository abstractions so storage can evolve independently of services and routes

---

## 12. Architecture Source of Truth

For architecture-related work, use this document together with:

- `CONTEXT.md`
- the relevant milestone context
- `AGENTS.md`
- the applicable `.agents/rules/`
- `memory-bank/techContext.md`

Operational details belong in the relevant application README.

Current implementation status belongs in:

`memory-bank/progress.md`

Do not load unrelated documentation by default.

---

## 13. Current Architecture Summary

Brasaland currently uses a centralized FastAPI Layered Modular Monolith.

Implemented backend capabilities include:

- Incident Analysis
- Supplier Directory
- User and Profile management
- JWT authentication and protected routes

Persistence currently consists of:

- process-local memory for Incident Analysis
- TinyDB for Suppliers
- TinyDB for User and Profile authentication data

The architecture remains intentionally incremental and can support future domains without requiring a redesign of the existing backend structure.
