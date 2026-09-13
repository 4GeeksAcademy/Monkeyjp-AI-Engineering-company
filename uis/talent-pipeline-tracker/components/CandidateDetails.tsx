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
    return <p>Loading candidate...</p>;
  }

  if (!candidate) {
    return (
      <div role="alert">
        <p>Unable to load candidate.</p>
        {error && <p>{error}</p>}
      </div>
    );
  }

  const editUrl = returnUrl
    ? `/candidates/${candidate.id}/edit?from=${encodeURIComponent(returnUrl)}`
    : `/candidates/${candidate.id}/edit`;

  return (
    <article>
      <header>
        <h1>{candidate.full_name}</h1>
        <p>{candidate.position}</p>
      </header>

      <p>
        <Link href={editUrl}>Edit candidate</Link>
      </p>

      {error && (
        <div role="alert">
          <p>{error}</p>
        </div>
      )}

      {successMessage && <p role="status">{successMessage}</p>}

      <dl>
        <div>
          <dt>Email</dt>
          <dd>{candidate.email}</dd>
        </div>

        <div>
          <dt>Phone</dt>
          <dd>{candidate.phone}</dd>
        </div>

        <div>
          <dt>Status</dt>
          <dd>
            <label htmlFor="candidate-status-detail">Candidate status</label>
            <select
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
          </dd>
        </div>

        <div>
          <dt>Stage</dt>
          <dd>
            <label htmlFor="candidate-stage-detail">Candidate stage</label>
            <select
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
          </dd>
        </div>

        <div>
          <dt>Experience</dt>
          <dd>{candidate.experience_years} years</dd>
        </div>

        <div>
          <dt>Applied</dt>
          <dd>{new Date(candidate.applied_at).toLocaleDateString()}</dd>
        </div>

        <div>
          <dt>Last updated</dt>
          <dd>{new Date(candidate.updated_at).toLocaleDateString()}</dd>
        </div>

        <div>
          <dt>Internal notes</dt>
          <dd>{candidate.notes_count}</dd>
        </div>
      </dl>

      {candidate.linkedin_url && (
        <p>
          <a href={candidate.linkedin_url} target="_blank" rel="noreferrer">
            View LinkedIn
          </a>
        </p>
      )}

      {candidate.cv_url && (
        <p>
          <a href={candidate.cv_url} target="_blank" rel="noreferrer">
            View CV
          </a>
        </p>
      )}

      {saving && <p>Saving changes...</p>}

      <CandidateNotes
        candidateId={candidate.id}
        onNotesCountChange={handleNotesCountChange}
      />
    </article>
  );
}
