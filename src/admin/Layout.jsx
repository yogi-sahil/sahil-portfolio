import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ChangePasswordModal from './ChangePasswordModal';
import api from '../api';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', end: true, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
  { to: '/admin/projects', label: 'Projects', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { to: '/admin/skills', label: 'Skills', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
  { to: '/admin/experience', label: 'Experience', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { to: '/admin/blog', label: 'Blog', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg> },
  { to: '/admin/resume', label: 'Resume', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
  { to: '/admin/messages', label: 'Messages', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { to: '/admin/gear', label: 'Gear', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
];

export const SearchContext = createContext({ search: '', setSearch: () => {} });
export const useSearch = () => useContext(SearchContext);

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const [search, setSearch] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [adminUser, setAdminUser] = useState({ username: 'Admin' });

  const logout = () => { localStorage.removeItem('admin_token'); navigate('/admin/login'); };

  const currentPage = NAV_ITEMS.find(i => i.end ? location.pathname === i.to : location.pathname.startsWith(i.to));

  // Fetch dynamic header data
  useEffect(() => {
    // Get user profile
    api.post('/auth/verify').then(res => {
      if (res.data.success && res.data.admin) {
        setAdminUser(res.data.admin);
      }
    }).catch(() => {});

    // Get unread messages
    api.get('/contact/messages').then(res => {
      if (res.data.success) {
        const unread = res.data.data.filter(m => !m.is_read).length;
        setUnreadCount(unread);
      }
    }).catch(() => {});
    
    // Auto-close mobile menu on navigation
    setMobileMenuOpen(false);
  }, [location.pathname]); // Refresh on navigation

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <div className="h-screen flex bg-[#f8f6f0] font-sans selection:bg-[#e63920] selection:text-white overflow-hidden relative">
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-gray-900/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
        )}

        {/* Sidebar */}
        <motion.aside
          animate={{ width: typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : (collapsed ? 100 : 280) }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`shrink-0 flex flex-col border-r-8 border-gray-900 bg-white z-50 fixed md:relative h-full transition-transform duration-300 md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b-4 border-gray-900 h-24">
            <AnimatePresence mode="wait">
              {!collapsed ? (
                <motion.div key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e63920] flex items-center justify-center text-white font-black text-2xl -rotate-3 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]">S</div>
                  <div className="flex flex-col">
                    <span className="font-black text-gray-900 uppercase tracking-tighter leading-none text-2xl" style={{ fontFamily: "'Archivo Black', sans-serif" }}>CMS</span>
                    <span className="font-bold text-[10px] text-gray-500 uppercase tracking-widest mt-1 leading-none">ADMIN PANEL</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
                  <div className="w-10 h-10 bg-[#e63920] flex items-center justify-center text-white font-black text-2xl -rotate-3 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]">S</div>
                </motion.div>
              )}
            </AnimatePresence>
            {!collapsed && (
              <button onClick={() => setCollapsed(true)} className="hidden md:flex w-8 h-8 items-center justify-center border-2 border-transparent hover:border-gray-900 transition-colors text-gray-900 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
              </button>
            )}
            {/* Close Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(false)} className="md:hidden w-8 h-8 flex items-center justify-center border-2 border-transparent hover:border-gray-900 transition-colors text-gray-900 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Collapsed Toggle (when collapsed) */}
          {collapsed && (
            <button onClick={() => setCollapsed(false)} className="w-full flex items-center justify-center py-4 border-b-4 border-gray-900 text-gray-900 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
            </button>
          )}

          {/* Nav */}
          <nav className="flex-1 py-6 space-y-2 overflow-y-auto overflow-x-visible px-4">
            {NAV_ITEMS.map(item => (
              <div key={item.to} className="relative group/nav">
                <NavLink to={item.to} end={item.end}
                  className={({ isActive }) =>
                    `flex items-center ${collapsed ? 'justify-center w-14 h-14 mx-auto' : 'gap-4 px-4 py-4'} font-bold text-sm uppercase tracking-widest transition-all group border-4 ${
                      isActive
                        ? 'border-gray-900 bg-[#f8f6f0] text-gray-900 shadow-[6px_6px_0px_0px_rgba(230,57,32,1)]'
                        : 'border-transparent text-gray-500 hover:border-gray-900 hover:text-gray-900'
                    }`
                  }>
                  {({ isActive }) => (
                    <>
                      <div className="relative">
                        <span className={`shrink-0 ${isActive ? 'text-[#e63920]' : 'text-gray-400 group-hover:text-gray-900'}`}>
                          {item.icon}
                        </span>
                        {/* Dynamic Notification Badge for Messages */}
                        {item.label === 'Messages' && unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#e63920] border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      {!collapsed && (
                        <div className="flex-1 flex justify-between items-center truncate">
                          <span>{item.label}</span>
                          {item.label === 'Messages' && unreadCount > 0 && (
                            <span className="bg-[#e63920] text-white text-[10px] px-2 py-0.5 ml-2 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]">{unreadCount}</span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
                {collapsed && (
                  <div className="absolute left-[80px] top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white font-black text-xs uppercase tracking-widest opacity-0 group-hover/nav:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-[4px_4px_0px_0px_rgba(230,57,32,1)]">
                    {item.label} {item.label === 'Messages' && unreadCount > 0 ? `(${unreadCount})` : ''}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className={`pb-6 pt-4 border-t-4 border-gray-900 space-y-2 ${collapsed ? 'px-2' : 'px-4'}`}>
            <a href="/" target="_blank" rel="noreferrer" title="View Site"
              className={`flex items-center ${collapsed ? 'justify-center w-14 h-14 mx-auto' : 'gap-4 px-4 py-3'} font-bold text-sm text-gray-500 uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 border-4 border-transparent transition-all group relative`}>
              <svg className="w-6 h-6 shrink-0 group-hover:text-[#e63920]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {!collapsed && <span>View Site</span>}
            </a>
            <button onClick={() => setIsChangePasswordOpen(true)} title="Password"
              className={`w-full flex items-center ${collapsed ? 'justify-center w-14 h-14 mx-auto' : 'gap-4 px-4 py-3'} font-bold text-sm text-gray-500 uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 border-4 border-transparent transition-all group`}>
              <svg className="w-6 h-6 shrink-0 group-hover:text-[#e63920]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              {!collapsed && <span>Password</span>}
            </button>
            <button onClick={logout} title="Logout"
              className={`w-full flex items-center ${collapsed ? 'justify-center w-14 h-14 mx-auto' : 'gap-4 px-4 py-3'} font-bold text-sm text-[#e63920] uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all border-4 border-transparent group`}>
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </motion.aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Background Graphic */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
             <div className="text-[25vw] font-black text-gray-900 leading-none whitespace-nowrap pt-20" style={{ fontFamily: "'Archivo Black', sans-serif" }}>ADMIN</div>
          </div>

          {/* Top bar (Advanced) */}
          <header className="h-24 flex items-center justify-between px-4 sm:px-10 border-b-8 border-gray-900 bg-white shrink-0 z-10 relative">
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger */}
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-gray-900 border-2 border-transparent hover:border-gray-900 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <span className="hidden sm:inline text-lg font-black text-gray-900 uppercase tracking-widest">ADMIN /</span>
              <span className="text-sm sm:text-lg font-black text-[#e63920] uppercase tracking-widest truncate max-w-[150px] sm:max-w-none">{currentPage?.label}</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-8">
              {/* Dynamic Search Bar */}
              <div className={`hidden md:flex items-center border-4 ${searchFocused ? 'border-[#e63920] shadow-[4px_4px_0px_0px_rgba(230,57,32,1)]' : 'border-gray-900'} bg-[#f8f6f0] px-4 py-2 transition-all`}>
                <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SEARCH..." 
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="bg-transparent border-none outline-none text-sm font-bold text-gray-900 placeholder-gray-400 uppercase tracking-widest w-48"
                />
              </div>

              {/* Dynamic Notifications */}
              <button onClick={() => navigate('/admin/messages')} className="relative w-12 h-12 border-4 border-gray-900 flex items-center justify-center text-gray-900 hover:bg-[#f8f6f0] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#e63920] border-2 border-gray-900 rounded-full animate-bounce"></span>
                )}
              </button>

              {/* Profile Area */}
              <div className="flex items-center gap-4 border-l-4 border-gray-900 pl-8">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">{adminUser.username}</span>
                  <span className="text-[10px] font-bold text-[#e63920] uppercase tracking-widest mt-0.5">Super Admin</span>
                </div>
                <button className="w-12 h-12 bg-gray-900 flex items-center justify-center text-white text-lg font-black shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase">
                  {adminUser.username.substring(0, 2)}
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-10 z-10 relative">
            <Outlet />
          </main>
        </div>

        {/* Modals */}
        <ChangePasswordModal isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
      </div>
    </SearchContext.Provider>
  );
}
