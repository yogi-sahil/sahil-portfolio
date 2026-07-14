import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: '001',
    title: 'E-COMMERCE PLATFORM',
    status: 'DEPLOYED',
    description: 'Full-stack e-commerce engine. Built with Node.js & MySQL backend. React frontend with cart, payments, and admin dashboard. Handles 1000+ concurrent users.',
    tech: ['Node.js', 'React', 'MySQL', 'Stripe'],
    link: '#',
  },
  {
    id: '002',
    title: 'REAL-TIME CHAT SYSTEM',
    status: 'LIVE',
    description: 'Socket.io-powered messaging platform. Real-time delivery, online status indicators, typing signals, and persistent message history.',
    tech: ['React', 'Express', 'Socket.io', 'MongoDB'],
    link: '#',
  },
  {
    id: '003',
    title: 'API GATEWAY SERVICE',
    status: 'PROD',
    description: 'Centralized RESTful API gateway with JWT auth, rate limiting, and request validation. Serves multiple microservices.',
    tech: ['Node.js', 'Express', 'JWT', 'MySQL'],
    link: '#',
  },
];

function Projects() {
  return (
    <section id="projects" className="py-28 relative">
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
            <span className="font-mono text-[#00FF41] text-sm">03.</span>
            <span className="h-px w-12 bg-[#00FF41]" />
            <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">selected_work</span>
          </div>
          <h2 className="font-mono font-black text-4xl md:text-6xl text-white uppercase">
            PROJ<span className="text-[#FF003C]">_</span>ECTS
          </h2>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-0">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border-b border-white/10 py-10 cursor-pointer hover:bg-white/[0.02] transition-colors px-4"
              whileHover={{ x: 8 }}
            >
              <div className="grid md:grid-cols-[100px_1fr_auto] gap-6 items-start">
                {/* ID */}
                <div>
                  <span className="font-mono text-xs text-gray-700">#{project.id}</span>
                  <div className="mt-2">
                    <span
                      className={`font-mono text-xs uppercase tracking-widest px-2 py-1 ${
                        project.status === 'DEPLOYED'
                          ? 'text-[#00FF41] border border-[#00FF41]/30'
                          : project.status === 'LIVE'
                          ? 'text-[#FF003C] border border-[#FF003C]/30'
                          : 'text-gray-400 border border-white/10'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-mono font-black text-2xl md:text-3xl text-white group-hover:text-[#00FF41] transition-colors mb-3 uppercase">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-xs text-gray-600 uppercase tracking-widest border border-white/10 px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  className="text-gray-700 group-hover:text-[#00FF41] transition-colors hidden md:block"
                  animate={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See more */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(0,255,65,0.2)' }}
            className="font-mono text-xs uppercase tracking-widest px-8 py-3 border border-white/20 text-gray-400 hover:border-[#00FF41] hover:text-[#00FF41] transition-all inline-block"
          >
            ./ls -la projects/
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
