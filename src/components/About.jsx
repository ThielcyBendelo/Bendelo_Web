import { about } from '../assets/assets.js';
import {
  profile1Image as profileImg,
} from '../assets/assets.js';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';
import { FaGraduationCap, FaRocket, FaShieldAlt, FaUserCheck } from 'react-icons/fa';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <motion.section
        id="about"
        className="relative py-24 px-6 overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
       
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Profil */}
          <div className="flex flex-col items-center mb-16">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative p-1 rounded-full bg-gradient-to-tr from-[var(--accent-1)] to-[var(--accent-2)] shadow-2xl mb-8"
            >
              <LazyImage
                src={profileImg}
                alt="Profil"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-[var(--surface)] shadow-inner"
                style={{ objectPosition: 'center 35%' }}
              />
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-center mb-6">
              <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">
                À propos de moi
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-center leading-relaxed max-w-3xl font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              {about}
            </motion.p>
          </div>

          {/* Cartes d'Expertise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              {
                icon: <FaRocket />,
                title: "Expertise complète",
                text: "Solutions sur mesure : développement web, cybersécurité, cloud, maintenance et transformation digitale pour booster votre croissance."
              },
              {
                icon: <FaGraduationCap />,
                title: "Certification",
                text: "Certifié AWS, Azure, Google Cloud, React, Node.js & DevOps. Formation continue pour garantir une qualité et une sécurité de pointe."
              },
              {
                icon: <FaUserCheck />,
                title: "Accompagnement",
                text: "De l'Audit à la mise en production & suivi rigoureux. Une communication transparente pour la réussite de vos projets."
              },
              {
                icon: <FaShieldAlt />,
                title: "Engagement Qualité",
                text: "Respect des normes de sécurité et des délais. Chaque projet bénéficie d'un support dédié et de haute performance."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-2xl border backdrop-blur-sm transition-all hover:translate-y-[-5px]"
                style={{ 
                  backgroundColor: 'var(--surface)', 
                  borderColor: 'var(--border-color)',
                  boxShadow: 'var(--shadow)',
                  opacity: 0.95
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl mt-1" style={{ color: 'var(--accent-1)' }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {feature.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action Final */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center p-8 rounded-2xl border-2 border-dashed"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Votre transformation digitale commence ici à <span className="text-[var(--accent-1)]">Kinshasa</span>. 
              Contactez-moi pour un devis gratuit !
            </p>
          </motion.div>
        </div>
      </motion.section>

      <GoogleMapsSection />
    </>
  );
}
