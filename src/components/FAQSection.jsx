import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle, FaLightbulb, FaBook, FaTerminal } from "react-icons/fa";

const faqs = [
  {
    question: "Pourquoi allier Ingénierie Logicielle et Éveil de Conscience ?",
    answer: "La technologie n'est qu'un outil puissant. Sans une conscience éveillée pour la diriger, elle perd son sens. Mon approche unit la rigueur de l'ingénieur et la sagesse du coach pour bâtir des solutions qui servent réellement l'humain et l'Afrique.",
    icon: <FaLightbulb className="text-purple-500" />
  },
  {
    question: "Comment vos ouvrages impactent-ils la jeunesse ?",
    answer: "Mes livres sont des manifestes de décolonisation mentale. Ils offrent des clés concrètes pour passer de spectateur à acteur du changement, en utilisant le digital comme levier d'indépendance et de succès.",
    icon: <FaBook className="text-orange-500" />
  },
  {
    question: "Quels types de systèmes digitaux concevez-vous ?",
    answer: "Avec MUAMOKEL AGENCY, je développe des architectures scalables : plateformes e-commerce, applications métiers et infrastructures cloud sécurisées. Chaque ligne de code est pensée pour la performance et la souveraineté numérique.",
    icon: <FaTerminal className="text-blue-500" />
  },
  {
    question: "Proposez-vous du coaching personnalisé ?",
    answer: "Oui. J'accompagne les leaders et entrepreneurs via des sessions d'audit de vision. L'objectif est d'aligner votre puissance intérieure avec vos ambitions technologiques ou professionnelles.",
    icon: <FaQuestionCircle className="text-emerald-500" />
  },
];

function FAQSection() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
  <section 
  className="py-24 px-6 relative overflow-hidden transition-all duration-700 ease-in-out" 
  style={{ backgroundColor: 'var(--bg)' }} 
  id="faq"
>
  {/* --- EFFETS DE LUEUR ADAPTATIFS --- */}
  <div 
    className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] blur-[120px] rounded-full -z-10 
               opacity-30 dark:opacity-[0.08] transition-opacity duration-1000 animate-pulse" 
    style={{ backgroundColor: 'var(--accent-1)' }} 
  />
  <div 
    className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] blur-[100px] rounded-full -z-10 
               opacity-20 dark:opacity-[0.05] transition-opacity duration-1000" 
    style={{ backgroundColor: 'var(--accent-2)' }} 
  />

  <div className="max-w-4xl mx-auto relative z-10">
    
    {/* --- EN-TÊTE DYNAMIQUE --- */}
    <div className="text-center mb-24">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--accent-1)]/20 bg-[var(--accent-1)]/5 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-[var(--accent-1)] animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent-1)]">
          Transparence & Vision
        </span>
      </motion.div>
      
      <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic leading-none" 
          style={{ color: 'var(--text-primary)' }}>
        Foire aux <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]">
          Questions.
        </span>
      </h2>
      <p className="text-xl max-w-2xl mx-auto font-light italic" 
         style={{ color: 'var(--text-secondary)' }}>
        "Répondre au besoin de clarté pour mieux bâtir l'avenir."
      </p>
    </div>

    {/* --- LISTE ACCORDÉON PREMIUM --- */}
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <motion.div 
          key={idx}
          className={`rounded-[2.5rem] border transition-all duration-500 ${
            activeIdx === idx 
            ? "border-[var(--accent-2)]/30 shadow-2xl scale-[1.01]" 
            : "border-[var(--border-color)] hover:border-[var(--accent-1)]/20"
          }`}
          style={{ 
            backgroundColor: activeIdx === idx ? 'var(--surface)' : 'transparent',
            backdropFilter: 'blur(10px)'
          }}
        >
          <button 
            onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between p-8 text-left outline-none"
          >
            <div className="flex items-center gap-5">
              <span className={`text-2xl transition-all duration-500 ${activeIdx === idx ? "scale-125 rotate-6" : "opacity-40"}`}>
                {faq.icon}
              </span>
              <span className="text-lg md:text-xl font-bold tracking-tight transition-colors"
                    style={{ color: activeIdx === idx ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {faq.question}
              </span>
            </div>
            <motion.span 
              animate={{ rotate: activeIdx === idx ? 180 : 0 }}
              className="text-sm"
              style={{ color: activeIdx === idx ? 'var(--accent-2)' : 'var(--text-secondary)' }}
            >
              <FaChevronDown />
            </motion.span>
          </button>
          
          <AnimatePresence>
            {activeIdx === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="px-8 pb-10 pt-2">
                  <div className="h-px w-24 mb-8" style={{ backgroundColor: 'var(--accent-2)' }} />
                  <p className="text-lg leading-relaxed font-light pl-4 border-l" 
                     style={{ 
                       color: 'var(--text-secondary)', 
                       borderColor: 'var(--border-color)' 
                     }}>
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
}

export default FAQSection;
