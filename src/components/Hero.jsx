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
<section
  ref={elementRef}
  id="home"
  className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-16 overflow-hidden bg-[#0E243A]/75"
>
  {/* --- ARRIÈRE-PLAN : SLIDER ET OVERLAY MAT --- */}
  <div
    className="absolute inset-0 w-full h-full transition-all duration-1000 grayscale opacity-15"
    style={{
      backgroundImage: `url(${backgrounds[bgIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transform: `translateY(${scrollY * 0.4}px)`,
    }}
  />

 {/* Overlay de contraste technique en mode Bleu Céleste Sombre (Mat pro à 75%) */}
<div className="absolute inset-0 bg-[#0E243A]/75 z-10" />

{/* Lignes de grille structurelles discrètes (Style blueprint d'ingénieur adapté en blanc) */}
<div className="absolute inset-0 z-15 opacity-10 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto w-full border-x border-white">
  <div className="border-r border-white h-full" />
  <div className="border-r border-white h-full" />
  <div className="border-r border-white h-full" />
</div>


  <div className="relative z-20 max-w-5xl mx-auto px-4 py-16">
    
    {/* --- IMAGE DE PROFIL ENTIÈREMENT RÉINTÉGRÉE ET VISIBLE --- */}
    <AnimatedSection variant="fadeIn" delay={0.2}>
      <div className="mb-12 flex justify-center">
        <motion.div
          whileTap={{ scale: 0.99 }}
          className="relative p-2 border border-white/20 bg-white/5 backdrop-blur-sm"
        >
          {/* Cadre asymétrique technique blanc */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
          
          <LazyImage
            src={irThielcy}
            alt="Ir Bendelo Thielcy"
            className="w-40 h-40 md:w-48 md:h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-white/10"
            style={{ objectPosition: 'center 35%' }}
            priority={true}
            placeholder={
              <div className="w-40 h-40 md:w-48 md:h-48 bg-white/10 animate-pulse" />
            }
          />
        </motion.div>
      </div>
    </AnimatedSection>

    {/* --- BLOC TYPOGRAPHIQUE PRINCIPAL EN BLANC ÉCLATANT --- */}
    <AnimatedSection variant="slideUp" delay={0.4}>
      <div className="mb-12 text-center flex flex-col items-center">
        
        {/* Label de poste - Adapté en texte blanc atténué */}
        <span className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
          // Full-Stack Software Engineer
        </span>

        {/* Nom principal - Basculé en Blanc pur pour un impact maximal sur fond sombre */}
        <h1
          className="text-4xl md:text-7xl font-bold mb-6 text-white uppercase tracking-wider leading-none"
          style={{ fontFamily: "'Antonio', sans-serif" }}
        >
          Bendelo Thielcy<span className="text-[#FF6B35]">.</span>
        </h1>

        {/* Corps de texte : Hiérarchie blanche claire, visible et pro */}
        <div className="max-w-3xl space-y-5">
          {/* Description principale passée en blanc pur */}
          <p className="text-lg md:text-2xl text-white font-normal tracking-wide leading-relaxed">
            Associé & Entrepreneur Digital spécialisé dans la <span className="underline decoration-1 underline-offset-4 decoration-[#FF6B35]">conception de systèmes</span> haute performance.
          </p>
          
          {/* Description technique clé en Orange vibrant */}
          <p className="text-base md:text-lg text-[#FF6B35] max-w-3xl mx-auto leading-relaxed font-semibold tracking-wide">
            Expertise avancée en écosystèmes Web & Mobile pour architectures distribuées et applications critiques.
          </p>
          
          {/* Citation / Baseline passée en blanc pur adouci */}
          <p className="text-xs md:text-sm text-white/70 max-w-xl mx-auto italic font-mono pt-2">
            "Fusionner l'excellence technique et l'éveil humain pour bâtir l'avenir."
          </p>
        </div>

        {/* Badge Agence - Style Pro Console */}
        <div className="mt-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/20 bg-white/5 font-black text-[10px] text-white tracking-wider rounded">
            <span className="w-1.5 h-1.5 bg-[#FF6B35]" />
            <span>ROLE: INNOVATION LEAD @ <span className="text-white font-black">MUAMOKEL AGENCY</span></span>
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* --- UTILS / BOUTONS D'ACTION (Strictement identiques à votre structure) --- */}
    <AnimatedSection variant="slideUp" delay={0.8}>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={() => navigate('/contact')}
          className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors"
        >
          Me contacter
        </button>

        <button
          onClick={() => navigate('/services')}
          className="w-full sm:w-auto px-10 py-4 border border-white text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300"
        >
          Explorer mes poles
        </button>
      </div>
    </AnimatedSection>
  </div>

  {/* --- SCROLL INDICATOR INDUSTRIEL --- */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2">
    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
  </div>
</section>


 {/* SECTION TECH MARQUEE (Défilement infini) */}
<section className="py-12 bg-white border-t border-orange-500/40 overflow-hidden">
  <div className="flex whitespace-nowrap">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      className="flex items-center"
    >
      {[...techs, ...techs].map((tech, i) => (
        <div key={i} className="flex items-center gap-4 mx-10 group cursor-default">
          
          {/* Icône monochrome épurée - Reste discrète et s'illumine en orange au survol */}
          <span className="text-xl text-slate-500 group-hover:text-orange-500 transition-colors duration-300">
            {tech.icon} 
          </span>

          {/* Nom de la technologie - Typographie claire passée en Slate/Bleu de nuit */}
          <span className="text-xs md:text-sm font-bold text-slate-600 group-hover:text-[#0A1128] transition-colors duration-300 uppercase tracking-widest font-mono">
            {tech.name}
          </span>

          {/* Séparateur de design industriel (Style Terminal / Pipeline) adapté au fond clair */}
          <span className="ml-6 font-mono text-xs text-slate-300 group-hover:text-orange-500 transition-colors duration-300">
            |
          </span>
        </div>
      ))}
    </motion.div>
  </div>
</section>

{/* --- EN-TÊTE DE SECTION : TITRE & DESCRIPTION (Visibilité et Contraste Max) --- */}
<section className="bg-[rgb(224,233,233)] py-20 px-6 max-w-7xl mx-auto relative z-20  border-t border-orange-500/40">
<div className="mt-32 text-center px-6 max-w-4xl mx-auto relative z-10">
  <motion.h2 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-3xl md:text-5xl font-black mb-6 text-[#0A1128] uppercase tracking-wider leading-tight"
  >
    Au-delà du <span className="underline decoration-1 underline-offset-8 decoration-orange-500">Code</span>, l'Humain.
  </motion.h2>
  <motion.p 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    viewport={{ once: true }}
    className="text-base md:text-lg text-slate-950 font-black tracking-wide leading-relaxed max-w-2xl mx-auto"
  >
    Je ne construis pas seulement des systèmes logiciels performants. Je développe des écosystèmes de pensée pour catalyser l'émergence d'une nouvelle génération de leaders africains.
  </motion.p>
</div>

{/* --- SECTION DOUBLE IDENTITÉ : CARTES ARCHITECTURALES ENRICHIES --- */}
<AnimatedSection variant="slideUp" delay={0.3}>
  <div className="py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-10">
    
    {/* CARTE 1 : ÉVEILLEUR (Avec bouton intégré et logs) */}
    <motion.div 
      whileTap={{ scale: 0.99 }}
      className="group relative p-8 border border-slate-300 bg-white transition-colors duration-300 hover:border-orange-500 flex flex-col justify-between min-h-[480px]"
    >
      <div className="space-y-6">
        <div className="text-[#0A1128] text-2xl transition-transform duration-300 group-hover:-translate-y-1">
          <FaLightbulb />
        </div>
        
        <div>
          <h4 className="text-xl font-bold uppercase tracking-wider text-[#0A1128] mb-3">
            Éveilleur de Conscience
          </h4>
          <p className="text-slate-700 text-sm leading-relaxed font-black tracking-wide mb-4">
            Catalyser le potentiel de la jeunesse africaine par une approche systémique du leadership et du mindset stratégique. Déconstruire les barrières mentales pour activer une productivité à fort impact.
          </p>
        </div>

        {/* Complément de description style terminal adapté au fond clair */}
        <div className="pt-4 border-t border-slate-200 font-orange text-[15px] text-slate-700 space-y-1">
          <p>&gt;_ FOCUS: Décolonisation mentale &amp; Soft skills</p>
          <p>&gt;_ METRIC: Alignement de la vision stratégique</p>
        </div>
      </div>
      
      {/* Bouton d'action intégré à la carte */}
      <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">// CORE_PROGRAM</span>
        <button 
          onClick={() => navigate('/work')}
          className="w-full sm:w-auto px-6 py-3 border border-slate-950 text-slate-950 font-bold uppercase text-[10px] tracking-widest hover:bg-slate-950 hover:text-white transition-all"
        >
          Coaching &amp; Vision
        </button>
      </div>
    </motion.div>

    {/* CARTE 2 : AUTEUR (Avec bouton intégré et logs) */}
    <motion.div 
      whileTap={{ scale: 0.99 }}
      className="group relative p-8 border border-slate-300 bg-white transition-colors duration-300 hover:border-orange-500 flex flex-col justify-between min-h-[480px]"
    >
      <div className="space-y-6">
        <div className="text-[#0A1128] text-2xl transition-transform duration-300 group-hover:-translate-y-1">
          <FaBookOpen />
        </div>
        
        <div>
          <h4 className="text-xl font-bold uppercase tracking-wider text-[#0A1128] mb-3">
            Plume d'Impact
          </h4>
          <p className="text-slate-950 text-sm leading-relaxed font-black tracking-wide mb-4">
            Transmettre des architectures de pensée à travers des ouvrages dédiés à la transformation intérieure profonde. Coder des manifestes littéraires pour ancrer la souveraineté intellectuelle et le succès.
          </p>
        </div>

        {/* Complément de description style terminal adapté au fond clair */}
        <div className="pt-4 border-t border-slate-200 font-orange text-[15px] text-slate-700 space-y-1">
          <p>&gt;_ EDITION: Ouvrages de transformation</p>
          <p>&gt;_ TARGET: Leadership &amp; Souveraineté africaine</p>
        </div>
      </div>

      {/* Bouton d'action intégré à la carte */}
      <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">// LIT_LEDGER</span>
        <button 
          onClick={() => navigate('/projects')}
          className="w-full sm:w-auto px-6 py-3 bg-slate-950 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-colors"
        >
          Explorer mes projets
        </button>
      </div>
    </motion.div>
    
  </div>
</AnimatedSection>
</section>

{/* SECTION BENTO SERVICES */}
<section className="py-24 px-6 max-w-7xl mx-auto relative z-20 bg-[rgb(224,233,233)]  border-t border-orange-500/40">
  
  {/* --- EN-TÊTE DE SECTION --- */}
  <div className="text-center mb-20">
    <AnimatedSection variant="slideUp">
      <span className="text-slate-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
        Mes Services
      </span>
      <h2 className="text-3xl md:text-5xl font-black text-[#0A1128] mb-6 tracking-widest uppercase text-xs">
        Expertise <span className="underline decoration-1 underline-offset-8 decoration-orange-500">Ingénierie</span>
      </h2>
      <p className="text-base md:text-lg text-slate-950 font-black tracking-wide leading-relaxed max-w-2xl mx-auto">
        Solutions logicielles critiques et architectures distribuées conçues pour l'excellence opérationnelle.
      </p>
    </AnimatedSection>
  </div>

  {/* --- GRILLE SERVICES CHIRURGICALE --- */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {services.map((s, i) => (
      <motion.div 
        key={i}
        whileTap={{ scale: 0.99 }}
        className={`${s.size || ''} relative p-8 border border-slate-300 bg-white transition-colors duration-300 hover:border-orange-500 flex flex-col justify-between min-h-[300px] group`}
      >
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Icône brute sans background coloré */}
            <div className="text-[#0A1128] text-3xl mb-6 transition-colors duration-300 group-hover:text-orange-500">
              {s.icon}
            </div>
            
            {/* Titre épuré en Capitales */}
            <h3 className="text-lg font-black uppercase tracking-wider text-[#0A1128] mb-3">
              {s.title}
            </h3>
            
            {/* Description claire et contrastée */}
            <p className="text-slate-700 text-sm leading-relaxed font-black tracking-wide mb-4">
              {s.desc}
            </p>
          </div>

          {/* Indicateur de statut / design industriel discret en bas de carte */}
          <div className="mt-6 flex justify-end text-slate-400 group-hover:text-orange-500 transition-colors duration-300 text-[15px] font-orange font-bold">
            <span>// service_0{i + 1}</span>
            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-orange-500 text-xs">→</span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      </>
  );
}
