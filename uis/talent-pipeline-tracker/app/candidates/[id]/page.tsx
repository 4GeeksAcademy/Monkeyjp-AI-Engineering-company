import Link from "next/link";

import AppShell from "@/components/AppShell";
import CandidateDetails from "@/components/CandidateDetails";
import { getSafeReturnUrl } from "@/utils/navigation";

interface CandidatePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
}

export default async function CandidatePage({
  params,
  searchParams,
}: CandidatePageProps) {
  const { id } = await params;
  const { from } = await searchParams;
  const backUrl = getSafeReturnUrl(from);

  return (
    <AppShell>
      <main className="mx-auto max-w-[1220px] px-[42px] pb-16 pt-[42px] max-[900px]:px-[26px] max-[680px]:px-4 max-[680px]:py-7">
        <Link
          className="mb-[22px] inline-flex text-[0.8rem] font-bold text-[var(--muted)] no-underline hover:text-[var(--brick)]"
          href={backUrl}
        >
          ← Back to candidates
        </Link>

        <CandidateDetails id={id} returnUrl={backUrl} />
      </main>
    </AppShell>
  );
}
