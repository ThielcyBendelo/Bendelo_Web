import useParallax from '../hooks/useParallax';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import { 
  SiReact, SiVite, SiNodedotjs, SiTailwindcss, 
  SiPostgresql, SiDocker, SiAmazonwebservices, 
  SiTypescript, SiMongodb, SiJavascript,  
} from 'react-icons/si';
import { 
  FaCode, 
  FaServer, 
  FaRocket, 
  FaMicrochip, 
  FaShieldAlt, 
  FaProjectDiagram, 
  FaCloud, // On utilise ce nom court.
   FaLightbulb, // Ajoutez cette ligne
  FaBookOpen   // Ajoutez cette ligne pour éviter la prochaine erreur
} from 'react-icons/fa';



import LazyImage from './LazyImage';
import { useEffect, useState } from 'react';
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
    // '/background1.jpg',
    // '/background2.jpg',
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

 


    // Données pour les nouvelles sections
   const techs = [
    { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
    { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
    { name: "AWS", icon: <SiAmazonwebservices className="text-[#FF9900]" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
  ];
  

 const services = [
  { 
    title: "Architecture Logicielle", 
    icon: <FaProjectDiagram />, 
    desc: "Conception de systèmes scalables, microservices et design patterns avancés.", 
    size: "md:col-span-2" 
  },
  { 
    title: "Cloud & DevOps", 
    icon: <FaCloud />, // Correction : FaCloudDownloadAlt -> FaCloud
    desc: "Déploiement continu (CI/CD), conteneurisation Docker/K8s et gestion AWS/Azure.", 
    size: "md:col-span-1" 
  },
  { 
    title: "Cybersécurité", 
    icon: <FaShieldAlt />, 
    desc: "Audit de sécurité, protection des données et implémentation de protocoles OAuth/JWT.", 
    size: "md:col-span-1" 
  },
  { 
    title: "Systèmes Distribués", 
    icon: <FaMicrochip />, // Correction : FaMicrochips -> FaMicrochip (singulier)
    desc: "Gestion de la haute disponibilité, caching (Redis) et communication asynchrone (Kafka).", 
    size: "md:col-span-2" 
  },
  { 
    title: "Performance Engineering", 
    icon: <FaRocket />, 
    desc: "Optimisation des temps de réponse, profiling de code et réduction de la dette technique.", 
    size: "md:col-span-3" 
  },
];

  return (
    <>
{/* ================= 1. SECTION HERO : DESIGN INGENIEUR ET MAILLAGE STRICT ================= */}
<section
  ref={elementRef}
  id="home"
  className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden bg-[#0a1622]"
>
  {/* --- GRILLE BLUEPRINT STRICTE EN ARRIÈRE-PLAN --- */}
  <div 
    className="absolute inset-0 z-0 opacity-15 pointer-events-none"
    style={{ 
      backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, 
      backgroundSize: '45px 45px',
      backgroundPosition: 'center top'
    }} 
  />

  {/* Image de fond avec parallaxe ultra-atténuée */}
  <div
    className="absolute inset-0 w-full h-full transition-all duration-1000 grayscale opacity-[0.04] pointer-events-none"
    style={{
      backgroundImage: `url(${backgrounds[bgIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transform: `translateY(${scrollY * 0.3}px)`,
    }}
  />

  {/* Lignes structurelles verticales (Piliers de construction) */}
  <div className="absolute inset-0 z-10 opacity-10 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto w-full border-x border-white">
    <div className="border-r border-white h-full" />
    <div className="border-r border-white h-full" />
    <div className="border-r border-white h-full" />
  </div>

  <div className="relative z-20 max-w-5xl mx-auto px-4 py-16 w-full">
    
    {/* --- IMAGE DE PROFIL : ENCADREMENT BRUT ET CARRÉ --- */}
    <AnimatedSection variant="fadeIn" delay={0.2}>
      <div className="mb-12 flex justify-center">
        <motion.div
          whileTap={{ scale: 0.99 }}
          className="relative p-2 border border-white/20 bg-white/[0.02] backdrop-blur-md rounded-none"
        >
          {/* Repères angulaires géométriques parfaits (sans arrondis) */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white rounded-none" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white rounded-none" />
          
          <LazyImage
            src={irThielcy}
            alt="Ir Bendelo Thielcy"
            className="w-40 h-40 md:w-48 md:h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-white/10 rounded-none"
            style={{ objectPosition: 'center 35%' }}
            priority={true}
          />
        </motion.div>
      </div>
    </AnimatedSection>

    {/* --- BLOC TYPOGRAPHIQUE PRINCIPAL CORRESPONDANT A L'IMAGE --- */}
    <AnimatedSection variant="slideUp" delay={0.4}>
      <div className="mb-12 text-center flex flex-col items-center">
        
        <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-5 block">
          // TECHNICAL_STACK
        </span>

        <h1
          className="text-4xl md:text-7xl font-black mb-8 text-white uppercase tracking-tight leading-none"
          style={{ fontFamily: "'Antonio', sans-serif" }}
        >
          EXPERTISE <span className="text-[#FF6B35] italic">INGÉNIERIE</span>
        </h1>

        <div className="max-w-3xl space-y-6">
          <p className="text-xl md:text-2xl text-slate-200 font-light tracking-wide leading-relaxed">
            Solutions logicielles critiques et architectures distribuées conçues pour <span className="font-semibold text-white">l'excellence opérationnelle</span> et la haute disponibilité.
          </p>
          
          <p className="text-xs md:text-sm text-white/40 max-w-xl mx-auto italic font-mono pt-4 border-t border-white/5 uppercase tracking-wider">
            "Fusionner l'excellence technique et l'éveil humain pour bâtir l'avenir."
          </p>
        </div>

        {/* Badge Agence Style Console Strict */}
        <div className="mt-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-white/10 bg-white/[0.03] font-mono text-[10px] text-white tracking-[0.2em] rounded-none">
            <span className="w-2 h-2 bg-[#FF6B35] rounded-none animate-pulse" />
            <span>SYS_ID: LEAD @ <span className="text-[#FF6B35] font-bold">MUAMOKEL AGENCY</span></span>
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* --- BOUTONS D'ACTION RADICAUX (SANS ARRONDIS) --- */}
    <AnimatedSection variant="slideUp" delay={0.8}>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={() => navigate('/contact')}
          className="w-full sm:w-auto px-12 py-4 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[#FF6B35] hover:text-white transition-all duration-300 rounded-none"
        >
          Me contacter
        </button>

        <button
          onClick={() => navigate('/services')}
          className="w-full sm:w-auto px-12 py-4 border-2 border-white text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-none"
        >
          Explorer mes pôles
        </button>
      </div>
    </AnimatedSection>
  </div>

  {/* --- INDICATEUR DE SCROLL INDUSTRIEL --- */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2">
    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
    <div className="w-[1px] h-12 bg-gradient-to-b from-[#FF6B35] to-transparent" />
  </div>
</section>

{/* ================= 2. SECTION TECH MARQUEE : RUPTURE DE CONSTELLATION SANS COMPROMIS ================= */}
<section className="py-14 bg-white border-y border-slate-200 overflow-hidden relative z-20">
  <div className="flex whitespace-nowrap">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      className="flex items-center"
    >
      {[...techs, ...techs].map((tech, i) => (
        <div key={i} className="flex items-center gap-5 mx-12 group cursor-default">
          <span className="text-2xl text-slate-400 group-hover:text-[#FF6B35] transition-all duration-300 transform rounded-none">
            {tech.icon} 
          </span>
          <span className="text-xs md:text-sm font-black text-slate-600 group-hover:text-black transition-colors duration-300 uppercase tracking-[0.25em] font-mono">
            {tech.name}
          </span>
          <span className="ml-8 font-mono text-sm text-slate-200 group-hover:text-[#FF6B35] opacity-60">
            /
          </span>
        </div>
      ))}
    </motion.div>
  </div>
</section>



{/* ================= 3. SECTION BENTO SERVICES : INGÉNIERIE & PERFORMANCE ================= */}
<section className="py-24 px-6 relative overflow-hidden bg-[#0E243A] border-t border-white/5">
  
  {/* Décoration de fond : Grille Blueprint d'ingénieur */}
  <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
    style={{ 
      backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, 
      backgroundSize: '40px 40px' 
    }} 
  />

  {/* --- EN-TÊTE DE SECTION --- */}
  <div className="relative z-10 text-center mb-20 max-w-4xl mx-auto">
    <AnimatedSection variant="slideUp">
      <span className="text-[#FF6B35] font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">
        // Technical_Stack
      </span>
      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none"
          style={{ fontFamily: "'Antonio', sans-serif" }}>
        Expertise <span className="text-[#FF6B35] italic">Ingénierie</span>
      </h2>
      <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
        Solutions logicielles critiques et architectures distribuées conçues pour l'excellence opérationnelle et la haute disponibilité.
      </p>
    </AnimatedSection>
  </div>

  {/* --- GRILLE SERVICES CHIRURGICALE : STYLE GLASSMORPHISM --- */}
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {services.map((s, i) => (
      <motion.div 
        key={i}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        className={`${s.size || ''} relative p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm transition-all duration-500 hover:border-[#FF6B35]/40 flex flex-col justify-between min-h-[320px] group shadow-2xl`}
      >
        {/* Glow discret au survol */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Icône - S'illumine en orange au survol */}
            <div className="text-white text-3xl mb-8 transition-all duration-300 group-hover:text-[#FF6B35] group-hover:scale-110">
              {s.icon}
            </div>
            
            {/* Titre épuré en Blanc pur */}
            <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">
              {s.title}
            </h3>
            
            {/* Description en gris bleuté pour la lisibilité */}
            <p className="text-slate-400 text-sm leading-relaxed font-medium tracking-wide">
              {s.desc}
            </p>
          </div>

          {/* Indicateur de statut industriel en bas de carte */}
          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
            <span className="font-mono text-[10px] text-slate-500 group-hover:text-[#FF6B35] transition-colors duration-300 font-bold uppercase tracking-widest">
              &gt; system_0{i + 1}
            </span>
            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-[#FF6B35] text-sm font-black">
              →
            </span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      </>
  );
}
