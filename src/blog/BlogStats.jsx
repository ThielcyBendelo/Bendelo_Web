import React, { useEffect, useState } from 'react';
import { blogService } from '../services/blogService.firebase';
import { newsletterService } from '../services/newsletterService.firebase';
import { motion } from 'framer-motion';
import { FaBookOpen, FaEye, FaComments, FaUsers, FaChartLine } from 'react-icons/fa';

export default function BlogStats() {
  const [stats, setStats] = useState({
    articles: 0,
    views: 0,
    comments: 0,
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const articles = await blogService.getArticles();
        const subscribers = await newsletterService.getSubscribers();
        let views = 0;
        let comments = 0;
        
        for (const a of articles) {
          views += a.views || 0;
          const cs = await blogService.getComments(a.id);
          comments += cs.length;
        }

        setStats({
          articles: articles.length,
          views,
          comments,
          subscribers: subscribers.length,
        });
      } catch (error) {
        console.error("Erreur stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="relative mb-16 p-1 rounded-[2.5rem] bg-gradient-to-r from-purple-600/20 via-orange-500/20 to-purple-600/20">
      <div className="bg-[#0A0E1A] backdrop-blur-xl rounded-[2.4rem] p-8 md:p-12 overflow-hidden">
        
        {/* Header des stats */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-orange-500/20 rounded-lg text-orange-500">
            <FaChartLine />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            Performance & Impact Digital
          </h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Calcul de l'impact en cours...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatBox label="Articles" value={stats.articles} icon={<FaBookOpen />} color="purple" />
            <StatBox label="Vues" value={stats.views} icon={<FaEye />} color="orange" />
            <StatBox label="Réactions" value={stats.comments} icon={<FaComments />} color="blue" />
            <StatBox label="Communauté" value={stats.subscribers} icon={<FaUsers />} color="emerald" />
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value, icon, color }) {
  const colorMap = {
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-6 rounded-3xl border ${colorMap[color]} group hover:scale-105 transition-all duration-300`}
    >
      <div className="text-2xl mb-4 opacity-80 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="space-y-1">
        <span className="text-3xl md:text-4xl font-black text-white block tracking-tighter">
          {value.toLocaleString()}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
