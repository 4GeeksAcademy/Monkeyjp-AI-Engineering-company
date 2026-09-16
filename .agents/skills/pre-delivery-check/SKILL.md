---
name: pre-delivery-check
description: Verify Brasaland changes before they are committed or submitted for review.
---

---

# Pre-delivery Check

## Objective

Verify that a Brasaland implementation is ready to be committed or submitted for review.

This skill performs validation only.

It must not introduce unrelated code changes.

---

## Inputs

The skill requires the following inputs:

### Required

- `target`
  - Application or repository area being validated.
  - Example: `uis/website`
  - Example: `uis/backoffice`

- `change_description`
  - Short description of the implementation being delivered.

### Optional

- `validation_commands`
  - Explicit commands supplied by the developer.
  - Example: `npm run build`
  - Example: `npm run lint`

---

## Procedure

### 1. Resolve Required Context

Use the smallest context necessary to validate the change.

Do not reload files that were already reviewed during the current working session unless their content may have changed.

Review `AGENTS.md` if it has not already been read during the current session.

Read `.agents/rules` only when a rule applies to the changed files.

Load additional context only when required:

- `CONTEXT.md`
  - Read when the change introduces, modifies, or validates user-visible Brasaland business information.

- milestone-specific context
  - Read when the change implements or modifies milestone requirements.

- `memory-bank/techContext.md`
  - Read when the change affects architecture, frameworks, dependencies, configuration, integrations, or technical constraints.

- `memory-bank/projectbrief.md`
  - Read only when repository scope or project intent is unclear.

- `memory-bank/progress.md`
  - Read when determining whether the implementation changes project status, completed work, known issues, architecture decisions, or next steps.

Do not load unrelated application, milestone, backend, frontend, or memory context.

### 2. Inspect the Change

Run:

```bash
git status
git diff
```

Confirm that the changed files correspond to the requested task and `change_description`.

Identify:

- files added, modified, or deleted
- affected application or repository area
- whether unrelated changes are present
- whether configuration, architecture, business content, or project status changed

Use this inspection to determine whether additional context from Step 1 is required.

### 3. Verify Repository Placement

Check that changed files follow the responsibilities defined by the repository structure and applicable rules.

Examples:

- public interface → `uis/website`
- internal interface → `uis/backoffice`
- backend → `services`
- shared reusable logic → `packages`
- development rules → `.agents/rules`
- development skills → `.agents/skills`

Do not inspect unrelated repository areas unless the changed code depends on them.

### 4. Verify Business Content When Applicable

Perform this step only when the change introduces or modifies Brasaland business information or user-visible business behavior.

Validate relevant facts against the canonical business context defined by the repository.

Do not rely on business facts duplicated inside this skill.

Check only the business information affected by the change.

Verify that:

- official Brasaland terminology is used
- existing business rules are not contradicted
- unsupported capabilities are not invented
- milestone-specific business requirements are respected

If the change contains no Brasaland business content, mark this check as `NOT APPLICABLE`.

### 5. Run Technical Validation

Run the validation commands configured by the affected project.

Use explicit developer-provided commands when supplied.

Typical examples:

```bash
npm run build
npm run lint
npm run test
```

Also run targeted validation required by applicable repository rules or project documentation.

Prefer validation scoped to the affected project instead of validating unrelated applications.

Do not claim a command passed unless it was executed successfully.

If a required command cannot be executed, report the reason and do not treat it as successful.

### 6. Verify Project Memory

Determine from the inspected change whether `memory-bank/progress.md` needs to be reviewed or updated.

An update may be required when the implementation changes:

- completed work
- architecture decisions
- current project status
- known issues
- next steps

Do not update `progress.md` for routine implementation details that do not materially change project state.

Do not use the memory bank as a duplicate changelog for information already captured by Git history.

If no meaningful project-state change occurred, report that no memory update is required.

### 7. Verify Delivery Safety

Check the changed files for accidental exposure of:

- credentials
- API keys
- tokens
- secrets
- personal environment URLs
- machine-specific paths
- local configuration that should not be committed

Confirm that environment-specific values use the repository's intended configuration mechanism.

### 8. Produce Verification Result

Return a concise report containing:

- target reviewed
- changed files reviewed
- context loaded specifically for this validation
- applicable rule validation
- business validation result or `NOT APPLICABLE`
- technical commands executed and their results
- warnings or failures
- memory-bank status
- final result: `PASS` or `FAIL`

Avoid repeating large portions of repository documentation in the report.

---

## Acceptance Criteria

The skill passes only when ALL applicable criteria are satisfied.

- [ ] Only relevant project context was loaded.
- [ ] Changed files are inside the correct monorepo locations.
- [ ] No unrelated changes are included.
- [ ] Applicable Brasaland business information matches the canonical context.
- [ ] Applicable development rules were respected.
- [ ] Required validation commands completed successfully.
- [ ] `memory-bank/progress.md` was updated when project state materially changed.
- [ ] No secrets, credentials, personal environment URLs, or inappropriate local configuration are exposed.
- [ ] The final verification report clearly states `PASS` or `FAIL`.

If one or more required checks fail, the skill result must be:

`FAIL`

and the failing criteria must be identified explicitly.

The skill must never report `PASS` based only on visual inspection when required technical validation has not been executed.
