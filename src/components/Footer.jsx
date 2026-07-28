import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaTerminal, FaLightbulb } from 'react-icons/fa';

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
    <footer className="px-6 max-w-7xl mx-auto relative z-20  border-t border-orange-500/40 dark:border-white/10" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* --- GRILLE PRINCIPALE SYSTEME (12 COLONNES) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* 1. BRANDING & TEXTE DE VISION (4 colonnes) */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              {/* Logo épuré style bloc de code */}
              <div className="w-10 h-10 border border-slate-950 dark:border-white bg-slate-950 dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-black font-black text-sm font-mono">BT</span>
              </div>
              <div>
                <span className="text-base font-bold uppercase tracking-wider block text-slate-950 dark:text-white">
                  Bendelo Thielcy<span className="text-orange-500">.</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-slate-400 dark:text-slate-500 block">
                  // Ingénieur & Éveilleur
                </span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed max-w-sm font-black tracking-wide text-slate-950 dark:text-slate-850 italic">
              "Bâtir des systèmes technologiques innovants pour digitaliser demain, tout en réveillant les consciences pour transformer l'Afrique."
            </p>

            {/* Statut d'état système au format log d'exécution */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-[9px] text-slate-950 dark:text-slate-850">
              <span className="w-1.5 h-1.5 bg-emerald-500" />
              <span>STATUS: CONNECTED_TO_CHANGE</span>
            </div>
          </div>

          {/* 2. INDEX TECH / ARCHITECTURES (2 colonnes) */}
          <div className="md:col-span-2">
            <h4 className="text-[15px] font-mono font-bold uppercase tracking-wider mb-6 flex items-center gap-2 text-slate-950 dark:text-white">
              <FaTerminal className="text-xs text-slate-950" /> [systèmes]
            </h4>
            <ul className="space-y-3">
              {techLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-bold tracking-wide text-slate-950 dark:text-slate-850 hover:text-orange-500 dark:hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. INDEX IMPACT / EVEIL (2 colonnes) */}
          <div className="md:col-span-2">
            <h4 className="text-[15px] font-black font-bold uppercase tracking-wider mb-6 flex items-center gap-2 text-slate-950 dark:text-white">
              <FaLightbulb className="text-xs text-slate-950" /> [conscience]
            </h4>
            <ul className="space-y-3">
              {impactLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-bold tracking-wide text-slate-950 dark:text-slate-850 hover:text-orange-500 dark:hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. NETWORKS & CONTROLES SOCIAUX (4 colonnes) */}
          <div className="md:col-span-4 flex flex-col md:items-end">
            <h4 className="text-[15px] font-black uppercase tracking-widest text-slate-950 dark:text-slate-850 mb-6">// Relier les réseaux</h4>
            
                    {/* Grille de liens réseaux carrée et uniforme */}
            <div className="flex gap-2">
              {[
                { icon: <FaLinkedin />, href: "https://linkedin.com" },
                { icon: <FaGithub />, href: "https://github.com/ThielcyBendelo" },
                { icon: <FaWhatsapp />, href: "https://wa.me/243829054350" },
                { icon: <FaEnvelope />, href: "mailto:bendelothieclcy@gmail.com" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-slate-950 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-center text-sm text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30 hover:text-slate-950 dark:hover:text-white transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            
            <div className="mt-8 text-left md:text-right font-bold text-[15px] text-slate-950 dark:text-slate-850 space-y-1">
              <p>POLE: IMPACT_CORE</p>
              <p className="text-xs text-slate-950 dark:text-white font-sans font-bold uppercase tracking-wider">Kinshasa, RD Congo</p>
            </div>
          </div>
        </div>

        {/* --- METRIQUES DU REPERTOIRE / BOTTOM BAR --- */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-mono font-bold uppercase border-t border-orange-500/40 tracking-wider text-slate-950 dark:text-slate-850 text-center md:text-left">
            © {currentYear} <span className="text-slate-950 dark:text-white font-sans font-bold">BENDELO THIELCY</span> 
            <span className="mx-3 opacity-20">|</span> 
            <span>INGÉNIERIE & ÉVEIL DE CONSCIENCE</span>
          </p>
          
          <div className="flex gap-6 font-bold text-[10px] border-t border-orange-500/40 text-slate-950 dark:text-slate-500">
            <span className="hover:text-slate-950 dark:hover:text-white cursor-pointer transition-colors">[ privacy_policy ]</span>
            <span className="hover:text-slate-950 dark:hover:text-white cursor-pointer transition-colors">[ terms_of_service ]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
