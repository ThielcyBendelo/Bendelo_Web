import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaTerminal } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Accueil", path: "/home" },
    { name: "Services", path: "/services" },
    { name: "Projets", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const secondaryLinks = [
    { name: "À propos", path: "/about" },
    { name: "Expériences", path: "/experience" },
    { name: "Compétences", path: "/skills" },
  ];

  return (
    <footer className="relative border-t border-slate-200/50 dark:border-white/10 overflow-hidden" 
            style={{ backgroundColor: 'var(--bg)' }}>
      
      {/* Glow décoratif en arrière-plan */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Colonne 1 : Branding & Status (4 colonnes) */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                <span className="text-white font-black text-xl">BT</span>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white block uppercase italic">
                  Bendelo<span className="text-orange-500">.</span>Thielcy
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 dark:text-slate-400">
                  Principal Software Engineer
                </span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xs">
              Architecte de solutions digitales haut de gamme spécialisé dans la transformation des entreprises à Kinshasa et à l'international.
            </p>

            {/* Badge de statut temps réel */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-600 dark:text-green-400">
                Disponible pour consultation
              </span>
            </div>
          </div>

          {/* Colonne 2 : Navigation (2 colonnes) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-6 flex items-center gap-2">
              <FaTerminal className="text-[10px]" /> Index
            </h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Découvrir (2 colonnes) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-6">Expertise</h4>
            <ul className="space-y-4">
              {secondaryLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Social (4 colonnes) */}
          <div className="md:col-span-4 flex flex-col md:items-end">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-6">Connecter le système</h4>
            <div className="flex gap-4">
              {[
                { icon: <FaLinkedin />, href: "https://linkedin.com/in/ir-thielcy-bendelo-b1101233a", color: "hover:bg-blue-600" },
                { icon: <FaGithub />, href: "https://github.com/ThielcyBendelo", color: "hover:bg-slate-800" },
                { icon: <FaWhatsapp />, href: "https://wa.me/243829054350", color: "hover:bg-green-600" },
                { icon: <FaEnvelope />, href: "mailto:bendelothieclcy@gmail.com", color: "hover:bg-orange-600" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"           // Ouvre WhatsApp dans un nouvel onglet
                  rel="noopener noreferrer" // Sécurise le transfert
                  whileHover={{ y: -5 }}
                  className={`w-12 h-12 rounded-xl bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xl text-slate-600 dark:text-slate-400 ${social.color} hover:text-white hover:border-transparent transition-all duration-300 shadow-sm`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-10 text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Localisation</p>
              <p className="text-sm font-bold text-gray-400 dark:text-gray italic">Kinshasa, RD Congo</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar : Ligne de copyright épurée */}
        <div className="mt-20 pt-8 border-t border-gray-400 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-gray-400 text-orange-500 dark:text-white uppercase tracking-widest text-center md:text-left">
            © {currentYear} Bendelo Thielcy <span className="mx-2 opacity-30">|</span> Crafted with Passion & Code
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">Privacy Policy</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
