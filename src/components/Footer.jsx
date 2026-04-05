import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Liste des liens regroupés pour une meilleure lecture
  const links = [
    { name: "Accueil", path: "/home" },
    { name: "Services", path: "/services" },
    { name: "Projets", path: "/projects" },
    { name: "Expériences", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const secondaryLinks = [
    { name: "À propos", path: "/about" },
    { name: "Témoignages", path: "/testimonials" },
    { name: "Offres", path: "/offers" },
    { name: "Compétences", path: "/skills" },
  ];

  return (
    <footer className="border-t transition-colors duration-300" 
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Colonne 1 : Branding */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">BF</span>
              </div>
              <span className="text-xl font-bold tracking-wide" style={{ color: 'var(--text-primary)', fontFamily: 'Antonio, sans-serif' }}>
                Bendelo<span className="text-[var(--accent-2)]">.Free</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Ingénieur Logiciel Full stack Freelance. Expert en développement web, cloud et design UX/UI.
            </p>
          </div>

          {/* Colonne 2 : Liens Principaux */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Navigation</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:translate-x-1 inline-block transition-all hover:text-[var(--accent-1)]" style={{ color: 'var(--text-secondary)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Autres liens */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Découvrir</h4>
            <ul className="space-y-2">
              {secondaryLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:translate-x-1 inline-block transition-all hover:text-[var(--accent-1)]" style={{ color: 'var(--text-secondary)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Social & Contact */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Me suivre</h4>
            <div className="flex space-x-4">
              <a href="mailto:votre@email.com" className="text-2xl transition-transform hover:scale-125 hover:text-[var(--accent-1)]" style={{ color: 'var(--text-secondary)' }}><FaEnvelope /></a>
              <a href="#" className="text-2xl transition-transform hover:scale-125 hover:text-[var(--accent-1)]" style={{ color: 'var(--text-secondary)' }}><FaLinkedin /></a>
              <a href="#" className="text-2xl transition-transform hover:scale-125 hover:text-[var(--accent-1)]" style={{ color: 'var(--text-secondary)' }}><FaGithub /></a>
              <a href="#" className="text-2xl transition-transform hover:scale-125 hover:text-[var(--accent-1)]" style={{ color: 'var(--text-secondary)' }}><FaWhatsapp /></a>
            </div>
            <div className="mt-6 text-right hidden md:block">
              <span className="text-xs font-mono px-3 py-1 rounded-full border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                Disponible pour nouveaux projets
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t text-center md:flex md:justify-between md:text-left" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            © {currentYear} Bendelo Freelance | Software Engineer. Tous droits réservés.
          </p>
          <div className="mt-2 md:mt-0">
            <p className="text-xs italic" style={{ color: 'var(--text-secondary)' }}>
              Propulsé par la passion et le code.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
