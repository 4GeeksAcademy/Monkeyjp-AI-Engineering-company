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
    <section
      className="mb-4 grid items-end gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_8px_24px_rgba(23,43,58,0.04)] max-[900px]:grid-cols-2 max-[680px]:flex max-[680px]:flex-col max-[680px]:items-stretch"
      aria-label="Candidate filters"
    >
      <div className="flex flex-col gap-[7px] min-[901px]:col-span-1 max-[900px]:col-span-full">
        <label
          className="text-[0.75rem] font-bold text-[var(--navy)]"
          htmlFor="candidate-search"
        >
          Search candidates
        </label>
        <input
          className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)] placeholder:text-[#8b96a2]"
          id="candidate-search"
          type="search"
          placeholder="Search by name or email"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-[7px]">
        <label
          className="text-[0.75rem] font-bold text-[var(--navy)]"
          htmlFor="candidate-status"
        >
          Status
        </label>
        <select
          className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)]"
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

      <div className="flex flex-col gap-[7px]">
        <label
          className="text-[0.75rem] font-bold text-[var(--navy)]"
          htmlFor="candidate-stage"
        >
          Hiring stage
        </label>
        <select
          className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)]"
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
        className="inline-flex min-h-10 items-center justify-center rounded-[7px] border border-transparent bg-transparent px-[15px] text-[0.83rem] font-bold text-[var(--muted)] hover:border-[#aeb8c2] hover:bg-[var(--surface-muted)] max-[900px]:col-span-full max-[680px]:self-start"
        type="button"
        onClick={onClear}
        disabled={!search && !status && !stage}
      >
        Clear filters
      </button>
    </section>
  );
}
