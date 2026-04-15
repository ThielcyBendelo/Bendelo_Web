import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logocopy } from '../assets/assets.js';

export default function ProfessionalSplashScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadingSteps = useMemo(() => [
    { label: 'INITIALIZING CORE SYSTEM...', duration: 800 },
    { label: 'LOADING ASSETS & REPOSITORY...', duration: 1000 },
    { label: 'CONFIGURING INTERFACE LAYOUT...', duration: 600 },
    { label: 'OPTIMIZING PERFORMANCE ENGINE...', duration: 700 },
    { label: 'SYSTEM READY. BOOTING...', duration: 500 },
  ], []);

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / loadingSteps.length / (step.duration / 50);
          if (newProgress >= (currentStep + 1) * (100 / loadingSteps.length)) {
            clearInterval(progressInterval);
            return (currentStep + 1) * (100 / loadingSteps.length);
          }
          return newProgress;
        });
      }, 50);

      stepTimeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, step.duration);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => onComplete && onComplete(), 800);
      }, 300);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, onComplete, loadingSteps]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="relative z-10 w-full max-w-md px-10 flex flex-col items-center">
            {/* Central Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mb-16"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border border-dashed border-orange-500/30 rounded-full"
              />
              <img 
                src={logocopy} 
                alt="Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]" 
              />
            </motion.div>

            // ... (gardez vos imports et votre logique useEffect intacte)

{/* Terminal Section */}
<div className="w-full text-center space-y-6">
  <div className="h-6 overflow-hidden">
    <AnimatePresence mode="wait">
      <motion.p
        key={currentStep}
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          /* Ajout de l'effet Glitch ici */
          x: [0, -2, 2, -1, 1, 0],
          filter: [
            "none",
            "drop-shadow(2px 0px 0px #ff0000) drop-shadow(-2px 0px 0px #0000ff)",
            "none",
            "drop-shadow(-1px 0px 0px #ff0000) drop-shadow(1px 0px 0px #0000ff)",
            "none"
          ]
        }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ 
          duration: 0.5,
          /* On répète le glitch aléatoirement pendant que l'étape est active */
          x: { repeat: Infinity, duration: 0.15, repeatDelay: Math.random() * 5 },
          filter: { repeat: Infinity, duration: 0.2, repeatDelay: Math.random() * 5 }
        }}
        className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 italic relative"
      >
        <span className="relative z-10">{loadingSteps[currentStep]?.label}</span>
        
        {/* Clone du texte pour accentuer l'effet de dédoublement (Ghosting) */}
        <motion.span 
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ repeat: Infinity, duration: 0.1, repeatDelay: 2 }}
          className="absolute inset-0 text-purple-600 opacity-0 select-none pointer-events-none"
        >
          {loadingSteps[currentStep]?.label}
        </motion.span>
      </motion.p>
    </AnimatePresence>
  </div>


              {/* Progress Bar */}
              <div className="relative group">
                <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-purple-600 origin-left"
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div 
                  className="absolute -bottom-1 h-px bg-orange-500/50 blur-sm transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Status Bar */}
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-orange-500 rounded-full animate-ping" />
                    SYSTEM ONLINE
                  </span>
                  <span>v1.0.42</span>
                </div>
                <span className="text-orange-500/80">{Math.round(progress)}% COMPLETE</span>
              </div>
            </div>
          </div>

          {/* Falling Particles */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
             {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-10 bg-gradient-to-b from-orange-500 to-transparent"
                  style={{ left: `${Math.random() * 100}%`, top: `-10%` }}
                  animate={{ y: ['0vh', '110vh'] }}
                  transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
                />
             ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
