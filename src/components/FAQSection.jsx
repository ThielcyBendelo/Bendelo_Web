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
      className="py-24 px-6 border-t border-slate-200 dark:border-white/10" 
      style={{ backgroundColor: 'var(--bg)' }} 
      id="faq"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-20">
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Transparence & Vision
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Foire aux <span className="underline decoration-1 underline-offset-8">Questions</span>
          </h2>
          <p className="max-w-xl mx-auto text-base text-slate-600 dark:text-slate-400 font-normal tracking-wide leading-relaxed">
            Répondre au besoin de clarté pour mieux bâtir l'avenir.
          </p>
        </div>

        {/* --- LISTE ACCORDÉON STRICTE --- */}
        <div className="border-t border-slate-200 dark:border-white/10">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div 
                key={idx}
                className="border-b border-slate-200 dark:border-white/10 transition-colors duration-200"
                style={{ backgroundColor: isOpen ? 'var(--surface)' : 'transparent' }}
              >
                <button 
                  type="button"
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between py-6 px-4 text-left outline-none group"
                >
                  <div className="flex items-center gap-6 min-w-0">
                    {/* Indexation de ligne style Terminal */}
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                      [0{idx + 1}]
                    </span>
                    
                    {/* Icône monochrome adaptative */}
                    <span className={`text-lg text-slate-500 dark:text-slate-400 transition-colors duration-300 ${isOpen ? 'text-orange-500 dark:text-orange-500' : 'group-hover:text-slate-950 dark:group-hover:text-white'}`}>
                      {faq.icon}
                    </span>
                    
                    <span className={`text-sm md:text-base font-bold uppercase tracking-wider transition-colors duration-300 ${isOpen ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white'}`}>
                      {faq.question}
                    </span>
                  </div>

                  <motion.span 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xs ${isOpen ? 'text-orange-500' : 'text-slate-400'}`}
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
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      {/* Alignement parfait de la réponse sur le texte du titre */}
                      <div className="pl-16 pr-8 pb-6 pt-1">
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-normal tracking-wide pl-4 border-l border-slate-200 dark:border-white/10">
                          {faq.answer}
                        </p>
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
