import React, { useState } from 'react';
import { marked } from 'marked';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPen, FaEye, FaEyeSlash, FaUser, FaTag, FaLayerGroup, FaCheck, FaTimes } from 'react-icons/fa';

export default function BlogForm({ onSubmit, onCancel, initialValues }) {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [author, setAuthor] = useState(initialValues?.author || 'Bendelo Thielcy'); // Auteur par défaut
  const [category, setCategory] = useState(initialValues?.category || '');
  const [tags, setTags] = useState(initialValues?.tags ? initialValues.tags.join(', ') : '');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !author) return;
    onSubmit({
      title,
      content,
      author,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0A0E1A] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl mb-12"
    >
      <header className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-black text-white italic flex items-center gap-3">
          <span className="p-3 bg-orange-500/20 rounded-2xl text-orange-500"><FaPen /></span>
          {initialValues ? 'Modifier l\'Article' : 'Nouvelle Pensée'}
        </h3>
        <button 
          onClick={onCancel}
          className="p-3 bg-white/5 text-slate-400 hover:text-white rounded-full transition-colors"
        >
          <FaTimes />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITRE */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-black text-purple-400 ml-2">Titre de l'ouvrage / Article</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-orange-500 transition-all font-bold text-lg"
            placeholder="Ex: L'éveil de la jeunesse africaine..."
            required
          />
        </div>

        {/* ÉDITEUR & PREVIEW */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-purple-400">Contenu (Format Markdown)</label>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
                showPreview ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-300'
              }`}
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <><FaEyeSlash /> Éditer</> : <><FaEye /> Voir l'aperçu</>}
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {!showPreview ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-mono text-sm outline-none focus:border-purple-500 transition-all min-h-[300px]"
                placeholder="Rédigez avec impact..."
                required
              />
            ) : (
              <div 
                className="w-full p-8 rounded-2xl bg-white/[0.02] border border-purple-500/20 text-slate-300 prose prose-invert max-w-none min-h-[300px] overflow-y-auto" 
                dangerouslySetInnerHTML={{ __html: marked.parse(content) }} 
              />
            )}
          </div>
        </div>

        {/* MÉTA-DONNÉES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-purple-400 ml-2">
              <FaUser className="text-[8px]" /> Auteur
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-purple-400 ml-2">
              <FaLayerGroup className="text-[8px]" /> Catégorie
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-orange-500"
              placeholder="Technologie, Éveil..."
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-purple-400 ml-2">
              <FaTag className="text-[8px]" /> Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-orange-500"
              placeholder="React, Afrique..."
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-6">
          <button 
            type="button" 
            className="px-8 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest"
            onClick={onCancel}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="px-10 py-3 bg-gradient-to-r from-purple-600 to-orange-600 text-white font-black rounded-xl shadow-lg shadow-purple-500/20 hover:scale-105 transition-all text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <FaCheck /> {initialValues ? 'Enregistrer les modifications' : 'Publier l\'article'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
