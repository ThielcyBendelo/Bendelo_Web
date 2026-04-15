import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaCheckCircle } from 'react-icons/fa';
import { testimonials } from '../assets/assets.js';

export default function TestimonialsSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden border-t border-slate-200/50 dark:border-white/5" 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="testimonials">
      
      {/* Glow décoratif en arrière-plan */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER : Titre & Sous-titre Style Agence */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
              Trusted by Industry Leaders
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-none">
            <span className="text-[var(--text-primary)] opacity-90">Retours </span>
            <span className="bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">
              Clients
            </span>
            <span className="text-[var(--accent-1)]">.</span>
          </h2>

          <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-400 font-medium">
            L'excellence technique au service de la réussite de nos partenaires et collaborateurs.
          </p>
        </div>

        {/* Grille de témoignages avec Transparence Totale */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="relative p-10 rounded-[2.5rem] bg-transparent backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 group overflow-hidden"
            >
              {/* Overlay de lumière au survol */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full group-hover:bg-orange-500/10 transition-colors" />

              {/* Icône Quote Stylisée */}
              <div className="mb-8 flex justify-between items-start">
                <div className="flex gap-1 text-orange-500">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-xs" />)}
                </div>
                <FaQuoteLeft className="text-3xl text-orange-500/20 group-hover:text-orange-500/40 transition-colors" />
              </div>

              {/* Message avec lisibilité accrue */}
              <p className="text-base md:text-lg italic leading-relaxed text-slate-700 dark:text-slate-200 mb-10 relative z-10">
                "{testi.content}"
              </p>

              {/* Profil Client : Look Premium */}
              <div className="flex items-center gap-4 border-t border-slate-200/50 dark:border-white/5 pt-8">
                <div className="relative">
                  <img 
                    src={testi.avatar} 
                    alt={testi.name} 
                    className="w-14 h-14 rounded-2xl object-cover border border-orange-500/20" 
                  />
                  <FaCheckCircle className="absolute -bottom-1 -right-1 text-blue-500 bg-white dark:bg-slate-900 rounded-full text-xs" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white tracking-tight">{testi.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mt-1">
                    {testi.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
