# 🤝 Contributing to Credit Card Approval Prediction System

First off, thank you for considering contributing to the **Credit Card Approval Prediction System**! It's people like you who make open-source software such an incredible place to learn, inspire, and create.

All kinds of contributions are welcome: bug fixes, feature additions, documentation improvements, architectural proposals, and UI enhancements!

---

## 📑 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Code Contributions](#code-contributions)
- [Local Development Setup](#-local-development-setup)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (FastAPI & ML)](#backend-setup-fastapi--ml)
  - [Frontend Setup (React & TypeScript)](#frontend-setup-react--typescript)
- [Git Workflow & Branching Strategy](#-git-workflow--branching-strategy)
- [Commit Message Guidelines](#-commit-message-guidelines)
- [Code Style & Best Practices](#-code-style--best-practices)
- [Pull Request Checklist](#-pull-request-checklist)
- [Project Maintainer](#-project-maintainer)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainer.

---

## 💡 How Can I Contribute?

### Reporting Bugs

If you find a bug in the source code or an issue with the prediction pipeline:
1. Ensure the bug has not already been reported by searching [GitHub Issues](https://github.com/sunbyte16/Credit-Card-Approval-Prediction/issues).
2. If unable to find an open issue addressing the problem, open a new one.
3. Be sure to include:
   - A clear and descriptive title.
   - Steps to reproduce the issue.
   - Specific input data or API payloads triggering the error.
   - Observed behavior vs. expected behavior.
   - Screenshots, terminal logs, or stack traces if available.

### Suggesting Features

Feature suggestions are welcome! To propose a new enhancement:
1. Check if the enhancement has already been requested.
2. Open a feature request issue outlining:
   - The problem your idea solves.
   - A detailed description of the proposed solution.
   - Any alternatives considered.
   - Architectural or UI mockups if applicable.

### Code Contributions

1. Fork the repository and clone your fork locally.
2. Create a new branch with a descriptive name (`feature/my-feature` or `bugfix/issue-description`).
3. Make your modifications, write tests if applicable, and verify everything works.
4. Push your branch to GitHub and submit a Pull Request.

---

## 🛠️ Local Development Setup

### Prerequisites

- **Python 3.8+** (recommended 3.10+)
- **Node.js 16+** (recommended 18+ or 20+)
- **npm** or **yarn**
- **Git**

### Backend Setup (FastAPI & ML)

```bash
# 1. Clone repository
git clone https://github.com/sunbyte16/Credit-Card-Approval-Prediction.git
cd Credit-Card-Approval-Prediction

# 2. Navigate to backend directory
cd backend

# 3. Create virtual environment
python -m venv venv

# Windows
.\venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run the FastAPI development server
uvicorn main:app --reload --port 8000
```
Backend will be live at `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.

### Frontend Setup (React & TypeScript)

```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install npm dependencies
npm install

# Start the React development server
npm start
```
Frontend will be live at `http://localhost:3000`.

---

## 🌿 Git Workflow & Branching Strategy

We follow a structured branch naming convention:

| Branch Type | Format | Example |
|-------------|--------|---------|
| Feature | `feature/<short-description>` | `feature/shap-explainability` |
| Bug Fix | `bugfix/<issue-number>-<description>` | `bugfix/dti-calculation-overflow` |
| Documentation | `docs/<short-description>` | `docs/update-architecture-diagrams` |
| Refactoring | `refactor/<short-description>` | `refactor/prediction-service-modularization` |
| Performance | `perf/<short-description>` | `perf/model-inference-caching` |

---

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Common Types:
- `feat`: A new feature or capability.
- `fix`: A bug fix.
- `docs`: Documentation-only changes.
- `style`: Changes that do not affect the meaning of the code (formatting, white-space).
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: Code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to build process, tooling, or auxiliary libraries.

**Example**:
```bash
git commit -m "feat(ml): integrate XGBoost hyperparameter tuning"
```

---

## 🎨 Code Style & Best Practices

### Python (Backend & ML)
- Follow **PEP 8** style guidelines.
- Use explicit type annotations for function signatures.
- Write docstrings for all core modules, functions, and endpoints.
- Ensure all Pydantic schemas validate types strictly.

### TypeScript / React (Frontend)
- Adhere to functional React components with standard hooks (`useState`, `useEffect`, `useContext`, `useMemo`).
- Maintain TypeScript strict typing (avoid `any` where possible).
- Utilize Tailwind CSS utility classes and ensure responsive designs across breakpoints.
- Clean up side effects and handle loading/error states gracefully.

---

## ✅ Pull Request Checklist

Before submitting your PR, please verify:

- [ ] Code compiles and runs cleanly without unhandled runtime exceptions.
- [ ] New features or fixes have been tested locally.
- [ ] Code follows project formatting and conventions.
- [ ] Documentation has been updated (e.g., `README.md` if endpoints or configs changed).
- [ ] PR title follows Conventional Commits format.
- [ ] Branch is rebased against the latest `main` branch.

---

## 👨‍💻 Project Maintainer

Crafted with dedication by **𝕊𝕦𝕟𝕚𝕝 𝕊𝕙𝕒𝕣𝕞𝕒**:
- 🌐 **Portfolio**: [lively-dodol-cc397c.netlify.app](https://lively-dodol-cc397c.netlify.app)
- 🐙 **GitHub**: [@sunbyte16](https://github.com/sunbyte16)
- 💼 **LinkedIn**: [Sunil Kumar](https://www.linkedin.com/in/sunil-kumar-bb88bb31a/)

Thank you for helping make Credit Card Approval Prediction better for everyone! 🚀
