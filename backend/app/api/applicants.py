from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core import get_db, get_current_active_user
from app.models import User, Applicant
from app.schemas import ApplicantCreate, ApplicantUpdate, ApplicantResponse

router = APIRouter(prefix="/applicants", tags=["applicants"])


@router.get("/", response_model=List[ApplicantResponse])
def get_applicants(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    applicants = db.query(Applicant).offset(skip).limit(limit).all()
    return applicants


@router.get("/{applicant_id}", response_model=ApplicantResponse)
def get_applicant(applicant_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id).first()
    if applicant is None:
        raise HTTPException(status_code=404, detail="Applicant not found")
    return applicant


@router.post("/", response_model=ApplicantResponse, status_code=status.HTTP_201_CREATED)
def create_applicant(applicant: ApplicantCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    db_applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant.applicant_id).first()
    if db_applicant:
        raise HTTPException(status_code=400, detail="Applicant already exists")
    db_applicant = Applicant(**applicant.model_dump())
    db.add(db_applicant)
    db.commit()
    db.refresh(db_applicant)
    return db_applicant


@router.put("/{applicant_id}", response_model=ApplicantResponse)
def update_applicant(applicant_id: str, applicant: ApplicantUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    db_applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id).first()
    if db_applicant is None:
        raise HTTPException(status_code=404, detail="Applicant not found")
    update_data = applicant.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_applicant, key, value)
    db.commit()
    db.refresh(db_applicant)
    return db_applicant


@router.delete("/{applicant_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_applicant(applicant_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    db_applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id).first()
    if db_applicant is None:
        raise HTTPException(status_code=404, detail="Applicant not found")
    db.delete(db_applicant)
    db.commit()
    return None
