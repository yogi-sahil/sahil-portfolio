import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import SideDrawer from './components/SideDrawer';
import ConfirmModal from './components/ConfirmModal';
import { useSearch } from './Layout';

export default function ManageGear() {
  const [gear, setGear] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { search } = useSearch();

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'HARDWARE', description: '', image_url: '', affiliate_url: '', sort_order: 0 });

  // Delete State
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchGear();
  }, []);

  const fetchGear = async () => {
    try {
      setLoading(true);
      const res = await api.get('/gear');
      setGear(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGear = gear.filter(g => 
    g.title.toLowerCase().includes(search.toLowerCase()) || 
    g.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: '', category: 'HARDWARE', description: '', image_url: '', affiliate_url: '', sort_order: gear.length + 1 });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      image_url: item.image_url,
      affiliate_url: item.affiliate_url,
      sort_order: item.sort_order
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await api.put(`/gear/${editItem.id}`, form);
      } else {
        await api.post('/gear', form);
      }
      setShowForm(false);
      fetchGear();
    } catch (err) {
      console.error(err);
      alert('Error saving gear');
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/gear/${deleteId}`);
      setDeleteId(null);
      fetchGear();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <p className="text-sm font-bold text-[#e63920] uppercase tracking-widest mb-2">Monetization</p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Manage Gear</h1>
        </div>
        <button onClick={openAdd} className="bg-[#e63920] border-4 border-gray-900 text-white font-black text-sm uppercase tracking-widest px-6 py-4 shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all">
          + ADD GEAR
        </button>
      </div>

      {loading ? <p className="font-bold text-gray-500 uppercase tracking-widest">Loading...</p> : (
        <div className="bg-white border-4 border-gray-900 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]">
          <div className="hidden lg:grid grid-cols-[1fr_2fr_1.5fr_auto_auto] gap-6 px-6 py-4 border-b-4 border-gray-900 bg-gray-50 text-xs font-black text-gray-900 uppercase tracking-widest">
            <span>Image</span><span>Title</span><span>Category</span><span>Affiliate URL</span><span>Actions</span>
          </div>
          
          <div className="divide-y-2 divide-gray-200">
            {filteredGear.map(g => (
              <div key={g.id} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1.5fr_auto_auto] gap-4 lg:gap-6 px-6 py-5 items-center hover:bg-[#f8f6f0] transition-colors group">
                <div className="w-16 h-16 bg-white border-2 border-gray-900 flex items-center justify-center overflow-hidden shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]">
                  {g.image_url ? <img src={g.image_url} alt={g.title} className="w-full h-full object-contain p-1" /> : <span className="text-gray-300 font-bold">N/A</span>}
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-gray-900 text-lg uppercase tracking-tighter line-clamp-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{g.title}</span>
                  <span className="font-bold text-xs text-gray-500 mt-1 line-clamp-1">{g.description}</span>
                </div>
                <span className={`font-black text-xs uppercase tracking-widest px-3 py-1 inline-block border-2 w-fit
                  ${g.category === 'HARDWARE' ? 'bg-blue-100 border-blue-500 text-blue-700' : 
                    g.category === 'BOOKS' ? 'bg-green-100 border-green-500 text-green-700' : 
                    'bg-gray-100 border-gray-300 text-gray-600'}`}>{g.category}
                </span>
                <a href={g.affiliate_url} target="_blank" rel="noreferrer" className="text-[#e63920] font-bold text-xs uppercase tracking-widest hover:underline truncate max-w-[150px]">Link</a>
                
                <div className="flex gap-4 mt-2 lg:mt-0 lg:justify-end">
                  <button onClick={() => openEdit(g)} className="text-xs font-black text-gray-900 uppercase tracking-widest border-b-2 border-transparent hover:border-gray-900 transition-all">Edit</button>
                  <button onClick={() => confirmDelete(g.id)} className="text-xs font-black text-[#e63920] uppercase tracking-widest border-b-2 border-transparent hover:border-[#e63920] transition-all">Delete</button>
                </div>
              </div>
            ))}
            {filteredGear.length === 0 && <div className="px-6 py-12 text-center font-bold text-gray-500 uppercase tracking-widest">No gear found.</div>}
          </div>
        </div>
      )}

      {/* Side Drawer for Add/Edit */}
      <SideDrawer isOpen={showForm} onClose={() => setShowForm(false)} title={editItem ? 'Edit Gear' : 'New Gear'}>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 space-y-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Product Title <span className="text-[#e63920]">*</span></label>
              <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                className="w-full bg-white border-4 border-gray-900 text-gray-900 font-bold px-4 py-3 outline-none focus:-translate-y-1 focus:translate-x-1 focus:shadow-[-6px_6px_0px_0px_rgba(230,57,32,1)] transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full bg-white border-4 border-gray-900 text-gray-900 font-bold px-4 py-3 outline-none focus:-translate-y-1 focus:translate-x-1 focus:shadow-[-6px_6px_0px_0px_rgba(230,57,32,1)] transition-all">
                  <option value="HARDWARE">Hardware</option>
                  <option value="ACCESSORIES">Accessories</option>
                  <option value="BOOKS">Books</option>
                  <option value="LIFESTYLE">Lifestyle</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Sort Order</label>
                <input type="number" required value={form.sort_order} onChange={e => setForm({...form, sort_order: e.target.value})}
                  className="w-full bg-white border-4 border-gray-900 text-gray-900 font-bold px-4 py-3 outline-none focus:-translate-y-1 focus:translate-x-1 focus:shadow-[-6px_6px_0px_0px_rgba(230,57,32,1)] transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Amazon Affiliate URL <span className="text-[#e63920]">*</span></label>
              <input type="url" required value={form.affiliate_url} onChange={e => setForm({...form, affiliate_url: e.target.value})}
                className="w-full bg-white border-4 border-gray-900 text-gray-900 font-bold px-4 py-3 outline-none focus:-translate-y-1 focus:translate-x-1 focus:shadow-[-6px_6px_0px_0px_rgba(230,57,32,1)] transition-all" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Image URL</label>
              <input type="url" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})}
                className="w-full bg-white border-4 border-gray-900 text-gray-900 font-bold px-4 py-3 outline-none focus:-translate-y-1 focus:translate-x-1 focus:shadow-[-6px_6px_0px_0px_rgba(230,57,32,1)] transition-all" />
              {form.image_url && <img src={form.image_url} alt="Preview" className="h-24 w-auto object-contain mt-2 border-2 border-gray-200" />}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Why I recommend it</label>
              <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                className="w-full bg-white border-4 border-gray-900 text-gray-900 font-bold px-4 py-3 outline-none resize-none focus:-translate-y-1 focus:translate-x-1 focus:shadow-[-6px_6px_0px_0px_rgba(230,57,32,1)] transition-all" />
            </div>

          </div>

          <div className="mt-8 pt-6 border-t-4 border-gray-900 flex justify-end gap-4 shrink-0 pb-12 sm:pb-0">
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-4 bg-[#f8f6f0] border-4 border-gray-900 text-gray-900 font-black text-sm uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-8 py-4 bg-[#e63920] border-4 border-transparent text-white font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all">
              Save Gear
            </button>
          </div>
        </form>
      </SideDrawer>

      <ConfirmModal 
        isOpen={!!deleteId} 
        title="Delete Gear" 
        message="Are you sure you want to remove this item? Your affiliate link will be gone from the public site." 
        onConfirm={handleDelete} 
        onCancel={() => setDeleteId(null)} 
      />
    </div>
  );
}
