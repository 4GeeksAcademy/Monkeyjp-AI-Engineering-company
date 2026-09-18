import type {
  CreateSupplierPayload,
  Supplier,
  SupplierCategory,
  SupplierCountry,
  UpdateSupplierRatePayload,
  UpdateSupplierStatusPayload,
} from "@/types/suppliers";

function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiUrl;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.detail ??
        `Error ${response.status} al procesar la solicitud.`
    );
  }

  return response.json();
}

export async function getSuppliers(filters?: {
  country?: SupplierCountry;
  category?: SupplierCategory;
}): Promise<Supplier[]> {
  const params = new URLSearchParams();

  if (filters?.country) {
    params.set("country", filters.country);
  }

  if (filters?.category) {
    params.set("category", filters.category);
  }

  const query = params.toString();
  const url = `${getApiUrl()}/suppliers${query ? `?${query}` : ""}`;

  const response = await fetch(url);

  return handleResponse<Supplier[]>(response);
}

export async function createSupplier(
  payload: CreateSupplierPayload
): Promise<Supplier> {
  const response = await fetch(`${getApiUrl()}/suppliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<Supplier>(response);
}

export async function updateSupplierRate(
  supplierId: string,
  payload: UpdateSupplierRatePayload
): Promise<Supplier> {
  const response = await fetch(
    `${getApiUrl()}/suppliers/${supplierId}/rate`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return handleResponse<Supplier>(response);
}

export async function updateSupplierStatus(
  supplierId: string,
  payload: UpdateSupplierStatusPayload
): Promise<Supplier> {
  const response = await fetch(
    `${getApiUrl()}/suppliers/${supplierId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return handleResponse<Supplier>(response);
}