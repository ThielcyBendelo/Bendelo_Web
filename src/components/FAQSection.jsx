import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle, FaLightbulb, FaBook, FaTerminal } from "react-icons/fa";

const faqs = [
  {
    question: "Pourquoi allier Ingénierie Logicielle et Éveil de Conscience ?",
    answer: "La technologie n'est qu'un outil puissant. Sans une conscience éveillée pour la diriger, elle perd son sens. Mon approche unit la rigueur de l'ingénieur et la sagesse du coach pour bâtir des solutions qui servent réellement l'humain et l'Afrique.",
    icon: <FaLightbulb />
  },
  {
    question: "Comment vos ouvrages impactent-ils la jeunesse ?",
    answer: "Mes livres sont des manifestes de décolonisation mentale. Ils offrent des clés concrètes pour passer de spectateur à acteur du changement, en utilisant le digital comme levier d'indépendance et de succès.",
    icon: <FaBook />
  },
  {
    question: "Quels types de systèmes digitaux concevez-vous ?",
    answer: "Avec MUAMOKEL AGENCY, je développe des architectures scalables : plateformes e-commerce, applications métiers et infrastructures cloud sécurisées. Chaque ligne de code est pensée pour la performance et la souveraineté numérique.",
    icon: <FaTerminal />
  },
  {
    question: "Proposez-vous du coaching personnalisé ?",
    answer: "Oui. J'accompagne les leaders et entrepreneurs via des sessions d'audit de vision. L'objectif est d'aligner votre puissance intérieure avec vos ambitions technologiques ou professionnelles.",
    icon: <FaQuestionCircle />
  },
];

function FAQSection() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <section 
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5" 
      id="faq"
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

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        
        {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
            // TRANSPARENCE_&_VISION
          </span>
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            FOIRE AUX <span className="text-[#FF6B35] italic">QUESTIONS</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Répondre au besoin de clarté technique et stratégique pour mieux bâtir l'avenir.
          </p>
        </div>

        {/* --- LISTE ACCORDÉON STRUCTURÉE ET DROITE --- */}
        <div className="border-t border-white/10 rounded-none shadow-2xl">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div 
                key={idx}
                className="border-b border-white/10 transition-all duration-300 rounded-none"
                style={{ 
                  backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                  borderColor: isOpen ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <button 
                  type="button"
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between py-6 px-5 text-left outline-none group rounded-none"
                >
                  <div className="flex items-center gap-6 min-w-0">
                    {/* Indexation de ligne style Console de débogage */}
                    <span className={`font-mono text-[11px] transition-colors duration-300 ${isOpen ? 'text-[#FF6B35] font-bold' : 'text-slate-500'}`}>
                      [0{idx + 1}]
                    </span>
                    
                    {/* Icône adaptative */}
                    <span className={`text-xl transition-all duration-300 ${isOpen ? 'text-[#FF6B35] scale-110' : 'text-slate-400 group-hover:text-white'}`}>
                      {faq.icon}
                    </span>
                    
                    {/* Intitulé de la Question */}
                    <span className={`text-sm md:text-base font-bold uppercase tracking-wider transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                      {faq.question}
                    </span>
                  </div>

                  {/* Indicateur de bascule angulaire */}
                  <motion.span 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xs ${isOpen ? 'text-[#FF6B35]' : 'text-slate-500 group-hover:text-white'}`}
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden rounded-none"
                    >
                      {/* Alignement précis du bloc réponse */}
                      <div className="pl-16 pr-6 pb-6 pt-1">
                        <p className="text-slate-400 text-sm leading-relaxed font-medium tracking-wide">
                          {faq.answer}
                        </p>
                        
                        {/* Tag system d'état ouvert */}
                        <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                          <span className="font-mono text-[9px] text-[#FF6B35]/60 tracking-widest uppercase">
                            // LOG_QUERY_RESOLVED
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FAQSection;
