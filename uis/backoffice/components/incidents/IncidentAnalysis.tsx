"use client";

import { FormEvent, useState } from "react";
import { analyzeIncidents, getIncidentExportUrl } from "@/services/incidents";
import type { IncidentAnalysisResult } from "@/types/incidents";

const CATEGORY_LABELS: Record<string, string> = {
  CUSTOMER_COMPLAINT: "Queja de cliente",
  EQUIPMENT: "Falla de equipo",
  SUPPLY: "Abastecimiento",
  FOOD_QUALITY: "Calidad de alimentos",
  STAFF: "Personal",
};

const STATUS_LABELS: Record<string, string> = {
  OPEN: "Abierto",
  CLOSED: "Cerrado",
  DISCARDED: "Descartado",
};

const INVALID_RULE_LABELS: Record<string, string> = {
  missing_incident_id: "ID de incidente faltante",
  missing_date: "Fecha faltante",
  missing_location_id: "Ubicación faltante o inválida",
  invalid_category: "Categoría faltante o inválida",
  invalid_status: "Estado faltante o inválido",
  empty_description: "Descripción vacía o muy corta",
  missing_reporter_id: "Responsable faltante",
  closed_without_score: "Cerrado sin puntaje de satisfacción",
  score_out_of_range: "Puntaje de satisfacción fuera de rango",
};

const SATISFACTION_LABELS: Record<string, string> = {
  "1": "1 · Muy insatisfecho",
  "2": "2 · Insatisfecho",
  "3": "3 · Neutral",
  "4": "4 · Satisfecho",
  "5": "5 · Muy satisfecho",
};

function formatPercentage(count: number, total: number) {
  if (!total) return "0.0%";

  return `${((count / total) * 100).toFixed(1)}%`;
}

type BreakdownListProps = {
  entries: Record<string, number>;
  labels: Record<string, string>;
  total?: number;
};

function BreakdownList({ entries, labels, total = 0 }: BreakdownListProps) {
  return (
    <ul className="mt-3 space-y-2">
      {Object.entries(entries).map(([key, count]) => (
        <li
          key={key}
          className="flex items-center justify-between gap-4 rounded-lg border border-stone-200 px-4 py-3"
        >
          <span className="font-semibold text-stone-700">
            {labels[key] ?? key}
          </span>

          <span className="font-black text-stone-950">
            {total ? `${count} (${formatPercentage(count, total)})` : count}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function IncidentAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<IncidentAnalysisResult | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Selecciona un archivo CSV antes de analizarlo.");
      return;
    }

    setIsLoading(true);
    setError("");
    setStatus("Analizando archivo...");

    try {
      const analysis = await analyzeIncidents(file);

      setResult(analysis);
      setStatus("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible conectar con el servicio de análisis.",
      );

      setStatus("");
    } finally {
      setIsLoading(false);
    }
  }

  function handleExport() {
    window.location.href = getIncidentExportUrl();
  }

  return (
    <section id="incidents" className="mt-10" aria-labelledby="incidents-title">
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 px-5 py-6 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-wider text-brasa-700">
            Operaciones
          </p>

          <h2
            id="incidents-title"
            className="mt-1 text-2xl font-black text-stone-950 sm:text-3xl"
          >
            Análisis de Incidentes
          </h2>

          <p className="mt-3 max-w-2xl leading-6 text-stone-600">
            Carga el reporte mensual de incidentes en formato CSV para validar
            los registros y obtener un resumen operativo.
          </p>
        </div>

        <div className="p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="incidents-file-input"
                className="block text-sm font-bold text-stone-800"
              >
                Archivo CSV de incidentes
              </label>

              <p className="mt-1 text-sm text-stone-500">
                Selecciona un archivo CSV con el reporte mensual.
              </p>

              <input
                id="incidents-file-input"
                name="file"
                type="file"
                accept=".csv,text/csv"
                required
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                className="mt-3 block w-full cursor-pointer rounded-xl border border-stone-300 bg-stone-50 text-sm text-stone-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-brasa-600 file:px-5 file:py-3 file:font-bold file:text-white hover:file:bg-brasa-700 focus:outline-none focus:ring-2 focus:ring-brasa-500 focus:ring-offset-2"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-brasa-600 px-5 py-2.5 font-bold text-white transition hover:bg-brasa-700 focus:outline-none focus:ring-2 focus:ring-brasa-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {isLoading ? "Analizando..." : "Analizar archivo"}
              </button>

              <button
                type="button"
                disabled={!result}
                onClick={handleExport}
                className="w-full rounded-xl border border-stone-300 bg-white px-5 py-2.5 font-bold text-stone-700 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-400 sm:w-auto"
              >
                Descargar resumen CSV
              </button>
            </div>
          </form>

          {status && (
            <p
              className="mt-4 text-sm font-semibold text-stone-600"
              role="status"
            >
              {status}
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm font-semibold text-red-700" role="alert">
              {error}
            </p>
          )}

          {!result && (
            <div className="mt-8 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-center">
              <p className="font-medium text-stone-600">
                Aún no hay resultados
              </p>

              <p className="mt-1 text-sm text-stone-500">
                Carga y analiza un archivo CSV para ver el resumen.
              </p>
            </div>
          )}

          {result && (
            <div className="mt-8">
              {result.invalid_count > 0 && (
                <p
                  className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 font-semibold text-amber-800"
                  role="alert"
                >
                  Se detectaron {result.invalid_count} registro(s) inválido(s).
                  Fueron excluidos del análisis y se detallan a continuación.
                </p>
              )}

              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <article className="rounded-xl border border-stone-200 p-5">
                  <p className="text-sm font-bold uppercase tracking-wide text-stone-500">
                    Total de registros
                  </p>
                  <p className="mt-2 text-4xl font-black text-stone-950">
                    {result.total_records}
                  </p>
                </article>

                <article className="rounded-xl border border-stone-200 p-5">
                  <p className="text-sm font-bold uppercase tracking-wide text-stone-500">
                    Válidos
                  </p>
                  <p className="mt-2 text-4xl font-black text-green-700">
                    {result.valid_count}
                  </p>
                </article>

                <article className="rounded-xl border border-stone-200 p-5">
                  <p className="text-sm font-bold uppercase tracking-wide text-stone-500">
                    Inválidos
                  </p>
                  <p className="mt-2 text-4xl font-black text-red-700">
                    {result.invalid_count}
                  </p>
                </article>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-black text-stone-950">
                    Detalle de registros inválidos
                  </h3>

                  <BreakdownList
                    entries={result.invalid_breakdown}
                    labels={INVALID_RULE_LABELS}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-black text-stone-950">
                    Por categoría (registros válidos)
                  </h3>

                  <BreakdownList
                    entries={result.category_counts}
                    labels={CATEGORY_LABELS}
                    total={result.valid_count}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-black text-stone-950">
                    Por estado (registros válidos)
                  </h3>

                  <BreakdownList
                    entries={result.status_counts}
                    labels={STATUS_LABELS}
                    total={result.valid_count}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-black text-stone-950">
                    Índice de satisfacción (casos cerrados)
                  </h3>

                  <p className="mt-3 text-stone-600">
                    Promedio:{" "}
                    <span className="font-black text-stone-950">
                      {result.satisfaction_average.toFixed(2)}
                    </span>{" "}
                    / 5.00 · Con puntaje:{" "}
                    <span className="font-black text-stone-950">
                      {result.scored_closed_count} de {result.closed_count}
                    </span>
                  </p>

                  <BreakdownList
                    entries={result.satisfaction_counts}
                    labels={SATISFACTION_LABELS}
                    total={result.scored_closed_count}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
