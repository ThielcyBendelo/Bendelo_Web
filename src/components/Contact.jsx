import { useState, useEffect } from 'react';
import { contact } from '../assets/assets.js';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import emailjs from '@emailjs/browser';
import {
  FaEnvelope, FaLinkedin, FaGithub, FaInstagram,
  FaFacebook, FaWhatsapp, FaInfoCircle
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

  const getEmailJsValue = (envValue) => {
    if (typeof envValue === 'string' && envValue.trim() && !envValue.includes('YOUR_')) {
      return envValue.trim();
    }
    return '';
  };

  const EMAILJS_SERVICE_ID = getEmailJsValue(import.meta.env.VITE_EMAILJS_SERVICE_ID);
  const EMAILJS_TEMPLATE_ID = getEmailJsValue(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
  const EMAILJS_PUBLIC_KEY = getEmailJsValue(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  useEffect(() => {
    try {
      if (EMAILJS_PUBLIC_KEY) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      }
    } catch (err) {
      console.warn('EmailJS init failed', err);
    }
  }, [EMAILJS_PUBLIC_KEY]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Envoi en cours...' });
    analyticsService.trackEvent('contact_form_submit', { category: 'contact' });
    const loadingToast = notificationService.loading('Envoi de votre message...');

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      notificationService.dismiss(loadingToast);
      setStatus({
        type: 'error',
        message: 'EmailJS n’est pas configuré. Ajoutez vos vraies clés dans le fichier .env du projet.',
      });
      notificationService.error('Configuration EmailJS manquante');
      console.error('EmailJS env values missing', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      return;
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
        to_email: 'bendelothielcy@gmail.com',
        subject: `Nouveau message de ${formData.name}`,
      });

      messagingService.addMessage({ ...formData, timestamp: new Date().toISOString() });
      notificationService.dismiss(loadingToast);
      notificationService.formSuccess('Succès !', 'Je vous répondrai très vite.');
      setFormData({ name: '', email: '', message: '' });
      setStatus({ type: 'success', message: 'Envoyé !' });
    } catch (err) {
      console.error('EmailJS failed:', err);
      notificationService.dismiss(loadingToast);
      setStatus({
        type: 'error',
        message: 'Échec de l’envoi. Vérifiez les identifiants EmailJS et le template.',
      });
      notificationService.error('Échec de l’envoi du message');
    }
  };

  return (
    <section ref={elementRef} id="contact" className="py-24 px-6 border-t border-slate-200 dark:border-white/10" style={{ backgroundColor: 'var(--bg)' }}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        
        {/* --- EN-TÊTE DE SECTION ÉPURÉ --- */}
        <div className="text-center mb-20 relative">
          <span className="text-slate-950 dark:text-slate-850 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Open for collaboration
          </span>

          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Initier le <span className="underline decoration-1 underline-offset-8">Contact</span>
          </h2>

          <div className="max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-slate-950 font-black tracking-wide leading-relaxed max-w-2xl mx-auto">
              Prêt à scaler votre infrastructure ou à lancer votre prochain écosystème digital ? Analysons vos besoins ensemble.
            </p>
            
            <div className="flex justify-center items-center gap-4 max-w-md mx-auto">
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10" />
              <p className="text-[9px] font-bold font-bold uppercase tracking-wider text-slate-950 dark:text-slate-850 whitespace-nowrap">
                Kinshasa [GMT+1] • Worldwide
              </p>
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10" />
            </div>
          </div>
        </div>

        {/* --- GRILLE PRINCIPALE (3/5 - 2/5) --- */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* COORDONNÉES ET INFOS (2 colonnes) */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <div className="p-8 border border-slate-950 dark:border-orage-500 bg-slate-50 dark:bg-[#09090b]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-950 dark:text-white mb-6 font-mono">// [ coordinates ]</h3>
              
              <div className="space-y-4">
                {contact.map((item, idx) => {
                  const Icon = contactIcons[item.label] || FaEnvelope;
                  return (
                    <a 
                      key={idx} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-3 border border-slate-200/50 dark:border-white/5 bg-white dark:bg-white/5 hover:border-slate-400 dark:hover:border-white/30 transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="text-slate-950 dark:text-slate-950 text-lg transition-colors group-hover:text-orange-500">
                          <Icon />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{item.label}</p>
                          <p className="text-xs font-medium text-slate-950 dark:text-slate-850 truncate max-w-[180px]">{item.link.replace('mailto:', '')}</p>
                        </div>
                      </div>
                      <span className="text-slate-950 dark:text-white/5 group-hover:text-orange-500 group-hover:translate-x-1 transition-all text-xs">→</span>
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Note de réassurance style console */}
            <div className="p-5 border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#09090b]/50 flex items-start gap-4">
              <div className="text-slate-400 mt-0.5 text-sm">
                <FaInfoCircle />
              </div>
              <p className="text-xs font-mono tracking-wide leading-relaxed text-slate-950 dark:text-slate-850">
                [sys_info]: Réponse garantie sous 24 à 48 heures ouvrées pour toute demande d'architecture logicielle ou d'ingénierie d'affaires.
              </p>
            </div>
          </div>

          {/* FORMULAIRE (3 colonnes) */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 p-8 md:p-10 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] order-1 lg:order-2 space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-950 dark:text-slate-850 block">Nom complet</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required
                  className="w-full px-4 py-3 border border-slate-950 dark:border-orange-500 bg-white dark:bg-white/5 text-sm text-slate-950 dark:text-white rounded-none outline-none focus:border-slate-400 dark:focus:border-white/30 transition-colors font-mono"
                  placeholder="Jean Dupont" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-950 dark:text-slate-850 block">Adresse Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required
                  className="w-full px-4 py-3 border border-slate-850 dark:border-orange-500 bg-white dark:bg-white/5 text-sm text-slate-950 dark:text-white rounded-none outline-none focus:border-slate-400 dark:focus:border-white/30 transition-colors font-mono"
                  placeholder="jean.dupont@domain.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-950 dark:text-slate-850 block">Votre Message</label>
              <textarea 
                name="message" 
                rows="6" 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                required
                className="w-full px-4 py-3 border border-slate-950 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-slate-900 dark:text-white rounded-none outline-none focus:border-slate-400 dark:focus:border-white/30 transition-colors font-mono resize-none"
                placeholder="Décrivez brièvement les objectifs de votre projet ou vos besoins d'infrastructure..." 
              />
            </div>

            {/* Bouton d'action principal uniforme */}
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="w-full sm:w-auto px-10 py-4 bg-slate-950 dark:bg-white text-white dark:text-black font-bold uppercase text-xs tracking-widest hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              {status.type === 'loading' ? 'Envoi en cours...' : 'Envoyer la demande'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
