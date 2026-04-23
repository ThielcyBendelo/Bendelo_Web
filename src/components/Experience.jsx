import React from 'react';
import TestimonialsSection from './TestimonialsSection.jsx';
import { experiences } from '../assets/assets.js';
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaHome,
  FaHandshake,
  FaGraduationCap,
  FaLightbulb,
  FaBook,
  FaGlobeAfrica
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section 
      id="experience" 
      className="py-24 px-6 transition-all duration-700"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER DYNAMIQUE & ADAPTATIF */}
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--accent-1)]/20 bg-[var(--accent-1)]/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-2)] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--accent-1)]">
              Parcours & Leadership
            </span>
          </motion.div>

          <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter uppercase italic leading-none" 
              style={{ color: 'var(--text-primary)' }}>
            Trajec<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]">toire</span><span className="text-[var(--accent-2)]">.</span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-3xl font-light leading-snug italic" style={{ color: 'var(--text-secondary)' }}>
              "Bâtir des <span className="text-[var(--text-primary)] font-bold">systèmes</span>, transmettre des <span className="text-[var(--accent-2)] font-black">visions</span>."
            </p>
            
            <div className="flex justify-center items-center gap-8 mt-12 opacity-40">
              <div className="h-[1px] flex-1 bg-gradient-to-l from-[var(--accent-2)] to-transparent" />
              <p className="text-[9px] font-black uppercase tracking-[0.6em] text-[var(--text-secondary)] whitespace-nowrap">
                Roadmap Professionnelle
              </p>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--accent-2)] to-transparent" />
            </div>
          </div>
        </div>

        {/* TIMELINE ARCHITECTURE */}
        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Ligne centrale adaptative */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-20" 
               style={{ backgroundColor: 'var(--text-secondary)' }} />

          <div className="space-y-24">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
              >
                {/* Icône de la Timeline */}
                <div 
                  className="flex items-center justify-center w-12 h-12 rounded-2xl border shadow-xl shrink-0 absolute left-5 md:left-1/2 -translate-x-1/2 z-10 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--surface)', 
                    borderColor: 'var(--border-color)',
                    color: 'var(--accent-2)' 
                  }}
                >
                  {roleIcon(exp.type || exp.category)}
                </div>

                {/* Carte de contenu Premium */}
                <div 
                  className="w-[calc(100%-5rem)] md:w-[42%] p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:border-[var(--accent-1)]/30"
                  style={{ 
                    backgroundColor: 'var(--surface)', 
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <div className="flex flex-col mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--accent-1)' }}>
                      {exp.year}
                    </span>
                    <h3 className="text-2xl font-black mb-2 tracking-tight group-hover:text-[var(--accent-2)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                      <FaBuilding className="text-[var(--accent-1)]" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  
                  <p className="text-base leading-relaxed font-light mb-8 pl-4 border-l-2 border-[var(--border-color)] group-hover:border-[var(--accent-2)] transition-all" 
                     style={{ color: 'var(--text-secondary)' }}>
                    {exp.description}
                  </p>

                  {/* Badges adaptatifs */}
                  <div className="flex flex-wrap gap-2">
                     <span className="text-[9px] font-black uppercase tracking-tighter px-3 py-1 rounded-lg border transition-colors" 
                           style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg)' }}>
                       {exp.type || 'Full-time'}
                     </span>
                     {exp.tags?.map(tag => (
                        <span key={tag} className="text-[9px] font-black uppercase tracking-tighter px-3 py-1 rounded-lg bg-[var(--accent-1)]/10 text-[var(--accent-1)]">
                          {tag}
                        </span>
                     ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section finale de réassurance */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 text-center py-20 rounded-[4rem] border border-dashed border-[var(--border-color)]"
        >
           <h4 className="text-xs font-black uppercase tracking-[0.5em] mb-6" style={{ color: 'var(--text-secondary)' }}>Certifications & Formations</h4>
           <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
              {/* Ajoutez ici vos logos de certifs ou labels (AWS, Google, etc.) */}
              <span className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>AWS ARCHITECT</span>
              <span className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>SCRUM MASTER</span>
              <span className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>E-COACH CERTIFIED</span>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
