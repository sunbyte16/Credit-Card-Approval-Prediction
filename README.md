<div align="center">
  <h1>💳 Credit Card Approval Prediction System</h1>
  <p>A professional, production-ready credit card approval prediction system using machine learning, built with FastAPI, React + TypeScript, and SQLite</p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-learn">
  <img src="https://img.shields.io/badge/XGBoost-FF6600?style=for-the-badge&logo=xgboost&logoColor=white" alt="XGBoost">
</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Training the Model](#training-the-model)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Created By](#-created-by)
- [License](#-license)
- [Connect With Me](#-connect-with-me)

---

## 🚀 Project Overview

This system helps predict credit card approval decisions using machine learning algorithms. It includes:

- ✨ User authentication (Register/Login)
- 📊 Interactive credit card approval prediction form
- 📈 Dashboard with statistics and analytics
- 🤖 Comprehensive ML model training pipeline

---

## ✨ Features

### Frontend
- 🎨 Professional, modern UI with Tailwind CSS
- 🎭 Smooth animations powered by Framer Motion
- 📱 Responsive design for all devices
- 🧭 Clean, intuitive navigation
- 📊 Real-time prediction results with confidence scores

### Backend
- ⚡ RESTful API with FastAPI
- 🔐 JWT-based authentication
- 👥 Role-based access control
- 🗄️ Database ORM with SQLAlchemy
- 📚 Comprehensive API documentation

### Machine Learning
- 🤖 Multiple ML models (Logistic Regression, Decision Tree, Random Forest, XGBoost)
- 🏆 Model comparison and auto-selection
- 🔧 Preprocessing pipeline
- 📥 Data loading and validation

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.115.0 | Web framework |
| Uvicorn | 0.32.0 | ASGI server |
| SQLAlchemy | 2.0.35 | ORM |
| Alembic | 1.13.3 | Database migrations |
| Pydantic | 2.9.2 | Data validation |
| Pandas | 2.2.3 | Data analysis |
| NumPy | 2.1.3 | Numerical computations |
| Scikit-learn | 1.5.2 | Machine learning |
| XGBoost | 2.1.2 | Gradient boosting |
| Matplotlib | 3.9.2 | Visualization |
| Seaborn | 0.13.2 | Visualization |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI framework |
| TypeScript | 4.9.5 | Type safety |
| React Router | 6.26.2 | Routing |
| Axios | 1.7.7 | HTTP client |
| Tailwind CSS | 3.x | Styling |
| Framer Motion | Latest | Animations |
| Lucide React | Latest | Icons |

---

## 📐 Architecture

```
Credit Card Approval Prediction System/
├── backend/
│   ├── app/
│   │   ├── api/              # API endpoints
│   │   ├── core/             # Configuration & DB
│   │   ├── models/           # Database models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── data_loader.py    # Data loading
│   │   ├── preprocessing.py  # Data preprocessing
│   │   └── training.py       # Model training
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # React contexts
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   └── App.tsx
│   └── package.json
└── data/ & models/           # Data & model storage
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:
- ![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square&logo=python&logoColor=white) Python 3.8 or higher
- ![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat-square&logo=nodedotjs&logoColor=white) Node.js 16 or higher
- ![npm](https://img.shields.io/badge/npm-8+-CB3837?style=flat-square&logo=npm&logoColor=white) npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment (optional but recommended):
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
uvicorn main:app --reload
```

The backend will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at http://localhost:3000

### Training the Model

To train the ML models:

1. Navigate to the backend directory
2. Run the training script:
```bash
cd backend/app
python training.py
```

This will:
- 📥 Load the credit card dataset
- 🔧 Preprocess the data
- 🤖 Train multiple ML models
- 📊 Compare model performance
- 💾 Save the best model to the `models/` directory

---

## 📖 Usage

1. 🌐 Open your browser and go to http://localhost:3000
2. 📝 Register a new account or login if you already have one
3. 📊 Use the dashboard to view statistics
4. 📈 Navigate to the prediction page to get a credit card approval prediction
5. ✔️ View your prediction results with confidence scores

---

## 📚 API Documentation

Once the backend is running, visit http://localhost:8000/docs for interactive API documentation.

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | `POST` | Register a new user |
| `/api/auth/login` | `POST` | User login |
| `/api/predictions/predict` | `POST` | Get credit card approval prediction |
| `/api/dashboard/stats` | `GET` | Get dashboard statistics |

---

## 📁 Project Structure

### Backend
- `api/` - Authentication, applicants, predictions, and dashboard endpoints
- `core/` - Database configuration, auth utilities, and settings
- `models/` - SQLAlchemy database models
- `schemas/` - Pydantic validation schemas
- `data_loader.py` - Load and validate datasets
- `preprocessing.py` - Data preprocessing pipeline
- `training.py` - Model training and evaluation

### Frontend
- `components/` - Reusable React components
- `context/` - Authentication context
- `pages/` - Landing, login, register, dashboard, prediction, result, profile
- `services/` - API client configuration

---

## �‍💻 Created By

<div align="center">
  <h2>Created By 𝕊𝕦𝕟𝕚𝕝 𝕊𝕙𝕒𝕣𝕞𝕒 ❤️</h2>
</div>

---

## 🔗 Connect With Me

<div align="center">
  <a href="https://github.com/sunbyte16" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-sunbyte16-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/sunil-kumar-bb88bb31a/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Sunil%20Kumar-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://lively-dodol-cc397c.netlify.app" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-Live%20Demo-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio">
  </a>
</div>

---

## 📝 License

MIT License - see LICENSE for details.

---

<div align="center">
  <p>Made with ❤️ by 𝕊𝕦𝕟𝕚𝕝 𝕊𝕙𝕒𝕣𝕞𝕒</p>
</div>
