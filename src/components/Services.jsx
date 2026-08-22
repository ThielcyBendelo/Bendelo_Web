import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaRocket, FaMobileAlt, FaPalette, FaShieldAlt, FaTools,
  FaCloud, FaGraduationCap, FaCheck, FaPaperPlane,
  FaCalendarAlt, FaLightbulb,
  FaBook, FaGlobeAfrica, FaLayerGroup,
  FaClock, FaDollarSign, FaWhatsapp, FaCogs
} from 'react-icons/fa';
import QuoteModal from './QuoteModal';

/** Mappe le titre d'une carte service vers la valeur du select QuoteModal */
const serviceTitleToProjectType = (title = '') => {
  const t = title.toLowerCase();
  if (t.includes('web')) return 'site-web';
  if (t.includes('mobile')) return 'mobile';
  if (t.includes('cybersécurité') || t.includes('cybersecurite')) return 'cybersecurite';
  if (t.includes('cloud')) return 'cloud';
  if (t.includes('maintenance')) return 'maintenance';
  if (t.includes('design') || t.includes('ui')) return 'application';
  return 'autre';
};

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const openQuoteModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const categories = [
    { id: 'all', label: 'Tous', icon: <FaLayerGroup /> },
    { id: 'tech', label: 'Ingénierie Tech', icon: <FaCogs /> },
    { id: 'impact', label: 'Éveil & Impact', icon: <FaLightbulb /> }
  ];

  const services = [
    {
      icon: <FaRocket />,
      title: 'Développement Web',
      category: 'tech',
      description: 'Sites web modernes, performants et responsives. De la landing page au site e-commerce complet.',
      price: '1200$',
      duration: '2-8 semaines',
      budgetRange: 'mid',
      timelineRange: 'medium',
      badge: 'Premium',
      benefits: ['Design responsive', 'SEO optimisé', 'Performance maximale', 'Support technique']
    },
    {
      icon: <FaMobileAlt />,
      title: 'Applications Mobiles',
      category: 'tech',
      description: 'Applications natives iOS/Android ou cross-platform avec React Native et Flutter.',
      price: '2500$',
      duration: '4-12 semaines',
      budgetRange: 'high',
      timelineRange: 'long',
      badge: 'Produit',
      benefits: ['UI/UX native', 'Performance optimale', 'Publication store', 'Maintenance incluse']
    },
    {
      icon: <FaPalette />,
      title: 'Design UI/UX',
      category: 'tech',
      description: 'Interfaces utilisateur intuitives et expériences utilisateur exceptionnelles.',
      price: '800$',
      duration: '1-4 semaines',
      budgetRange: 'low',
      timelineRange: 'fast',
      badge: 'Visuel',
      benefits: ['Wireframes & mockups', 'Système de design', 'Prototypage', 'Tests utilisateurs']
    },
    {
      icon: <FaLightbulb />,
      title: "Éveil de Conscience",
      category: 'impact',
      description: "Coaching stratégique pour libérer le potentiel mental de la jeunesse africaine.",
      price: 'Sur mesure',
      duration: 'Sessions continues',
      budgetRange: 'high',
      timelineRange: 'long',
      badge: 'Impact',
      benefits: ['Mindset transformation', 'Leadership éthique', 'Clarté de vision', 'Impact social']
    },
    {
      icon: <FaBook />,
      title: "Impact Littéraire",
      category: 'impact',
      description: "Accompagnement à la rédaction et publication d'ouvrages transformateurs.",
      price: 'Sur devis',
      duration: '3-12 mois',
      budgetRange: 'high',
      timelineRange: 'long',
      badge: 'Écriture',
      benefits: ['Structure narrative', 'Édition digitale', 'Marketing d’auteur', 'Transmission']
    },
    {
      icon: <FaShieldAlt />,
      title: 'Cybersécurité',
      category: 'tech',
      description: 'Protection complète de vos systèmes et données contre les menaces cybernétiques.',
      price: '1500$',
      duration: '1-6 semaines',
      budgetRange: 'mid',
      timelineRange: 'medium',
      badge: 'Sécurisé',
      benefits: ['Audit sécurité', 'Protection données', 'Formation équipe', 'Monitoring 24/7']
    },
    {
      icon: <FaCloud />,
      title: 'Services Cloud',
      category: 'tech',
      description: 'Migration et gestion d\'infrastructures cloud scalables et sécurisées.',
      price: '1000$',
      duration: '2-6 semaines',
      budgetRange: 'mid',
      timelineRange: 'medium',
      badge: 'Scale',
      benefits: ['Migration cloud', 'Auto-scaling', 'Sauvegarde cloud', 'Monitoring']
    },
    {
      icon: <FaTools />,
      title: 'Maintenance Systèmes',
      category: 'tech',
      description: 'Maintenance préventive et corrective de vos infrastructures informatiques.',
      price: '300$/mois',
      duration: 'Contrat flexible',
      budgetRange: 'low',
      timelineRange: 'long',
      badge: 'Soutien',
      benefits: ['Support technique', 'Mises à jour', 'Sauvegarde', 'Optimisation']
    },
    {
      icon: <FaGraduationCap />,
      title: 'Formation & Accompagnement',
      category: 'tech',
      description: 'Formations personnalisées et accompagnement pour développer vos compétences techniques.',
      price: '500$',
      duration: 'Sessions flexibles',
      budgetRange: 'low',
      timelineRange: 'fast',
      badge: 'Apprentissage',
      benefits: ['Formations sur mesure', 'Accompagnement projet', 'Support technique', 'Certification']
    },
    {
      icon: <FaGlobeAfrica />,
      title: "Conférences & Keynotes",
      category: 'impact',
      description: "Interventions inspirantes sur le leadership conscient et la souveraineté numérique en Afrique.",
      price: 'Sur devis',
      duration: '1-3 heures',
      budgetRange: 'high',
      timelineRange: 'fast',
      badge: 'Événement',
      benefits: ['Storytelling puissant', 'Motivation d’équipes', 'Vision prospective', 'Impact communautaire']
    },
    {
      icon: <FaShieldAlt />,
      title: "Mentorat de Carrière Tech",
      category: 'impact',
      description: "Accompagnement des jeunes développeurs pour allier excellence technique et éthique de travail.",
      price: '150$/mois',
      duration: 'Suivi trimestriel',
      budgetRange: 'low',
      timelineRange: 'medium',
      badge: 'Mentorat',
      benefits: ['Plan de carrière', 'Soft skills & Mindset', 'Revue de code', 'Réseautage pro']
    },
    {
      icon: <FaLayerGroup />,
      title: "Masterclass Éveil 2.0",
      category: 'impact',
      description: "Formation intensive en groupe sur la décolonisation mentale et la productivité spirituelle.",
      price: '200$',
      duration: '4 week-ends',
      budgetRange: 'mid',
      timelineRange: 'medium',
      badge: 'Collectif',
      benefits: ['Supports exclusifs', 'Accès communauté', 'Exercices pratiques', 'Certificat d’impact']
    },
    {
      icon: <FaPaperPlane />,
      title: "Audit de Vision Pro",
      category: 'impact',
      description: "Analyse profonde de vos objectifs pour aligner votre carrière avec votre mission de vie.",
      price: '350$',
      duration: '2 sessions',
      budgetRange: 'low',
      timelineRange: 'fast',
      badge: 'Clarté',
      benefits: ['Déblocage mental', 'Alignement stratégique', 'Plan d’action clair', 'Suivi WhatsApp']
    }
  ];

  const filteredServices = services.filter(
    (service) => activeFilter === 'all' || service.category === activeFilter
  );

  return (
    <section 
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5" 
      id="prestations"
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

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
            // SOLUTIONS_360_CATALOGUE
          </span>
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            CATALOGUE DES <span className="text-[#FF6B35] italic">PRESTATIONS</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Des prestations d'ingénierie et d'accompagnement pensées pour transformer un besoin critique en résultat visible, rapide et souverain.
          </p>
        </div>

        {/* --- FILTRES CATÉGORIES (puces + icônes, scroll tactile sans barre) --- */}
        <div className="flex justify-center mb-16">
          <div
            role="tablist"
            aria-label="Catégories de services"
            className="inline-flex flex-nowrap items-center gap-2 sm:gap-2.5 max-w-full overflow-x-auto overscroll-x-contain px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
          >
            {categories.map((cat) => {
              const isSelected = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5 font-mono font-bold uppercase text-[10px] sm:text-[11px] tracking-widest border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#0f3d2e] text-emerald-100 border-emerald-500/40 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]'
                      : 'bg-[#141a22] border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                  }`}
                >
                  <span className={isSelected ? 'text-emerald-200' : 'text-slate-500'}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

               {/* --- DÉROULEMENT RESPONSIVE MOBILE HORIZONTAL / GRILLE DESKTOP --- */}
        <div className="relative w-full z-10">
          {/* Masques de dégradé discrets visibles UNIQUEMENT sur mobile (masqués sur desktop via md:hidden) */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0A1622] to-transparent z-20 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0A1622] to-transparent z-20 pointer-events-none md:hidden" />

          <div className="flex flex-nowrap md:grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full overflow-x-auto md:overflow-x-visible overscroll-x-contain pb-8 pt-2 px-1 max-w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                className="group relative p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 flex flex-col justify-between min-h-[520px] w-[290px] sm:w-[350px] md:w-full shrink-0 md:shrink rounded-none shadow-2xl"
              >
                {/* Lueur angulaire au survol */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />

                <div className="relative flex flex-col h-full justify-between z-10">
                  <div>
                    {/* En-tête de carte : Icône brute & Étiquettes de catégorie */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-3xl text-slate-400 transition-colors duration-300 group-hover:text-[#FF6B35] group-hover:scale-105">
                        {service.icon}
                      </div>
                      <div className="flex flex-col items-end gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                        <span className="px-2.5 py-0.5 border border-white/10 text-[#FF6B35] bg-[#FF6B35]/5 rounded-none">
                          // {service.category === 'impact' ? 'éveil_&_impact' : 'ingénierie_tech'}
                        </span>
                        {service.badge && (
                          <span className="px-2.5 py-0.5 border border-[#FF6B35]/30 text-white bg-[#FF6B35] rounded-none text-[9px] tracking-widest font-black">
                            {service.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Titre & Description de la prestation */}
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium tracking-wide mb-6">
                      {service.description}
                    </p>

                    {/* Fiche d'estimation Métrique (Budget & Délais) - Carrée Style Inspecteur */}
                    <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-xs">
                      {/* BLOC BUDGET */}
                      <div className="p-3 border border-white/10 bg-white/[0.01] rounded-none">
                        <div className="mb-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          <FaDollarSign className="text-[#FF6B35]" /> BUDGET
                        </div>
                        <p className="font-bold text-white text-sm tracking-wide">
                          {service.price}
                        </p>
                      </div>

                      {/* BLOC DÉLAIS */}
                      <div className="p-3 border border-white/10 bg-white/[0.01] rounded-none">
                        <div className="mb-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          <FaCalendarAlt className="text-[#FF6B35]" /> DÉLAIS
                        </div>
                        <p className="font-bold text-white text-sm tracking-wide">
                          {service.duration}
                        </p>
                      </div>
                    </div>

                    {/* Liste des livrables inclus (Benefits) - Vectoriel Brut */}
                    <ul className="space-y-3 mb-8">
                      {service.benefits.map((benefit, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-3 text-[11px] uppercase tracking-wider text-slate-400 font-mono font-bold"
                        >
                          <div className="flex-shrink-0 w-4 h-4 bg-[#FF6B35]/10 flex items-center justify-center text-[9px] text-[#FF6B35] rounded-none mt-0.5">
                            <FaCheck />
                          </div>
                          <span className="leading-tight">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions de pied de carte intégrées (Devis + WhatsApp) */}
                  <div className="pt-5 border-t border-white/5 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-slate-500 font-mono text-[10px] tracking-widest uppercase mb-1">
                      <span className="flex items-center gap-1.5"><FaRocket /> [scope: active]</span>
                      <span>ID_0{idx + 1}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* BOUTON DEVIS STANDARD */}
                      <button
                        type="button"
                        onClick={() => openQuoteModal(service)}
                        className="w-full py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B35] hover:text-white transition-all duration-300 rounded-none"
                      >
                        Dossier Devis
                      </button>

                      {/* BOUTON ACCÈS DIRECT CHAT WHATSAPP */}
                      <a
                        href={`https://wa.me/243829054350?text=${encodeURIComponent(`Bonjour, je suis intéressé par le service : ${service.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 border border-[#25D366] text-[#25D366] bg-[#25D366]/5 font-mono font-bold uppercase text-[10px] tracking-widest hover:bg-[#25D366] hover:text-black flex items-center justify-center gap-2 transition-all duration-300 rounded-none text-center"
                      >
                        <FaWhatsapp className="text-sm" /> Chat Open
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>


      {/* Modal devis complet (QuoteModal) */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={closeQuoteModal}
        defaultService={
          selectedService
            ? serviceTitleToProjectType(selectedService.title)
            : ''
        }
      />
    </section>
  );
}


