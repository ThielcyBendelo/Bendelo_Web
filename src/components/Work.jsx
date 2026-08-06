import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobeAfrica, FaHandsHelping, FaLightbulb, FaMicrophone, FaArrowRight, FaTimes } from 'react-icons/fa';
import { impact1, impact2, impact3 } from '../assets/assets.js';

export default function Coaching() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      title: "Éveil de la Conscience",
      desc: "Libérer le potentiel latent pour une vie alignée et authentique.",
      icon: <FaLightbulb />,
      image: impact1,
      summary: "Un accompagnement centré sur la transformation intérieure, l’alignement des valeurs et la clarté de l’identité.",
      details: [
        "Ateliers de prise de conscience",
        "Structuration du parcours personnel",
        "Clarté de vision et d’intention"
      ]
    },
    {
      title: "Leadership Africain",
      desc: "Formater la nouvelle génération de bâtisseurs pour le continent.",
      icon: <FaGlobeAfrica />,
      image: impact2,
      summary: "Un cadre de leadership inspirant pour guider des équipes, des projets et des communautés avec impact.",
      details: [
        "Éducation au leadership éthique",
        "Mentorat stratégique",
        "Construction d’une influence durable"
      ]
    },
    {
      title: "Mindset Entrepreneur",
      desc: "Passer de l'idée à l'impact avec une structure mentale de fer.",
      icon: <FaHandsHelping />,
      image: impact3,
      summary: "Un accompagnement pour transformer une idée en initiative concrète, crédible et pérenne.",
      details: [
        "Clarification de l’offre",
        "Mentalité de bâtisseur",
        "Exécution et gestion de l’impact"
      ]
    }
  ];

  return (
    <section 
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5" 
      id="coaching"
    >
      {/* --- MAILLAGE BLUEPRINT GÉOMÉTRIQUE EN ARRIÈRE-PLAN --- */}
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
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block"
          >
            // COACHING_&_ACCOMPAGNEMENT
          </motion.span>
          
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            RÉVEILLER LE <span className="text-[#FF6B35] italic">LION QUI DORT</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            "Mon coaching n'est pas une simple discussion. C'est une restructuration chirurgicale de votre vision pour impacter votre environnement et le monde."
          </p>
        </div>

        {/* --- GRILLE DES PROGRAMMES ORTHOGONALE (SANS ARRONDIS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 flex flex-col justify-between min-h-[340px] rounded-none shadow-2xl"
            >
              {/* Lueur angulaire au survol */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />

              <div>
                <div className="text-3xl text-slate-400 mb-8 transition-all duration-300 group-hover:text-[#FF6B35] group-hover:scale-110">
                  {p.icon}
                </div>
                
                <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">
                  {p.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed font-medium tracking-wide">
                  {p.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProgram(p)}
                className="mt-8 flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF6B35] hover:text-white transition-colors duration-200"
              >
                &gt;_ EN_SAVOIR_PLUS <FaArrowRight className="text-sm transition-transform group-hover:translate-x-2" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* --- SECTION D'IMPACT CONTINENTAL (Style Bloc Technique) --- */}
        <div className="relative border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center rounded-none shadow-2xl">
          {/* Décoration d'angle "Focus" */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FF6B35]" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FF6B35]" />

          <div className="space-y-8 relative z-10">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
              UNE VISION POUR LE <br/> <span className="text-[#FF6B35] italic">CONTINENT ET AU-DELÀ</span>
            </h3>
            
            <ul className="space-y-5 font-mono">
              {[
                "Éducation mentale de la jeunesse",
                "Leadership éthique et conscient",
                "Indépendance créative et technologique"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-sm md:text-lg font-bold tracking-tight text-slate-300 uppercase">
                  <span className="w-2 h-2 bg-[#FF6B35] rounded-none" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc Manifeste / Témoignage */}
          <div className="relative border border-white/10 bg-black/40 p-10 flex flex-col justify-between min-h-[280px] rounded-none">
            <div>
              <FaMicrophone className="text-2xl text-[#FF6B35] mb-8 animate-pulse" />
              <p className="text-xl md:text-2xl font-light text-white italic leading-relaxed tracking-wide">
                "Le changement de l'Afrique ne viendra pas de l'extérieur, mais de l'éveil intérieur de chaque fils du continent."
              </p>
            </div>
            
            <div className="mt-10 flex items-center gap-4 font-mono text-[10px] tracking-[0.3em]">
              <div className="h-[1px] w-10 bg-[#FF6B35]/40" />
              <p className="text-white font-black uppercase">IR BENDELO THIELCY</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALE DE DÉTAILS PROGRAMME (RÉPARÉE ET SOMBRE) --- */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md px-4 py-6"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden border border-white/10 bg-[#0A1622] shadow-2xl rounded-none relative"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 p-8">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-[#FF6B35] mb-2">
                    // APERÇU_DU_PROGRAMME
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                    {selectedProgram.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProgram(null)}
                  className="p-3 bg-white/5 border border-white/10 text-white hover:text-[#FF6B35] hover:border-[#FF6B35]/50 transition-all rounded-none"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <div className="grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr]">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="h-full max-h-[350px] w-full object-cover border border-white/10 rounded-none grayscale hover:grayscale-0 transition-all duration-700"
                />

                <div className="flex flex-col justify-between">
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed text-slate-300 font-light">
                      {selectedProgram.summary}
                    </p>
                    <ul className="space-y-3">
                      {selectedProgram.details?.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                          <span className="h-1.5 w-1.5 bg-[#FF6B35]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 border-t border-white/5 pt-6 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-500">
                     <span>Status: System_Operational</span>
                     <span className="text-[#FF6B35]">ID: {selectedProgram.id || 'PRG-X'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


