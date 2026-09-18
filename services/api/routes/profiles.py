"""Current-user profile routes."""
from fastapi import APIRouter, Depends, HTTPException, status

from models.profiles import Profile, ProfileUpdate
from models.users import UserPublic
from routes.auth import get_current_user
from services import profiles as service


router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.get(
    "/me",
    response_model=Profile,
)
def get_my_profile(
    current_user: UserPublic = Depends(get_current_user),
) -> Profile:
    try:
        return service.get_profile_by_user_id(current_user.id)
    except service.ProfileNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


@router.patch(
    "/me",
    response_model=Profile,
)
def update_my_profile(
    payload: ProfileUpdate,
    current_user: UserPublic = Depends(get_current_user),
) -> Profile:
    try:
        return service.update_profile_by_user_id(
            current_user.id,
            payload,
        )
    except service.ProfileNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc