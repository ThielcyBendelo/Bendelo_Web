import React from 'react';
import TestimonialsSection from './TestimonialsSection.jsx';
import { experiences } from '../assets/assets.js';
import {
  FaBriefcase,
  FaBuilding,
  FaHome,
  FaGraduationCap,
  FaLightbulb,
  FaBook,
  FaGlobeAfrica
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const roleIcon = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'impact':
    case 'éveil':
    case 'coaching':
      return <FaLightbulb />;
    case 'auteur':
    case 'publication':
      return <FaBook />;
    case 'mission':
      return <FaGlobeAfrica />;
    case 'internship':
    case 'stage':
      return <FaGraduationCap />;
    case 'remote':
      return <FaHome />;
    default:
      return <FaBriefcase />;
  }
};

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section 
      id="experience" 
      className="py-24 px-6 border-t border-slate-200 dark:border-white/10"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-24">
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Parcours & Leadership
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Trajec<span className="underline decoration-1 underline-offset-8">toire</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-slate-600 dark:text-slate-400 font-normal tracking-wide leading-relaxed italic">
              "Bâtir des systèmes technologiques robustes, transmettre des architectures de pensée performantes."
            </p>
          </div>
        </div>

        {/* --- ARCHITECTURE PIPELINE DE LA TIMELINE --- */}
        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={containerVariants}
        >
          {/* Ligne centrale structurelle stricte */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-slate-200 dark:bg-white/10" />

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Point d'ancrage / Icône brute style registre de log */}
                <div 
                  className="flex items-center justify-center w-10 h-10 border bg-slate-50 dark:bg-[#09090b] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 shrink-0 absolute left-5 md:left-1/2 -translate-x-1/2 z-10 transition-colors duration-300 group-hover:text-orange-500 group-hover:border-slate-400 dark:group-hover:border-white/30"
                >
                  {roleIcon(exp.type || exp.category)}
                </div>

                {/* Panneau de contenu orthogonal */}
                <div className="w-[calc(100%-4rem)] md:w-[44%] p-6 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-colors duration-300 hover:border-slate-400 dark:hover:border-white/30 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col mb-4">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        // {exp.year}
                      </span>
                      <h3 className="text-base font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-2">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        <FaBuilding className="text-slate-400" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs leading-relaxed font-normal tracking-wide text-slate-600 dark:text-slate-400 mb-6 pl-4 border-l border-slate-200 dark:border-white/10">
                      {exp.description}
                    </p>
                  </div>

                  {/* Badges de technologies / type au format commit Git */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                    <span className="px-2 py-0.5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5 uppercase">
                      {exp.type || 'Full-time'}
                    </span>
                    {exp.tags?.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 border border-slate-200 dark:border-white/5 text-slate-400 bg-white dark:bg-white/5 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- REGISTRE DE VÉRIFICATION FINAL --- */}
        <div className="mt-28 p-8 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] text-center">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">// [ academic_&_professional_standards ]</h4>
          <div className="flex flex-wrap justify-center gap-8 font-sans text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <span>AWS ARCHITECT</span>
            <span>SCRUM MASTER</span>
            <span>E-COACH CERTIFIED</span>
          </div>
        </div>

      </div>
    </section>
  );
}
