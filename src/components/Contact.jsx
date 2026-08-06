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
import { emailJsConfig, isEmailJsConfigured } from '../config/emailjs';

const contactIcons = {
  Email: FaEnvelope, LinkedIn: FaLinkedin, GitHub: FaGithub,
  Instagram: FaInstagram, Facebook: FaFacebook, WhatsApp: FaWhatsapp,
};

export default function Contact() {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const { serviceId: EMAILJS_SERVICE_ID, templateId: EMAILJS_TEMPLATE_ID, publicKey: EMAILJS_PUBLIC_KEY } =
    emailJsConfig;

  useEffect(() => {
    try {
      if (EMAILJS_PUBLIC_KEY) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      }
    } catch (err) {
      console.warn('EmailJS init failed', err);
    }
  }, [EMAILJS_PUBLIC_KEY]);

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(`Nouveau message de ${formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:bendelothielcy@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Envoi en cours...' });
    analyticsService.trackEvent('contact_form_submit', { category: 'contact' });
    const loadingToast = notificationService.loading('Envoi de votre message...');

    if (!isEmailJsConfigured()) {
      notificationService.dismiss(loadingToast);
      openMailtoFallback();
      setStatus({
        type: 'success',
        message: 'Ouverture de votre client email…',
      });
      notificationService.info('EmailJS indisponible — client email ouvert');
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'bendelothielcy@gmail.com',
          subject: `Nouveau message de ${formData.name}`,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Sauvegarde locale dashboard (ne doit pas faire échouer l'envoi email)
      try {
        const conversation = messagingService.getOrCreateConversation(
          formData.email,
          null,
          formData.name || 'Visiteur'
        );
        messagingService.sendMessage(conversation.id, {
          content: formData.message,
          type: 'text',
          sender: 'client',
          senderName: formData.name || 'Visiteur',
        });
      } catch (storeErr) {
        console.warn('Message email envoyé, mais sauvegarde locale échouée:', storeErr);
      }

      notificationService.dismiss(loadingToast);
      notificationService.formSuccess('Succès !', 'Je vous répondrai très vite.');
      setFormData({ name: '', email: '', message: '' });
      setStatus({ type: 'success', message: 'Envoyé !' });
    } catch (err) {
      const apiText = err?.text || err?.message || String(err);
      console.error('EmailJS failed:', {
        status: err?.status,
        text: apiText,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        // ne pas logger la clé complète
        publicKeyPreview: EMAILJS_PUBLIC_KEY
          ? `${EMAILJS_PUBLIC_KEY.slice(0, 4)}…${EMAILJS_PUBLIC_KEY.slice(-4)}`
          : '(vide)',
      });
      notificationService.dismiss(loadingToast);
      // Fallback mailto si l'API EmailJS échoue
      openMailtoFallback();
      setStatus({
        type: 'error',
        message: apiText.includes('Public Key')
          ? 'Clé EmailJS invalide — client email ouvert en secours.'
          : apiText.includes('template') || apiText.includes('Template')
            ? 'Template EmailJS introuvable — client email ouvert en secours.'
            : 'EmailJS a échoué — client email ouvert en secours.',
      });
      notificationService.warning('Envoi direct impossible — utilisez le client email ouvert');
    }
  };

  return (
    <section 
      ref={elementRef} 
      id="contact" 
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5"
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

      <div className={`relative z-10 max-w-7xl mx-auto transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        
        {/* --- EN-TÊTE DE SECTION STYLE REGISTRE --- */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
            // OPEN_FOR_COLLABORATION
          </span>

          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            INITIER LE <span className="text-[#FF6B35] italic">CONTACT</span>
          </h2>

          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              Prêt à scaler votre infrastructure ou à lancer votre prochain écosystème digital ? Analysons vos besoins techniques et stratégiques ensemble.
            </p>
            
            <div className="flex justify-center items-center gap-4 max-w-md mx-auto">
              <div className="h-[1px] flex-1 bg-white/10" />
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-slate-500 whitespace-nowrap">
                Kinshasa [GMT+1] • Worldwide
              </p>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
          </div>
        </div>

        {/* --- GRILLE PRINCIPALE (2/5 - 3/5) --- */}
        <div className="grid lg:grid-cols-5 gap-8 items-start w-full">
          
          {/* COORDONNÉES ET INFOS (2 colonnes) */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <div className="p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-none shadow-2xl relative overflow-hidden">
              {/* Décoration d'angle technique */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#FF6B35]" />
              
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-slate-500 mb-8">
                // [ COORDINATES ]
              </h3>
              
              <div className="space-y-4">
                {contact.map((item, idx) => {
                  const Icon = contactIcons[item.label] || FaEnvelope;
                  return (
                    <a 
                      key={idx} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-4 border border-white/5 bg-white/5 hover:border-[#FF6B35]/40 transition-all duration-300 group rounded-none"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="text-slate-400 group-hover:text-[#FF6B35] group-hover:scale-110 transition-all duration-300 text-xl">
                          <Icon />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF6B35] mb-1">{item.label}</p>
                          <p className="text-sm font-medium text-slate-300 truncate max-w-[200px]">
                            {item.link.replace('mailto:', '').replace('https://', '')}
                          </p>
                        </div>
                      </div>
                      <span className="text-slate-600 group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all text-xs">→</span>
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Note de réassurance style console */}
            <div className="p-6 border border-white/5 bg-white/[0.01] flex items-start gap-4 rounded-none">
              <div className="text-[#FF6B35] mt-0.5 text-sm animate-pulse">
                <FaInfoCircle />
              </div>
              <p className="text-[11px] font-mono tracking-widest leading-relaxed text-slate-500 uppercase">
                &gt;_ [SYS_INFO]: Réponse garantie sous 24h pour toute demande d'architecture logicielle ou d'audit de sécurité.
              </p>
            </div>
          </div>

          {/* FORMULAIRE (3 colonnes) - Style Input de Code */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 p-8 md:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-xl order-1 lg:order-2 space-y-8 rounded-none shadow-2xl relative">
            {/* Décoration d'angle technique bas-droit */}
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#FF6B35]" />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF6B35] block">
                  &gt; IDENTITÉ_NAME
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required
                  className="w-full px-5 py-4 border border-white/10 bg-black/20 text-sm text-white rounded-none outline-none focus:border-[#FF6B35] transition-all font-mono placeholder:text-slate-700 shadow-inner"
                  placeholder="NOM COMPLET / SOCIÉTÉ" 
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF6B35] block">
                  &gt; CANAL_EMAIL
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required
                  className="w-full px-5 py-4 border border-white/10 bg-black/20 text-sm text-white rounded-none outline-none focus:border-[#FF6B35] transition-all font-mono placeholder:text-slate-700 shadow-inner"
                  placeholder="ADRESSE@PROFESSIONNELLE.COM" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF6B35] block">
                &gt; DESCRIPTION_PROJECT
              </label>
              <textarea 
                name="message" 
                rows="6" 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                required
                className="w-full px-5 py-4 border border-white/10 bg-black/20 text-sm text-white rounded-none outline-none focus:border-[#FF6B35] transition-all font-mono placeholder:text-slate-700 resize-none shadow-inner"
                placeholder="DÉCRIVEZ LES OBJECTIFS TECHNIQUES, LES CONTRAINTES OU LES BESOINS D'INFRASTRUCTURE..." 
              />
            </div>

            {/* Bouton d'action principal uniformisé */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="group relative w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] transition-all hover:bg-[#FF6B35] hover:text-white rounded-none shadow-2xl active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status.type === 'loading' ? 'COMMUNICATION_EN_COURS...' : 'TRANSMETTRE_LA_DEMANDE'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
