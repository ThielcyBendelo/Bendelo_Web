import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaUserEdit,
  FaArrowRight,
  FaSearch,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaTag,
  FaShareAlt,
  FaExternalLinkAlt,
  FaRss,
} from 'react-icons/fa';
import GoogleAnalyticsTracker from '../components/Analytics';
import { book1, book2, book3, book4, book5, book6, contact } from '../assets/assets.js';

// ---------------------------------------------------------------------------
// Contenu éditorial — prêt pour de vraies publications
// Ajoutez vos articles ici (ou branchez plus tard un CMS / Firebase).
// ---------------------------------------------------------------------------
const posts = [
  {
    id: 1,
    slug: 'reveil-du-lion-africain',
    title: 'Le Réveil du Lion Africain',
    excerpt:
      'Exploration des clés de la souveraineté mentale et technologique pour la jeunesse africaine. Un manifeste pour passer de la dépendance à la création.',
    content:
      "Ce manifeste relie conscience, discipline et maîtrise technologique. L'objectif : armer une génération capable de bâtir des systèmes solides et une vision souveraine.",
    date: '2025-03-12',
    dateLabel: '12 mars 2025',
    author: 'Ir Bendelo Thielcy',
    image: book1,
    category: 'Éveil & Impact',
    type: 'Ouvrage',
    readTime: '8 min',
    tags: ['Afrique', 'Mindset', 'Souveraineté'],
    featured: true,
    status: 'published',
    externalUrl: '',
  },
  {
    id: 2,
    slug: 'optimisation-ecosysteme-esnas',
    title: "Optimisation de l'écosystème ESNAs",
    excerpt:
      "Analyse des choix d'architecture entre React et Vite pour des systèmes d'assurance critiques : performance, maintenabilité et scalabilité.",
    content:
      "Retour d'expérience d'ingénierie sur des choix front-end pour des plateformes métier sensibles. Focus DX, bundle, CI et qualité de code.",
    date: '2025-07-08',
    dateLabel: '8 juillet 2025',
    author: 'Ingénierie Logicielle',
    image: book2,
    category: 'Technologie',
    type: 'Article',
    readTime: '11 min',
    tags: ['React', 'Vite', 'Architecture'],
    featured: false,
    status: 'published',
    externalUrl: '',
  },
  {
    id: 3,
    slug: 'voix-de-la-resilience',
    title: 'La Voix de la Résilience',
    excerpt:
      "Comment forger un mindset d'acier face aux défis de l'entrepreneuriat numérique, sans perdre l'éthique ni la clarté de vision.",
    content:
      "Entre pression opérationnelle et ambition long terme, la résilience devient une compétence d'ingénierie personnelle autant que professionnelle.",
    date: '2025-02-20',
    dateLabel: '20 février 2025',
    author: 'Ir Bendelo Thielcy',
    image: book3,
    category: 'Éveil & Impact',
    type: 'Ouvrage',
    readTime: '7 min',
    tags: ['Résilience', 'Leadership', 'Entrepreneuriat'],
    featured: false,
    status: 'published',
    externalUrl: '',
  },
  {
    id: 4,
    slug: 'lignee-de-feu-leadership-ethique',
    title: 'Lignée de Feu : Leadership Éthique',
    excerpt:
      'Déconstruire les barrières mentales pour activer une productivité africaine à fort impact — avec exigence, clarté et responsabilité.',
    content:
      "Le leadership éthique n'est pas un slogan : c'est une architecture de décisions, de standards et d'exemple.",
    date: '2025-01-15',
    dateLabel: '15 janvier 2025',
    author: 'Auteur & Coach',
    image: book4,
    category: 'Éveil & Impact',
    type: 'Ouvrage',
    readTime: '9 min',
    tags: ['Leadership', 'Éthique', 'Impact'],
    featured: false,
    status: 'published',
    externalUrl: '',
  },
  {
    id: 5,
    slug: 'ingenierie-full-stack-production',
    title: 'Ingénierie Full-Stack en Production',
    excerpt:
      'Patterns concrets pour livrer des applications robustes : API, sécurité, observabilité et boucles de feedback produit.',
    content:
      'Guide pratique pour passer du prototype au système fiable en conditions réelles.',
    date: '2025-09-01',
    dateLabel: '1 sept. 2025',
    author: 'Ir Bendelo Thielcy',
    image: book5,
    category: 'Ingénierie',
    type: 'Article',
    readTime: '12 min',
    tags: ['Full-Stack', 'DevOps', 'Sécurité'],
    featured: false,
    status: 'published',
    externalUrl: '',
  },
  {
    id: 6,
    slug: 'prochaine-publication',
    title: 'Prochaine publication — bientôt',
    excerpt:
      'Un nouvel article est en préparation. Suivez les réseaux pour être notifié dès la mise en ligne.',
    content: '',
    date: '2026-08-01',
    dateLabel: 'À venir',
    author: 'Ir Bendelo Thielcy',
    image: book6,
    category: 'Technologie',
    type: 'Brouillon',
    readTime: '—',
    tags: ['Coming soon'],
    featured: false,
    status: 'draft',
    externalUrl: '',
  },
];

const CATEGORIES = ['Tous', 'Technologie', 'Éveil & Impact', 'Ingénierie'];

const socialFromContact = () => {
  const map = Object.fromEntries(
    (contact || []).map((c) => [String(c.label).toLowerCase(), c.link])
  );
  return [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: map.linkedin || 'https://linkedin.com/in/ir-thielcy-bendelo-b1101233a',
      icon: FaLinkedin,
      color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/50',
    },
    {
      id: 'github',
      label: 'GitHub',
      href: map.github || 'https://github.com/ThielcyBendelo',
      icon: FaGithub,
      color: 'hover:text-white hover:border-white/40',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: map.instagram || 'https://instagram.com/@THIELCY_EL_BENDELO2',
      icon: FaInstagram,
      color: 'hover:text-pink-400 hover:border-pink-400/50',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: map.facebook || 'https://facebook.com/chelsea.yaballon',
      icon: FaFacebook,
      color: 'hover:text-[#1877F2] hover:border-[#1877F2]/50',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: map.whatsapp || 'https://wa.me/243829054350',
      icon: FaWhatsapp,
      color: 'hover:text-[#25D366] hover:border-[#25D366]/50',
    },
    {
      id: 'email',
      label: 'Email',
      href: `mailto:${map.email || 'bendelothielcy@gmail.com'}`,
      icon: FaEnvelope,
      color: 'hover:text-[#FF6B35] hover:border-[#FF6B35]/50',
    },
  ];
};

function shareLinks(post) {
  const url = encodeURIComponent(
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog#${post.slug}`
      : `https://bendelo.dev/blog#${post.slug}`
  );
  const text = encodeURIComponent(`${post.title} — Ir Bendelo Thielcy`);
  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
  };
}

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const socials = useMemo(() => socialFromContact(), []);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((post) => {
        const catOk = activeFilter === 'Tous' || post.category === activeFilter;
        if (!catOk) return false;
        if (!q) return true;
        const hay = [
          post.title,
          post.excerpt,
          post.author,
          post.category,
          post.type,
          ...(post.tags || []),
        ]
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }, [activeFilter, query]);

  const featured =
    filteredPosts.find((p) => p.featured && p.status === 'published') ||
    filteredPosts.find((p) => p.status === 'published') ||
    null;

  const gridPosts = featured
    ? filteredPosts.filter((p) => p.id !== featured.id)
    : filteredPosts;

  const openPost = (post) => {
    if (post.status === 'draft') return;
    if (post.externalUrl) {
      window.open(post.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelected(post);
  };

  return (
    <section
      className="pt-28 pb-24 px-6 relative overflow-hidden bg-[#0A1622] min-h-screen"
      id="blog"
    >
      <GoogleAnalyticsTracker />

      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '45px 45px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14 max-w-4xl mx-auto">
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            // journal_technique_&_impact
          </span>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-5 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            BLOG <span className="text-[#FF6B35] italic">&amp; OUVRAGES</span>
            <span className="text-[#FF6B35]">.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Architecture logicielle, leadership et éveil — des notes de terrain pour
            bâtir des systèmes solides et une vision africaine ambitieuse.
          </p>
        </div>

        {/* Social strip */}
        <div className="mb-12 border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border border-[#FF6B35]/40 bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center">
                <FaRss className="text-sm" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6B35] mb-1">
                  // follow_the_signal
                </p>
                <h2 className="text-white font-bold uppercase tracking-wider text-sm sm:text-base">
                  Suivez les publications en direct
                </h2>
                <p className="text-slate-400 text-xs mt-1 max-w-xl">
                  Chaque nouvel article sera relayé sur ces réseaux. Activez les
                  notifications pour ne rien manquer.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target={s.id === 'email' ? undefined : '_blank'}
                    rel={s.id === 'email' ? undefined : 'noopener noreferrer'}
                    className={`inline-flex items-center gap-2 px-3.5 py-2.5 border border-white/10 bg-black/20 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${s.color}`}
                    aria-label={s.label}
                  >
                    <Icon className="text-sm" />
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
          <div className="relative flex-1 max-w-xl">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF6B35] text-xs" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un article, tag, auteur..."
              className="w-full pl-11 pr-4 py-3.5 border border-white/10 bg-white/5 text-sm text-white font-mono rounded-none outline-none focus:border-[#FF6B35] placeholder:text-slate-600"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-3 font-mono font-bold uppercase text-[10px] tracking-widest transition-all duration-300 rounded-none border ${
                  activeFilter === cat
                    ? 'bg-white text-black border-transparent shadow-xl'
                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-[#FF6B35]/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        {featured && (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 grid lg:grid-cols-12 border border-white/10 bg-white/[0.02] overflow-hidden group"
          >
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[360px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1622] via-transparent to-transparent opacity-80" />
              <span className="absolute top-4 left-4 bg-[#FF6B35] text-white px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest">
                Featured · {featured.type}
              </span>
            </div>
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                <span className="inline-flex items-center gap-1.5 text-[#FF6B35]">
                  <FaTag /> {featured.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FaCalendarAlt className="text-[#FF6B35]" /> {featured.dateLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FaClock className="text-[#FF6B35]" /> {featured.readTime}
                </span>
              </div>
              <h2
                className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4 leading-none group-hover:text-[#FF6B35] transition-colors"
                style={{ fontFamily: "'Antonio', sans-serif" }}
              >
                {featured.title}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openPost(featured)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors"
                >
                  Lire l&apos;article <FaArrowRight className="text-[10px]" />
                </button>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest inline-flex items-center gap-2">
                  <FaUserEdit className="text-[#FF6B35]" /> {featured.author}
                </span>
              </div>
            </div>
          </motion.article>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {gridPosts.map((post) => {
              const isDraft = post.status === 'draft';
              return (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  whileHover={isDraft ? undefined : { y: -8 }}
                  id={post.slug}
                  className={`group relative flex flex-col bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-none overflow-hidden shadow-2xl transition-all duration-500 ${
                    isDraft
                      ? 'opacity-80'
                      : 'hover:border-[#FF6B35]/40 cursor-pointer'
                  }`}
                  onClick={() => openPost(post)}
                >
                  <div className="relative h-56 overflow-hidden border-b border-white/10 bg-neutral-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isDraft
                          ? 'grayscale opacity-60'
                          : 'grayscale group-hover:grayscale-0 group-hover:scale-105'
                      }`}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest">
                        {post.type}
                      </span>
                      {isDraft && (
                        <span className="bg-black/70 border border-white/20 text-slate-200 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">
                          Soon
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-7 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-[9px] font-mono text-slate-500 uppercase mb-4 tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-[#FF6B35]" /> {post.dateLabel}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaClock className="text-[#FF6B35]" /> {post.readTime}
                        </span>
                      </div>
                      <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF6B35] mb-2">
                        {post.category}
                      </p>
                      <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-3 leading-tight group-hover:text-[#FF6B35] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(post.tags || []).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 border border-white/10 text-slate-500"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#FF6B35] font-bold tracking-widest">
                        {isDraft ? '> WAITLIST' : '>_ READ_MORE'}
                      </span>
                      <span className="p-3 bg-white text-black group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300">
                        {post.externalUrl ? <FaExternalLinkAlt /> : <FaArrowRight />}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="mt-16 text-center border border-white/10 bg-white/[0.02] p-12">
            <FaBookOpen className="mx-auto text-2xl text-[#FF6B35] mb-4" />
            <p className="text-white font-bold uppercase tracking-widest text-sm mb-2">
              Aucun article trouvé
            </p>
            <p className="text-slate-500 text-sm font-mono">
              Modifiez la recherche ou le filtre catégorie.
            </p>
          </div>
        )}

        {/* Publish CTA */}
        <div className="mt-20 grid lg:grid-cols-2 gap-6">
          <div className="border border-white/10 bg-white/[0.02] p-8">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6B35] mb-3">
              // editorial_pipeline
            </p>
            <h3
              className="text-2xl font-black uppercase text-white mb-3 tracking-tight"
              style={{ fontFamily: "'Antonio', sans-serif" }}
            >
              Prêt pour vos prochaines publications
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Cette page est structurée comme un vrai blog : catégories, recherche,
              article mis en avant, partage social et liens réseaux. Dès que vous
              publiez, ajoutez l&apos;entrée dans la liste{' '}
              <code className="text-[#FF6B35]">posts</code> (ou branchez Firebase /
              CMS plus tard).
            </p>
            <ul className="space-y-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <li className="flex items-center gap-2">
                <span className="text-[#FF6B35]">&gt;</span> slug + cover + tags
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#FF6B35]">&gt;</span> status published | draft
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#FF6B35]">&gt;</span> externalUrl pour Medium / LinkedIn
              </li>
            </ul>
          </div>

          <div className="border border-[#FF6B35]/30 bg-[#FF6B35]/5 p-8 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6B35] mb-3">
                // collab_&_diffusion
              </p>
              <h3
                className="text-2xl font-black uppercase text-white mb-3 tracking-tight"
                style={{ fontFamily: "'Antonio', sans-serif" }}
              >
                Diffuser sur vos réseaux
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Partagez un article en un clic, ou contactez-moi pour une
                collaboration éditoriale / technique.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                <FaEnvelope /> Contact éditorial
              </Link>
              <a
                href={socials.find((s) => s.id === 'linkedin')?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-white/20 text-white font-bold uppercase text-[10px] tracking-widest hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/10 bg-white/[0.02] font-mono text-[10px] text-slate-500 tracking-[0.25em] uppercase">
            <span className="w-2 h-2 bg-emerald-500 animate-pulse" />
            Status: publication_ready // channel: multi_social
          </div>
        </div>
      </div>

      {/* Article reader modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden border border-white/10 bg-[#0A1622] shadow-2xl flex flex-col"
            >
              <div className="relative h-48 sm:h-64 border-b border-white/10 overflow-hidden flex-shrink-0">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1622] via-[#0A1622]/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 border border-white/20 bg-black/50 text-white hover:border-[#FF6B35] transition-colors"
                  aria-label="Fermer"
                >
                  ×
                </button>
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6B35]">
                    {selected.category} · {selected.type}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1"
                    style={{ fontFamily: "'Antonio', sans-serif" }}
                  >
                    {selected.title}
                  </h3>
                </div>
              </div>

              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <FaUserEdit className="text-[#FF6B35]" /> {selected.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaCalendarAlt className="text-[#FF6B35]" /> {selected.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaClock className="text-[#FF6B35]" /> {selected.readTime}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {selected.excerpt}
                </p>
                {selected.content ? (
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                    {selected.content}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {(selected.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 border border-white/10 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-500 mb-3 inline-flex items-center gap-2">
                    <FaShareAlt className="text-[#FF6B35]" /> Partager
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(shareLinks(selected)).map(([key, href]) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                      >
                        {key}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
