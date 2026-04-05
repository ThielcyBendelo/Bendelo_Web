import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { testimonials } from '../assets/assets.js';

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 transition-colors duration-300" 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="testimonials">
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text inline-block">
            Témoignages
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Ce que mes clients et collaborateurs disent de notre travail ensemble.
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border relative transition-all hover:shadow-2xl hover:-translate-y-2"
              style={{ 
                backgroundColor: 'var(--surface)', 
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow)'
              }}
            >
              {/* Icône Quote Décorative */}
              <FaQuoteLeft className="absolute top-6 right-8 text-4xl opacity-10" style={{ color: 'var(--accent-1)' }} />

              {/* Étoiles de notation */}
              <div className="flex gap-1 mb-6" style={{ color: '#fbbf24' }}>
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-sm" />)}
              </div>

              {/* Message */}
              <p className="text-sm italic leading-relaxed mb-8" style={{ color: 'var(--text-primary)' }}>
                "{testi.content}"
              </p>

              {/* Profil Client */}
              <div className="flex items-center gap-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                <img 
                  src={testi.avatar} 
                  alt={testi.name} 
                  className="w-12 h-12 rounded-full border-2" 
                  style={{ borderColor: 'var(--accent-1)' }}
                />
                <div>
                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{testi.name}</h4>
                  <p className="text-xs" style={{ color: 'var(--accent-1)' }}>{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
