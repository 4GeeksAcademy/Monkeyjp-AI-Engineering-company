"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import CandidateFilters from "@/components/CandidateFilters";
import { getCandidates } from "@/services/candidates";

import type {
  Candidate,
  CandidateStage,
  CandidateStatus,
} from "@/types/candidate";
import {
  candidateStageLabels,
  candidateStatusLabels,
  isCandidateStage,
  isCandidateStatus,
} from "@/types/candidate";

const LIMIT = 20;

const statusBadgeClasses: Record<CandidateStatus, string> = {
  received: "bg-[#edf1f4] text-[#556270]",
  in_progress: "bg-[#fff2d8] text-[var(--warning)]",
  selected: "bg-[#e2f4eb] text-[var(--success)]",
  discarded: "bg-[#fbe8e9] text-[var(--danger)]",
};

const stageBadgeClasses: Record<CandidateStage, string> = {
  pending: "bg-[#edf1f4] text-[#556270]",
  review: "bg-[#fff2d8] text-[var(--warning)]",
  personal_interview: "bg-[#e8edf8] text-[#3f5f91]",
  technical_interview: "bg-[#e8edf8] text-[#3f5f91]",
  offer_presented: "bg-[#e2f4eb] text-[var(--success)]",
};

export default function CandidateList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const statusParam = searchParams.get("status") ?? "";
  const stageParam = searchParams.get("stage") ?? "";
  const status = isCandidateStatus(statusParam) ? statusParam : "";
  const stage = isCandidateStage(stageParam) ? stageParam : "";

  const rawPageParam = searchParams.get("page");
  const pageParam = Number(rawPageParam ?? "1");
  const hasInvalidPageParam =
    rawPageParam !== null &&
    (!Number.isFinite(pageParam) ||
      !Number.isInteger(pageParam) ||
      pageParam < 1);
  const page =
    Number.isFinite(pageParam) && Number.isInteger(pageParam) && pageParam >= 1
      ? pageParam
      : 1;

  const currentQuery = searchParams.toString();

  const returnUrl = currentQuery ? `/?${currentQuery}` : "/";

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    async function loadCandidates() {
      try {
        if (hasInvalidPageParam) {
          const params = new URLSearchParams(searchParams.toString());

          params.delete("page");

          const query = params.toString();

          router.replace(query ? `${pathname}?${query}` : pathname);
          return;
        }

        setLoading(true);
        setError(null);

        const response = await getCandidates({
          status: status || undefined,
          stage: stage || undefined,
          search: debouncedSearch || undefined,
          page,
          limit: LIMIT,
        });

        setCandidates(response.data);
        setTotal(response.total);
        const responseTotalPages = Math.max(
          1,
          Math.ceil(response.total / LIMIT),
        );

        if (page > responseTotalPages) {
          const params = new URLSearchParams(searchParams.toString());

          if (responseTotalPages <= 1) {
            params.delete("page");
          } else {
            params.set("page", responseTotalPages.toString());
          }

          const query = params.toString();

          router.replace(query ? `${pathname}?${query}` : pathname);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unable to load candidates.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadCandidates();
  }, [
    status,
    stage,
    debouncedSearch,
    page,
    pathname,
    router,
    searchParams,
    hasInvalidPageParam,
  ]);

  function updateFilter(
    key: "status" | "stage",
    value: CandidateStatus | CandidateStage | "",
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Changing filters returns to page 1.
    params.delete("page");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  function updateSearch(value: string) {
    setSearch(value);

    if (page > 1) {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("page");

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname);
    }
  }

  function updatePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());

    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  function clearFilters() {
    setSearch("");
    setDebouncedSearch("");

    router.replace(pathname);
  }
  return (
    <section>
      <CandidateFilters
        search={search}
        status={status}
        stage={stage}
        onSearchChange={updateSearch}
        onStatusChange={(value) => updateFilter("status", value)}
        onStageChange={(value) => updateFilter("stage", value)}
        onClear={clearFilters}
      />

      {loading && (
        <div
          className="flex min-h-[190px] flex-col items-center justify-center gap-[7px] rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-6 text-center text-[var(--muted)]"
          role="status"
        >
          <strong className="text-[0.95rem] text-[var(--navy)]">
            Loading candidates
          </strong>
          <p className="m-0">Fetching the latest applications.</p>
        </div>
      )}

      {error && (
        <div
          className="flex min-h-[190px] flex-col items-start justify-center gap-[7px] rounded-xl border border-[#efc9cb] bg-[#fff7f7] p-6 text-left text-[var(--danger)]"
          role="alert"
        >
          <strong className="text-[0.95rem] text-[var(--navy)]">
            Unable to load candidates
          </strong>
          <p className="m-0">{error}</p>
        </div>
      )}

      {!loading && !error && candidates.length === 0 && (
        <div className="flex min-h-[190px] flex-col items-center justify-center gap-[7px] rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-6 text-center text-[var(--muted)]">
          <strong className="text-[0.95rem] text-[var(--navy)]">
            No candidates found
          </strong>
          <p className="m-0">
            Try adjusting your search or clearing the active filters.
          </p>
        </div>
      )}

      {!loading && !error && candidates.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(23,43,58,0.04)]">
          <p className="m-0 px-5 py-[15px] text-[0.78rem] text-[var(--muted)] max-[680px]:px-4 max-[680px]:py-[13px]">
            {total} {total === 1 ? "candidate" : "candidates"} found · showing{" "}
            {candidates.length}
          </p>

          <div
            className="grid grid-cols-[minmax(220px,1.6fr)_150px_190px] gap-[18px] border-b border-[var(--border)] bg-[#f8f9fa] px-5 py-[15px] text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-[var(--muted)] max-[900px]:grid-cols-[minmax(0,1fr)_minmax(105px,0.7fr)_minmax(140px,1fr)] max-[900px]:gap-3 max-[900px]:px-4 max-[680px]:hidden"
            aria-hidden="true"
          >
            <span>Candidate</span>
            <span>Status</span>
            <span>Hiring stage</span>
          </div>

          <div>
            {candidates.map((candidate) => (
              <article
                className="grid min-h-[76px] grid-cols-[minmax(220px,1.6fr)_150px_190px] items-center gap-[18px] border-b border-[#edf0f2] px-5 py-[15px] last:border-b-0 hover:bg-[#fcfcfd] max-[900px]:grid-cols-[minmax(0,1fr)_minmax(105px,0.7fr)_minmax(140px,1fr)] max-[900px]:gap-3 max-[900px]:px-4 max-[900px]:py-[15px] max-[680px]:flex max-[680px]:min-h-0 max-[680px]:flex-wrap max-[680px]:items-start max-[680px]:gap-x-4 max-[680px]:gap-y-2.5 max-[680px]:p-4"
                key={candidate.id}
              >
                <div className="min-w-0 max-[680px]:basis-full">
                  <h2 className="m-0">
                    <Link
                      className="text-[0.92rem] font-bold tracking-[-0.01em] text-[var(--navy)] no-underline hover:text-[var(--brick)]"
                      href={`/candidates/${candidate.id}?from=${encodeURIComponent(
                        returnUrl,
                      )}`}
                    >
                      {candidate.full_name}
                    </Link>
                  </h2>
                  <p className="m-0 mt-1 text-[0.82rem] leading-[1.4] text-[var(--muted)]">
                    {candidate.position}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex max-w-full rounded-full px-[9px] py-[7px] text-[0.7rem] font-bold leading-none whitespace-nowrap ${statusBadgeClasses[candidate.status]} max-[900px]:whitespace-normal max-[900px]:leading-[1.25]`}
                  >
                    {candidateStatusLabels[candidate.status]}
                  </span>
                </div>
                <div>
                  <span
                    className={`inline-flex max-w-full rounded-full px-[9px] py-[7px] text-[0.7rem] font-bold leading-none whitespace-nowrap ${stageBadgeClasses[candidate.stage]} max-[900px]:whitespace-normal max-[900px]:leading-[1.25]`}
                  >
                    {candidateStageLabels[candidate.stage]}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <nav
            className="flex items-center justify-between px-5 py-[18px] max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-[13px] max-[680px]:p-4"
            aria-label="Candidate pagination"
          >
            <p className="m-0 text-[0.78rem] text-[var(--muted)]">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2 max-[680px]:w-full">
              <button
                className="inline-flex min-h-10 items-center justify-center rounded-[7px] border border-[var(--border-strong)] bg-[var(--surface)] px-[15px] text-[0.83rem] font-bold text-[var(--navy)] hover:bg-[var(--surface-muted)] max-[680px]:flex-1"
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => updatePage(page - 1)}
              >
                Previous
              </button>
              <button
                className="inline-flex min-h-10 items-center justify-center rounded-[7px] border border-[var(--border-strong)] bg-[var(--surface)] px-[15px] text-[0.83rem] font-bold text-[var(--navy)] hover:bg-[var(--surface-muted)] max-[680px]:flex-1"
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => updatePage(page + 1)}
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      )}
    </section>
  );
}
