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
      className="py-24 px-6 border-t border-slate-200 dark:border-white/10" 
      style={{ backgroundColor: 'var(--bg)' }}
      id="coaching"
    >
      <div className="max-w-7xl mx-auto">
        
               {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-950 dark:text-slate-850 font-black uppercase tracking-[0.3em] text-[10px] mb-3 block"
          >
            // Coaching & Accompagnement
          </motion.span>
          <motion.h2 
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs"
          >
            Réveiller le <span className="underline decoration-1 underline-offset-8">Lion qui dort</span>
          </motion.h2>
          <p className="text-base md:text-lg text-slate-950 dark:text-slate-400 font-black tracking-wide leading-relaxed max-w-2xl mx-auto">
            "Mon coaching n'est pas une simple discussion. C'est une restructuration de votre vision pour impacter votre environnement et le monde."
          </p>
        </div>

        {/* --- GRILLE DES PROGRAMMES ORTHOGONALE --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.99 }}
              className="relative p-8 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-colors duration-300 hover:border-slate-400 dark:hover:border-white/30 flex flex-col justify-between min-h-[300px] group"
            >
              <div>
                {/* Icône monochrome épurée */}
                <div className="text-2xl text-slate-950 dark:text-white mb-6 transition-colors duration-300 group-hover:text-orange-500">
                  {p.icon}
                </div>
                
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-3">
                  {p.title}
                </h3>
                
                <p className="text-slate-950 dark:text-slate-850 text-sm leading-relaxed font-black tracking-wide mb-6">
                  {p.desc}
                </p>
              </div>

              {/* Bouton d'action minimaliste style terminal */}
              <button
                type="button"
                onClick={() => setSelectedProgram(p)}
                className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-950 dark:text-white group-hover:text-orange-500 transition-colors duration-200"
              >
                [ en_savoir_plus ] <FaArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* --- SECTION D'IMPACT CONTINENTAL (Style Bloc Technique) --- */}
        <div className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h3 className="text-xl md:text-3xl font-black uppercase tracking-wider text-slate-950 dark:text-white leading-tight">
              Une vision pour le <br/> <span className="underline decoration-1 underline-offset-8">Continent et au-delà</span>
            </h3>
            
            <ul className="space-y-4">
              {[
                "Éducation mentale de la jeunesse",
                "Leadership éthique et conscient",
                "Indépendance créative et technologique"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-black tracking-wide text-slate-950 dark:text-slate-850">
                  <span className="w-1.5 h-1.5 bg-orange-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc Manifeste / Témoignage */}
          <div className="relative border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 p-8 flex flex-col justify-between min-h-[240px]">
            <div>
              <FaMicrophone className="text-xl text-slate-400 mb-6" />
              <p className="text-lg md:text-xl font-normal text-slate-950 dark:text-slate-850 italic leading-relaxed tracking-wide">
                "Le changement de l'Afrique ne viendra pas de l'extérieur, mais de l'éveil intérieur de chaque fils du continent."
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-3 font-mono text-[10px]">
              <div className="h-px w-6 bg-slate-200 dark:bg-white/10" />
              <p className="text-orange-500 font-bold uppercase tracking-wider">Bendelo Thielcy</p>
            </div>
          </div>

        </div>

      </div>

      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#09090b] shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-white/10 p-6">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Aperçu du programme
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-wider text-slate-950 dark:text-white">
                    {selectedProgram.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProgram(null)}
                  className="rounded-full border border-slate-200 dark:border-white/10 p-2 text-slate-500 hover:text-orange-500 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="h-64 w-full object-cover border border-slate-200 dark:border-white/10"
                />

                <div className="flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {selectedProgram.summary}
                    </p>
                    <ul className="space-y-2">
                      {selectedProgram.details.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-slate-200 dark:border-white/10 pt-4 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {selectedProgram.desc}
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
