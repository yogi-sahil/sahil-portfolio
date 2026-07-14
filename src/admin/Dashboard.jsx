import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

const stats_config = [
  { key: 'total_projects', label: 'Projects', to: '/admin/projects',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { key: 'total_skills', label: 'Skills', to: '/admin/skills',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
  { key: 'total_experience', label: 'Experience', to: '/admin/experience',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { key: 'total_posts', label: 'Blog Posts', to: '/admin/blog',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg> },
  { key: 'total_messages', label: 'Messages', to: '/admin/messages',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { key: 'unread_messages', label: 'Unread', to: '/admin/messages',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
];

const quickActions = [
  { label: 'New Project', to: '/admin/projects' },
  { label: 'New Blog Post', to: '/admin/blog' },
  { label: 'Add Skill', to: '/admin/skills' },
  { label: 'Read Messages', to: '/admin/messages' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  useEffect(() => {
    api.get('/contact/stats')
      .then(r => { setStats(r.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-bold text-[#e63920] uppercase tracking-widest mb-2">{greeting}, Admin</p>
        <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats_config.map((s, i) => (
          <motion.div key={s.key}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Link to={s.to} className="block group">
              <div className="bg-white border-4 border-gray-900 p-6 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-gray-900 group-hover:text-[#e63920] transition-colors">
                    {s.icon}
                  </div>
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="mt-auto">
                  <div className="text-5xl font-black text-gray-900 tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                    {loading ? '—' : (stats?.[s.key] ?? 0)}
                  </div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">{s.label}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((a, i) => (
            <motion.div key={a.to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
              <Link to={a.to} className="block">
                <div className="bg-[#f8f6f0] border-2 border-gray-900 px-6 py-4 font-bold text-sm text-gray-900 uppercase tracking-widest transition-all flex items-center justify-between hover:bg-gray-900 hover:text-white group shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                  <span>{a.label}</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer info */}
      <div className="bg-green-100 border-4 border-green-500 p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-12 h-12 bg-white border-2 border-green-500 flex items-center justify-center text-green-600 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="overflow-hidden">
            <div className="text-lg font-black text-green-900 uppercase tracking-tighter truncate">Backend Connected</div>
            <div className="text-xs sm:text-sm font-bold text-green-700 mt-1 uppercase tracking-widest truncate">http://localhost:5001 · MySQL · JWT auth</div>
          </div>
        </div>
      </div>
    </div>
  );
}
