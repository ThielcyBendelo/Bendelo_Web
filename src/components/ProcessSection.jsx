import React from "react";
import { FaSearch, FaPalette, FaCode, FaRocket } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Analyse & Conseil",
    description: "Audit et recommandations personnalisées pour un projet sur-mesure.",
  },
  {
    icon: <FaPalette />,
    title: "Design & Prototype",
    description: "Maquettes UX/UI, validation du parcours et identité visuelle.",
  },
  {
    icon: <FaCode />,
    title: "Développement",
    description: "Intégration technique, sécurité et optimisation des performances.",
  },
  {
    icon: <FaRocket />,
    title: "Mise en ligne",
    description: "Déploiement, tests finaux et accompagnement post-livraison.",
  },
];

function ProcessSection() {
  return (
    <section className="py-20 px-6 transition-colors duration-300" 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="process">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text inline-block">
            Mon Processus
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
            Un accompagnement complet, étape par étape, pour garantir la réussite de votre projet digital.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2"
              style={{ 
                backgroundColor: 'var(--surface)', 
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow)'
              }}
            >
              {/* Icône avec dégradé au survol */}
              <div className="text-4xl mb-6 flex justify-center transition-transform group-hover:scale-110" 
                   style={{ color: 'var(--accent-1)' }}>
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-center" 
                  style={{ color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              
              <p className="text-center text-sm leading-relaxed" 
                 style={{ color: 'var(--text-secondary)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
