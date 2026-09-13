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

      {loading && <p>Loading candidates...</p>}

      {error && (
        <div role="alert">
          <p>Unable to load candidates.</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && candidates.length === 0 && (
        <p>No candidates found.</p>
      )}

      {!loading && !error && candidates.length > 0 && (
        <>
          <p>
            {total} candidates found · showing {candidates.length}
          </p>

          <div>
            {candidates.map((candidate) => (
              <article key={candidate.id}>
                <h2>
                  <Link
                    href={`/candidates/${candidate.id}?from=${encodeURIComponent(
                      returnUrl,
                    )}`}
                  >
                    {candidate.full_name}
                  </Link>
                </h2>

                <p>{candidate.position}</p>
                <p>Status: {candidateStatusLabels[candidate.status]}</p>
                <p>Stage: {candidateStageLabels[candidate.stage]}</p>
              </article>
            ))}
          </div>

          <nav aria-label="Candidate pagination">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => updatePage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => updatePage(page + 1)}
            >
              Next
            </button>
          </nav>
        </>
      )}
    </section>
  );
}
