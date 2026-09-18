"""HTTP transport layer for the supplier directory."""

from fastapi import APIRouter, Depends, HTTPException, Query, status

from models.suppliers import (
    Supplier,
    SupplierCategory,
    SupplierCountry,
    SupplierCreate,
    SupplierRateUpdate,
    SupplierStatusUpdate,
)
from routes.auth import get_current_user
from services import suppliers as service


router = APIRouter(
    prefix="/suppliers",
    tags=["suppliers"],
    dependencies=[Depends(get_current_user)],
)


def _not_found(supplier_id: str) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Supplier {supplier_id} was not found.",
    )


@router.post(
    "",
    response_model=Supplier,
    status_code=status.HTTP_201_CREATED,
)
def create_supplier(payload: SupplierCreate) -> Supplier:
    return service.create_supplier(payload)


@router.get("", response_model=list[Supplier])
def list_suppliers(
    country: SupplierCountry | None = None,
    category: SupplierCategory | None = Query(default=None),
) -> list[Supplier]:
    return service.list_suppliers(
        country=country,
        category=category,
    )


@router.get("/{supplier_id}", response_model=Supplier)
def get_supplier(supplier_id: str) -> Supplier:
    try:
        return service.get_supplier(supplier_id)
    except service.SupplierNotFoundError as exc:
        raise _not_found(supplier_id) from exc


@router.patch("/{supplier_id}/rate", response_model=Supplier)
def update_supplier_rate(
    supplier_id: str,
    payload: SupplierRateUpdate,
) -> Supplier:
    try:
        return service.update_supplier_rate(
            supplier_id,
            payload.rate_per_unit,
        )
    except service.SupplierNotFoundError as exc:
        raise _not_found(supplier_id) from exc


@router.patch("/{supplier_id}/status", response_model=Supplier)
def update_supplier_status(
    supplier_id: str,
    payload: SupplierStatusUpdate,
) -> Supplier:
    try:
        return service.update_supplier_status(
            supplier_id,
            payload.status,
        )
    except service.SupplierNotFoundError as exc:
        raise _not_found(supplier_id) from exc


@router.delete(
    "/{supplier_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_supplier(supplier_id: str) -> None:
    try:
        service.delete_supplier(supplier_id)
    except service.SupplierNotFoundError as exc:
        raise _not_found(supplier_id) from exc