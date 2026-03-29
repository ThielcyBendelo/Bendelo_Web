import React from "react";

const faqs = [
  {
    question: "Quels types de projets réalisez-vous ?",
    answer: "Nous créons des sites web, applications mobiles, solutions cloud, design UI/UX, et proposons des services de cybersécurité et maintenance.",
  },
  {
    question: "Quels sont vos délais de livraison ?",
    answer: "Les délais varient selon le projet : site vitrine (2-4 semaines), e-commerce (3-6 semaines), application mobile (3-6 semaines), etc.",
  },
  {
    question: "Proposez-vous un accompagnement après livraison ?",
    answer: "Oui, nous assurons un support technique, des mises à jour et une maintenance selon le contrat choisi.",
  },
  {
    question: "Comment garantir la sécurité de mon projet ?",
    answer: "Nous réalisons des audits, mettons en place des protocoles de sécurité, et assurons la conformité RGPD.",
  },
];

function FAQSection() {
  return (
    <section className="py-16 px-8 bg-gradient-to-b from-black via-black-50 to-blur-50" id="faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl text-center text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">FAQ</h2>
        <p className="text-lg text-gray-400 mb-10 text-center">Questions fréquentes sur nos services et notre accompagnement.</p>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <details key={idx} className="bg-from-black via-black-50 to-blur-50 rounded-xl shadow p-4 border border-blue-100">
              <summary className="text-xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text cursor-pointer text-lg">{faq.question}</summary>
              <div className="mt-2 text-gray-400 text-base">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
