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
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const easeOut = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: easeOut },
  }),
};

const staggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

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
{/* ================= 1. SECTION HERO : ARCHITECTURE BLEU CÉLESTE & ORANGE ================= */}
<section
  ref={elementRef}
  id="home"
  className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-16 overflow-hidden bg-[#0E243A]"
>
  {/* --- ARRIÈRE-PLAN : SLIDER ET OVERLAY MAT --- */}
  <div
    className="absolute inset-0 w-full h-full transition-all duration-1000 grayscale opacity-10"
    style={{
      backgroundImage: `url(${backgrounds[bgIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transform: `translateY(${scrollY * 0.4}px)`,
    }}
  />

  {/* Overlay de contraste technique (Mat pro à 75% pour profondeur) */}
  <div className="absolute inset-0 bg-[#0E243A]/75 z-10" />

  {/* Lignes de grille structurelles discrètes (Style blueprint d'ingénieur) */}
  <div className="absolute inset-0 z-15 opacity-10 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto w-full border-x border-white/20">
    <div className="border-r border-white/20 h-full" />
    <div className="border-r border-white/20 h-full" />
    <div className="border-r border-white/20 h-full" />
  </div>

  <motion.div
    className="relative z-20 max-w-5xl mx-auto px-4 py-16"
    variants={staggerParent}
    initial="hidden"
    animate="visible"
  >
    
    {/* --- IMAGE DE PROFIL : CADRE ARCHITECTURAL --- */}
    <motion.div variants={fadeUp} custom={0} className="mb-12 flex justify-center">
      <motion.div
        whileHover={{ scale: 1.03, rotate: 0.4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="relative p-2 border border-white/20 bg-white/5 backdrop-blur-sm group"
      >
        {/* Cadre asymétrique technique blanc */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-[#FF6B35]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-[#FF6B35]" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_40px_rgba(255,107,53,0.18)]" />
        
        <LazyImage
          src={irThielcy}
          alt="Ir Bendelo Thielcy"
          className="w-40 h-40 md:w-48 md:h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10 group-hover:scale-[1.02]"
          style={{ objectPosition: 'center 35%' }}
          priority={true}
        />
      </motion.div>
    </motion.div>

    {/* --- BLOC TYPOGRAPHIQUE PRINCIPAL --- */}
    <div className="mb-12 text-center flex flex-col items-center">
      
      <motion.span
        variants={fadeUp}
        custom={1}
        className="text-white/60 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block"
      >
        // Principal Software Engineer
      </motion.span>

      <motion.h1
        variants={fadeUp}
        custom={2}
        className="text-5xl md:text-6xl font-black mb-6 text-white uppercase tracking-wider leading-none"
        style={{ fontFamily: "'Antonio', sans-serif" }}
      >
        <span className="inline-block hover:tracking-[0.08em] transition-all duration-500">
          Bendelo
        </span>
        <span className="inline-block hover:tracking-[0.08em] transition-all duration-500 text-[#FF6B35] italic">Thielcy</span>
        <motion.span
          className="text-[#FF6B35] inline-block"
          animate={{ opacity: [1, 0.45, 1], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          .
        </motion.span>
      </motion.h1>

      <div className="max-w-3xl space-y-6">
        <motion.p
          variants={fadeUp}
          custom={3}
          className="text-lg md:text-3xl text-white font-light leading-snug"
        >
          Associé & Entrepreneur Digital spécialisé dans la conception{' '}
          <span className="font-bold italic border-b-2 border-[#FF6B35]/50 hover:border-[#FF6B35] transition-colors duration-300">
           d'écosystèmes numériques complexes
          </span>{' '}
          scalables & sécurisées        </motion.p>
        
        <motion.p
          variants={fadeUp}
          custom={4}
          className="text-base md:text-lg text-[#FF6B35] max-w-2xl mx-auto leading-relaxed font-black uppercase tracking-widest"
        >
          Expert dans la digitalisation des processus métier.       </motion.p>
        
        <motion.p
          variants={fadeUp}
          custom={5}
          className="text-xs md:text-sm text-white/50 max-w-xl mx-auto italic font-mono pt-2"
        >
          &quot;Fusionner l&apos;excellence technique et l&apos;éveil humain pour bâtir l&apos;avenir.&quot;
        </motion.p>
      </div>

      {/* Badge Agence Style Console */}
      <motion.div variants={fadeUp} custom={6} className="mt-12">
        <motion.div
          whileHover={{ scale: 1.03, borderColor: 'rgba(255,107,53,0.45)' }}
          className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/5 font-bold text-[10px] text-white tracking-[0.2em] rounded-sm transition-colors duration-300"
        >
          <span className="w-1.5 h-1.5 bg-[#FF6B35] animate-pulse" />
          <span>ID: INNOVATION_LEAD @ <span className="text-white font-black">MUAMOKEL AGENCY</span></span>
        </motion.div>
      </motion.div>
    </div>

    {/* --- BOUTONS D'ACTION --- */}
    <motion.div
      variants={fadeUp}
      custom={7}
      className="flex flex-col sm:flex-row gap-5 justify-center items-center"
    >
      <motion.button
        type="button"
        onClick={() => navigate('/contact')}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto px-12 py-4 bg-white text-[#0A1128] font-black uppercase text-xs tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors duration-300 shadow-[0_0_0_rgba(255,107,53,0)] hover:shadow-[0_12px_40px_rgba(255,107,53,0.25)]"
      >
        Me contacter
      </motion.button>

      <motion.button
        type="button"
        onClick={() => navigate('/services')}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto px-12 py-4 border-2 border-white text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
      >
        Explorer mes pôles
      </motion.button>
    </motion.div>
  </motion.div>

  {/* --- INDICATEUR DE SCROLL --- */}
  <motion.div
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
    animate={{ y: [0, 8, 0], opacity: [0.55, 1, 0.55] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <div className="w-[1px] h-14 bg-gradient-to-b from-[#FF6B35] to-transparent" />
    <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/40">scroll</span>
  </motion.div>
</section>

    {/* ================= 2. SECTION TECH MARQUEE COMPACTE & SOMBRE ================= */}
    <section className="py-8 bg-[#0A1622] border-y border-white/5 overflow-hidden relative w-full">
      
      {/* Masques de fondu discrets sur les côtés pour adoucir le défilement */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0A1622] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0A1622] to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center"
        >
          {[...techs, ...techs].map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="flex items-center gap-3.5 mx-8 group cursor-default select-none"
            >
              {/* Icône technologique - Passe de Slate à Orange au survol */}
              <span className="text-xl text-slate-400 group-hover:text-[#FF6B35] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(255,107,53,0.3)]">
                {tech.icon} 
              </span>

              {/* Nom de la technologie - Gris clair à Blanc pur au survol */}
              <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors duration-300 uppercase tracking-[0.15em] font-mono">
                {tech.name}
              </span>

              {/* Séparateur Minimaliste en pipeline */}
              <span className="ml-6 font-mono text-[10px] text-slate-700 group-hover:text-[#FF6B35]/40 transition-colors duration-300">
                //
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>


{/* ================= 2. SECTION DOUBLE IDENTITÉ : ÉVEILLEUR & AUTEUR ================= */}
<section className="bg-[#0E243A] py-24 px-6 relative overflow-hidden border-t border-white/5">
  
  {/* Décoration d'arrière-plan subtile (Style circuit/blueprint) */}
  <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
    <div className="w-full h-full" style={{ 
      backgroundImage: 'radial-gradient(#00A3E0 1px, transparent 1px)', 
      backgroundSize: '30px 30px' 
    }} />
  </div>

  {/* --- EN-TÊTE DE SECTION --- */}
  <div className="relative z-10 text-center max-w-4xl mx-auto mb-20">
    <motion.h2 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: easeOut }}
      viewport={{ once: true, amount: 0.4 }}
      className="text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tighter leading-none"
      style={{ fontFamily: "'Antonio', sans-serif" }}
    >
      Au-delà du <span className="text-[#FF6B35] italic">Code</span>, l&apos;Humain.
    </motion.h2>
    
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.6, ease: easeOut }}
      viewport={{ once: true, amount: 0.4 }}
      className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
    >
      Je ne construis pas seulement des systèmes logiciels performants. Je développe des écosystèmes de pensée pour catalyser l&apos;émergence d&apos;une nouvelle génération de leaders.
    </motion.p>
  </div>

  {/* --- GRILLE DE CARTES ARCHITECTURALES RESPONSIVE --- */}
<motion.div 
  variants={staggerParent}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-6xl mx-auto w-full"
>
  
  {/* CARTE 1 : ÉVEILLEUR DE CONSCIENCE */}
  <motion.div 
    variants={cardReveal}
    whileHover={{ y: -12, scale: 1.01 }}
    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    className="group relative p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm flex flex-col justify-between min-h-[500px] w-full transition-colors duration-500 hover:border-[#FF6B35]/50 shadow-2xl overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF6B35]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    <div className="space-y-8 relative z-10">
      <motion.div
        whileHover={{ rotate: -8, scale: 1.12 }}
        className="w-14 h-14 bg-[#FF6B35]/10 rounded-full flex items-center justify-center text-[#FF6B35] text-3xl group-hover:scale-110 transition-transform duration-300"
      >
        <FaLightbulb className="animate-pulse" />
      </motion.div>
      
      <div>
        <h4 className="text-2xl font-bold uppercase tracking-widest text-white mb-4 group-hover:tracking-[0.12em] transition-all duration-500">
          Éveilleur de <span className="text-[#FF6B35]">Conscience</span>
        </h4>
        <p className="text-slate-400 text-base leading-relaxed font-medium group-hover:text-slate-300 transition-colors duration-300">
          Catalyser le potentiel de la jeunesse africaine par une approche systémique du leadership et du mindset stratégique. Déconstruire les barrières mentales pour activer une productivité à fort impact.
        </p>
      </div>

      {/* Style Terminal Info */}
      <div className="pt-6 border-t border-white/5 font-mono text-[11px] text-slate-500 space-y-2 uppercase tracking-widest">
        <p className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"><span className="text-[#FF6B35] font-black">&gt;</span> Focus: Décolonisation Mentale</p>
        <p className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 delay-75"><span className="text-[#FF6B35] font-black">&gt;</span> Objectif: Souveraineté Intellectuelle</p>
      </div>
    </div>
    
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6 relative z-10">
      <span className="font-mono text-[9px] text-[#FF6B35] font-bold tracking-[0.3em]">CORE_SYSTEM_01</span>
      <motion.button 
        type="button"
        onClick={() => navigate('/work')}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors duration-300"
      >
        Vision Stratégique
      </motion.button>
    </div>
  </motion.div>

  {/* CARTE 2 : PLUME D'IMPACT (AUTEUR) */}
  <motion.div 
    variants={cardReveal}
    whileHover={{ y: -12, scale: 1.01 }}
    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    className="group relative p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm flex flex-col justify-between min-h-[500px] w-full transition-colors duration-500 hover:border-[#FF6B35]/50 shadow-2xl overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF6B35]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    <div className="space-y-8 relative z-10">
      <motion.div
        whileHover={{ rotate: 8, scale: 1.12 }}
        className="w-14 h-14 bg-[#FF6B35]/10 rounded-full flex items-center justify-center text-[#FF6B35] text-3xl group-hover:scale-110 transition-transform duration-300"
      >
        <FaBookOpen />
      </motion.div>
      
      <div>
        <h4 className="text-2xl font-bold uppercase tracking-widest text-white mb-4 group-hover:tracking-[0.12em] transition-all duration-500">
          Plume d&apos;<span className="text-[#FF6B35]">Impact</span>
        </h4>
        <p className="text-slate-400 text-base leading-relaxed font-medium group-hover:text-slate-300 transition-colors duration-300">
          Transmettre des architectures de pensée à travers des ouvrages dédiés à la transformation intérieure profonde. Coder des manifestes littéraires pour ancrer le succès et le leadership.
        </p>
      </div>

      {/* Style Terminal Info */}
      <div className="pt-6 border-t border-white/5 font-mono text-[11px] text-slate-500 space-y-2 uppercase tracking-widest">
        <p className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"><span className="text-[#FF6B35] font-black">&gt;</span> Edition: Ouvrages de Leadership</p>
        <p className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 delay-75"><span className="text-[#FF6B35] font-black">&gt;</span> Statut: En cours de publication</p>
      </div>
    </div>

    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6 relative z-10">
      <span className="font-mono text-[9px] text-[#FF6B35] font-bold tracking-[0.3em]">LIT_LEDGER_02</span>
      <motion.button 
        type="button"
        onClick={() => navigate('/projects')}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto px-8 py-3 bg-transparent border border-white text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
      >
        Consulter les Livres
      </motion.button>
    </div>
  </motion.div>

  
  </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: easeOut }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <span className="text-[#FF6B35] font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">
        // Technical_Stack
      </span>
      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none"
          style={{ fontFamily: "'Antonio', sans-serif" }}>
        Expertise <span className="text-[#FF6B35] italic">Ingénierie</span>
      </h2>
      <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
        Solutions logicielles critiques et architectures distribuées conçues pour l&apos;excellence opérationnelle et la haute disponibilité.
      </p>
    </motion.div>
  </div>

  {/* --- GRILLE SERVICES RESPONSIVE --- */}
  <div className="relative w-full z-10 max-w-7xl mx-auto">
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 w-full"
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {services.map((s, i) => (
        <motion.div 
          key={i}
          variants={cardReveal}
          whileHover={{ y: -10, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          className={`${s.size || ''} relative p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm transition-colors duration-500 hover:border-[#FF6B35]/40 flex flex-col justify-between min-h-[320px] w-full group shadow-2xl overflow-hidden`}
        >
          {/* Glow discret au survol */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF6B35] group-hover:w-full transition-all duration-500" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* Icône - S'illumine en orange au survol */}
              <div className="text-white text-3xl mb-8 transition-all duration-300 group-hover:text-[#FF6B35] group-hover:scale-110 group-hover:-rotate-6">
                {s.icon}
              </div>
              
              {/* Titre épuré en Blanc pur */}
              <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4 group-hover:tracking-[0.14em] transition-all duration-500">
                {s.title}
              </h3>
              
              {/* Description en gris bleuté pour la lisibilité */}
              <p className="text-slate-400 text-sm leading-relaxed font-medium tracking-wide group-hover:text-slate-300 transition-colors duration-300">
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
    </motion.div>
  </div>
</section>

     </>
  );
}
