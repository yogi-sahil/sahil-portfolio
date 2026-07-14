import React from 'react';
import { motion } from 'framer-motion';
import Orbit3D from './Orbit3D';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-grid overflow-hidden pt-20">

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)',
        }}
      />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left: Text Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          {/* Status Badge */}
          <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
            <span className="font-mono text-xs text-[#00FF41] uppercase tracking-[0.3em]">
              SYS:ONLINE &mdash; AVAILABLE FOR HIRE
            </span>
          </motion.div>

          {/* Name with glitch */}
          <motion.h1
            variants={fadeUp}
            className="glitch-text font-mono font-black text-6xl md:text-8xl text-white leading-none mb-4 uppercase"
            data-text="SAHIL"
          >
            SAHIL
          </motion.h1>

          <motion.div variants={fadeUp} className="flex items-center space-x-4 mb-6">
            <span className="font-mono text-lg md:text-2xl text-gray-400 uppercase tracking-widest">
              YOGI
            </span>
            <span className="h-px flex-1 bg-[#FF003C]" />
            <span className="font-mono text-[#FF003C] text-sm uppercase tracking-widest">
              FULL_STACK
            </span>
          </motion.div>

          {/* Terminal-style bio */}
          <motion.div
            variants={fadeUp}
            className="font-mono text-sm text-gray-500 border-l-2 border-[#00FF41] pl-4 mb-10 leading-7"
          >
            <span className="text-[#00FF41]">$</span> cat bio.txt
            <br />
            <span className="text-gray-300">
              Software Developer. Node.js | Express | MySQL | React.
            </span>
            <br />
            <span className="text-gray-300">
              Building systems that don't break under pressure.
            </span>
            <br />
            <span className="text-[#00FF41] animate-pulse">█</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0,255,65,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="font-mono text-sm uppercase tracking-widest px-8 py-3 bg-[#00FF41] text-black font-bold hover:bg-white transition-colors"
            >
              ./view-projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(255,0,60,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="font-mono text-sm uppercase tracking-widest px-8 py-3 border border-white/20 text-white hover:border-[#FF003C] hover:text-[#FF003C] transition-colors"
            >
              ./contact-me
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: '2+', label: 'YRS EXP' },
              { value: '15+', label: 'PROJECTS' },
              { value: '99%', label: 'UPTIME' },
            ].map((s) => (
              <div key={s.label} className="text-center border-t border-white/10 pt-4">
                <div className="font-mono font-black text-2xl text-[#00FF41]">{s.value}</div>
                <div className="font-mono text-xs text-gray-600 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D Orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-[500px] md:h-[600px] relative"
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00FF41]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00FF41]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00FF41]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00FF41]" />
          <Orbit3D />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
      >
        <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">SCROLL_DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-[#00FF41]"
        />
      </motion.div>
    </section>
  );
}

export default Hero;