import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaUsers, FaCheckCircle } from 'react-icons/fa';

const team = [
  {
    name: 'Ir Bendelo',
    role: 'Responsable Projets Digitaux',
    bio: 'Coordination de projets web et cloud pour entreprises. Spécialiste transformation digitale et relation client.',
    avatar: '/IrBendelo.jpg',
    linkedin: 'https://www.linkedin.com/in/irbendelo/',
    skills: ['Gestion de projet', 'Cloud', 'Relation client', 'Agilité'],
    badge: 'Chef Projet',
  },
  {
    name: 'Mohamed Ben Salah',
    role: 'Expert Sécurité & DevOps',
    bio: 'Automatisation, sécurité, CI/CD, infrastructures cloud. Garant de la performance et de la protection des données clients.',
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    linkedin: 'https://www.linkedin.com/in/mohamedbensalah/',
    skills: ['DevOps', 'Sécurité', 'Docker', 'CI/CD'],
    badge: 'DevOps Pro',
  },
  {
    name: 'Laura Garcia',
    role: 'Product Owner & Scrum Master',
    bio: 'Gestion de produit, organisation agile, satisfaction client. Experte en pilotage de projets informatiques.',
    avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
    linkedin: 'https://www.linkedin.com/in/lauragarcia/',
    skills: ['Agile', 'Scrum', 'Communication', 'Gestion Produit'],
    badge: 'Scrum Master',
  },
  {
    name: 'Fatou Ndiaye',
    role: 'Frontend & Animatrice Tech',
    bio: "Spécialiste React, animations web et accessibilité. Passionnée par l'éducation et la vulgarisation tech.",
    avatar: 'https://randomuser.me/api/portraits/women/49.jpg',
    linkedin: 'https://www.linkedin.com/in/fatoundiaye/',
    skills: ['React', 'GSAP', 'Accessibilité', 'Pédagogie'],
    badge: 'Animatrice Tech',
  },
  // ... Vous pouvez ajouter les autres membres ici de la même manière
];

function TeamSection() {
  return (
    <section className="py-20 px-6 transition-colors duration-300 relative" 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="team">
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', color: 'var(--accent-1)' }}
          >
            <FaUsers />
            <span className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>L'Expertise Collective</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text inline-block">
            Mon Équipe
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Des experts réunis pour propulser votre entreprise vers l’innovation et la performance.
          </p>
        </div>

        {/* Grille des membres */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow)' }}
            >
              {/* Avatar avec badge */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-4 border-[var(--bg)] shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute -bottom-2 -right-2 bg-[var(--accent-1)] text-white p-1.5 rounded-full shadow-lg border-2 border-[var(--surface)]">
                  <FaCheckCircle className="text-sm" />
                </div>
              </div>

              {/* Infos Membre */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{member.name}</h3>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border" 
                      style={{ color: 'var(--accent-2)', borderColor: 'var(--accent-2)' }}>
                  {member.badge}
                </span>
                <p className="text-sm font-medium mt-3" style={{ color: 'var(--accent-1)' }}>{member.role}</p>
              </div>

              {/* Bio & Skills */}
              <p className="text-sm text-center mb-6 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                {member.bio}
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {member.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-md border font-mono" 
                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* LinkedIn Button */}
              <div className="flex justify-center">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}
                >
                  <FaLinkedin className="text-2xl hover:text-[#0077b5]" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
