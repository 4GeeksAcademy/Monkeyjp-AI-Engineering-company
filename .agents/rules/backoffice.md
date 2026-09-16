---
description: Brasaland backoffice-specific development rules
globs:
  - "uis/backoffice/**/*"
alwaysApply: false
---

# Brasaland Backoffice Rules

- Files under `uis/backoffice/` belong to the internal Brasaland operations interface.

- The backoffice must maintain its own layout, routing, dependencies and application structure.

- Do not depend on the public website layout.

- The backoffice uses Next.js, React, TypeScript and Tailwind CSS.

- Follow the existing Next.js App Router architecture and application conventions.

- Use application-level environment configuration for environment-specific backend URLs.

- Do not hardcode Codespace, localhost, production or user-specific backend URLs in application logic.

- API communication should be centralized in application service modules rather than duplicated across React components.

- Internal views must display meaningful operational information rather than generic placeholder content.

- Preserve the existing FastAPI integration contract unless a milestone or architecture change explicitly requires otherwise.

- Do not duplicate backend or shared business logic in frontend components.
