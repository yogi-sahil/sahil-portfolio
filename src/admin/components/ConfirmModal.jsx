import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-sm bg-white border-4 border-gray-900 p-8 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]"
          >
            <div className="w-12 h-12 bg-[#e63920] flex items-center justify-center text-white font-black text-2xl mb-6 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] -rotate-3">
              !
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              {title}
            </h2>
            <p className="font-bold text-sm text-gray-600 mb-8 leading-relaxed">
              {message}
            </p>

            <div className="flex gap-4">
              <button onClick={onCancel} className="flex-1 bg-[#f8f6f0] border-2 border-gray-900 text-gray-900 font-black text-xs uppercase tracking-widest py-3 hover:bg-gray-900 hover:text-white transition-all">
                Cancel
              </button>
              <button onClick={onConfirm} className="flex-1 bg-[#e63920] border-2 border-transparent text-white font-black text-xs uppercase tracking-widest py-3 hover:bg-red-700 transition-all shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
