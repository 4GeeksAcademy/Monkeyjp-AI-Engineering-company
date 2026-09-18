"use client";

import { FormEvent, useState } from "react";

import { createSupplier } from "@/services/suppliers";
import type {
  Supplier,
  SupplierCategory,
  SupplierCountry,
  SupplierCurrency,
  SupplierStatus,
} from "@/types/suppliers";

type SupplierFormProps = {
  onCreated: (supplier: Supplier) => void;
};

const categories: SupplierCategory[] = [
  "carne",
  "verduras_y_hortalizas",
  "salsas_y_condimentos",
  "bebidas",
  "packaging",
  "productos_limpieza",
  "lacteos",
  "carbon_y_combustible",
];

function formatCategory(category: SupplierCategory): string {
  return category.replaceAll("_", " ");
}

export default function SupplierForm({ onCreated }: SupplierFormProps) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState<SupplierCountry>("Colombia");
  const [selectedCategories, setSelectedCategories] = useState<
    SupplierCategory[]
  >([]);
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState<SupplierStatus>("active");
  const [contactEmail, setContactEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currency: SupplierCurrency = country === "Colombia" ? "COP" : "USD";

  function toggleCategory(category: SupplierCategory) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedCategories.length === 0) {
      setError("Selecciona al menos una categoría.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const supplier = await createSupplier({
        name,
        country,
        categories: selectedCategories,
        rate_per_unit: Number(rate),
        currency,
        status,
        contact_email: contactEmail || null,
        notes: notes || null,
      });

      onCreated(supplier);

      setName("");
      setSelectedCategories([]);
      setRate("");
      setStatus("active");
      setContactEmail("");
      setNotes("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo registrar el proveedor.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-0">
      <div>
        <h3 className="text-xl font-black text-stone-950">
          Registrar proveedor
        </h3>

        <p className="mt-1 text-sm text-stone-600">
          Añade un nuevo proveedor al directorio.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Nombre
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-xl border border-stone-300 px-3 py-2 font-normal text-stone-900"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          País
          <select
            value={country}
            onChange={(event) =>
              setCountry(event.target.value as SupplierCountry)
            }
            className="rounded-xl border border-stone-300 bg-white px-3 py-2 font-normal text-stone-900"
          >
            <option value="Colombia">Colombia</option>
            <option value="USA">USA</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Tarifa
          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            className="rounded-xl border border-stone-300 px-3 py-2 font-normal text-stone-900"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Moneda
          <input
            disabled
            value={currency}
            className="rounded-xl border border-stone-200 bg-stone-100 px-3 py-2 font-normal text-stone-600"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Estado
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as SupplierStatus)
            }
            className="rounded-xl border border-stone-300 bg-white px-3 py-2 font-normal text-stone-900"
          >
            <option value="active">Activo</option>
            <option value="suspended">Suspendido</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Email de contacto
          <input
            type="email"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            className="rounded-xl border border-stone-300 px-3 py-2 font-normal text-stone-900"
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-stone-700">Categorías</legend>

        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);

            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`rounded-full border px-3 py-2 text-sm font-bold transition ${
                  isSelected
                    ? "border-brasa-700 bg-brasa-700 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                {formatCategory(category)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-5 grid gap-2 text-sm font-bold text-stone-700">
        Notas
        <textarea
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="resize-y rounded-xl border border-stone-300 px-3 py-2 font-normal text-stone-900"
        />
      </label>

      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-xl bg-brasa-700 px-5 py-3 font-bold text-white transition hover:bg-brasa-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Registrando..." : "Registrar proveedor"}
      </button>
    </form>
  );
}
