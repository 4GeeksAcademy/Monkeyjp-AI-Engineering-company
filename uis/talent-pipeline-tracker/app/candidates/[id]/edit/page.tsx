import Link from "next/link";

import AppShell from "@/components/AppShell";
import CandidateForm from "@/components/CandidateForm";
import { getCandidate } from "@/services/candidates";
import { getSafeReturnUrl } from "@/utils/navigation";

interface EditCandidatePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
}

export default async function EditCandidatePage({
  params,
  searchParams,
}: EditCandidatePageProps) {
  const { id } = await params;
  const { from } = await searchParams;
  const returnUrl = getSafeReturnUrl(from);

  const candidate = await getCandidate(id);

  return (
    <AppShell>
      <main className="mx-auto max-w-[1220px] px-[42px] pb-16 pt-[42px] max-[900px]:px-[26px] max-[680px]:px-4 max-[680px]:py-7">
        <Link
          className="mb-[22px] inline-flex text-[0.8rem] font-bold text-[var(--muted)] no-underline hover:text-[var(--brick)]"
          href={`/candidates/${id}?from=${encodeURIComponent(returnUrl)}`}
        >
          ← Back to candidate
        </Link>

        <header className="mb-[30px] flex items-start justify-between gap-6 max-[680px]:mb-[22px] max-[680px]:block">
          <div>
            <p className="mb-[9px] text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-[var(--brick)]">
              Candidate record
            </p>
            <h1 className="m-0 text-[clamp(1.7rem,3vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[var(--navy)]">
              Edit candidate
            </h1>
            <p className="mt-2.5 max-w-[620px] text-[0.94rem] leading-[1.55] text-[var(--muted)]">
              Keep the candidate profile accurate for everyone involved in the
              hiring process.
            </p>
          </div>
        </header>

        <CandidateForm
          mode="edit"
          candidateId={candidate.id}
          initialValues={{
            full_name: candidate.full_name,
            email: candidate.email,
            phone: candidate.phone,
            position: candidate.position,
            linkedin_url: candidate.linkedin_url,
            cv_url: candidate.cv_url,
            experience_years: candidate.experience_years,
          }}
          returnUrl={returnUrl}
        />
      </main>
    </AppShell>
  );
}
