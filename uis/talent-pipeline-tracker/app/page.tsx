import { Suspense } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import CandidateList from "@/components/CandidateList";

export default function Home() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1220px] px-[42px] pb-16 pt-[42px] max-[900px]:px-[26px] max-[680px]:px-4 max-[680px]:py-7">
        <header className="mb-[30px] flex items-start justify-between gap-6 max-[680px]:block max-[680px]:mb-[22px]">
          <div>
            <p className="mb-[9px] text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-[var(--brick)]">
              People &amp; Talent workspace
            </p>
            <h1 className="m-0 text-[clamp(1.7rem,3vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[var(--navy)]">
              Candidate pipeline
            </h1>
            <p className="mt-2.5 max-w-[620px] text-[0.94rem] leading-[1.55] text-[var(--muted)]">
              Review applicants, keep hiring stages current, and give every
              candidate a clear next step.
            </p>
          </div>
          <Link
            className="inline-flex min-h-10 items-center justify-center rounded-[7px] border border-[var(--brick)] bg-[var(--brick)] px-[15px] text-[0.83rem] font-bold text-white no-underline transition hover:-translate-y-px hover:border-[var(--brick-dark)] hover:bg-[var(--brick-dark)] max-[680px]:mt-[18px] max-[680px]:w-full"
            href="/candidates/new"
          >
            + New candidate
          </Link>
        </header>

        <Suspense
          fallback={
            <div
              className="flex min-h-[190px] flex-col items-center justify-center gap-[7px] rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-6 text-center text-[var(--muted)]"
              role="status"
            >
              <strong className="text-[0.95rem] text-[var(--navy)]">
                Loading candidate pipeline
              </strong>
              <p className="m-0">Fetching the latest applications.</p>
            </div>
          }
        >
          <CandidateList />
        </Suspense>
      </main>
    </AppShell>
  );
}
