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
  return (
    <section className="py-24 px-6 border-t border-slate-200 dark:border-white/10" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* --- EN-TÊTE DE SECTION ÉPURÉ & PROFESSIONNEL --- */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block"
          >
            Stack Technologique
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs"
          >
            Maîtrise <span className="underline decoration-1 underline-offset-8">Full-Stack</span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-base text-slate-600 dark:text-slate-400 font-normal tracking-wide leading-relaxed">
            Une infrastructure d'outils avancés mariant ingénierie logicielle robuste, expertise réseau DevOps et intégration d'écosystèmes d'Intelligence Artificielle.
          </p>
        </div>

        {/* --- GRILLE TECHNIQUE ORTHOGONALE STRICTE --- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.4 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.99 }}
              className="group relative p-8 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-colors duration-300 hover:border-slate-400 dark:hover:border-white/30 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                {/* En-tête de carte : Icône monochrome & Niveau */}
                <div className="flex justify-between items-start mb-6">
                  <div className="text-3xl text-slate-950 dark:text-white transition-colors duration-300 group-hover:text-orange-500">
                    {tech.icon}
                  </div>
                  
                  {/* Badge de niveau type log système */}
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5">
                    // {tech.level}
                  </span>
                </div>

                <h3 className="text-base font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-3">
                  {tech.name}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-normal tracking-wide">
                  {tech.description}
                </p>
              </div>

              {/* Statut d'état bas de carte */}
              <div className="mt-6 flex justify-end text-slate-300 dark:text-white/5 group-hover:text-orange-500 transition-colors duration-300 text-[10px] font-mono font-bold">
                <span>[ready_node]</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechSection;
