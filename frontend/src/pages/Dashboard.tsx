import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI, predictionsAPI, applicantsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  CheckCircle,
  XCircle,
  TrendingUp,
  Brain,
  LogOut,
  User,
  Zap,
  Search,
  Filter,
  Eye,
  X,
  ChevronRight,
  TrendingDown,
  BarChart3,
  Calendar
} from 'lucide-react';

interface MetricDetail {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
}

interface FeatureImportance {
  feature: string;
  importance: number;
}

interface PredictionTrend {
  date: string;
  predictions: number;
}

interface PredictionItem {
  applicant_id: string;
  prediction: number;
  confidence_score: number;
  model_used: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    total_applicants: 0,
    total_predictions: 0,
    approved_applications: 0,
    rejected_applications: 0,
    approval_rate: 0,
    model_accuracy: 92.5,
    model_comparison: [] as MetricDetail[],
    feature_importance: [] as FeatureImportance[],
    predictions_trend: [] as PredictionTrend[]
  });
  
  const [predictionsList, setPredictionsList] = useState<PredictionItem[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'precision' | 'recall' | 'f1_score'>('accuracy');
  
  // Search and filter states
  const [searchId, setSearchId] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'rejected'>('all');
  
  // Detail Modal State
  const [activeApplicant, setActiveApplicant] = useState<any | null>(null);
  const [activePrediction, setActivePrediction] = useState<PredictionItem | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await dashboardAPI.getStatistics();
        setStats(statsRes.data);
        
        const listRes = await predictionsAPI.getPredictions(0, 100);
        setPredictionsList(listRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data');
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewDetails = async (pred: PredictionItem) => {
    setIsLoadingDetails(true);
    setActivePrediction(pred);
    try {
      const response = await applicantsAPI.getApplicant(pred.applicant_id);
      setActiveApplicant(response.data.applicant_details);
    } catch (err) {
      console.error("Failed to load applicant details", err);
      // Fallback details if database mismatch
      setActiveApplicant({
        credit_score: 'N/A',
        income: 'N/A',
        years_employed: 'N/A',
        active_loans: 'N/A',
        bankruptcies: 'N/A',
        employment_status: 'N/A',
        education: 'N/A'
      });
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const statsCards = [
    {
      name: 'Total Evaluations',
      value: stats.total_predictions,
      icon: <Users className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/20',
      textColor: 'text-blue-400'
    },
    {
      name: 'Approved Cards',
      value: stats.approved_applications,
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
      color: 'from-green-500/20 to-green-600/10 border-green-500/20',
      textColor: 'text-green-400'
    },
    {
      name: 'Rejected Profiles',
      value: stats.rejected_applications,
      icon: <XCircle className="w-6 h-6 text-red-400" />,
      color: 'from-red-500/20 to-red-600/10 border-red-500/20',
      textColor: 'text-red-400'
    },
    {
      name: 'Approval Rate',
      value: `${stats.approval_rate.toFixed(1)}%`,
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/20',
      textColor: 'text-purple-400'
    }
  ];

  // SVG Trend Chart builder
  const generateTrendPath = () => {
    const trendData = stats.predictions_trend;
    if (!trendData || trendData.length < 2) return { linePath: '', areaPath: '', points: [] };
    
    const width = 500;
    const height = 150;
    const padding = 20;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    
    const maxVal = Math.max(...trendData.map(d => d.predictions), 5);
    
    const points = trendData.map((d, index) => {
      const x = padding + (index / (trendData.length - 1)) * chartW;
      const y = padding + chartH - (d.predictions / maxVal) * chartH;
      return { x, y, label: d.date, value: d.predictions };
    });
    
    const linePath = points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');
    
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
    
    return { linePath, areaPath, points };
  };

  const trendPaths = generateTrendPath();

  // Filtered Predictions List
  const filteredPredictions = predictionsList.filter(item => {
    const matchesSearch = item.applicant_id.toLowerCase().includes(searchId.toLowerCase());
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : statusFilter === 'approved' 
      ? item.prediction === 1 
      : item.prediction === 0;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navbar */}
      <nav className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span className="text-white font-extrabold text-sm tracking-wider">CC</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">CreditPredict <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 ml-1.5 uppercase font-medium">Enterprise</span></span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 font-medium transition-colors cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-red-500/40 hover:text-red-400 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Dashboard Overview</h1>
            <p className="text-xs text-slate-500 mt-1">Real-time prediction audit logs and model statistics</p>
          </div>
          <button
            onClick={() => navigate('/predict')}
            className="bg-gradient-to-r from-primary-600 to-blue-600 hover:shadow-lg hover:shadow-primary-500/20 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <Zap className="w-4 h-4" />
            Evaluate New Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{stat.name}</span>
                {stat.icon}
              </div>
              <p className="text-2xl font-black text-slate-100 mt-3">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts & Importance Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          {/* Trend Area Chart - 7 Columns */}
          <div className="lg:col-span-7 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-slate-200 mb-6 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-400" />
              Evaluation History (Last 7 Days)
            </h3>
            
            {/* SVG area chart container */}
            <div className="w-full h-[180px] mt-2 relative">
              {trendPaths.points.length > 0 ? (
                <svg viewBox="0 0 500 150" width="100%" height="100%" preserveAspectRatio="none" className="overflow-visible">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  {[0.25, 0.5, 0.75, 1.0].map((ratio, i) => (
                    <line
                      key={i}
                      x1="20"
                      y1={20 + ratio * 110}
                      x2="480"
                      y2={20 + ratio * 110}
                      stroke="#1e293b"
                      strokeWidth="1"
                      strokeDasharray="4"
                    />
                  ))}

                  {/* Area */}
                  <path d={trendPaths.areaPath} fill="url(#chartGlow)" />
                  
                  {/* Line */}
                  <path d={trendPaths.linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Dots */}
                  {trendPaths.points.map((p, idx) => (
                    <g key={idx} className="group cursor-pointer">
                      <circle cx={p.x} cy={p.y} r="4" fill="#3b82f6" stroke="#0f172a" strokeWidth="2" />
                      <circle cx={p.x} cy={p.y} r="8" fill="#3b82f6" fillOpacity="0" className="hover:fill-opacity-20 transition-all" />
                    </g>
                  ))}
                </svg>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500">Generating analytics...</div>
              )}
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between px-4 mt-2 text-[10px] text-slate-500 font-bold">
              {trendPaths.points.map((p, idx) => (
                <span key={idx}>{p.label}</span>
              ))}
            </div>
          </div>

          {/* Feature Importance Meter - 5 Columns */}
          <div className="lg:col-span-5 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-slate-200 mb-6 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              Machine Learning Feature Weighting
            </h3>
            
            <div className="space-y-4">
              {stats.feature_importance.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">{item.feature}</span>
                    <span className="text-purple-400 font-extrabold">{item.importance}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-850">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                      style={{ width: `${item.importance * 2}%` }} // Multiply to scale visibly (max 40)
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model Comparer Section */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-400" />
                Algorithm Performance Benchmark
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Benchmarking accuracy across multiple ML models on credit parameters</p>
            </div>
            
            {/* Metric Selectors */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1 overflow-x-auto max-w-full">
              {(['accuracy', 'precision', 'recall', 'f1_score'] as const).map(metric => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedMetric === metric
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {metric.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.model_comparison.map((modelItem, idx) => {
              const val = modelItem[selectedMetric];
              return (
                <div key={idx} className="bg-slate-950/60 border border-slate-850 p-4.5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-300">{modelItem.name}</h4>
                    <p className="text-3xl font-black text-primary-400 mt-2">{(val).toFixed(1)}%</p>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: `${val}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prediction Audit Table */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Evaluation Logs</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Audit history of credit applications processed by the system</p>
            </div>
            
            {/* Search & Filter tools */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search Reference ID..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 focus:outline-none"
              >
                <option value="all">All Results</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">
                  <th className="pb-3.5 pl-2">Reference ID</th>
                  <th className="pb-3.5">Outcome</th>
                  <th className="pb-3.5">Confidence</th>
                  <th className="pb-3.5">Algorithm</th>
                  <th className="pb-3.5">Timestamp</th>
                  <th className="pb-3.5 text-center pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-xs text-slate-350">
                {filteredPredictions.length > 0 ? (
                  filteredPredictions.map((row) => (
                    <tr key={row.applicant_id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="py-3.5 pl-2 font-mono font-bold text-slate-300">#{row.applicant_id}</td>
                      <td className="py-3.5 font-bold">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.prediction === 1 
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}>
                          {row.prediction === 1 ? 'Approved' : 'Rejected'}
                        </span>
                      </td>
                      <td className="py-3.5 font-bold text-slate-400">{(row.confidence_score * 100).toFixed(1)}%</td>
                      <td className="py-3.5 text-slate-500 font-medium">{row.model_used}</td>
                      <td className="py-3.5 text-slate-500 font-mono">{new Date(row.created_at).toLocaleDateString()}</td>
                      <td className="py-3.5 text-center pr-2">
                        <button
                          onClick={() => handleViewDetails(row)}
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 text-[10px] font-bold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Audit</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">No matching logs found in database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Audit Detail Modal */}
      <AnimatePresence>
        {activePrediction && activeApplicant && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-slate-950 p-5 border-b border-slate-850 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm text-slate-200">Application Audit</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Reference ID: #{activePrediction.applicant_id}</p>
                </div>
                <button
                  onClick={() => {
                    setActivePrediction(null);
                    setActiveApplicant(null);
                  }}
                  className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 overflow-y-auto">
                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-850">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Evaluation Verdict</p>
                    <p className={`text-base font-extrabold mt-0.5 ${
                      activePrediction.prediction === 1 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {activePrediction.prediction === 1 ? 'Approved Chances' : 'Rejected Chances'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Confidence</p>
                    <p className="text-base font-extrabold text-primary-400 mt-0.5">
                      {(activePrediction.confidence_score * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Applicant Parameters</h4>
                  
                  <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 divide-y divide-slate-850">
                    <div className="flex justify-between py-2.5 text-xs">
                      <span className="text-slate-500 font-medium">Credit Score (FICO)</span>
                      <span className="font-extrabold text-slate-200">{activeApplicant.credit_score || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2.5 text-xs">
                      <span className="text-slate-500 font-medium">Annual Income</span>
                      <span className="font-extrabold text-slate-200">
                        {activeApplicant.income ? `$${parseInt(activeApplicant.income).toLocaleString()}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5 text-xs">
                      <span className="text-slate-500 font-medium">Years Employed</span>
                      <span className="font-extrabold text-slate-200">{activeApplicant.years_employed || 'N/A'} years</span>
                    </div>
                    <div className="flex justify-between py-2.5 text-xs">
                      <span className="text-slate-500 font-medium">Total Active Debts</span>
                      <span className="font-extrabold text-slate-200">
                        {activeApplicant.active_loans ? `$${parseInt(activeApplicant.active_loans).toLocaleString()}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5 text-xs">
                      <span className="text-slate-500 font-medium">Prior Bankruptcies</span>
                      <span className="font-extrabold text-slate-200">
                        {activeApplicant.bankruptcies === '1' || activeApplicant.bankruptcies === 1 ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5 text-xs">
                      <span className="text-slate-500 font-medium">Employment status</span>
                      <span className="font-extrabold text-slate-200">{activeApplicant.employment_status || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-950/60 p-4 border-t border-slate-850 flex justify-end">
                <button
                  onClick={() => {
                    setActivePrediction(null);
                    setActiveApplicant(null);
                  }}
                  className="bg-slate-900 border border-slate-800 hover:bg-slate-850 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 cursor-pointer"
                >
                  Close Audit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
