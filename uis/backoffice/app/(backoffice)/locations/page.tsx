const locations = [
  {
    country: "Colombia",
    count: 10,
    detail: "Medellín, Bogotá y Cali",
  },
  {
    country: "Estados Unidos",
    count: 4,
    detail: "Florida, entre Miami y Orlando",
  },
];

export default function LocationsPage() {
  return (
    <section aria-labelledby="locations-title">
      <p className="font-bold text-brasa-700">Operaciones</p>

      <h2
        id="locations-title"
        className="mt-1 text-3xl font-black text-stone-950"
      >
        Ubicaciones
      </h2>

      <p className="mt-3 max-w-3xl text-stone-600">
        Vista general de la distribución actual de restaurantes Brasaland.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <article
            key={location.country}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-stone-500">
              {location.country}
            </p>

            <p className="mt-3 text-4xl font-black text-stone-950">
              {location.count}
            </p>

            <p className="mt-2 text-stone-600">{location.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
