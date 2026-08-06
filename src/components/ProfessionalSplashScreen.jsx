import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logocopy } from '../assets/assets.js';

export default function ProfessionalSplashScreen({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Délai total avant de masquer le splash screen (ajustable selon vos besoins)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // On laisse l'animation de sortie de Framer Motion se terminer avant d'appeler onComplete
      setTimeout(() => onComplete && onComplete(), 800);
    }, 3500); // 3.5 secondes de présence visuelle du logo

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Background Grid - Style Blueprint Ingénieur */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div 
              className="absolute inset-0" 
              style={{ 
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
              }} 
            />
          </div>

          {/* Falling Particles - Effet Matrix discret en Orange */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
             {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-12 bg-gradient-to-b from-orange-500 to-transparent"
                  style={{ left: `${Math.random() * 100}%` }}
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ 
                    duration: 2 + Math.random() * 3, 
                    repeat: Infinity, 
                    delay: Math.random() * 2, 
                    ease: "linear" 
                  }}
                />
             ))}
          </div>

          {/* Central Logo - Fixe et Imposant */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Anneau rotatif en pointillé (Design Pro) */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 border border-dashed border-orange-500/20 rounded-full"
              />
              
              {/* Deuxième anneau inverse pour la profondeur */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-14 border border-orange-500/5 rounded-full"
              />

              <img 
                src={logocopy} 
                alt="ESNAs Logo" 
                className="w-36 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.5)]" 
              />
            </motion.div>

            {/* Tagline discrète de marque (optionnel) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-12"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white">
                Full-Stack Software Engineer
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
