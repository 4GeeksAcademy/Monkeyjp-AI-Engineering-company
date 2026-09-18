"""Authentication and JWT helpers."""
import os
from datetime import datetime, timedelta, timezone
from typing import Any

from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.hash import bcrypt

from models.users import User
from services import users

load_dotenv()


SECRET_KEY = os.getenv("AUTH_SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("AUTH_SECRET_KEY environment variable is required.")

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
)


class InvalidCredentialsError(ValueError):
    """Raised when email/password authentication fails."""


class InvalidTokenError(ValueError):
    """Raised when a JWT cannot be validated."""


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.verify(plain_password, hashed_password)


def authenticate_user(email: str, password: str) -> User:
    user = users.get_user_by_email(email)

    if user is None:
        raise InvalidCredentialsError("Invalid email or password.")

    if not user.is_active:
        raise InvalidCredentialsError("Invalid email or password.")

    if not verify_password(password, user.hashed_password):
        raise InvalidCredentialsError("Invalid email or password.")

    return user


def create_access_token(
    user_id: str,
    expires_minutes: int | None = None,
) -> str:
    minutes = (
        expires_minutes
        if expires_minutes is not None
        else ACCESS_TOKEN_EXPIRE_MINUTES
    )

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=minutes
    )

    payload: dict[str, Any] = {
        "sub": user_id,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def decode_access_token(token: str) -> str:
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
    except JWTError as exc:
        raise InvalidTokenError("Invalid or expired token.") from exc

    user_id = payload.get("sub")

    if not user_id:
        raise InvalidTokenError("Token does not contain a user id.")

    return str(user_id)