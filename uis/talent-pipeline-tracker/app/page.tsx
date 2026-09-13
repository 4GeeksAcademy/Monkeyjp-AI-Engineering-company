import { Suspense } from "react";
import CandidateList from "@/components/CandidateList";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header>
        <p>Brasaland</p>
        <h1>Talent Pipeline Tracker</h1>
        <p>People & Talent</p>
        <Link href="/candidates/new">New candidate</Link>
      </header>

      <Suspense fallback={<p>Loading candidates...</p>}>
        <CandidateList />
      </Suspense>
    </main>
  );
}
