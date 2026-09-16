# Brasaland Domain

Shared TypeScript package containing Brasaland domain models and utilities.

## Purpose

This package centralizes reusable logic related to Brasaland data and business rules.

It must remain independent from specific user interfaces and frontend frameworks.

## Features

Includes:

- interfaces and types for restaurants and Brasa Points registrations
- restaurant and registration filtering
- ascending, descending, and multi-field sorting
- linear search
- binary search over previously sorted collections
- restaurant grouping by city
- reports and aggregations
- Brasa Points business-rule validation

## Structure

```text
src/
├── data/
│   └── restaurants.ts
├── types/
│   └── models.ts
├── utils/
│   ├── collections.ts
│   ├── search.ts
│   ├── transformations.ts
│   └── validations.ts
├── demo.ts
└── index.ts
```

## Design Rules

- Keep this package reusable and decoupled from applications under `uis/`.
- Do not introduce dependencies on Next.js, React, FastAPI, or other application frameworks.
- Do not duplicate business rules already defined in this package inside its consumers.
- Keep reference data and utilities consistent with the Brasaland context.

## Consumers

Applications may use this package when their stack supports importing TypeScript directly or through their build process.

Static applications without a bundler may maintain equivalent local data when necessary, but they must preserve semantic consistency with this package.

## Validation

When modifying this package, run the checks or scripts already defined in its local configuration.

Avoid introducing new tooling solely to validate a small change.
