import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { 
  FaGithub, FaEye, FaGlobe, FaMobileAlt, 
  FaShoppingCart, FaStar, FaCode, FaLayerGroup 
} from 'react-icons/fa';

// Les données restent identiques, j'ai juste ajouté une icône par défaut si besoin
const portfolio = [
  {
    id: 1,
    title: 'TechInnov - Site Vitrine',
    titleEn: 'TechInnov - Showcase Website',
    image: 'https://unsplash.com',
    description: 'Refonte complète du site vitrine pour TechInnov avec design moderne, SEO optimisé et sécurité renforcée.',
    descriptionEn: 'Complete redesign of the showcase website for TechInnov with modern design, optimized SEO and enhanced security.',
    tags: ['React', 'SEO', 'UI/UX', 'Performance'],
    category: 'web',
    technologies: ['React', 'Tailwind CSS', 'Next.js', 'Vercel'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 2,
    title: 'EcomAfrica - E-commerce',
    titleEn: 'EcomAfrica - E-commerce Platform',
    image: '/images/projet2.png',
    description: "Développement d'une plateforme e-commerce sur-mesure avec paiement sécurisé et gestion des stocks.",
    descriptionEn: 'Development of a custom e-commerce platform with secure payment and inventory management.',
    tags: ['E-commerce', 'Sécurité', 'Node.js', 'MongoDB'],
    category: 'ecommerce',
    technologies: ['Node.js', 'MongoDB', 'Stripe', 'React'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 3,
    title: 'StartupX - App Mobile',
    titleEn: 'StartupX - Mobile App',
    image: '/images/projet3.jpg',
    description: 'Application mobile hybride pour StartupX avec notifications push et design responsive.',
    descriptionEn: 'Hybrid mobile application for StartupX with push notifications and responsive design.',
    tags: ['Mobile', 'React Native', 'UX', 'Firebase'],
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Expo', 'Node.js'],
    link: '#',
    github: '#',
    featured: false
  },
  {
    id: 4,
    title: 'DataFlow - Dashboard Analytics',
    titleEn: 'DataFlow - Analytics Dashboard',
    image: 'https://unsplash.com',
    description: 'Tableau de bord analytique en temps réel avec visualisations avancées et rapports automatisés.',
    descriptionEn: 'Real-time analytics dashboard with advanced visualizations and automated reports.',
    tags: ['Dashboard', 'Analytics', 'D3.js', 'API'],
    category: 'web',
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    link: '#',
    github: '#',
    featured: false
  },
  {
    id: 5,
    title: 'SecureBank - Application Bancaire',
    titleEn: 'SecureBank - Banking App',
    image: '/images/projet5.webp',
    description: 'Application bancaire sécurisée avec authentification biométrique et transactions en temps réel.',
    descriptionEn: 'Secure banking application with biometric authentication and real-time transactions.',
    tags: ['Sécurité', 'Fintech', 'API', 'Mobile'],
    category: 'mobile',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 6,
    title: 'EduLearn - Plateforme E-learning',
    titleEn: 'EduLearn - E-learning Platform',
    image: 'https://unsplash.com',
    description: 'Plateforme de formation en ligne avec cours interactifs, quiz et suivi de progression.',
    descriptionEn: 'Online learning platform with interactive courses, quizzes and progress tracking.',
    tags: ['E-learning', 'Video', 'Progression', 'API'],
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    link: '#',
    github: '#',
    featured: false
  }
];

const categories = [
  { id: 'all', label: 'Tous', labelEn: 'All', icon: <FaLayerGroup /> },
  { id: 'web', label: 'Web', labelEn: 'Web', icon: <FaGlobe /> },
  { id: 'mobile', label: 'Mobile', labelEn: 'Mobile', icon: <FaMobileAlt /> },
  { id: 'ecommerce', label: 'E-commerce', labelEn: 'E-commerce', icon: <FaShoppingCart /> }
];

function PortfolioSection() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = selectedCategory === 'all'
    ? portfolio
    : portfolio.filter(project => project.category === selectedCategory);

  return (
    <section className="py-20 px-6 transition-colors duration-300 relative" style={{ backgroundColor: 'var(--bg)' }} id="portfolio">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header avec icône animée */}
        <AnimatedSection variant="fadeIn" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', color: 'var(--accent-1)' }}
              whileHover={{ scale: 1.05 }}
            >
              <FaStar className="animate-pulse" />
              <span className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
                {isEnglish ? 'Our Work' : 'Mes Réalisations'}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">
                Portfolio
              </span>
            </h2>

            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg border transition-all hover:bg-[var(--accent-1)] hover:text-white"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            >
              {isEnglish ? '🇫🇷 Version Française' : '🇺🇸 English Version'}
            </button>
          </div>
        </AnimatedSection>

        {/* Filtres avec React-Icons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all border ${
                selectedCategory === cat.id ? 'bg-[var(--accent-1)] text-white border-transparent' : ''
              }`}
              style={{ 
                backgroundColor: selectedCategory === cat.id ? '' : 'var(--surface)',
                borderColor: 'var(--border-color)',
                color: selectedCategory === cat.id ? 'white' : 'var(--text-primary)'
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={selectedCategory === cat.id ? 'text-white' : 'text-[var(--accent-1)]'}>
                {cat.icon}
              </span>
              {isEnglish ? cat.labelEn : cat.label}
            </motion.button>
          ))}
        </div>

        {/* Grille de projets */}
        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group rounded-2xl border overflow-hidden transition-all hover:shadow-2xl"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}
              >
                {/* Image & Overlay Action */}
                <div className="relative h-52 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                    <a href={project.link} className="flex flex-col items-center text-white hover:text-[var(--accent-1)] transition-colors">
                      <FaEye className="text-3xl mb-1" />
                      <span className="text-[10px] font-bold uppercase">Démo</span>
                    </a>
                    <a href={project.github} className="flex flex-col items-center text-white hover:text-[var(--accent-1)] transition-colors">
                      <FaGithub className="text-3xl mb-1" />
                      <span className="text-[10px] font-bold uppercase">Code</span>
                    </a>
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCode className="text-[var(--accent-1)] text-sm" />
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {isEnglish ? project.titleEn : project.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" 
   style={{ color: 'var(--text-secondary)' }}>
  {isEnglish ? project.descriptionEn : project.description}
</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded border font-bold" 
                            style={{ borderColor: 'var(--border-color)', color: 'var(--accent-1)', backgroundColor: 'rgba(var(--accent-1-rgb), 0.1)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default PortfolioSection;
