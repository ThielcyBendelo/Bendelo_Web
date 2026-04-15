import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "Quels types de projets réalisez-vous ?",
    answer: "Je conçois des architectures logicielles haute performance : sites vitrines premium, plateformes e-commerce scalables, applications mobiles natives et infrastructures cloud critiques avec focus cybersécurité.",
  },
  {
    question: "Quels sont vos délais de livraison ?",
    answer: "L'ingénierie de qualité prend du temps : comptez environ 2 à 4 semaines pour un MVP vitrine et 8 à 16 semaines pour un système d'entreprise complet incluant tests QA et déploiement CI/CD.",
  },
  {
    question: "Proposez-vous un accompagnement après livraison ?",
    answer: "En tant qu'associé principal, j'assure un SLA (Service Level Agreement) rigoureux : maintenance préventive, monitoring 24/7 et mises à jour de sécurité critiques pour garantir la pérennité de votre actif digital.",
  },
  {
    question: "Comment garantir la sécurité de mon projet ?",
    answer: "La sécurité est 'by design' : implémentation du Top 10 OWASP, chiffrement AES-256, protocoles d'authentification robustes (OAuth2/JWT) et audits de vulnérabilité avant chaque mise en production.",
  },
];

function FAQSection() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <section className="py-20 px-6 relative overflow-hidden border-t border-slate-200/50 dark:border-white/5" 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="faq">
      
      {/* Effet de lueur en fond */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* En-tête avec Branding Agence */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Support & Conseil
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-400 dark:text-white mb-6 tracking-tighter uppercase italic">
            Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">Fréquentes</span><span className="text-orange-500">.</span>
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Des réponses claires pour éclairer votre stratégie de digitalisation.
          </p>
        </div>

        {/* Liste des FAQs avec Glassmorphism Transparent */}
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                activeIdx === idx 
                ? "border-orange-500/50 bg-white/5 dark:bg-white/5 shadow-2xl" 
                : "border-slate-200/50 dark:border-white/10 bg-transparent"
              }`}
            >
              <button 
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 text-left outline-none"
              >
                <div className="flex items-center gap-4">
                  <FaQuestionCircle className={`text-xl transition-colors ${activeIdx === idx ? "text-orange-500" : "text-slate-400"}`} />
                  <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${activeIdx === idx ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                    {faq.question}
                  </span>
                </div>
                <motion.span 
                  animate={{ rotate: activeIdx === idx ? 180 : 0 }}
                  className={`text-lg ${activeIdx === idx ? "text-orange-500" : "text-slate-400"}`}
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
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-8 pb-8 pt-2">
                      <div className="h-px w-full bg-gradient-to-r from-orange-500/20 via-transparent to-transparent mb-6" />
                      <p className="text-base md:text-lg leading-relaxed text-gray-400 dark:text-gray-400 font-medium">
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
