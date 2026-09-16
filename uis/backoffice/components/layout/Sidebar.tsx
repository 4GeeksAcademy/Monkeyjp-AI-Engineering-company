"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Ubicaciones", href: "/locations" },
  { label: "Brasa Points", href: "/brasa-points" },
  { label: "Incidentes", href: "/incidents" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="bg-stone-950 text-white">
      <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4 lg:block lg:px-6 lg:py-6">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brasa-600 text-xl"
            aria-hidden="true"
          >
            🔥
          </span>

          <div>
            <p className="text-xl font-black">Brasaland</p>
            <p className="text-sm text-stone-400">Backoffice</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-lg border border-stone-700 px-4 py-2 text-sm font-bold transition hover:bg-stone-800 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="backoffice-navigation"
        >
          {isOpen ? "Cerrar" : "Menú"}
        </button>
      </div>

      <nav
        id="backoffice-navigation"
        className={`${isOpen ? "block" : "hidden"} px-4 py-4 lg:block lg:py-6`}
        aria-label="Navegación del backoffice"
      >
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "block rounded-lg bg-brasa-600 px-4 py-3 font-semibold"
                      : "block rounded-lg px-4 py-3 font-semibold text-stone-300 transition hover:bg-stone-800 hover:text-white"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}