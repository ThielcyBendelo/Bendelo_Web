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
    <section 
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5" 
      id="skills"
    >
      {/* --- MAILLAGE GÉOMÉTRIQUE STRICT EN ARRIÈRE-PLAN --- */}
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
            className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block"
          >
            // TECHNICAL_STACK_LEDGER
          </motion.span>
          
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            ARSENAL <span className="text-[#FF6B35] italic">COGNITIF</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Une fusion de maîtrise technologique avancée et d'intégration d'intelligence artificielle pour bâtir des infrastructures logicielles hautement performantes.
          </p>
        </div>

        {/* --- FILTRES DE GRILLE ORTHOGONAUX (SANS ARRONDIS) --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 font-mono font-bold uppercase text-[10px] tracking-widest border transition-all duration-300 rounded-none ${
                  isSelected 
                    ? 'bg-white text-black border-transparent shadow-xl' 
                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-[#FF6B35]/50 hover:text-white'
                }`}
              >
                <span className={isSelected ? 'text-black' : 'text-slate-500 group-hover:text-[#FF6B35]'}>
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* --- GRILLE DE CAPACITÉS SYSTÈME (STRICTEMENT CARRÉ) --- */}
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
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative p-6 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 flex flex-col justify-between rounded-none shadow-2xl overflow-hidden min-h-[140px]"
                >
                  {/* Lueur angulaire au survol */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />

                  <div className="flex items-start gap-5 relative z-10">
                    <div className="text-2xl text-slate-400 group-hover:text-[#FF6B35] group-hover:scale-110 transition-all duration-300 mt-1">
                      <Icon />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-base uppercase tracking-wider text-white truncate">
                          {skill.name}
                        </span>
                      </div>
                      
                      <p className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.2em] text-[9px] mb-3 block">
                        &gt;_ {skill.spec}
                      </p>
                    </div>
                  </div>
                  
                  {/* Tag system de bas de carte */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex justify-end items-center gap-2 font-mono font-bold text-[10px] text-slate-500 group-hover:text-[#FF6B35] transition-colors relative z-10">
                    <span className="text-[8px] opacity-40 uppercase tracking-widest">Node_Status</span>
                    <span>[{skill.category.toUpperCase()}_NODE]</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* --- STATUT DE VEILLE TECHNIQUE STYLE CONSOLE --- */}
        <div className="mt-20 text-center font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">
          <p className="flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse"></span>
            [sys_log]: pipeline_status_ok • veille_technologique_active_24/7
          </p>
        </div>
        
      </div>
    </section>
  );
}
