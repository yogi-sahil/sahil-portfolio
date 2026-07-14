import React, { useEffect, useState, useRef } from 'react';
import api from '../api';
import ConfirmModal from './components/ConfirmModal';

export default function ManageResume() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [externalUrl, setExternalUrl] = useState('');
  const [msg, setMsg] = useState('');
  const fileInputRef = useRef(null);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const fetchInfo = () => {
    api.get('/resume/info').then(r => { setInfo(r.data); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchInfo(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') return setMsg('ERROR: Only PDF files allowed.');
    if (file.size > 10 * 1024 * 1024) return setMsg('ERROR: File exceeds 10MB limit.');
    
    setUploading(true); setMsg('');
    const fd = new FormData(); fd.append('resume', file);
    try {
      await api.post('/resume/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('SUCCESS: Resume uploaded'); fetchInfo();
    } catch (err) { setMsg('ERROR: Upload failed'); }
    finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  const handleSetUrl = async (e) => {
    e.preventDefault(); setUploading(true); setMsg('');
    try {
      await api.post('/resume/url', { external_url: externalUrl });
      setMsg('SUCCESS: URL saved'); setUrlMode(false); setExternalUrl(''); fetchInfo();
    } catch (err) { setMsg('ERROR: Failed to save URL'); }
    finally { setUploading(false); }
  };

  const handleDelete = async () => {
    try { 
      await api.delete('/resume'); 
      setMsg('SUCCESS: Resume removed'); 
      fetchInfo(); 
    } catch (err) { 
      setMsg('ERROR: Failed to remove resume'); 
    }
    setDeleteConfirm(false);
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="font-bold text-sm text-[#e63920] uppercase tracking-widest mb-2">CMS / Resume</div>
        <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Manage Resume</h1>
      </div>

      {msg && (
        <div className={`mb-8 p-4 font-bold text-sm uppercase tracking-widest border-4 ${msg.startsWith('SUCCESS') ? 'bg-green-100 border-green-500 text-green-700 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)]' : 'bg-red-100 border-red-500 text-red-700 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]'}`}>
          {msg}
        </div>
      )}

      {/* Current Status */}
      {loading ? (
        <p className="font-bold text-gray-500 uppercase tracking-widest">Loading...</p>
      ) : (
        <div className="bg-white border-4 border-gray-900 p-8 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)] mb-12">
          <div className="font-black text-xl text-gray-900 uppercase tracking-tighter mb-6 border-b-4 border-gray-900 pb-4">Current Status</div>
          {info?.has_resume ? (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-3 h-3 bg-green-500 border-2 border-gray-900 animate-pulse" />
                  <span className="font-black text-lg text-green-600 uppercase tracking-tighter">Resume Active</span>
                </div>
                <div className="font-bold text-sm text-gray-900 uppercase tracking-widest mb-1">
                  Type: <span className="text-[#e63920]">{info.type === 'file' ? 'Uploaded PDF' : 'External URL'}</span>
                </div>
                {info.type === 'url' && (
                  <div className="font-bold text-sm text-gray-500 mt-2 break-all border-l-4 border-gray-900 pl-3">
                    {info.external_url}
                  </div>
                )}
                {info.type === 'file' && (
                  <div className="font-bold text-sm text-gray-500 mt-2 border-l-4 border-gray-900 pl-3">
                    {info.filename}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a href="http://localhost:5001/api/resume/download" target="_blank" rel="noreferrer"
                  className="bg-gray-900 text-white font-black text-xs uppercase tracking-widest px-6 py-4 shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-center">
                  Preview Resume
                </a>
                <button onClick={() => setDeleteConfirm(true)}
                  className="bg-[#f8f6f0] border-2 border-[#e63920] text-[#e63920] font-black text-xs uppercase tracking-widest px-6 py-4 hover:bg-[#e63920] hover:text-white transition-all text-center">
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-red-500 border-2 border-gray-900" />
              <span className="font-black text-lg text-gray-900 uppercase tracking-tighter">No Resume Set</span>
            </div>
          )}
        </div>
      )}

      {/* Upload Options */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Option 1: Upload PDF */}
        <div className="bg-[#f8f6f0] border-4 border-gray-900 p-8 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] flex flex-col justify-between">
          <div>
            <div className="font-black text-xl text-gray-900 uppercase tracking-tighter mb-4">Option 1: Upload PDF</div>
            <p className="font-bold text-sm text-gray-500 uppercase tracking-widest mb-8">
              Upload a PDF file directly. Max size: 10MB.
            </p>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleUpload} accept="application/pdf" className="hidden" />
          <button
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
            className="w-full bg-gray-900 text-white font-black text-sm uppercase tracking-widest py-5 shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50">
            {uploading ? 'Uploading...' : 'Select PDF File'}
          </button>
        </div>

        {/* Option 2: External URL */}
        <div className="bg-[#f8f6f0] border-4 border-gray-900 p-8 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] flex flex-col justify-between">
          <div>
            <div className="font-black text-xl text-gray-900 uppercase tracking-tighter mb-4">Option 2: External URL</div>
            <p className="font-bold text-sm text-gray-500 uppercase tracking-widest mb-8">
              Set a Google Drive or Dropbox link.
            </p>
          </div>
          {urlMode ? (
            <form onSubmit={handleSetUrl} className="space-y-4">
              <input type="url" value={externalUrl} onChange={e => setExternalUrl(e.target.value)} required
                placeholder="https://drive.google.com/..."
                className="w-full h-12 bg-white border-2 border-gray-900 text-gray-900 font-bold px-4 outline-none focus:border-[#e63920] focus:shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] transition-all" />
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-gray-900 text-white font-black text-xs uppercase tracking-widest py-3 shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">Save URL</button>
                <button type="button" onClick={() => setUrlMode(false)} className="flex-1 border-2 border-gray-900 text-gray-900 font-black text-xs uppercase tracking-widest py-3 hover:bg-gray-900 hover:text-white transition-all">Cancel</button>
              </div>
            </form>
          ) : (
            <button onClick={() => setUrlMode(true)}
              className="w-full border-2 border-gray-900 text-gray-900 font-black text-sm uppercase tracking-widest py-5 hover:bg-gray-900 hover:text-white transition-all">
              Enter External URL
            </button>
          )}
        </div>
      </div>

      <ConfirmModal 
        isOpen={deleteConfirm} 
        title="Remove Resume" 
        message="Are you sure you want to remove the active resume?" 
        onConfirm={handleDelete} 
        onCancel={() => setDeleteConfirm(false)} 
      />
    </div>
  );
}
