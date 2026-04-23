import React, { useState } from 'react';
import { skills } from '../assets/assets.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaTerminal, FaCode, FaServer, FaTools, FaBrain } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiTypescript, SiMongodb, SiFirebase, SiDocker } from 'react-icons/si';

const skillIcons = {
  JavaScript: SiJavascript, React: FaReact, 'Node.js': FaNodeJs,
  Git: FaGitAlt, 'Tailwind CSS': SiTailwindcss, TypeScript: SiTypescript,
  MongoDB: SiMongodb, Firebase: SiFirebase, Docker: SiDocker
};

const categories = [
  { id: 'all', label: 'Tous', icon: <FaCode /> },
  { id: 'frontend', label: 'Frontend', icon: <FaReact /> },
  { id: 'backend', label: 'Backend', icon: <FaServer /> },
  { id: 'tools', label: 'Outils & Cloud', icon: <FaTools /> },
   { id: 'impact', label: 'Soft Skills & Éveil', icon: <FaBrain /> },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  // Filtrage intelligent (gère les strings simples ou objets)
  const filteredSkills = skills.filter(skill => {
    if (activeTab === 'all') return true;
    const category = typeof skill === 'object' ? skill.category : 'frontend'; 
    return category === activeTab;
  });

  return (
    <section className="py-24 px-6 transition-all duration-700" style={{ backgroundColor: 'var(--bg)' }} id="skills">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-24 relative">
          {/* Surtitre adaptatif */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent-1)]/20 bg-[var(--accent-1)]/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-2)] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent-1)]">
              Architecture & Conscience
            </span>
          </motion.div>

          {/* Titre Ultra-Massif Adaptatif */}
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-none" style={{ color: 'var(--text-primary)' }}>
            Arsenal <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]">
              Cognitif
            </span>
            <span className="text-[var(--accent-2)]">.</span>
          </h2>

          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Une fusion de <span className="font-bold italic text-[var(--accent-1)]">maîtrise technologique</span> et de 
            <span className="font-black italic text-[var(--accent-2)] mx-2">leadership humain</span> pour bâtir des solutions à fort impact.
          </p>
        </div>

        {/* Filtres de Catégories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${
                activeTab === cat.id ? 'bg-[var(--accent-1)] text-white border-transparent shadow-lg shadow-purple-500/20' : ''
              }`}
              style={{ 
                backgroundColor: activeTab === cat.id ? '' : 'var(--surface)',
                borderColor: 'var(--border-color)',
                color: activeTab === cat.id ? 'white' : 'var(--text-primary)' 
              }}
            >
              <span className={activeTab === cat.id ? 'text-white' : 'text-[var(--accent-1)]'}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille de Skills Animée */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredSkills.map((skill, idx) => {
              const name = typeof skill === 'object' ? skill.name : skill;
              const level = typeof skill === 'object' ? skill.level : 80;
              const Icon = skillIcons[name] || FaTerminal;

              return (
                <motion.div
                  layout
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl border group"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow)' }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl transition-transform group-hover:rotate-12" style={{ color: 'var(--accent-1)' }}>
                      <Icon />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{name}</span>
                        <span className="text-[10px] font-mono font-bold" style={{ color: 'var(--accent-2)' }}>{level}%</span>
                      </div>
                      
                      {/* Progress Bar Container */}
                      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          transition={{ duration: 1.2, ease: "circOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Badge de réassurance */}
        <div className="mt-16 text-center">
          <span className="text-xs font-mono px-4 py-2 rounded-full border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            // Formation continue et veille technologique active
          </span>
        </div>
      </div>
    </section>
  );
}
