"""Pydantic schemas for authentication users."""
from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserRole(str, Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    USER = "user"


class UserCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    email: EmailStr
    password: str = Field(min_length=8)
    role: UserRole = UserRole.USER

    name: str | None = None
    phone: str | None = None
    address: str | None = None


class User(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    email: EmailStr
    hashed_password: str
    is_active: bool = True
    role: UserRole
    created_at: datetime


class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: EmailStr
    is_active: bool
    role: UserRole
    created_at: datetime


class UserUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    email: EmailStr | None = None
    password: str | None = Field(default=None, min_length=8)
    role: UserRole | None = None
    is_active: bool | None = None