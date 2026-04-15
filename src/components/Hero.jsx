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
  FaCloud // On utilise ce nom court
} from 'react-icons/fa';



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
    <section
      ref={elementRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-5 mt-15 overflow-hidden"
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

 {/* Titre d'accueil avec typographie Premium */}
<AnimatedSection variant="slideUp" delay={0.4}>
  <div className="mb-12 text-center flex flex-col items-center">
    
    {/* Label de poste - Plus pro, plus discret */}
    <motion.span 
      initial={{ opacity: 0, letterSpacing: "0.1em" }}
      animate={{ opacity: 1, letterSpacing: "0.3em" }}
      className="text-orange-500 uppercase text-xs md:text-sm font-black mb-4 tracking-[0.3em]"
    >
      Principal Software Engineer
    </motion.span>

    {/* Nom avec dégradé sophistiqué */}
    <motion.h1
      className="text-5xl md:text-8xl font-black mb-6 bg-gradient-to-b from-white via-white to-orange-500 text-transparent bg-clip-text leading-[0.9] tracking-tighter"
      style={{ fontFamily: "'Antonio', sans-serif" }}
    >
      Bendelo Thielcy<span className="text-orange-600">.</span>
    </motion.h1>

    {/* Description du rôle - Hiérarchie améliorée */}
    <div className="max-w-3xl space-y-6">
      <p className="text-xl md:text-3xl text-white font-light leading-snug">
        Associé & Entrepreneur Digital spécialisé dans la <span className="font-bold italic">conception de systèmes</span> haute performance.
      </p>
      
      <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
        Expertise avancée en écosystèmes <span className="text-white border-b border-blue-500/50">Web</span> & <span className="text-white border-b border-purple-500/50">Mobile</span> pour architectures distribuées.
      </p>
    </div>

    {/* Badge Agence - Look "Glassmorphism" épuré */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-10"
    >
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        <p className="text-sm md:text-base text-slate-200 font-semibold tracking-wide">
          Innovation Lead chez <span className="text-orange-500 uppercase font-black">Muamokel Agency</span>
        </p>
      </div>
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

    {/* SECTION TECH MARQUEE (Défilement infini) */}
<div className="py-12 bg-slate-950 border-y border-white/5 overflow-hidden">
  <div className="flex whitespace-nowrap">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="flex items-center"
    >
      {[...techs, ...techs].map((tech, i) => (
        <div key={i} className="flex items-center gap-3 mx-10 group">
          {/* Correction ici : On accède à tech.icon et tech.name */}
          <span className="text-3xl transition-transform group-hover:scale-125 duration-300">
            {tech.icon} 
          </span>
          <span className="text-xl font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">
            {tech.name}
          </span>
        </div>
      ))}
    </motion.div>
  </div>
</div>

{/* SECTION BENTO SERVICES */}
<section className="py-20 px-6 max-w-7xl mx-auto relative z-20 ">
  <div className="text-center mb-20">
    <AnimatedSection variant="slideUp">
      <h2 className="text-4xl md:text-6xl font-white text-gray-400 dark:text-white mb-6 italic uppercase tracking-tighter">
        Expertise <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Ingénierie</span><span className="text-orange-500">.</span>
      </h2>
      <p className="text-gray-400 dark:text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed font-normal">
        Solutions logicielles critiques et architectures distribuées conçues pour l'excellence opérationnelle.
      </p>
    </AnimatedSection>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {services.map((s, i) => (
      <motion.div 
        key={i}
        whileHover={{ y: -12 }}
        className={`${s.size} relative p-10 rounded-[2.5rem] 
          bg-transparent
          backdrop-blur-xl border border-slate-200/50 dark:border-white/10
          shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
          transition-all duration-500 group overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 dark:bg-orange-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700" />

        <div className="relative z-10">
          <div className="bg-gradient-to-br from-orange-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            {s.icon}
          </div>
          
          {/* Titre : Blanc pur (dark:text-white) pour un contraste maximal */}
          <h3 className="text-2xl font-white text-gray-400 dark:text-purple mb-4 tracking-tight uppercase italic transition-colors">
            {s.title}
          </h3>
          
          {/* Description : Gris perle (dark:text-slate-200) pour une lecture reposante mais nette */}
          <p className="text-gray-400 dark:text-slate-800 text-base leading-relaxed font-medium group-hover:text-gray-400 dark:group-hover:text-white transition-colors">
            {s.desc}
          </p>
        </div>

        <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/20 rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
      </motion.div>
    ))}
  </div>
</section>

      </>
  );
}
