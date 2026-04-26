import { about } from '../assets/assets.js';
import { profile1Image as irbendelo1 } from '../assets/assets.js';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';
import { FaGraduationCap, FaRocket, FaShieldAlt, FaUserCheck, FaTerminal, FaBookOpen, FaLightbulb, FaGlobeAfrica, FaQuoteLeft } from 'react-icons/fa';

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotateImg = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <>
      <motion.section
        ref={sectionRef}
        className="relative pt-32 pb-25 px-6 overflow-hidden bg-white dark:bg-[#05070A] transition-colors duration-500"
      >
        {/* --- EFFETS DE LUMIÈRE D'ARRIÈRE-PLAN --- */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/5 dark:bg-purple-600/20 blur-[150px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-orange-600/5 dark:bg-orange-600/10 blur-[130px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto">
          
          {/* --- SECTION 1: HERO DUALITÉ --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-40">
            
            {/* Image avec effet de cadre flottant */}
            <motion.div className="lg:col-span-5 relative" 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <div className="relative z-15 p-6 md:p-15 bg-slate-50 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[3.5rem] shadow-2xl transition-colors">
                <motion.div style={{ y: yImage, rotate: rotateImg }} className="overflow-hidden rounded-[3rem]">
                  <LazyImage
                    src={irbendelo1}
                    alt="Bendelo Thielcy"
                    className="w-full h-[500px] md:h-[650px] object-cover scale-110"
                  />
                </motion.div>
                
                {/* Badge Flottant "Impact" */}
                <div className="absolute -bottom-10 -right-6 bg-gradient-to-br from-orange-500 to-orange-700 p-6 rounded-3xl shadow-2xl border border-white/20 transform hover:scale-110 transition-transform">
                  <p className="text-4xl font-black text-white leading-none">100%</p>
                  <p className="text-[10px] uppercase font-bold text-orange-100 tracking-tighter">Engagement Conscient</p>
                </div>
              </div>
            </motion.div>

            {/* Contenu Texte */}
            <div className="lg:col-span-7 space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-black tracking-[0.2em] uppercase mb-6">
                  <FaLightbulb className="animate-bounce" /> Ingénieur • Coach • Auteur
                </span>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-8">
                  Coder le futur, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-orange-500 to-orange-600 dark:from-purple-400 dark:via-orange-400 dark:to-orange-500">Éveiller l'Afrique.</span>
                </h1>
                
                <div className="relative group">
                  <FaQuoteLeft className="absolute -top-6 -left-8 text-6xl text-slate-100 dark:text-white/5 group-hover:text-orange-500/10 transition-colors" />
                  <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light italic">
                    {about}
                  </p>
                </div>
              </motion.div>

              {/* Tags de compétences stylisés */}
              <div className="flex flex-wrap gap-3">
                {["Software Engineering", "Mindset Coaching", "African Leadership", "Strategic Vision"].map((skill, i) => (
                  <span key={i} className="px-6 py-3 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest hover:border-orange-500/40 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* --- SECTION 2: LES PILIERS (Cartes Interactives) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
            {[
              { icon: <FaTerminal />, title: "Tech Architecture", subtitle: "MUAMOKEL AGENCY", color: "from-blue-600 dark:from-blue-500" },
              { icon: <FaBookOpen />, title: "Plume d'Éveil", subtitle: "Auteur d'ouvrages", color: "from-purple-600 dark:from-purple-500" },
              { icon: <FaGlobeAfrica />, title: "Impact Continental", subtitle: "Jeunesse Africaine", color: "from-orange-600 dark:from-orange-500" },
              { icon: <FaUserCheck />, title: "Haute Conscience", subtitle: "Coaching Holistique", color: "from-emerald-600 dark:from-emerald-500" }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.02 }}
                className="relative p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm overflow-hidden group transition-all"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${pillar.color} to-transparent opacity-50`} />
                <div className="text-4xl text-slate-800 dark:text-white mb-6 group-hover:scale-125 transition-transform duration-500">{pillar.icon}</div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{pillar.title}</h3>
                <p className="text-sm font-bold text-orange-600 dark:text-orange-500/80 uppercase tracking-widest mb-4">{pillar.subtitle}</p>
                <div className="h-[1px] w-full bg-slate-200 dark:bg-white/10 group-hover:w-1/2 transition-all" />
              </motion.div>
            ))}
          </div>

          {/* --- SECTION 3: CTA IMPACT --- */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative p-1 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 rounded-[4rem] overflow-hidden group shadow-2xl"
          >
            <div className="bg-white dark:bg-[#0A0E1A] rounded-[3.9rem] p-12 md:p-16 text-center relative overflow-hidden transition-colors duration-500">
              {/* Animation de fond pour le CTA */}
              <div className="absolute inset-0 bg-[url('https://transparenttextures.com')] opacity-5 dark:opacity-10" />
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
                  UNISSONS NOS FORCES POUR <br />
                  <span className="italic text-orange-600 dark:text-orange-500">L'EXCELLENCE.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg mb-12">
                  Que ce soit pour bâtir une infrastructure numérique de classe mondiale ou pour transformer votre vision de vie, je vous accompagne dans cette ascension.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => window.open("https://wa.me", "_blank")}
                    className="group relative px-12 py-5 bg-orange-600 rounded-full overflow-hidden transition-all hover:scale-105"
                  >
                    <span className="relative z-10 text-white font-black uppercase tracking-widest">Collaborer Maintenant</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- SECTION 4: LOCALISATION (MAPS) --- */}
          <div className="mt-40 rounded-[3rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
             <GoogleMapsSection />
          </div>

        </div>
      </motion.section>
    </>
  );
}
