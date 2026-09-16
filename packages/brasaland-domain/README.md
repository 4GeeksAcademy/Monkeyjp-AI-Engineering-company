# Brasaland Domain

Shared TypeScript package containing Brasaland Milestone 2 domain models and utilities.

## Purpose

This package centralizes reusable operational logic for Brasaland restaurants, including menu, sales, location, waste, and reporting data.

It remains independent from specific user interfaces and frontend frameworks.

## Features

Includes:

- menu item, sales, location, and waste record models
- filtering for sales, menu items, and active locations
- ascending and descending sorting for locations and menu items
- linear and binary search utilities
- financial calculations and currency conversion
- location performance scoring and ranking
- operational aggregations and country-level reporting
- business validation for menu items, transactions, and locations

## Structure

```text
src/
├── types/
│   └── models.ts
├── utils/
│   ├── collections.ts
│   ├── search.ts
│   ├── transformations.ts
│   └── validations.ts
├── index.ts
└── ...
```

## Source of Truth

The Milestone 2 domain definition and business requirements are documented in:

- docs/domain-models/CONTEXT-brasaland.es.md

This file is the reference for the current Brasaland model structure and expected behavior.

## Design Rules

- Keep this package reusable and decoupled from applications under `uis/`.
- Do not introduce dependencies on Next.js, React, FastAPI, or other application frameworks.
- Do not duplicate business rules already defined in this package inside its consumers.
- Keep utilities aligned with the Brasaland operational domain and Milestone 2 requirements.

## Validation

When modifying this package, run the checks or scripts already defined in its local configuration.

Avoid introducing new tooling solely to validate a small change.
