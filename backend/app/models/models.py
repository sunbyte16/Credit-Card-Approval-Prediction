from sqlalchemy import Column, Integer, String, Text, Float, DateTime, JSON, Enum as SQLEnum
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class Role(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(SQLEnum(Role), default=Role.USER, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Applicant(Base):
    __tablename__ = "applicants"

    id = Column(Integer, primary_key=True, index=True)
    applicant_id = Column(String(50), unique=True, index=True, nullable=False)
    applicant_details = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    applicant_id = Column(String(50), index=True, nullable=False)
    prediction = Column(Integer, nullable=False)
    confidence_score = Column(Float, nullable=False)
    model_used = Column(String(50), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ModelMetrics(Base):
    __tablename__ = "model_metrics"

    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String(100), nullable=False)
    accuracy = Column(Float, nullable=False)
    precision = Column(Float, nullable=False)
    recall = Column(Float, nullable=False)
    f1_score = Column(Float, nullable=False)
