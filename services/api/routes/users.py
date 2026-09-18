"""User management routes."""
from fastapi import APIRouter, Depends, HTTPException, status

from models.users import UserCreate, UserPublic, UserUpdate
from routes.auth import get_current_user
from services import users as service


router = APIRouter(prefix="/users", tags=["users"])


@router.post(
    "",
    response_model=UserPublic,
    status_code=status.HTTP_201_CREATED,
)
def create_user(payload: UserCreate) -> UserPublic:
    try:
        return service.create_user(payload)
    except service.UserEmailConflictError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc


@router.get(
    "",
    response_model=list[UserPublic],
)
def list_users(
    current_user: UserPublic = Depends(get_current_user),
) -> list[UserPublic]:
    return service.list_users()


@router.get(
    "/{user_id}",
    response_model=UserPublic,
)
def get_user(
    user_id: str,
    current_user: UserPublic = Depends(get_current_user),
) -> UserPublic:
    try:
        user = service.get_user(user_id)
        return UserPublic.model_validate(user)
    except service.UserNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


@router.patch(
    "/{user_id}",
    response_model=UserPublic,
)
def update_user(
    user_id: str,
    payload: UserUpdate,
    current_user: UserPublic = Depends(get_current_user),
) -> UserPublic:
    try:
        return service.update_user(user_id, payload)
    except service.UserNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except service.UserEmailConflictError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_user(
    user_id: str,
    current_user: UserPublic = Depends(get_current_user),
) -> None:
    try:
        service.delete_user(user_id)
    except service.UserNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc