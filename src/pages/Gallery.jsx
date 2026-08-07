import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaImages,
  FaUserTie,
  FaLaptopCode,
  FaGlobeAfrica,
  FaBookOpen,
  FaCameraRetro,
  FaLayerGroup,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from 'react-icons/fa';
import GoogleAnalyticsTracker from '../components/Analytics';
import {
  projet1,
  projet2,
  projet3,
  projet4,
  projet5,
  projet6,
  predictiveMaintenance,
  irBendelo,
  irThielcy,
  programmationImage,
  bgImage,
  background7,
  impact1,
  impact2,
  impact3,
  impact4,
  impact5,
  impact6,
  book1,
  book2,
  book3,
  book4,
  book5,
  book6,
  logocopy,
} from '../assets/assets.js';

// Fichiers présents dans public/images (certains exports assets pointent vers d'anciens noms)
const profileStudio = '/images/profile1.jpg';
const logoBrand = '/images/logo.jpeg';

// ---------------------------------------------------------------------------
// Albums & médias — photos professionnelles (public/images)
// Ajoutez de nouvelles entrées ici quand vous importez des clichés.
// ---------------------------------------------------------------------------
const albums = [
  {
    id: 'all',
    label: 'Tous',
    icon: FaLayerGroup,
    description: 'Vue d’ensemble du portfolio visuel',
  },
  {
    id: 'portraits',
    label: 'Portraits',
    icon: FaUserTie,
    description: 'Identité visuelle & portraits pro',
  },
  {
    id: 'projets',
    label: 'Projets',
    icon: FaLaptopCode,
    description: 'Produits, UI et livrables tech',
  },
  {
    id: 'impact',
    label: 'Impact',
    icon: FaGlobeAfrica,
    description: 'Terrain, conférences & communauté',
  },
  {
    id: 'ouvrages',
    label: 'Ouvrages',
    icon: FaBookOpen,
    description: 'Couvertures & univers littéraire',
  },
  {
    id: 'studio',
    label: 'Studio',
    icon: FaCameraRetro,
    description: 'Ambiances, brand & backstage',
  },
];

const media = [
  // Portraits
  {
    id: 'p1',
    src: irBendelo,
    album: 'portraits',
    title: 'Portrait — Ir Bendelo',
    caption: 'Direction artistique corporate · identité ingénieur',
    location: 'Kinshasa',
    year: '2025',
    span: 'tall',
  },
  {
    id: 'p2',
    src: irThielcy,
    album: 'portraits',
    title: 'Portrait — Thielcy',
    caption: 'Look editorial · branding personnel',
    location: 'Studio',
    year: '2025',
    span: 'square',
  },
  {
    id: 'p3',
    src: profileStudio,
    album: 'portraits',
    title: 'Profil officiel',
    caption: 'Photo de profil portfolio & réseaux',
    location: 'Studio',
    year: '2024',
    span: 'wide',
  },

  // Projets tech
  {
    id: 't1',
    src: projet1,
    album: 'projets',
    title: 'Projet digital 01',
    caption: 'Interface produit · cas client',
    location: 'Remote',
    year: '2025',
    span: 'wide',
  },
  {
    id: 't2',
    src: projet2,
    album: 'projets',
    title: 'Projet digital 02',
    caption: 'Dashboard & expérience utilisateur',
    location: 'Remote',
    year: '2025',
    span: 'square',
  },
  {
    id: 't3',
    src: projet3,
    album: 'projets',
    title: 'Projet digital 03',
    caption: 'Livrable full-stack en production',
    location: 'RDC',
    year: '2025',
    span: 'tall',
  },
  {
    id: 't4',
    src: projet4,
    album: 'projets',
    title: 'Projet digital 04',
    caption: 'Architecture visuelle applicative',
    location: 'Remote',
    year: '2024',
    span: 'square',
  },
  {
    id: 't5',
    src: projet5,
    album: 'projets',
    title: 'Projet digital 05',
    caption: 'Mobile-first · produit scalé',
    location: 'Remote',
    year: '2025',
    span: 'wide',
  },
  {
    id: 't6',
    src: projet6,
    album: 'projets',
    title: 'Projet digital 06',
    caption: 'Closing shot · delivery pack',
    location: 'Remote',
    year: '2025',
    span: 'square',
  },
  {
    id: 't7',
    src: predictiveMaintenance,
    album: 'projets',
    title: 'Predictive Maintenance',
    caption: 'Concept IA industrielle',
    location: 'Lab',
    year: '2025',
    span: 'tall',
  },
  {
    id: 't8',
    src: programmationImage,
    album: 'projets',
    title: 'Engineering desk',
    caption: 'Behind the code · craft session',
    location: 'Workspace',
    year: '2024',
    span: 'wide',
  },

  // Impact
  {
    id: 'i1',
    src: impact1,
    album: 'impact',
    title: 'Impact 01',
    caption: 'Moment terrain · éveil & transmission',
    location: 'Afrique',
    year: '2025',
    span: 'square',
  },
  {
    id: 'i2',
    src: impact2,
    album: 'impact',
    title: 'Impact 02',
    caption: 'Session collective · leadership',
    location: 'Afrique',
    year: '2025',
    span: 'tall',
  },
  {
    id: 'i3',
    src: impact3,
    album: 'impact',
    title: 'Impact 03',
    caption: 'Scène & prise de parole',
    location: 'Événement',
    year: '2024',
    span: 'wide',
  },
  {
    id: 'i4',
    src: impact4,
    album: 'impact',
    title: 'Impact 04',
    caption: 'Communauté & transformation',
    location: 'Terrain',
    year: '2025',
    span: 'square',
  },
  {
    id: 'i5',
    src: impact5,
    album: 'impact',
    title: 'Impact 05',
    caption: 'Masterclass · énergie salle',
    location: 'Conférence',
    year: '2025',
    span: 'square',
  },
  {
    id: 'i6',
    src: impact6,
    album: 'impact',
    title: 'Impact 06',
    caption: 'Clôture · signature visuelle',
    location: 'Afrique',
    year: '2025',
    span: 'tall',
  },

  // Ouvrages
  {
    id: 'b1',
    src: book1,
    album: 'ouvrages',
    title: 'Ouvrage 01',
    caption: 'Couverture · ligne éditoriale',
    location: 'Édition',
    year: '2025',
    span: 'tall',
  },
  {
    id: 'b2',
    src: book2,
    album: 'ouvrages',
    title: 'Ouvrage 02',
    caption: 'Univers graphique littéraire',
    location: 'Édition',
    year: '2025',
    span: 'square',
  },
  {
    id: 'b3',
    src: book3,
    album: 'ouvrages',
    title: 'Ouvrage 03',
    caption: 'Collection impact',
    location: 'Édition',
    year: '2024',
    span: 'tall',
  },
  {
    id: 'b4',
    src: book4,
    album: 'ouvrages',
    title: 'Ouvrage 04',
    caption: 'Direction artistique print',
    location: 'Édition',
    year: '2025',
    span: 'square',
  },
  {
    id: 'b5',
    src: book5,
    album: 'ouvrages',
    title: 'Ouvrage 05',
    caption: 'Série auteur',
    location: 'Édition',
    year: '2025',
    span: 'wide',
  },
  {
    id: 'b6',
    src: book6,
    album: 'ouvrages',
    title: 'Ouvrage 06',
    caption: 'Closing cover pack',
    location: 'Édition',
    year: '2025',
    span: 'square',
  },

  // Studio / brand
  {
    id: 's1',
    src: bgImage,
    album: 'studio',
    title: 'Ambiance 01',
    caption: 'Texture brand · fond portfolio',
    location: 'Studio',
    year: '2024',
    span: 'wide',
  },
  {
    id: 's2',
    src: background7,
    album: 'studio',
    title: 'Ambiance 02',
    caption: 'Mood industrial dark',
    location: 'Studio',
    year: '2025',
    span: 'tall',
  },
  {
    id: 's3',
    src: logoBrand,
    album: 'studio',
    title: 'Logo principal',
    caption: 'Système de marque Bendelo',
    location: 'Brand',
    year: '2025',
    span: 'square',
  },
  {
    id: 's4',
    src: logocopy,
    album: 'studio',
    title: 'Variante logo',
    caption: 'Déclinaison monochrome',
    location: 'Brand',
    year: '2025',
    span: 'square',
  },
];

const spanClass = {
  square: 'row-span-1 col-span-1 aspect-square',
  tall: 'row-span-2 col-span-1 aspect-[3/4] sm:aspect-auto sm:min-h-[420px]',
  wide: 'row-span-1 col-span-1 sm:col-span-2 aspect-[16/10] sm:aspect-[2/1]',
};

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(() => {
    if (activeAlbum === 'all') return media;
    return media.filter((m) => m.album === activeAlbum);
  }, [activeAlbum]);

  const albumCounts = useMemo(() => {
    const counts = { all: media.length };
    media.forEach((m) => {
      counts[m.album] = (counts[m.album] || 0) + 1;
    });
    return counts;
  }, []);

  const activeMeta = albums.find((a) => a.id === activeAlbum) || albums[0];

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, goPrev, goNext]);

  const current =
    lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section
      className="pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden bg-[#0A1622] min-h-screen"
      id="gallery"
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
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            // visual_archive · professional_gallery
          </span>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            GALERIE <span className="text-[#FF6B35] italic">PRO</span>
            <span className="text-[#FF6B35]">.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Albums photo professionnels — portraits, projets, impact terrain et
            univers éditorial. Swipez les albums, explorez la grille, ouvrez en
            plein écran.
          </p>
        </div>

        {/* Album chips */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Albums galerie"
            className="inline-flex flex-nowrap items-center gap-2 sm:gap-2.5 max-w-full overflow-x-auto overscroll-x-contain px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
          >
            {albums.map((album) => {
              const Icon = album.icon;
              const isSelected = activeAlbum === album.id;
              const count = albumCounts[album.id] || 0;
              return (
                <button
                  key={album.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveAlbum(album.id);
                    setLightboxIndex(null);
                  }}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 font-mono font-bold uppercase text-[10px] sm:text-[11px] tracking-widest border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#0f3d2e] text-emerald-100 border-emerald-500/40 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]'
                      : 'bg-[#141a22] border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                  }`}
                >
                  <span className={isSelected ? 'text-emerald-200' : 'text-slate-500'}>
                    <Icon />
                  </span>
                  {album.label}
                  <span
                    className={`text-[9px] font-mono tabular-nums ${
                      isSelected ? 'text-emerald-300/80' : 'text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Album meta strip */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border border-white/10 bg-white/[0.02] px-5 py-4">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6B35] mb-1">
              // album_{activeAlbum}
            </p>
            <h2 className="text-white font-black uppercase tracking-wider text-sm sm:text-base">
              {activeMeta.label}
            </h2>
            <p className="text-slate-500 text-xs mt-1 font-mono">
              {activeMeta.description}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <FaImages className="text-[#FF6B35]" />
            {filtered.length} visuel{filtered.length > 1 ? 's' : ''}
          </div>
        </div>

        {/* Masonry-style explore grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2 auto-rows-[minmax(140px,auto)] sm:auto-rows-[minmax(160px,auto)]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden border border-white/10 bg-neutral-950 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] ${
                  spanClass[item.span] || spanClass.square
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF6B35] mb-1">
                    {item.album}
                  </span>
                  <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wide line-clamp-2">
                    {item.title}
                  </span>
                </div>
                <span className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/40 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaExpand className="text-[10px]" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center border border-white/10 bg-white/[0.02] p-12">
            <FaImages className="mx-auto text-2xl text-[#FF6B35] mb-4" />
            <p className="text-white font-bold uppercase tracking-widest text-sm">
              Aucune photo dans cet album
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 grid sm:grid-cols-2 gap-4">
          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6B35] mb-2">
              // shoot_request
            </p>
            <h3
              className="text-xl font-black uppercase text-white mb-2 tracking-tight"
              style={{ fontFamily: "'Antonio', sans-serif" }}
            >
              Besoin d&apos;un pack visuel pro ?
            </h3>
            <p className="text-slate-400 text-sm mb-5">
              Branding, portraits corporate, covers d&apos;ouvrages ou capture de
              conférences — parlons de votre prochain album.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors"
            >
              Contacter le studio
            </Link>
          </div>
          <div className="border border-[#FF6B35]/30 bg-[#FF6B35]/5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6B35] mb-2">
                // also_explore
              </p>
              <h3
                className="text-xl font-black uppercase text-white mb-2 tracking-tight"
                style={{ fontFamily: "'Antonio', sans-serif" }}
              >
                Projets & blog
              </h3>
              <p className="text-slate-300 text-sm mb-5">
                Retrouvez le détail technique des livrables et les publications
                éditoriales.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-3 border border-white/20 text-white font-bold uppercase text-[10px] tracking-widest hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
              >
                Projets
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-4 py-3 border border-white/20 text-white font-bold uppercase text-[10px] tracking-widest hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              aria-label="Fermer la visionneuse"
              onClick={closeLightbox}
            />

            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col border border-white/10 bg-[#0A1622] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-black/40">
                <div className="min-w-0">
                  <p className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6B35] truncate">
                    {current.album} · {lightboxIndex + 1}/{filtered.length}
                  </p>
                  <h3 className="text-white font-bold uppercase tracking-wide text-sm truncate">
                    {current.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="shrink-0 w-10 h-10 border border-white/15 text-white hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors flex items-center justify-center"
                  aria-label="Fermer"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="relative flex-1 min-h-[45vh] sm:min-h-[55vh] bg-black flex items-center justify-center">
                <img
                  src={current.src}
                  alt={current.title}
                  className="max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/20 bg-black/50 text-white hover:border-[#FF6B35] transition-colors flex items-center justify-center"
                  aria-label="Photo précédente"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/20 bg-black/50 text-white hover:border-[#FF6B35] transition-colors flex items-center justify-center"
                  aria-label="Photo suivante"
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="px-4 sm:px-6 py-4 border-t border-white/10 space-y-2">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {current.caption}
                </p>
                <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-[#FF6B35]" />
                    {current.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaCalendarAlt className="text-[#FF6B35]" />
                    {current.year}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
