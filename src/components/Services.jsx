import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, FaMobileAlt, FaPalette, FaShieldAlt, FaTools, 
  FaCloud, FaGraduationCap, FaCheck, FaTimes, FaPaperPlane, 
  FaWallet, FaCalendarAlt, FaBuilding, FaPhoneAlt, FaLightbulb, 
  FaBook, FaGlobeAfrica, FaLayerGroup, FaQuoteLeft 
} from 'react-icons/fa';

import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


export default function Services() {
  // 1. DÉCLARATION DES ÉTATS (Une seule fois)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', budget: '', timeline: '', message: ''
  });

  // 2. GESTION DES SAISIES
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. ENVOI DU FORMULAIRE (Une seule fois)
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
        'YOUR_PUBLIC_KEY' // Remplacez par votre clé EmailJS
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
  // Catégories de filtres
  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'tech', label: 'Ingénierie Tech' },
    { id: 'impact', label: 'Éveil & Impact' }
  ];

  const services = [
    {
      icon: <FaRocket />,
      title: 'Développement Web',
      category: 'tech',
      description: 'Sites web modernes, performants et responsives. De la landing page au site e-commerce complet.',
      price: '1200$',
      duration: '2-8 semaines',
      benefits: ['Design responsive', 'SEO optimisé', 'Performance maximale', 'Support technique'],
      color: '#3b82f6'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Applications Mobiles',
      category: 'tech',
      description: 'Applications natives iOS/Android ou cross-platform avec React Native et Flutter.',
      price: '2500$',
      duration: '4-12 semaines',
      benefits: ['UI/UX native', 'Performance optimale', 'Publication store', 'Maintenance incluse'],
      color: '#10b981'
    },
    {
      icon: <FaPalette />,
      title: 'Design UI/UX',
      category: 'tech',
      description: 'Interfaces utilisateur intuitives et expériences utilisateur exceptionnelles.',
      price: '800$',
      duration: '1-4 semaines',
      benefits: ['Wireframes & mockups', 'Système de design', 'Prototypage', 'Tests utilisateurs'],
      color: '#a855f7'
    },
    {
      icon: <FaLightbulb />,
      title: "Éveil de Conscience",
      category: 'impact',
      description: "Coaching stratégique pour libérer le potentiel mental de la jeunesse africaine.",
      price: 'Sur mesure',
      duration: 'Sessions continues',
      benefits: ['Mindset transformation', 'Leadership éthique', 'Clarté de vision', 'Impact social'],
      color: '#9333ea'
    },
    {
      icon: <FaBook />,
      title: "Impact Littéraire",
      category: 'impact',
      description: "Accompagnement à la rédaction et publication d'ouvrages transformateurs.",
      price: 'Sur devis',
      duration: '3-12 mois',
      benefits: ['Structure narrative', 'Édition digitale', 'Marketing d’auteur', 'Transmission'],
      color: '#ea580c'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Cybersécurité',
      category: 'tech',
      description: 'Protection complète de vos systèmes et données contre les menaces cybernétiques.',
      price: '1500$',
      duration: '1-6 semaines',
      benefits: ['Audit sécurité', 'Protection données', 'Formation équipe', 'Monitoring 24/7'],
      color: '#ef4444'
    },
    {
        icon: <FaCloud />,
        title: 'Services Cloud',
        category: 'tech',
        description: 'Migration et gestion d\'infrastructures cloud scalables et sécurisées.',
        price: '1000$',
        duration: '2-6 semaines',
        benefits: ['Migration cloud', 'Auto-scaling', 'Sauvegarde cloud', 'Monitoring'],
        color: '#0ea5e9'
      },
       {
      icon: <FaTools />,
      title: 'Maintenance Systèmes',
      description: 'Maintenance préventive et corrective de vos infrastructures informatiques.',
      price: '300$/mois',
      duration: 'Contrat flexible',
      benefits: ['Support technique', 'Mises à jour', 'Sauvegarde', 'Optimisation'],
      color: '#f59e0b'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Formation & Accompagnement',
      description: 'Formations personnalisées et accompagnement pour développer vos compétences techniques.',
      price: '500$',
      duration: 'Sessions flexibles',
      benefits: ['Formations sur mesure', 'Accompagnement projet', 'Support technique', 'Certification'],
      color: '#14b8a6'
    },
        {
      icon: <FaGlobeAfrica />,
      title: "Conférences & Keynotes",
      category: 'impact',
      description: "Interventions inspirantes sur le leadership conscient et la souveraineté numérique en Afrique.",
      price: 'Sur devis',
      duration: '1-3 heures',
      benefits: ['Storytelling puissant', 'Motivation d’équipes', 'Vision prospective', 'Impact communautaire'],
      color: '#9333ea' // Mauve
    },
    {
      icon: <FaShieldAlt />,
      title: "Mentorat de Carrière Tech",
      category: 'impact',
      description: "Accompagnement des jeunes développeurs pour allier excellence technique et éthique de travail.",
      price: '150$/mois',
      duration: 'Suivi trimestriel',
      benefits: ['Plan de carrière', 'Soft skills & Mindset', 'Revue de code', 'Réseautage pro'],
      color: '#ea580c' // Orange
    },
    {
      icon: <FaLayerGroup />,
      title: "Masterclass Éveil 2.0",
      category: 'impact',
      description: "Formation intensive en groupe sur la décolonisation mentale et la productivité spirituelle.",
      price: '200$',
      duration: '4 week-ends',
      benefits: ['Supports exclusifs', 'Accès communauté', 'Exercices pratiques', 'Certificat d’impact'],
      color: '#9333ea' // Mauve
    },
    {
      icon: <FaPaperPlane />,
      title: "Audit de Vision Pro",
      category: 'impact',
      description: "Analyse profonde de vos objectifs pour aligner votre carrière avec votre mission de vie.",
      price: '350$',
      duration: '2 sessions',
      benefits: ['Déblocage mental', 'Alignement stratégique', 'Plan d’action clair', 'Suivi WhatsApp'],
      color: '#ea580c' // Orange
    }
  ];

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(s => s.category === activeFilter);

  // ... (Logique handleInputChange et handleSubmit identique à votre code)

  return (
    <section className="py-24 px-6 transition-colors duration-500" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* EN-TÊTE IDENTITAIRE */}
        <div className="text-center mb-16 relative">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Solutions 360°</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic text-[var(--text-primary)]">
            Nos <span className="bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text">Expertises</span>.
          </h1>
        </div>

        {/* FILTRES DE CATÉGORIES */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all border ${
                activeFilter === cat.id 
                ? 'bg-orange-600 text-white border-transparent shadow-xl scale-105' 
                : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-orange-500/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRILLE DES SERVICES FILTRÉE */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          <AnimatePresence mode='popLayout'>
            {filteredServices.map((service, index) => (
              <motion.div
                layout
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2.5rem] border flex flex-col h-full transition-all group shadow-sm hover:shadow-2xl"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}
              >
                <div className="text-3xl mb-6 p-4 rounded-2xl w-fit transition-transform group-hover:rotate-12" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-4" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="flex items-center gap-1 text-[9px] font-black uppercase px-3 py-1 rounded-full bg-black/5 dark:bg-white/5" style={{ color: service.color }}>
                    <FaWallet /> {service.price}
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-black uppercase px-3 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]">
                    <FaCalendarAlt /> {service.duration}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-8 flex-grow" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
                
                <div className="space-y-3 mb-10">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                      <FaCheck className="text-orange-500" /> {b}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => { setSelectedService(service); setIsModalOpen(true); }}
                  className="w-full py-4 rounded-2xl font-black text-white uppercase tracking-widest text-[10px] transition-all hover:brightness-110 shadow-lg shadow-black/10" 
                  style={{ backgroundColor: service.color }}
                >
                  Démarrer le projet
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* SECTION STATISTIQUES (AJOUTÉ) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {[
            { label: "Projets Livrés", value: "+" },
            { label: "Jeunes Éveillés", value: "+" },
            { label: "Pays Touchés", value: "+" },
            { label: "Satisfaction", value: "%" }
          ].map((s, i) => (
            <div key={i} className="text-center p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)]">
              <p className="text-4xl font-black text-orange-500 mb-2">{s.value}</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* --- MODAL DE DEVIS --- */}
<AnimatePresence>
  {isModalOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay sombre */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsModalOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Contenu du Modal */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        {/* En-tête du Modal */}
        <div className="p-8 text-center relative" style={{ backgroundColor: `${selectedService?.color}10` }}>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 text-[var(--text-secondary)] hover:text-orange-500 transition-colors"
          >
            <FaTimes />
          </button>
          <div className="text-4xl mb-4 inline-block" style={{ color: selectedService?.color }}>
            {selectedService?.icon}
          </div>
          <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
            {selectedService?.title}
          </h3>
          <p className="text-xs font-bold uppercase tracking-widest mt-2 text-orange-500">Demande de devis gratuit</p>
        </div>

       {/* Formulaire Enrichi */}
<form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
  
  {/* Identité */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-1">
      <label className="text-[10px] uppercase tracking-widest font-black text-orange-500 ml-2">Nom Complet</label>
      <input 
        required type="text" name="name" placeholder="Ex: Jean Mukendi" 
        value={formData.name} onChange={handleInputChange}
        className="w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-orange-500 transition-all text-sm"
      />
    </div>
    <div className="space-y-1">
      <label className="text-[10px] uppercase tracking-widest font-black text-orange-500 ml-2">Email Professionnel</label>
      <input 
        required type="email" name="email" placeholder="nom@exemple.com" 
        value={formData.email} onChange={handleInputChange}
        className="w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-orange-500 transition-all text-sm"
      />
    </div>
  </div>

  {/* Détails Entreprise & Téléphone */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input 
      type="text" name="company" placeholder="Organisation / Projet" 
      value={formData.company} onChange={handleInputChange}
      className="w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-orange-500 transition-all text-sm"
    />
    <input 
      type="tel" name="phone" placeholder="WhatsApp / Téléphone" 
      value={formData.phone} onChange={handleInputChange}
      className="w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-orange-500 transition-all text-sm"
    />
  </div>

  {/* Sélecteurs Stratégiques (Budget & Délai) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <select 
      name="budget" 
      value={formData.budget} 
      onChange={handleInputChange}
      className="w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-secondary)] outline-none focus:border-orange-500 transition-all text-sm appearance-none"
    >
      <option value="">Budget estimé</option>
      <option value="small">500$ - 1500$</option>
      <option value="medium">1500$ - 5000$</option>
      <option value="large">5000$ +</option>
      <option value="coaching">Coaching / Éveil</option>
    </select>

    <select 
      name="timeline" 
      value={formData.timeline} 
      onChange={handleInputChange}
      className="w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-secondary)] outline-none focus:border-orange-500 transition-all text-sm appearance-none"
    >
      <option value="">Délai souhaité</option>
      <option value="urgent">Urgent (Immédiat)</option>
      <option value="standard">1 à 3 mois</option>
      <option value="long">Long terme (Mentorat)</option>
    </select>
  </div>

  {/* Message détaillé */}
  <div className="space-y-1">
    <label className="text-[10px] uppercase tracking-widest font-black text-orange-500 ml-2">Détails de votre vision</label>
    <textarea 
      required name="message" rows="4" 
      placeholder="Décrivez vos besoins tech ou vos objectifs d'éveil..." 
      value={formData.message} onChange={handleInputChange}
      className="w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-orange-500 transition-all text-sm"
    ></textarea>
  </div>

  {/* Checkbox de consentement */}
  <div className="flex items-center gap-3 px-2">
    <input type="checkbox" required className="accent-orange-500 w-4 h-4" />
    <span className="text-[10px] text-[var(--text-secondary)] font-medium uppercase leading-tight">
      J'accepte d'être recontacté pour discuter de mon projet.
    </span>
  </div>

  {/* Bouton d'action dynamique */}
  <button 
    disabled={isSubmitting}
    type="submit"
    className="w-full py-5 rounded-2xl font-black text-white uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl hover:brightness-110"
    style={{ backgroundColor: selectedService?.color || 'var(--accent-1)' }}
  >
    {isSubmitting ? "Initialisation..." : "Propulser mon projet"} 
    <FaPaperPlane className={isSubmitting ? "animate-ping" : ""} />
  </button>
</form>
      </motion.div>
    </div>
  )}
</AnimatePresence>

      </div>
    </section>
  );
}
