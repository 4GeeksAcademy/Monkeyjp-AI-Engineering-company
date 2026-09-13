import Link from "next/link";

import CandidateForm from "@/components/CandidateForm";

export default function NewCandidatePage() {
  return (
    <main>
      <Link href="/">← Back to candidates</Link>

      <h1>New candidate</h1>

      <CandidateForm mode="create" />
    </main>
  );
}
