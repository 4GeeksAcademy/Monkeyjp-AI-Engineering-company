"use client";

import { useEffect, useState } from "react";

import SupplierForm from "@/components/suppliers/SupplierForm";
import {
  getSuppliers,
  updateSupplierRate,
  updateSupplierStatus,
} from "@/services/suppliers";
import type {
  Supplier,
  SupplierCategory,
  SupplierCountry,
} from "@/types/suppliers";

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

function formatRate(supplier: Supplier): string {
  return new Intl.NumberFormat(
    supplier.country === "Colombia" ? "es-CO" : "en-US",
    {
      style: "currency",
      currency: supplier.currency,
    },
  ).format(supplier.rate_per_unit);
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [country, setCountry] = useState<SupplierCountry | "">("");
  const [category, setCategory] = useState<SupplierCategory | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [rateSupplier, setRateSupplier] = useState<Supplier | null>(null);
  const [newRate, setNewRate] = useState("");
  const [isUpdatingRate, setIsUpdatingRate] = useState(false);

  useEffect(() => {
    async function loadSuppliers() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getSuppliers({
          country: country || undefined,
          category: category || undefined,
        });

        setSuppliers(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar los proveedores.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadSuppliers();
  }, [country, category]);

  async function handleToggleStatus(supplier: Supplier) {
    try {
      setError(null);

      const nextStatus = supplier.status === "active" ? "suspended" : "active";

      const updated = await updateSupplierStatus(supplier.id, {
        status: nextStatus,
      });

      setSuppliers((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo actualizar el estado del proveedor.",
      );
    }
  }

  async function handleUpdateRate() {
    if (!rateSupplier) return;

    try {
      setIsUpdatingRate(true);
      setError(null);

      const updated = await updateSupplierRate(rateSupplier.id, {
        rate_per_unit: Number(newRate),
      });

      setSuppliers((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );

      setRateSupplier(null);
      setNewRate("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo actualizar la tarifa.",
      );
    } finally {
      setIsUpdatingRate(false);
    }
  }

  return (
    <section aria-labelledby="suppliers-title">
      <p className="font-bold text-brasa-700">Compras</p>

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="suppliers-title"
            className="text-3xl font-black text-stone-950"
          >
            Directorio de proveedores
          </h2>

          <p className="mt-3 max-w-3xl text-stone-600">
            Consulta y gestiona los proveedores de Brasaland en Colombia y
            Estados Unidos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="shrink-0 rounded-xl bg-brasa-700 px-4 py-2.5 font-bold text-white transition hover:bg-brasa-800"
        >
          Nuevo proveedor
        </button>
      </div>

      <div className="mt-8 grid gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          País
          <select
            value={country}
            onChange={(event) =>
              setCountry(event.target.value as SupplierCountry | "")
            }
            className="rounded-xl border border-stone-300 bg-white px-3 py-2 font-normal text-stone-900"
          >
            <option value="">Todos</option>
            <option value="Colombia">Colombia</option>
            <option value="USA">USA</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Categoría
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as SupplierCategory | "")
            }
            className="rounded-xl border border-stone-300 bg-white px-3 py-2 font-normal text-stone-900"
          >
            <option value="">Todas</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {formatCategory(item)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6">
        {isLoading && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-stone-600">Cargando proveedores...</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p role="alert" className="font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {!isLoading && !error && suppliers.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-stone-600">
              No hay proveedores para los filtros seleccionados.
            </p>
          </div>
        )}

        {!isLoading && !error && suppliers.length > 0 && (
          <>
            <div className="grid gap-4 md:hidden">
              {suppliers.map((supplier) => (
                <article
                  key={supplier.id}
                  className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-stone-950">
                        {supplier.name}
                      </h3>

                      {supplier.contact_email && (
                        <p className="mt-1 break-all text-sm text-stone-500">
                          {supplier.contact_email}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(supplier)}
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
                        supplier.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      }`}
                    >
                      {supplier.status === "active" ? "Activo" : "Suspendido"}
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-stone-500">País</span>
                      <span className="font-medium text-stone-800">
                        {supplier.country}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-stone-500">Tarifa</span>
                      <span className="font-bold text-stone-900">
                        {formatRate(supplier)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setRateSupplier(supplier);
                      setNewRate(String(supplier.rate_per_unit));
                    }}
                    className="mt-3 text-sm font-bold text-brasa-700 hover:text-brasa-800"
                  >
                    Editar tarifa
                  </button>

                  <div className="mt-4 border-t border-stone-100 pt-4">
                    <p className="mb-2 text-sm text-stone-500">Categorías</p>

                    <div className="flex flex-wrap gap-2">
                      {supplier.categories.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700"
                        >
                          {formatCategory(item)}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead className="bg-stone-50">
                    <tr className="border-b border-stone-200 text-sm text-stone-600">
                      <th className="px-5 py-4 font-bold">Proveedor</th>
                      <th className="px-5 py-4 font-bold">País</th>
                      <th className="px-5 py-4 font-bold">Categorías</th>
                      <th className="px-5 py-4 font-bold">Tarifa</th>
                      <th className="px-5 py-4 font-bold">Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {suppliers.map((supplier) => (
                      <tr
                        key={supplier.id}
                        className="border-b border-stone-100 last:border-b-0"
                      >
                        <td className="px-5 py-4">
                          <p className="font-bold text-stone-950">
                            {supplier.name}
                          </p>

                          {supplier.contact_email && (
                            <p className="mt-1 text-sm text-stone-500">
                              {supplier.contact_email}
                            </p>
                          )}
                        </td>

                        <td className="px-5 py-4 text-stone-700">
                          {supplier.country}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-2">
                            {supplier.categories.map((item) => (
                              <span
                                key={item}
                                className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700"
                              >
                                {formatCategory(item)}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-bold text-stone-900">
                            {formatRate(supplier)}
                          </p>

                          <button
                            type="button"
                            onClick={() => {
                              setRateSupplier(supplier);
                              setNewRate(String(supplier.rate_per_unit));
                            }}
                            className="mt-1 text-xs font-bold text-brasa-700 hover:text-brasa-800"
                          >
                            Editar
                          </button>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(supplier)}
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold transition ${
                              supplier.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            }`}
                          >
                            {supplier.status === "active"
                              ? "Activo"
                              : "Suspendido"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-supplier-title"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <h3
                id="create-supplier-title"
                className="text-xl font-black text-stone-950"
              >
                Nuevo proveedor
              </h3>

              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-bold text-stone-600 hover:bg-stone-100"
              >
                Cerrar
              </button>
            </div>

            <div className="p-5">
              <SupplierForm
                onCreated={(supplier) => {
                  setSuppliers((current) => [supplier, ...current]);
                  setIsCreateOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {rateSupplier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rate-modal-title"
          onClick={() => setRateSupplier(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3
              id="rate-modal-title"
              className="text-xl font-black text-stone-950"
            >
              Actualizar tarifa
            </h3>

            <p className="mt-2 text-sm text-stone-600">{rateSupplier.name}</p>

            <label className="mt-5 grid gap-2 text-sm font-bold text-stone-700">
              Nueva tarifa ({rateSupplier.currency})
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={newRate}
                onChange={(event) => setNewRate(event.target.value)}
                className="rounded-xl border border-stone-300 px-3 py-2 font-normal text-stone-900"
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setRateSupplier(null);
                  setNewRate("");
                }}
                className="rounded-xl border border-stone-300 px-4 py-2 font-bold text-stone-700 hover:bg-stone-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleUpdateRate}
                disabled={isUpdatingRate || Number(newRate) <= 0}
                className="rounded-xl bg-brasa-700 px-4 py-2 font-bold text-white hover:bg-brasa-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdatingRate ? "Guardando..." : "Guardar tarifa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
