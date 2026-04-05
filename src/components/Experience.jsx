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
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const roleIcon = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'internship':
    case 'stage':
      return <FaGraduationCap />;
    case 'contract':
    case 'freelance':
      return <FaHandshake />;
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
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section 
      id="experience" 
      className="py-24 px-6 transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text inline-block">
            Expériences
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Mon parcours professionnel et mes réalisations clés.
          </p>
        </div>

        {/* Timeline Container */}
        <motion.div 
          className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5"
          style={{ '--tw-before-bg': 'var(--border-color)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* La ligne verticale de la timeline */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border-color)] -translate-x-1/2" />

          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
            >
              {/* Le point sur la timeline */}
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-5 md:left-1/2 -translate-x-1/2 z-10 transition-transform group-hover:scale-125"
                style={{ 
                  backgroundColor: 'var(--surface)', 
                  borderColor: 'var(--accent-1)',
                  color: 'var(--accent-1)' 
                }}
              >
                {roleIcon(exp.type)}
              </div>

              {/* La carte de contenu */}
              <div 
                className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-2xl border transition-all duration-300 hover:shadow-2xl"
                style={{ 
                  backgroundColor: 'var(--surface)', 
                  borderColor: 'var(--border-color)',
                  boxShadow: 'var(--shadow)'
                }}
              >
                <div className="flex flex-col mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent-2)' }}>
                    {exp.year}
                  </span>
                  <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--accent-1)' }}>
                    <FaBuilding />
                    <span>{exp.company}</span>
                  </div>
                </div>
                
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {exp.description}
                </p>

                {/* Badge de type de contrat */}
                <div className="mt-4 flex gap-2">
                   <span className="text-[10px] font-bold px-2 py-1 rounded-full border opacity-70" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                     {exp.type || 'Full-time'}
                   </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
