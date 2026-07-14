import React, { useEffect, useState } from 'react';
import api from '../api';
import SideDrawer from './components/SideDrawer';
import ConfirmModal from './components/ConfirmModal';
import { useSearch } from './Layout';

const CATEGORIES = ['FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS', 'LANGUAGE', '3D', 'ANIMATION', 'ARCHITECTURE', 'OTHER'];
const EMPTY_FORM = { name: '', category: 'FRONTEND', level: 50, sort_order: 0 };

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const [deleteId, setDeleteId] = useState(null);
  const { search } = useSearch();

  const fetch = () => api.get('/skills').then(r => { setSkills(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY_FORM); setShowForm(true); setMsg(''); };
  const openEdit = (s) => { setEditItem(s); setForm({ name: s.name, category: s.category, level: s.level, sort_order: s.sort_order }); setShowForm(true); setMsg(''); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setMsg('');
    try {
      if (editItem) await api.put(`/skills/${editItem.id}`, form);
      else await api.post('/skills', form);
      setMsg('SUCCESS'); setShowForm(false); fetch();
    } catch (err) { setMsg('ERROR: ' + (err.response?.data?.message || 'Save failed.')); }
    finally { setSaving(false); }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await api.delete(`/skills/${deleteId}`);
    setDeleteId(null);
    fetch();
  };

  const filteredSkills = skills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));

  // Modern input classes
  const inputClass = "w-full h-11 bg-white border border-gray-200 rounded-lg text-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <div className="font-bold text-sm text-[#e63920] uppercase tracking-widest mb-2">CMS / Skills</div>
          <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Manage Skills</h1>
        </div>
        <button onClick={openAdd} className="bg-gray-900 text-white font-black text-sm uppercase tracking-widest px-8 py-4 shadow-[6px_6px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all">
          + Add Skill
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
          <div className="hidden md:grid grid-cols-[2fr_1fr_1.5fr_auto] gap-6 px-6 py-4 border-b-4 border-gray-900 bg-gray-50 text-xs font-black text-gray-900 uppercase tracking-widest">
            <span>Skill Name</span><span>Category</span><span>Proficiency</span><span>Actions</span>
          </div>
          
          <div className="divide-y-2 divide-gray-200">
            {filteredSkills.map(s => (
              <div key={s.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr_auto] gap-4 md:gap-6 px-6 py-5 items-center hover:bg-[#f8f6f0] transition-colors group">
                <span className="font-black text-gray-900 text-lg uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{s.name}</span>
                <span className="font-bold text-sm text-gray-500 uppercase tracking-widest">{s.category}</span>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 border-2 border-gray-900 bg-gray-100 overflow-hidden relative">
                    <div style={{ width: `${s.level}%` }} className="absolute inset-y-0 left-0 bg-[#e63920]" />
                  </div>
                  <span className="font-black text-xs text-gray-900 w-8">{s.level}%</span>
                </div>
                <div className="flex gap-4 md:justify-end mt-2 md:mt-0">
                  <button onClick={() => openEdit(s)} className="text-xs font-black text-gray-900 uppercase tracking-widest border-b-2 border-transparent hover:border-gray-900 transition-all">Edit</button>
                  <button onClick={() => confirmDelete(s.id)} className="text-xs font-black text-[#e63920] uppercase tracking-widest border-b-2 border-transparent hover:border-[#e63920] transition-all">Delete</button>
                </div>
              </div>
            ))}
            {filteredSkills.length === 0 && <div className="px-6 py-12 text-center font-bold text-gray-500 uppercase tracking-widest">No skills found.</div>}
          </div>
        </div>
      )}

      {/* Side Drawer for Add/Edit (Modern Style) */}
      <SideDrawer isOpen={showForm} onClose={() => setShowForm(false)} title={editItem ? 'Edit Skill' : 'New Skill'}>
        <form onSubmit={handleSave} className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <label className={labelClass}>Skill Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className={inputClass} placeholder="e.g. React.js" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Category</label>
              <div className="relative">
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={`${inputClass} appearance-none cursor-pointer pr-10`}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
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
          
          <div className="p-5 bg-gray-50 rounded-lg border border-gray-100 mt-2">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Proficiency Level</label>
              <span className="text-sm font-bold text-blue-600">{form.level}%</span>
            </div>
            <input type="range" min="0" max="100" value={form.level} onChange={e => setForm({ ...form, level: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm shadow-blue-500/30">
              {saving ? 'Saving...' : 'Save Skill'}
            </button>
          </div>
        </form>
      </SideDrawer>

      <ConfirmModal 
        isOpen={!!deleteId} 
        title="Delete Skill" 
        message="Are you sure you want to delete this skill? This cannot be undone." 
        onConfirm={handleDelete} 
        onCancel={() => setDeleteId(null)} 
      />
    </div>
  );
}
