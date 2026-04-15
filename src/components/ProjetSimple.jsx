import React, { useState } from 'react';
import { projects } from '../assets/assets.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaGlobe, FaMobileAlt, FaLayerGroup } from 'react-icons/fa';

// Définition des catégories de filtrage
const categories = [
  { id: 'all', label: 'Tous', icon: <FaLayerGroup /> },
  { id: 'web', label: 'Web', icon: <FaGlobe /> },
  { id: 'mobile', label: 'Mobile', icon: <FaMobileAlt /> },
];

export default function ProjetSimple() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filtrage des projets (assurez-vous que vos objets dans assets.js ont une propriété 'categorie')
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.categorie?.toLowerCase() === activeFilter);

  return (
    <section id="projects" className="py-24 px-6 transition-colors duration-300" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-24 relative">
  {/* Surtitre : Preuve de compétence */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 mb-8"
  >
    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
      Engineered Case Studies
    </span>
  </motion.div>

  {/* Titre Projets Ultra-Massif */}
  <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-none">
    <span className="text-[var(--text-primary)] opacity-90">Labora</span>
    <span className="bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">
      toire
    </span>
    <span className="text-[var(--accent-1)]">.</span>
  </h2>

  {/* Description orientée "Technical Excellence" */}
  <div className="max-w-4xl mx-auto space-y-6">
    <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--text-primary)]">
      Explorez une sélection de systèmes complexes et d'architectures numériques conçus pour 
      <span className="font-bold italic text-orange-500 mx-2">transformer</span> 
      le paysage technologique de nos partenaires.
    </p>

    {/* Filtre Contextuel / Indicateur de volume */}
    <div className="flex justify-center items-center gap-6 pt-4 opacity-60">
      <div className="h-[1px] w-12 bg-slate-500" />
      <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--text-secondary)] font-bold">
        Web • Mobile • Cloud Architecture
      </p>
      <div className="h-[1px] w-12 bg-slate-500" />
    </div>
  </div>
</div>


          {/* Boutons de Filtrage */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${
                  activeFilter === cat.id ? 'bg-[var(--accent-1)] text-white border-transparent shadow-lg shadow-purple-500/20' : ''
                }`}
                style={{ 
                  backgroundColor: activeFilter === cat.id ? '' : 'var(--surface)',
                  borderColor: 'var(--border-color)',
                  color: activeFilter === cat.id ? 'white' : 'var(--text-primary)' 
                }}
              >
                <span className={activeFilter === cat.id ? 'text-white' : 'text-[var(--accent-1)]'}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de Projets Animée */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((projet, index) => (
              <motion.div
                layout
                key={projet.titre}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl border overflow-hidden transition-all"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow)' }}
              >
                {/* Image & Overlay */}
                <div className="relative h-52 overflow-hidden">
                  <img src={projet.image} alt={projet.titre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a href={projet.lienDemo} className="p-3 bg-white rounded-full text-black hover:bg-[var(--accent-1)] hover:text-white transition-colors"><FaExternalLinkAlt /></a>
                    <a href={projet.lienGithub} className="p-3 bg-white rounded-full text-black hover:bg-[var(--accent-1)] hover:text-white transition-colors"><FaGithub /></a>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{projet.titre}</h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{projet.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projet.technologies?.map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded border font-bold uppercase" 
                            style={{ borderColor: 'var(--border-color)', color: 'var(--accent-1)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                    <a href={projet.lienDemo} target="_blank" rel="noopener noreferrer"
                       className="flex-1 py-3 rounded-xl font-bold text-center text-xs shadow-lg transition-transform hover:scale-105"
                       style={{ backgroundColor: 'var(--accent-1)', color: 'white' }}>
                      Démo Live
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
    </section>
  );
}
