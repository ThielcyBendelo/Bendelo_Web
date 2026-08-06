import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import GoogleAnalyticsTracker from '../components/Analytics';
import {
  FaCheck, FaCode, FaMobile, FaCloud, FaShieldAlt,
  FaRocket, FaCog, FaTimes, FaClock, FaUsers,
  FaGlobe, FaDatabase, FaBrain, FaChartLine, FaLock,
  FaServer, FaTools as FaWrench, FaChevronRight,
  FaPaperPlane, FaUser, FaEnvelope, FaPhoneAlt, FaBuilding,
  FaWhatsapp, FaSpinner
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import emailService from '../services/emailService';
import { emailJsConfig } from '../config/emailjs';

export default function OffersPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'Standard',
    message: '',
  });

  const offers = [
    {
      id: 1,
      title: 'Pack Starter',
      subtitle: 'Idéal pour débuter',
      price: '600$',
      originalPrice: '800$',
      savings: '25%',
      icon: <FaCode />,
      duration: '2-4 semaines',
      features: [
        { text: 'Site web responsive (5 pages)', icon: <FaGlobe /> },
        { text: 'Design moderne professionnel', icon: <FaRocket /> },
        { text: 'Optimisation SEO de base', icon: <FaChartLine /> },
        { text: 'Support technique 1 mois', icon: <FaUsers /> },
        { text: "Formation à l'administration", icon: <FaWrench /> },
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
    },
  ];

  const resetForm = () =>
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      projectType: 'Standard',
      message: '',
    });

  const openOrderModal = (offer) => {
    setSelectedPackage(offer);
    resetForm();
    setOrderResult(null);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeOrderModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setSelectedPackage(null);
    setOrderResult(null);
    document.body.style.overflow = '';
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPackage) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Nom, email et téléphone sont requis.');
      return;
    }

    setIsSubmitting(true);
    setOrderResult(null);
    try {
      // PDF + double envoi (toi + client), même pipeline que le devis Services
      const res = await emailService.sendOrderRequest(formData, selectedPackage, {
        downloadPdf: true,
      });

      if (res.success) {
        setOrderResult({
          success: true,
          message: res.message,
          orderRef: res.pdf?.orderRef || res.pdf?.quoteRef,
          filename: res.pdf?.filename,
        });
        toast.success(res.message || 'Commande envoyée avec succès !');
        resetForm();
      } else {
        // PDF peut quand même avoir été généré / téléchargé
        if (res.pdf?.filename) {
          setOrderResult({
            success: false,
            message: res.message,
            orderRef: res.pdf?.orderRef || res.pdf?.quoteRef,
            filename: res.pdf?.filename,
          });
        }
        toast.error(
          res.message ||
            "Erreur lors de l'envoi. Réessayez ou contactez-moi sur WhatsApp."
        );

        // Secours mailto si EmailJS absent
        if (res.message?.includes('EmailJS non configuré')) {
          const owner = emailJsConfig.ownerEmail || 'bendelothielcy@gmail.com';
          const subject = encodeURIComponent(
            `Commande pack: ${selectedPackage.title}${
              res.pdf?.orderRef ? ` [${res.pdf.orderRef}]` : ''
            }`
          );
          const body = encodeURIComponent(
            `Pack: ${selectedPackage.title} (${selectedPackage.price})\n` +
              `Durée: ${selectedPackage.duration}\n` +
              `Réf PDF: ${res.pdf?.orderRef || 'N/A'}\n` +
              `Nom: ${formData.name}\nEmail: ${formData.email}\nTél: ${formData.phone}\n` +
              `Société: ${formData.company}\nType: ${formData.projectType}\n\n` +
              `Message:\n${formData.message}`
          );
          window.location.href = `mailto:${owner}?subject=${subject}&body=${body}`;
        }
      }
    } catch (err) {
      console.error('Offer order failed:', err);
      toast.error("Erreur lors de l'envoi. Réessayez ou contactez-moi sur WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    'w-full pl-10 pr-3 py-3.5 border border-white/10 bg-white/5 text-sm text-white rounded-none outline-none transition-colors font-mono placeholder:text-slate-600 focus:border-[#FF6B35]';

  return (
    <>
      <GoogleAnalyticsTracker />
      <NavbarSecured />

      <main className="pt-24 min-h-screen relative overflow-hidden bg-[#0A1622]">
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
            backgroundPosition: 'center top',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pb-16">
          {/* Header */}
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2 border border-[#FF6B35]/30 bg-[#FF6B35]/5 mb-8 rounded-none"
            >
              <span className="w-2 h-2 bg-[#FF6B35] animate-pulse rounded-none" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6B35]">
                // limited_opportunity_up_to_-25%
              </span>
            </motion.div>

            <h1
              className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none text-white"
              style={{ fontFamily: "'Antonio', sans-serif" }}
            >
              PALIERS D&apos;<span className="text-[#FF6B35] italic">IMPACT</span>
              <span className="text-[#FF6B35]">.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
              Sélectionnez le moteur de croissance adapté à votre échelle. Solutions{' '}
              <span className="font-bold text-[#FF6B35] uppercase tracking-widest mx-1">End-to-End</span>{' '}
              pour maximiser votre ROI digital.
            </p>

            <div className="flex justify-center items-center gap-4 pt-6">
              <div className="h-px w-10 bg-white/10" />
              <p className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-slate-500">
                STANDARD • PRO • ENTERPRISE
              </p>
              <div className="h-px w-10 bg-white/10" />
            </div>
          </div>

          {/* Offers grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ y: -8 }}
                className={`group relative p-8 border transition-all duration-300 flex flex-col h-full rounded-none shadow-2xl ${
                  offer.popular
                    ? 'bg-white/[0.04] border-[#FF6B35]/50 backdrop-blur-xl md:scale-[1.02] z-10'
                    : 'bg-white/[0.02] border-white/10 backdrop-blur-md hover:border-white/20'
                }`}
              >
                {offer.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white px-5 py-1.5 rounded-none text-[9px] font-black uppercase tracking-widest shadow-xl">
                    Plus Populaire
                  </div>
                )}

                <div className="flex justify-between items-start mb-8">
                  <div className="text-2xl p-4 bg-white/5 border border-white/10 text-[#FF6B35] group-hover:scale-105 transition-transform rounded-none">
                    {offer.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold line-through text-slate-500 block">
                      {offer.originalPrice}
                    </span>
                    <span className="text-3xl font-black text-white">{offer.price}</span>
                    <span className="block text-[9px] font-mono font-bold text-emerald-400 uppercase mt-1 tracking-widest">
                      &gt; Save {offer.savings}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">
                    {offer.title}
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-[#FF6B35] uppercase tracking-[0.2em]">
                    // {offer.subtitle}
                  </p>
                  <p className="mt-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <FaClock className="text-[#FF6B35]" /> {offer.duration}
                  </p>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {offer.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-[11px] text-slate-300">
                      <FaChevronRight className="text-[#FF6B35] text-[10px] flex-shrink-0" />
                      <span className="tracking-wide uppercase font-mono font-bold">{feat.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8 p-5 border border-white/5 bg-black/20 rounded-none">
                  <p className="text-[9px] font-mono font-bold uppercase mb-3 tracking-widest text-slate-500">
                    <span className="text-[#FF6B35]">&gt;_</span> BONUS_&amp;_AVANTAGES
                  </p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {offer.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide"
                      >
                        <FaCheck className="shrink-0 text-[#FF6B35] text-[10px]" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  <button
                    type="button"
                    onClick={() => openOrderModal(offer)}
                    className={`sm:col-span-3 w-full py-4 rounded-none font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-[0.98] ${
                      offer.popular
                        ? 'bg-[#FF6B35] text-white hover:bg-white hover:text-black'
                        : 'bg-white text-black hover:bg-[#FF6B35] hover:text-white'
                    }`}
                  >
                    Commander
                  </button>
                  <a
                    href={`https://wa.me/243829054350?text=${encodeURIComponent(
                      `Bonjour, je suis intéressé par le ${offer.title} (${offer.price}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:col-span-2 w-full py-4 border border-[#25D366] text-[#25D366] font-mono font-bold uppercase text-[10px] tracking-widest hover:bg-[#25D366] hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp /> Chat
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <FAQSection />
        <Footer />

        {/* Order modal */}
        <AnimatePresence>
          {isModalOpen && selectedPackage && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) closeOrderModal();
              }}
              role="dialog"
              aria-modal="true"
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

              <motion.div
                initial={{ y: 28, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="relative max-w-2xl w-full border border-white/10 bg-[#0A1622] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col rounded-none"
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent flex-shrink-0" />

                <div className="flex justify-between items-start gap-4 px-6 sm:px-8 pt-6 pb-4 border-b border-white/10 flex-shrink-0">
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono font-bold text-[#FF6B35] uppercase tracking-[0.3em] block mb-2">
                      // order_procurement_module
                    </span>
                    <h2
                      className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight"
                      style={{ fontFamily: "'Antonio', sans-serif" }}
                    >
                      Commander : {selectedPackage.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="text-[9px] font-mono font-bold px-3 py-1 bg-[#FF6B35] text-white uppercase tracking-widest">
                        Prix : {selectedPackage.price}
                      </span>
                      <span className="text-[9px] font-mono font-bold px-3 py-1 border border-white/20 text-slate-300 uppercase tracking-widest">
                        Délai : {selectedPackage.duration}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeOrderModal}
                    disabled={isSubmitting}
                    className="w-10 h-10 border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-[#FF6B35]/50 flex items-center justify-center transition-colors disabled:opacity-40"
                    aria-label="Fermer"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="overflow-y-auto flex-1 px-6 sm:px-8 py-6">
                  {orderResult?.success ? (
                    <div className="flex flex-col items-center text-center py-10 px-2">
                      <div className="w-16 h-16 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl mb-5">
                        <FaCheck />
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-wider text-white mb-2">
                        Commande transmise
                      </h3>
                      {orderResult.orderRef && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6B35] mb-3">
                          REF {orderResult.orderRef}
                        </p>
                      )}
                      <p className="text-sm text-slate-400 max-w-md mb-3 leading-relaxed">
                        {orderResult.message ||
                          'Votre commande a été reçue. Une copie PDF a été préparée pour vous.'}
                      </p>
                      <p className="text-[11px] font-mono text-slate-500 max-w-md mb-8 leading-relaxed">
                        PDF personnalisé généré
                        {orderResult.filename ? ` : ${orderResult.filename}` : ''}.
                        Vérifiez aussi vos emails (boîte / spam) pour la copie client.
                      </p>
                      <button
                        type="button"
                        onClick={closeOrderModal}
                        className="px-8 py-3.5 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors"
                      >
                        Fermer
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="grid md:grid-cols-2 gap-5"
                      noValidate
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                          Nom complet *
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6B35] text-xs" />
                          <input
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className={fieldClass}
                            placeholder="Jean Dupont"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                          Email *
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6B35] text-xs" />
                          <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className={fieldClass}
                            placeholder="jean@entreprise.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                          Téléphone *
                        </label>
                        <div className="relative">
                          <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6B35] text-xs" />
                          <input
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={fieldClass}
                            placeholder="+243 ..."
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                          Société
                        </label>
                        <div className="relative">
                          <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6B35] text-xs" />
                          <input
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className={fieldClass}
                            placeholder="Nom de l'entreprise"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                          Type de projet
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className={`${fieldClass} pl-3 appearance-none cursor-pointer`}
                        >
                          <option value="Standard" className="bg-[#0A1622]">
                            Standard
                          </option>
                          <option value="Professionnel" className="bg-[#0A1622]">
                            Professionnel
                          </option>
                          <option value="Custom Enterprise" className="bg-[#0A1622]">
                            Enterprise Custom
                          </option>
                        </select>
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                          Notes complémentaires
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`${fieldClass} pl-3 resize-none min-h-[110px]`}
                          placeholder="Détails techniques, contraintes, livrables attendus..."
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          type="button"
                          onClick={closeOrderModal}
                          disabled={isSubmitting}
                          className="flex-1 py-4 border border-white/15 text-slate-300 font-bold uppercase text-[10px] tracking-widest hover:border-white/30 hover:text-white transition-colors disabled:opacity-40"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-[1.4] py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin" /> PDF + envoi...
                            </>
                          ) : (
                            <>
                              <FaPaperPlane className="text-[10px]" /> Envoyer commande PDF
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
