import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

type BackofficeLayoutProps = {
  children: ReactNode;
};

export default function BackofficeLayout({
  children,
}: BackofficeLayoutProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <Sidebar />

      <div className="min-w-0">
        <Header />

        <main id="main-content" className="px-6 py-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}