import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      const res = await api.post('/auth/reset-password', { token, newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate('/admin/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8f6f0] font-sans">
        <div className="w-full max-w-md bg-white border-4 border-gray-900 p-8 text-center shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]">
          <h2 className="text-2xl font-black text-gray-900 uppercase mb-4" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Invalid Link</h2>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">No reset token provided.</p>
          <Link to="/admin/login" className="px-6 py-3 bg-gray-900 text-white font-black text-sm uppercase tracking-widest hover:bg-[#e63920] transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Reset Password</h2>
          <p className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-black text-gray-900 uppercase tracking-widest block mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'} value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required placeholder="••••••••"
                className="w-full h-12 px-4 pr-12 border-2 border-gray-900 text-gray-900 placeholder-gray-400 font-bold outline-none focus:border-[#e63920] focus:shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] transition-all bg-[#f8f6f0]"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#e63920] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPass
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                  }
                </svg>
              </button>
            </div>
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
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
