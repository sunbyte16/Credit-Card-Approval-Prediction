from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, Dict, Any
from enum import Enum


class Role(str, Enum):
    ADMIN = "admin"
    USER = "user"


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: int
    role: Role
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class ApplicantBase(BaseModel):
    applicant_id: str
    applicant_details: Dict[str, Any]


class ApplicantCreate(ApplicantBase):
    pass


class ApplicantUpdate(BaseModel):
    applicant_details: Optional[Dict[str, Any]] = None


class ApplicantResponse(ApplicantBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class PredictionRequest(BaseModel):
    applicant_details: Dict[str, Any]


class PredictionResponse(BaseModel):
    applicant_id: str
    prediction: int
    confidence_score: float
    model_used: str
    created_at: datetime


class ModelMetricsResponse(BaseModel):
    id: int
    model_name: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float

    class Config:
        from_attributes = True
