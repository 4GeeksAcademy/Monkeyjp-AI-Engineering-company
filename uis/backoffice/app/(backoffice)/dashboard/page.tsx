import Link from "next/link";

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

export default function DashboardPage() {
  return (
    <>
      <section aria-labelledby="dashboard-title">
        <p className="font-bold text-brasa-700">Vista general</p>

        <h2
          id="dashboard-title"
          className="mt-1 text-3xl font-black text-stone-950"
        >
          Bienvenido a Brasaland Digital
        </h2>

        <p className="mt-3 max-w-3xl text-stone-600">
          Resumen inicial de la operación y de las principales iniciativas
          digitales de Brasaland.
        </p>

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

              <p className="mt-2 text-sm text-stone-600">{metric.detail}</p>
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

      <section className="mt-10" aria-labelledby="quick-access-title">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2
            id="quick-access-title"
            className="text-2xl font-black text-stone-950"
          >
            Accesos rápidos
          </h2>

          <p className="mt-2 text-stone-600">
            Accede directamente a las principales herramientas del backoffice.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/locations"
              className="rounded-xl border border-stone-200 p-5 transition hover:border-brasa-300 hover:bg-brasa-50"
            >
              <p className="font-black text-stone-950">Ubicaciones</p>

              <p className="mt-2 text-sm text-stone-600">
                Consulta la distribución actual de restaurantes.
              </p>
            </Link>

            <Link
              href="/brasa-points"
              className="rounded-xl border border-stone-200 p-5 transition hover:border-brasa-300 hover:bg-brasa-50"
            >
              <p className="font-black text-stone-950">Brasa Points</p>

              <p className="mt-2 text-sm text-stone-600">
                Consulta las reglas actuales del programa de fidelización.
              </p>
            </Link>

            <Link
              href="/incidents"
              className="rounded-xl border border-stone-200 p-5 transition hover:border-brasa-300 hover:bg-brasa-50"
            >
              <p className="font-black text-stone-950">
                Análisis de Incidentes
              </p>

              <p className="mt-2 text-sm text-stone-600">
                Carga y analiza el reporte mensual de incidentes.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="priorities-title">
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
    </>
  );
}
