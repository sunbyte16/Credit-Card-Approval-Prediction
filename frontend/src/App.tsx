import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import PredictionPage from './pages/PredictionPage';
import ResultPage from './pages/ResultPage';
import ProfilePage from './pages/ProfilePage';
import { CreditAdvisorChat } from './components/CreditAdvisorChat';

function App() {
  return (
    <div className="App bg-slate-950 min-h-screen text-slate-150">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <CreditAdvisorChat />
    </div>
  );
}

export default App;
