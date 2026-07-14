import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import api from "../api";

const navLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "Blog", to: "/blog" },
  { label: "Setup", to: "/gear" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) { setHidden(false); setScrolled(false); lastY.current = y; return; }
      setScrolled(true);
      setHidden(y > lastY.current && y > 100);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    api.get('/resume').then(r => {
      if (r.data.data?.has_resume) {
        setResumeUrl(r.data.data.type === 'file'
          ? 'http://localhost:5001/api/resume/download'
          : r.data.data.external_url);
      }
    }).catch(() => {});
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f8f6f0] border-b border-black/10 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#e63920] flex items-center justify-center text-white text-xs font-black group-hover:scale-110 transition-transform shadow-md">
            S
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 leading-none tracking-tight">Sahil Yogi</div>
            <div className="text-[10px] text-[#e63920] font-mono tracking-widest uppercase leading-none mt-0.5">Full-Stack Dev</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link, i) => (
            <motion.div key={link.to} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-[#e63920]'
                      : 'text-gray-900 hover:text-[#e63920]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#e63920]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {resumeUrl ? (
            <motion.a
              href={resumeUrl} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-[#e63920] rounded-none transition-colors shadow-sm uppercase tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </motion.a>
          ) : (
            <span className="px-5 py-2.5 text-sm font-bold text-gray-400 border-2 border-gray-200 uppercase tracking-wider cursor-not-allowed">Resume</span>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:bg-black/5 rounded-none transition-colors">
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="w-6 h-0.5 bg-gray-900 block origin-center" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-gray-900 block" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="w-6 h-0.5 bg-gray-900 block origin-center" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f8f6f0] border-t border-black/10 overflow-hidden shadow-lg"
          >
            <div className="container mx-auto px-6 py-4 space-y-1">
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                      isActive ? 'text-[#e63920] bg-[#e63920]/10' : 'text-gray-900 hover:text-[#e63920] hover:bg-black/5'
                    }`
                  }>
                  {link.label}
                </NavLink>
              ))}
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}
                  className="block px-4 py-4 mt-4 text-sm font-bold text-white bg-gray-900 text-center uppercase tracking-wider hover:bg-[#e63920] transition-colors">
                  Download Resume
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;