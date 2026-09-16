# `uis` — User Interfaces

This directory contains Brasaland user-facing applications.

Each subdirectory represents an independent frontend application with its own structure, dependencies, runtime configuration, and documentation.

## Current Applications

- `website` — public Brasaland website.
- `backoffice` — internal operational interface.
- `talent-pipeline-tracker` — internal People & Talent application.

## Organization

Use one subdirectory per distinct application or business concern.

Applications under `uis/` must remain independent unless an explicit integration or migration is approved.

Application-specific requirements belong in:

- the relevant milestone context under `docs/`
- the application's own `README.md`
- applicable `.agents/rules/`

Do not duplicate milestone specifications in this file.

## Documentation

Each application README should document only:

- purpose
- technology stack
- important structure
- how to run the application
- how to validate it
- application-specific technical notes

> _Estas instrucciones también están disponibles en [español](./README.es.md)._