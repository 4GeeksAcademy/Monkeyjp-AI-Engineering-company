# Project Progress — Brasaland

## Current Milestone

Agent Memory Bank and initial application infrastructure.

## Current Objective

Prepare the Brasaland monorepo so development agents can work with persistent business context, technical constraints and a repeatable delivery workflow.

## Completed

- [x] Company context loaded into root `CONTEXT.md`
- [x] Brasaland business scenario identified
- [x] Monorepo structure reviewed
- [x] `uis/README.md` reviewed
- [x] `services/README.md` reviewed
- [x] Memory bank initialized

## In Progress

- [ ] Repository-wide `AGENTS.md`
- [ ] Development rules under `.agents/rules`
- [ ] Reusable agent skill
- [ ] Public website in `uis/website`
- [ ] Internal backoffice in `uis/backoffice`

## Planned

### Agent Infrastructure

- Create `AGENTS.md`
- Add repository development rule
- Add reusable pre-delivery skill

### Public Website

Create the initial Brasaland corporate website containing business information defined in `CONTEXT.md`.

### Backoffice

Create an independent backoffice interface showing useful Brasaland operational information.

## Known Business Requirements

- Brasaland operates 14 restaurants.
- 10 restaurants are located in Colombia.
- 4 restaurants are located in Florida.
- Brasa Points is the company's digital loyalty program.
- Customers must be at least 18 years old to register.
- Online ordering is not currently available.

## Decisions

### 2026-08-28 — Memory Bank

The project will use three persistent context documents:

- `projectbrief.md`
- `techContext.md`
- `progress.md`

### 2026-08-28 — Agent Configuration

Development-agent configuration will use `.agents/`.

The top-level `/agents` and `/skills` folders will remain reserved for future product-level AI functionality.

## Next Steps

1. Define repository agent workflow.
2. Add development rules.
3. Add pre-delivery verification skill.
4. Initialize `uis/website`.
5. Initialize `uis/backoffice`.
6. Validate applications.
7. Update this file before delivery.