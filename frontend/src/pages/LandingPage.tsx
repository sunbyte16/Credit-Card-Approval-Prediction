import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Brain, Zap, BarChart3 } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary-500" />,
      title: 'Secure & Reliable',
      description: 'Bank-level security ensures your data is protected and your predictions are trustworthy.',
    },
    {
      icon: <Brain className="w-8 h-8 text-primary-500" />,
      title: 'AI-Powered',
      description: 'Advanced machine learning models analyze your application with high accuracy.',
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-500" />,
      title: 'Instant Results',
      description: 'Get your approval prediction in seconds - fast and efficient.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary-500" />,
      title: 'Real-time Analytics',
      description: 'View your application status and statistics in real-time.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <span className="text-xl font-bold text-slate-800">CreditPredict</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                <span>98.5% Prediction Accuracy</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Predict Your Credit Card
                <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                  {' '}
                  Approval
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Use our advanced AI-powered system to predict your credit card approval chances. Simple, fast, and secure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1"
                >
                  Start Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-white text-slate-800 border-2 border-slate-200 px-8 py-3.5 rounded-xl font-semibold text-lg hover:border-primary-500 hover:text-primary-600 transition-all"
                >
                  Login
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-blue-600 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-2xl">
                    ✅
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Approved!</h3>
                    <p className="text-slate-500">Prediction Confidence: 95%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Income Level</span>
                    <span className="font-semibold text-slate-800">$85,000</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Credit Score</span>
                    <span className="font-semibold text-green-600">780</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Employment</span>
                    <span className="font-semibold text-slate-800">Stable</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why Choose CreditPredict?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to make your credit approval prediction experience seamless and accurate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <span className="text-xl font-bold text-white">CreditPredict</span>
          </div>
          <p>&copy; 2026 CreditPredict. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
