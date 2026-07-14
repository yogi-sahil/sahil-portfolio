import React from 'react';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center space-x-4 mb-3">
            <span className="font-mono text-[#00FF41] text-sm">05.</span>
            <span className="h-px w-12 bg-[#00FF41]" />
            <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">establish_connection</span>
          </div>
          <h2 className="font-mono font-black text-4xl md:text-6xl text-white uppercase">
            CONTA<span className="text-[#FF003C]">_</span>CT
          </h2>
        </motion.div>

        {/* Contact block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-white/10 p-8 md:p-12"
        >
          {/* Terminal output */}
          <div className="font-mono text-sm mb-8 border-b border-white/10 pb-8">
            <p className="text-gray-600 mb-2"># Connection request initialized</p>
            <p className="text-gray-400"><span className="text-[#00FF41]">ping</span> sahil.dev —— response: <span className="text-[#00FF41]">OPEN</span></p>
            <p className="text-gray-400 mt-1"><span className="text-[#00FF41]">status</span> availability —— <span className="text-[#00FF41]">ACCEPTING OFFERS</span></p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                I'm currently available for freelance projects and full-time roles. If you have a challenging problem or want to build something great together, initiate a handshake below.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'EMAIL', value: 'hello@sahil.dev' },
                  { label: 'LOCATION', value: 'India / Remote' },
                  { label: 'RESPONSE', value: '&lt; 24 HOURS' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-4">
                    <span className="font-mono text-xs text-gray-700 w-24 uppercase tracking-widest">{item.label}</span>
                    <span className="font-mono text-xs text-white"
                      dangerouslySetInnerHTML={{ __html: item.value }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <motion.a
                href="mailto:hello@sahil.dev"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,65,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="font-mono text-sm uppercase tracking-widest text-center px-8 py-4 bg-[#00FF41] text-black font-bold hover:bg-white transition-colors"
              >
                ./INIT_CONNECTION
              </motion.a>
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                className="font-mono text-sm uppercase tracking-widest text-center px-8 py-4 border border-white/20 text-gray-400 hover:border-[#FF003C] hover:text-[#FF003C] transition-all"
              >
                [ GITHUB PROFILE ]
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
