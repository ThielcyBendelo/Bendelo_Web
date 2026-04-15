import { useState, useEffect } from 'react';
import { contact } from '../assets/assets.js';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { init, send } from '@emailjs/browser';
import {
  FaEnvelope, FaLinkedin, FaGithub, FaInstagram,
  FaFacebook, FaWhatsapp, FaPaperPlane, FaInfoCircle
} from 'react-icons/fa';
import notificationService from '../services/notificationService';
import analyticsService from '../services/analyticsService';
import messagingService from '../dashboard/services/messagingService';
import { motion } from 'framer-motion';


const contactIcons = {
  Email: FaEnvelope, LinkedIn: FaLinkedin, GitHub: FaGithub,
  Instagram: FaInstagram, Facebook: FaFacebook, WhatsApp: FaWhatsapp,
};

export default function Contact() {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  useEffect(() => {
    try { if (EMAILJS_PUBLIC_KEY) init(EMAILJS_PUBLIC_KEY); } 
    catch (err) { console.warn('EmailJS init failed', err); }
  }, [EMAILJS_PUBLIC_KEY]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Envoi en cours...' });
    analyticsService.trackEvent('contact_form_submit', { category: 'contact' });
    const loadingToast = notificationService.loading('Envoi de votre message...');

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      const mailtoLink = `mailto:bendelothielcy@gmail.com?subject=Message de ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      window.location.href = mailtoLink;
      notificationService.dismiss(loadingToast);
      notificationService.success('Client email ouvert !');
      return;
    }

    try {
      await send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: 'bendelothielcy@gmail.com',
      });
      
      messagingService.addMessage({ ...formData, timestamp: new Date().toISOString() });
      notificationService.dismiss(loadingToast);
      notificationService.formSuccess('Succès !', 'Je vous répondrai très vite.');
      setFormData({ name: '', email: '', message: '' });
      setStatus({ type: 'success', message: 'Envoyé !' });
    } catch (err) {
      notificationService.dismiss(loadingToast);
      setStatus({ type: 'error', message: 'Erreur lors de l\'envoi.' });
    }
  };

  return (
    <section ref={elementRef} id="contact" className="py-20 px-6 transition-colors duration-300" style={{ backgroundColor: 'var(--bg)' }}>
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
       <div className="text-center mb-24 relative">
  {/* Petit label flottant - Engagement Professionnel */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-8"
  >
    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
      Open for collaboration
    </span>
  </motion.div>

  {/* Titre Contact Ultra-Massif */}
  <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-none">
    <span className="text-[var(--text-primary)] opacity-90">Initier le </span>
    <span className="bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">
      Contact
    </span>
    <span className="text-[var(--accent-1)]">.</span>
  </h2>

  {/* Description orientée "Business Value" */}
  <div className="max-w-3xl mx-auto">
    <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--text-primary)] mb-8">
      Prêt à scaler votre infrastructure ou à lancer votre prochain écosystème digital ? 
      <span className="block mt-2 font-bold italic text-orange-500">Analysons vos besoins ensemble.</span>
    </p>
    
    {/* Séparateur avec indicateur de fuseau horaire ou localisation */}
    <div className="flex justify-center items-center gap-6">
      <div className="h-[1px] flex-1 bg-gradient-to-l from-orange-500/50 to-transparent" />
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-secondary)] whitespace-nowrap">
        Basé à Kinshasa • Disponible Worldwide
      </p>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
    </div>
  </div>
</div>


        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Infos de Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <div className="p-8 rounded-3xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow)' }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Coordonnées</h3>
              <div className="space-y-6">
                {contact.map((item, idx) => {
                  const Icon = contactIcons[item.label] || FaEnvelope;
                  return (
                    <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center gap-4 group transition-transform hover:translate-x-2">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] text-white shadow-lg shadow-purple-500/20">
                        <Icon className="text-xl" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent-1)' }}>{item.label}</p>
                        <p className="text-sm font-medium truncate max-w-[200px]" style={{ color: 'var(--text-primary)' }}>{item.link.replace('mailto:', '')}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Petit badge de réassurance */}
            <div className="p-6 rounded-2xl border border-dashed flex items-center gap-4" style={{ borderColor: 'var(--border-color)' }}>
              <FaInfoCircle className="text-2xl" style={{ color: 'var(--accent-1)' }} />
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Réponse garantie sous 24 à 48 heures ouvrées.</p>
            </div>
          </div>

          {/* Formulaire (3 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 p-8 md:p-10 rounded-3xl border order-1 lg:order-2 transition-all"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow)' }}>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1" style={{ color: 'var(--text-primary)' }}>Nom complet</label>
                <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required
                       className="w-full px-5 py-4 rounded-2xl border outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                       style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                       placeholder="Ex: Jean Dupont" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1" style={{ color: 'var(--text-primary)' }}>Votre Email</label>
                <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required
                       className="w-full px-5 py-4 rounded-2xl border outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                       style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                       placeholder="email@exemple.com" />
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-bold ml-1" style={{ color: 'var(--text-primary)' }}>Votre Message</label>
              <textarea name="message" rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required
                        className="w-full px-5 py-4 rounded-2xl border outline-none transition-all focus:ring-4 focus:ring-purple-500/10 resize-none"
                        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                        placeholder="Dites-moi tout sur votre projet..." />
            </div>

            <button type="submit" className="w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-purple-500/20"
                    style={{ backgroundColor: 'var(--accent-1)', color: 'white' }}>
              <FaPaperPlane />
              {status.type === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
