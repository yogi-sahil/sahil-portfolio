import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    api.get('/projects?featured=true')
      .then(r => setFeaturedProjects(r.data.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="font-sans text-gray-900">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 border-b-8 border-gray-900">
        
        {/* Decorative background text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-5 select-none">
          <h1 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '25vw', lineHeight: 0.8 }} className="text-black whitespace-nowrap">SAHIL</h1>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl">

            {/* Status badge */}
            <motion.div variants={fadeUp} className="mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-gray-900 text-xs font-bold uppercase tracking-widest text-gray-900 bg-white">
                <span className="w-2 h-2 bg-[#e63920] animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={fadeUp} className="mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-[130px] font-black tracking-tighter leading-[0.9] text-gray-900 mb-2 uppercase" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                Sahil <span className="text-[#e63920]">Yogi</span>
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
                <span className="text-xl md:text-3xl font-black text-gray-400 tracking-tighter uppercase" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Node.js Backend Developer</span>
                <div className="hidden md:block h-2 flex-1 max-w-[120px] bg-gray-900" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeUp} className="text-lg md:text-2xl text-gray-600 max-w-2xl leading-relaxed mb-12 font-medium">
              I build scalable backend systems and clean, fast interfaces. Specializing in{' '}
              <span className="text-gray-900 font-bold underline decoration-[#e63920] decoration-4">Node.js</span>,{' '}
              <span className="text-gray-900 font-bold underline decoration-[#e63920] decoration-4">Express.js</span>, and{' '}
              <span className="text-gray-900 font-bold underline decoration-[#e63920] decoration-4">MySQL</span>{' '}
              — shipping robust APIs and enterprise applications that work reliably under pressure.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-16">
              <Link to="/projects">
                <span
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e63920] text-white font-black text-sm uppercase tracking-widest cursor-pointer shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all"
                >
                  View Projects
                </span>
              </Link>
              <Link to="/contact">
                <span
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-4 border-gray-900 text-gray-900 font-black text-sm uppercase tracking-widest cursor-pointer shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all"
                >
                  Let's Talk
                </span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-12 pt-8 border-t-4 border-gray-100">
              {[{ value: '2+', label: 'Years exp.' }, { value: '15+', label: 'Projects shipped' }, { value: '100%', label: 'Uptime focus' }].map(s => (
                <div key={s.label}>
                  <div className="text-4xl font-black text-gray-900 tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{s.value}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="py-24 border-b-8 border-gray-900 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-sm font-bold text-[#e63920] uppercase tracking-widest mb-3">Selected work</div>
                <h2 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Featured Projects</h2>
              </div>
              <Link to="/projects" className="text-sm font-bold text-gray-900 hover:text-[#e63920] transition-colors flex items-center gap-2 uppercase tracking-widest pb-2 border-b-2 border-gray-900 hover:border-[#e63920]">
                All projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredProjects.map((p, i) => {
                const tech = typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : p.tech_stack;
                return (
                  <motion.div key={p.id}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -8 }}
                    className="group bg-[#f8f6f0] border-4 border-gray-900 p-8 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] transition-transform"
                  >
                    <div className="flex items-start justify-between mb-8 border-b-2 border-gray-200 pb-6">
                      <div className="w-12 h-12 bg-white border-2 border-gray-900 flex items-center justify-center text-gray-900 shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div className="flex gap-3">
                        {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#e63920] transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                        </a>}
                        {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#e63920] transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#e63920] transition-colors uppercase tracking-tight">{p.title}</h3>
                    <p className="text-base text-gray-600 font-medium leading-relaxed mb-6 line-clamp-3">{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {(tech || []).slice(0, 4).map(t => (
                        <span key={t} className="text-xs px-3 py-1 bg-white border-2 border-gray-900 font-bold uppercase tracking-widest text-gray-900">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <section className="py-32 bg-[#e63920] border-b-8 border-gray-900">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Have a project in mind?</h2>
            <p className="text-xl md:text-2xl text-[#f8f6f0] font-medium mb-12 max-w-2xl mx-auto">Let's build something great together. I'm currently open for freelance work and full-time roles.</p>
            <Link to="/contact">
              <span 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white border-4 border-gray-900 text-gray-900 font-black text-lg uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all cursor-pointer"
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
