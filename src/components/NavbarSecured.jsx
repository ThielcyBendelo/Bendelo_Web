import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, FaTimes, FaEnvelope, FaSignInAlt, FaSignOutAlt, 
  FaTachometerAlt, FaHome, FaTools, FaBriefcase, FaUser, 
  FaCode, FaChevronDown 
} from 'react-icons/fa';

import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import authService from '../services/authService';

export default function NavbarSecured() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
        { href: '/blog', label: 'Livres', icon: <FaBriefcase /> },
        { href: '/offers', label: 'Offres', icon: <FaBriefcase /> },
        { href: '/skills', label: 'Techniques', icon: <FaCode /> },
        { href: '/testimonials', label: 'Blog', icon: <FaCode /> },
      ],
    },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 shadow-lg py-2' 
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* --- BRANDING / LOGO TECHNIQUE --- */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            {/* Carré de Logo Brut Orthogonal */}
            <div className="w-10 h-10 border border-white bg-white text-black flex items-center justify-center transition-colors group-hover:bg-orange-500 group-hover:border-orange-500 duration-300">
              <span className="font-mono font-black text-sm">BT</span>
            </div>

            <div className="flex flex-col">
              <span 
                className="text-base font-bold uppercase tracking-wider text-white leading-none"
                style={{ fontFamily: "'Antonio', sans-serif" }}
              >
                Bendelo Thielcy<span className="text-orange-500">.</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-normal text-orange-500 block mt-1">
                // FullS-tack Software Engineer
              </span>
            </div>
          </div>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-8">
            {navGroups.map((group) => (
              <div key={group.label} className="relative group">
                <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-250 hover:text-orange-500 transition-colors">
                  {group.label} <FaChevronDown className="text-[8px] transition-transform duration-300 group-hover:rotate-180" />
                </button>
                
                {/* Menu déroulant style panneau d'administration */}
                <div className="absolute left-0 mt-3 min-w-[200px] border border-white/10 bg-slate-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 overflow-hidden">
                  {group.items.map((item) => (
                    <Link 
                      key={item.href} 
                      to={item.href} 
                      onClick={(e) => handleNavClick(item.href, e)}
                      className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hover:bg-white hover:text-black transition-colors duration-150"
                    >
                      <span className="text-slate-500 text-xs">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* --- ACCÈS ESPACE CLIENT CONNECTOR --- */}
          <div className="flex items-center gap-4">
            
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
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-colors"
                >
                  <FaSignInAlt className="text-xs" /> Espace Client
                </button>
              )}
            </div>

            {/* Mobile Toggle Burger */}
            <button 
              type="button"
              className="md:hidden p-2 text-xl text-slate-400 hover:text-white transition-colors" 
              onClick={() => setIsOpen(!isOpen)} 
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>
      </div>
      
      {/* --- MENU MOBILE CONSOLE LAYER --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 h-screen w-full md:hidden z-[100] flex flex-col bg-slate-950" 
          >
            {/* Header Mobile Menu */}
            <div className="flex justify-between items-center px-6 h-16 border-b border-white/10 shrink-0">
              <span className="font-mono text-[10px] font-bold tracking-widest text-slate-500">// CONTROL_PANEL</span>
              <button 
                type="button"
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white text-xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Corps du menu mobile */}
            <div className="flex-grow overflow-y-auto px-6 py-8 space-y-6">
              {navGroups.map((group) => {
                const isGroupActive = activeMobileGroup === group.label;
                return (
                  <div key={group.label} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                    <button
                      type="button"
                      onClick={() => toggleMobileGroup(group.label)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <h4 className="font-mono text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                        // {group.label}
                      </h4>
                      <span className={`text-slate-400 transition-transform duration-200 ${isGroupActive ? 'rotate-180' : ''}`}>
                        <FaChevronDown />
                      </span>
                    </button>

                    {isGroupActive && (
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={(e) => handleNavClick(item.href, e)}
                            className="flex items-center gap-4 rounded-xl border border-white/5 bg-slate-900/70 p-3 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:bg-white hover:text-black"
                          >
                            <span className="text-slate-500">{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bouton Espace Client Mobile */}
              <div className="pt-4 border-t border-white/10">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleNavClick('/dashboard')}
                      className="w-full flex items-center justify-center gap-2 p-4 border border-emerald-500/20 bg-emerald-500/5 font-mono text-[10px] font-bold uppercase text-emerald-400 tracking-wider"
                    >
                      <FaTachometerAlt /> Accéder à la Console
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 p-4 border border-white/10 bg-white/5 text-xs font-bold uppercase text-red-400 tracking-wider"
                    >
                      <FaSignOutAlt /> Déconnexion
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavClick('/login')}
                    className="w-full flex items-center justify-center gap-3 p-4 bg-white text-black font-bold uppercase text-xs tracking-widest"
                  >
                    <FaSignInAlt /> Espace Client
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
