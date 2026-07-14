import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SideDrawer({ isOpen, onClose, title, children }) {
  // Prevent scrolling on body when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[90]"
          />
          
          {/* Drawer - Modern Clean Style */}
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-[100] flex flex-col rounded-none sm:rounded-l-2xl overflow-hidden border-l-8 border-gray-900"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 sm:px-8 py-6 border-b-8 border-gray-900 bg-white shrink-0 z-10">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                {title}
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 border-4 border-transparent hover:border-gray-900 flex items-center justify-center text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="relative flex-1 overflow-y-auto px-8 py-6 bg-gray-50">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
