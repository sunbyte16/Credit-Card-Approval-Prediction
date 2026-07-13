import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, LogOut, ArrowLeft, Settings } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-700 hover:text-primary-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <div className="text-center mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-14 h-14 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">User Profile</h1>
              <p className="text-slate-600">Manage your account settings</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">Account Status</p>
                    <p className="text-lg font-semibold text-slate-900">Active</p>
                  </div>
                </div>
                <div className="text-sm text-slate-600">
                  <p>Logged in successfully</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {}}
                className="w-full flex items-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-800 p-4 rounded-xl transition-colors"
              >
                <Settings className="w-5 h-5 text-slate-600" />
                <span className="font-medium">Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 bg-red-50 hover:bg-red-100 text-red-700 p-4 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
