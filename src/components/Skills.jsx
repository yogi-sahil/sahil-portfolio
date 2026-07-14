import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Node.js', category: 'BACKEND', level: 90 },
  { name: 'Express.js', category: 'BACKEND', level: 85 },
  { name: 'MySQL', category: 'DATABASE', level: 80 },
  { name: 'React', category: 'FRONTEND', level: 88 },
  { name: 'JavaScript', category: 'LANGUAGE', level: 92 },
  { name: 'Tailwind CSS', category: 'STYLING', level: 90 },
  { name: 'GSAP', category: 'ANIMATION', level: 70 },
  { name: 'Three.js', category: '3D', level: 65 },
  { name: 'REST APIs', category: 'ARCHITECTURE', level: 88 },
  { name: 'Git/GitHub', category: 'TOOLS', level: 85 },
];

function Skills() {
  return (
    <section id="skills" className="py-28 relative">
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
            <span className="font-mono text-[#00FF41] text-sm">02.</span>
            <span className="h-px w-12 bg-[#00FF41]" />
            <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">system_specs</span>
          </div>
          <h2 className="font-mono font-black text-4xl md:text-6xl text-white uppercase">
            TECH<span className="text-[#FF003C]">_</span>STACK
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ x: 5 }}
              className="flex items-center space-x-4 p-4 border border-white/5 hover:border-[#00FF41]/30 transition-colors group"
            >
              <div className="w-32 shrink-0">
                <div className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-1">{skill.category}</div>
                <div className="font-mono font-bold text-white group-hover:text-[#00FF41] transition-colors">{skill.name}</div>
              </div>

              <div className="flex-1 flex items-center space-x-3">
                {/* Bar */}
                <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                    style={{ originX: 0, width: `${skill.level}%` }}
                    className="absolute inset-y-0 left-0 h-full bg-[#00FF41]"
                  />
                </div>
                <span className="font-mono text-xs text-gray-600 w-10 text-right">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
