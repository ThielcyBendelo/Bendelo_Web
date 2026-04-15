import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';

const technologies = [
  {
    name: 'React Ecosystem',
    icon: <FaReact />,
    color: '#61DAFB',
    description: 'Architecture de composants scalables, gestion d\'état complexe et optimisation du rendu Virtual DOM.',
    level: 'Expert / Lead',
  },
  {
    name: 'Node.js Runtime',
    icon: <FaNodeJs />,
    color: '#339933',
    description: 'Développement de microservices asynchrones et serveurs haute disponibilité pilotés par les événements.',
    level: 'Expert / Architect',
  },
  {
    name: 'MongoDB Atlas',
    icon: <SiMongodb />,
    color: '#47A248',
    description: 'Modélisation de données NoSQL complexes, agrégations avancées et gestion de clusters distribués.',
    level: 'Advanced / Senior',
  },
  {
    name: 'Enterprise Express',
    icon: <SiExpress />,
    color: '#FFFFFF', // Fix pour le mode sombre, peut être ajusté dynamiquement
    description: 'Conception d\'APIs RESTful sécurisées avec middlewares personnalisés et gestion rigoureuse des flux.',
    level: 'Expert',
  },
  {
    name: 'Docker Engine',
    icon: <FaDocker />,
    color: '#2496ED',
    description: 'Conteneurisation d\'applications, orchestration de services et isolation d\'environnements de production.',
    level: 'Senior / DevOps',
  },
  {
    name: 'Modern Tailwind',
    icon: <SiTailwindcss />,
    color: '#06B6D4',
    description: 'Systèmes de design atomiques et interfaces fluides avec une approche mobile-first et performance CSS.',
    level: 'Expert',
  },
];

function TechSection() {
  return (
    <section className="py-20 px-6 relative overflow-hidden border-t border-slate-200/50 dark:border-white/5" style={{ backgroundColor: 'var(--bg)' }}>
      
      {/* Glow décoratif en arrière-plan */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Stack Technologique
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-white text-gray-400 dark:text-white mb-6 tracking-tighter uppercase italic"
          >
            Maîtrise <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">Full-Stack</span><span className="text-orange-500">.</span>
          </motion.h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
            Une sélection d'outils de pointe pour bâtir des infrastructures logicielles robustes, sécurisées et prêtes pour l'échelle.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group p-10 rounded-[2.5rem] bg-transparent backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Effet de lueur au survol spécifique à la couleur de la techno */}
              <div 
                className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-20 blur-[50px] rounded-full transition-opacity duration-500"
                style={{ backgroundColor: tech.color }}
              />

              <div className="flex items-center gap-6 mb-8 relative z-10">
                <div 
                  className="text-5xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" 
                  style={{ color: tech.color }}
                >
                  {tech.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-400 dark:text-white tracking-tight">
                    {tech.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-orange-500/30 text-orange-500 bg-orange-500/5">
                      {tech.level}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 dark:text-orange-400 text-base leading-relaxed font-medium relative z-10 group-hover:text-orange-400 dark:group-hover:text-white transition-colors">
                {tech.description}
              </p>

              {/* Barre de soulignement décorative au survol */}
              <div 
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700"
                style={{ backgroundColor: tech.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechSection;
