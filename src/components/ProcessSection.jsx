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
    <section 
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5" 
      id="process"
    >
      {/* --- GRILLE COMPLÉMENTAIRE MAILLAGE GÉOMÉTRIQUE STRICT --- */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`, 
          backgroundSize: '45px 45px',
          backgroundPosition: 'center top'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* --- EN-TÊTE DE SECTION STYLE TERMINAL --- */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block"
          >
            // METHODOLOGIE_AGILE
          </motion.span>
          
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            MON PROCESSUS <span className="text-[#FF6B35] italic">OPÉRATIONNEL</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Une approche d'ingénierie structurée et sans compromis pour transformer vos infrastructures logicielles complexes en systèmes hautement disponibles.
          </p>
        </div>

        {/* --- GRILLE CHIRURGICALE DE CARTES GÉOMÉTRIQUES --- */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 flex flex-col justify-between min-h-[340px] rounded-none shadow-2xl"
            >
              {/* Effet lueur de fond angulaire au survol */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />

              <div>
                {/* En-tête de carte : Icône brute & Phase */}
                <div className="flex justify-between items-start mb-8">
                  <div className="text-white text-2xl transition-all duration-300 group-hover:text-[#FF6B35] group-hover:scale-110">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 tracking-widest rounded-none">
                    {step.tag}
                  </span>
                </div>
                
                {/* Titre de l'étape */}
                <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">
                  {step.title}
                </h3>
                
                {/* Description de l'étape */}
                <p className="text-slate-400 text-sm leading-relaxed font-medium tracking-wide">
                  {step.description}
                </p>
              </div>

              {/* Indicateur inférieur de complétion de pipeline */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-slate-500 font-mono text-[10px] tracking-widest">
                <span>&gt;_ STEP_READY</span>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-[#FF6B35] font-black text-xs">
                  // OK
                </span>
              </div>

              {/* Flèche de liaison minimaliste (Uniquement desktop) */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-white/20 text-xs pointer-events-none group-hover:text-[#FF6B35]/60 transition-colors">
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
