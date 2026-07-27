import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTerminal, FaThLarge, FaChartLine, FaFileInvoiceDollar, 
  FaServer, FaClock, FaCheckCircle, FaExclamationTriangle, FaExternalLinkAlt,
  FaUserCircle, FaFolderOpen, FaSignOutAlt, FaSlidersH, FaBars, FaTimes
} from 'react-icons/fa';

const clientProjectData = {
  clientName: "TechInnov Sarl",
  clientEmail: "contact@techinnov.com",
  projectTitle: "EcomAfrica Platform v2",
  currentPhase: "Phase 03 - Architecture & Dev",
  completionPercentage: 68,
  serverStatus: "operational",
  metrics: {
    budgetTotal: "12,500 USD",
    budgetInvested: "8,500 USD",
    hoursLogged: "142 hrs",
    nextDelivery: "05 Aout 2026"
  },
  pipelines: [
    { id: "job-892", step: "API Rest Gateway", status: "success", timestamp: "Il y a 2h" },
    { id: "job-891", step: "Stripe Payment Integration", status: "pending", timestamp: "En cours" },
    { id: "job-890", step: "Database Replication Clustering", status: "success", timestamp: "Hier" }
  ],
  invoices: [
    { ref: "INV-2026-004", amount: "4,000 USD", date: "15/07/2026", state: "paid" },
    { ref: "INV-2026-005", amount: "4,500 USD", date: "01/08/2026", state: "issued" }
  ]
};

export default function ClientDashboard() {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const sidebarLinks = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: <FaThLarge /> },
    { id: 'artifacts', label: 'Livrables & Code', icon: <FaTerminal /> },
    { id: 'finance', label: 'Facturation & Ledger', icon: <FaFileInvoiceDollar /> },
    { id: 'settings', label: 'Configuration API', icon: <FaSlidersH /> },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between p-6">
      <div className="space-y-8">
        {/* --- PROFIL DU COMPTE CLIENT --- */}
        <div className="border-b border-white/15 pb-6 flex items-center gap-3 min-w-0">
          <div className="text-3xl text-slate-400 shrink-0">
            <FaUserCircle />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white truncate">
              {clientProjectData.clientName}
            </h2>
            <span className="font-mono text-[9px] text-slate-500 block truncate">
              {clientProjectData.clientEmail}
            </span>
          </div>
        </div>

        {/* --- LINKS DE SÉLECTION --- */}
        <nav className="space-y-2">
          {sidebarLinks.map((link) => {
            const isSelected = activeMenu === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setActiveMenu(link.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 border transition-colors duration-150 text-xs font-bold uppercase tracking-wider ${
                  isSelected 
                    ? 'bg-white text-black border-transparent' 
                    : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:border-white/10 hover:bg-white/5'
                }`}
              >
                <span className="text-sm shrink-0">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* --- EN-BAS DE LA SIDEBAR --- */}
      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-3 border border-white/5 bg-white/5 px-3 py-2 font-mono text-[9px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="truncate">ENV: PRODUCTION_CLUSTER</span>
        </div>
        
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-500 transition-colors"
        >
          <FaSignOutAlt />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex relative overflow-hidden">
      
      {/* Lignes de repères géométriques en arrière-plan */}
      <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto w-full border-x border-white/10 z-0">
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
      </div>

      {/* --- SIDEBAR DESKTOP ANCRÉE (Fixée à gauche) --- */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-white/10 bg-[#09090b] z-20 relative">
        <SidebarContent />
      </aside>

      {/* --- PANNEAU DE CONTENU GLOBAL PRINCIPAL --- */}
      <div className="flex-grow flex flex-col min-w-0 z-10 relative">
        
        {/* Topbar Mobile : Déclencheur du menu tiroir */}
        <header className="lg:hidden flex items-center justify-between px-6 h-16 border-b border-white/10 bg-[#09090b] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-white bg-white text-black flex items-center justify-center font-mono font-black text-xs">BT</div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">// CONSOLE</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-slate-400 hover:text-white text-xl"
          >
            <FaBars />
          </button>
        </header>

        {/* CONTENU CENTRAL DU DASHBOARD */}
        <main className="flex-grow p-6 lg:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] lg:max-h-screen">
          
          {/* Header de projet */}
          <div className="border border-white/10 bg-[#09090b] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[9px] text-orange-500 uppercase tracking-widest">// DEPLOYMENT_TELEMETRY</span>
              <h1 className="text-base font-bold uppercase tracking-wider mt-1">
                Suivi Opérationnel : {clientProjectData.projectTitle}
              </h1>
            </div>
            <span className="font-mono text-[9px] px-2 py-0.5 border border-white/10 text-slate-400 bg-white/5 uppercase self-start sm:self-auto">
              [ STATUS: {clientProjectData.serverStatus.toUpperCase()} ]
            </span>
          </div>

          <AnimatePresence mode="wait">
            {activeMenu === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: <FaThLarge />, label: "Sprint Phase", val: clientProjectData.currentPhase },
                    { icon: <FaClock />, label: "Engineering Hours", val: clientProjectData.metrics.hoursLogged },
                    { icon: <FaChartLine />, label: "Next Delivery Target", val: clientProjectData.metrics.nextDelivery },
                    { icon: <FaFileInvoiceDollar />, label: "Total Committed Value", val: clientProjectData.metrics.budgetTotal }
                  ].map((metric, idx) => (
                    <div key={idx} className="p-5 border border-white/10 bg-[#09090b] flex flex-col justify-between min-h-[100px]">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">// {metric.label}</span>
                      <p className="text-sm font-bold uppercase tracking-wide text-white font-mono mt-3">{metric.val}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-7 border border-white/10 bg-[#09090b] p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider">DevOps Pipelines & Artifacts</h3>
                      <span className="font-mono text-[9px] px-2 py-0.5 border border-orange-500/20 text-orange-500 bg-orange-500/5">{clientProjectData.completionPercentage}% Complete</span>
                    </div>
                    <div className="h-1 bg-white/5 overflow-hidden">
                      <div className="h-full bg-white" style={{ width: `${clientProjectData.completionPercentage}%` }} />
                    </div>
                    <div className="space-y-2 font-mono text-[10px]">
                      {clientProjectData.pipelines.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-3 border border-white/5 bg-white/5">
                          <div className="flex items-center gap-3">
                            <span className={job.status === 'success' ? 'text-emerald-500' : 'text-orange-500'}>●</span>
                            <span className="text-white font-sans font-medium">{job.step}</span>
                          </div>
                          <span className="text-slate-500">{job.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 border border-white/10 bg-[#09090b] p-6 space-y-4">
                    {clientProjectData.invoices.map((inv) => (
                      <div key={inv.ref} className="flex justify-between items-center p-3 border border-white/5 bg-white/5">
                        <div>
                          <p className="text-white font-sans font-bold">{inv.ref}</p>
                          <p className="text-slate-500 text-[9px]">{inv.date}</p>
                        </div>
                        <span className="text-white font-bold">{inv.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* --- SIDEBAR TIROIR MOBILE (Framer Motion Slide-in) --- */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-[#09090b] border-r border-white/10 z-50 lg:hidden"
            >
              <div className="absolute top-4 right-4 text-slate-400 text-lg lg:hidden">
                <button type="button" onClick={() => setIsMobileSidebarOpen(false)}>
                  <FaTimes />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
