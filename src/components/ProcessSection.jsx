import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaPalette, FaCode, FaRocket, FaChevronRight } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Audit & Stratégie",
    description: "Analyse technique approfondie et définition de l'architecture logicielle pour une base robuste.",
    tag: "Phase 01"
  },
  {
    icon: <FaPalette />,
    title: "Architecture UX/UI",
    description: "Conception centrée utilisateur et prototypage haute fidélité pour une expérience digitale fluide.",
    tag: "Phase 02"
  },
  {
    icon: <FaCode />,
    title: "Ingénierie & Dev",
    description: "Développement full-stack avec focus sur la sécurité, la scalabilité et l'optimisation algorithmique.",
    tag: "Phase 03"
  },
  {
    icon: <FaRocket />,
    title: "QA & Déploiement",
    description: "Tests d'assurance qualité rigoureux et mise en production continue (CI/CD) sécurisée.",
    tag: "Phase 04"
  },
];

function ProcessSection() {
  return (
    <section className="py-20 px-6 relative overflow-hidden border-t border-slate-200/50 dark:border-white/5" 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="process">
      
      {/* Glow décoratif */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-orange-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Méthodologie Agile
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-white text-gray-400 dark:text-white mb-6 tracking-tighter uppercase italic">
            Mon Processus <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">Opérationnel</span><span className="text-orange-500">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-slate-400 font-medium">
            Une approche d'ingénierie structurée pour transformer vos idées complexes en solutions digitales performantes.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-15">
  {steps.map((step, idx) => (
    <motion.div 
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="relative group p-10 rounded-[2.5rem] 
        /* Fond totalement transparent */
        bg-transparent
        /* Effet de flou pour la lisibilité et bordures adaptatives */
        backdrop-blur-xl border border-slate-200/40 dark:border-white/10 
        /* Ombre douce pour le relief */
        shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]
        transition-all duration-500 hover:border-orange-500/50 overflow-hidden"
    >
              {/* Numérotation Phase */}
              <span className="absolute top-8 right-8 text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-50 group-hover:text-orange-500 transition-colors">
                {step.tag}
              </span>

              {/* Icône avec cercle de fond */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white text-3xl mb-8 shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all">
                {step.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-400 dark:text-white tracking-tight">
                {step.title}
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {step.description}
              </p>

              {/* Flèche de liaison (uniquement sur desktop) */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/4 -translate-y-1/2 z-20 text-slate-300 dark:text-white/10 text-xl group-hover:translate-x-2 transition-transform">
                  <FaChevronRight />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
