import React, { useState } from 'react';
import { projects } from '../assets/assets.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaGlobe, FaMobileAlt, FaLayerGroup, FaBookOpen } from 'react-icons/fa';

// Définition des catégories de filtrage épurées
const categories = [
  { id: 'all', label: 'Tous', icon: <FaLayerGroup /> },
  { id: 'web', label: 'Tech & Web', icon: <FaGlobe /> },
  { id: 'impactation', label: 'Éveil', icon: <FaBookOpen /> }, 
  { id: 'impact', label: 'Livres', icon: <FaBookOpen /> },
  { id: 'mobile', label: 'Mobile', icon: <FaMobileAlt /> },
];

export default function ProjetSimple() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filtrage des projets
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.categorie?.toLowerCase() === activeFilter);

  return (
    <section 
      id="projects" 
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5 text-white"
    >
      {/* --- MAILLAGE BLUEPRINT GÉOMÉTRIQUE EN ARRIÈRE-PLAN --- */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`, 
          backgroundSize: '45px 45px',
          backgroundPosition: 'center top'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
            // DIGITAL_SYSTEMS_&_HUMAN_AWAKENING
          </span>
          
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            IMPACT <span className="text-[#FF6B35] italic">GLOBAL</span>
          </h2>

          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Découvrez mes réalisations : des architectures logicielles robustes pour les entreprises et des missions d'éveil dédiées à la transformation de la jeunesse.
            </p>
            
            <div className="flex justify-center items-center gap-4 pt-2 font-mono text-[9px] text-slate-500 tracking-wider uppercase">
              <div className="h-[1px] w-8 bg-white/10" />
              <span>Technologie • Conscience • Leadership</span>
              <div className="h-[1px] w-8 bg-white/10" />
            </div>
          </div>
        </div>

        {/* --- FILTRES CATÉGORIES (puces alignées, scroll tactile sans barre) --- */}
        <div className="flex justify-center mb-16">
          <div
            role="tablist"
            aria-label="Catégories de projets"
            className="inline-flex flex-nowrap items-center gap-2 sm:gap-2.5 max-w-full overflow-x-auto overscroll-x-contain px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
          >
            {categories.map((cat) => {
              const isSelected = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5 font-mono font-bold uppercase text-[10px] sm:text-[11px] tracking-widest border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#0f3d2e] text-emerald-100 border-emerald-500/40 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]'
                      : 'bg-[#141a22] border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                  }`}
                >
                  <span className={isSelected ? 'text-emerald-200' : 'text-slate-500'}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

              
           {/* --- GRILLE DE COMPOSANTS RESPONSIVE --- */}
<div className="relative w-full z-10">
  <motion.div 
    layout 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12 px-1"
  >
    <AnimatePresence mode='popLayout'>
      {filteredProjects.map((projet) => (
        <motion.div
          layout
          key={projet.titre}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.99 }}
          className="group relative border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 flex flex-col h-full rounded-none shadow-2xl w-full"
        >
          {/* Zone Média / Image avec Grayscale et Cache Technique */}
          <div className="relative h-52 overflow-hidden border-b border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500 bg-neutral-950 rounded-none flex-shrink-0">
            <img 
              src={projet.image} 
              alt={projet.titre} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-none" 
              loading="lazy"
            />
            
            {/* Actions au survol Mat - Strictement carrées */}
            <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20 rounded-none">
              <a 
                href={projet.lienDemo} 
                target="_blank" 
                rel="noreferrer" 
                className="p-3.5 bg-white text-black hover:bg-[#FF6B35] hover:text-white transition-colors rounded-none"
              >
                <FaExternalLinkAlt className="text-sm" />
              </a>
              
              <a 
                href={projet.lienGithub} 
                target="_blank" 
                rel="noreferrer" 
                className="p-3.5 border-2 border-white text-white hover:bg-white hover:text-black transition-colors rounded-none"
              >
                <FaGithub className="text-sm" />
              </a>
            </div>
          </div>

          {/* Contenu textuel Haute Visibilité */}
          <div className="p-6 flex flex-col justify-between flex-grow relative z-10">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-3">
                {projet.titre}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed font-medium tracking-wide mb-6">
                {projet.description}
              </p>
              
              {/* Tags au format micro-log de commit Git */}
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px] mb-6">
                {projet.technologies?.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-0.5 border border-white/5 text-[#FF6B35] bg-[#FF6B35]/5 uppercase tracking-wider rounded-none whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bouton d'action intégré - Bordure franche, sans angles */}
            <div className="pt-4 border-t border-white/5 mt-auto">
              <a 
                href={projet.lienDemo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-4 bg-white text-black font-black uppercase text-center text-xs tracking-widest hover:bg-[#FF6B35] hover:text-white transition-all duration-300 rounded-none"
              >
                Démo Live
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
</div>
      </div>
    </section>
  );
}
