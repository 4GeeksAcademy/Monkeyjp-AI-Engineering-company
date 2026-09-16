import type { IncidentAnalysisResult } from "@/types/incidents";

function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiUrl;
}

export async function analyzeIncidents(
  file: File
): Promise<IncidentAnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${getApiUrl()}/api/incidents/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.detail ??
        `Error ${response.status} al analizar el archivo.`
    );
  }

  return response.json();
}

export function getIncidentExportUrl(): string {
  return `${getApiUrl()}/api/incidents/results/export`;
}