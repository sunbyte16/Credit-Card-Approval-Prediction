# Credit Card Approval Prediction System

A comprehensive credit card approval prediction system using machine learning, built with FastAPI, React, and SQLite.

## Phase 1 - Project Setup Complete!

### Folder Structure
```
Credit Card Approval Prediction System Using Machine Learning/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   └── __init__.py
│   ├── alembic/
│   │   └── versions/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   └── tsconfig.json
├── data/
├── models/
├── notebooks/
├── logs/
├── .gitignore
└── README.md
```

### Installation Guide

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # macOS/Linux
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend:
   ```bash
   uvicorn main:app --reload
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm start
   ```

### Dependencies

#### Backend (requirements.txt)
- FastAPI - Web framework
- Uvicorn - ASGI server
- SQLAlchemy - ORM
- Alembic - Database migrations
- Pydantic - Data validation
- Pandas - Data analysis
- NumPy - Numerical computations
- Scikit-learn - Machine learning
- XGBoost - Gradient boosting
- Matplotlib & Seaborn - Visualization

#### Frontend (package.json)
- React 18
- React Router DOM
- Axios
- TypeScript
