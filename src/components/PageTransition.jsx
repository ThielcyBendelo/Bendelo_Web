import React from "react";
import { motion } from "framer-motion";

const overlayVariants = {
  initial: { 
    scaleY: 1 
  },
  animate: { 
    scaleY: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1], // Transition fluide type "Expo" haut de gamme
      delay: 0.1
    }
  },
  exit: { 
    scaleY: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const contentVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, delay: 0.4 }
  },
  exit: { 
    opacity: 0, 
    y: -15,
    transition: { duration: 0.3 }
  }
};

const PageTransition = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen bg-[#0A1622] overflow-hidden">
      
      {/* --- VOLET GÉOMÉTRIQUE DE TRANSITION SYSTÈME (CARRÉ PARFAIT) --- */}
      <motion.div
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 w-full h-full bg-[#0E243A] z-50 pointer-events-none rounded-none origin-top flex flex-col justify-end"
      >
        {/* Ligne d'impulsion d'ingénierie Orange au bas du volet */}
        <div className="w-full h-[3px] bg-[#FF6B35] rounded-none shadow-[0_0_20px_#FF6B35]" />
        
        {/* Label style moniteur système visible brièvement au flash de transition */}
        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-[#FF6B35] tracking-[0.3em] uppercase">
          // ROUTER_MOUNTING_SEQUENCE...
        </div>
      </motion.div>

      {/* --- MAILLAGE GRILLE EN ARRIÈRE-PLAN SUR CHAQUE NOUVELLE PAGE --- */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`, 
          backgroundSize: '45px 45px',
          backgroundPosition: 'center top'
        }} 
      />

      {/* --- CONTENU DE LA PAGE ANIMÉ EN ENTRÉE/SORTIE --- */}
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 w-full min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
