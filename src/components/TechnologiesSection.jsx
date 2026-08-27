import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaDocker, FaCode, FaServer, FaTools, FaBrain, 
  FaNetworkWired, FaDatabase, FaFileExcel, FaShieldAlt, FaLaptopCode, 
  FaWindows, FaCloud, FaHtml5, FaChartBar, FaTerminal, FaRoute
} from 'react-icons/fa';
import { 
  SiJavascript, SiTailwindcss, SiTypescript, SiMongodb, 
  SiPython, SiMysql, SiGithub, SiOpenai 
} from 'react-icons/si';

const technologies = [
  // --- PÔLE 1 : FRONT-END & FRAMEWORKS ---
  {
    name: 'JavaScript / TypeScript',
    icon: <SiTypescript />,
    description: 'Typage strict, programmation asynchrone avancée et sécurisation globale des flux logiques.',
    level: 'Expert / Lead',
  },
  {
    name: 'Next.js (React Stack)',
    icon: <FaReact />,
    description: 'Rendu côté serveur (SSR), App Router hybride et optimisation chirurgicale du Virtual DOM.',
    level: 'Expert / Architect',
  },
  {
    name: 'Data Streamlit UI',
    icon: <FaLaptopCode />,
    description: 'Conception d\'interfaces web interactives dédiées aux prototypes de données et pipelines ML.',
    level: 'Advanced / Senior',
  },

  // --- PÔLE 2 : BACK-END, DATA & LOGICIELS COMPTABLES ---
  {
    name: 'Node.js / Express.js',
    icon: <FaNodeJs />,
    description: 'Développement de microservices asynchrones distribués et d\'APIs REST d\'entreprise sécurisées.',
    level: 'Expert / Architect',
  },
  {
    name: 'Python Runtime',
    icon: <SiPython />,
    description: 'Ingénierie de données, algorithmique avancée, scripts automatisés et Machine Learning.',
    level: 'Expert / Data',
  },
  {
    name: 'Enterprise Databases',
    icon: <FaDatabase />,
    description: 'Maîtrise de Microsoft SQL Server (SSMS), requêtes complexes, MySQL relationnel et MongoDB NoSQL.',
    level: 'Senior DBA',
  },
  {
    name: 'FinTech Analytics & BI',
    icon: <FaChartBar />,
    description: 'Interfaçage ADO, parsing avancés Excel et flux décisionnels Power BI pour reporting financier.',
    level: 'Senior Data Analyst',
  },

  // --- PÔLE 3 : RÉSEAU, SÉCURITÉ & DEVOPS ---
  {
    name: 'Secured Mesh Networks',
    icon: <FaNetworkWired />,
    description: 'Architecture réseau privée, protocoles TCP/UDP, subnetting CIDR, DNS et Tunnels Tailscale.',
    level: 'Senior Specialist',
  },
  {
    name: 'Systems & Cyber Audit',
    icon: <FaShieldAlt />,
    description: 'Tests de pénétration sous Kali Linux et virtualisation d\'environnements isolés via VirtualBox.',
    level: 'Security Lead',
  },
  {
    name: 'Docker & Multi-Cloud',
    icon: <FaDocker />,
    description: 'Conteneurisation d\'applications, orchestration et déploiement d\'infrastructures sous AWS et Azure.',
    level: 'Senior DevOps',
  },
  {
    name: 'CI/CD Pipelines',
    icon: <FaCloud />,
    description: 'Automatisation des workflows de build avec GitHub Actions, Vercel, Render et Hostinger.',
    level: 'DevOps / Architect',
  },

  // --- PÔLE 4 : INTELLIGENCE ARTIFICIELLE & PRODUCTIVITÉ ---
  {
    name: 'Prompt Engineering',
    icon: <FaBrain />,
    description: 'Optimisation contextuelle systématique de prompts pour les grands modèles de langage (GPT-4, Claude, Gemini).',
    level: 'AI Engineer',
  },
  {
    name: 'AI Agents & Autonomy',
    icon: <SiOpenai />,
    description: 'Intégration d\'APIs cognitives (OpenAI, Anthropic) et exploitation d\'assistants comme GitHub Copilot.',
    level: 'AI Lead / Implementer',
  }
];

function TechSection() {
  // Duplication du tableau pour créer l'illusion du défilement infini et fluide sans coupure
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <section 
  className="py-24 relative overflow-hidden bg-[#0A1622] border-t border-white/5" 
  id="tech-stack"
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

  {/* --- EN-TÊTE DE SECTION LOG TERMINAL --- */}
  <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center mb-20">
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block"
    >
      // STACK_TECHNOLOGIQUE
    </motion.span>
    
    <h2 
      className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
      style={{ fontFamily: "'Antonio', sans-serif" }}
    >
      MAÎTRISE <span className="text-[#FF6B35] italic">FULL-STACK</span>
    </h2>
    
    <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
      Une infrastructure d'outils avancés mariant ingénierie logicielle robuste, expertise réseau DevOps et intégration d'écosystèmes d'Intelligence Artificielle.
    </p>
  </div>

  {/* --- GRILLE DE COMPOSANTS RESPONSIVE --- */}
  <div className="relative w-full z-10 max-w-7xl mx-auto px-6">
    {/* 💡 Conseil : Utilisez le tableau original 'techData' ou 'tech' à la place de 'duplicatedTech' */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {duplicatedTech.map((tech, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
          className="group relative p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 flex flex-col justify-between min-h-[260px] w-full rounded-none shadow-2xl"
        >
          {/* Micro-lueur angulaire d'ingénierie au survol */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />

          <div>
            {/* En-tête de carte : Icône monochrome & Niveau */}
            <div className="flex justify-between items-start mb-6">
              <div className="text-3xl text-slate-400 transition-all duration-300 group-hover:text-[#FF6B35] group-hover:scale-110">
                {tech.icon}
              </div>
              
              {/* Badge de niveau type log système strict */}
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 border border-white/10 text-[#FF6B35] bg-[#FF6B35]/5 rounded-none whitespace-nowrap">
                // {tech.level}
              </span>
            </div>

            {/* Titre de la technologie */}
            <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-3">
              {tech.name}
            </h3>
            
            {/* Description en gris technique */}
            <p className="text-slate-400 text-sm leading-relaxed font-medium tracking-wide">
              {tech.description}
            </p>
          </div>

          {/* Statut d'état bas de carte et repère géométrique */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-slate-600 group-hover:text-[#FF6B35] transition-colors duration-300 font-mono text-[10px] tracking-widest uppercase">
            <span>&gt;_ NODE_STATUS</span>
            <span className="font-bold text-[11px]">
              [READY_NODE]
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
}

export default TechSection;
