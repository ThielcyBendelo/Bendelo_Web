import { about } from '../assets/assets.js';
import { profile1Image as irbendelo1 } from '../assets/assets.js';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';
import { FaGraduationCap, FaRocket, FaShieldAlt,FaCertificate,  FaExternalLinkAlt, FaUserCheck, FaTerminal, FaBookOpen, FaLightbulb, FaGlobeAfrica, FaQuoteLeft } from 'react-icons/fa';

const easeOut = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: easeOut },
  }),
};

const staggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const credentials = [
  // {
  //   type: "certification",
  //   title: "AWS Certified Solutions Architect",
  //   issuer: "Amazon Web Services (AWS)",
  //   date: "2025",
  //   id: "AUTH-AWS-8290X",
  //   status: "verified",
  //   icon: <FaShieldAlt />
  // },
  // {
  //   type: "certification",
  //   title: "MongoDB Certified Developer Associate",
  //   issuer: "MongoDB Inc.",
  //   date: "2024",
  //   id: "AUTH-MDB-9054Z",
  //   status: "verified",
  //   icon: <FaCertificate />
  // },
  {
    type: "formation",
    title: "Informatique de Gestion",
    issuer: "Institut Supérieur de Statistique ISS",
    date: "2020 - 2023",
    id: "DIPL-GL-243KS",
    status: "completed",
    icon: <FaGraduationCap />
  }
];
 
export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <>
      <motion.section
  ref={sectionRef}
  className="relative pt-32 pb-24 px-6 border-t border-white/5 bg-[#0A1622]"
>
  {/* --- MAILLAGE BLUEPRINT GÉOMÉTRIQUE STRICT EN ARRIÈRE-PLAN --- */}
  <div 
    className="absolute inset-0 z-0 opacity-10 pointer-events-none"
    style={{ 
      backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`, 
      backgroundSize: '45px 45px',
      backgroundPosition: 'center top'
    }} 
  />

  {/* Lignes de repères géométriques verticales style plan d'ingénierie */}
  <div className="absolute inset-0 z-10 opacity-10 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto w-full border-x border-white">
    <div className="border-r border-white h-full" />
    <div className="border-r border-white h-full" />
    <div className="border-r border-white h-full" />
  </div>

  <div className="max-w-7xl mx-auto relative z-20 w-full">
    
    {/* --- SECTION 1: HERO DUALITÉ --- */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-36">
      
      {/* Image avec cadre asymétrique technique - Strictement Carré */}
      <motion.div className="lg:col-span-5 relative" 
        initial={{ opacity: 0, x: -36 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: easeOut }}
      >
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          className="relative p-2 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-none group"
        >
          {/* Repères angulaires géométriques parfaits (sans arrondis) */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white rounded-none transition-all duration-300 group-hover:w-7 group-hover:h-7 group-hover:border-[#FF6B35]" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white rounded-none transition-all duration-300 group-hover:w-7 group-hover:h-7 group-hover:border-[#FF6B35]" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_50px_rgba(255,107,53,0.14)]" />
          
          <motion.div style={{ y: yImage }} className="overflow-hidden border border-white/10 bg-neutral-900 rounded-none">
            <LazyImage
              src={irbendelo1}
              alt="Bendelo Thielcy"
              className="w-full h-[500px] md:h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 rounded-none group-hover:scale-[1.03]"
            />
          </motion.div>
          
          {/* Indicateur de métrique minimaliste style log - Carré */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            whileHover={{ scale: 1.04, y: -2 }}
            className="absolute -bottom-6 -right-4 bg-white text-black px-4 py-2.5 border border-white/10 font-mono text-[10px] tracking-widest font-black uppercase rounded-none shadow-2xl"
          >
            [ENGAGEMENT: 100%]
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Contenu Texte Épuré Haute Visibilité */}
      <motion.div
        className="lg:col-span-7 space-y-8"
        variants={staggerParent}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div>
          <motion.span
            variants={fadeUp}
            custom={0}
            className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block"
          >
            // INGENIEUR • COACH • AUTEUR
          </motion.span>
          
          <motion.h1 
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none mb-8"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            CODER LE FUTUR, <br />
            <span className="text-[#FF6B35] italic inline-block hover:tracking-[0.06em] transition-all duration-500">
              ÉVEILLER L&apos;AFRIQUE
            </span>
          </motion.h1>
          
          {/* Bordure latérale repensée aux couleurs de l'architecture d'ingénierie */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="relative pl-6 border-l-2 border-[#FF6B35]/40 hover:border-[#FF6B35] transition-colors duration-500"
          >
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed tracking-wide italic">
              {about}
            </p>
          </motion.div>
        </div>

        {/* Tags atomiques de compétences - Style console rigide */}
        <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 pt-4">
          {["Software Engineering", "Mindset Coaching", "African Leadership", "Strategic Vision"].map((skill, i) => (
            <motion.span 
              key={i}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-white/[0.03] border border-white/10 font-mono font-bold text-[10px] text-slate-400 uppercase tracking-widest hover:border-[#FF6B35]/50 hover:text-[#FF6B35] transition-colors duration-300 cursor-default rounded-none"
            >
              &gt;_ {skill}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>

    <section 
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5" 
      id="credentials"
    >
      {/* --- MAILLAGE BLUEPRINT GÉOMÉTRIQUE STRICT EN ARRIÈRE-PLAN --- */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`, 
          backgroundSize: '45px 45px',
          backgroundPosition: 'center top'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* --- EN-TÊTE DE SECTION STYLE REGISTRE --- */}
        <motion.div
          className="text-center mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOut }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
            // ACADEMIC_&_PROFESSIONAL_LEDGER
          </span>
          
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            CERTIFICATIONS & <span className="text-[#FF6B35] italic">CURSUS</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Validation des compétences techniques et jalons académiques officiels garantissant l&apos;excellence et la conformité des architectures déployées.
          </p>
        </motion.div>

        {/* --- REGISTRE / TABLEAU DES CERTIFICATIONS RECTILIGNE --- */}
        <motion.div
          className="grid gap-4 max-w-5xl mx-auto w-full"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {credentials.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardReveal}
              whileHover={{ x: 8, scale: 1.01 }}
              whileTap={{ scale: 0.995 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="group relative p-6 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-colors duration-300 hover:border-[#FF6B35]/40 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-none shadow-2xl overflow-hidden"
            >
              {/* Micro-lueur angulaire d'arrière-plan au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />
              <div className="absolute left-0 top-0 h-full w-0 bg-[#FF6B35]/80 group-hover:w-[3px] transition-all duration-300" />

              {/* Colonne Gauche : Icône, Titre, Émetteur */}
              <div className="flex items-start gap-5 min-w-0 relative z-10">
                <div className="text-2xl text-slate-400 group-hover:text-[#FF6B35] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 mt-1 md:mt-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-white group-hover:tracking-[0.08em] transition-all duration-400">
                      {item.title}
                    </h3>
                    
                    {/* Badge de Type de Document Technique */}
                    <span className="font-mono font-bold text-[9px] px-2 py-0.5 border border-white/10 text-[#FF6B35] bg-[#FF6B35]/10 uppercase tracking-widest rounded-none">
                      {item.type}
                    </span>
                  </div>
                  
                  <p className="text-xs md:text-sm text-slate-400 font-medium tracking-wide group-hover:text-slate-300 transition-colors duration-300">
                    {item.issuer} <span className="mx-2 text-white/10">|</span> <span className="font-mono text-slate-500">{item.date}</span>
                  </p>
                </div>
              </div>

              {/* Colonne Droite : Signature Métrique et Statut d'Authenticité */}
              <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-white/5 font-mono text-[11px] relative z-10 w-full md:w-auto">
                
                {/* ID de registre / hash simulé */}
                <span className="text-slate-500 hidden sm:inline uppercase tracking-wider">
                  SYS_ID: <span className="text-slate-400 font-bold">{item.id}</span>
                </span>

                {/* Badge Statut style Commit Git réussi */}
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-0.5 border text-[10px] uppercase font-bold tracking-widest rounded-none ${
                    item.status === 'verified' 
                      ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' 
                      : 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                  }`}>
                    ● {item.status}
                  </span>
                  
                  {/* Flèche d'action discrète */}
                  <span className="text-slate-500 group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all duration-300">
                    <FaExternalLinkAlt className="text-xs" />
                  </span>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>

                       {/* --- SECTION 2: LES PILIERS RESPONSIVE (GRILLE SANS SCROLL MOBILE) --- */}
<div className="relative w-full z-10 mb-36">
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-1"
    variants={staggerParent}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {[
      { icon: <FaTerminal />, title: "Tech Architecture", subtitle: "MUAMOKEL AGENCY" },
      { icon: <FaBookOpen />, title: "Plume d'Éveil", subtitle: "Auteur d'ouvrages" },
      { icon: <FaGlobeAfrica />, title: "Impact Continental", subtitle: "Jeunesse Africaine" },
      { icon: <FaUserCheck />, title: "Haute Conscience", subtitle: "Coaching Holistique" }
    ].map((pillar, i) => (
      <motion.div
        key={i}
        variants={cardReveal}
        whileHover={{ y: -10, scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        className="relative p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-colors duration-300 hover:border-[#FF6B35]/40 flex flex-col justify-between min-h-[220px] w-full group rounded-none shadow-2xl overflow-hidden"
      >
        {/* Lueur angulaire fine au survol */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF6B35] group-hover:w-full transition-all duration-500" />

        <div>
          {/* Icône qui s'illumine en orange au survol */}
          <div className="text-2xl text-slate-400 mb-6 transition-all duration-300 group-hover:text-[#FF6B35] group-hover:scale-110 group-hover:-rotate-6 flex-shrink-0">
            {pillar.icon}
          </div>
          {/* Titre principal */}
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1 group-hover:tracking-[0.12em] transition-all duration-400 whitespace-nowrap">
            {pillar.title}
          </h3>
          {/* Sous-titre style log système */}
          <p className="text-[10px] font-mono font-bold text-[#FF6B35] uppercase tracking-widest whitespace-nowrap">
            // {pillar.subtitle}
          </p>
        </div>
        
        {/* Indexation de ligne numérique */}
        <div className="mt-6 flex justify-end font-mono font-bold text-[11px] text-slate-600 group-hover:text-[#FF6B35] transition-colors">
          <span>[0{i + 1}]</span>
        </div>
      </motion.div>
    ))}
  </motion.div>
</div>


          {/* --- SECTION 3: CTA IMPACT (Style Panneau de Contrôle Reste Sombre) --- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ scale: 1.005 }}
            className="border border-white/10 bg-white/[0.02] backdrop-blur-xl p-10 md:p-14 text-center relative overflow-hidden rounded-none shadow-2xl mb-24 z-10 group"
          >
            {/* Lignes de repères intérieures pour un look industriel renforcé */}
            <div className="absolute top-0 left-0 w-6 h-[2px] bg-[#FF6B35] group-hover:w-10 transition-all duration-500" />
            <div className="absolute top-0 left-0 w-[2px] h-6 bg-[#FF6B35] group-hover:h-10 transition-all duration-500" />
            <div className="absolute bottom-0 right-0 w-6 h-[2px] bg-[#FF6B35] group-hover:w-10 transition-all duration-500" />
            <div className="absolute bottom-0 right-0 w-[2px] h-6 bg-[#FF6B35] group-hover:h-10 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
                // ALIGNEMENT_STRATÉGIQUE
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase leading-none"
                  style={{ fontFamily: "'Antonio', sans-serif" }}>
                UNISSONS NOS FORCES POUR <span className="text-[#FF6B35] italic">L&apos;EXCELLENCE</span>
              </h2>
              
              <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                Que ce soit pour bâtir une infrastructure numérique de classe mondiale ou pour transformer votre vision de vie, je vous accompagne dans cette ascension.
              </p>
              
              {/* Boutons carrés industriels */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <motion.button
                  type="button"
                  onClick={() => navigate('/projects')}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 border border-white text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors duration-300 rounded-none"
                >
                  Voir mes réalisations
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => navigate('/contact')}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors duration-300 rounded-none shadow-[0_0_0_rgba(255,107,53,0)] hover:shadow-[0_12px_40px_rgba(255,107,53,0.25)]"
                >
                  Travailler ensemble
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Section d'affichage cartographique */}
          <GoogleMapsSection />
        </div>
      </motion.section>
    </>
  );
}

