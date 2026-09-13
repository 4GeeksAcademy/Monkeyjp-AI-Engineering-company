# AGENTS.md — Brasaland

This document defines the mandatory working protocol for AI coding agents operating in this repository.

All agents must follow these instructions before modifying or committing project files.

---

# 1. Session Initialization

At the beginning of every development session, read the following files in this order:

1. `CONTEXT.md`
2. `memory-bank/projectbrief.md`
3. `memory-bank/techContext.md`
4. `memory-bank/progress.md`
5. Relevant files under `.agents/rules/`
6. The `README.md` of every top-level directory affected by the task

Do not begin implementation until the relevant project context has been reviewed.

`CONTEXT.md` is the primary source of truth for Brasaland business requirements.

---

# 2. Repository Boundaries

Use the monorepo according to the responsibility of each directory.

- Public and internal user interfaces → `/uis`
- Backend APIs and workers → `/services`
- Data and pipelines → `/data`
- Product AI agents → `/agents`
- Product AI skills → `/skills`
- MCP servers → `/mcps`
- Shared libraries → `/packages`
- Shared schemas/assets → `/shared`
- Infrastructure → `/infra`
- Cross-project documentation → `/docs`

Development-agent configuration belongs exclusively in:

`.agents/`

Do not confuse `.agents/` with the product directories `/agents` and `/skills`.

---

# 3. Mandatory Workflow Before Every Commit

Before creating a commit, the agent MUST perform the following workflow in order.

## Step 1 — Review the Change

Inspect the current diff.

```bash
git status
git diff
```

Verify that only files related to the requested task have changed.

## Step 2 — Validate Project Rules

Confirm that:

- The implementation matches `CONTEXT.md`.
- The correct monorepo directories are being used.
- No protected files were modified unintentionally.
- Existing functionality has not been duplicated unnecessarily.

## Step 3 — Run Technical Validation

Run the relevant validation commands for every affected application.

Depending on the project this may include:

```bash
npm run build
npm run lint
npm run test
```

If a command is unavailable, document that fact rather than inventing a replacement.

## Step 4 — Update Project Memory

Update:

`memory-bank/progress.md`

when the change introduces:

- Completed functionality
- New architecture decisions
- New constraints
- New known issues
- New planned follow-up work

## Step 5 — Final Delivery Check

Review:

```bash
git status
git diff --stat
```

Confirm that:

- Required files exist.
- Validation completed successfully.
- No unrelated files are staged.
- No secrets or credentials are included.
- The memory bank reflects the new project state.

Only after these checks may the agent create the commit.

---

# 4. Files Requiring Explicit Developer Confirmation

Agents must not modify the following without explicit developer approval:

- `CONTEXT.md`
- `.devcontainer/`
- root `.gitignore`
- GitHub workflow configuration
- deployment or infrastructure configuration under `/infra`
- authentication or secret-management configuration
- existing environment files
- dependency lockfiles when dependency changes were not requested

Agents must also ask before:

- deleting directories
- renaming top-level folders
- introducing a new framework
- introducing a new backend service
- replacing an existing architecture pattern
- adding a new external production dependency

---

# 5. Application Rules

## Public Website

Public Brasaland experiences belong in:

`uis/website`

The implementation must reflect the business content described in `CONTEXT.md`.

## Backoffice

Internal Brasaland interfaces belong in:

`uis/backoffice`

The backoffice must use its own application layout rather than importing the public website layout.

Business-relevant information must be visible in the interface.

## Talent Pipeline Tracker

Brasaland People & Talent functionality belongs in:

`uis/talent-pipeline-tracker`

The Talent Pipeline Tracker is an independent internal application.

It must maintain its own:

- application structure
- routing
- layout
- dependencies
- environment configuration

Do not migrate or modify `uis/website` or `uis/backoffice` solely to align them with the Talent Pipeline Tracker technology stack.

The application must consume the Talent Tracker REST API rather than introducing a new Brasaland backend service for candidate management.

## Backend

Server-side functionality belongs under:

`services/`

Do not create backend services for functionality that can reasonably remain frontend-only during the current milestone.

---

# 6. Development Principles

Prefer:

- Small focused changes
- Reusable components
- Explicit business terminology
- Existing repository conventions
- Accessible interfaces
- Clear separation of application responsibilities

Avoid:

- Generic placeholder business content
- Duplicate business constants across files
- Large unrelated refactors
- Guessing business requirements
- Silent architecture changes

When a business requirement is unclear, stop and ask the developer.
