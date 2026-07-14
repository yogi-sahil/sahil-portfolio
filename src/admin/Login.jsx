import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('admin_token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex bg-[#f8f6f0] font-sans">
      
      {/* Left — branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 bg-white border-r-8 border-gray-900 relative overflow-hidden">
        {/* Background text */}
        <div className="absolute -top-10 -left-10 text-[20rem] font-black text-gray-50 leading-none pointer-events-none select-none" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
          CMS
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#e63920] flex items-center justify-center text-white font-black text-xl shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] -rotate-3">
            S
          </div>
          <span className="text-gray-900 font-black text-2xl uppercase tracking-tighter">Sahil Yogi</span>
        </div>

        {/* Center text */}
        <div className="relative z-10 max-w-lg">
          <div className="text-sm font-bold text-[#e63920] uppercase tracking-widest mb-4">Portfolio CMS</div>
          <h1 className="text-6xl font-black text-gray-900 leading-[0.9] uppercase tracking-tighter mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            MANAGE<br/>YOUR<br/>DIGITAL<br/>PRESENCE.
          </h1>
          <p className="text-gray-600 font-medium text-lg leading-relaxed border-l-4 border-gray-900 pl-4">
            Create posts, manage projects, update skills and experience — all from one place. No fluff.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          {[['Projects', '∞'], ['Blog Posts', '∞'], ['Messages', '✓']].map(([label, val]) => (
            <div key={label} className="bg-white border-4 border-gray-900 p-6 shadow-[6px_6px_0px_0px_rgba(17,24,39,1)]">
              <div className="text-4xl font-black text-[#e63920] tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{val}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border-4 border-gray-900 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-4 mb-10 border-b-4 border-gray-900 pb-6">
            <div className="w-10 h-10 bg-[#e63920] flex items-center justify-center text-white text-lg font-black shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]">S</div>
            <span className="text-gray-900 font-black text-xl uppercase tracking-tighter">Sahil Yogi CMS</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Welcome Back</h2>
            <p className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">Sign in to your admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-black text-gray-900 uppercase tracking-widest block mb-2">Username</label>
              <input
                type="text" value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required autoComplete="username"
                placeholder="admin"
                className="w-full h-12 px-4 border-2 border-gray-900 text-gray-900 placeholder-gray-400 font-bold outline-none focus:border-[#e63920] focus:shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] transition-all bg-[#f8f6f0]"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest block">Password</label>
                <Link to="/admin/forgot-password" className="text-xs font-bold text-gray-500 hover:text-[#e63920] uppercase tracking-widest transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required autoComplete="current-password"
                  placeholder="••••••••"
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

            <button
              type="submit" disabled={loading}
              className="w-full h-14 bg-gray-900 text-white font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? 'Processing...' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
