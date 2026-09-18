"""Authentication routes."""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from models.auth import LoginRequest, TokenResponse
from models.users import UserPublic
from services import auth as auth_service
from services import users as users_service


router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
) -> UserPublic:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired authentication credentials.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        user_id = auth_service.decode_access_token(token)
        user = users_service.get_user(user_id)
    except (
        auth_service.InvalidTokenError,
        users_service.UserNotFoundError,
    ) as exc:
        raise credentials_exception from exc

    if not user.is_active:
        raise credentials_exception

    return UserPublic.model_validate(user)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    try:
        user = auth_service.authenticate_user(
            payload.email,
            payload.password,
        )
    except auth_service.InvalidCredentialsError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    token = auth_service.create_access_token(user.id)

    return TokenResponse(
        access_token=token,
    )


@router.get("/me", response_model=UserPublic)
def read_current_user(
    current_user: UserPublic = Depends(get_current_user),
) -> UserPublic:
    return current_user