import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="flex flex-col items-center gap-2 select-none"
      aria-label="Scroll down"
    >
      {/* Label */}
      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em] rotate-0">
        scroll
      </span>

      {/* Animated line + dot */}
      <div className="relative flex flex-col items-center w-px h-14">
        {/* Static track */}
        <div className="absolute inset-0 bg-white/5 rounded-full" />
        {/* Animated fill */}
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full origin-top"
          style={{ background: 'linear-gradient(to bottom, #6366f1, transparent)' }}
          animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1], times: [0, 0.4, 0.6, 1] }}
        >
          <div className="w-px h-14 " />
        </motion.div>
      </div>

      {/* Bouncing chevron */}
      <motion.svg
        width="12" height="8" viewBox="0 0 12 8" fill="none"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-slate-600"
      >
        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </motion.div>
  );
}
