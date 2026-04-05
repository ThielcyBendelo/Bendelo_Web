import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDocker, FaAws } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';

const technologies = [
  {
    name: 'React',
    icon: <FaReact />,
    color: '#61DAFB',
    description: 'Interfaces utilisateur dynamiques et performantes.',
    level: 'Expert',
  },
  {
    name: 'Node.js',
    icon: <FaNodeJs />,
    color: '#339933',
    description: 'Backend rapide et scalable pour des APIs robustes.',
    level: 'Expert',
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb />,
    color: '#47A248',
    description: 'Base de données NoSQL flexible pour applications modernes.',
    level: 'Avancé',
  },
  {
    name: 'Express.js',
    icon: <SiExpress />,
    color: 'var(--text-primary)', // S'adapte au mode
    description: 'Framework web minimaliste, rapide et flexible.',
    level: 'Expert',
  },
  {
    name: 'Docker',
    icon: <FaDocker />,
    color: '#2496ED',
    description: 'Conteneurisation et déploiement simplifié.',
    level: 'Avancé',
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss />,
    color: '#06B6D4',
    description: 'Design moderne et responsive avec une approche utility-first.',
    level: 'Expert',
  },
];

function TechSection() {
  return (
    <section className="py-20 px-6 transition-colors duration-300" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text inline-block"
          >
            Stack Technique
          </motion.h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
            Les outils et technologies que j'utilise pour transformer vos idées en solutions numériques puissantes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl border transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--surface)', 
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {tech.name}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full border" 
                        style={{ borderColor: 'var(--accent-1)', color: 'var(--accent-1)' }}>
                    {tech.level}
                  </span>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechSection;
