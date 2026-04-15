import { about } from '../assets/assets.js';
import { profile1Image as irbendelo1 } from '../assets/assets.js';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';
import { FaGraduationCap, FaRocket, FaShieldAlt, FaUserCheck, FaTerminal } from 'react-icons/fa';

export default function About() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Animations Parallaxe
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Variants pour les éléments
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      <motion.section
        ref={sectionRef}
        id="about"
        className="relative pt-15 pb-32 px-6 overflow-hidden"
        style={{ backgroundColor: 'var(--bg)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Décoration de fond */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-1)]/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* SECTION 1: PROFIL & BIO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
            
            {/* Colonne Image avec Parallaxe */}
            <motion.div className="lg:col-span-5 flex justify-center" variants={itemVariants}>
              <div className="relative group">
                <motion.div style={{ y: yGlow }} className="absolute -inset-4 bg-gradient-to-tr from-[var(--accent-1)] to-[var(--accent-2)] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                  <motion.div style={{ y: yImage, scale: 1.05 }}>
                    <LazyImage
                      src={irbendelo1}
                      alt="Bendelo Thielcy"
                      className="w-full h-[400px] md:h-[500px] object-cover rounded-[2.5rem]"
                    />
                  </motion.div>
                  <motion.div style={{ y: yBadge }} className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl z-20">
                    <p className="text-3xl font-black text-white italic">3+<span className="text-[var(--accent-1)]">ans</span></p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">D'expertise Logicielle</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Colonne Texte */}
            <motion.div className="lg:col-span-7 space-y-8" variants={itemVariants}>
              <div className="space-y-4">
                <h3 className="flex items-center gap-3 text-[var(--accent-1)] font-black uppercase tracking-[0.3em] text-sm">
                  <FaTerminal /> Qui suis-je ?
                </h3>
                <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] leading-tight tracking-tighter">
                  Architecte de solutions <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]">Digitales Innovantes.</span>
                </h2>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--text-secondary)] font-medium italic border-l-4 border-[var(--accent-1)] pl-6 py-2">
                "{about}"
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                 {["Digitalisation", "Full-Stack", "Cloud Architect"].map((tag) => (
                   <span key={tag} className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-slate-300 uppercase tracking-widest">
                     {tag}
                   </span>
                 ))}
              </div>
            </motion.div>
          </div>

          {/* SECTION 2: GRILLE D'EXPERTISES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {[
              { icon: <FaRocket />, title: "Vision Stratégique", text: "Transformation digitale globale, de l'audit à l'implémentation de systèmes scalables." },
              { icon: <FaGraduationCap />, title: "Stacks Certifiés", text: "Expertise validée sur AWS, Azure & Google Cloud. Architecture React/Node.js robuste." },
              { icon: <FaUserCheck />, title: "Leadership Technique", text: "Accompagnement senior et gestion de projets complexes chez MUAMOKEL AGENCY." },
              { icon: <FaShieldAlt />, title: "Sécurité & Qualité", text: "Protocoles OAuth/JWT, protection des données et maintenance proactive des actifs digitaux." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md hover:border-[var(--accent-1)]/30 transition-all duration-500 group"
              >
                <div className="text-3xl mb-6 inline-block p-4 rounded-2xl bg-[var(--accent-1)]/10 text-[var(--accent-1)] group-hover:bg-[var(--accent-1)] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-[var(--text-primary)]">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{feature.text}</p>
              </motion.div>
            ))}
          </div>

          {/* SECTION 3: CALL TO ACTION */}
          <motion.div 
            variants={itemVariants}
            className="p-12 rounded-[3rem] bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-center relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h4 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase italic">Prêt à digitaliser votre avenir ?</h4>
              <p className="text-white/80 max-w-2xl mx-auto font-medium mb-8">Propulsons ensemble vos projets avec une expertise de grade ingénieur.</p>
              <button 
                 onClick={() => window.open("https://wa.me/243829054350", "_blank")}s
                    className="px-10 py-4 bg-white text-black font-black rounded-full uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl"
>
                 Démarrer une consultation
           </button>

            </div>
          </motion.div>
        </div>
      </motion.section>

      <GoogleMapsSection />
    </>
  );
}
