import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/experience').then(r => { setExperiences(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <span className="font-black text-[#e63920] text-sm tracking-widest">04.</span>
            <span className="h-1 w-12 bg-gray-900" />
            <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">career_log</span>
          </div>
          <h1 className="font-black text-6xl md:text-8xl lg:text-9xl text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            EXP<span className="text-[#e63920]">ERIENCE</span>
          </h1>
          <p className="font-medium text-lg text-gray-600 mt-6 max-w-xl leading-relaxed border-l-4 border-[#e63920] pl-4">
            Every role. Every battle. Every system I was part of building.
          </p>
        </motion.div>

        {loading ? (
          <div className="w-full h-32 flex items-center justify-center border-4 border-gray-900 bg-white shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
            <p className="font-black text-gray-900 text-lg uppercase tracking-widest animate-pulse">Loading career log...</p>
          </div>
        ) : (
          <div className="relative">
            {/* Main Timeline Line */}
            <div className="absolute left-6 md:left-[2.5rem] top-0 bottom-0 w-1.5 bg-gray-900" />
            
            <div className="space-y-16 pl-16 md:pl-24">
              {experiences.map((exp, i) => {
                const bullets = typeof exp.bullets === 'string' ? JSON.parse(exp.bullets) : exp.bullets;
                return (
                  <motion.div key={exp.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }} className="relative">
                    
                    {/* Timeline Node */}
                    <div className="absolute -left-11 md:-left-[4.5rem] top-2 w-6 h-6 border-4 border-gray-900 bg-white shadow-[4px_4px_0px_0px_rgba(230,57,32,1)]" />
                    
                    <div className="bg-white border-4 border-gray-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(17,24,39,1)] transition-all group">
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                        <div className="flex flex-col">
                          <h3 className="font-black text-3xl md:text-4xl text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{exp.role}</h3>
                          <div className="font-bold text-xl text-[#e63920] uppercase tracking-widest mt-1">@ {exp.company}</div>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end gap-2">
                          <span className="font-black text-lg text-gray-400 uppercase tracking-tighter">{exp.duration}</span>
                          <span className="px-3 py-1 bg-[#f8f6f0] border-2 border-gray-900 text-gray-900 font-bold text-xs uppercase tracking-widest">{exp.type}</span>
                        </div>
                      </div>

                      <ul className="space-y-4 mt-8">
                        {bullets.map((b, j) => (
                          <motion.li key={j} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + j * 0.1 }} className="flex items-start space-x-3 text-gray-700 text-base font-medium">
                            <span className="text-[#e63920] shrink-0 mt-0.5 font-black text-xl">▸</span>
                            <span>{b}</span>
                          </motion.li>
                        ))}
                      </ul>

                    </div>
                  </motion.div>
                );
              })}
              
              {/* Future slot */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative mt-24">
                <div className="absolute -left-11 md:-left-[4.5rem] top-1 w-6 h-6 border-4 border-[#e63920] bg-white animate-pulse" />
                <div className="font-black text-2xl text-[#e63920] uppercase tracking-tighter">YOUR_COMPANY — NEXT</div>
                <div className="font-bold text-gray-400 text-sm mt-2 tracking-widest uppercase">&gt; awaiting connection...</div>
              </motion.div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
