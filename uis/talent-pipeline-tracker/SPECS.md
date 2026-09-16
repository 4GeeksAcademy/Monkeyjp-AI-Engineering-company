# Talent Pipeline Tracker — Specification

## Purpose

The Talent Pipeline Tracker is an internal Brasaland People & Talent application.

It provides a single interface for managing recruitment candidates and replaces fragmented workflows based on spreadsheets, separate interview documents and email threads.

The application lives at:

`uis/talent-pipeline-tracker`

It is independent from:

- `uis/website`
- `uis/backoffice`

## Technology

The application must use:

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- ESLint

API base URL:

`NEXT_PUBLIC_API_URL=https://playground.4geeks.com/tracker/api/v1`

Do not create a Brasaland backend service for this milestone.

## Candidate Domain

### Status values

- `received`
- `in_progress`
- `selected`
- `discarded`

### Stage values

| API value             | UI label            |
| --------------------- | ------------------- |
| `pending`             | Pending review      |
| `review`              | Under review        |
| `personal_interview`  | Personal interview  |
| `technical_interview` | Technical interview |
| `offer_presented`     | Offer presented     |

> Raw API values must never be visible in the interface. Always use the labels in this table.

### Candidate fields

- `id`
- `full_name`
- `email`
- `phone`
- `position`
- `linkedin_url`
- `cv_url`
- `status`
- `stage`
- `experience_years`
- `applied_at`
- `updated_at`
- `notes`
- `notes_count`

## Candidate List

Route:

`/`

The page must:

- Display candidate name.
- Display position.
- Display current status.
- Display current stage.
- Search candidates by name or email.
- Filter by status.
- Filter by stage.
- Perform interactions without full page reloads.
- Display loading states.
- Display API errors clearly.
- Display empty results clearly.

### URL state

The following values must be represented in URL query parameters:

- `status`
- `stage`
- `page`

Example:

`/?status=in_progress&stage=review&page=2`

Search may remain local component state.

### Pagination

- Use the API pagination parameters.
- Display 20 candidates per page.
- Provide Previous and Next navigation.
- Display current page and total pages.
- Changing status or stage resets pagination to page 1.
- Starting a new search resets pagination to page 1.
- Invalid pages beyond the available range must be corrected.

### Context preservation

When opening a candidate from a filtered or paginated list, returning to the list must preserve:

- `status`
- `stage`
- `page`

## Candidate Detail

Route:

`/candidates/[id]`

The page must display:

- full name
- position
- email
- phone
- experience
- application date
- last update
- LinkedIn link when available
- CV link when available
- notes count

The user must be able to update:

- status
- stage

Updates must:

- use `PATCH /records/{id}`
- display saving state
- display success feedback
- display errors

## Candidate Notes

Candidate detail must support internal notes.

The user must be able to:

- list notes
- add a note
- delete a note

Relevant endpoints:

- `GET /records/{id}/notes`
- `POST /records/{id}/notes`
- `DELETE /records/{id}/notes/{note_id}`

The notes count displayed in the candidate detail must remain synchronized when notes are created or deleted.

## Create Candidate

Route:

`/candidates/new`

Required fields:

- full name
- email
- phone
- position
- years of experience

Optional fields:

- LinkedIn URL
- CV URL

Creation uses:

`POST /records`

After successful creation, navigate to the new candidate detail page.

## Edit Candidate

Route:

`/candidates/[id]/edit`

The form must reuse the candidate form used for candidate creation.

Editing uses:

`PUT /records/{id}`

After a successful update, navigate back to the candidate detail page.

## API Layer

API calls must be centralized outside presentation components.

Current API service:

`services/candidates.ts`

Components should not duplicate endpoint construction or API configuration.

## Types

Candidate domain types live in:

`types/candidate.ts`

The application must use typed representations for:

- `Candidate`
- `CandidateStatus`
- `CandidateStage`
- `CandidateNote`
- `CandidateCreate`
- `CandidatePatch`
- `CandidateListResponse`
- `CandidateNotesResponse`

Do not replace known status or stage values with unrestricted strings.

## UI States

The interface must explicitly communicate:

- initial loading
- mutation loading
- success
- error
- empty results

Failures must never occur silently.

## Accessibility

The application should provide:

- semantic HTML
- associated form labels
- keyboard-accessible controls
- visible focus states
- `role="alert"` for errors
- `role="status"` for non-critical success feedback
- meaningful navigation labels

## Validation

Before delivery, the application must pass:

`npx tsc --noEmit`

`npm run lint`

`npm run build`

No TypeScript errors, ESLint errors or ESLint warnings should remain.

## Out of Scope

Do not add unless explicitly requested:

- authentication
- new backend services
- global state libraries
- candidate deletion UI
- external databases
- migration of existing Brasaland applications to Next.js
