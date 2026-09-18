"""Pydantic schemas for the supplier directory."""
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator


SupplierCountry = Literal["Colombia", "USA"]
SupplierCurrency = Literal["COP", "USD"]
SupplierCategory = Literal[
    "carne",
    "verduras_y_hortalizas",
    "salsas_y_condimentos",
    "bebidas",
    "packaging",
    "productos_limpieza",
    "lacteos",
    "carbon_y_combustible",
]
SupplierStatus = Literal["active", "suspended"]


COUNTRY_CURRENCY = {
    "Colombia": "COP",
    "USA": "USD",
}


class SupplierBase(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    country: SupplierCountry
    categories: list[SupplierCategory] = Field(min_length=1)
    rate_per_unit: float = Field(gt=0)
    currency: SupplierCurrency
    status: SupplierStatus
    contact_email: str | None = None
    notes: str | None = None

    @model_validator(mode="after")
    def validate_currency_for_country(self) -> "SupplierBase":
        expected_currency = COUNTRY_CURRENCY[self.country]
        if self.currency != expected_currency:
            raise ValueError(
                f"currency must be {expected_currency} for suppliers in {self.country}"
            )
        return self


class SupplierCreate(SupplierBase):
    pass


class Supplier(SupplierBase):
    id: str
    updated_at: datetime


class SupplierRateUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    rate_per_unit: float = Field(gt=0)


class SupplierStatusUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    status: SupplierStatus