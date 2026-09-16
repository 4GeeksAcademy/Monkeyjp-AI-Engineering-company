---
description: Milestone 2 domain-model rules for the Brasaland TypeScript domain package
globs:
  - "packages/brasaland-domain/**/*.ts"
alwaysApply: false
---

# Brasaland Milestone 2 Domain Rules

## Scope

This rule applies to the TypeScript domain package under:

`packages/brasaland-domain/**/*.ts`

## Source of Truth

Use the official Milestone 2 context as the primary reference:

- `docs/domain-models/CONTEXT-brasaland.es.md`

Do not invent or rename milestone contracts.

## Required Structure

Keep the package aligned to this structure:

```text
src/
├── types/
│   └── models.ts
├── utils/
│   ├── collections.ts
│   ├── search.ts
│   ├── transformations.ts
│   └── validations.ts
└── index.ts
```

## Working Rules

- Keep the package reusable and independent from UI frameworks.
- Prefer the smallest relevant read: the matching context section and the target file being edited.
- Do not inspect unrelated UI, backend, or milestone files unless the task requires it.
- Keep utilities pure and avoid mutating input arrays.
- Preserve the existing Milestone 2 contracts and exports defined by the package.
- Do not duplicate milestone requirements inside this rule; reference the relevant context section instead.
