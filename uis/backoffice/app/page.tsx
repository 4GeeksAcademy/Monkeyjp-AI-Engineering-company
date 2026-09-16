import IncidentAnalysis from "@/components/incidents/IncidentAnalysis";

const navigation = [
  { label: "Dashboard", href: "#dashboard", active: true },
  { label: "Ubicaciones", href: "#locations" },
  { label: "Brasa Points", href: "#brasa-points" },
  { label: "Prioridades", href: "#priorities" },
  { label: "Análisis de Incidentes", href: "#incidents" },
];

const metrics = [
  {
    label: "Restaurantes",
    value: "14",
    detail: "Ubicaciones operativas",
  },
  {
    label: "Colombia",
    value: "10",
    detail: "Medellín, Bogotá y Cali",
  },
  {
    label: "Florida",
    value: "4",
    detail: "Miami y Orlando",
  },
];

const priorities = [
  "Consolidar una presencia digital coherente para Colombia y Florida.",
  "Impulsar la adopción del programa Brasa Points.",
  "Construir herramientas internas que apoyen la operación y la transformación digital.",
];

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-50 rounded bg-white px-4 py-2 font-semibold text-stone-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido principal
      </a>

      <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
        <aside className="bg-stone-950 text-white">
          <div className="border-b border-stone-800 px-6 py-6">
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
          </div>

          <nav className="px-4 py-6" aria-label="Navegación del backoffice">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={
                      item.active
                        ? "block rounded-lg bg-brasa-600 px-4 py-3 font-semibold"
                        : "block rounded-lg px-4 py-3 font-semibold text-stone-300 transition hover:bg-stone-800 hover:text-white"
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div>
          <header className="border-b border-stone-200 bg-white">
            <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-brasa-600">
                  Brasaland Digital
                </p>

                <h1 className="mt-1 text-2xl font-black text-stone-950">
                  Panel de operaciones
                </h1>
              </div>

              <span className="inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-800">
                Sistema activo
              </span>
            </div>
          </header>

          <main id="main-content" className="px-6 py-8 lg:px-10">
            <section id="dashboard" aria-labelledby="dashboard-title">
              <div>
                <p className="font-bold text-brasa-700">Vista general</p>

                <h2
                  id="dashboard-title"
                  className="mt-1 text-3xl font-black text-stone-950"
                >
                  Bienvenido a Brasaland Digital
                </h2>

                <p className="mt-3 max-w-3xl text-stone-600">
                  Resumen inicial de la operación y de las principales
                  iniciativas digitales de Brasaland.
                </p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => (
                  <article
                    key={metric.label}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <p className="text-sm font-bold uppercase tracking-wide text-stone-500">
                      {metric.label}
                    </p>

                    <p className="mt-2 text-4xl font-black text-stone-950">
                      {metric.value}
                    </p>

                    <p className="mt-2 text-sm text-stone-600">
                      {metric.detail}
                    </p>
                  </article>
                ))}

                <article className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-wide text-stone-500">
                    Fidelización
                  </p>

                  <p className="mt-2 text-2xl font-black text-brasa-600">
                    Brasa Points
                  </p>

                  <p className="mt-2 text-sm text-stone-600">
                    Programa digital activo
                  </p>
                </article>
              </div>
            </section>

            <section
              id="locations"
              className="mt-10"
              aria-labelledby="locations-title"
            >
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2
                  id="locations-title"
                  className="text-2xl font-black text-stone-950"
                >
                  Distribución de ubicaciones
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <article className="rounded-xl border border-stone-200 p-5">
                    <h3 className="text-lg font-black">Colombia</h3>
                    <p className="mt-2 text-stone-600">
                      10 restaurantes distribuidos entre Medellín, Bogotá y
                      Cali.
                    </p>
                  </article>

                  <article className="rounded-xl border border-stone-200 p-5">
                    <h3 className="text-lg font-black">Estados Unidos</h3>
                    <p className="mt-2 text-stone-600">
                      4 restaurantes ubicados en Florida, entre Miami y Orlando.
                    </p>
                  </article>
                </div>
              </div>
            </section>

            <section
              id="brasa-points"
              className="mt-10"
              aria-labelledby="points-title"
            >
              <div className="rounded-2xl bg-stone-950 p-6 text-white shadow-sm sm:p-8">
                <p className="font-bold uppercase tracking-widest text-brasa-400">
                  Fidelización
                </p>

                <h2 id="points-title" className="mt-2 text-2xl font-black">
                  Brasa Points
                </h2>

                <p className="mt-4 max-w-3xl leading-7 text-stone-300">
                  El programa digital de fidelización permite a los clientes
                  acumular puntos en sus visitas y reemplaza el sistema
                  tradicional de tarjetas físicas.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-stone-900 p-5">
                    <p className="text-sm font-bold text-brasa-400">Colombia</p>
                    <p className="mt-1 font-semibold">
                      1 punto por cada 10.000 COP
                    </p>
                  </div>

                  <div className="rounded-xl bg-stone-900 p-5">
                    <p className="text-sm font-bold text-brasa-400">
                      Estados Unidos
                    </p>
                    <p className="mt-1 font-semibold">1 punto por cada 5 USD</p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="priorities"
              className="mt-10"
              aria-labelledby="priorities-title"
            >
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2
                  id="priorities-title"
                  className="text-2xl font-black text-stone-950"
                >
                  Prioridades digitales
                </h2>

                <ul className="mt-6 space-y-4">
                  {priorities.map((priority) => (
                    <li key={priority} className="flex gap-3">
                      <span className="mt-1 text-brasa-600" aria-hidden="true">
                        ●
                      </span>
                      <span>{priority}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <IncidentAnalysis />
          </main>
        </div>
      </div>
    </>
  );
}
