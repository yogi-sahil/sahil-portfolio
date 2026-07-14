import React, { useEffect, useState, useRef } from 'react';
import api from '../api';
import SideDrawer from './components/SideDrawer';
import ConfirmModal from './components/ConfirmModal';
import { useSearch } from './Layout';

const EMPTY = { title: '', slug: '', excerpt: '', content: '', tags: '', published: false };
const slugify = (str) => str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

export default function ManageBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  
  const [deleteId, setDeleteId] = useState(null);
  const contentRef = useRef(null);
  const { search } = useSearch();

  const fetchPosts = () => api.get('/blog/admin/all').then(r => { setPosts(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  useEffect(() => { fetchPosts(); }, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setShowForm(true); setMsg(''); };
  const openEdit = (p) => {
    const tags = typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags || []);
    setEditItem(p);
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt || '', content: p.content, tags: tags.join(', '), published: p.published });
    setShowForm(true); setMsg('');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm(f => ({ ...f, title, slug: editItem ? f.slug : slugify(title) }));
  };

  const insertMarkdown = (prefix, suffix = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form.content;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    const newText = before + prefix + selected + suffix + after;
    setForm({ ...form, content: newText });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setMsg('');
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editItem) await api.put(`/blog/${editItem.id}`, payload);
      else await api.post('/blog', payload);
      setMsg('SUCCESS'); setShowForm(false); fetchPosts();
    } catch (err) { setMsg('ERROR: ' + (err.response?.data?.message || 'Save failed.')); }
    finally { setSaving(false); }
  };

  const confirmDelete = (id) => { setDeleteId(id); };

  const handleDelete = async () => {
    if (!deleteId) return;
    await api.delete(`/blog/${deleteId}`);
    setDeleteId(null);
    fetchPosts();
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt?.toLowerCase().includes(search.toLowerCase()));

  // Modern input classes
  const inputClass = "w-full h-11 bg-white border border-gray-200 rounded-lg text-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <div className="font-bold text-sm text-[#e63920] uppercase tracking-widest mb-2">CMS / Blog</div>
          <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Manage Blog</h1>
        </div>
        <button onClick={openAdd} className="bg-gray-900 text-white font-black text-sm uppercase tracking-widest px-8 py-4 shadow-[6px_6px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all">
          + New Post
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
          <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_auto_auto] gap-6 px-6 py-4 border-b-4 border-gray-900 bg-gray-50 text-xs font-black text-gray-900 uppercase tracking-widest">
            <span>Title</span><span>Slug</span><span>Status</span><span>Date</span><span>Actions</span>
          </div>
          
          <div className="divide-y-2 divide-gray-200">
            {filteredPosts.map(p => (
              <div key={p.id} className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_auto_auto] gap-4 lg:gap-6 px-6 py-5 items-center hover:bg-[#f8f6f0] transition-colors group">
                <span className="font-black text-gray-900 text-lg uppercase tracking-tighter truncate" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{p.title}</span>
                <span className="font-bold text-sm text-gray-500 truncate">/{p.slug}</span>
                <span className={`font-black text-xs uppercase tracking-widest px-3 py-1 inline-block border-2 ${p.published ? 'bg-green-100 border-green-500 text-green-700' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>{p.published ? 'Published' : 'Draft'}</span>
                <span className="font-bold text-sm text-gray-500">{new Date(p.created_at).toLocaleDateString('en-GB')}</span>
                <div className="flex gap-4 lg:justify-end mt-2 lg:mt-0">
                  <button onClick={() => openEdit(p)} className="text-xs font-black text-gray-900 uppercase tracking-widest border-b-2 border-transparent hover:border-gray-900 transition-all">Edit</button>
                  <button onClick={() => confirmDelete(p.id)} className="text-xs font-black text-[#e63920] uppercase tracking-widest border-b-2 border-transparent hover:border-[#e63920] transition-all">Delete</button>
                </div>
              </div>
            ))}
            {filteredPosts.length === 0 && <div className="px-6 py-12 text-center font-bold text-gray-500 uppercase tracking-widest">No posts found.</div>}
          </div>
        </div>
      )}

      {/* Side Drawer for Add/Edit (Modern Style) */}
      <SideDrawer isOpen={showForm} onClose={() => setShowForm(false)} title={editItem ? 'Edit Post' : 'New Post'}>
        <form onSubmit={handleSave} className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <label className={labelClass}>Post Title</label>
            <input type="text" value={form.title} onChange={handleTitleChange} required className={inputClass} placeholder="e.g. My Awesome Trip" />
          </div>

          <div>
            <label className={labelClass}>Slug (URL friendly)</label>
            <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <span className="px-4 py-2.5 text-sm text-gray-500 bg-gray-100 border-r border-gray-200">/blog/</span>
              <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required 
                className="flex-1 bg-white text-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Excerpt</label>
            <input type="text" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className={inputClass} placeholder="A short summary of the post..." />
          </div>

          <div>
            <label className={labelClass}>Tags (Comma Separated)</label>
            <input type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className={inputClass} placeholder="e.g. react, tailwind, webdev" />
          </div>
          
          <div className="flex-1 flex flex-col">
            <label className={labelClass}>Content (Markdown)</label>
            <div className="border border-gray-200 border-b-0 rounded-t-lg bg-gray-50 flex flex-wrap gap-1 p-2">
              <button type="button" onClick={() => insertMarkdown('**', '**')} className="px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-200 rounded transition-colors" title="Bold">B</button>
              <button type="button" onClick={() => insertMarkdown('_', '_')} className="px-3 py-1.5 text-xs font-bold italic text-gray-700 hover:bg-gray-200 rounded transition-colors" title="Italic">I</button>
              <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
              <button type="button" onClick={() => insertMarkdown('[', '](url)')} className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors">Link</button>
              <button type="button" onClick={() => insertMarkdown('## ')} className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors">H2</button>
              <button type="button" onClick={() => insertMarkdown('### ')} className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors">H3</button>
              <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
              <button type="button" onClick={() => insertMarkdown('`', '`')} className="px-3 py-1.5 text-xs font-mono text-gray-700 hover:bg-gray-200 rounded transition-colors">Code</button>
              <button type="button" onClick={() => insertMarkdown('```\n', '\n```')} className="px-3 py-1.5 text-xs font-mono text-gray-700 hover:bg-gray-200 rounded transition-colors">Block</button>
              <button type="button" onClick={() => insertMarkdown('> ')} className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors">Quote</button>
              <button type="button" onClick={() => insertMarkdown('- ')} className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors">List</button>
            </div>
            <textarea ref={contentRef} rows={12} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required
              className="w-full bg-white border border-gray-200 rounded-b-lg text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-y font-mono leading-relaxed" 
              placeholder="Write your blog post in markdown..." />
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 mt-2">
            <label className="relative flex items-center cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Publish Post to Live Site</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm shadow-blue-500/30">
              {saving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </form>
      </SideDrawer>

      <ConfirmModal 
        isOpen={!!deleteId} 
        title="Delete Post" 
        message="Are you sure you want to permanently delete this blog post?" 
        onConfirm={handleDelete} 
        onCancel={() => setDeleteId(null)} 
      />
    </div>
  );
}
