"use strict";

/**
 * Incident Analysis integration for the Brasaland backoffice.
 * Talks to the services/api backend (POST /api/incidents/analyze,
 * GET /api/incidents/results/export).
 */
(function () {
    // Override with window.BRASALAND_API_BASE_URL before this script loads if the backend runs elsewhere.
    const API_BASE_URL = window.BRASALAND_API_BASE_URL || "https://curly-space-carnival-rp4pxx4rx94cxqxj-8000.app.github.dev";
    const ANALYZE_URL = `${API_BASE_URL}/api/incidents/analyze`;
    const EXPORT_URL = `${API_BASE_URL}/api/incidents/results/export`;

    const CATEGORY_LABELS = {
        CUSTOMER_COMPLAINT: "Queja de cliente",
        EQUIPMENT: "Falla de equipo",
        SUPPLY: "Abastecimiento",
        FOOD_QUALITY: "Calidad de alimentos",
        STAFF: "Personal",
    };

    const STATUS_LABELS = {
        OPEN: "Abierto",
        CLOSED: "Cerrado",
        DISCARDED: "Descartado",
    };

    const INVALID_RULE_LABELS = {
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

    const SATISFACTION_LABELS = {
        1: "1 · Muy insatisfecho",
        2: "2 · Insatisfecho",
        3: "3 · Neutral",
        4: "4 · Satisfecho",
        5: "5 · Muy satisfecho",
    };

    function byId(id) {
        return document.getElementById(id);
    }

    function formatPercentage(count, total) {
        if (!total) {
            return "0.0%";
        }
        return `${((count / total) * 100).toFixed(1)}%`;
    }

    function renderBreakdownList(container, entries, labels, total) {
        container.innerHTML = "";

        entries.forEach(([key, count]) => {
            const item = document.createElement("li");
            item.className =
                "flex items-center justify-between gap-4 rounded-lg border border-stone-200 px-4 py-3";

            const label = document.createElement("span");
            label.className = "font-semibold text-stone-700";
            label.textContent = labels[key] || key;

            const value = document.createElement("span");
            value.className = "font-black text-stone-950";
            value.textContent = total
                ? `${count} (${formatPercentage(count, total)})`
                : `${count}`;

            item.append(label, value);
            container.append(item);
        });
    }

    function renderResults(result) {
        byId("incidents-empty-state").classList.add("hidden");
        byId("incidents-results").classList.remove("hidden");

        byId("incidents-total").textContent = result.total_records;
        byId("incidents-valid").textContent = result.valid_count;
        byId("incidents-invalid").textContent = result.invalid_count;

        const warning = byId("incidents-invalid-warning");
        if (result.invalid_count > 0) {
            warning.textContent = `Se detectaron ${result.invalid_count} registro(s) inválido(s). Fueron excluidos del análisis y se detallan a continuación.`;
            warning.classList.remove("hidden");
        } else {
            warning.classList.add("hidden");
        }

        renderBreakdownList(
            byId("incidents-invalid-breakdown"),
            Object.entries(result.invalid_breakdown),
            INVALID_RULE_LABELS,
            0
        );

        renderBreakdownList(
            byId("incidents-category-breakdown"),
            Object.entries(result.category_counts),
            CATEGORY_LABELS,
            result.valid_count
        );

        renderBreakdownList(
            byId("incidents-status-breakdown"),
            Object.entries(result.status_counts),
            STATUS_LABELS,
            result.valid_count
        );

        byId("incidents-satisfaction-average").textContent =
            result.satisfaction_average.toFixed(2);
        byId(
            "incidents-satisfaction-scored"
        ).textContent = `${result.scored_closed_count} de ${result.closed_count}`;

        renderBreakdownList(
            byId("incidents-satisfaction-breakdown"),
            Object.entries(result.satisfaction_counts),
            SATISFACTION_LABELS,
            result.scored_closed_count
        );

        byId("incidents-export-button").disabled = false;
    }

    function setStatus(message, tone) {
        const statusEl = byId("incidents-status");
        statusEl.textContent = message;
        statusEl.classList.remove("hidden", "text-red-700", "text-stone-600");
        statusEl.classList.add(tone === "error" ? "text-red-700" : "text-stone-600");
    }

    function clearStatus() {
        const statusEl = byId("incidents-status");
        statusEl.textContent = "";
        statusEl.classList.add("hidden");
    }

    async function handleAnalyzeSubmit(event) {
        event.preventDefault();

        const fileInput = byId("incidents-file-input");
        const file = fileInput.files[0];

        if (!file) {
            setStatus("Selecciona un archivo CSV antes de analizarlo.", "error");
            return;
        }

        const submitButton = byId("incidents-analyze-button");
        submitButton.disabled = true;
        setStatus("Analizando archivo...", "info");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(ANALYZE_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                throw new Error(
                    (errorBody && errorBody.detail) ||
                        `Error ${response.status} al analizar el archivo.`
                );
            }

            const result = await response.json();
            renderResults(result);
            clearStatus();
        } catch (error) {
            setStatus(
                error.message ||
                    "No fue posible conectar con el servicio de análisis.",
                "error"
            );
        } finally {
            submitButton.disabled = false;
        }
    }

    function handleExportClick() {
        window.location.href = EXPORT_URL;
    }

    function init() {
        const form = byId("incidents-form");
        if (!form) {
            return;
        }

        form.addEventListener("submit", handleAnalyzeSubmit);
        byId("incidents-export-button").addEventListener("click", handleExportClick);
    }

    document.addEventListener("DOMContentLoaded", init);
})();
