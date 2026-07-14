import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';

const FILTERS = ['ALL', 'DEPLOYED', 'LIVE', 'PROD', 'WIP'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects').then(r => { setProjects(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? projects : projects.filter(p => p.status === filter);

  return (
    <section className="min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <span className="font-black text-[#e63920] text-sm tracking-widest">03.</span>
            <span className="h-1 w-12 bg-gray-900" />
            <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">all_work</span>
          </div>
          <h1 className="font-black text-6xl md:text-8xl lg:text-9xl text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            PROJ<span className="text-[#e63920]">ECTS</span>
          </h1>
          <p className="font-medium text-lg text-gray-600 mt-6 max-w-2xl leading-relaxed border-l-4 border-[#e63920] pl-4">
            A complete log of every system I've built, deployed, and destroyed in the name of progress.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`font-black text-xs uppercase tracking-widest px-6 py-3 border-2 transition-all shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] ${
                filter === f 
                  ? 'border-gray-900 text-white bg-[#e63920]' 
                  : 'border-gray-900 text-gray-900 bg-white'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="w-full h-32 flex items-center justify-center border-4 border-gray-900 bg-white shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
            <p className="font-black text-gray-900 text-lg uppercase tracking-widest animate-pulse">Loading projects...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((p, i) => {
              const techStack = typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : p.tech_stack;
              return (
                <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group border-4 border-gray-900 bg-white p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(17,24,39,1)] transition-all">
                  <div className="grid md:grid-cols-[120px_1fr_auto] gap-8 items-start">
                    
                    {/* Index & Status */}
                    <div>
                      <span className="font-black text-2xl text-gray-400 block mb-3 tracking-tighter">#{String(p.id).padStart(3, '0')}</span>
                      <span className={`font-bold text-xs uppercase tracking-widest px-3 py-1.5 border-2 inline-block ${
                        p.status === 'DEPLOYED' ? 'text-gray-900 border-gray-900 bg-green-400' 
                        : p.status === 'LIVE' ? 'text-white border-gray-900 bg-[#e63920]' 
                        : 'text-gray-600 border-gray-400 bg-gray-100'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-black text-3xl md:text-5xl text-gray-900 group-hover:text-[#e63920] transition-colors mb-4 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                        {p.title}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed max-w-3xl mb-6">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {techStack.map(t => <span key={t} className="font-bold text-xs text-gray-900 border-2 border-gray-900 bg-[#f8f6f0] px-3 py-1.5 uppercase tracking-widest">{t}</span>)}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-row md:flex-col gap-4 items-center md:items-end mt-6 md:mt-0">
                      {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#e63920] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                      </a>}
                      {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center border-2 border-gray-900 bg-gray-900 text-white hover:bg-[#e63920] transition-colors shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>}
                    </div>

                  </div>
                </motion.div>
              );
            })}
            {filtered.length === 0 && (
              <div className="w-full py-16 flex flex-col items-center justify-center border-4 border-dashed border-gray-400 bg-[#f8f6f0]">
                <p className="font-black text-gray-500 text-2xl tracking-tighter uppercase">No projects found</p>
                <p className="font-medium text-gray-400 text-sm mt-2">Status [{filter}] yielded zero results.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
