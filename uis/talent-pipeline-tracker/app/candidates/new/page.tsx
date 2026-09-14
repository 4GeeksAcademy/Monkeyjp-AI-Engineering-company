import Link from "next/link";

import AppShell from "@/components/AppShell";
import CandidateForm from "@/components/CandidateForm";

export default function NewCandidatePage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1220px] px-[42px] pb-16 pt-[42px] max-[900px]:px-[26px] max-[680px]:px-4 max-[680px]:py-7">
        <Link
          className="mb-[22px] inline-flex text-[0.8rem] font-bold text-[var(--muted)] no-underline hover:text-[var(--brick)]"
          href="/"
        >
          ← Back to candidates
        </Link>

        <header className="mb-[30px] flex items-start justify-between gap-6 max-[680px]:mb-[22px] max-[680px]:block">
          <div>
            <p className="mb-[9px] text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-[var(--brick)]">
              Candidate record
            </p>
            <h1 className="m-0 text-[clamp(1.7rem,3vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[var(--navy)]">
              Add a candidate
            </h1>
            <p className="mt-2.5 max-w-[620px] text-[0.94rem] leading-[1.55] text-[var(--muted)]">
              Create a clear starting point for a new application in the
              Brasaland hiring pipeline.
            </p>
          </div>
        </header>

        <CandidateForm mode="create" />
      </main>
    </AppShell>
  );
}
