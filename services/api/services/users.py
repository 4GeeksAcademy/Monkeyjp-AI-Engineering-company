"""Business operations for authentication users."""
from datetime import datetime, timezone

from passlib.hash import bcrypt

from models.profiles import ProfileCreate
from models.users import User, UserCreate, UserPublic, UserUpdate
from repositories import profiles as profiles_repository
from repositories import users as repository


class UserNotFoundError(LookupError):
    """Raised when a user id does not exist."""


class UserEmailConflictError(ValueError):
    """Raised when a user email already exists."""


def _now() -> datetime:
    return datetime.now(timezone.utc)


def list_users() -> list[UserPublic]:
    return [
        UserPublic.model_validate(record)
        for record in repository.list_users()
    ]


def get_user(user_id: str) -> User:
    record = repository.get_user(user_id)

    if record is None:
        raise UserNotFoundError(f"User {user_id} was not found.")

    return User.model_validate(record)


def get_user_by_email(email: str) -> User | None:
    record = repository.get_user_by_email(email)

    if record is None:
        return None

    return User.model_validate(record)


def create_user(payload: UserCreate) -> UserPublic:
    if repository.get_user_by_email(payload.email) is not None:
        raise UserEmailConflictError(
            f"User with email {payload.email} already exists."
        )

    user_record = {
        "email": payload.email,
        "hashed_password": bcrypt.hash(payload.password),
        "is_active": True,
        "role": payload.role.value,
        "created_at": _now().isoformat(),
    }

    created_user = repository.create_user(user_record)

    profile_payload = ProfileCreate(
        user_id=created_user["id"],
        name=payload.name,
        phone=payload.phone,
        address=payload.address,
    )

    try:
        profiles_repository.create_profile(
            profile_payload.model_dump()
        )
    except Exception:
        repository.delete_user(created_user["id"])
        raise

    return UserPublic.model_validate(created_user)


def update_user(
    user_id: str,
    payload: UserUpdate,
) -> UserPublic:
    existing_user = repository.get_user(user_id)

    if existing_user is None:
        raise UserNotFoundError(f"User {user_id} was not found.")

    fields = payload.model_dump(exclude_none=True)

    if "password" in fields:
        fields["hashed_password"] = bcrypt.hash(fields.pop("password"))

    if "email" in fields:
        user_with_email = repository.get_user_by_email(fields["email"])

        if (
            user_with_email is not None
            and user_with_email["id"] != user_id
        ):
            raise UserEmailConflictError(
                f"User with email {fields['email']} already exists."
            )

    if "role" in fields:
        fields["role"] = fields["role"].value

    updated = repository.update_user(user_id, fields)

    return UserPublic.model_validate(updated)


def delete_user(user_id: str) -> None:
    existing_user = repository.get_user(user_id)

    if existing_user is None:
        raise UserNotFoundError(f"User {user_id} was not found.")

    profile = profiles_repository.get_profile_by_user_id(user_id)

    if profile is not None:
        profiles_repository.delete_profile(profile["id"])

    repository.delete_user(user_id)