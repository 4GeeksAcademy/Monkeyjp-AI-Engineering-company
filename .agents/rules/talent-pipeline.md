---
description: Brasaland Talent Pipeline Tracker development rules
globs:
  - "uis/talent-pipeline-tracker/**/*"
alwaysApply: false
---

# Talent Pipeline Tracker Rules

- The Talent Pipeline Tracker is an independent People & Talent application.
- Do not merge it with `uis/website` or `uis/backoffice`.
- Use `docs/talent-pipeline/CONTEXT-brasaland.md` as the official Milestone 3 source of truth.
- Do not duplicate the full milestone context in this rule.
- Preserve the existing Next.js, React, TypeScript and Tailwind stack.
- Candidate and hiring-pipeline data must come from the assigned Talent Tracker API.
- Do not invent candidate statuses, stages, field names or API behavior.
- Keep raw API values internal; display only the Milestone 3 UI labels defined in the official context.
- Clearly communicate loading states, API errors and successful mutations.
- Search and filtering interactions should not require a full page reload.
