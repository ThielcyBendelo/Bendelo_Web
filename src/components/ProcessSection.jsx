import React from "react";

const steps = [
  {
    icon: "📝",
    title: "Analyse & Conseil",
    description: "Écoute de vos besoins, audit, et recommandations personnalisées pour un projet sur-mesure.",
  },
  {
    icon: "🎨",
    title: "Design & Prototype",
    description: "Création de maquettes, design UX/UI, validation du parcours utilisateur et identité visuelle.",
  },
  {
    icon: "💻",
    title: "Développement",
    description: "Développement technique, intégration des fonctionnalités, sécurité et performance.",
  },
  {
    icon: "🚀",
    title: "Mise en ligne & Suivi",
    description: "Déploiement, tests, formation, et accompagnement post-livraison pour garantir la réussite.",
  },
];

function ProcessSection() {
  return (
    <section className="py-16 px-8 bg-gradient-to-b from-black via-black-50 to-blur-50" id="process">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl text-center text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">My Processus</h2>
        <p className="text-lg text-gray-400 mb-10 text-center">Un accompagnement complet, étape par étape, pour garantir la réussite de votre projet digital.</p>
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-blur rounded-2xl shadow-xl p-6 flex flex-col items-center border border-bold- hover:shadow-2xl transition">
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">{step.title}</h3>
              <p className="text-gray-400 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
}

export default ProcessSection;
