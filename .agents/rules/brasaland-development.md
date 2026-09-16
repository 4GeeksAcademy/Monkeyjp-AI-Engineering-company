---
description: Shared frontend development rules for Brasaland user-facing applications
globs:
  - "uis/**/*.{html,js,jsx,ts,tsx,css}"
alwaysApply: false
---

# Brasaland Frontend Development Rules

## Scope

This rule applies to user-facing application files under:

`uis/**`

Application-specific requirements belong to their corresponding context, README, or scoped rule.

Do not load or apply requirements from unrelated Brasaland applications.

## Business Alignment

User-visible business content must be consistent with:

1. Root `CONTEXT.md`
2. The relevant milestone-specific context
3. Existing centralized application data or the API assigned to the application

Do not invent business facts such as:

- restaurant locations
- loyalty program rules
- company history
- contact information
- operating countries
- business capabilities

## Brasaland Terminology

Use official business names consistently:

- Brasaland
- Brasaland Digital
- Brasa Points

Do not replace established Brasaland terminology with generic alternatives unless explicitly requested.

## Application Independence

Applications under `uis/` must remain independent unless integration is explicitly required.

Do not:

- reuse another application's layout by default
- move application files between `uis/` projects
- migrate an application to another framework
- introduce another application's dependencies

without developer confirmation.

## Accessibility

Frontend implementation should use:

- semantic HTML
- meaningful heading structure
- accessible buttons and links
- visible keyboard focus
- labels for form controls
- meaningful text alternatives for relevant images

## Styling

Follow the styling technology already configured for the application being modified.

Do not introduce another CSS framework or styling system without developer confirmation.

## Data and API Usage

Use existing application data sources and APIs when available.

Do not duplicate business rules already provided by:

- a shared package
- an assigned API
- an existing centralized application data source

Do not hardcode environment-specific API URLs when runtime or environment configuration is available.

## Change Discipline

Keep changes focused on the requested task.

Do not refactor unrelated UI code.

Prefer the smallest coherent change that satisfies the requirement.