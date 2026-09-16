---
description: Brasaland backoffice-specific development rules
globs:
  - "uis/backoffice/**/*"
alwaysApply: false
---

# Brasaland Backoffice Rules

- Files under `uis/backoffice/` belong to the internal Brasaland operations interface.
- The backoffice must maintain its own layout.
- Do not depend on the public website layout.
- Internal views must display meaningful operational information rather than generic placeholder content.
- Use the existing application architecture and styling approach unless a migration is explicitly approved.