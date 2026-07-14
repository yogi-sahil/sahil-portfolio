import React, { useEffect, useState } from 'react';
import api from '../api';
import SideDrawer from './components/SideDrawer';
import ConfirmModal from './components/ConfirmModal';
import { useSearch } from './Layout';

const STATUSES = ['WIP', 'DEPLOYED', 'LIVE', 'PROD', 'ARCHIVED'];
const EMPTY_FORM = { title: '', description: '', tech_stack: '', status: 'WIP', github_url: '', live_url: '', featured: false, sort_order: 0 };

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  
  const [deleteId, setDeleteId] = useState(null);
  const { search } = useSearch();

  const fetch = () => api.get('/projects').then(r => { setProjects(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY_FORM); setShowForm(true); setMsg(''); };
  const openEdit = (p) => {
    setEditItem(p);
    const tech = typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : p.tech_stack;
    setForm({ title: p.title, description: p.description, tech_stack: tech.join(', '), status: p.status, github_url: p.github_url || '', live_url: p.live_url || '', featured: p.featured, sort_order: p.sort_order });
    setShowForm(true); setMsg('');
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setMsg('');
    const payload = { ...form, tech_stack: form.tech_stack.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editItem) await api.put(`/projects/${editItem.id}`, payload);
      else await api.post('/projects', payload);
      setMsg('SUCCESS'); setShowForm(false); fetch();
    } catch (err) { setMsg('ERROR: ' + (err.response?.data?.message || 'Save failed.')); }
    finally { setSaving(false); }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await api.delete(`/projects/${deleteId}`);
    setDeleteId(null);
    fetch();
  };

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));

  // Modern input classes
  const inputClass = "w-full h-11 bg-white border border-gray-200 rounded-lg text-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <div className="font-bold text-sm text-[#e63920] uppercase tracking-widest mb-2">CMS / Projects</div>
          <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Manage Projects</h1>
        </div>
        <button onClick={openAdd} className="bg-gray-900 text-white font-black text-sm uppercase tracking-widest px-8 py-4 shadow-[6px_6px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all">
          + Add Project
        </button>
      </div>

      {msg && (
        <div className={`mb-8 p-4 font-bold text-sm uppercase tracking-widest border-4 ${msg === 'SUCCESS' ? 'bg-green-100 border-green-500 text-green-700 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)]' : 'bg-red-100 border-red-500 text-red-700 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]'}`}>
          {msg}
        </div>
      )}

      {/* Table */}
      {loading ? <p className="font-bold text-gray-500 uppercase tracking-widest">Loading...</p> : (
        <div className="bg-white border-4 border-gray-900 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]">
          <div className="hidden lg:grid grid-cols-[1.5fr_2fr_1fr_auto_auto] gap-6 px-6 py-4 border-b-4 border-gray-900 bg-gray-50 text-xs font-black text-gray-900 uppercase tracking-widest">
            <span>Title</span><span>Description</span><span>Status</span><span>Feat</span><span>Actions</span>
          </div>
          
          <div className="divide-y-2 divide-gray-200">
            {filteredProjects.map(p => (
              <div key={p.id} className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr_1fr_auto_auto] gap-4 lg:gap-6 px-6 py-6 items-center hover:bg-[#f8f6f0] transition-colors group">
                <span className="font-black text-gray-900 text-lg uppercase tracking-tighter truncate" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{p.title}</span>
                <span className="font-bold text-sm text-gray-500 line-clamp-2">{p.description}</span>
                <span className={`font-black text-xs uppercase tracking-widest px-3 py-1 inline-block border-2 ${p.status === 'DEPLOYED' || p.status === 'LIVE' || p.status === 'PROD' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>{p.status}</span>
                <span className="font-black text-xl text-[#e63920]">{p.featured ? '★' : ''}</span>
                <div className="flex gap-4 lg:justify-end mt-4 lg:mt-0">
                  <button onClick={() => openEdit(p)} className="text-xs font-black text-gray-900 uppercase tracking-widest border-b-2 border-transparent hover:border-gray-900 transition-all">Edit</button>
                  <button onClick={() => confirmDelete(p.id)} className="text-xs font-black text-[#e63920] uppercase tracking-widest border-b-2 border-transparent hover:border-[#e63920] transition-all">Delete</button>
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && <div className="px-6 py-12 text-center font-bold text-gray-500 uppercase tracking-widest">No projects found.</div>}
          </div>
        </div>
      )}

      {/* Side Drawer for Add/Edit (Modern Style) */}
      <SideDrawer isOpen={showForm} onClose={() => setShowForm(false)} title={editItem ? 'Edit Project' : 'New Project'}>
        <form onSubmit={handleSave} className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <label className={labelClass}>Project Title</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className={inputClass} placeholder="e.g. Awesome SaaS App" />
          </div>
          
          <div>
            <label className={labelClass}>Tech Stack</label>
            <input type="text" value={form.tech_stack} onChange={e => setForm({ ...form, tech_stack: e.target.value })} required className={inputClass} placeholder="React, Node.js, Tailwind (comma separated)" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>GitHub URL</label>
              <input type="url" value={form.github_url} onChange={e => setForm({ ...form, github_url: e.target.value })} className={inputClass} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className={labelClass}>Live URL</label>
              <input type="url" value={form.live_url} onChange={e => setForm({ ...form, live_url: e.target.value })} className={inputClass} placeholder="https://yourproject.com" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required
              className="w-full bg-white border border-gray-200 rounded-lg text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" placeholder="Describe the project..." />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Status</label>
              <div className="relative">
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={`${inputClass} appearance-none cursor-pointer pr-10`}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass}>Sort Order</label>
              <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} className={inputClass} />
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 mt-2">
            <label className="relative flex items-center cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Featured Project</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm shadow-blue-500/30">
              {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </SideDrawer>

      <ConfirmModal 
        isOpen={!!deleteId} 
        title="Delete Project" 
        message="Are you absolutely sure? This action cannot be undone and will remove the project from the database permanently." 
        onConfirm={handleDelete} 
        onCancel={() => setDeleteId(null)} 
      />
    </div>
  );
}
