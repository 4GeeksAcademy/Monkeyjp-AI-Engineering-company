"""Pydantic schemas for user profiles."""
from pydantic import BaseModel, ConfigDict


class ProfileBase(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str | None = None
    phone: str | None = None
    address: str | None = None


class ProfileCreate(ProfileBase):
    user_id: str


class Profile(ProfileBase):
    id: str
    user_id: str


class ProfileUpdate(ProfileBase):
    pass