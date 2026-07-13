from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import get_settings
import os

settings = get_settings()

# Ensure data directory exists
data_dir = os.path.join(os.path.dirname(__file__), '../../../data')
os.makedirs(data_dir, exist_ok=True)

# Fix database path to be absolute
db_path = os.path.join(data_dir, 'credit_card.db')
database_url = f"sqlite:///{db_path}"

engine = create_engine(
    database_url,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
