import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';

export default function Gear() {
  const [gear, setGear] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get('/gear').then(res => {
      setGear(res.data.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const categories = [...new Set(gear.map(g => g.category))];

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <p className="text-[#e63920] font-bold uppercase tracking-widest mb-4">My Setup</p>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
          Workspace & Gear
        </h1>
        <p className="text-xl font-bold text-gray-600 mt-6 max-w-2xl leading-relaxed">
          The tools, hardware, and books I use every day to design and build digital experiences.
        </p>
      </motion.div>

      {loading ? (
        <div className="h-64 flex items-center justify-center font-bold text-gray-400 uppercase tracking-widest">
          Loading Setup...
        </div>
      ) : (
        <div className="space-y-16">
          {categories.map(category => (
            <div key={category}>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8 border-b-8 border-gray-900 pb-4 inline-block pr-12" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                {category}
              </h2>
              
              <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {gear.filter(g => g.category === category).map(g => (
                  <motion.div key={g.id} variants={item} className="bg-white border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] flex flex-col h-full group hover:-translate-y-2 hover:translate-x-2 hover:shadow-none transition-all duration-300">
                    <div className="h-48 border-b-4 border-gray-900 bg-[#f8f6f0] p-6 flex items-center justify-center overflow-hidden">
                      {g.image_url ? (
                        <img src={g.image_url} alt={g.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <span className="font-black text-gray-300 text-2xl uppercase tracking-widest">NO IMAGE</span>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-3 leading-tight" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{g.title}</h3>
                      <p className="font-bold text-sm text-gray-600 mb-6 flex-1 leading-relaxed">{g.description}</p>
                      
                      <a href={g.affiliate_url} target="_blank" rel="noreferrer" className="block w-full bg-[#e63920] border-4 border-gray-900 text-white text-center font-black text-sm uppercase tracking-widest py-3 mt-auto hover:bg-gray-900 transition-colors">
                        View on Amazon
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
