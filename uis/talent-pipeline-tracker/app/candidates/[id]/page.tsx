import Link from "next/link";

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
    <main>
      <Link href={backUrl}>← Back to candidates</Link>

      <CandidateDetails id={id} returnUrl={backUrl} />
    </main>
  );
}
