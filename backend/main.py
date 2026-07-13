from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.core.database import engine, Base
# Import models to ensure tables are created
from app.models import User, Applicant, Prediction, ModelMetrics
from app.api import auth_router, applicants_router, predictions_router, dashboard_router

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth_router, prefix="/api")
app.include_router(applicants_router, prefix="/api")
app.include_router(predictions_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Credit Card Approval Prediction System API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
