"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import CandidateNotes from "@/components/CandidateNotes";
import { getCandidate, patchCandidate } from "@/services/candidates";

import type {
  Candidate,
  CandidateStage,
  CandidateStatus,
} from "@/types/candidate";
import {
  candidateStageLabels,
  candidateStages,
  candidateStatusLabels,
  candidateStatuses,
} from "@/types/candidate";

interface CandidateDetailsProps {
  id: string;
  returnUrl?: string;
}

export default function CandidateDetails({
  id,
  returnUrl,
}: CandidateDetailsProps) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadCandidate() {
      try {
        setLoading(true);
        setError(null);

        const response = await getCandidate(id);

        setCandidate(response);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unable to load candidate.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadCandidate();
  }, [id]);

  const handleNotesCountChange = useCallback((count: number) => {
    setCandidate((currentCandidate) =>
      currentCandidate
        ? {
            ...currentCandidate,
            notes_count: count,
          }
        : currentCandidate,
    );
  }, []);

  async function updateCandidate(
    patch: Partial<{
      status: CandidateStatus;
      stage: CandidateStage;
    }>,
  ) {
    if (!candidate) return;

    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const updatedCandidate = await patchCandidate(candidate.id, patch);

      setCandidate(updatedCandidate);
      setSuccessMessage("Candidate updated successfully.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to update candidate.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div
        className="flex min-h-[190px] flex-col items-center justify-center gap-[7px] rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-6 text-center text-[var(--muted)]"
        role="status"
      >
        <strong className="text-[0.95rem] text-[var(--navy)]">
          Loading candidate
        </strong>
        <p className="m-0">Fetching the candidate record.</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div
        className="flex min-h-[190px] flex-col items-start justify-center gap-[7px] rounded-xl border border-[#efc9cb] bg-[#fff7f7] p-6 text-left text-[var(--danger)]"
        role="alert"
      >
        <strong className="text-[0.95rem] text-[var(--navy)]">
          Unable to load candidate
        </strong>
        {error && <p className="m-0">{error}</p>}
      </div>
    );
  }

  const editUrl = returnUrl
    ? `/candidates/${candidate.id}/edit?from=${encodeURIComponent(returnUrl)}`
    : `/candidates/${candidate.id}/edit`;

  return (
    <div className="grid gap-5 min-[901px]:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.8fr)]">
      <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_8px_24px_rgba(23,43,58,0.04)] max-[680px]:p-[18px]">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-[9px] text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-[var(--brick)]">
              Candidate record
            </p>
            <h1 className="m-0 text-[clamp(1.7rem,3vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[var(--navy)]">
              {candidate.full_name}
            </h1>
            <p className="mt-2.5 max-w-[620px] text-[0.94rem] leading-[1.55] text-[var(--muted)]">
              {candidate.position}
            </p>
          </div>
          <Link
            className="inline-flex min-h-10 items-center justify-center rounded-[7px] border border-[var(--border-strong)] bg-[var(--surface)] px-[15px] text-[0.83rem] font-bold text-[var(--navy)] no-underline hover:bg-[var(--surface-muted)] max-[680px]:shrink-0"
            href={editUrl}
          >
            Edit record
          </Link>
        </header>

        {error && (
          <div
            className="mb-4 rounded-[7px] bg-[#fff1f1] px-[13px] py-[11px] text-[0.8rem] text-[var(--danger)]"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        {successMessage && (
          <div
            className="mb-4 rounded-[7px] bg-[#e7f5ed] px-[13px] py-[11px] text-[0.8rem] text-[var(--success)]"
            role="status"
          >
            <p>{successMessage}</p>
          </div>
        )}

        <dl className="m-0 grid grid-cols-2 max-[1200px]:grid-cols-1">
          <div className="min-w-0 border-t border-[#edf0f2] py-4 pr-3">
            <dt className="mb-1.5 text-[0.7rem] font-bold uppercase text-[var(--muted)]">
              Email
            </dt>
            <dd className="m-0 break-words text-[0.88rem] text-[var(--navy)]">
              {candidate.email}
            </dd>
          </div>

          <div className="min-w-0 border-t border-[#edf0f2] py-4 pr-3">
            <dt className="mb-1.5 text-[0.7rem] font-bold uppercase text-[var(--muted)]">
              Phone
            </dt>
            <dd className="m-0 break-words text-[0.88rem] text-[var(--navy)]">
              {candidate.phone}
            </dd>
          </div>

          <div className="flex flex-col gap-[7px] border-t border-[#edf0f2] py-4 pr-3">
            <label
              className="text-[0.7rem] font-bold uppercase text-[var(--muted)]"
              htmlFor="candidate-status-detail"
            >
              Candidate status
            </label>
            <select
              className="min-h-[35px] rounded-md border border-[var(--border-strong)] bg-white px-2 text-[var(--navy)]"
              id="candidate-status-detail"
              value={candidate.status}
              disabled={saving}
              onChange={(event) =>
                updateCandidate({
                  status: event.target.value as CandidateStatus,
                })
              }
            >
              {candidateStatuses.map((candidateStatus) => (
                <option key={candidateStatus} value={candidateStatus}>
                  {candidateStatusLabels[candidateStatus]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-[7px] border-t border-[#edf0f2] py-4 pr-3">
            <label
              className="text-[0.7rem] font-bold uppercase text-[var(--muted)]"
              htmlFor="candidate-stage-detail"
            >
              Candidate stage
            </label>
            <select
              className="min-h-[35px] rounded-md border border-[var(--border-strong)] bg-white px-2 text-[var(--navy)]"
              id="candidate-stage-detail"
              value={candidate.stage}
              disabled={saving}
              onChange={(event) =>
                updateCandidate({
                  stage: event.target.value as CandidateStage,
                })
              }
            >
              {candidateStages.map((candidateStage) => (
                <option key={candidateStage} value={candidateStage}>
                  {candidateStageLabels[candidateStage]}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t border-[#edf0f2] py-4 pr-3">
            <dt className="mb-1.5 text-[0.7rem] font-bold uppercase text-[var(--muted)]">
              Experience
            </dt>
            <dd className="m-0 text-[0.88rem] text-[var(--navy)]">
              {candidate.experience_years} years
            </dd>
          </div>

          <div className="border-t border-[#edf0f2] py-4 pr-3">
            <dt className="mb-1.5 text-[0.7rem] font-bold uppercase text-[var(--muted)]">
              Applied
            </dt>
            <dd className="m-0 text-[0.88rem] text-[var(--navy)]">
              {new Date(candidate.applied_at).toLocaleDateString()}
            </dd>
          </div>

          <div className="border-t border-[#edf0f2] py-4 pr-3">
            <dt className="mb-1.5 text-[0.7rem] font-bold uppercase text-[var(--muted)]">
              Last updated
            </dt>
            <dd className="m-0 text-[0.88rem] text-[var(--navy)]">
              {new Date(candidate.updated_at).toLocaleDateString()}
            </dd>
          </div>

          <div className="border-t border-[#edf0f2] py-4 pr-3">
            <dt className="mb-1.5 text-[0.7rem] font-bold uppercase text-[var(--muted)]">
              Internal notes
            </dt>
            <dd className="m-0 text-[0.88rem] text-[var(--navy)]">
              {candidate.notes_count}
            </dd>
          </div>
        </dl>

        {(candidate.linkedin_url || candidate.cv_url) && (
          <div className="mt-1 flex flex-wrap gap-2.5 border-t border-[#edf0f2] pt-[18px]">
            {candidate.linkedin_url && (
              <a
                className="text-[0.8rem] font-bold text-[var(--brick)]"
                href={candidate.linkedin_url}
                target="_blank"
                rel="noreferrer"
              >
                View LinkedIn profile
              </a>
            )}

            {candidate.cv_url && (
              <a
                className="text-[0.8rem] font-bold text-[var(--brick)]"
                href={candidate.cv_url}
                target="_blank"
                rel="noreferrer"
              >
                View CV
              </a>
            )}
          </div>
        )}

        {saving && (
          <p
            className="mt-2.5 max-w-[620px] text-[0.94rem] leading-[1.55] text-[var(--muted)]"
            role="status"
          >
            Saving changes...
          </p>
        )}
      </article>

      <CandidateNotes
        candidateId={candidate.id}
        onNotesCountChange={handleNotesCountChange}
      />
    </div>
  );
}
