import React, { useEffect, useState } from 'react';
import api from '../api';
import SideDrawer from './components/SideDrawer';
import ConfirmModal from './components/ConfirmModal';
import { useSearch } from './Layout';

const TYPES = ['FULL_TIME', 'INTERNSHIP', 'FREELANCE', 'CONTRACT'];
const EMPTY = { role: '', company: '', duration: '', type: 'FULL_TIME', bullets: '', sort_order: 0 };

export default function ManageExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  
  const [deleteId, setDeleteId] = useState(null);
  const { search } = useSearch();

  const fetchData = () => api.get('/experience').then(r => { setItems(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setShowForm(true); setMsg(''); };
  const openEdit = (e) => {
    const bullets = typeof e.bullets === 'string' ? JSON.parse(e.bullets) : e.bullets;
    setEditItem(e);
    setForm({ role: e.role, company: e.company, duration: e.duration, type: e.type, bullets: bullets.join('\n'), sort_order: e.sort_order });
    setShowForm(true); setMsg('');
  };

  const handleSave = async (ev) => {
    ev.preventDefault(); setSaving(true); setMsg('');
    const payload = { ...form, bullets: form.bullets.split('\n').map(s => s.trim()).filter(Boolean) };
    try {
      if (editItem) await api.put(`/experience/${editItem.id}`, payload);
      else await api.post('/experience', payload);
      setMsg('SUCCESS'); setShowForm(false); fetchData();
    } catch (err) { setMsg('ERROR: ' + (err.response?.data?.message || 'Save failed.')); }
    finally { setSaving(false); }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await api.delete(`/experience/${deleteId}`);
    setDeleteId(null);
    fetchData();
  };

  const filteredItems = items.filter(i => i.role.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase()));

  // Modern input classes
  const inputClass = "w-full h-11 bg-white border border-gray-200 rounded-lg text-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <div className="font-bold text-sm text-[#e63920] uppercase tracking-widest mb-2">CMS / Experience</div>
          <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Manage Exp</h1>
        </div>
        <button onClick={openAdd} className="bg-gray-900 text-white font-black text-sm uppercase tracking-widest px-8 py-4 shadow-[6px_6px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all">
          + Add Entry
        </button>
      </div>

      {msg && (
        <div className={`mb-8 p-4 font-bold text-sm uppercase tracking-widest border-4 ${msg === 'SUCCESS' ? 'bg-green-100 border-green-500 text-green-700 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)]' : 'bg-red-100 border-red-500 text-red-700 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]'}`}>
          {msg}
        </div>
      )}

      {loading ? <p className="font-bold text-gray-500 uppercase tracking-widest">Loading...</p> : (
        <div className="space-y-6">
          {filteredItems.map(exp => {
            const bullets = typeof exp.bullets === 'string' ? JSON.parse(exp.bullets) : exp.bullets;
            return (
              <div key={exp.id} className="bg-white border-4 border-gray-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] group hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] transition-all flex flex-col md:flex-row justify-between gap-6 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{exp.role}</h3>
                  <div className="mt-2 mb-4 font-bold text-sm text-[#e63920] uppercase tracking-widest border-l-4 border-gray-900 pl-3">
                    <span className="text-gray-900">{exp.company}</span>
                    <span className="mx-2 text-gray-400">/</span>
                    {exp.duration}
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-500">{exp.type}</span>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-gray-700 font-medium text-sm">
                        <span className="font-black text-[#e63920] mt-0.5">■</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex md:flex-col gap-4 shrink-0 w-full md:w-auto">
                  <button onClick={() => openEdit(exp)} className="flex-1 md:flex-none border-2 border-gray-900 bg-[#f8f6f0] text-gray-900 font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-gray-900 hover:text-white transition-colors text-center">Edit</button>
                  <button onClick={() => confirmDelete(exp.id)} className="flex-1 md:flex-none border-2 border-[#e63920] text-[#e63920] font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#e63920] hover:text-white transition-colors text-center">Delete</button>
                </div>
              </div>
            );
          })}
          {filteredItems.length === 0 && <div className="p-12 border-4 border-gray-900 bg-white text-center font-bold text-gray-500 uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">No experience entries found.</div>}
        </div>
      )}

      {/* Side Drawer for Add/Edit (Modern Style) */}
      <SideDrawer isOpen={showForm} onClose={() => setShowForm(false)} title={editItem ? 'Edit Entry' : 'New Entry'}>
        <form onSubmit={handleSave} className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <label className={labelClass}>Role / Title</label>
            <input type="text" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required className={inputClass} placeholder="e.g. Senior Developer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Company</label>
              <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required className={inputClass} placeholder="e.g. Acme Corp" />
            </div>
            <div>
              <label className={labelClass}>Duration</label>
              <input type="text" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} required className={inputClass} placeholder="e.g. 2021 - Present" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Employment Type</label>
              <div className="relative">
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={`${inputClass} appearance-none cursor-pointer pr-10`}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
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
          
          <div>
            <label className={labelClass}>Bullet Points (One per line)</label>
            <textarea rows={6} value={form.bullets} onChange={e => setForm({ ...form, bullets: e.target.value })} required
              className="w-full bg-white border border-gray-200 rounded-lg text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              placeholder="Built scalable architectures...&#10;Mentored junior engineers..." />
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm shadow-blue-500/30">
              {saving ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </form>
      </SideDrawer>

      <ConfirmModal 
        isOpen={!!deleteId} 
        title="Delete Experience" 
        message="Are you sure you want to delete this experience entry? This cannot be undone." 
        onConfirm={handleDelete} 
        onCancel={() => setDeleteId(null)} 
      />
    </div>
  );
}
