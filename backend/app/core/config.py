from pydantic_settings import BaseSettings
from functools import lru_cache
import os


class Settings(BaseSettings):
    APP_NAME: str = "Credit Card Approval Prediction System"
    DEBUG: bool = True
    DATABASE_URL: str = "sqlite:///../data/credit_card.db"
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = os.path.join(os.path.dirname(__file__), '../../.env')


@lru_cache()
def get_settings():
    return Settings()
