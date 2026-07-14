import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError('New passwords do not match.');
    }

    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await api.post('/auth/change-password', { oldPassword, newPassword });
      setSuccess(res.data.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error changing password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-white border-4 border-gray-900 p-8 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Change Password</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-[#e63920] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest block mb-1">Current Password</label>
                <input
                  type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)}
                  required className="w-full h-10 px-3 border-2 border-gray-900 font-bold outline-none focus:border-[#e63920]"
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest block mb-1">New Password</label>
                <input
                  type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  required className="w-full h-10 px-3 border-2 border-gray-900 font-bold outline-none focus:border-[#e63920]"
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest block mb-1">Confirm New Password</label>
                <input
                  type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  required className="w-full h-10 px-3 border-2 border-gray-900 font-bold outline-none focus:border-[#e63920]"
                />
              </div>

              {error && <div className="p-2 bg-red-100 text-red-600 font-bold text-xs uppercase tracking-widest border-2 border-red-500">{error}</div>}
              {success && <div className="p-2 bg-green-100 text-green-700 font-bold text-xs uppercase tracking-widest border-2 border-green-500">{success}</div>}

              <button
                type="submit" disabled={loading}
                className="w-full h-12 bg-gray-900 text-white font-black text-sm uppercase tracking-widest hover:bg-[#e63920] transition-colors mt-4 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Save Password'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
