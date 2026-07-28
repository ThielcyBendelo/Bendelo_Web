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
    <section className="py-24 px-6 max-w-7xl mx-auto relative z-20 border-t border-orange-500/40 dark:border-slate/20 " 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="process">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- EN-TÊTE DE SECTION ÉPURÉ --- */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-950 dark:text-slate-850 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block"
          >
            Méthodologie Agile
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Mon Processus <span className="underline decoration-1 underline-offset-8">Opérationnel</span>
          </h2>
          <p className="text-base md:text-lg text-slate-950 dark:text-slate-400 font-black tracking-wide leading-relaxed max-w-2xl mx-auto">
            Une approche d'ingénierie structurée pour transformer vos idées complexes en solutions digitales performantes.
          </p>
        </div>

        {/* --- GRILLE BRUTE & ALIGNEMENTS CHIRURGICAUX --- */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.99 }}
              className="relative p-8 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-colors duration-300 hover:border-slate-400 dark:hover:border-white/30 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                {/* En-tête de carte : Icône brute et Indicateur de Phase alignés horizontalement */}
                <div className="flex justify-between items-start mb-8">
                  <div className="text-slate-950 dark:text-white text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                    {step.icon}
                  </div>
                  <span className="text-[15px] font-black text-slate-950 dark:text-slate-850 uppercase tracking-widest">
                    {step.tag}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-slate-950 dark:text-slate-850 text-sm leading-relaxed font-black tracking-wide mb-4">
                  {step.description}
                </p>
              </div>

              {/* Flèche de liaison minimaliste (Uniquement desktop, sans animation parasite) */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-slate-300 dark:text-white/10 text-sm pointer-events-none">
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
