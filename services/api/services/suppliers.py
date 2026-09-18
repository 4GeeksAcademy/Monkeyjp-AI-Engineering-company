"""Business operations for the supplier directory."""
from datetime import datetime, timezone

from models.suppliers import Supplier, SupplierCategory, SupplierCountry, SupplierCreate
from repositories import suppliers as repository


class SupplierNotFoundError(LookupError):
    """Raised when a supplier id does not exist."""


SUPPLIERS_SEED = [
    {
        "name": "Carnes del Valle S.A.S.",
        "country": "Colombia",
        "categories": ["carne"],
        "rate_per_unit": 28500.0,
        "currency": "COP",
        "status": "active",
        "contact_email": "ventas@carnesdelvalle.co",
        "notes": "Primary beef and pork supplier for Medellín. Delivery Tuesday and Friday.",
    },
    {
        "name": "Frigorífico Antioqueño",
        "country": "Colombia",
        "categories": ["carne"],
        "rate_per_unit": 27900.0,
        "currency": "COP",
        "status": "active",
        "contact_email": "pedidos@frigorificoa.co",
        "notes": "Secondary supplier. Used when Carnes del Valle is out of stock.",
    },
    {
        "name": "Verduras La Cosecha",
        "country": "Colombia",
        "categories": ["verduras_y_hortalizas"],
        "rate_per_unit": 3200.0,
        "currency": "COP",
        "status": "active",
        "contact_email": "lacosecha@gmail.com",
        "notes": "Medellín wholesale market. Daily delivery before 7am.",
    },
    {
        "name": "Condimentos El Sabor",
        "country": "Colombia",
        "categories": ["salsas_y_condimentos"],
        "rate_per_unit": 12400.0,
        "currency": "COP",
        "status": "active",
        "contact_email": "info@elsabor.co",
    },
    {
        "name": "Distribuidora RefriCol",
        "country": "Colombia",
        "categories": ["bebidas", "lacteos"],
        "rate_per_unit": 4100.0,
        "currency": "COP",
        "status": "active",
        "contact_email": "refricol.pedidos@gmail.com",
    },
    {
        "name": "Empaques y Más",
        "country": "Colombia",
        "categories": ["packaging"],
        "rate_per_unit": 890.0,
        "currency": "COP",
        "status": "active",
        "contact_email": "ventas@empaquesymas.co",
        "notes": "Supplies boxes, bags, and napkins for all Colombia locations.",
    },
    {
        "name": "Limpiahogar Profesional",
        "country": "Colombia",
        "categories": ["productos_limpieza"],
        "rate_per_unit": 7600.0,
        "currency": "COP",
        "status": "suspended",
        "contact_email": "limpiahogar@promail.co",
        "notes": "Suspended for delivery non-compliance. Under review by Lucía.",
    },
    {
        "name": "CarboCo",
        "country": "Colombia",
        "categories": ["carbon_y_combustible"],
        "rate_per_unit": 45000.0,
        "currency": "COP",
        "status": "active",
        "contact_email": "pedidos@carboco.co",
        "notes": "Only approved charcoal supplier for the grills. Annual contract.",
    },
    {
        "name": "Miami Meat Distributors LLC",
        "country": "USA",
        "categories": ["carne"],
        "rate_per_unit": 6.80,
        "currency": "USD",
        "status": "active",
        "contact_email": "orders@miamimeat.com",
        "notes": "Primary meat supplier for Florida locations.",
    },
    {
        "name": "Sunshine Produce FL",
        "country": "USA",
        "categories": ["verduras_y_hortalizas"],
        "rate_per_unit": 2.15,
        "currency": "USD",
        "status": "active",
        "contact_email": "sales@sunshineproduce.com",
    },
    {
        "name": "Latin Flavors Inc.",
        "country": "USA",
        "categories": ["salsas_y_condimentos", "bebidas"],
        "rate_per_unit": 4.50,
        "currency": "USD",
        "status": "active",
        "contact_email": "orders@latinflavors.com",
        "notes": "Imports Colombian sauces for the Florida market.",
    },
    {
        "name": "PackRight USA",
        "country": "USA",
        "categories": ["packaging"],
        "rate_per_unit": 0.35,
        "currency": "USD",
        "status": "active",
        "contact_email": "info@packright.us",
    },
    {
        "name": "CleanPro Florida",
        "country": "USA",
        "categories": ["productos_limpieza"],
        "rate_per_unit": 12.90,
        "currency": "USD",
        "status": "active",
        "contact_email": "orders@cleanproflorida.com",
    },
    {
        "name": "GrillFuel Supply Co.",
        "country": "USA",
        "categories": ["carbon_y_combustible"],
        "rate_per_unit": 38.50,
        "currency": "USD",
        "status": "active",
        "contact_email": "supply@grillfuel.com",
        "notes": "Charcoal supplier for Florida. Price subject to quarterly review.",
    },
    {
        "name": "Bebidas Andinas",
        "country": "Colombia",
        "categories": ["bebidas"],
        "rate_per_unit": 3800.0,
        "currency": "COP",
        "status": "suspended",
        "contact_email": "ventas@bebidasandinas.co",
        "notes": "Suspended. Price above market after last renegotiation.",
    },
]


def _now() -> datetime:
    return datetime.now(timezone.utc)


def list_suppliers(
    country: SupplierCountry | None = None,
    category: SupplierCategory | None = None,
) -> list[Supplier]:
    suppliers = [Supplier.model_validate(record) for record in repository.list_suppliers()]

    if country is not None:
        suppliers = [supplier for supplier in suppliers if supplier.country == country]
    if category is not None:
        suppliers = [supplier for supplier in suppliers if category in supplier.categories]

    return suppliers


def get_supplier(supplier_id: str) -> Supplier:
    record = repository.get_supplier(supplier_id)
    if record is None:
        raise SupplierNotFoundError(f"Supplier {supplier_id} was not found.")
    return Supplier.model_validate(record)


def create_supplier(payload: SupplierCreate) -> Supplier:
    record = payload.model_dump()
    record["updated_at"] = _now().isoformat()

    created = repository.create_supplier(record)

    return Supplier.model_validate(created)


def update_supplier_rate(supplier_id: str, rate_per_unit: float) -> Supplier:
    if repository.get_supplier(supplier_id) is None:
        raise SupplierNotFoundError(f"Supplier {supplier_id} was not found.")

    record = repository.update_supplier(
        supplier_id,
        {
            "rate_per_unit": rate_per_unit,
            "updated_at": _now().isoformat(),
        },
    )
    return Supplier.model_validate(record)


def update_supplier_status(supplier_id: str, status: str) -> Supplier:
    if repository.get_supplier(supplier_id) is None:
        raise SupplierNotFoundError(f"Supplier {supplier_id} was not found.")

    record = repository.update_supplier(supplier_id, {"status": status})
    return Supplier.model_validate(record)


def delete_supplier(supplier_id: str) -> None:
    if not repository.delete_supplier(supplier_id):
        raise SupplierNotFoundError(f"Supplier {supplier_id} was not found.")


def seed_suppliers() -> int:
    inserted = 0
    for supplier_data in SUPPLIERS_SEED:
        payload = SupplierCreate.model_validate(supplier_data)
        if repository.find_supplier_by_name_country(payload.name, payload.country) is None:
            create_supplier(payload)
            inserted += 1
    return inserted