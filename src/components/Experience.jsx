import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'SOFTWARE DEVELOPER',
    company: 'Tech Solutions Inc.',
    duration: '2023 — PRESENT',
    type: 'FULL_TIME',
    bullets: [
      'Architected RESTful APIs serving 50k+ requests/day with Node.js + Express.',
      'Reduced query latency by 40% through MySQL indexing and query optimization.',
      'Built React frontend apps with real-time data via WebSocket integration.',
    ],
  },
  {
    role: 'BACKEND INTERN',
    company: 'Startup Co.',
    duration: '2022 — 2023',
    type: 'INTERNSHIP',
    bullets: [
      'Developed core CRUD APIs for an e-commerce platform.',
      'Collaborated with frontend engineers on API contract design.',
      'Implemented JWT authentication and role-based access control.',
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center space-x-4 mb-3">
            <span className="font-mono text-[#00FF41] text-sm">04.</span>
            <span className="h-px w-12 bg-[#00FF41]" />
            <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">career_log</span>
          </div>
          <h2 className="font-mono font-black text-4xl md:text-6xl text-white uppercase">
            EXP<span className="text-[#FF003C]">_</span>ERIENCE
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-16 pl-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot on timeline */}
                <div className="absolute -left-[2.65rem] top-1 w-3 h-3 border border-[#00FF41] bg-[#050505]" />

                {/* Year label */}
                <div className="font-mono text-xs text-gray-700 mb-3 flex items-center space-x-4">
                  <span>{exp.duration}</span>
                  <span className="px-2 py-0.5 border border-white/10 text-gray-600 uppercase tracking-widest">{exp.type}</span>
                </div>

                <h3 className="font-mono font-black text-2xl md:text-3xl text-white uppercase mb-1">
                  {exp.role}
                </h3>
                <div className="font-mono text-[#00FF41] text-sm uppercase tracking-widest mb-6">
                  @ {exp.company}
                </div>

                <ul className="space-y-3">
                  {exp.bullets.map((b, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + j * 0.1 }}
                      className="flex items-start space-x-3 text-gray-400 text-sm"
                    >
                      <span className="text-[#00FF41] shrink-0 mt-1">▸</span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Future entry */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[2.65rem] top-1 w-3 h-3 border border-[#FF003C] bg-[#050505] animate-pulse" />
              <div className="font-mono text-xs text-[#FF003C] uppercase tracking-widest">
                YOUR_COMPANY — NEXT
              </div>
              <div className="font-mono text-gray-700 text-sm mt-1">
                &gt; awaiting connection...
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
