import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { 
  FaGithub, FaEye, FaGlobe, FaMobileAlt, 
  FaShoppingCart, FaStar, FaCode, FaLayerGroup 
} from 'react-icons/fa';

const portfolio = [
  {
    id: 1,
    title: 'TechInnov - Site Vitrine',
    titleEn: 'TechInnov - Showcase Website',
    image: '/images/projet1.jpg',
    description: 'Refonte complète du site vitrine pour TechInnov avec design moderne, SEO optimisé et sécurité renforcée.',
    descriptionEn: 'Complete redesign of the showcase website for TechInnov with modern design, optimized SEO and enhanced security.',
    tags: ['React', 'SEO', 'UI/UX', 'Performance'],
    category: 'web',
    technologies: ['React', 'Tailwind CSS', 'Next.js', 'Vercel'],
    link: '',
    github: '',
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
    link: '',
    github: '',
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
    link: '',
    github: '',
    featured: false
  },
  {
    id: 4,
    title: 'DataFlow - Dashboard Analytics',
    titleEn: 'DataFlow - Analytics Dashboard',
    image: '/images/projet4.jpg',
    description: 'Tableau de bord analytique en temps réel avec visualisations avancées et rapports automatisés.',
    descriptionEn: 'Real-time analytics dashboard with advanced visualizations and automated reports.',
    tags: ['Dashboard', 'Analytics', 'D3.js', 'API'],
    category: 'web',
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    link: '',
    github: '',
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
    link: '',
    github: '',
    featured: true
  },
  {
    id: 6,
    title: 'EduLearn - Plateforme E-learning',
    titleEn: 'EduLearn - E-learning Platform',
    image: '/images/projet6.jpg',
    description: 'Plateforme de formation en ligne avec cours interactifs, quiz et suivi de progression.',
    descriptionEn: 'Online learning platform with interactive courses, quizzes and progress tracking.',
    tags: ['E-learning', 'Video', 'Progression', 'API'],
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    link: '',
    github: '',
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
    <section className="py-24 px-6 border-t border-slate-200 dark:border-white/10" style={{ backgroundColor: 'var(--bg)' }} id="portfolio">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- EN-TÊTE DE SECTION --- */}
        <AnimatedSection variant="fadeIn" delay={0.2}>
          <div className="text-center mb-16">
            <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
              {isEnglish ? 'Selected Works' : 'Mes Réalisations'}
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-8 tracking-widest uppercase text-xs">
              Portfo<span className="underline decoration-1 underline-offset-8">lio</span>
            </h2>

            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={() => setIsEnglish(!isEnglish)}
                className="text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5 hover:border-slate-400 dark:hover:border-white/30 transition-colors duration-200"
              >
                {isEnglish ? '[ FR ] switch' : '[ EN ] switch'}
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* --- FILTRES --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 font-bold uppercase text-[10px] tracking-widest border transition-all duration-200 ${
                  isSelected 
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-black border-transparent' 
                    : 'bg-slate-50 dark:bg-[#09090b] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30'
                }`}
              >
                <span className={isSelected ? 'text-white dark:text-black' : 'text-slate-400 dark:text-slate-500'}>
                  {cat.icon}
                </span>
                {isEnglish ? cat.labelEn : cat.label}
              </button>
            );
          })}
        </div>

        {/* --- GRILLE ET CARTES --- */}
        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.99 }}
                className="group relative border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-all duration-300 hover:border-slate-400 dark:hover:border-white/30 flex flex-col h-full"
              >
                {/* Média / Image */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-slate-200 dark:border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500 bg-slate-200 dark:bg-neutral-900">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <FaCode className="text-3xl" />
                    </div>
                  )}

                  {/* Actions au survol */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 bg-white text-black hover:bg-slate-200 transition-colors"
                        title="Voir le site"
                      >
                        <FaEye className="text-base" />
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 border border-white text-white hover:bg-white hover:text-black transition-colors"
                        title="Code Source"
                      >
                        <FaGithub className="text-base" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {project.featured && (
                    <span className="text-[8px] font-mono font-black uppercase tracking-widest text-orange-500 block mb-2">
                      {"// [ core_project ]"}
                    </span>
                  )}

                  <h3 className="text-base font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-3">
                    {isEnglish ? project.titleEn : project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-normal tracking-wide mb-6">
                    {isEnglish ? project.descriptionEn : project.description}
                  </p>

                  {/* Liste des technologies */}
                  <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-1.5 font-mono text-[9px] text-slate-500 dark:text-slate-400">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-200/50 dark:bg-white/5 border border-slate-300/30 dark:border-white/5">
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
