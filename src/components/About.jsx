import { about } from '../assets/assets.js';
import { profile1Image as irbendelo1 } from '../assets/assets.js';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';
import { FaGraduationCap, FaRocket, FaShieldAlt,FaCertificate,  FaExternalLinkAlt, FaUserCheck, FaTerminal, FaBookOpen, FaLightbulb, FaGlobeAfrica, FaQuoteLeft } from 'react-icons/fa';

const credentials = [
  {
    type: "certification",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services (AWS)",
    date: "2025",
    id: "AUTH-AWS-8290X",
    status: "verified",
    icon: <FaShieldAlt />
  },
  {
    type: "certification",
    title: "MongoDB Certified Developer Associate",
    issuer: "MongoDB Inc.",
    date: "2024",
    id: "AUTH-MDB-9054Z",
    status: "verified",
    icon: <FaCertificate />
  },
  {
    type: "formation",
    title: "Génie Logiciel & Systèmes Distribués",
    issuer: "Institut Supérieur Technique",
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
        className="relative pt-32 pb-24 px-6 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#09090b]"
      >
        {/* Lignes de repères géométriques style plan d'ingénierie */}
        <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto w-full border-x border-slate-200 dark:border-white/10">
          <div className="border-r border-slate-200 dark:border-white/10 h-full" />
          <div className="border-r border-slate-200 dark:border-white/10 h-full" />
          <div className="border-r border-slate-200 dark:border-white/10 h-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* --- SECTION 1: HERO DUALITÉ --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-36">
            
            {/* Image avec cadre asymétrique technique */}
            <motion.div className="lg:col-span-5 relative" 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative p-2 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-950 dark:border-white" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-950 dark:border-white" />
                
                <motion.div style={{ y: yImage }} className="overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-neutral-900">
                  <LazyImage
                    src={irbendelo1}
                    alt="Bendelo Thielcy"
                    className="w-full h-[500px] md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </motion.div>
                
                {/* Indicateur de métrique minimaliste style log */}
                <div className="absolute -bottom-6 -right-4 bg-slate-950 dark:bg-white text-white dark:text-black px-4 py-2 border border-slate-200 dark:border-white/10 font-mono text-[10px] tracking-wider font-bold">
                  [ENGAGEMENT: 100%]
                </div>
              </div>
            </motion.div>

            {/* Contenu Texte Épuré */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
                <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
                  // Ingénieur • Coach • Auteur
                </span>
                
                <h1 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white uppercase tracking-widest leading-tight mb-8">
                  Coder le futur, <br />
                  <span className="underline decoration-1 underline-offset-8">Éveiller l'Afrique</span>
                </h1>
                
                <div className="relative pl-6 border-l border-slate-200 dark:border-white/10">
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal tracking-wide italic">
                    {about}
                  </p>
                </div>
              </motion.div>

              {/* Tags atomiques de compétences */}
              <div className="flex flex-wrap gap-2">
                {["Software Engineering", "Mindset Coaching", "African Leadership", "Strategic Vision"].map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:border-slate-400 dark:hover:border-white/30 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <section 
      className="py-24 px-6 border-t border-slate-200 dark:border-white/10" 
      style={{ backgroundColor: 'var(--bg)' }} 
      id="credentials"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-20">
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Academic & Professional Ledger
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Certifications & <span className="underline decoration-1 underline-offset-8">Cursus</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-slate-600 dark:text-slate-400 font-normal tracking-wide leading-relaxed">
            Validation des compétences techniques et jalons académiques garantissant l'excellence des architectures déployées.
          </p>
        </div>

        {/* --- REGISTRE / TABLEAU DES CERTIFICATIONS --- */}
        <div className="grid gap-4 max-w-5xl mx-auto">
          {credentials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.995 }}
              className="group relative p-6 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-colors duration-200 hover:border-slate-400 dark:hover:border-white/30 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Colonne Gauche : Icône, Titre, Émetteur */}
              <div className="flex items-start gap-5 min-w-0">
                <div className="text-xl text-slate-400 group-hover:text-orange-500 transition-colors duration-300 mt-1 md:mt-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-slate-950 dark:text-white">
                      {item.title}
                    </h3>
                    {/* Badge de Type de Document */}
                    <span className="font-mono text-[8px] px-1.5 py-0.5 border border-slate-200 dark:border-white/5 text-slate-400 bg-white dark:bg-white/5 uppercase">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal tracking-wide">
                    {item.issuer} <span className="mx-2 text-slate-300 dark:text-white/10">|</span> {item.date}
                  </p>
                </div>
              </div>

              {/* Colonne Droite : Signature Métrique et Statut d'Authenticité */}
              <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-slate-200/50 dark:border-white/5 font-mono text-[10px]">
                
                {/* ID de registre / hash simulé */}
                <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">
                  ID: {item.id}
                </span>

                {/* Badge Statut style commit Git réussi */}
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider ${
                    item.status === 'verified' 
                      ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' 
                      : 'border-blue-500/20 text-blue-500 bg-blue-500/5'
                  }`}>
                    ● {item.status}
                  </span>
                  
                  {/* Flèche d'action discrète */}
                  <span className="text-slate-300 dark:text-white/5 group-hover:text-orange-500 transition-colors duration-200">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-36">
            {[
              { icon: <FaTerminal />, title: "Tech Architecture", subtitle: "MUAMOKEL AGENCY" },
              { icon: <FaBookOpen />, title: "Plume d'Éveil", subtitle: "Auteur d'ouvrages" },
              { icon: <FaGlobeAfrica />, title: "Impact Continental", subtitle: "Jeunesse Africaine" },
              { icon: <FaUserCheck />, title: "Haute Conscience", subtitle: "Coaching Holistique" }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.99 }}
                className="relative p-8 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-colors duration-300 hover:border-slate-400 dark:hover:border-white/30 flex flex-col justify-between min-h-[220px] group"
              >
                <div>
                  <div className="text-2xl text-slate-950 dark:text-white mb-6 transition-colors duration-300 group-hover:text-orange-500">
                    {pillar.icon}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    // {pillar.subtitle}
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end font-mono text-[9px] text-slate-300 dark:text-white/5 group-hover:text-orange-500 transition-colors">
                  <span>[0{i + 1}]</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- SECTION 3: CTA IMPACT --- */}
          <div className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] p-10 md:p-14 text-center relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[9px] mb-3 block">
                // Alignement Stratégique
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-950 dark:text-white mb-4 tracking-widest uppercase text-xs">
                UNISSONS NOS FORCES POUR <span className="underline decoration-1 underline-offset-8">L'EXCELLENCE</span>
              </h2>
              <p className="max-w-2xl mx-auto text-sm text-slate-600 dark:text-slate-400 font-normal tracking-wide leading-relaxed mb-10">
                Que ce soit pour bâtir une infrastructure numérique de classe mondiale ou pour transformer votre vision de vie, je vous accompagne dans cette ascension.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  type="button"
                  onClick={() => navigate('/#projects')}
                  className="px-8 py-3 border border-slate-950 dark:border-white text-slate-950 dark:text-white font-bold uppercase text-[10px] tracking-widest hover:bg-slate-950 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                >
                  Voir mes réalisations
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/#contact')}
                  className="px-8 py-3 bg-slate-950 dark:bg-white text-white dark:text-black font-bold uppercase text-[10px] tracking-widest hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300"
                >
                  Travailler ensemble
                </button>
              </div>
            </div>
          </div>

          <GoogleMapsSection />
        </div>
      </motion.section>
    </>
  );
}
