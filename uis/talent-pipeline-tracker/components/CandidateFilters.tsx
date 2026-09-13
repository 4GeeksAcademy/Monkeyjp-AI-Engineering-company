"use client";

import {
  candidateStageLabels,
  candidateStages,
  candidateStatusLabels,
  candidateStatuses,
} from "@/types/candidate";

import type { CandidateStage, CandidateStatus } from "@/types/candidate";

interface CandidateFiltersProps {
  search: string;
  status: CandidateStatus | "";
  stage: CandidateStage | "";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CandidateStatus | "") => void;
  onStageChange: (value: CandidateStage | "") => void;
  onClear: () => void;
}

export default function CandidateFilters({
  search,
  status,
  stage,
  onSearchChange,
  onStatusChange,
  onStageChange,
  onClear,
}: CandidateFiltersProps) {
  return (
    <section>
      <div>
        <label htmlFor="candidate-search">Search</label>
        <input
          id="candidate-search"
          type="search"
          placeholder="Search by name or email"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="candidate-status">Status</label>
        <select
          id="candidate-status"
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as CandidateStatus | "")
          }
        >
          <option value="">All statuses</option>
          {candidateStatuses.map((candidateStatus) => (
            <option key={candidateStatus} value={candidateStatus}>
              {candidateStatusLabels[candidateStatus]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="candidate-stage">Stage</label>
        <select
          id="candidate-stage"
          value={stage}
          onChange={(event) =>
            onStageChange(event.target.value as CandidateStage | "")
          }
        >
          <option value="">All stages</option>
          {candidateStages.map((candidateStage) => (
            <option key={candidateStage} value={candidateStage}>
              {candidateStageLabels[candidateStage]}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={onClear}
        disabled={!search && !status && !stage}
      >
        Clear filters
      </button>
    </section>
  );
}
