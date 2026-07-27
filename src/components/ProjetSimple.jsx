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
    <section id="projects" className="py-24 px-6 border-t border-slate-200 dark:border-white/10 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-20 relative">
          <span className="text-slate-400 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Digital Systems & Human Awakening
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black text-slate-400 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Impact <span className="underline decoration-1 underline-offset-8">Global</span>
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-base text-slate-600 dark:text-slate-400 font-normal tracking-wide leading-relaxed">
              Découvrez mes réalisations : des architectures logicielles robustes pour les entreprises et des missions d'éveil dédiées à la transformation de la jeunesse africaine.
            </p>
            
            <div className="flex justify-center items-center gap-4 pt-2 font-mono text-[9px] text-slate-400 dark:text-slate-500">
              <div className="h-[1px] w-6 bg-slate-200 dark:bg-white/10" />
              <span>TECHNOLOGIE • CONSCIENCE • LEADERSHIP</span>
              <div className="h-[1px] w-6 bg-slate-200 dark:bg-white/10" />
            </div>
          </div>
        </div>

        {/* --- FILTRES BARRE D'OUTILS --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 font-bold uppercase text-[10px] tracking-widest border transition-all duration-200 ${
                  isSelected 
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-black border-transparent' 
                    : 'bg-slate-50 dark:bg-[#09090b] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30'
                }`}
              >
                <span className={isSelected ? 'text-white dark:text-black' : 'text-slate-400 dark:text-slate-500'}>
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* --- GRILLE DE PROJETS BRUTE --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((projet) => (
              <motion.div
                layout
                key={projet.titre}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                whileTap={{ scale: 0.99 }}
                className="group relative border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-all duration-300 hover:border-slate-400 dark:hover:border-white/30 flex flex-col h-full"
              >
                {/* Zone Média / Image avec Grayscale */}
                <div className="relative h-52 overflow-hidden border-b border-slate-200 dark:border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500 bg-neutral-950">
                  <img 
                    src={projet.image} 
                    alt={projet.titre} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  
                  {/* Actions au survol Mat */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                    <a href={projet.lienDemo} target="_blank" rel="noreferrer" className="p-3 bg-white text-black hover:bg-slate-200 transition-colors">
                      <FaExternalLinkAlt className="text-sm" />
                    </a>
                    <a href={projet.lienGithub} target="_blank" rel="noreferrer" className="p-3 border border-white text-white hover:bg-white hover:text-black transition-colors">
                      <FaGithub className="text-sm" />
                    </a>
                  </div>
                </div>

                {/* Contenu textuel */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-2">
                      {projet.titre}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-normal tracking-wide line-clamp-2 mb-4">
                      {projet.description}
                    </p>
                    
                    {/* Tags au format commit Git */}
                    <div className="flex flex-wrap gap-1.5 font-mono text-[9px] mb-6">
                      {projet.technologies?.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5 uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bouton d'action intégré */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                    <a 
                      href={projet.lienDemo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-slate-950 dark:bg-white text-white dark:text-black font-bold uppercase text-center text-xs tracking-widest hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
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
    </section>
  );
}
