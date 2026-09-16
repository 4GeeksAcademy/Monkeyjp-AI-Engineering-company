const programs = [
  {
    country: "Colombia",
    rule: "1 punto por cada 10.000 COP",
  },
  {
    country: "Estados Unidos",
    rule: "1 punto por cada 5 USD",
  },
];

export default function BrasaPointsPage() {
  return (
    <section aria-labelledby="brasa-points-title">
      <p className="font-bold text-brasa-700">Fidelización</p>

      <h2
        id="brasa-points-title"
        className="mt-1 text-3xl font-black text-stone-950"
      >
        Brasa Points
      </h2>

      <p className="mt-3 max-w-3xl text-stone-600">
        Vista general del programa digital de fidelización de Brasaland.
      </p>

      <div className="mt-8 rounded-2xl bg-stone-950 p-6 text-white shadow-sm sm:p-8">
        <p className="max-w-3xl leading-7 text-stone-300">
          El programa permite a los clientes acumular puntos en sus visitas y
          reemplaza el sistema tradicional de tarjetas físicas.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.country}
              className="rounded-xl bg-stone-900 p-5"
            >
              <p className="text-sm font-bold text-brasa-400">
                {program.country}
              </p>

              <p className="mt-2 text-lg font-semibold">{program.rule}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
