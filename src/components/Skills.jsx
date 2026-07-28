import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaGitAlt, FaTerminal, FaCode, FaServer, 
  FaTools, FaBrain, FaNetworkWired, FaDatabase, FaFileExcel,
  FaShieldAlt, FaLaptopCode, FaWindows, FaCloud, FaHtml5, FaChartBar, FaCss3Alt
} from 'react-icons/fa';
import { 
  SiJavascript, SiTailwindcss, SiTypescript, SiMongodb, 
  SiDocker, SiPython, SiMysql, SiGithub 
} from 'react-icons/si';

// Cartographie des icônes sécurisée (Ajout de FaCss3Alt et SiTailwindcss)
const skillIcons = {
  "HTML": FaHtml5,
  "CSS3": FaCss3Alt,
  "Tailwind CSS": SiTailwindcss,
  "JavaScript": SiJavascript, 
  "TypeScript": SiTypescript, 
  "Next.js (React)": FaReact, 
  "Streamlit": FaLaptopCode, 
  "Node.js": FaNodeJs, 
  "Python": SiPython, 
  "Express.js": FaServer, 
  "Microsoft SQL Server": FaDatabase, 
  "MySQL": SiMysql, 
  "MongoDB": SiMongodb, 
  "Connexion ADO": FaDatabase, 
  "Microsoft Excel": FaFileExcel, 
  "Power BI": FaChartBar, 
  "Machine Learning": FaBrain, 
  "TCP/IP & VPN": FaNetworkWired, 
  "Tunnels Tailscale": FaNetworkWired, 
  "Kali Linux": FaShieldAlt, 
  "VirtualBox": FaWindows, 
  "Docker": SiDocker, 
  "AWS": FaCloud, 
  "Microsoft Azure": FaWindows, 
  "GitHub / Git": SiGithub, 
  "CI/CD & Vercel": FaCloud, 
  "Render & Hostinger": FaServer,
  "Prompt Engineering": FaBrain, 
  "APIs OpenAI / Claude": FaBrain, 
  "GitHub Copilot": FaTerminal
};

const categories = [
  { id: 'all', label: 'Tous', icon: <FaCode /> },
  { id: 'frontend', label: 'Front-End', icon: <FaReact /> },
  { id: 'backend', label: 'Back-End & Data', icon: <FaServer /> },
  { id: 'devops', label: 'Réseau & DevOps', icon: <FaTools /> },
  { id: 'ai', label: 'IA & Productivité', icon: <FaBrain /> },
];

const detailedSkills = [
  // Front-End (HTML, CSS3 et Tailwind CSS intégrés à leur juste place)
  { name: "HTML", category: "frontend", spec: "Structure sémantique, accessibilité & normes WCAG" },
  { name: "CSS3", category: "frontend", spec: "Layouts avancés (Flexbox, Grid), animations & responsive design" },
  { name: "Tailwind CSS", category: "frontend", spec: "Conception utilitaire, systèmes de design atomiques & optimisation JIT" },
  { name: "JavaScript", category: "frontend", spec: "ES6+ / Architecture asynchrone & DOM" },
  { name: "TypeScript", category: "frontend", spec: "Typage strict & Sécurisation globale" },
  { name: "Next.js (React)", category: "frontend", spec: "SSR / App Router / Optimisation" },
  { name: "Streamlit", category: "frontend", spec: "UI de prototypes Data & Machine Learning" },
  
  // Back-End & Data
  { name: "Node.js", category: "backend", spec: "Runtimes asynchrones scalables" },
  { name: "Python", category: "backend", spec: "Scripts avancés, data structures & ML" },
  { name: "Express.js", category: "backend", spec: "Conception d'APIs REST sécurisées" },
  { name: "Microsoft SQL Server", category: "backend", spec: "SSMS, requêtes complexes & T-SQL" },
  { name: "MySQL", category: "backend", spec: "Gestion de bases de données relationnelles" },
  { name: "MongoDB", category: "backend", spec: "Modélisation NoSQL & Agrégations" },
  { name: "Connexion ADO", category: "backend", spec: "Interopérabilité & Connectivité logicielle" },
  { name: "Microsoft Excel", category: "backend", spec: "Parsing avancé & Modèles macro" },
  { name: "Power BI", category: "backend", spec: "Flux financiers, ETL & Business Intelligence" },
  { name: "Machine Learning", category: "backend", spec: "Modèles prédictifs & Pipelines de données" },

  // Réseau & DevOps
  { name: "TCP/IP & VPN", category: "devops", spec: "Subnetting CIDR, DNS, routage HTTPS" },
  { name: "Tunnels Tailscale", category: "devops", spec: "Architectures Mesh privées sécurisées" },
  { name: "Kali Linux", category: "devops", spec: "Tests de pénétration & Audit de sécurité" },
  { name: "VirtualBox", category: "devops", spec: "Isolation d'environnements & Sandboxing" },
  { name: "Docker", category: "devops", spec: "Conteneurisation d'applications isolées" },
  { name: "AWS", category: "devops", spec: "Infrastructures cloud Cloud-Native" },
  { name: "Microsoft Azure", category: "devops", spec: "Gestion de services d'entreprise cloud" },
  { name: "GitHub / Git", category: "devops", spec: "Versionnage de code distribué" },
  { name: "CI/CD & Vercel", category: "devops", spec: "Automatisation des déploiements continus" },
  { name: "Render & Hostinger", category: "devops", spec: "Hébergement de services & Gestion DNS" },

  // IA
  { name: "Prompt Engineering", category: "ai", spec: "Optimisation contextuelle (GPT-4, Claude)" },
  { name: "APIs OpenAI / Claude", category: "ai", spec: "Intégration d'agents autonomes & LLMs" },
  { name: "GitHub Copilot", category: "ai", spec: "Accélération du cycle de développement pro" },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredSkills = activeTab === 'all'
    ? detailedSkills
    : detailedSkills.filter(skill => skill.category === activeTab);

  return (
    <section className="py-24 px-6 border-t border-slate-200 dark:border-white/10" style={{ backgroundColor: 'var(--bg)' }} id="skills">
      <div className="max-w-7xl mx-auto">
        
        {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-20">
          <span className="text-slate-950 dark:text-slate-850 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Technical Stack Ledger
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Arsenal <span className="underline decoration-1 underline-offset-8">Cognitif</span>
          </h2>
          <p className="text-base md:text-lg text-slate-950 dark:text-slate-400 font-black tracking-wide leading-relaxed max-w-2xl mx-auto">
            Une fusion de maîtrise technologique avancée et d'intégration d'intelligence artificielle pour bâtir des infrastructures logicielles hautement performantes.
          </p>
        </div>

        {/* --- FILTRES DE GRILLE ORTHOGONAUX --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => {
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 font-bold uppercase text-[10px] tracking-widest border transition-all duration-200 ${
                  isSelected 
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-black border-transparent' 
                    : 'bg-slate-50 dark:bg-[#09090b] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30'
                }`}
              >
                <span className={isSelected ? 'text-white dark:text-black' : 'text-slate-400 dark:text-slate-500'}>
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* --- GRILLE DE CAPACITÉS SYSTÈME (BENTO LIGHT) --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredSkills.map((skill) => {
              const Icon = skillIcons[skill.name] || FaTerminal;

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  whileTap={{ scale: 0.99 }}
                  className="p-6 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-colors duration-200 hover:border-slate-400 dark:hover:border-white/30 flex flex-col justify-between group min-h-[120px]"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl text-slate-950 dark:text-white transition-colors duration-300 group-hover:text-orange-500 mt-0.5">
                      <Icon />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-sm uppercase tracking-wide text-slate-950 dark:text-white truncate">
                          {skill.name}
                        </span>
                      </div>
                      
                      <p className="text-slate-950 dark:text-slate-850 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
                        &gt;_ {skill.spec}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end font-bold text-[10px] text-slate-950 dark:text-slate-850 group-hover:text-orange-500 transition-colors">
                    <span>[{skill.category.toUpperCase()}_NODE]</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* --- STATUT DE VEILLE TECHNIQUE --- */}
        <div className="mt-16 text-center font-bold text-[9px] text-slate-950 dark:text-slate-850">
          <p>[sys_log]: pipeline_status_ok • veille_technologique_active_24/7</p>
        </div>
        
      </div>
    </section>
  );
}
