import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRocket, FaMobileAlt, FaPalette, FaShieldAlt, FaTools,
  FaCloud, FaGraduationCap, FaCheck, FaTimes, FaPaperPlane,
  FaWallet, FaCalendarAlt, FaBuilding, FaPhoneAlt, FaLightbulb,
  FaBook, FaGlobeAfrica, FaLayerGroup, FaQuoteLeft, FaFilter,
  FaClock, FaDollarSign, FaArrowRight, FaArrowUp, FaArrowDown
} from 'react-icons/fa';

import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [timelineFilter, setTimelineFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', budget: '', timeline: '', message: ''
  });
  const modalContentRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openQuoteModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const scrollModalToTop = () => {
    modalContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollModalToBottom = () => {
    if (!modalContentRef.current) return;
    modalContentRef.current.scrollTo({
      top: modalContentRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        'service_muamokel', 
        'template_quote_request', 
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          message: formData.message,
          service_selected: selectedService?.title,
          to_email: 'contact@muamokel.com'
        }, 
        'YOUR_PUBLIC_KEY'
      );

      toast.success('Demande envoyée avec succès !');
      setIsModalOpen(false);
      setFormData({ name: '', email: '', company: '', phone: '', budget: '', timeline: '', message: '' });
    } catch (error) {
      console.error("Erreur EmailJS:", error);
      toast.error("Erreur lors de l'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'tech', label: 'Ingénierie Tech' },
    { id: 'impact', label: 'Éveil & Impact' }
  ];

  const budgetOptions = [
    { id: 'all', label: 'Tous budgets' },
    { id: 'low', label: '≤ 1 000 $' },
    { id: 'mid', label: '1 000 $ – 2 500 $' },
    { id: 'high', label: '2 500 $ +' }
  ];

  const timelineOptions = [
    { id: 'all', label: 'Tous délais' },
    { id: 'fast', label: 'Rapide' },
    { id: 'medium', label: 'Moyen' },
    { id: 'long', label: 'Long' }
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

  const filteredServices = services.filter((service) => {
    const matchesCategory = activeFilter === 'all' || service.category === activeFilter;
    const matchesBudget = budgetFilter === 'all' || service.budgetRange === budgetFilter;
    const matchesTimeline = timelineFilter === 'all' || service.timelineRange === timelineFilter;
    return matchesCategory && matchesBudget && matchesTimeline;
  });

  return (
    <section className="py-24 px-6 border-t border-slate-200 dark:border-white/10" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Solutions 360°
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Catalogue des <span className="underline decoration-1 underline-offset-8">Prestations</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400 leading-relaxed tracking-wide">
            Des prestations pensées pour transformer un besoin concret en résultat visible, rapide et durable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2.5 font-bold uppercase text-[10px] tracking-widest border transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-black border-transparent'
                    : 'bg-slate-50 dark:bg-[#09090b] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 px-4 py-2 shadow-sm dark:bg-slate-900/60">
            <FaFilter className="text-slate-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Budget</span>
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="bg-transparent text-[10px] font-semibold uppercase tracking-wider text-slate-700 outline-none dark:text-slate-200"
            >
              {budgetOptions.map((option) => (
                <option key={option.id} value={option.id} className="text-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 px-4 py-2 shadow-sm dark:bg-slate-900/60">
            <FaClock className="text-slate-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Délais</span>
            <select
              value={timelineFilter}
              onChange={(e) => setTimelineFilter(e.target.value)}
              className="bg-transparent text-[10px] font-semibold uppercase tracking-wider text-slate-700 outline-none dark:text-slate-200"
            >
              {timelineOptions.map((option) => (
                <option key={option.id} value={option.id} className="text-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

                {/* --- GRILLE DES SERVICES ORTHOGONALE STRICTE --- */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.99 }}
              className="group relative p-8 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-colors duration-300 hover:border-slate-400 dark:hover:border-white/30 flex flex-col justify-between min-h-[460px]"
            >
              <div className="relative flex flex-col h-full justify-between">
                <div>
                  {/* En-tête de carte : Icône brute & Étiquettes de catégorie */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-2xl text-slate-950 dark:text-white transition-colors duration-300 group-hover:text-orange-500">
                      {service.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider">
                      <span className="px-2 py-0.5 border border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 bg-white dark:bg-white/5">
                        // {service.category === 'impact' ? 'éveil_&_impact' : 'ingénierie_tech'}
                      </span>
                      {service.badge && (
                        <span className="px-2 py-0.5 border border-orange-500/20 text-orange-500 bg-orange-500/5">
                          {service.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Titre & Description de la prestation */}
                  <h3 className="text-base font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-normal tracking-wide mb-6">
                    {service.description}
                  </p>

                  {/* Tableau des spécifications d'estimation (Budget & Délais) */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-xs font-mono">
                    <div className="p-3 border border-slate-200/60 dark:border-white/5 bg-white/50 dark:bg-white/5">
                      <div className="mb-1 flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-slate-400">
                        <FaDollarSign className="text-[10px]" /> Budget
                      </div>
                      <p className="font-bold text-slate-950 dark:text-white">{service.price}</p>
                    </div>
                    <div className="p-3 border border-slate-200/60 dark:border-white/5 bg-white/50 dark:bg-white/5">
                      <div className="mb-1 flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-slate-400">
                        <FaCalendarAlt className="text-[10px]" /> Délais
                      </div>
                      <p className="font-bold text-slate-950 dark:text-white">{service.duration}</p>
                    </div>
                  </div>

                  {/* Liste des livrables inclus (Benefits) */}
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
                        <FaCheck className="text-[9px] text-orange-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Panneau d'actions bas de carte style Facture */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between gap-3 font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaRocket className="text-slate-400" /> [scope: custom]
                  </div>
                  <button
                    type="button"
                    onClick={() => openQuoteModal(service)}
                    className="px-4 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-black font-sans font-bold uppercase text-[9px] tracking-widest hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                  >
                    Demander un devis
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>

      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.24),_transparent_32%),rgba(2,6,23,0.88)] px-4 py-6 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[24px] border border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/5 p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400">
                    {selectedService.icon}
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Demande de devis
                    </p>
                    <h3 className="text-xl font-black uppercase tracking-wider text-white">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={scrollModalToTop}
                    className="rounded-full border border-white/10 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Remonter dans la fenêtre"
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    type="button"
                    onClick={scrollModalToBottom}
                    className="rounded-full border border-white/10 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Descendre dans la fenêtre"
                  >
                    <FaArrowDown />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full border border-white/10 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div ref={modalContentRef} className="max-h-[calc(90vh-120px)] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6 p-5 md:p-8">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <FaQuoteLeft className="text-orange-500" />
                      Détails du projet
                    </div>
                    <p className="text-sm text-slate-300">{selectedService.description}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nom complet</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400" placeholder="Votre nom" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400" placeholder="votre@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Société</label>
                      <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400" placeholder="Nom de votre structure" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Téléphone</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400" placeholder="+243 ..." />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Budget</label>
                      <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400" placeholder="Ex. 3000$" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Délais</label>
                      <input type="text" name="timeline" value={formData.timeline} onChange={handleInputChange} className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400" placeholder="Ex. 2 semaines" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cahier des charges / Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white outline-none resize-none placeholder:text-slate-400"
                      placeholder="Détaillez vos besoins opérationnels..."
                    />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <FaLayerGroup className="text-orange-500" /> Service sélectionné
                    </div>
                    <p className="font-semibold text-white">{selectedService.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{selectedService.description}</p>
                  </div>

                  <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-full border border-white/10 px-4 py-2 font-sans font-bold uppercase text-[10px] tracking-widest text-slate-300 transition-colors hover:bg-white/10"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-2 font-sans font-bold uppercase text-[10px] tracking-widest text-slate-950 transition-all duration-200 hover:brightness-110 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Traitement...' : 'Valider la commande'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
