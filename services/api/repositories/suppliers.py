"""TinyDB persistence for the supplier directory."""
from pathlib import Path
from typing import Any

from tinydb import Query, TinyDB


DB_PATH = Path(__file__).resolve().parents[1] / "data" / "suppliers.json"
TABLE_NAME = "suppliers"


def _table():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    return TinyDB(DB_PATH).table(TABLE_NAME)

def _with_id(record) -> dict[str, Any]:
    data = dict(record)
    data["id"] = str(record.doc_id)
    return data

def list_suppliers() -> list[dict[str, Any]]:
    return [_with_id(record) for record in _table().all()]


def get_supplier(supplier_id: str) -> dict[str, Any] | None:
    try:
        doc_id = int(supplier_id)
    except ValueError:
        return None

    record = _table().get(doc_id=doc_id)
    return _with_id(record) if record else None


def find_supplier_by_name_country(name: str, country: str) -> dict[str, Any] | None:
    SupplierQuery = Query()
    record = _table().get(
        (SupplierQuery.name == name) & (SupplierQuery.country == country)
    )
    return dict(record) if record else None


def create_supplier(record: dict[str, Any]) -> dict[str, Any]:
    table = _table()
    doc_id = table.insert(record)

    created = table.get(doc_id=doc_id)
    return _with_id(created)


def update_supplier(
    supplier_id: str,
    fields: dict[str, Any],
) -> dict[str, Any] | None:
    try:
        doc_id = int(supplier_id)
    except ValueError:
        return None

    table = _table()

    if table.get(doc_id=doc_id) is None:
        return None

    table.update(fields, doc_ids=[doc_id])

    updated = table.get(doc_id=doc_id)
    return _with_id(updated)


def delete_supplier(supplier_id: str) -> bool:
    try:
        doc_id = int(supplier_id)
    except ValueError:
        return False

    table = _table()

    if table.get(doc_id=doc_id) is None:
        return False

    table.remove(doc_ids=[doc_id])
    return True