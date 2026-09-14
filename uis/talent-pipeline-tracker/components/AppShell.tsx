import Link from "next/link";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <aside
        className="flex min-h-screen basis-[248px] flex-col bg-[var(--navy)] px-5 py-7 text-[#f8fafb] max-[900px]:basis-[216px] max-[680px]:hidden"
        aria-label="Primary navigation"
      >
        <div className="flex items-center gap-[11px]">
          <span
            className="inline-flex size-9 items-center justify-center rounded-[9px] bg-[var(--brick)] text-[1.15rem] font-extrabold tracking-[-0.04em] text-white"
            aria-hidden="true"
          >
            B
          </span>
          <div>
            <p className="m-0 text-[0.98rem] font-bold tracking-[-0.02em]">
              Brasaland
            </p>
            <p className="mt-0.5 text-[0.72rem] text-[#aebbc5]">
              People &amp; Talent
            </p>
          </div>
        </div>

        <nav className="mt-12" aria-label="Workspace">
          <Link
            className="flex items-center gap-[11px] rounded-lg bg-white/10 px-3 py-[11px] text-[0.88rem] font-semibold text-white no-underline hover:bg-white/10"
            href="/"
          >
            <span className="text-[#e17a64]" aria-hidden="true">
              ◈
            </span>
            Candidates
          </Link>
        </nav>

        <div className="mt-auto border-t border-white/15 px-3 pt-[18px]">
          <p className="m-0 text-[0.75rem] font-bold text-[#e3e9ed]">
            Brasaland Digital
          </p>
          <p className="mt-[5px] text-[0.72rem] leading-[1.45] text-[#8e9da8]">
            People operations workspace
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="hidden min-h-[68px] items-center bg-[var(--navy)] px-[18px] max-[680px]:flex">
          <Link
            className="flex items-center gap-[11px] text-[0.82rem] font-bold text-white no-underline"
            href="/"
          >
            <span
              className="inline-flex size-9 items-center justify-center rounded-[9px] bg-[var(--brick)] text-[1.15rem] font-extrabold tracking-[-0.04em] text-white"
              aria-hidden="true"
            >
              B
            </span>
            <span>Brasaland People &amp; Talent</span>
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}
