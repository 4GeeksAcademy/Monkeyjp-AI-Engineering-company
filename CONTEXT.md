# CONTEXT.md — Brasaland

This document contains the company-wide context for Brasaland.

It defines business information that applies across the entire monorepo.

Milestone-specific requirements are documented separately under `docs/` and must only be read when relevant to the current task.

---

## Company

**Brasaland** is a grilled food restaurant chain founded in 2008 in Medellín, Colombia.

The company operates **14 company-owned restaurants** across Colombia and the United States:

- 10 locations in Colombia
- 4 locations in Florida, USA

Brasaland employs approximately 115 people across restaurant operations, management, and corporate teams.

The company is headquartered in Medellín and maintains a commercial presence in Miami.

---

## Brand Principles

Brasaland is built around three core principles:

- **Consistent Quality** — products, recipes, and service standards should remain consistent across locations.
- **Warm Experience** — customers should receive friendly and reliable service.
- **Speed** — service should be efficient without sacrificing product quality.

---

## Brasaland Digital

**Brasaland Digital** is the internal team responsible for the company's digital transformation.

The team works under the direction of:

- **Nicolás Park — CTO**

Digital initiatives may support different areas of the company, including:

- customer-facing experiences
- restaurant operations
- internal backoffice tools
- loyalty
- data analysis
- People & Talent
- automation and AI-assisted workflows

Requirements for those initiatives belong to their corresponding milestone-specific context.

---

## Official Business Terminology

Use the official names consistently:

- `Brasaland`
- `Brasaland Digital`
- `Brasa Points`

Do not replace established Brasaland terminology with generic alternatives unless a milestone explicitly requires it.

---

## Monorepo Context Model

This file contains only **company-wide context**.

Feature-specific requirements live under `docs/`.

Milestone contexts follow this pattern:

`docs/<milestone-name>/CONTEXT-brasaland.md`

Spanish versions, when available:

`docs/<milestone-name>/CONTEXT-brasaland.es.md`

Milestone-specific context files:

- extend this general company context
- do not replace it
- apply only to their relevant milestone or domain

AI coding agents must read only the milestone context relevant to the task they are currently performing.

When the relevant milestone is already known, go directly to its context path instead of scanning all files under `docs/`.

---

## Source of Truth

Use this priority when interpreting requirements:

1. `CONTEXT.md` for company-wide Brasaland facts and terminology.
2. The single relevant `docs/**/CONTEXT-*.md` milestone context for the current task.
3. Applicable `.agents/rules/` for development constraints.
4. Existing application conventions and documentation for implementation details.

Do not apply requirements from one milestone to an unrelated application.

When requirements conflict or the correct context is unclear, stop and ask the developer rather than guessing.
