"""Business operations for user profiles."""
from models.profiles import Profile, ProfileUpdate
from repositories import profiles as repository


class ProfileNotFoundError(LookupError):
    """Raised when a profile does not exist."""


def get_profile_by_user_id(user_id: str) -> Profile:
    record = repository.get_profile_by_user_id(user_id)

    if record is None:
        raise ProfileNotFoundError(
            f"Profile for user {user_id} was not found."
        )

    return Profile.model_validate(record)


def update_profile_by_user_id(
    user_id: str,
    payload: ProfileUpdate,
) -> Profile:
    existing = repository.get_profile_by_user_id(user_id)

    if existing is None:
        raise ProfileNotFoundError(
            f"Profile for user {user_id} was not found."
        )

    fields = payload.model_dump(exclude_none=True)

    updated = repository.update_profile(
        existing["id"],
        fields,
    )

    return Profile.model_validate(updated)