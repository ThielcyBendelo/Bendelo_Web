import React, { useState } from 'react'; 
import { FaBook, FaShoppingBag, FaStar, FaChevronLeft, FaChevronRight, FaTimes, FaGlobeAfrica } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleAnalyticsTracker from "../components/Analytics"; 
import { book1, book2, book3, book4, book6, } from '../assets/assets.js';


const initialBooks = [
  {
    id: 1,
    title: "Le Réveil du Lion Africain",
    subtitle: "Guide pratique pour une souveraineté mentale",
    author: "Bendelo Thielcy",
    price: 25,
    rating: 5,
    category: "Éveil",
    description: "Un manifeste puissant explorant les clés de l'indépendance intellectuelle et technologique pour la jeunesse du continent.",
    image: book2, // Remplacez par vos images
    status: "Disponible"
  },
  {
    id: 2,
    title: "Code & Conscience",
    subtitle: "L'ingénierie au service de l'impact humain",
    author: "Bendelo Thielcy",
    price: 30,
    rating: 5,
    category: "Technologie",
    description: "Comment allier la rigueur du logiciel avec la profondeur de l'âme pour bâtir des solutions durables.",
    image: book3,
    status: "Bientôt disponible"
  },
  {
    id: 2,
    title: "Le Reveil de la Conscience",
    subtitle: "L'ingénierie au service de l'impact humain",
    author: "Bendelo Thielcy",
    price: 30,
    rating: 5,
    category: "Éveil",
    description: "",
    image: book1,
    status: "Bientôt disponible"
  },
  {
    id: 2,
    title: "La Lignée de Feu",
    subtitle: "",
    author: "Bendelo Thielcy",
    price: 30,
    rating: 5,
    category: "Éveil",
    description: "",
    image: book4,
    status: "Bientôt disponible"
  },
  {
    id: 2,
    title: "La Voix de La résilience",
    subtitle: "",
    author: "Bendelo Thielcy",
    price: 30,
    rating: 6,
    category: "Éveil",
    description: "",
    image: book6,
    status: "Bientôt disponible"
  },
];

export default function Library() {
  const [books] = useState(initialBooks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const nextBook = () => setCurrentIndex((prev) => (prev === books.length - 1 ? 0 : prev + 1));
  const prevBook = () => setCurrentIndex((prev) => (prev === 0 ? books.length - 1 : prev - 1));

  const handleOrder = () => {
    const message = `Bonjour Ir Bendelo, je souhaite commander le livre : ${books[currentIndex].title}`;
    window.open(
      `https://wa.me/243829054350?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };
  
 return (
    <section 
  
      id="library" 
      className="py-24 px-6 border-t border-slate-200 dark:border-white/10" 
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* --- EN-TÊTE DE LA BIBLIOTHÈQUE --- */}
        <div className="text-center mb-20">
          <span className="text-slate-950 dark:text-slate-850 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Impact Littéraire Africain
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Biblio<span className="underline decoration-1 underline-offset-8">thèque</span>
          </h2>
          <p className="text-base md:text-lg text-slate-950 dark:text-slate-400 font-black tracking-wide leading-relaxed max-w-2xl mx-auto">
            "Les mots sont les graines de l'éveil. Cultivons ensemble le jardin du futur."
          </p>
        </div>

        {/* --- CARROUSEL ORTHOGONAL STYLE FICHE TECHNIQUE --- */}
        <div className="relative max-w-5xl mx-auto z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] p-8 md:p-12"
            >
              {/* Couverture du Livre (Enveloppe 4 colonnes) */}
              <div className="lg:col-span-5 relative w-full flex justify-center">
                <div className="relative aspect-[3/4] w-full max-w-[280px] border border-slate-200 dark:border-white/10 bg-neutral-900 group overflow-hidden">
                  <img 
                    src={books[currentIndex].image} 
                    alt={books[currentIndex].title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    loading="lazy"
                  />
                  {/* Badge de catégorie industriel */}
                  <span className="absolute top-3 right-3 font-mono text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5">
                    // {books[currentIndex].category}
                  </span>
                </div>
              </div>

              {/* Détails et Vente (Enveloppe 7 colonnes) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Notation technique et Titres */}
                  <div className="flex items-center gap-1 text-orange-500 text-xs mb-3">
                    {[...Array(books[currentIndex].rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-1">
                    {books[currentIndex].title}
                  </h3>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-4">
                    // {books[currentIndex].subtitle}
                  </h4>
                  
                  <p className="text-slate-950 dark:text-slate-850 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
                    {books[currentIndex].description}
                  </p>
                </div>

                {/* Bloc Tarifs & Bouton de Commande Directe */}
                <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <span className="font-mono text-[8px] text-slate-950 uppercase tracking-widest block">Unit Rate</span>
                    <p className="text-xl font-bold font-mono text-slate-950 dark:text-white">
                      {books[currentIndex].price} <span className="text-xs font-normal text-slate-950">USD</span>
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleOrder}
                    className="px-6 py-4 bg-slate-950 dark:bg-white text-white dark:text-black font-bold uppercase text-xs tracking-widest hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center justify-center gap-3"
                  >
                    <FaShoppingBag className="text-xs" /> Commander l'ouvrage
                  </button>
                </div>
                
                {/* Métadonnées de log en bas de fiche */}
                <div className="pt-4 border-t border-slate-950 dark:border-white/5 flex flex-wrap gap-6 font-mono text-[9px] text-slate-950 dark:text-slate-850 uppercase tracking-wider">
                  <span>● STOCK: {books[currentIndex].status}</span>
                  <span>● LOGISTICS: LIND/WORLDWIDE</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CONTROLES DE NAVIGATION PARALLELES (Flèches minimalistes) */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 lg:-left-16 z-30">
            <button 
              type="button"
              onClick={prevBook} 
              className="p-4 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30 hover:text-orange-500 transition-colors"
            >
              <FaChevronLeft className="text-xs" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 lg:-right-16 z-30">
            <button 
              type="button"
              onClick={nextBook} 
              className="p-4 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30 hover:text-orange-500 transition-colors"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* INDICATEUR DE CARROUSEL COMPACT (Indexation orthogonale) */}
        <div className="flex justify-center gap-1.5 mt-8">
          {books.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-300 ${currentIndex === i ? 'w-8 bg-slate-950 dark:bg-white' : 'w-2 bg-slate-200 dark:bg-white/10'}`} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

