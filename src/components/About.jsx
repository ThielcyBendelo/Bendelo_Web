import { about } from '../assets/assets.js';
import {
  profile1Image as profileImg,
  programmationImage as bgImage,
} from '../assets/assets.js';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <motion.section
        id="about"
        className="relative py-20 px-4 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.15)',
            opacity: 0.6,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-8xl mx-auto flex flex-col items-center mb-5">
          <motion.div
            variants={imageVariants}
            whileHover={{
              scale: 1.08,
              rotate: [0, -3, 3, 0],
              transition: { duration: 0.3 },
            }}
          >
            <LazyImage
              src={profileImg}
              alt="Profil"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover mb-10 shadow-lg border-4 border-purple hover:scale-105 transition-transform duration-300"
              placeholder={
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple/20 to-pink/20 animate-pulse border-4 border-purple mb-10 shadow-lg" />
              }
            />
          </motion.div>
          <motion.h2
            className="text-2xl md:text-1xl font-bold text-center mb-8"
            variants={textVariants}
          >
            <span className="bg-gradient-to-r from-purple to-pink text-transparent bg-clip-text">
              À propos
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 text-center leading-relaxed max-w-2xl mb-6"
            variants={textVariants}
          >
            {about}
          </motion.p>
          <motion.div
            className="text-base md:text-lg text-gray-200 text-center max-w-2xl space-y-4"
            variants={textVariants}
          >
            <p>
              <strong><span className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">Expertise complète</span> :</strong> Ingénieur Logiciel Full Stack Freelance propose des solutions informatiques sur mesure : développement web, cybersécurité, cloud, maintenance, et transformation digitale. Nous accompagnons les entreprises dans leur croissance grâce à des technologies innovantes et des conseils stratégiques.
            </p>
            <p>
              <strong><span className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">Certification</span> :</strong> Bendelo Freelance et ses collaborateurs de MUAMOKEL AGENCY sont certifiés dans les dernières technologies (AWS, Azure, Google Cloud, React, Node.js, DevOps) et suivent une formation continue pour garantir la qualité et la sécurité de vos projets.
            </p>
            <p>
              <strong><span className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">Accompagnement personnalisé</span> :</strong> De l’audit à la mise en production, nous assurons un suivi rigoureux, des livrables clairs, et une communication transparente. Mon objectif : la réussite de votre projet et la satisfaction de vos utilisateurs.
            </p>
            <p>
              <strong><span className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">Engagement qualité</span> :</strong> Bendelo Freelance respecte les meilleures pratiques, les normes de sécurité, et les délais. Chaque projet bénéficie d’un support dédié et d’une garantie de performance.
            </p>
            <p>
              <strong></strong> pour un devis gratuit, une démonstration, ou un rendez-vous dans nos bureaux à Kinshasa. Votre transformation digitale commence ici !
            </p>
          </motion.div>
        </div>
      </motion.section>
      <GoogleMapsSection />
    </>
  );
}
