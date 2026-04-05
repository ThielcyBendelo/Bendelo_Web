import React from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Quels types de projets réalisez-vous ?",
    answer: "Je conçois des sites vitrines, des plateformes e-commerce complexes, des applications mobiles natives et des solutions cloud sur-mesure, en intégrant toujours les meilleures pratiques de cybersécurité.",
  },
  {
    question: "Quels sont vos délais de livraison ?",
    answer: "Les délais dépendent de la complexité : environ 2 à 4 semaines pour un site vitrine et 6 à 12 semaines pour une application web ou mobile complète.",
  },
  {
    question: "Proposez-vous un accompagnement après livraison ?",
    answer: "Absolument. J'assure un support technique réactif, des mises à jour de sécurité régulières et une maintenance évolutive pour que votre projet reste performant dans le temps.",
  },
  {
    question: "Comment garantir la sécurité de mon projet ?",
    answer: "La sécurité est au cœur du développement : chiffrement des données, protection contre les failles OWASP, conformité RGPD et audits réguliers durant toute la phase de conception.",
  },
];

function FAQSection() {
  return (
    <section className="py-20 px-6 transition-colors duration-300" 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="faq">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text inline-block">
            FAQ
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Questions fréquentes sur mes services et mon accompagnement.
          </p>
        </div>

        {/* Liste des FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details 
              key={idx} 
              className="group rounded-2xl border transition-all duration-300 overflow-hidden"
              style={{ 
                backgroundColor: 'var(--surface)', 
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg transition-colors hover:opacity-80"
                       style={{ color: 'var(--text-primary)' }}>
                <span>{faq.question}</span>
                <span className="text-[var(--accent-1)] transition-transform duration-300 group-open:rotate-180">
                  <FaChevronDown />
                </span>
              </summary>
              
              <div className="px-6 pb-6 text-base leading-relaxed border-t transition-all"
                   style={{ 
                     color: 'var(--text-secondary)',
                     borderColor: 'var(--border-color)' 
                   }}>
                <div className="pt-4">
                  {faq.answer}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
