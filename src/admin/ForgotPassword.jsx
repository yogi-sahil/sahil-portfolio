import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      const res = await api.post('/auth/forgot-password', { username });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8f6f0] font-sans">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border-4 border-gray-900 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]"
      >
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-[#e63920] flex items-center justify-center text-white font-black text-3xl mx-auto mb-6 shadow-md -rotate-3">
            S
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Forgot Password</h2>
          <p className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">Request a reset link</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-black text-gray-900 uppercase tracking-widest block mb-2">Username</label>
            <input
              type="text" value={username}
              onChange={e => setUsername(e.target.value)}
              required placeholder="Enter your admin username"
              className="w-full h-12 px-4 border-2 border-gray-900 text-gray-900 placeholder-gray-400 font-bold outline-none focus:border-[#e63920] focus:shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] transition-all bg-[#f8f6f0]"
            />
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-100 border-2 border-red-500 text-red-600 font-bold text-sm uppercase tracking-wider">
              {error}
            </div>
          )}

          {message && (
            <div className="px-4 py-3 bg-green-100 border-2 border-green-500 text-green-700 font-bold text-sm uppercase tracking-wider">
              {message}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full h-14 bg-gray-900 text-white font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-8 text-center border-t-2 border-gray-100 pt-6">
          <Link to="/admin/login" className="text-sm font-bold text-gray-500 hover:text-[#e63920] transition-colors uppercase tracking-widest">
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
