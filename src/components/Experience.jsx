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
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5"
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

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- EN-TÊTE DE SECTION STYLE REGISTRE --- */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
            // PARCOURS_&_LEADERSHIP
          </span>
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            TRAJEC<span className="text-[#FF6B35] italic">TOIRE</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed italic">
              "Bâtir des systèmes technologiques robustes, transmettre des architectures de pensée performantes."
            </p>
          </div>
        </div>

               {/* --- ARCHITECTURE PIPELINE DE LA TIMELINE ADAPTATIVE --- */}
        <div className="relative w-full z-10">
          {/* Masques de dégradé discrets visibles UNIQUEMENT sur mobile (masqués sur desktop via md:hidden) */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0A1622] to-transparent z-20 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0A1622] to-transparent z-20 pointer-events-none md:hidden" />

          <motion.div 
            className="flex flex-nowrap md:block gap-6 overflow-x-auto md:overflow-x-visible overscroll-x-contain pb-8 pt-4 px-4 max-w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={containerVariants}
          >
            {/* Ligne centrale structurelle stricte (Carrée) - Visible UNIQUEMENT sur Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/10" />

            {/* Ligne de pipeline horizontale continue - Visible UNIQUEMENT sur Mobile */}
            <div className="block md:hidden absolute left-0 right-0 top-[34px] h-[1px] bg-white/10 z-0" />

            <div className="flex flex-nowrap md:space-y-16 w-full gap-6 md:gap-0">
              {experiences.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group shrink-0 md:shrink w-[290px] sm:w-[360px] md:w-full"
                >
                  {/* Point d'ancrage / Icône brute style registre de log - Ajusté pour s'aligner sur les deux axes */}
                  <div 
                    className="flex items-center justify-center w-10 h-10 border bg-[#0A1622] text-slate-400 border-white/10 shrink-0 absolute left-4 md:left-1/2 top-0 md:top-auto md:-translate-x-1/2 z-10 transition-all duration-300 group-hover:text-[#FF6B35] group-hover:border-[#FF6B35]/40 group-hover:scale-110 rounded-none shadow-2xl"
                  >
                    {roleIcon(exp.type || exp.category)}
                  </div>

                  {/* Panneau de contenu orthogonal (Zéro Radius) - Marge supérieure sur mobile pour laisser la place à l'icône */}
                  <div className="w-full md:w-[44%] mt-16 md:mt-0 p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 flex flex-col justify-between rounded-none shadow-2xl relative overflow-hidden h-[380px] md:h-auto">
                    {/* Glow discret au survol */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex flex-col mb-6">
                        <span className="font-mono font-bold text-[10px] uppercase tracking-[0.3em] text-[#FF6B35] mb-2">
                          &gt;_ {exp.year}
                        </span>
                        <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2 leading-tight line-clamp-2 md:line-clamp-none">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500">
                          <FaBuilding className="text-[#FF6B35]" />
                          <span className="truncate">{exp.company}</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-400 text-sm leading-relaxed font-medium mb-6 line-clamp-4 md:line-clamp-none">
                        {exp.description}
                      </p>
                    </div>

                    {/* Badges de technologies au format micro-log - Carrés */}
                    <div className="flex flex-wrap gap-2 font-mono text-[9px] relative z-10 mt-auto md:mt-0">
                      <span className="px-2.5 py-1 border border-[#FF6B35]/30 text-white bg-[#FF6B35] uppercase tracking-widest font-black rounded-none whitespace-nowrap">
                        {exp.type || 'FULL-TIME'}
                      </span>
                      {exp.tags?.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 border border-white/10 text-slate-300 bg-white/5 uppercase tracking-wider rounded-none whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>


        {/* --- REGISTRE DE VÉRIFICATION FINAL STYLE TERMINAL --- */}
        <div className="mt-28 p-10 border border-white/10 bg-white/[0.01] rounded-none shadow-2xl relative">
           {/* Décoration d'angle technique */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#FF6B35]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#FF6B35]" />
          
          <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-slate-500 mb-6">
            // [ ACADEMIC_&_PROFESSIONAL_STANDARDS ]
          </h4>
          
          <div className="flex flex-wrap justify-center gap-12 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF6B35] rounded-none animate-pulse"></span>
              AWS ARCHITECT
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF6B35] rounded-none animate-pulse"></span>
              SCRUM MASTER
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF6B35] rounded-none animate-pulse"></span>
              E-COACH CERTIFIED
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
