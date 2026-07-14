import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blog').then(r => { setPosts(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <span className="font-black text-[#e63920] text-sm tracking-widest">06.</span>
            <span className="h-1 w-12 bg-gray-900" />
            <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">transmission_log</span>
          </div>
          <h1 className="font-black text-6xl md:text-8xl lg:text-9xl text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            BLOG<span className="text-[#e63920]">_LOG</span>
          </h1>
          <p className="font-medium text-lg text-gray-600 mt-6 max-w-xl leading-relaxed border-l-4 border-gray-900 pl-4">
            Written transmissions. Thoughts on code, systems, and the craft of engineering.
          </p>
        </motion.div>

        {loading ? (
          <div className="w-full h-32 flex items-center justify-center border-4 border-gray-900 bg-white shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
            <p className="font-black text-gray-900 text-lg uppercase tracking-widest animate-pulse">Fetching transmissions...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="w-full py-16 flex flex-col items-center justify-center border-4 border-dashed border-gray-400 bg-[#f8f6f0]">
            <p className="font-black text-gray-500 text-2xl tracking-tighter uppercase">No transmissions yet</p>
            <p className="font-medium text-gray-400 text-sm mt-2">Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, i) => {
              const tags = typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags;
              return (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group bg-white border-4 border-gray-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(17,24,39,1)] transition-all">
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                        <span className="font-bold text-xs text-[#e63920] mb-3 block uppercase tracking-widest">
                          {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                        <h3 className="font-black text-2xl md:text-4xl text-gray-900 group-hover:text-[#e63920] transition-colors uppercase tracking-tighter mb-4" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                          {post.title}
                        </h3>
                        {post.excerpt && <p className="text-gray-600 text-base font-medium max-w-2xl leading-relaxed mb-6">{post.excerpt}</p>}
                        <div className="flex flex-wrap gap-2">
                          {(tags || []).map(t => <span key={t} className="font-bold text-xs text-gray-900 border-2 border-gray-900 bg-[#f8f6f0] px-3 py-1.5 uppercase tracking-widest">{t}</span>)}
                        </div>
                      </div>
                      <span className="w-12 h-12 flex items-center justify-center border-2 border-gray-900 bg-gray-900 text-white group-hover:bg-[#e63920] transition-colors shrink-0 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] group-hover:shadow-none group-hover:translate-x-[4px] group-hover:translate-y-[4px]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
