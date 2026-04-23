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
    window.open(`https://wa.me{encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="library" className="py-24 transition-all duration-700" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-6">
        
        {/* EN-TÊTE DE LA BIBLIOTHÈQUE */}
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-6">
            <FaGlobeAfrica className="text-orange-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Impact Littéraire Africain</span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic" style={{ color: 'var(--text-primary)' }}>
            Biblio<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">thèque</span>.
          </h2>
          <p className="text-xl max-w-2xl mx-auto font-light italic" style={{ color: 'var(--text-secondary)' }}>
            "Les mots sont les graines de l'éveil. Cultivons ensemble le jardin du futur."
          </p>
        </div>

        {/* AFFICHAGE DU LIVRE (CARROUSEL 3D) */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-xl"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}
            >
              {/* Couverture du Livre */}
              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity" />
                <motion.div 
                  whileHover={{ rotateY: -20, rotateX: 5 }}
                  className="relative aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden border border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10" />
                  <img 
                    src={books[currentIndex].image} 
                    alt={books[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 z-20 px-4 py-1 bg-orange-600 text-[10px] font-black uppercase rounded-full text-white shadow-xl">
                    {books[currentIndex].category}
                  </div>
                </motion.div>
              </div>

              {/* Détails et Vente */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-orange-500 mb-2">
                  {[...Array(books[currentIndex].rating)].map((_, i) => <FaStar key={i} />)}
                </div>
                <h3 className="text-4xl md:text-5xl font-black leading-none" style={{ color: 'var(--text-primary)' }}>
                  {books[currentIndex].title}
                </h3>
                <h4 className="text-lg font-bold text-purple-500 italic">{books[currentIndex].subtitle}</h4>
                <p className="text-lg leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
                  {books[currentIndex].description}
                </p>

                <div className="pt-8 flex flex-wrap items-center gap-8">
                  <div className="text-3xl font-black text-white">
                    <span style={{ color: 'var(--text-primary)' }}>{books[currentIndex].price}</span>
                    <span className="text-orange-500 ml-1">$</span>
                  </div>
                  <button 
                    onClick={handleOrder}
                    className="flex-1 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-900/20 active:scale-95"
                  >
                    <FaShoppingBag /> Commander l'éveil
                  </button>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <span className="flex items-center gap-2">● {books[currentIndex].status}</span>
                  <span className="flex items-center gap-2">● Livraison Kinshasa & Monde</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 lg:-left-20">
            <button onClick={prevBook} className="p-5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-orange-600 transition-all">
              <FaChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 lg:-right-20">
            <button onClick={nextBook} className="p-5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-orange-600 transition-all">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Indication visuelle des pages */}
        <div className="flex justify-center gap-3 mt-12">
          {books.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-12 bg-orange-500' : 'w-4 bg-white/10'}`} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
