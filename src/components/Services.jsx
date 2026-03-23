import React, { useState } from "react";
import QuoteModal from "./QuoteModal";

const services = [
  {
    icon: <span className="text-blue-500">💻</span>,
    title: "Développement Web",
    description:
      "Conception et réalisation de sites web sur-mesure, optimisés pour la performance, la sécurité et le référencement. Intégration des dernières technologies (React, Node.js, API REST) et respect des standards RGPD. Suivi personnalisé et évolutivité garantie.",
    template:
      "Site vitrine professionnel, e-commerce sécurisé, blog optimisé SEO, portail d'entreprise, landing page marketing.",
    price: "À partir de 1200€",
    duration: "2 à 4 semaines",
    benefits: ["Livraison clé en main", "SEO avancé", "Sécurité renforcée", "Support inclus"],
    link: "https://www.exemple-siteweb.com",
    action: "Demander un devis",
  },
  {
    icon: <span className="text-pink-500">📱</span>,
    title: "Applications Mobiles",
    description:
      "Développement d'applications mobiles natives et hybrides pour iOS et Android. Expérience utilisateur fluide, design moderne, sécurité renforcée et intégration de fonctionnalités avancées (notifications, paiement, géolocalisation). Accompagnement de la publication sur les stores.",
    template:
      "Application de réservation, gestion d'événements, e-commerce mobile, application métier sur mesure.",
    price: "À partir de 2500€",
    duration: "3 à 6 semaines",
    benefits: ["Design moderne", "Publication sur stores", "Sécurité des données", "Maintenance offerte 3 mois"],
    action: "Demander un devis",
  },
  {
    icon: <span className="text-yellow-500">🎨</span>,
    title: "Design UI/UX",
    description:
      "Création d'interfaces intuitives et esthétiques, centrées sur l'utilisateur. Prototypage, tests d'usabilité, optimisation du parcours client et respect de l'identité visuelle. Augmentez l'engagement et la conversion grâce à un design professionnel.",
    template:
      "Maquettes Figma, design system, refonte graphique, audit UX, wireframes interactifs.",
    price: "À partir de 800€",
    duration: "1 à 2 semaines",
    benefits: ["Design sur mesure", "Tests utilisateurs", "Livrables interactifs", "Conseils branding"],
    action: "Demander un devis",
  },
  {
    icon: <span className="text-indigo-500">🛡️</span>,
    title: "Cybersécurité",
    description:
      "Audit de sécurité, protection contre les cybermenaces, mise en place de protocoles SSL, sauvegardes automatisées, gestion des accès et conformité RGPD. Surveillance proactive et intervention rapide en cas d'incident. Sécurisez vos données et votre réputation.",
    template:
      "Audit complet, pentest, configuration firewall, monitoring SIEM, formation sécurité utilisateurs.",
    price: "À partir de 900€",
    duration: "1 à 2 semaines",
    benefits: ["Audit RGPD", "Rapport détaillé", "Intervention rapide", "Formation incluse"],
    action: "Demander un devis",
  },
  {
    icon: <span className="text-gray-700">🛠️</span>,
    title: "Maintenance Systèmes",
    description:
      "Support technique 24/7, maintenance préventive et corrective, mises à jour régulières, monitoring des serveurs et optimisation des performances. Intervention rapide sur incidents, documentation claire et reporting mensuel. Garantissez la disponibilité de vos services.",
    template:
      "Contrat annuel, intervention à la demande, monitoring serveur, gestion des sauvegardes, optimisation réseau.",
    price: "À partir de 600€/an",
    duration: "Contrat annuel ou ponctuel",
    benefits: ["Support 24/7", "Monitoring proactif", "Reporting mensuel", "Interventions illimitées"],
    action: "Demander un devis",
  },
  {
    icon: <span className="text-cyan-500">☁️</span>,
    title: "Services Cloud",
    description:
      "Migration vers le cloud, déploiement d'infrastructures AWS/Azure/GCP, gestion des sauvegardes, scalabilité et haute disponibilité. Solutions cloud sur-mesure pour PME et grands comptes, sécurité des données et optimisation des coûts. Modernisez votre entreprise.",
    template:
      "Migration cloud, déploiement Kubernetes, sauvegarde cloud, hébergement scalable, solutions SaaS personnalisées.",
    price: "À partir de 1500€",
    duration: "2 à 4 semaines",
    benefits: ["Scalabilité garantie", "Sécurité cloud", "Optimisation des coûts", "Support migration"],
    action: "Demander un devis",
  },
];

function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleQuoteClick = (serviceKey) => {
    setSelectedService(serviceKey);
    setModalOpen(true);
  };

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-blue-50 via-white to-gray-50" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 text-center">
          <h2 className="text-5xl font-extrabold text-blue-900 mb-2 mt-16 tracking-tight drop-shadow-lg">Mes Services</h2>
          <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto mb-6">Découvrez l'ensemble de mes prestations digitales : développement web, applications mobiles, design UI/UX, cybersécurité, maintenance et solutions cloud. Chaque service est pensé pour répondre aux besoins des entreprises modernes, avec expertise, réactivité et accompagnement sur-mesure.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white via-gray-50 to-blue-100 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center border border-blue-100 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 hover:bg-blue-50 group"
              style={{ animation: `fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) ${idx * 0.15}s both` }}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{service.icon}</div>
              <h3 className="text-2xl font-extrabold mb-2 text-blue-800 tracking-tight drop-shadow">{service.title}</h3>
              <p className="text-gray-700 mb-2 font-medium">{service.description}</p>
              <div className="mb-2 text-sm text-indigo-700 font-semibold">Template : {service.template}</div>
              <div className="mb-2 text-sm text-blue-700"><span className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-1 mr-1">Durée estimée :</span> {service.duration}</div>
              <div className="mb-2 flex flex-wrap justify-center gap-2">
                {service.benefits && service.benefits.map((b, i) => (
                  <span key={i} className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-semibold shadow">{b}</span>
                ))}
              </div>
              <div className="mb-2 text-sm">
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 underline hover:text-blue-800 font-semibold transition"
                >
                  Voir un exemple
                </a>
              </div>
              <div className="mb-4 text-lg font-bold text-green-700">Tarif : {service.price}</div>
              <button
                className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-transform duration-300 transform hover:scale-105 focus:scale-100 active:scale-95"
                onClick={() => handleQuoteClick(getServiceKey(service.title))}
              >
                {service.action}
              </button>
            </div>
          ))}
        </div>
        <QuoteModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultService={selectedService}
        />
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px) scale(0.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </section>
  );
  // Helper pour convertir le titre en clé EmailJS
  function getServiceKey(title) {
    switch (title) {
      case "Développement Web": return "site-web";
      case "Applications Mobiles": return "mobile";
      case "Design UI/UX": return "application";
      case "Cybersécurité": return "cybersecurite";
      case "Maintenance Systèmes": return "maintenance";
      case "Services Cloud": return "cloud";
      default: return "autre";
    }
  }
}

export default Services;