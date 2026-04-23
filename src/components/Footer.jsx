import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaTerminal, FaBook, FaLightbulb } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const techLinks = [
    { name: "Services", path: "/services" },
    { name: "Projets Tech", path: "/projects" },
    { name: "Expertise", path: "/skills" },
  ];

  const impactLinks = [
    { name: "Mes Ouvrages", path: "/blog" },
    { name: "Coaching Éveil", path: "/services" },
    { name: "L'Éveilleur", path: "/about" },
  ];

  return (
    <footer className="relative border-t transition-all duration-700 overflow-hidden" 
            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)' }}>
      
      {/* --- GLOW ADAPTATIF --- */}
      <div 
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] rounded-full -z-10 opacity-30 dark:opacity-10" 
        style={{ backgroundColor: 'var(--accent-2)' }} 
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* 1. BRANDING & VISION (4 colonnes) */}
          <div className="md:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-1)] rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-xl">BT</span>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter block uppercase italic" style={{ color: 'var(--text-primary)' }}>
                  Bendelo<span className="text-[var(--accent-2)]">.</span>Thielcy
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] font-black" style={{ color: 'var(--text-secondary)' }}>
                  Ingénieur & Éveilleur
                </span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed max-w-xs font-light italic" style={{ color: 'var(--text-secondary)' }}>
              "Bâtir des systèmes technologiques innovants pour digitaliser demain, tout en réveillant les consciences pour transformer l'Afrique."
            </p>

            {/* Statut adaptatif */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border" 
                 style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">
                Connecté au changement
              </span>
            </div>
          </div>

          {/* 2. INDEX TECH (2 colonnes) */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2" style={{ color: 'var(--accent-2)' }}>
              <FaTerminal /> Systèmes
            </h4>
            <ul className="space-y-4">
              {techLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-medium transition-colors hover:text-[var(--accent-2)]" style={{ color: 'var(--text-secondary)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. INDEX IMPACT (2 colonnes) */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2" style={{ color: 'var(--accent-1)' }}>
              <FaLightbulb /> Éveil
            </h4>
            <ul className="space-y-4">
              {impactLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-medium transition-colors hover:text-[var(--accent-1)]" style={{ color: 'var(--text-secondary)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. SOCIAL & CONTACT (4 colonnes) */}
          <div className="md:col-span-4 flex flex-col md:items-end">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: 'var(--text-primary)' }}>Relier les réseaux</h4>
            <div className="flex gap-3">
              {[
                { icon: <FaLinkedin />, href: "https://linkedin.com/in/ir-thielcy-bendelo-b1101233a", color: "hover:bg-blue-600" },
                { icon: <FaGithub />, href: "https://github.com/ThielcyBendelo", color: "hover:bg-slate-800" },
                { icon: <FaWhatsapp />, href: "https://wa.me/243829054350", color: "hover:bg-green-600" },
                { icon: <FaEnvelope />, href: "mailto:bendelothieclcy@gmail.com", color: "hover:bg-orange-600" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center text-lg transition-all duration-300 shadow-sm`}
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-10 text-right">
              <p className="text-[9px] uppercase tracking-widest font-black" style={{ color: 'var(--accent-2)' }}>Pôle d'Impact</p>
              <p className="text-sm font-bold italic" style={{ color: 'var(--text-primary)' }}>Kinshasa, RD Congo</p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6" 
             style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-[9px] font-black uppercase tracking-widest text-center md:text-left" style={{ color: 'var(--text-secondary)' }}>
            © {currentYear} <span className="text-[var(--text-primary)]">Bendelo Thielcy</span> 
            <span className="mx-2 opacity-20">|</span> 
            <span className="italic text-[var(--accent-2)]">Ingénierie & Éveil de Conscience</span>
          </p>
          <div className="flex gap-8">
            <span className="text-[9px] font-bold uppercase tracking-widest hover:text-[var(--accent-1)] cursor-pointer transition-colors" style={{ color: 'var(--text-secondary)' }}>Privacy</span>
            <span className="text-[9px] font-bold uppercase tracking-widest hover:text-[var(--accent-1)] cursor-pointer transition-colors" style={{ color: 'var(--text-secondary)' }}>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
