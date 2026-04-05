import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Un seul bloc d'importation sans doublons
import { 
  FaBars, FaTimes, FaSun, FaMoon, FaEnvelope, 
  FaSignInAlt, FaSignOutAlt, FaTachometerAlt,
  FaHome, FaTools, FaBriefcase, FaUser, FaCode, FaChevronDown,  FaLayerGroup  
} from 'react-icons/fa';

import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import analyticsService from '../services/analyticsService';
import authService from '../services/authService';

export default function NavbarSecured() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(audioService.isEnabled());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch { return 'light'; }
    return 'light';
  });

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    audioService.playClick();
    notificationService.info(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`, { icon: newTheme === 'dark' ? '🌙' : '☀️' });
  };

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

  const [activeGroup, setActiveGroup] = useState(null); // Pour gérer l'ouverture des catégories mobiles


  const navGroups = [
    {
      label: 'Navigation',
      items: [
        { href: '/', label: 'Accueil', icon: <FaHome /> },
        { href: '/services', label: 'Services', icon: <FaTools /> },
        { href: '/projects', label: 'Projets', icon: <FaBriefcase /> },
        { href: '/experience', label: 'Expérience', icon: <FaBriefcase /> },
        { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
      ],
    },
    {
      label: 'Découvrir',
      items: [
        { href: '/about', label: 'À propos de moi', icon: <FaUser /> },
        { href: '/testimonials', label: 'Témoignages', icon: <FaUser /> },
        { href: '/offers', label: 'Offres', icon: <FaBriefcase /> },
        { href: '/skills', label: 'Compétences', icon: <FaCode /> },
      ],
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 backdrop-blur-md z-50 border-b transition-all duration-300"
         style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text"
                  style={{ fontFamily: "'Antonio', sans-serif" }}>
              Mon Portfolio<span className="opacity-10"></span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navGroups.map((group) => (
              <div key={group.label} className="relative group">
                <button className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider transition-colors hover:text-[var(--accent-1)]"
                        style={{ color: 'var(--text-primary)' }}>
                  {group.label} <FaChevronDown className="text-[10px] group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 mt-2 min-w-[200px] rounded-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 overflow-hidden shadow-2xl"
                     style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}>
                  {group.items.map((item) => (
                    <Link key={item.href} to={item.href} onClick={(e) => handleNavClick(item.href, e)}
                          className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-[var(--accent-1)] hover:text-white transition-colors"
                          style={{ color: 'var(--text-secondary)' }}>
                      {item.icon} {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex items-center gap-4 pl-4 border-l" style={{ borderColor: 'var(--border-color)' }}>
              <button onClick={toggleTheme} className="p-2 rounded-xl transition-colors hover:bg-[var(--bg)]" style={{ color: 'var(--text-primary)' }}>
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => navigate('/dashboard')} className="p-2 text-[var(--accent-1)] hover:scale-110 transition-transform">
                    <FaTachometerAlt />
                  </button>
                  <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:opacity-80">
                    <FaSignOutAlt className="inline mr-1" /> Quitter
                  </button>
                </div>
              ) : (
                <button onClick={() => navigate('/login')} className="text-sm font-bold text-[var(--accent-1)] hover:opacity-80">
                  <FaSignInAlt className="inline mr-1" /> Connexion
                </button>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)} style={{ color: 'var(--text-primary)' }}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

     {/* Mobile Menu avec Catégories Filtrées */}
    <AnimatePresence>
    {isOpen && (
    <motion.div 
      initial={{ x: '100%' }} 
      animate={{ x: 0 }} 
      exit={{ x: '100%' }} 
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      // C'est ici qu'on définit la hauteur totale (h-screen)
      className="fixed inset-0 h-screen w-full md:hidden z-[100] flex flex-col" 
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Header fixe */}
      <div className="flex justify-between items-center px-6 h-16 border-b shrink-0" style={{ borderColor: 'var(--border-color)' }}>
        <span className="font-bold text-[var(--accent-1)]">MENU PRINCIPAL</span>
        <button onClick={() => setIsOpen(false)} className="text-2xl" style={{ color: 'var(--text-primary)' }}>
          <FaTimes />
        </button>
      </div>

      {/* Contenu défilant */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="space-y-4">
          {navGroups.map((group) => (
            <div key={group.label} className="border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
              <button 
                onClick={() => setActiveGroup(activeGroup === group.label ? null : group.label)}
                className="flex items-center justify-between w-full py-3 text-lg font-bold uppercase"
                style={{ color: 'var(--text-primary)' }}
              >
                <span className="flex items-center gap-3">
                  <FaLayerGroup className="text-[var(--accent-1)]" /> {group.label}
                </span>
                <FaChevronDown className={`transition-transform duration-300 ${activeGroup === group.label ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeGroup === group.label && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4"
                  >
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={(e) => {
                          handleNavClick(item.href, e);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-4 py-4 text-base transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span className="text-[var(--accent-1)]">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Pied du menu mobile */}
        <div className="pt-10 pb-10 flex flex-col gap-4">
          <button onClick={toggleTheme} className="flex items-center gap-3 py-3 font-bold" style={{ color: 'var(--text-primary)' }}>
            {theme === 'dark' ? <><FaSun className="text-yellow-400" /> Mode Clair</> : <><FaMoon className="text-blue-400" /> Mode Sombre</>}
          </button>

          {!isAuthenticated ? (
            <button onClick={() => { navigate('/login'); setIsOpen(false); }} className="flex items-center gap-3 py-3 font-bold text-[var(--accent-1)]">
              <FaSignInAlt /> Connexion
            </button>
          ) : (
            <>
              <button onClick={() => { navigate('/dashboard'); setIsOpen(false); }} className="flex items-center gap-3 py-3 font-bold text-[var(--accent-1)]">
                <FaTachometerAlt /> Dashboard
              </button>
              <button onClick={handleLogout} className="flex items-center gap-3 py-3 font-bold text-red-500">
                <FaSignOutAlt /> Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </nav>
  );
}
