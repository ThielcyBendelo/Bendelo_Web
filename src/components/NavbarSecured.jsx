import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, FaTimes, FaEnvelope, FaSignInAlt, FaSignOutAlt, 
  FaTachometerAlt, FaHome, FaTools, FaBriefcase, FaUser, 
  FaCode, FaChevronDown, FaImages 
} from 'react-icons/fa';

import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import authService from '../services/authService';

export default function NavbarSecured() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Gardé pour rétrocompatibilité
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [activeMobileGroup, setActiveMobileGroup] = useState(null);

  // Écouteur de défilement pour l'effet Sticky chirurgical
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronisation de l'état d'authentification
  useEffect(() => {
    authService.initialize().then(() => {
      setIsAuthenticated(authService.isLoggedIn());
      setCurrentUser(authService.getCurrentUser());
    });

    const interval = setInterval(() => {
      setIsAuthenticated(authService.isLoggedIn());
      setCurrentUser(authService.getCurrentUser());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setCurrentUser(null);
      notificationService.success('✓ Déconnexion réussie');
      navigate('/');
    } catch {
      notificationService.error('Erreur lors de la déconnexion');
    }
  };

  const handleNavClick = (section, e) => {
    if (e) e.preventDefault();
    if (isOpen) setIsOpen(false);
    audioService.playNavigate();
    if (section.startsWith('/')) navigate(section);
  };

  const toggleMobileGroup = (groupLabel) => {
    setActiveMobileGroup((prev) => (prev === groupLabel ? null : groupLabel));
  };

  const navGroups = [
    {
      label: 'Navigation',
      items: [
        { href: '/', label: 'Accueil', icon: <FaHome /> },
        { href: '/services', label: 'Services', icon: <FaTools /> },
        { href: '/projects', label: 'Projets', icon: <FaBriefcase /> },
        { href: '/experience', label: 'Parcours', icon: <FaBriefcase /> },
        { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
      ],
    },
    {
      label: 'Découvrir',
      items: [
        { href: '/about', label: 'Ma vision', icon: <FaUser /> },
        { href: '/work', label: 'Coaching', icon: <FaUser /> },
        { href: '/gallery', label: 'Galerie', icon: <FaImages /> },
        { href: '/blog', label: 'Blog', icon: <FaCode /> },
        { href: '/offers', label: 'Offres', icon: <FaBriefcase /> },
        { href: '/skills', label: 'Techniques', icon: <FaCode /> },
        { href: '/testimonials', label: 'Avis', icon: <FaBriefcase /> },
      ],
    },
  ];
  
  return (
  <nav 
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isSticky 
      ? 'bg-[#0A1622]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-2' 
      : 'bg-transparent border-b border-transparent py-5'
  }`}
>
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      
      {/* --- BRANDING / LOGO TECHNIQUE --- */}
      <div 
        className="flex items-center gap-4 cursor-pointer group" 
        onClick={() => navigate('/')}
      >
        {/* Carré de Logo Brut Orthogonal - Zéro Arrondi */}
        <div className="w-10 h-10 border-2 border-white bg-white text-black flex items-center justify-center transition-all group-hover:bg-[#FF6B35] group-hover:border-[#FF6B35] group-hover:rotate-90 duration-500 rounded-none">
          <span className="font-mono font-black text-sm transition-transform group-hover:-rotate-90">BT</span>
        </div>

        <div className="flex flex-col">
          <span 
            className="text-lg font-bold uppercase tracking-widest text-white leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            Bendelo Thielcy<span className="text-[#FF6B35]">.</span>
          </span>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF6B35] font-bold block mt-1.5">
            // PRINCIPAL_SOFTWARE_ENGINEER
          </span>
        </div>
      </div>

      {/* --- DESKTOP NAVIGATION --- */}
      <div className="hidden md:flex items-center gap-8 h-full">
        {navGroups.map((group) => (
          <div key={group.label} className="relative group h-full flex items-center">
            <button
              type="button"
              className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-slate-300 hover:text-[#FF6B35] transition-all duration-300"
            >
              <span className="opacity-40">//</span> {group.label}
              <FaChevronDown className="text-[9px] transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#FF6B35]" />
            </button>

            <div className="absolute top-full left-0 min-w-[240px] border border-white/10 bg-[#0A1622] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 rounded-none shadow-2xl z-50">
              <div className="px-5 py-3 border-b border-white/5 bg-white/[0.03]">
                <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">
                  Module: {group.label.replace(/\s+/g, '_').toUpperCase()}
                </span>
              </div>

              <div className="py-2 border-t-2 border-[#FF6B35]">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="flex items-center justify-between px-5 py-3.5 text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 hover:bg-white hover:text-black transition-all duration-200 border-l-2 border-transparent hover:border-[#FF6B35] group/item"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#FF6B35] text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity">
                        &gt;
                      </span>
                      <span className="text-[#FF6B35]/70 group-hover/item:text-black/50">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[9px] text-slate-600 group-hover/item:text-black/40">
                      [LNK_{item.label.length}]
                    </span>
                  </Link>
                ))}
              </div>

              <div className="px-5 py-2 border-t border-white/5 bg-black/20 flex justify-between items-center">
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-[#FF6B35] rounded-none animate-pulse" />
                  <span className="w-1 h-1 bg-[#FF6B35]/40 rounded-none" />
                </div>
                <span className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">
                  Secure_Access_Verified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- ACTIONS DROITE (burger à droite du logo sur mobile) --- */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Auth desktop désactivé pour l'instant
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 font-mono text-[10px] font-bold uppercase tracking-wider hover:border-emerald-400 transition-colors"
              >
                <FaTachometerAlt /> [ console ]
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white transition-colors text-xs"
                title="Déconnexion"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold uppercase text-[10px] tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors"
            >
              <FaSignInAlt className="text-xs" /> Espace Client
            </button>
          )}
        </div>
        */}

        <button
          type="button"
          className="md:hidden w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center text-white hover:border-[#FF6B35] transition-all duration-300 rounded-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ouvrir le menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  </div>

      {/* --- MENU MOBILE CONSOLE LAYER (STYLE BLUEPRINT) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '100%' }} 
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 h-screen w-full md:hidden z-[100] flex flex-col bg-[#0A1622]" 
          >
            {/* Header Mobile Menu - Console Log */}
            <div className="flex justify-between items-center px-6 h-20 border-b border-white/10 shrink-0 bg-[#0E243A]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#FF6B35] animate-pulse rounded-none" />
                <span className="font-mono text-[10px] font-black tracking-[0.3em] text-white">SYS_COMMAND: NAVIGATION</span>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] transition-all rounded-none"
              >
                <FaTimes />
              </button>
            </div>

            {/* Corps du menu mobile - Liste d'exécution */}
            <div className="flex-grow overflow-y-auto px-6 py-10 space-y-8">
              {navGroups.map((group, idx) => {
                const isGroupActive = activeMobileGroup === group.label;
                return (
                  <div key={group.label} className="space-y-4">
                    <button
                      type="button"
                      onClick={() => toggleMobileGroup(group.label)}
                      className="flex w-full items-center justify-between text-left border-b border-white/5 pb-2"
                    >
                      <h4 className="font-mono text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">
                        {idx + 1}.0_{group.label.replace(/\s+/g, '_')}
                      </h4>
                      <span className={`text-[#FF6B35] transition-transform duration-300 ${isGroupActive ? 'rotate-180' : ''}`}>
                        <FaChevronDown size={10} />
                      </span>
                    </button>

                    <AnimatePresence>
                      {isGroupActive && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="grid grid-cols-1 gap-3 overflow-hidden"
                        >
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={(e) => handleNavClick(item.href, e)}
                              className="flex items-center justify-between border border-white/5 bg-white/[0.02] p-4 text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 hover:border-[#FF6B35]/40 hover:text-white rounded-none transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <span className="text-[#FF6B35]">&gt;</span>
                                <span>{item.label}</span>
                              </div>
                              <span className="text-[9px] text-slate-600">[LINK]</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Pied de Menu - Actions Systèmes (MOUNT_USER_SPACE désactivé)
              <div className="pt-10 border-t border-white/10 space-y-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleNavClick('/dashboard')}
                      className="w-full flex items-center justify-center gap-3 p-5 border border-[#FF6B35]/30 bg-[#FF6B35]/5 font-mono text-[11px] font-black uppercase text-[#FF6B35] tracking-[0.2em] rounded-none shadow-lg"
                    >
                      <FaTachometerAlt /> EXEC_CONSOLE_ACCESS
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-3 p-5 border border-white/10 bg-white/5 font-mono text-[11px] font-bold uppercase text-red-500 tracking-[0.2em] rounded-none"
                    >
                      <FaSignOutAlt /> TERMINATE_SESSION
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavClick('/login')}
                    className="w-full flex items-center justify-center gap-4 p-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-none shadow-2xl hover:bg-[#FF6B35] hover:text-white transition-all"
                  >
                    <FaSignInAlt /> MOUNT_USER_SPACE
                  </button>
                )}
              </div>
              */}
            </div>

            {/* Terminal Footer Info */}
            <div className="p-6 bg-black/40 text-center">
               <p className="font-mono text-[8px] text-slate-600 tracking-[0.4em] uppercase">
                 IrBT v2.4.0 // Connection: Secured_TLS_1.3
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
