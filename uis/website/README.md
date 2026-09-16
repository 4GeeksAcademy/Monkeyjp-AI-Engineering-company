# Brasaland Public Website

Public-facing corporate website for Brasaland.

## Purpose

This application presents the Brasaland brand, company information, restaurant locations, Brasa Points, and customer-facing registration flows.

Milestone-specific business requirements belong in:

`docs/public-website/CONTEXT-brasaland.md`

Do not duplicate the full milestone specification in this README.

## Technology

- Static HTML
- Tailwind CSS via CDN
- Vanilla JavaScript

## Current Structure

- `index.html` — public landing page
- `application.html` — Brasa Points registration flow
- `validation.js` — client-side form validation

## Run Locally

From this directory:

    python3 -m http.server 5500

Then open the local or forwarded development URL.

## Development Notes

- Preserve the existing lightweight static architecture unless a migration is explicitly approved.
- Keep the public website independent from `uis/backoffice` and `uis/talent-pipeline-tracker`.
- Use official Brasaland terminology and business data from the relevant context or existing centralized source.
- Do not introduce backend dependencies unless the feature explicitly requires server-side behavior.
- Reuse existing UI patterns where practical.
- Maintain responsive and accessible behavior.

## Validation

For website changes, verify:

- pages load without browser errors
- responsive layout works on mobile and desktop
- navigation works
- Brasa Points form validation behaves as required
- dependent country, city, and location fields work correctly
- required error and success states remain visible and understandable

## Related Documentation

Company-wide context:

`CONTEXT.md`

Public website milestone requirements:

`docs/public-website/CONTEXT-brasaland.md`
