import { motion } from 'framer-motion';
import { FaGlobeAfrica, FaHandsHelping, FaLightbulb, FaMicrophone, FaArrowRight } from 'react-icons/fa';

export default function Coaching() {
  const programs = [
    {
      title: "Éveil de la Conscience",
      desc: "Libérer le potentiel latent pour une vie alignée et authentique.",
      icon: <FaLightbulb />,
      color: "from-purple-600"
    },
    {
      title: "Leadership Africain",
      desc: "Former la nouvelle génération de bâtisseurs pour le continent.",
      icon: <FaGlobeAfrica />,
      color: "from-orange-600"
    },
    {
      title: "Mindset Entrepreneur",
      desc: "Passer de l'idée à l'impact avec une structure mentale de fer.",
      icon: <FaHandsHelping />,
      color: "from-blue-600"
    }
  ];

  return (
   <section 
  className="py-24 px-6 relative overflow-hidden transition-colors duration-700" 
  style={{ backgroundColor: 'var(--bg)' }}
>
  <div className="max-w-7xl mx-auto">
    
    {/* EN-TÊTE : LA MISSION */}
    <div className="text-center mb-24">
      <motion.span 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
      >
        Coaching & Accompagnement
      </motion.span>
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-7xl font-black mt-6 mb-8 tracking-tighter leading-none"
        style={{ color: 'var(--text-primary)' }}
      >
        Réveiller le <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">Lion qui dort.</span>
      </motion.h2>
      <p className="max-w-3xl mx-auto text-xl font-light leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
        "Mon coaching n'est pas une simple discussion. C'est une restructuration de votre vision pour impacter votre environnement et le monde."
      </p>
    </div>

    {/* GRILLE DES PROGRAMMES ADAPTATIVE */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
      {programs.map((p, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -12 }}
          className="relative p-12 rounded-[3rem] border transition-all duration-500 group overflow-hidden shadow-sm hover:shadow-2xl"
          style={{ 
            backgroundColor: 'var(--surface)', 
            borderColor: 'var(--border-color)' 
          }}
        >
          {/* Lueur d'arrière-plan adaptative */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${p.color} to-transparent opacity-[0.08] blur-3xl group-hover:opacity-20 transition-opacity`} />
          
          <div className="text-4xl text-orange-500 mb-8 transform group-hover:scale-110 transition-transform duration-500">
            {p.icon}
          </div>
          <h3 className="text-2xl font-black mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {p.title}
          </h3>
          <p className="mb-8 leading-relaxed text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {p.desc}
          </p>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors" style={{ color: 'var(--text-primary)' }}>
            En savoir plus <FaArrowRight className="text-orange-500 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      ))}
    </div>

    {/* SECTION "POURQUOI L'AFRIQUE ?" (Look Premium Adaptatif) */}
    <div className="relative p-[1px] rounded-[4rem] bg-gradient-to-r from-orange-600/30 via-purple-600/30 to-orange-600/30 shadow-2xl">
      <div className="rounded-[3.9rem] p-12 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-colors"
           style={{ backgroundColor: 'var(--surface)' }}>
        <div className="space-y-8">
          <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            Une vision pour le <br/> <span className="text-orange-500">Continent et au-delà.</span>
          </h3>
          <ul className="space-y-6">
            {[
              "Éducation mentale de la jeunesse",
              "Leadership éthique et conscient",
              "Indépendance créative et technologique"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 font-bold text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          {/* Animation de respiration pour la lueur */}
          <div className="aspect-square bg-gradient-to-tr from-purple-600/10 to-orange-600/10 rounded-full absolute inset-0 blur-3xl animate-pulse" />
          
          <div className="relative border p-10 rounded-[3rem] backdrop-blur-xl transition-all"
               style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg)' }}>
            <FaMicrophone className="text-6xl text-orange-500 mb-8" />
            <p className="text-2xl font-light italic leading-snug tracking-tight" style={{ color: 'var(--text-primary)' }}>
              "Le changement de l'Afrique ne viendra pas de l'extérieur, mais de l'éveil intérieur de chaque fils du continent."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-8 bg-orange-500" />
              <p className="text-orange-500 font-black uppercase tracking-widest text-[10px]">Bendelo Thielcy</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

  );
}
