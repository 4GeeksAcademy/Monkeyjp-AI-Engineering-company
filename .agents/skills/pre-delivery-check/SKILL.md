---
name: pre-delivery-check
description: Verify Brasaland changes before they are committed or submitted for review.
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

### 1. Read Project Context

Read:

- `CONTEXT.md`
- `memory-bank/projectbrief.md`
- `memory-bank/techContext.md`
- `memory-bank/progress.md`
- `AGENTS.md`

Read any `.agents/rules` applicable to the target files.

### 2. Inspect the Change

Run:

```bash
git status
git diff
```

Confirm that the changed files correspond to the requested task.

### 3. Verify Repository Placement

Check that files follow monorepo responsibilities.

Examples:

- public interface → `uis/website`
- internal interface → `uis/backoffice`
- backend → `services`
- development rules → `.agents/rules`
- development skills → `.agents/skills`

### 4. Verify Brasaland Business Content

Check visible content against `CONTEXT.md`.

For the current milestone verify relevant facts such as:

- company name is Brasaland
- the company operates in Colombia and Florida
- there are 14 restaurants
- Brasa Points terminology is correct
- loyalty rules are not invented
- online ordering is not presented as currently available

### 5. Run Technical Validation

Run the validation commands configured by the affected project.

Use explicit developer-provided commands when supplied.

Typical examples:

```bash
npm run build
npm run lint
npm run test
```

Do not claim a command passed unless it was executed successfully.

### 6. Verify Memory

Determine whether `memory-bank/progress.md` needs to be updated.

Update it if the implementation changes:

- completed work
- architecture decisions
- current status
- known issues
- next steps

### 7. Produce Verification Result

Return a concise report containing:

- files reviewed
- business validation result
- technical commands executed
- failures or warnings
- memory-bank status
- final result: PASS or FAIL

---

## Acceptance Criteria

The skill passes only when ALL applicable criteria are satisfied.

- [ ] Relevant project context was reviewed.
- [ ] Changed files are inside the correct monorepo locations.
- [ ] No unrelated changes are included.
- [ ] User-visible business information matches `CONTEXT.md`.
- [ ] Applicable development rules were respected.
- [ ] Required validation commands completed successfully.
- [ ] `memory-bank/progress.md` reflects the current state.
- [ ] No secrets, credentials or environment values are exposed.
- [ ] The final verification report clearly states PASS or FAIL.

If one or more required checks fail, the skill result must be:

`FAIL`

and the failing criteria must be identified explicitly.

The skill must never report PASS based only on visual inspection when required technical validation has not been executed.

