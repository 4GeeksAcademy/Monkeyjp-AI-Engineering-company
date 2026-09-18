# AGENTS.md — Brasaland

This document defines the mandatory working protocol for AI coding agents operating in this repository.

All agents must follow these instructions before modifying or committing project files.

---

# 1. Session Initialization

Before implementation, load only the context required for the current task.

Always read:

1. `CONTEXT.md`

Then read only when relevant:

- The milestone-specific context under `docs/**/CONTEXT-*.md` that matches the current task.
- Relevant files under `.agents/rules/` whose scope applies to the files being changed.
- The `README.md` of the specific top-level directory being modified.

Read memory files only when they are needed:

- `memory-bank/projectbrief.md` → when project or business scope is unclear.
- `memory-bank/techContext.md` → when architecture, stack, tooling, or technical constraints matter.
- `memory-bank/progress.md` → when prior implementation state, known issues, completed work, or follow-up tasks matter.

Read architecture documents such as `docs/ARCHITECTURE_PROPOSAL.md` only for architecture-related work.

Do not read unrelated documentation, milestone contexts, memory files, or application directories.

For small fixes, inspect only the directly affected files plus the minimum applicable rules.

Do not begin implementation until the minimum relevant context has been reviewed.

`CONTEXT.md` remains the primary source of truth for general Brasaland business requirements.

## Milestone-Specific Context

Some tasks belong to a specific milestone or domain and have their own context file under:

`docs/**/CONTEXT-*.md`

When a task belongs to such a milestone or domain:

- Read only the matching milestone context.
- Treat it as an extension of `CONTEXT.md`, not a replacement.
- Prefer `.es.md` for Spanish-language tasks and `.md` for English-language tasks when both exist.
- If only one version exists, use the available version.
- Do not load milestone contexts unrelated to the current task.
- If it is unclear which milestone context applies, ask the developer before proceeding.

---

# 2. Context Efficiency

Minimize context usage.

- Do not re-read files already inspected during the same working session unless they changed or a specific detail must be verified.
- Do not scan entire directories when a small set of known files is sufficient.
- Do not read all files under `docs/`, `memory-bank/`, `.agents/rules/`, `uis/`, `services/`, or `packages/` by default.
- Prefer targeted file inspection over repository-wide exploration.
- For narrow bug fixes, read only the affected file(s), their direct dependencies, and applicable rules.
- For documentation-only changes, do not inspect application code unless required.
- For frontend-only changes, do not inspect unrelated backend code unless there is an integration dependency.
- For backend-only changes, do not inspect unrelated UI code.
- For validation or commit checks, do not re-read project context unless the task scope changed.
- Do not repeatedly summarize files that were already reviewed unless the developer asks for a summary.
- Avoid repository-wide searches when the relevant file or directory is already known.
- Prefer the smallest coherent set of files needed to complete the task.

---

# 3. Repository Boundaries

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

# 4. Mandatory Workflow Before Every Commit

Before creating a commit, the agent MUST perform the following workflow in order.

## Step 1 — Review the Change

Inspect the current change set.

    git status
    git diff

If files are already staged, also inspect:

    git diff --cached

Verify that only files related to the requested task have changed.

Do not re-read unrelated project context during this step.

## Step 2 — Validate Project Rules

Confirm that:

- The implementation matches the relevant general and milestone-specific context.
- The correct monorepo directories are being used.
- No protected files were modified unintentionally.
- Existing functionality has not been duplicated unnecessarily.
- The change follows the applicable `.agents/rules/`.
- No unrelated architecture changes were introduced.

## Step 3 — Run Technical Validation

Run only the validation commands relevant to the affected application or package.

Depending on the project, this may include:

    npm run build
    npm run lint
    npm run test

For Python tasks, this may include the relevant CLI, API, or test command already established by the project.

Do not run unrelated application builds or tests.

If a command is unavailable, document that fact rather than inventing a replacement.

## Step 4 — Update Project Memory

Update:

`memory-bank/progress.md`

only when the change introduces a meaningful project-state change, such as:

- Completed milestone or phase
- New architecture decision
- New persistent constraint
- New known issue that affects future work
- New planned follow-up work

Do not update `progress.md` for:

- trivial fixes
- formatting changes
- typo corrections
- temporary debugging
- intermediate validation steps
- changes that do not affect future project state

## Step 5 — Final Delivery Check

Review:

    git status
    git diff --stat

If files are staged, also review:

    git diff --cached --stat
    git diff --cached --check

Confirm that:

- Required files exist.
- Relevant validation completed successfully.
- No unrelated files are staged.
- No secrets or credentials are included.
- No temporary files, generated caches, or test artifacts are being committed.
- Project memory was updated only if required.
- The final change remains within the requested scope.

Only after these checks may the agent create the commit.

---

# 5. Files Requiring Explicit Developer Confirmation

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
- moving shared logic between top-level monorepo directories
- introducing persistent storage where none existed before

---

# 6. Application Rules

## Public Website

Public Brasaland experiences belong in:

`uis/website`

The implementation must reflect the business content described in `CONTEXT.md`.

Read public-website-specific rules and files only when working on that application.

## Backoffice

Internal Brasaland interfaces belong in:

`uis/backoffice`

The backoffice must use its own application layout rather than importing the public website layout.

Business-relevant information must be visible in the interface.

When working only on the backoffice, do not inspect unrelated applications unless integration requires it.

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

Read Talent Pipeline-specific context only when the task affects that application.

## Backend

Server-side functionality belongs under:

`services/`

The centralized Brasaland FastAPI backend lives in:

`services/api/`

When modifying `services/api/`, follow:

`.agents/rules/backend-api.md`

Do not create backend services for functionality that can reasonably remain frontend-only during the current milestone.

When working on one backend feature, inspect only that feature, its direct shared dependencies, and relevant configuration unless broader architecture work is required.

## Shared Packages

Reusable logic shared by multiple applications or services belongs under:

`packages/`

Shared packages should remain transport-agnostic where practical.

Avoid placing UI-specific or API-specific behavior inside shared business-logic packages unless explicitly required.

---

# 7. Development Principles

Prefer:

- Small focused changes
- Reusable components
- Explicit business terminology
- Existing repository conventions
- Accessible interfaces
- Clear separation of application responsibilities
- Minimal necessary context
- Targeted file inspection
- Reuse of existing business logic
- Incremental implementation

Avoid:

- Generic placeholder business content
- Duplicate business constants across files
- Large unrelated refactors
- Guessing business requirements
- Silent architecture changes
- Repository-wide exploration for narrow tasks
- Reading unrelated milestone contexts
- Re-reading the same context repeatedly during one session
- Creating abstractions before they are needed
- Adding dependencies for problems already solvable with existing tooling

When a business requirement is unclear, stop and ask the developer.

When a technical detail is unclear but can be resolved by inspecting one or two relevant files, inspect those files before broadening the search.
