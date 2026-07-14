import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/skills').then(r => { setSkills(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section className="min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <span className="font-black text-[#e63920] text-sm tracking-widest">02.</span>
            <span className="h-1 w-12 bg-gray-900" />
            <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">system_specs</span>
          </div>
          <h1 className="font-black text-6xl md:text-8xl lg:text-9xl text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            TECH<span className="text-[#e63920]">_</span>STACK
          </h1>
          <p className="font-medium text-lg text-gray-600 mt-6 max-w-xl leading-relaxed border-l-4 border-gray-900 pl-4">
            All tools, frameworks, and languages in my arsenal. Sorted by category. No fluff.
          </p>
        </motion.div>

        {loading ? (
          <div className="w-full h-32 flex items-center justify-center border-4 border-gray-900 bg-white shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
            <p className="font-black text-gray-900 text-lg uppercase tracking-widest animate-pulse">Loading specs...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(grouped).map(([category, items], ci) => (
              <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }}>
                
                <h3 className="font-black text-2xl text-gray-900 uppercase tracking-widest mb-8 flex items-center space-x-4 bg-white border-2 border-gray-900 p-4 shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] w-fit">
                  <span>{category}</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {items.map((skill, i) => (
                    <motion.div key={skill.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }} whileHover={{ x: 4, y: -4 }}
                      className="group flex flex-col justify-center p-6 bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] hover:shadow-[10px_10px_0px_0px_rgba(230,57,32,1)] transition-all">
                      
                      <div className="flex justify-between items-end mb-4">
                        <div className="font-black text-2xl text-gray-900 uppercase tracking-tighter">{skill.name}</div>
                        <span className="font-bold text-lg text-[#e63920]">{skill.level}%</span>
                      </div>
                      
                      <div className="w-full h-4 bg-gray-100 border-2 border-gray-900 relative overflow-hidden">
                        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                          style={{ originX: 0, width: `${skill.level}%` }}
                          className="absolute inset-y-0 left-0 h-full bg-gray-900 group-hover:bg-[#e63920] transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
