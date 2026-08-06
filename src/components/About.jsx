import { about } from '../assets/assets.js';
import { profile1Image as irbendelo1 } from '../assets/assets.js';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';
import { FaGraduationCap, FaRocket, FaShieldAlt,FaCertificate,  FaExternalLinkAlt, FaUserCheck, FaTerminal, FaBookOpen, FaLightbulb, FaGlobeAfrica, FaQuoteLeft } from 'react-icons/fa';

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
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="relative p-2 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-none">
          {/* Repères angulaires géométriques parfaits (sans arrondis) */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white rounded-none" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white rounded-none" />
          
          <motion.div style={{ y: yImage }} className="overflow-hidden border border-white/10 bg-neutral-900 rounded-none">
            <LazyImage
              src={irbendelo1}
              alt="Bendelo Thielcy"
              className="w-full h-[500px] md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-none"
            />
          </motion.div>
          
          {/* Indicateur de métrique minimaliste style log - Carré */}
          <div className="absolute -bottom-6 -right-4 bg-white text-black px-4 py-2.5 border border-white/10 font-mono text-[10px] tracking-widest font-black uppercase rounded-none shadow-2xl">
            [ENGAGEMENT: 100%]
          </div>
        </div>
      </motion.div>

      {/* Contenu Texte Épuré Haute Visibilité */}
      <div className="lg:col-span-7 space-y-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
            // INGENIEUR • COACH • AUTEUR
          </span>
          
          <h1 
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none mb-8"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            CODER LE FUTUR, <br />
            <span className="text-[#FF6B35] italic">ÉVEILLER L'AFRIQUE</span>
          </h1>
          
          {/* Bordure latérale repensée aux couleurs de l'architecture d'ingénierie */}
          <div className="relative pl-6 border-l-2 border-[#FF6B35]/40">
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed tracking-wide italic">
              {about}
            </p>
          </div>
        </motion.div>

        {/* Tags atomiques de compétences - Style console rigide */}
        <div className="flex flex-wrap gap-3 pt-4">
          {["Software Engineering", "Mindset Coaching", "African Leadership", "Strategic Vision"].map((skill, i) => (
            <span 
              key={i} 
              className="px-4 py-2 bg-white/[0.03] border border-white/10 font-mono font-bold text-[10px] text-slate-400 uppercase tracking-widest hover:border-[#FF6B35]/50 hover:text-[#FF6B35] transition-all duration-300 cursor-default rounded-none"
            >
              &gt;_ {skill}
            </span>
          ))}
        </div>
      </div>
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
        <div className="text-center mb-20 max-w-4xl mx-auto">
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
            Validation des compétences techniques et jalons académiques officiels garantissant l'excellence et la conformité des architectures déployées.
          </p>
        </div>

        {/* --- REGISTRE / TABLEAU DES CERTIFICATIONS RECTILIGNE --- */}
        <div className="grid gap-4 max-w-5xl mx-auto w-full">
          {credentials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.995 }}
              className="group relative p-6 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-none shadow-2xl"
            >
              {/* Micro-lueur angulaire d'arrière-plan au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />

              {/* Colonne Gauche : Icône, Titre, Émetteur */}
              <div className="flex items-start gap-5 min-w-0 relative z-10">
                <div className="text-2xl text-slate-400 group-hover:text-[#FF6B35] group-hover:scale-110 transition-all duration-300 mt-1 md:mt-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-white">
                      {item.title}
                    </h3>
                    
                    {/* Badge de Type de Document Technique */}
                    <span className="font-mono font-bold text-[9px] px-2 py-0.5 border border-white/10 text-[#FF6B35] bg-[#FF6B35]/10 uppercase tracking-widest rounded-none">
                      {item.type}
                    </span>
                  </div>
                  
                  <p className="text-xs md:text-sm text-slate-400 font-medium tracking-wide">
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
                  <span className="text-slate-500 group-hover:text-[#FF6B35] group-hover:translate-x-0.5 transition-all duration-300">
                    <FaExternalLinkAlt className="text-xs" />
                  </span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>

                    {/* --- SECTION 2: LES PILIERS (Format Grille Industrielle) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-36 relative z-10">
            {[
              { icon: <FaTerminal />, title: "Tech Architecture", subtitle: "MUAMOKEL AGENCY" },
              { icon: <FaBookOpen />, title: "Plume d'Éveil", subtitle: "Auteur d'ouvrages" },
              { icon: <FaGlobeAfrica />, title: "Impact Continental", subtitle: "Jeunesse Africaine" },
              { icon: <FaUserCheck />, title: "Haute Conscience", subtitle: "Coaching Holistique" }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                className="relative p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 flex flex-col justify-between min-h-[220px] group rounded-none shadow-2xl"
              >
                {/* Lueur angulaire fine au survol */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />

                <div>
                  {/* Icône qui s'illumine en orange au survol */}
                  <div className="text-2xl text-slate-400 mb-6 transition-all duration-300 group-hover:text-[#FF6B35] group-hover:scale-110">
                    {pillar.icon}
                  </div>
                  {/* Titre principal */}
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1">
                    {pillar.title}
                  </h3>
                  {/* Sous-titre style log système */}
                  <p className="text-[10px] font-mono font-bold text-[#FF6B35] uppercase tracking-widest">
                    // {pillar.subtitle}
                  </p>
                </div>
                
                {/* Indexation de ligne numérique */}
                <div className="mt-6 flex justify-end font-mono font-bold text-[11px] text-slate-600 group-hover:text-[#FF6B35] transition-colors">
                  <span>[0{i + 1}]</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- SECTION 3: CTA IMPACT (Style Panneau de Contrôle Reste Sombre) --- */}
          <div className="border border-white/10 bg-white/[0.02] backdrop-blur-xl p-10 md:p-14 text-center relative overflow-hidden rounded-none shadow-2xl mb-24 z-10">
            {/* Lignes de repères intérieures pour un look industriel renforcé */}
            <div className="absolute top-0 left-0 w-6 h-[2px] bg-[#FF6B35]" />
            <div className="absolute top-0 left-0 w-[2px] h-6 bg-[#FF6B35]" />
            <div className="absolute bottom-0 right-0 w-6 h-[2px] bg-[#FF6B35]" />
            <div className="absolute bottom-0 right-0 w-[2px] h-6 bg-[#FF6B35]" />

            <div className="relative z-10">
              <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
                // ALIGNEMENT_STRATÉGIQUE
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase leading-none"
                  style={{ fontFamily: "'Antonio', sans-serif" }}>
                UNISSONS NOS FORCES POUR <span className="text-[#FF6B35] italic">L'EXCELLENCE</span>
              </h2>
              
              <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                Que ce soit pour bâtir une infrastructure numérique de classe mondiale ou pour transformer votre vision de vie, je vous accompagne dans cette ascension.
              </p>
              
              {/* Boutons carrés industriels */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <button
                  type="button"
                  onClick={() => navigate('/projects')}
                  className="w-full sm:w-auto px-8 py-4 border border-white text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-none"
                >
                  Voir mes réalisations
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[#FF6B35] hover:text-white transition-all duration-300 rounded-none"
                >
                  Travailler ensemble
                </button>
              </div>
            </div>
          </div>

          {/* Section d'affichage cartographique */}
          <GoogleMapsSection />
        </div>
      </motion.section>
    </>
  );
}

