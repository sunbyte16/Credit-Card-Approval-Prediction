import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Award, DollarSign, ShieldAlert, FileCheck2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const PRESETS = [
  { text: "How can I improve my Credit Score?", icon: <Award className="w-4 h-4 text-purple-500" /> },
  { text: "What is an ideal Debt-to-Income (DTI) ratio?", icon: <DollarSign className="w-4 h-4 text-green-500" /> },
  { text: "Why was my application rejected?", icon: <ShieldAlert className="w-4 h-4 text-red-500" /> },
  { text: "How long should my job history be?", icon: <FileCheck2 className="w-4 h-4 text-blue-500" /> }
];

export const CreditAdvisorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I am your AI Credit Advisor. How can I help you improve your credit card approval probability today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Bot Response Logic
    setTimeout(() => {
      let responseText = "Thank you for asking. Lenders look closely at Credit Score, Income-to-Debt Ratio, and Job Stability. Try making sure your credit score is above 670 and you have no active bankruptcies.";
      
      const query = text.toLowerCase();
      if (query.includes('improve') || query.includes('score')) {
        responseText = "To improve your Credit Score (FICO):\n1. Pay bills on time (accounts for 35% of score).\n2. Keep credit card utilization under 30% (accounts for 30%).\n3. Don't close old credit lines (length of history counts for 15%).\n4. Limit hard inquiries for new credit cards.";
      } else if (query.includes('dti') || query.includes('debt') || query.includes('income')) {
        responseText = "An ideal Debt-to-Income (DTI) ratio is below 36%. If your DTI exceeds 45%, lenders perceive you as high risk. You can lower your DTI by paying off credit card balances or consolidated loans.";
      } else if (query.includes('reject') || query.includes('denied')) {
        responseText = "Common reasons for rejection include:\n• Credit score below 620\n• High debt-to-income ratio (DTI > 45%)\n• Short employment duration (less than 1 year)\n• Active bankruptcies or recent late payments.\nYou can check our Result page for a full breakdown!";
      } else if (query.includes('job') || query.includes('employ') || query.includes('work')) {
        responseText = "Stability is critical! Lenders prefer at least 2 consecutive years of employment in the same industry. If you have been employed for less than 1 year, your approval probability decreases unless your income is exceptionally high.";
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -45 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-gradient-to-br from-primary-600 to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-white/20 hover:shadow-primary-500/40 transition-all"
            id="chat-toggle-btn"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="w-96 h-[500px] bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-blue-700 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></div>
                <div>
                  <h3 className="font-bold text-sm">Credit Advisor AI</h3>
                  <p className="text-[10px] text-slate-200">Online & Ready to Help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={scrollToBottom} />
            </div>

            {/* Presets */}
            {messages.length === 1 && (
              <div className="p-3 bg-white border-t border-slate-100 grid grid-cols-2 gap-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(preset.text)}
                    className="flex items-center gap-1.5 p-2 bg-slate-50 hover:bg-primary-50 hover:text-primary-700 border border-slate-100 hover:border-primary-200 rounded-xl text-left text-xs font-medium text-slate-600 transition-all cursor-pointer"
                  >
                    {preset.icon}
                    <span className="truncate">{preset.text}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about credit scores, rejection, DTI..."
                className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-primary-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
