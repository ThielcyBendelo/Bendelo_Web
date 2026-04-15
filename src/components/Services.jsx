import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, FaMobileAlt, FaPalette, FaShieldAlt, FaTools, 
  FaCloud, FaGraduationCap, FaCheck, FaTimes, FaPaperPlane, 
  FaWallet, FaCalendarAlt, FaBuilding, FaPhoneAlt 
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', budget: '', timeline: '', message: ''
  });

  const services = [
    {
      icon: <FaRocket />,
      title: 'Développement Web',
      description: 'Sites web modernes, performants et responsives. De la landing page au site e-commerce complet.',
      price: '1200$',
      duration: '2-8 semaines',
      benefits: ['Design responsive', 'SEO optimisé', 'Performance maximale', 'Support technique'],
      color: '#3b82f6'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Applications Mobiles',
      description: 'Applications natives iOS/Android ou cross-platform avec React Native et Flutter.',
      price: '2500$',
      duration: '4-12 semaines',
      benefits: ['UI/UX native', 'Performance optimale', 'Publication store', 'Maintenance incluse'],
      color: '#10b981'
    },
    {
      icon: <FaPalette />,
      title: 'Design UI/UX',
      description: 'Interfaces utilisateur intuitives et expériences utilisateur exceptionnelles.',
      price: '800$',
      duration: '1-4 semaines',
      benefits: ['Wireframes & mockups', 'Système de design', 'Prototypage', 'Tests utilisateurs'],
      color: '#a855f7'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Cybersécurité',
      description: 'Protection complète de vos systèmes et données contre les menaces cybernétiques.',
      price: '1500$',
      duration: '1-6 semaines',
      benefits: ['Audit sécurité', 'Protection données', 'Formation équipe', 'Monitoring 24/7'],
      color: '#ef4444'
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
      icon: <FaCloud />,
      title: 'Services Cloud',
      description: 'Migration et gestion d\'infrastructures cloud scalables et sécurisées.',
      price: '1000$',
      duration: '2-6 semaines',
      benefits: ['Migration cloud', 'Auto-scaling', 'Sauvegarde cloud', 'Monitoring'],
      color: '#0ea5e9'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Formation & Accompagnement',
      description: 'Formations personnalisées et accompagnement pour développer vos compétences techniques.',
      price: '500$',
      duration: 'Sessions flexibles',
      benefits: ['Formations sur mesure', 'Accompagnement projet', 'Support technique', 'Certification'],
      color: '#14b8a6'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send('service_muamokel', 'template_quote_request', {
        ...formData,
        service_selected: selectedService.title,
        to_email: 'contact@muamokel.com'
      }, 'YOUR_PUBLIC_KEY');
      toast.success('Demande envoyée avec succès !');
      setIsModalOpen(false);
      setFormData({ name: '', email: '', company: '', phone: '', budget: '', timeline: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
       <div className="text-center mb-24 relative">
  {/* Surtitre stratégique */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-8"
  >
    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
      Expertise Opérationnelle
    </span>
  </motion.div>

  {/* Titre Principal : Look Agence Digitale */}
  <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-none">
    <span className="text-[var(--text-primary)] opacity-90">Nos </span>
    <span className="bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">
      Solutions
    </span>
    <span className="text-[var(--accent-1)]">.</span>
  </h1>

  {/* Description avec hiérarchie de noms (Branding) */}
  <div className="max-w-4xl mx-auto space-y-4">
    <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--text-primary)]">
      Propulser votre vision grâce à l'ingénierie de pointe développée par  
      <span className="font-black italic text-orange-500 mx-2">Bendelo.Thielcy</span> 
      en synergie avec 
      <span className="font-black italic dark:text-white text-slate-900 ml-2 underline decoration-orange-500/30">
        MUAMOKEL AGENCY
      </span>.
    </p>
    
    <div className="flex justify-center items-center gap-4 pt-4">
      <div className="h-[1px] w-12 bg-orange-500/30" />
      <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)] font-bold">
        Digitalisation • Architecture Cloud • Cybersécurité
      </p>
      <div className="h-[1px] w-12 bg-orange-500/30" />
    </div>
  </div>
</div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={index} whileHover={{ y: -10 }} className="p-8 rounded-3xl border flex flex-col h-full transition-all"
                 style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow)' }}>
              <div className="text-3xl mb-6 p-4 rounded-2xl w-fit" style={{ backgroundColor: `${service.color}15`, color: service.color }}>{service.icon}</div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
              
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase px-2 py-1 rounded-md" style={{ backgroundColor: `${service.color}20`, color: service.color }}>
                  <FaWallet /> dès {service.price}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase px-2 py-1 rounded-md border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  <FaCalendarAlt /> {service.duration}
                </span>
              </div>

              <p className="text-sm mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
              <div className="space-y-2 mb-8">
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-primary)' }}><FaCheck className="text-[var(--accent-1)]" /> {b}</div>
                ))}
              </div>
              <button onClick={() => { setSelectedService(service); setIsModalOpen(true); }}
                      className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: service.color }}>
                Demander un devis
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/50">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="max-w-3xl w-full rounded-3xl p-6 md:p-10 shadow-2xl border max-h-[90vh] overflow-y-auto"
                        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}>
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Devis : {selectedService?.title}</h2>
                  <p className="text-sm" style={{ color: 'var(--accent-1)' }}>Estimation : {selectedService?.price} • Délai : {selectedService?.duration}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-2xl p-2" style={{ color: 'var(--text-secondary)' }}><FaTimes /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Nom complet</label>
                  <input name="name" required onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--accent-1)]" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Jean Dupont" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Email Pro</label>
                  <input name="email" type="email" required onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--accent-1)]" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="contact@entreprise.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Entreprise</label>
                  <div className="relative"><FaBuilding className="absolute left-4 top-5 text-gray-500" /><input name="company" onChange={handleInputChange} className="w-full p-4 pl-12 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Muamokel Agency" /></div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Téléphone</label>
                  <div className="relative"><FaPhoneAlt className="absolute left-4 top-5 text-gray-500" /><input name="phone" onChange={handleInputChange} className="w-full p-4 pl-12 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="+243..." /></div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Budget</label>
                  <select name="budget" onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                    <option value="">Sélectionner</option><option value="<1000$">- 1000$</option><option value="1000-5000$">1000$ - 5000$</option><option value="5000$+">5000$ +</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Délai souhaité</label>
                  <select name="timeline" onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                    <option value="">Sélectionner</option><option value="Urgent">Urgent (- 2 sem.)</option><option value="Standard">Standard (1-2 mois)</option><option value="Flexible">Flexible</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase ml-1" style={{ color: 'var(--text-secondary)' }}>Détails du besoin</label>
                  <textarea name="message" rows="3" required onChange={handleInputChange} className="w-full p-4 rounded-xl border outline-none resize-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Décrivez votre projet..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="md:col-span-2 py-5 rounded-xl font-bold flex items-center justify-center gap-3 text-white shadow-xl hover:brightness-110 transition-all" style={{ backgroundColor: 'var(--accent-1)' }}>
                  {isSubmitting ? 'Envoi en cours...' : <><FaPaperPlane /> Envoyer la demande de devis</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
