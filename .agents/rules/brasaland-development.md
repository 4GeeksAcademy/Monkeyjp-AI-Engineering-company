---
description: Development rules for Brasaland user-facing applications
globs:
  - "uis/**/*.{js,jsx,ts,tsx,css}"
alwaysApply: false
---

# Brasaland UI Development Rule

## Scope

This rule applies to frontend application files under:

`uis/**`

It governs both:

- `uis/website`
- `uis/backoffice`

## Business Alignment

All user-visible business content must be consistent with the root `CONTEXT.md`.

Do not invent:

- restaurant locations
- loyalty program rules
- company history
- contact information
- operating countries
- business capabilities

When business data is needed, retrieve it from `CONTEXT.md` or an existing centralized application data source.

## Brasaland Terminology

Use the official business names:

- Brasaland
- Brasaland Digital
- Brasa Points

Do not rename Brasa Points to generic terms such as:

- Rewards
- Loyalty Club
- Points Program

unless explicitly requested.

## Public Website

Files under:

`uis/website/**`

must represent the public Brasaland brand.

Reusable components should be preferred for repeated UI patterns such as:

- navigation
- sections
- cards
- call-to-action elements
- footer elements

## Backoffice

Files under:

`uis/backoffice/**`

must belong to the internal application.

The backoffice must maintain its own layout and must not depend on the public website layout.

The entry view must show useful Brasaland business information rather than generic dashboard placeholder text.

## Accessibility

Frontend implementation should use:

- semantic HTML
- meaningful headings
- accessible buttons and links
- visible keyboard focus
- adequate text alternatives for meaningful images
- labels for form controls

## Styling

Follow the styling technology already configured for each application.

Do not introduce another CSS framework without developer confirmation.

## Change Discipline

Do not refactor unrelated UI code while implementing a focused task.

Prefer the smallest change that satisfies the requirement.