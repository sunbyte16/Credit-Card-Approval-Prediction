import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictionsAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  Calendar,
  Users,
  Briefcase,
  ArrowLeft,
  Send,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Percent,
  CheckCircle2,
  Lock
} from 'lucide-react';

const PRESETS = [
  {
    name: 'Prime Executive',
    description: 'High score, stable job, good income',
    icon: '👑',
    data: {
      income: '125000',
      age: '42',
      years_employed: '10',
      family_size: '3',
      credit_score: '780',
      active_loans: '15000',
      bankruptcies: '0',
      employment_status: 'Employed',
      education: 'Master'
    }
  },
  {
    name: 'Young Graduate',
    description: 'Entry-level, building history',
    icon: '🎓',
    data: {
      income: '48000',
      age: '24',
      years_employed: '1',
      family_size: '1',
      credit_score: '650',
      active_loans: '28000',
      bankruptcies: '0',
      employment_status: 'Employed',
      education: 'Bachelor'
    }
  },
  {
    name: 'High Risk / Recovery',
    description: 'Prior bankruptcies, lower score',
    icon: '⚠️',
    data: {
      income: '32000',
      age: '35',
      years_employed: '0',
      family_size: '4',
      credit_score: '510',
      active_loans: '45000',
      bankruptcies: '1',
      employment_status: 'Unemployed',
      education: 'High School'
    }
  }
];

const PredictionPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    income: '',
    age: '',
    years_employed: '',
    family_size: '',
    credit_score: '',
    active_loans: '',
    bankruptcies: '0',
    employment_status: 'Employed',
    education: 'Bachelor'
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePresetSelect = (presetData: typeof formData) => {
    setFormData(presetData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await predictionsAPI.predict({ applicant_details: formData });
      navigate('/result', { state: { prediction: response.data, inputData: formData } });
    } catch (err) {
      console.error('Prediction failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Client-side quick score evaluation for real-time interactivity
  const getPreScreenPercentage = () => {
    const cs = parseFloat(formData.credit_score) || 300;
    const inc = parseFloat(formData.income) || 0;
    const ye = parseFloat(formData.years_employed) || 0;
    const debt = parseFloat(formData.active_loans) || 0;
    const bk = parseInt(formData.bankruptcies) || 0;

    const normCs = Math.max(0, Math.min(100, (cs - 300) / 5.5));
    const dti = debt * 0.12 / Math.max(inc, 1000);
    const dtiScore = dti <= 0.20 ? 100 : dti >= 0.50 ? 0 : 100 - ((dti - 0.20) / 0.30) * 100;
    const empScore = Math.min(100, ye * 12.5);
    const bkPenalty = bk > 0 ? 45 : 0;
    
    const base = (normCs * 0.45 + dtiScore * 0.25 + empScore * 0.20 + 90 * 0.10) - bkPenalty;
    const prob = 1 / (1 + Math.exp(-0.12 * (base - 48)));
    return Math.round(prob * 100);
  };

  const livePercent = getPreScreenPercentage();

  // Determine card style based on income
  const getCardDesign = () => {
    const incomeVal = parseFloat(formData.income) || 0;
    if (incomeVal >= 90000) {
      return {
        name: 'Platinum Elite Card',
        bg: 'bg-gradient-to-br from-zinc-800 via-zinc-950 to-zinc-900',
        textColor: 'text-zinc-300',
        accent: 'bg-zinc-700/50',
        borderColor: 'border-zinc-700/50'
      };
    } else if (incomeVal >= 40000) {
      return {
        name: 'Gold Premier Card',
        bg: 'bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700',
        textColor: 'text-yellow-100',
        accent: 'bg-amber-400/50',
        borderColor: 'border-amber-400/40'
      };
    } else {
      return {
        name: 'Standard Silver Card',
        bg: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600',
        textColor: 'text-slate-100',
        accent: 'bg-slate-300/40',
        borderColor: 'border-slate-300/30'
      };
    }
  };

  const cardDesign = getCardDesign();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-primary-500 selection:text-white pb-12">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary-950/20 to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navbar */}
      <nav className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2.5 text-slate-400 hover:text-slate-100 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-green-500" />
              Secure 256-bit SSL
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex justify-center items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary-400 animate-pulse" />
            Credit Card Approval Predictor
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Fill in your profile details or load a test preset. Our machine learning engine analyzes your parameters in real-time.
          </p>
        </div>

        {/* Presets Bar */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-3">
            Quick Test Presets
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePresetSelect(preset.data)}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-left transition-all hover:scale-102 cursor-pointer group"
              >
                <span className="text-xl group-hover:animate-bounce">{preset.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{preset.name}</h4>
                  <p className="text-[10px] text-slate-500">{preset.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Form Wizard - 7 Columns */}
          <div className="lg:col-span-7 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-8">
            {/* Stepper Indicators */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  onClick={() => s < step && setStep(s)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border z-10 transition-all cursor-pointer ${
                    step === s
                      ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/20'
                      : step > s
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">Step 1: Personal & Demographics</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary-400" />
                          Age (Years)
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all text-sm text-slate-200"
                          placeholder="e.g., 32"
                          required
                          min="18"
                          max="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-primary-400" />
                          Family Size
                        </label>
                        <input
                          type="number"
                          name="family_size"
                          value={formData.family_size}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all text-sm text-slate-200"
                          placeholder="e.g., 2"
                          required
                          min="1"
                          max="20"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          Education Level
                        </label>
                        <select
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all text-sm text-slate-200"
                        >
                          <option value="High School">High School</option>
                          <option value="Bachelor">Bachelor Degree</option>
                          <option value="Master">Master Degree</option>
                          <option value="PhD">PhD / Doctorate</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5 hover:shadow-lg hover:shadow-primary-500/20 cursor-pointer"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">Step 2: Financial Standing</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-primary-400" />
                          Annual Income ($)
                        </label>
                        <input
                          type="number"
                          name="income"
                          value={formData.income}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all text-sm text-slate-200"
                          placeholder="e.g., 68000"
                          required
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-primary-400" />
                          Years Employed
                        </label>
                        <input
                          type="number"
                          name="years_employed"
                          value={formData.years_employed}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all text-sm text-slate-200"
                          placeholder="e.g., 4"
                          required
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400">Employment Status</label>
                        <select
                          name="employment_status"
                          value={formData.employment_status}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all text-sm text-slate-200"
                        >
                          <option value="Employed">Employed (Full-Time)</option>
                          <option value="Self-Employed">Self-Employed / Freelancer</option>
                          <option value="Unemployed">Unemployed</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          Active Loans / Total Debts ($)
                        </label>
                        <input
                          type="number"
                          name="active_loans"
                          value={formData.active_loans}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all text-sm text-slate-200"
                          placeholder="e.g., 5000"
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="border border-slate-800 hover:bg-slate-800 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5 cursor-pointer text-slate-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5 hover:shadow-lg hover:shadow-primary-500/20 cursor-pointer"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">Step 3: Credit History</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <Percent className="w-3.5 h-3.5 text-primary-400" />
                          Credit Score (FICO: 300 - 850)
                        </label>
                        <input
                          type="number"
                          name="credit_score"
                          value={formData.credit_score}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all text-sm text-slate-200"
                          placeholder="e.g., 680"
                          required
                          min="300"
                          max="850"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400">Prior Bankruptcies</label>
                        <select
                          name="bankruptcies"
                          value={formData.bankruptcies}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all text-sm text-slate-200"
                        >
                          <option value="0">No, none</option>
                          <option value="1">Yes, 1 or more</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="border border-slate-800 hover:bg-slate-800 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5 cursor-pointer text-slate-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-xl hover:shadow-primary-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer"
                      >
                        {isLoading ? (
                          <span className="animate-pulse">Analyzing Profile...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit Application
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Interactive Card & Real-time Evaluation - 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Credit Card Mockup */}
            <div className="perspective-1000">
              <motion.div
                animate={{ rotateY: [0, 5, -5, 0], rotateX: [0, 2, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className={`relative w-full aspect-[1.586/1] rounded-2xl p-6 ${cardDesign.bg} border ${cardDesign.borderColor} shadow-2xl overflow-hidden flex flex-col justify-between`}
              >
                {/* Visual accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className={`absolute bottom-4 right-4 w-12 h-12 rounded-full ${cardDesign.accent}`}></div>

                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-white/90" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/90">CreditPredict</span>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${cardDesign.accent} ${cardDesign.textColor}`}>
                    {cardDesign.name}
                  </span>
                </div>

                {/* Chip */}
                <div className="w-10 h-8 bg-gradient-to-br from-amber-200 to-yellow-400 rounded-md relative flex items-center justify-center shadow-inner overflow-hidden border border-amber-300/40">
                  <div className="absolute inset-x-1.5 inset-y-1 bg-transparent border-r border-amber-600/30"></div>
                  <div className="absolute inset-y-1.5 inset-x-1 bg-transparent border-b border-amber-600/30"></div>
                </div>

                {/* Number placeholder */}
                <div>
                  <p className="text-lg font-mono tracking-widest text-white font-semibold">
                    ••••  ••••  ••••  {formData.credit_score ? `${formData.credit_score}0` : '7800'}
                  </p>
                  
                  {/* Cardholder name & expiry */}
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-white/60">Cardholder</p>
                      <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        APPLICANT MODEL
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-white/60">Expires</p>
                      <p className="text-xs font-bold text-white font-mono">12/30</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Client-Side Real-Time Score Evaluation */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6">
              <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Live Pre-Screen Analyzer
              </h3>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Estimated Approval Probability</span>
                <span className={`text-lg font-bold ${
                  livePercent >= 75 ? 'text-green-500' : livePercent >= 50 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {livePercent}%
                </span>
              </div>

              {/* Progress gauge bar */}
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${livePercent}%` }}
                  transition={{ type: 'spring', stiffness: 80 }}
                  className={`h-full rounded-full bg-gradient-to-r ${
                    livePercent >= 75
                      ? 'from-green-500 to-emerald-400'
                      : livePercent >= 50
                      ? 'from-yellow-500 to-amber-400'
                      : 'from-red-600 to-orange-500'
                  }`}
                />
              </div>

              {/* Helper text based on likelihood */}
              <div className="mt-4 p-3 bg-slate-950/60 rounded-2xl border border-slate-800/60 flex items-start gap-2.5">
                <div className="mt-0.5">
                  {livePercent >= 75 ? (
                    <span className="text-green-500">✔</span>
                  ) : livePercent >= 50 ? (
                    <span className="text-yellow-500">⚠</span>
                  ) : (
                    <span className="text-red-500">✖</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {livePercent >= 75 ? (
                    "Excellent profile. High likelihood of immediate credit approval with premium terms."
                  ) : livePercent >= 50 ? (
                    "Moderate standing. Approvals may require additional verifications or secondary audits."
                  ) : (
                    "Critical variables detected (low FICO, bankruptcies, or high DTI). Approval rate is currently low."
                  )}
                </p>
              </div>
            </div>
            
            {/* Safety Indicator */}
            <div className="bg-slate-950/80 border border-slate-900 p-4 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <div className="text-[11px] text-slate-500 leading-normal">
                All transmissions are fully encrypted. Your inputs are used solely for the predictive evaluation and processed in compliance with FFIEC guidelines.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PredictionPage;
