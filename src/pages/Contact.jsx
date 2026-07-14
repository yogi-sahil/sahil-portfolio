import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import contactMeImg from '../assets/contact-me.png';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-[#f8f6f0] font-sans">
      {/* SECTION 1: Original Contact Hero */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
        
        {/* Decorative Corner Stars (Left) */}
        <div className="absolute top-24 left-8 md:top-32 md:left-12 flex items-center gap-2 text-[#e63920]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5"/></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e63920]/60"><path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5"/></svg>
        </div>

        {/* Decorative Corner Stars (Right) */}
        <div className="absolute top-24 right-8 md:top-32 md:right-12 flex items-center gap-2 text-[#e63920]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e63920]/60"><path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5"/></svg>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5"/></svg>
        </div>

        {/* Bottom Left Corner Text */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-[#e63920] font-semibold tracking-widest text-sm">
          08\2030
        </div>

        {/* Bottom Right Corner Text */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[#e63920] font-semibold tracking-widest text-sm">
          [10]
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
          
          {/* Signature */}
          <motion.div 
            initial={{ opacity: 0, y: -20, rotate: -5 }} 
            animate={{ opacity: 1, y: 0, rotate: -5 }} 
            transition={{ duration: 0.8 }}
            className="absolute -top-10 md:-top-16 left-[15%] md:left-[25%] z-20 text-[#e63920]"
            style={{ fontFamily: "'Caveat', cursive", fontSize: 'clamp(3rem, 5vw, 6rem)' }}
          >
            Sahil Yogi
          </motion.div>

          {/* Large Background Text */}
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.7 }}
            className="text-[#e63920] w-full text-center leading-[0.85]"
            style={{ 
              fontFamily: "'Archivo Black', sans-serif", 
              fontSize: 'clamp(4.5rem, 15vw, 18rem)',
              letterSpacing: '-0.03em',
              margin: 0
            }}
          >
            CONTACT ME
          </motion.h1>

          {/* Person Image */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -bottom-20 md:-bottom-24 left-1/2 -translate-x-1/2 h-[120%] max-h-[85vh] w-full max-w-[500px] pointer-events-none z-10 flex items-end justify-center"
          >
            <img 
              src={contactMeImg} 
              alt="Sahil Yogi" 
              className="h-full object-contain object-bottom drop-shadow-[15px_15px_0px_rgba(17,24,39,0.1)]"
            />
          </motion.div>

          {/* Email and Phone Blocks */}
          <div className="absolute top-1/2 md:top-[60%] -translate-y-1/2 w-full flex justify-between px-2 md:px-8 z-20 pointer-events-none">
            
            {/* Left: Email */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-1 pointer-events-auto bg-[#f8f6f0]/80 backdrop-blur-sm p-4 rounded-xl"
            >
              <h3 className="text-[#e63920] font-bold tracking-widest text-lg md:text-2xl uppercase">EMAIL:</h3>
              <a href="mailto:yogi.sahil.dev@gmail.com" className="text-[#e63920] font-medium tracking-wide text-sm md:text-xl hover:opacity-70 transition-opacity">
                yogi.sahil.dev@gmail.com
              </a>
            </motion.div>

            {/* Right: Phone */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-1 items-end pointer-events-auto bg-[#f8f6f0]/80 backdrop-blur-sm p-4 rounded-xl"
            >
              <h3 className="text-[#e63920] font-bold tracking-widest text-lg md:text-2xl uppercase">PHONE</h3>
              <a href="tel:+919571844068" className="text-[#e63920] font-medium tracking-wide text-sm md:text-xl hover:opacity-70 transition-opacity">
                +91 95718 44068
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Form Section */}
      <section className="min-h-screen py-32 bg-[#f8f6f0] border-t-8 border-gray-900 relative overflow-hidden flex flex-col justify-center">
        
        {/* Decorative Corner SVGs for Section 2 */}
        <div className="absolute top-24 left-8 md:top-32 md:left-12 flex items-center gap-2 text-gray-900">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5"/></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900/40"><path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5"/></svg>
        </div>
        <div className="absolute top-24 right-8 md:top-32 md:right-12 flex items-center gap-2 text-gray-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900/40"><path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5"/></svg>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5"/></svg>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center">
          
          {/* Massive Typography Header matching Section 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center w-full mb-16 relative"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20, rotate: 5 }} 
              whileInView={{ opacity: 1, y: 0, rotate: 5 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -top-12 md:-top-16 left-[50%] md:left-[60%] -translate-x-[50%] z-20 text-gray-900"
              style={{ fontFamily: "'Caveat', cursive", fontSize: 'clamp(3rem, 5vw, 6rem)' }}
            >
              Direct to inbox
            </motion.div>
            <h2 className="text-[#e63920] w-full text-center leading-[0.85] uppercase tracking-tighter"
              style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(3rem, 12vw, 12rem)', letterSpacing: '-0.03em', margin: 0 }}>
              DROP A LINE
            </h2>
          </motion.div>

          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-center">
            
            {/* Form Side */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }} 
              className="w-full"
            >
              <div className="bg-white border-4 border-gray-900 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]">
                
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-100 border-4 border-green-500 p-8 text-center shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
                    <div className="text-5xl mb-4">✨</div>
                    <h3 className="text-3xl font-black text-green-700 uppercase tracking-tighter mb-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Transmission Sent</h3>
                    <p className="text-green-800 font-bold uppercase tracking-widest text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                    {status === 'error' && (
                      <div className="bg-red-100 border-4 border-red-500 p-4 font-bold text-red-700 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
                        {errorMessage}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="flex flex-col gap-2 group relative">
                        <label className="text-xs font-black text-gray-900 uppercase tracking-widest absolute -top-3 left-4 bg-white px-2 border-2 border-gray-900 z-10">Name</label>
                        <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe"
                          className="w-full bg-[#f8f6f0] border-4 border-gray-900 text-gray-900 font-bold px-4 pt-5 pb-4 outline-none focus:-translate-y-1 focus:translate-x-1 focus:shadow-[-6px_6px_0px_0px_rgba(230,57,32,1)] transition-all placeholder:text-gray-400" />
                      </div>
                      
                      <div className="flex flex-col gap-2 group relative">
                        <label className="text-xs font-black text-gray-900 uppercase tracking-widest absolute -top-3 left-4 bg-white px-2 border-2 border-gray-900 z-10">Email</label>
                        <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@example.com"
                          className="w-full bg-[#f8f6f0] border-4 border-gray-900 text-gray-900 font-bold px-4 pt-5 pb-4 outline-none focus:-translate-y-1 focus:translate-x-1 focus:shadow-[-6px_6px_0px_0px_rgba(230,57,32,1)] transition-all placeholder:text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 group relative">
                      <label className="text-xs font-black text-gray-900 uppercase tracking-widest absolute -top-3 left-4 bg-white px-2 border-2 border-gray-900 z-10">Message</label>
                      <textarea required rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="What's on your mind?"
                        className="w-full bg-[#f8f6f0] border-4 border-gray-900 text-gray-900 font-bold px-4 pt-5 pb-4 outline-none resize-none focus:-translate-y-1 focus:translate-x-1 focus:shadow-[-6px_6px_0px_0px_rgba(230,57,32,1)] transition-all placeholder:text-gray-400" />
                    </div>

                    <button type="submit" disabled={status === 'loading'}
                      className="mt-4 w-full bg-[#e63920] border-4 border-gray-900 text-white font-black text-xl uppercase tracking-widest py-5 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                      {status === 'loading' ? 'Transmitting...' : 'Send Message'}
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Brutalist Phone Mockup Side */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="hidden lg:flex justify-center"
            >
              {/* Phone Container */}
              <div className="relative w-[320px] h-[640px] bg-white border-8 border-gray-900 rounded-[3rem] shadow-[16px_16px_0px_0px_rgba(17,24,39,1)] p-4 flex flex-col overflow-hidden">
                
                {/* Notch / Speaker */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl flex items-center justify-center gap-2">
                  <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                </div>

                {/* Status Bar */}
                <div className="flex justify-between items-center text-gray-900 font-bold text-[10px] mt-4 px-2 tracking-widest uppercase">
                  <span>9:41 AM</span>
                  <div className="flex gap-1 items-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4 11h-8v-2h8v2z"/></svg>
                    <span>100%</span>
                  </div>
                </div>

                {/* Contact UI inside phone */}
                <div className="flex flex-col items-center flex-1 mt-12">
                  {/* Avatar */}
                  <div className="w-24 h-24 bg-[#e63920] border-4 border-gray-900 rounded-full flex items-center justify-center text-white text-4xl font-black mb-4 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                    S
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Sahil Yogi</h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">Full-Stack Dev</p>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3 w-full mb-8 px-2">
                    <a href="tel:+919571844068" className="flex flex-col items-center gap-2 group">
                      <div className="w-14 h-14 bg-[#f8f6f0] border-4 border-gray-900 rounded-full flex items-center justify-center text-gray-900 group-hover:bg-[#e63920] group-hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      </div>
                      <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Call</span>
                    </a>
                    
                    <a href="mailto:yogi.sahil.dev@gmail.com" className="flex flex-col items-center gap-2 group">
                      <div className="w-14 h-14 bg-[#f8f6f0] border-4 border-gray-900 rounded-full flex items-center justify-center text-gray-900 group-hover:bg-[#e63920] group-hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      </div>
                      <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Mail</span>
                    </a>

                    <div className="flex flex-col items-center gap-2 group cursor-not-allowed opacity-50">
                      <div className="w-14 h-14 bg-[#f8f6f0] border-4 border-gray-900 rounded-full flex items-center justify-center text-gray-900 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                      </div>
                      <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Video</span>
                    </div>
                  </div>

                  {/* Number Display inside phone */}
                  <div className="w-full bg-[#f8f6f0] border-4 border-gray-900 p-4 mb-4">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Mobile</span>
                    <a href="tel:+919571844068" className="text-sm font-black text-gray-900 tracking-widest">+91 95718 44068</a>
                  </div>
                  
                  <div className="w-full bg-[#f8f6f0] border-4 border-gray-900 p-4">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Email</span>
                    <a href="mailto:yogi.sahil.dev@gmail.com" className="text-sm font-black text-gray-900 tracking-tight truncate block">yogi.sahil.dev@gmail.com</a>
                  </div>

                </div>

                {/* Home Indicator */}
                <div className="mt-auto pt-4 flex justify-center">
                  <div className="w-1/3 h-1.5 bg-gray-900 rounded-full"></div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
