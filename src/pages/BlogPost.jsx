import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get(`/blog/${slug}`)
      .then(r => { setPost(r.data.data); setLoading(false); })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center font-sans bg-[#f8f6f0]">
        <p className="font-black text-gray-900 text-lg uppercase tracking-widest animate-pulse">fetching transmission...</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center space-y-6 font-sans bg-[#f8f6f0]">
        <p className="font-black text-8xl md:text-9xl text-gray-900" style={{ fontFamily: "'Archivo Black', sans-serif" }}>404</p>
        <p className="font-bold text-gray-500 text-lg uppercase tracking-widest">post not found or unpublished</p>
        <Link to="/blog" className="px-6 py-3 bg-gray-900 text-white font-bold text-sm uppercase tracking-widest hover:bg-[#e63920] transition-colors shadow-[4px_4px_0px_0px_rgba(230,57,32,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none">
          ← BACK TO BLOG
        </Link>
      </div>
    );
  }

  const tags = typeof post.tags === 'string' ? JSON.parse(post.tags) : (post.tags || []);

  return (
    <article className="min-h-screen pt-32 pb-24 font-sans">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
          <Link to="/blog" className="font-bold text-sm text-gray-500 hover:text-[#e63920] uppercase tracking-widest transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            BACK TO LOG
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="font-bold text-sm text-[#e63920] uppercase tracking-widest">
              {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
            <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                <span key={t} className="font-bold text-xs text-gray-900 border-2 border-gray-900 bg-white px-3 py-1 uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]">{t}</span>
              ))}
            </div>
          </div>

          <h1 className="font-black text-5xl md:text-7xl lg:text-8xl text-gray-900 uppercase tracking-tighter leading-none mb-8" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="font-medium text-gray-600 text-xl leading-relaxed border-l-8 border-[#e63920] pl-6 py-2 bg-white/50">
              {post.excerpt}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center space-x-6 mt-16">
            <span className="h-2 flex-1 bg-gray-900" />
            <span className="font-black text-xl text-gray-900 uppercase tracking-widest">TRANSMISSION START</span>
            <span className="h-2 flex-1 bg-[#e63920]" />
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose-custom max-w-none"
          style={{
            color: '#374151',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: '1.9',
            fontSize: '1.125rem',
            fontWeight: '500'
          }}
        >
          {/* Render content — split by double newline for paragraphs */}
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('# ')) return <h2 key={i} className="text-gray-900 uppercase tracking-tighter mt-12 mb-6" style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '2.5rem', lineHeight: '1.1' }}>{para.replace(/^# /, '')}</h2>;
            if (para.startsWith('## ')) return <h3 key={i} className="text-gray-900 uppercase tracking-tight mt-10 mb-4" style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.75rem' }}>{para.replace(/^## /, '')}</h3>;
            
            if (para.startsWith('```')) {
              const code = para.replace(/^```[a-z]*\n?/, '').replace(/```$/, '');
              return (
                <div key={i} className="relative mt-8 mb-8 group">
                  <div className="absolute inset-0 bg-[#e63920] translate-x-2 translate-y-2" />
                  <pre className="relative bg-gray-900 border-4 border-gray-900 p-6 overflow-x-auto text-gray-100 font-mono text-sm leading-relaxed shadow-[8px_8px_0px_0px_rgba(230,57,32,1)]">
                    <code>{code}</code>
                  </pre>
                </div>
              );
            }
            if (para.startsWith('- ') || para.startsWith('* ')) {
              const items = para.split('\n').filter(Boolean);
              return <ul key={i} className="my-6 space-y-3">{items.map((item, j) => <li key={j} className="flex gap-4 items-start"><span className="text-[#e63920] font-black text-2xl leading-none mt-1">▸</span><span>{item.replace(/^[-*] /, '')}</span></li>)}</ul>;
            }
            return <p key={i} className="my-6">{para}</p>;
          })}
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-24 pt-8 border-t-8 border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/blog" className="px-8 py-4 bg-gray-900 text-white font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(230,57,32,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            ALL POSTS
          </Link>
          <span className="font-black text-2xl text-gray-300 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            END_OF_TRANSMISSION
          </span>
        </motion.div>
      </div>
    </article>
  );
}
