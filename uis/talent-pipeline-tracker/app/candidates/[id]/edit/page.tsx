import Link from "next/link";

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
    <main>
      <Link href={`/candidates/${id}?from=${encodeURIComponent(returnUrl)}`}>
        ← Back to candidate
      </Link>

      <h1>Edit candidate</h1>

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
  );
}
