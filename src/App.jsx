import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Public pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Gear from './pages/Gear';

// Admin pages
import AdminLogin from './admin/Login';
import ForgotPassword from './admin/ForgotPassword';
import ResetPassword from './admin/ResetPassword';
import AdminLayout from './admin/Layout';
import Dashboard from './admin/Dashboard';
import ManageProjects from './admin/ManageProjects';
import ManageSkills from './admin/ManageSkills';
import ManageExperience from './admin/ManageExperience';
import ManageBlog from './admin/ManageBlog';
import ManageResume from './admin/ManageResume';
import Messages from './admin/Messages';
import ManageGear from './admin/ManageGear';

// Wrapper to conditionally show public layout
function PublicLayout() {
  return (
    <div className="relative min-h-screen bg-[#f8f6f0] text-gray-900 font-sans selection:bg-[#e63920] selection:text-white">
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gear" element={<Gear />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Login & Reset — no public layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

        {/* Admin Panel — protected, its own layout */}
        <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="experience" element={<ManageExperience />} />
          <Route path="blog" element={<ManageBlog />} />
          <Route path="resume" element={<ManageResume />} />
          <Route path="messages" element={<Messages />} />
          <Route path="gear" element={<ManageGear />} />
        </Route>

        {/* Public site — with Navbar, WireframeBackground, Footer */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;