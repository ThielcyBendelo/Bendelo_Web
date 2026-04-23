import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { blogService } from '../services/blogService.firebase';
import BlogForm from './BlogForm';
import BlogStats from './BlogStats';
import { exportBlogPostsToCSV } from './BlogExportCSV';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlus, FaChevronRight, FaTerminal, FaFire, FaCalendarAlt, FaUserEdit, FaFilter, FaArrowLeft } from 'react-icons/fa';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    blogService.getArticles()
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // --- LOGIQUE DE FILTRAGE ---
  let filteredPosts = posts.filter(post => {
    const q = search.toLowerCase();
    return post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q);
  });

  // --- LOGIQUE DE TRI ---
  filteredPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    return a.title.localeCompare(b.title);
  });

  const featuredPost = filteredPosts[0];
  const popularPosts = posts.filter(p => p.views >= 10).slice(0, 3);
  const paginatedPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const userRole = localStorage.getItem('dashboardRole') || 'reader';

  return (
    <div className="space-y-20">
      
      {/* 1. NAVIGATION ET TOOLS */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl">
        <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-all">
          <FaArrowLeft /> Retour au Hub
        </button>

        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher une pensée..." 
            className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-sm focus:border-orange-500 outline-none transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {userRole === 'admin' && (
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-orange-600 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
          >
            <FaPlus /> Rédiger
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <BlogForm onSubmit={(data) => {/* addPost function */}} onCancel={() => setShowForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SECTION À LA UNE (FEATURED) */}
      {featuredPost && page === 1 && !search && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[3rem] overflow-hidden border border-white/10 bg-white/5"
        >
          <div className="lg:col-span-7 p-8 md:p-16 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1 bg-purple-600 text-[10px] font-black uppercase rounded-full tracking-widest">
              L'article Maître
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none italic">
              {featuredPost.title}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed line-clamp-3 font-light">
              {featuredPost.content}
            </p>
            <div className="flex flex-wrap gap-6 pt-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span className="flex items-center gap-2 text-orange-500"><FaTerminal /> {featuredPost.author}</span>
              <span className="flex items-center gap-2"><FaCalendarAlt /> {featuredPost.date}</span>
            </div>
            <button className="mt-8 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-xs hover:bg-orange-500 hover:text-white transition-all">
              Lire l'éveil
            </button>
          </div>
          <div className="lg:col-span-5 h-80 lg:h-auto relative">
            <img src="/public/images/blog-featured.jpg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Featured" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05070A] to-transparent lg:block hidden" />
          </div>
        </motion.div>
      )}

      {/* 3. SECTION POPULAIRES (FEU) */}
      {popularPosts.length > 0 && (
        <div className="space-y-8">
          <h3 className="flex items-center gap-3 text-orange-500 font-black uppercase tracking-[0.3em] text-xs">
            <FaFire className="animate-pulse" /> Les plus lus
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularPosts.map((post) => (
              <div key={post.id} className="p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-purple-500/30 transition-all group">
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{post.category}</span>
                <h4 className="text-xl font-bold mt-3 mb-4 group-hover:text-orange-500 transition-colors">{post.title}</h4>
                <div className="text-slate-500 text-[10px] font-bold uppercase">{post.views} Vues</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. FLUX D'ARTICLES (GRILLE) */}
      <div className="space-y-12">
        <h3 className="text-white/50 uppercase tracking-[0.5em] text-[10px] font-black text-center">Flux de pensées</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <motion.div 
              key={post.id}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-black text-orange-500 uppercase tracking-tighter">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-4 leading-tight">{post.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-4 leading-relaxed italic opacity-70 group-hover:opacity-100 transition-opacity">
                  "{post.content}"
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 italic">{post.date}</span>
                <button className="p-3 bg-white/5 rounded-xl text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <FaChevronRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 pt-10">
          <button 
            disabled={page === 1}
            onClick={() => { setPage(page - 1); window.scrollTo(0,0); }}
            className="p-4 bg-white/5 rounded-2xl disabled:opacity-20 hover:bg-orange-600 transition-all"
          >
            ←
          </button>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Page <span className="text-orange-500">{page}</span> / {totalPages}
          </span>
          <button 
            disabled={page === totalPages}
            onClick={() => { setPage(page + 1); window.scrollTo(0,0); }}
            className="p-4 bg-white/5 rounded-2xl disabled:opacity-20 hover:bg-orange-600 transition-all"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
