export type SupplierCountry = "Colombia" | "USA";

export type SupplierCurrency = "COP" | "USD";

export type SupplierStatus = "active" | "suspended";

export type SupplierCategory =
  | "carne"
  | "verduras_y_hortalizas"
  | "salsas_y_condimentos"
  | "bebidas"
  | "packaging"
  | "productos_limpieza"
  | "lacteos"
  | "carbon_y_combustible";

export type Supplier = {
  id: string;
  name: string;
  country: SupplierCountry;
  categories: SupplierCategory[];
  rate_per_unit: number;
  currency: SupplierCurrency;
  updated_at: string;
  status: SupplierStatus;
  contact_email?: string | null;
  notes?: string | null;
};

export type CreateSupplierPayload = {
  name: string;
  country: SupplierCountry;
  categories: SupplierCategory[];
  rate_per_unit: number;
  currency: SupplierCurrency;
  status: SupplierStatus;
  contact_email?: string | null;
  notes?: string | null;
};

export type UpdateSupplierRatePayload = {
  rate_per_unit: number;
};

export type UpdateSupplierStatusPayload = {
  status: SupplierStatus;
};