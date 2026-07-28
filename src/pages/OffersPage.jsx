import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import GoogleAnalyticsTracker from "../components/Analytics"; 
import { 
  FaCheck, FaStar, FaCode, FaMobile, FaCloud, FaShieldAlt, 
  FaRocket, FaCog, FaTimes, FaEnvelope, FaClock, FaUsers, 
  FaGlobe, FaDatabase, FaBrain, FaChartLine, FaLock, 
  FaServer, FaTools as FaWrench, FaPaperPlane, FaWallet, 
  FaBuilding, FaWhatsapp 
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export default function OffersPage() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', budget: '', timeline: '', message: ''
  });

  const offers = [
    {
      id: 1,
      title: 'Pack Starter',
      subtitle: 'Idéal pour débuter',
      price: '600$',
      originalPrice: '800$',
      savings: '25%',
      color: '#3b82f6',
      icon: <FaCode />,
      duration: '2-4 semaines',
      features: [
        { text: 'Site web responsive (5 pages)', icon: <FaGlobe /> },
        { text: 'Design moderne professionnel', icon: <FaRocket /> },
        { text: 'Optimisation SEO de base', icon: <FaChartLine /> },
        { text: 'Support technique 1 mois', icon: <FaUsers /> },
        { text: 'Formation à l\'administration', icon: <FaWrench /> },
      ],
      benefits: ['Hébergement offert 1 mois', 'Domaine .com offert', 'SSL gratuit', 'Analytics de base'],
      popular: false,
    },
    {
      id: 2,
      title: 'Pack Business',
      subtitle: 'Pour les entreprises en croissance',
      price: '1200$',
      originalPrice: '1500$',
      savings: '25%',
      color: '#10b981',
      icon: <FaMobile />,
      duration: '4-8 semaines',
      features: [
        { text: 'Site web responsive (10 pages)', icon: <FaGlobe /> },
        { text: 'Design premium personnalisé', icon: <FaRocket /> },
        { text: 'Optimisation SEO avancée', icon: <FaChartLine /> },
        { text: 'Intégration e-commerce', icon: <FaDatabase /> },
        { text: 'Support technique 3 mois', icon: <FaUsers /> },
      ],
      benefits: ['Hébergement 3 mois', 'SSL premium', 'Google Analytics Pro', 'Sauvegarde cloud'],
      popular: true,
    },
    {
      id: 3,
      title: 'Pack Enterprise',
      subtitle: 'Solution complète grands comptes',
      price: '1500$',
      originalPrice: '2000$',
      savings: '23%',
      color: '#a855f7',
      icon: <FaCloud />,
      duration: '6-8 semaines',
      features: [
        { text: 'Pages illimitées', icon: <FaGlobe /> },
        { text: 'Design sur mesure premium', icon: <FaRocket /> },
        { text: 'SEO complet & API', icon: <FaServer /> },
        { text: 'Support prioritaire 24/7', icon: <FaUsers /> },
      ],
      benefits: ['Hébergement 6 mois', 'Domaine premium', 'SSL entreprise', 'Audit performance'],
      popular: false,
    },
    {
      id: 4,
      title: 'Pack Sécurité',
      subtitle: 'Protection maximale des données',
      price: '1200$',
      originalPrice: '1500$',
      savings: '20%',
      color: '#ef4444',
      icon: <FaShieldAlt />,
      duration: '3-5 semaines',
      features: [
        { text: 'Audit sécurité complet', icon: <FaLock /> },
        { text: 'Mise en place HTTPS/SSL', icon: <FaShieldAlt /> },
        { text: 'Protection DDoS avancée', icon: <FaWrench /> },
        { text: 'Monitoring 24/7', icon: <FaClock /> },
      ],
      benefits: ['Firewall avancé', 'Sauvegarde chiffrée', 'Rapports mensuels', 'Support urgence'],
      popular: false,
    },
    {
      id: 5,
      title: 'Pack Développement',
      subtitle: 'Applications web sur mesure',
      price: '2300$',
      originalPrice: '2500$',
      savings: '17%',
      color: '#6366f1',
      icon: <FaCode />,
      duration: '8-12 semaines',
      features: [
        { text: 'Application sur mesure', icon: <FaCode /> },
        { text: 'API RESTful complète', icon: <FaServer /> },
        { text: 'Base de données optimisée', icon: <FaDatabase /> },
        { text: 'CI/CD pipeline', icon: <FaRocket /> },
      ],
      benefits: ['Architecture scalable', 'Tests unitaires', 'Environnement Staging', 'Maintenance'],
      popular: false,
    },
    {
      id: 6,
      title: 'Pack Innovation',
      subtitle: 'Solutions IA & Technologies',
      price: '2500$',
      originalPrice: '3000$',
      savings: '16%',
      color: '#f59e0b',
      icon: <FaBrain />,
      duration: '10-14 semaines',
      features: [
        { text: 'Intégration IA / LLM', icon: <FaBrain /> },
        { text: 'Analyse de données', icon: <FaChartLine /> },
        { text: 'Automatisation process', icon: <FaCog /> },
        { text: 'Support R&D dédié', icon: <FaUsers /> },
      ],
      benefits: ['Consulting IA', 'Algorithmes optimisés', 'Scalabilité futuriste'],
      popular: false,
    }
  ];

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send('service_muamokel', 'template_offer', { ...formData, offer_name: selectedPackage.title }, 'PUBLIC_KEY');
      toast.success('Demande envoyée !');
      setIsModalOpen(false);
    } catch (err) { 
      toast.error('Erreur lors de l\'envoi'); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  return (
    <>
    <GoogleAnalyticsTracker /> 
      <NavbarSecured />
      
<main className="pt-24 min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg)' }}>
  <div className="max-w-7xl mx-auto px-6">
    
    {/* --- EN-TÊTE DE SECTION --- */}
    <div className="text-center mb-24 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
          Limited Opportunity / Up to -25%
        </span>
      </motion.div>

      {/* Titre avec typographie forte Bleu de nuit & Orange */}
      <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-none">
        <span className="text-[#0A1128] opacity-90">Paliers d'</span>
        <span className="text-[#FF6B35]">Impact</span>
        <span className="text-[#FF6B35]">.</span>
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <p className="text-xl md:text-2xl font-light leading-relaxed text-[#0A1128]">
          Sélectionnez le moteur de croissance adapté à votre échelle. Des solutions 
          <span className="font-bold italic text-[#FF6B35] mx-2">End-to-End</span> 
          conçues pour maximiser votre retour sur investissement digital.
        </p>
        
        {/* Séparateurs horizontaux style "Blueprint" */}
        <div className="flex justify-center items-center gap-6 pt-4 opacity-70">
          <div className="h-[1px] w-12 bg-[#0A1128]/20" />
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-600">Standard • Pro • Enterprise Custom</p>
          <div className="h-[1px] w-12 bg-[#0A1128]/20" />
        </div>
      </div>
    </div>

    {/* --- GRILLE DES OFFRES (STYLE CATALOGUE) --- */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      {offers.map((offer) => (
        <motion.div
          key={offer.id}
          whileHover={{ y: -10 }}
          className={`relative p-8 border transition-all duration-300 flex flex-col h-full rounded-3xl ${
            offer.popular 
            ? 'bg-white border-[#FF6B35] shadow-xl ring-2 ring-[#FF6B35]/20 scale-105 z-10' 
            : 'bg-white border-slate-300 shadow-sm hover:border-[#0A1128]'
          }`}
        >
          {offer.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              Plus Populaire
            </div>
          )}

          {/* En-tête de la carte */}
          <div className="flex justify-between items-start mb-8">
            <div className="text-3xl p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[#0A1128] group-hover:text-[#FF6B35] transition-colors">
              {offer.icon}
            </div>
            <div className="text-right">
              <span className="text-xs line-through text-slate-400 block">{offer.originalPrice}</span>
              <span className="text-3xl font-black text-[#0A1128]">{offer.price}</span>
              <span className="block text-[10px] font-bold text-green-600 uppercase mt-1">Économisez {offer.savings}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-black text-[#0A1128] mb-1 uppercase tracking-tight">{offer.title}</h3>
            <p className="text-sm font-bold text-[#FF6B35] uppercase tracking-widest">{offer.subtitle}</p>
          </div>

          {/* Liste des fonctionnalités */}
          <div className="space-y-4 mb-8 flex-grow">
            {offer.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <span className="text-[#FF6B35]">{feat.icon}</span>
                <span>{feat.text}</span>
              </div>
            ))}
          </div>
          
          {/* Section Bonus interne style "Log Technique" */}
          <div className="mb-8 p-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
            <p className="text-[10px] font-black uppercase mb-3 tracking-widest text-[#0A1128]">
              <span className="text-[#FF6B35]">//</span> Bonus & Avantages :
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {offer.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-tighter">
                  <FaCheck className="shrink-0 text-[#FF6B35] text-[10px]" /> 
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton d'action */}
          <button
            onClick={() => { setSelectedPackage(offer); setIsModalOpen(true); }}
            className={`w-full py-4 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] transition-all active:scale-95 shadow-lg ${
              offer.popular 
              ? 'bg-[#FF6B35] text-white hover:bg-[#E0531C] shadow-[#FF6B35]/20' 
              : 'bg-[#0A1128] text-white hover:bg-slate-800 shadow-slate-900/20'
            }`}
          >
            Choisir ce pack
          </button>
        </motion.div>
      ))}
    </div>
  </div>
  <FAQSection />
</main>



      <Footer />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full rounded-3xl p-6 md:p-10 border shadow-2xl overflow-y-auto max-h-[90vh]"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Commander : {selectedPackage?.title}</h2>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20">Prix : {selectedPackage?.price}</span>
                    <span className="text-xs font-bold px-2 py-1 rounded border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>Délai : {selectedPackage?.duration}</span>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-2xl p-2" style={{ color: 'var(--text-secondary)' }}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Nom complet</label>
                  <input name="name" required onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Votre nom" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Email Pro</label>
                  <input name="email" type="email" required onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="email@entreprise.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Entreprise</label>
                  <input name="company" onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Nom de société" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Téléphone</label>
                  <input name="phone" onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="+33 6..." />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Budget estimé</label>
                  <input name="budget" onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Ex: 1500$" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Timeline</label>
                  <input name="timeline" onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Ex: 1 mois" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Message</label>
                  <textarea name="message" rows="3" onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none resize-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Dites-nous en plus..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="md:col-span-2 w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2" style={{ backgroundColor: selectedPackage?.color }}>
                  {isSubmitting ? "Envoi en cours..." : <><FaPaperPlane /> Confirmer la commande</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
