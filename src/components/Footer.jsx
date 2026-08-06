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
    <footer 
      className="w-full relative overflow-hidden bg-[#0A1622] border-t border-white/10" 
      id="system-footer"
    >
      {/* --- MAILLAGE BLUEPRINT GÉOMÉTRIQUE EN ARRIÈRE-PLAN --- */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, 
          backgroundSize: '45px 45px',
          backgroundPosition: 'center top'
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
        
        {/* --- GRILLE PRINCIPALE SYSTÈME (12 COLONNES) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* 1. BRANDING & TEXTE DE VISION (4 colonnes) */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              {/* Logo épuré style bloc de code - Carré Parfait */}
              <div className="w-10 h-10 border border-white bg-white flex items-center justify-center rounded-none">
                <span className="text-black font-mono font-black text-sm">BT</span>
              </div>
              <div>
                <span className="text-base font-bold uppercase tracking-wider block text-white">
                  Bendelo Thielcy<span className="text-[#FF6B35]">.</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 block">
                  // Ingénieur & Éveilleur
                </span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed max-w-sm font-medium tracking-wide text-slate-400 italic">
              "Bâtir des systèmes technologiques innovants pour digitaliser demain, tout en réveillant les consciences pour transformer l'Afrique."
            </p>

            {/* Statut d'état système au format log d'exécution */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.02] font-mono text-[10px] text-white rounded-none">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse" />
              <span>SYS_STATUS: CONNECTED_TO_CORE</span>
            </div>
          </div>

          {/* 2. INDEX TECH / ARCHITECTURES (2 colonnes) */}
          <div className="md:col-span-2">
            <h4 className="text-[13px] font-mono font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-white">
              <FaTerminal className="text-xs text-[#FF6B35]" /> [systèmes]
            </h4>
            <ul className="space-y-3">
              {techLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#FF6B35] transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. INDEX IMPACT / EVEIL (2 colonnes) */}
          <div className="md:col-span-2">
            <h4 className="text-[13px] font-mono font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-white">
              <FaLightbulb className="text-xs text-[#FF6B35]" /> [conscience]
            </h4>
            <ul className="space-y-3">
              {impactLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#FF6B35] transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. NETWORKS & CONTROLES SOCIAUX (4 colonnes) */}
          <div className="md:col-span-4 flex flex-col md:items-end">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF6B35] mb-6">// RELIER_LES_RESEAUX</h4>
            
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
                  className="w-10 h-10 border border-white/10 bg-white/[0.02] flex items-center justify-center text-sm text-slate-400 hover:border-[#FF6B35]/40 hover:text-[#FF6B35] transition-all duration-200 rounded-none"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="mt-8 text-left md:text-right font-mono text-[11px] text-slate-400 space-y-1">
              <p>POLE: IMPACT_CORE_NODE</p>
              <p className="text-xs text-white font-sans font-bold uppercase tracking-wider">Kinshasa, RD Congo</p>
            </div>
          </div>
        </div>

        {/* --- METRIQUES DU REPERTOIRE / BOTTOM BAR --- */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 text-center md:text-left">
            © {currentYear} <span className="text-white font-sans font-black">BENDELO THIELCY</span> 
            <span className="mx-3 opacity-20">|</span> 
            <span>INGÉNIERIE & ÉVEIL DE CONSCIENCE</span>
          </p>
          
          <div className="flex gap-6 font-mono text-[10px] text-slate-500">
            <span className="hover:text-white cursor-pointer transition-colors">[ PRIVACY_POLICY ]</span>
            <span className="hover:text-white cursor-pointer transition-colors">[ TERMS_OF_SERVICE ]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
