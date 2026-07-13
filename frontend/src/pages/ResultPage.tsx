import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  Home,
  RefreshCw,
  Sliders,
  Printer,
  Sparkles,
  TrendingUp,
  Briefcase,
  DollarSign
} from 'lucide-react';

interface PredictionResult {
  applicant_id: string;
  prediction: number;
  confidence_score: number;
  model_used: string;
  created_at: string;
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, inputData } = (location.state as { prediction?: PredictionResult; inputData?: any }) || {};

  // Setup simulation state, default fallback if inputData is missing
  const initialInputs = {
    credit_score: inputData?.credit_score ? parseInt(inputData.credit_score) : 650,
    income: inputData?.income ? parseInt(inputData.income) : 50000,
    years_employed: inputData?.years_employed ? parseInt(inputData.years_employed) : 2,
    active_loans: inputData?.active_loans ? parseInt(inputData.active_loans) : 5000,
    bankruptcies: inputData?.bankruptcies ? parseInt(inputData.bankruptcies) : 0,
  };

  const [simParams, setSimParams] = useState(initialInputs);

  if (!prediction) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-sm"
        >
          <p className="text-slate-400 mb-6">No prediction data found. Please submit an application form first.</p>
          <button
            onClick={() => navigate('/predict')}
            className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-3 rounded-xl font-semibold cursor-pointer"
          >
            Go to Predictor
          </button>
        </motion.div>
      </div>
    );
  }

  // Simulate approval score locally
  const runLocalSimulation = () => {
    const cs = simParams.credit_score;
    const inc = simParams.income;
    const ye = simParams.years_employed;
    const debt = simParams.active_loans;
    const bk = simParams.bankruptcies;

    const normCs = Math.max(0, Math.min(100, (cs - 300) / 5.5));
    const dti = (debt * 0.12) / Math.max(inc, 1000);
    const dtiScore = dti <= 0.20 ? 100 : dti >= 0.50 ? 0 : 100 - ((dti - 0.20) / 0.30) * 100;
    const empScore = Math.min(100, ye * 12.5);
    const bkPenalty = bk > 0 ? 45 : 0;
    
    const base = (normCs * 0.45 + dtiScore * 0.25 + empScore * 0.20 + 90 * 0.10) - bkPenalty;
    const prob = 1 / (1 + Math.exp(-0.12 * (base - 48)));
    
    return {
      probability: prob,
      approved: prob >= 0.50
    };
  };

  const simResult = runLocalSimulation();
  const initialApproved = prediction.prediction === 1;

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Generate advisor tips
  const getAdvisorTips = (score: number, dti: number, ye: number, bk: number) => {
    const tips = [];
    if (score < 660) {
      tips.push("Your Credit Score is low. Boost it by making on-time payments and maintaining utilization below 30%.");
    }
    if (dti > 0.36) {
      tips.push("Your Debt-to-Income is high. Reduce active outstanding debts before applying again.");
    }
    if (ye < 2) {
      tips.push("lenders prefer at least 2 years of continuous job duration. Try waiting to build tenure.");
    }
    if (bk > 0) {
      tips.push("A bankruptcy flag seriously impacts scoring. Waiting 2+ years since discharge helps rebuild trust.");
    }
    if (tips.length === 0) {
      tips.push("Your financial parameters are in prime standing! You qualify for premium high-limit cards.");
    }
    return tips;
  };

  const calculatedDti = (simParams.active_loans * 0.12) / Math.max(simParams.income, 1000);
  const adviceList = getAdvisorTips(simParams.credit_score, calculatedDti, simParams.years_employed, simParams.bankruptcies);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Printable Area - Hide other elements in Print */}
      <style>
        {`
          @media print {
            body { background: white; color: black; }
            nav, .no-print { display: none !important; }
            .print-only { display: block !important; }
            .card-shadow { box-shadow: none !important; border: 1px solid #ccc !important; }
          }
        `}
      </style>

      {/* Navbar */}
      <nav className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/85 sticky top-0 z-50 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/predict')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-100 font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Apply Again</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 border border-slate-800 hover:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Decision result (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 card-shadow"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                  className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    initialApproved
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20'
                      : 'bg-gradient-to-br from-red-500 to-orange-600 shadow-lg shadow-red-500/20'
                  }`}
                >
                  {initialApproved ? (
                    <CheckCircle className="w-12 h-12 text-white" />
                  ) : (
                    <XCircle className="w-12 h-12 text-white" />
                  )}
                </motion.div>
                <h1
                  className={`text-3xl font-extrabold tracking-tight mb-2 ${
                    initialApproved ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {initialApproved ? 'Application Approved' : 'Application Rejected'}
                </h1>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  {initialApproved
                    ? 'Our machine learning models indicate a high likelihood of credit approval based on your credentials.'
                    : 'Your credentials fall short of the safety thresholds. Review details below to see potential areas of improvement.'}
                </p>
              </div>

              {/* Score Breakdown metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-950/60 border border-slate-850 p-5 rounded-2xl">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1">Confidence Score</p>
                  <p className="text-2xl font-black text-primary-400">
                    {(prediction.confidence_score * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-slate-950/60 border border-slate-850 p-5 rounded-2xl">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1">Model Evaluator</p>
                  <p className="text-sm font-extrabold text-slate-300 mt-1 truncate">
                    {prediction.model_used}
                  </p>
                </div>
              </div>

              {/* Meta details */}
              <div className="border-t border-slate-800 pt-5 text-xs text-slate-500 flex flex-wrap justify-between gap-2">
                <span>Reference ID: {prediction.applicant_id}</span>
                <span>Evaluated at: {new Date(prediction.created_at).toLocaleString()}</span>
              </div>
            </motion.div>

            {/* AI Advisor Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6"
            >
              <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                AI Advisory & Remediation Tips
              </h3>
              <div className="space-y-3">
                {adviceList.map((advice, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start bg-slate-950/40 border border-slate-850 p-3.5 rounded-xl">
                    <span className="text-xs bg-slate-850 text-slate-400 w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-400 leading-normal">{advice}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: What-If simulation (5 cols) */}
          <div className="lg:col-span-5 space-y-6 no-print">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6">
              <h3 className="text-base font-bold text-slate-200 mb-1 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary-400 animate-pulse" />
                "What-If" Credit Simulator
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Slide and adjust your parameters to see how changes dynamically impact your approval probability.
              </p>

              <div className="space-y-5">
                {/* Credit Score Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Credit Score (FICO)</span>
                    <span className="text-primary-400 font-bold">{simParams.credit_score}</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="850"
                    value={simParams.credit_score}
                    onChange={(e) => setSimParams({ ...simParams, credit_score: parseInt(e.target.value) })}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <div className="flex justify-between text-[9px] text-slate-600">
                    <span>Poor (300)</span>
                    <span>Excellent (850)</span>
                  </div>
                </div>

                {/* Annual Income Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Annual Income ($)</span>
                    <span className="text-green-400 font-bold">${simParams.income.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="5000"
                    value={simParams.income}
                    onChange={(e) => setSimParams({ ...simParams, income: parseInt(e.target.value) })}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                </div>

                {/* Years Employed Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Years Employed</span>
                    <span className="text-purple-400 font-bold">{simParams.years_employed} years</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={simParams.years_employed}
                    onChange={(e) => setSimParams({ ...simParams, years_employed: parseInt(e.target.value) })}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                {/* Active Loans Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Total Active Debts ($)</span>
                    <span className="text-red-400 font-bold">${simParams.active_loans.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="2500"
                    value={simParams.active_loans}
                    onChange={(e) => setSimParams({ ...simParams, active_loans: parseInt(e.target.value) })}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>

                {/* Bankruptcy Toggle */}
                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-2xl border border-slate-850">
                  <span className="text-xs text-slate-400 font-semibold">Prior Bankruptcies</span>
                  <button
                    onClick={() => setSimParams({ ...simParams, bankruptcies: simParams.bankruptcies === 0 ? 1 : 0 })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      simParams.bankruptcies > 0
                        ? 'bg-red-500/10 border border-red-500 text-red-400'
                        : 'bg-slate-800 border border-slate-700 text-slate-400'
                    }`}
                  >
                    {simParams.bankruptcies > 0 ? 'Yes (Penalty)' : 'No (Optimal)'}
                  </button>
                </div>
              </div>

              {/* Simulation Result Indicator */}
              <div className="mt-8 pt-6 border-t border-slate-850 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Simulated Probability</span>
                  <span className={`text-base font-bold ${
                    simResult.approved ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {Math.round(simResult.probability * 100)}%
                  </span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-850">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      simResult.approved ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${simResult.probability * 100}%` }}
                  ></div>
                </div>

                <div className={`p-4 rounded-2xl text-center text-xs font-bold border transition-all ${
                  simResult.approved
                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-450'
                }`}>
                  {simResult.approved
                    ? 'SIMULATED OUTCOME: APPROVED'
                    : 'SIMULATED OUTCOME: REJECTED'}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/predict')}
                className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:shadow-xl hover:shadow-primary-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <RefreshCw className="w-4.5 h-4.5" />
                New Evaluation
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full border border-slate-800 hover:bg-slate-800/80 text-slate-300 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Home className="w-4.5 h-4.5" />
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
