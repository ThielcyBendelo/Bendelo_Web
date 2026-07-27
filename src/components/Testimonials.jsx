import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTerminal, FaBrain, FaLinkedin, FaWhatsapp, FaEnvelope, 
  FaSearch, FaClock, FaArrowRight, FaCode, FaBookOpen, FaShareAlt 
} from 'react-icons/fa';

// Structure de données initiale de vos articles (Tech & Éveil)
const initialArticles = [
  {
    id: "art-001",
    title: "Bâtir des architectures logicielles souveraines en Afrique : Les défis de la scalabilité",
    excerpt: "Analyse profonde des contraintes d'infrastructure cloud, de latence et de redondance pour les systèmes critiques opérant sur le continent.",
    category: "tech",
    readTime: "6 min read",
    date: "27 Juillet 2026",
    tags: ["Cloud Architecture", "AWS", "Souveraineté Numérique"],
    slug: "architectures-souveraines-afrique"
  },
  {
    id: "art-002",
    title: "Le Prompt Engineering comme levier d'accélération pour la jeunesse africaine",
    excerpt: "Comment l'optimisation contextuelle des LLMs (GPT-4, Claude) redéfinit l'apprentissage du code et brise les barrières d'accès à l'ingénierie.",
    category: "ai",
    readTime: "4 min read",
    date: "22 Juillet 2026",
    tags: ["Prompt Engineering", "IA", "Productivité"],
    slug: "prompt-engineering-jeunesse-africaine"
  },
  {
    id: "art-003",
    title: "Décolonisation mentale et leadership conscient : Restructurer son mindset d'entrepreneur",
    excerpt: "Manifeste pour une transformation intérieure profonde. Passer du statut de spectateur passif à celui d'architecte du changement.",
    category: "impact",
    readTime: "8 min read",
    date: "14 Juillet 2026",
    tags: ["Mindset", "Leadership Conscient", "Éveil"],
    slug: "decolonisation-mentale-leadership-conscient"
  }
];

const categories = [
  { id: 'all', label: 'Tous les écrits', icon: <FaCode /> },
  { id: 'tech', label: 'Ingénierie & Dev', icon: <FaTerminal /> },
  { id: 'ai', label: 'Intelligence Artificielle', icon: <FaBrain /> },
  { id: 'impact', label: 'Éveil & Leadership', icon: <FaBookOpen /> }
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filtrage combiné : Recherche textuelle + Onglets de catégories
  const filteredArticles = initialArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'all' || article.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Fonction de partage social automatisée (Génération d'URLs de partage propres)
  const handleShare = (platform, article) => {
    const articleUrl = encodeURIComponent(`${window.location.origin}/blog/${article.slug}`);
    const articleTitle = encodeURIComponent(article.title);
    
    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://linkedin.com{articleUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://whatsapp.com{articleTitle}%20${articleUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${articleTitle}&body=Découvrez cet article : %0D%0A${articleUrl}`;
        break;
      default:
        break;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-6 relative overflow-y-auto">
      {/* Grille structurelle d'arrière-plan */}
      <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto w-full border-x border-white/10 z-0">
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-12 pb-20">
        
        {/* --- 1. EN-TÊTE DU CENTRAL LOG --- */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] block">
            // Thought Leadership & Core Manifestos
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest text-xs">
            Publications & <span className="underline decoration-1 underline-offset-8 decoration-orange-500">Visions</span>
          </h1>
          <p className="text-sm text-slate-400 font-normal tracking-wide leading-relaxed">
            Partage d’expertises d'ingénierie logicielle, retours d'expérience sur l'intégration IA et architectures de pensée pour catalyser l'Afrique.
          </p>
        </div>

        {/* --- 2. BARRE DE COMMANDE: RECHERCHE & FILTRES --- */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Champ de recherche type invite de commande */}
          <div className="relative border border-white/10 bg-[#09090b] px-4 py-3 flex items-center gap-3">
            <FaSearch className="text-slate-500 text-xs shrink-0" />
            <span className="font-mono text-[11px] text-orange-500 select-none">&gt;_ grep</span>
            <input 
              type="text"
              placeholder="Rechercher une publication ou une stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-xs font-mono placeholder-slate-600 text-white"
            />
          </div>

          {/* Onglets de catégories orthogonaux */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {categories.map((cat) => {
              const isSelected = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-bold uppercase text-[9px] tracking-widest border transition-all duration-200 ${
                    isSelected 
                      ? 'bg-white text-black border-transparent' 
                      : 'bg-slate-50 dark:bg-[#09090b] border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-xs">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- 3. FLUX PRINCIPAL DES ARTICLES --- */}
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <motion.article
                  layout
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 border border-white/10 bg-[#09090b] hover:border-slate-400 dark:hover:border-white/20 transition-colors duration-300 flex flex-col justify-between gap-6 group"
                >
                  {/* Métadonnées supérieures */}
                  <div className="flex flex-wrap justify-between items-center gap-3 font-mono text-[9px] text-slate-500">
                    <div className="flex items-center gap-4">
                      <span>[{article.id}]</span>
                      <span>● {article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock /> <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Titre et extrait */}
                  <div className="space-y-3">
                    <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-white group-hover:text-orange-500 transition-colors duration-200 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal tracking-wide">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Section basse : Tags et Panneau de Partage Social */}
                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Tags Git-Style */}
                    <div className="flex flex-wrap gap-1.5 font-mono text-[8px] text-slate-400">
                      {article.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 border border-white/5 bg-white/5 uppercase">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Boutons de Partage pour vos Réseaux */}
                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="flex items-center gap-2 border border-white/5 bg-white/5 px-2 py-1 text-slate-500 font-mono text-[8px]">
                        <FaShareAlt /> <span>SHARE:</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button 
                          type="button"
                          onClick={() => handleShare('linkedin', article)}
                          className="w-7 h-7 border border-white/10 bg-white/5 flex items-center justify-center text-xs text-slate-400 hover:text-white hover:border-white transition-colors"
                          title="Partager sur LinkedIn">
                        <button 
                          type="button"
                          onClick={() => handleShare('whatsapp', article)}
                          className="w-7 h-7 border border-white/10 bg-white/5 flex items-center justify-center text-xs text-slate-400 hover:text-white hover:border-white transition-colors"
                          title="Partager sur WhatsApp"
                        >
                          <FaWhatsapp />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleShare('email', article)}
                          className="w-7 h-7 border border-white/10 bg-white/5 flex items-center justify-center text-xs text-slate-400 hover:text-white hover:border-white transition-colors"
                          title="Partager par Email"
                        >
                          <FaEnvelope />
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.article>
              ))
            ) : (
              /* État vide si aucune correspondance */
              <div className="p-12 border border-dashed border-white/10 text-center font-mono text-xs text-slate-500">
                [sys_log]: Aucun article ne correspond aux paramètres d'indexation grep.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* --- PIED DE LOG SYSTEM --- */}
        <div className="text-center font-mono text-[9px] text-slate-600">
          <p>central_feed_status: updated • sync_frequency: manual</p>
        </div>

      </div>
    </div>
  );
}
