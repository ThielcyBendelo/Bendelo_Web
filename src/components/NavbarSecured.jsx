import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiEagleEmblem } from 'react-icons/gi';
import { FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import analyticsService from '../services/analyticsService';
import authService from '../services/authService';

export default function NavbarSecured() { 
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
        return 'dark';
    } catch {
      // ignore errors (e.g., SSR or private mode)
    }
    return 'light';
  });
  // Log après tous les hooks
  console.log('[NavbarSecured] Render:', { isAuthenticated, currentUser });
  useEffect(() => {
    // Initialiser la session automatiquement au chargement
    authService.initialize().then(() => {
      const loggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      setIsAuthenticated(loggedIn);
      setCurrentUser(user);
      console.log('[NavbarSecured] INIT:', { loggedIn, user });
    });

    // Écouter les changements d'authentification
    const interval = setInterval(() => {
      const loggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      setIsAuthenticated(loggedIn);
      setCurrentUser(user);
      console.log('[NavbarSecured] INTERVAL:', { loggedIn, user });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch {
      // ignore write errors
    }
  }, [theme]);



  

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    audioService.playClick();
    analyticsService.trackEvent('mobile_menu_toggle', {
      isOpen: newState,
      category: 'navigation',
    });
  };

  const handleLogin = () => {
    navigate('/login');
    setIsOpen(false);
    audioService.playNavigate();
  };

  const handleRegister = () => {
    navigate('/register');
    setIsOpen(false);
    audioService.playNavigate();
  };

  const handleDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
      setIsOpen(false);
      audioService.playNavigate();
      notificationService.info('Redirection vers votre tableau de bord...', {
        autoClose: 2000,
      });
    } else {
      notificationService.warning(
        '🔐 Veuillez vous connecter pour accéder au dashboard',
        {
          autoClose: 3000,
        }
      );
      navigate('/login');
    }
  };

  

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setCurrentUser(null);
      setShowUserMenu(false);
      setIsOpen(false);
      notificationService.success('✓ Déconnexion réussie', { autoClose: 2000 });
      navigate('/');
      audioService.playSuccess();
    } catch {
      notificationService.error('Erreur lors de la déconnexion', {
        autoClose: 3000,
      });
    }
  };

  // ...existing code...
  const handleNavClick = (section, e) => {
    e.preventDefault();
    if (isOpen) setIsOpen(false);
    audioService.playNavigate();
    analyticsService.trackEvent('navigation_click', {
      section,
      category: 'navigation',
    });
    if (section.startsWith('/')) {
      navigate(section);
    }
  };

  // Navigation items
  // Structure professionnelle avec sous-menus
  const navGroups = [
    {
      label: 'À propos de moi',
      items: [
        { href: '/', label: 'Accueil'},
        { href: '/about', label: 'À propos de moi'},
         { href: '/skills', label: 'Compétences' },
        { href: '/experience', label: 'Expérience' },
      ],
    },
    {
      label: 'Mes Services',
      items: [
        { href: '/services', label: 'Services' },
        { href: '/work', label: 'Travail' },
        { href: '/offers', label: 'Offres'}, 
      ],
    },
{
  
      items: [
        { href: '/testimonials', label: 'Témoignages clients'},
      ],
    },

  ];

  return (
    <>
      
      <nav className="fixed top-4 left-4 right-4 bg-dark-90/100 backdrop-blur-yellow-600 z-50 border-b border-yellow-500 via-orange-500 to-red-500 ">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                navigate('/');
                setIsOpen(false);
              }}
            >
              <GiEagleEmblem className="text-5xl text-yellow-500 via-orange-500 to-red-500 text-transparent" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">
                Bendelo.Free
              </span>
            </div>
            {/* Desktop Navigation avec sous-menus */}
            <div className="hidden md:flex md:items-center gap-6">
              {navGroups.map((group) => (
                <div key={group.label} className="relative group">
                  <button
                    className="text-gray-300 hover:text-yellow-500 via-orange-500 to-red-500 font-semibold text-sm px-3 py-2 rounded-lg bg-transparent group-hover:bg-dark-300 transition-colors"
                    style={{
                      cursor: group.items.length > 1 ? 'pointer' : 'default',
                    }}
                  >
                    {group.label}
                  </button>
                  {group.items.length > 1 && (
                    <div className="absolute left-0 mt-2 min-w-[180px] bg-dark-300 border border-gray-700 rounded-xl shadow-2xl z-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300">
                      {group.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => handleNavClick(item.href, e)}
                          className="flex items-center gap-2 px-5 py-3 text-gray-400 hover:text-yellow-500 via-orange-500 to-red-500 hover:bg-purple/20 text-base rounded-xl transition-all duration-200 font-medium group-hover:scale-105"
                        >
                          <span className="text-lg">{item.icon}</span> {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                  {group.items.length === 1 && (
                    <a
                      href={group.items[0].href}
                      onClick={(e) => handleNavClick(group.items[0].href, e)}
                      className="text-gray-300 hover:text-white text-sm px-3 py-2 rounded-lg transition-colors"
                    >
                      {group.items[0].icon} {group.items[0].label}
                    </a>
                  )}
                </div>
              ))}
              {/* Bouton Clients visible uniquement pour admin */}
              {isAuthenticated && currentUser?.role === 'admin' && (
                <button
                  type="button"
                  onClick={() => navigate('/clients')}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-semibold px-3 py-1 rounded-lg border border-purple-500/40 bg-purple-500/10 ml-2"
                >
                  Clients
                </button>
              )}
            </div>
            
              {/* Theme toggle */}
             
              {/* Dashboard Button (Secure) */}
              {isAuthenticated && (
                <button
                  onClick={handleDashboard}
                  onMouseEnter={() => audioService.playHover()}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple to-pink text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all text-sm font-semibold"
                  title="Accéder au tableau de bord"
                >
                  <FaTachometerAlt className="h-4 w-4" />
                  Dashboard
                </button>
              )}
              {/* User Menu or Login Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    onMouseEnter={() => audioService.playHover()}
                    className="flex items-center gap-2 px-3 py-2 bg-dark-200 border border-gray-600/50 rounded-lg hover:bg-dark-300 transition-colors text-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple to-pink flex items-center justify-center text-white text-xs font-bold">
                      {currentUser?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:inline text-gray-300">
                      {currentUser?.email?.split('@')[0] || 'User'}
                    </span>
                  </button>
                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-300 border border-gray-600/50 rounded-lg shadow-lg overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-gray-600/30">
                        <p className="text-sm text-gray-300">
                          Connecté en tant que
                        </p>
                        <p className="text-sm font-semibold text-white truncate">
                          {currentUser?.email}
                        </p>
                      </div>
                      <button
                        onClick={handleDashboard}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-dark-200 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <FaTachometerAlt className="h-4 w-4" />
                        Mon Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-dark-200 transition-colors flex items-center gap-2 border-t border-gray-600/30"
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={handleLogin}
                    onMouseEnter={() => audioService.playHover()}
                    className="flex items-center gap-2 px-3 py-2 text-gray-300 border-gray-600/50 rounded-lg hover:text-yellow-400 via-orange-500 to-red-500 hover:border-purple/50 transition-colors text-sm"
                  >
                    <FaSignInAlt className="h-4 w-4" />
                    Connexion
                  </button>
                  <button
                    onClick={handleRegister}
                    onMouseEnter={() => audioService.playHover()}
                    className="px-4 py-2 bg-gradient-to-r from-purple to-pink text-gray-300 border-gray-600/50 rounded-lg hover:text-yellow-400 via-orange-500 to-red-500 hover:border-purple/50 transition-colors text-sm"
                  >
                    S'inscrire
                  </button>
                </div>
              )}
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                onMouseEnter={() => audioService.playHover()}
                className="md:hidden p-6 rounded-md text-yellow-500 hover:text-white"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 26 26"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        
        {/* Mobile menu avec sous-menus professionnels */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-br from-gray-400 via-purple-900 to-gray-800/95 backdrop-blur border-t border-gray-700/30">
            <div className="px-2 pt-2 pb-3 space-y-2">
              {navGroups.map((group) => (
                <div key={group.label} className="mb-4">
                  <div className="font-bold text-yellow-500 text-base mb-1 pl-2">{group.label}</div>
                  {group.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className="flex items-center gap-2 px-4 py-3 text-white hover:text-yellow-500 hover:bg-purple/40 text-base rounded-xl transition-all duration-200 font-medium"
                    >
                      <span className="text-lg">{item.icon}</span> {item.label}
                    </a>
                  ))}
                </div>
              ))}
              <div className="border-t border-gray-700/30 pt-2 mt-2">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={handleDashboard}
                      className="w-full text-left px-4 py-3 text-purple hover:bg-dark-300 rounded-xl text-base font-semibold transition-colors flex items-center gap-2"
                    >
                      <FaTachometerAlt className="h-4 w-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-dark-300 rounded-xl text-base font-semibold transition-colors flex items-center gap-2"
                    >
                      <FaSignOutAlt className="h-4 w-4" />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogin}
                      className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-300 rounded-xl text-base transition-colors flex items-center gap-2"
                    >
                      <FaSignInAlt className="h-4 w-4" />
                      Connexion
                    </button>
                    <button
                      onClick={handleRegister}
                      className="w-full text-left px-4 py-3 text-purple hover:bg-dark-300 rounded-xl text-base font-semibold transition-colors"
                    >
                      S'inscrire
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
