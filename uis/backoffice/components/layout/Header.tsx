export default function Header() {
  return (
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
  );
}
