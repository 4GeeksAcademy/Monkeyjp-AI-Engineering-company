# Project Brief — Brasaland

## Purpose

This repository contains the digital products and internal tools developed for Brasaland as part of the AI Engineering company project.

Company-wide business facts live in:

`CONTEXT.md`

Milestone-specific requirements live under:

`docs/<milestone>/`

Do not duplicate those specifications here.

## Product Areas

The monorepo currently contains:

- Public customer experiences under `uis/website`
- Internal operations tools under `uis/backoffice`
- People & Talent tools under `uis/talent-pipeline-tracker`
- Backend services under `services/`
- Shared libraries under `packages/`

Additional products may be added as new milestones require them.

## Project Direction

The project evolves incrementally through milestones.

Existing applications should remain independent unless an explicit architectural decision requires integration or migration.

Shared functionality should be extracted only when multiple consumers genuinely require it.

## Context Routing

For business requirements:

1. Read `CONTEXT.md`.
2. Read only the context for the current milestone.
3. Use application documentation for implementation-specific details.

This file is a project overview, not a milestone specification.
