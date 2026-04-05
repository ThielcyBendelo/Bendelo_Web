import useParallax from '../hooks/useParallax';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import LazyImage from './LazyImage';
import { useEffect, useState } from 'react';
import notificationService from '../services/notificationService';
import { irThielcy } from '../assets/assets.js';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useNavigate } from 'react-router-dom';
export default function Hero() {
  const scrollY = useParallax();
  const [elementRef] = useIntersectionObserver();
  const navigate = useNavigate();

  // Tableau des backgrounds
  const backgrounds = [
    '/background1.jpg',
    '/background2.jpg',
    '/background7.jpeg',
    '/irbendelo1.jpeg',
    '/irthielcy1.jpeg',
  ];
  const [bgIndex, setBgIndex] = useState(0);

  // Slider automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000); // Change toutes les 4 secondes
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  // Notification de bienvenue après un délai
  useEffect(() => {
    const timer = setTimeout(() => {
      notificationService.welcome();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={elementRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden"
    >
      {/* Background image slider */}
      <div
        className="absolute inset-0 w-full h-full transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgrounds[bgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.3)',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/90 to-dark-100/70 z-10" />

      {/* Particules flottantes animées */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 py-12">
  {/* Profile Image avec animation sophistiquée */}
  <AnimatedSection variant="scaleIn" delay={0.2}>
    <div className="mb-12 flex justify-center">
      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: 2,
          transition: { type: 'spring', stiffness: 300 },
        }}
        className="relative p-2"
      >
        {/* Glow de fond pour la profondeur */}
        <div className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full" />
        
        <LazyImage
          src={irThielcy}
          alt="Ir Bendelo Thielcy"
          className="w-48 h-48 md:w-62 md:h-60 rounded-full object-cover border-4 border-[var(--accent-1)] shadow-2xl relative z-10"
          style={{ objectPosition: 'center 35%' }}
          priority={true}
          placeholder={
            <div className="w-44 h-44 md:w-60 md:h-60 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-pulse" />
          }
        />

        {/* Cercles orbitaux plus élégants */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-[-12px] rounded-full border border-blue-400/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
  </AnimatedSection>

  {/* Titre d'accueil avec typographie améliorée */}
  <AnimatedSection variant="slideUp" delay={0.4}>
    <div className="mb-10 text-center space-y-4">
      <motion.h2
        className="text-3xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text leading-tight"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%', fontFamily: "'Antonio', sans-serif" }}
      >
        Bendelo Thielcy
      </motion.h2>

      <motion.div className="space-y-2">
        <p className="text-xl md:text-3xl text-white font-bold tracking-tight">
          Freelance & Entrepreneur
        </p>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Ingénieur Logiciel spécialisé en développement <span className="text-blue-400">web</span> et <span className="text-purple-400">mobile</span>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="pt-4"
      >
        <motion.p
          className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm md:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          Propulsant l'innovation chez <span className="font-bold underline decoration-purple-500/50">MUAMOKEL AGENCY</span>
        </motion.p>
      </motion.div>
    </div>
  </AnimatedSection>

  {/* Boutons d'action avec meilleur équilibre visuel */}
  <AnimatedSection variant="slideUp" delay={1.0}>
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={() => navigate('/contact')}
        className="w-full sm:w-auto group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg shadow-purple-500/25 overflow-hidden transition-all"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 font-bold tracking-wide">Me contacter</span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </motion.button>

      <motion.button
        onClick={() => navigate('/projects')}
        className="w-full sm:w-auto group relative px-10 py-4 bg-transparent text-white rounded-xl border-2 border-purple-500/50 overflow-hidden backdrop-blur-md"
        whileHover={{ scale: 1.05, borderColor: "var(--accent-1)" }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 font-bold tracking-wide">Mes Projets</span>
        <motion.div
          className="absolute inset-0 bg-purple-600/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.button>
    </motion.div>
  </AnimatedSection>
</div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce w-6 h-6 border-2 border-purple rounded-full"></div>
      </div>
    </section>
  );
}
