import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import ConfirmModal from './components/ConfirmModal';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetch = () => api.get('/contact/messages').then(r => { setMessages(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  useEffect(() => { fetch(); }, []);

  const markRead = async (id) => { await api.patch(`/contact/messages/${id}/read`); fetch(); };
  
  const handleDelete = async () => { 
    if (!deleteId) return; 
    await api.delete(`/contact/messages/${deleteId}`); 
    setDeleteId(null);
    fetch(); 
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="font-bold text-sm text-[#e63920] uppercase tracking-widest mb-2">CMS / Messages</div>
        <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Incoming Messages</h1>
      </div>

      {loading ? (
        <p className="font-bold text-gray-500 uppercase tracking-widest">Loading messages...</p>
      ) : (
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="bg-white border-4 border-gray-900 p-12 text-center shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
              <span className="font-black text-2xl text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Inbox Zero</span>
              <p className="font-bold text-sm text-gray-500 mt-2 uppercase tracking-widest">No messages right now.</p>
            </div>
          )}
          {messages.map(m => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`border-4 border-gray-900 p-6 md:p-8 transition-colors ${m.is_read ? 'bg-white shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]' : 'bg-[#f8f6f0] shadow-[8px_8px_0px_0px_rgba(230,57,32,1)]'}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <span className="font-black text-xl text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{m.name}</span>
                  <span className="font-bold text-sm text-[#e63920] ml-3 uppercase tracking-widest">{m.email}</span>
                  {!m.is_read && (
                    <span className="inline-block bg-[#e63920] text-white font-black text-xs uppercase tracking-widest px-3 py-1 ml-4 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]">NEW</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 border-t-2 border-gray-200 pt-4 md:border-0 md:pt-0 w-full md:w-auto">
                  <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">
                    {new Date(m.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  {!m.is_read && (
                    <button onClick={() => markRead(m.id)} className="bg-gray-900 text-white font-black text-xs uppercase tracking-widest px-4 py-2 hover:bg-[#e63920] transition-colors shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                      Mark Read
                    </button>
                  )}
                  <button onClick={() => setDeleteId(m.id)} className="border-2 border-[#e63920] text-[#e63920] font-black text-xs uppercase tracking-widest px-4 py-2 hover:bg-[#e63920] hover:text-white transition-colors">
                    Delete
                  </button>
                </div>
              </div>
              <p className="font-medium text-gray-700 text-base leading-relaxed border-l-4 border-[#e63920] pl-4 whitespace-pre-wrap">
                {m.message}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmModal 
        isOpen={!!deleteId} 
        title="Delete Message" 
        message="Are you sure you want to delete this message? This action is permanent." 
        onConfirm={handleDelete} 
        onCancel={() => setDeleteId(null)} 
      />
    </div>
  );
}
