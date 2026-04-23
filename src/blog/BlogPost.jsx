import React, { useState, useEffect } from 'react';
import { exportCommentsToCSV } from './CommentsExportCSV';
import { toast } from 'react-toastify';
import { blogService } from '../services/blogService.firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRegEye, FaRegComment, FaRegCalendarAlt, FaUserEdit, 
  FaTrashAlt, FaEdit, FaPaperPlane, FaFileExport, FaQuoteLeft 
} from 'react-icons/fa';

export default function BlogPost({ id, title, content, author, date, category, tags, excerpt, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [views, setViews] = useState(0);

  const preview = excerpt || (content.length > 180 ? content.slice(0, 180) + '...' : content);

  useEffect(() => {
    blogService.getComments(id).then(setComments).catch(() => setComments([]));
    blogService.incrementViews(id).then(data => setViews(data.views)).catch(() => setViews(0));
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const newComment = await blogService.addComment(id, { text: commentText });
      setComments([newComment, ...comments]);
      setCommentText('');
      toast.success('Commentaire ajouté !');
    } catch {
      toast.error("Erreur lors de l'ajout.");
    }
  };

  const handleDeleteComment = async (idx) => {
    try {
      const commentId = comments[idx].id || comments[idx]._id;
      await blogService.deleteComment(id, commentId);
      setComments(comments.filter((_, i) => i !== idx));
      toast.info('Commentaire supprimé.');
    } catch {
      toast.error("Erreur lors de la suppression.");
    }
  };

  const userRole = typeof window !== 'undefined' ? localStorage.getItem('dashboardRole') || 'reader' : 'reader';

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group bg-[#0A0E1A]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 hover:border-orange-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
    >
      {/* --- HEADER : CATEGORY & TAGS --- */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {category && (
          <span className="px-4 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-widest">
            {category}
          </span>
        )}
        {tags?.map((tag, idx) => (
          <span key={idx} className="text-orange-500/60 text-[10px] font-bold uppercase italic">#{tag}</span>
        ))}
      </div>

      {/* --- TITLE & CONTENT --- */}
      <h4 className="text-3xl md:text-4xl font-black mb-6 text-white tracking-tighter leading-none group-hover:text-orange-500 transition-colors duration-300">
        {title}
      </h4>

      <div className="relative text-slate-300 text-lg leading-relaxed font-light mb-8">
        <FaQuoteLeft className="absolute -left-6 top-0 text-white/5 text-4xl" />
        <p className="whitespace-pre-line italic">
          {expanded ? content : preview}
        </p>
        {content.length > 180 && (
          <button
            className="mt-4 text-orange-500 text-xs font-black uppercase tracking-widest hover:underline block"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '[ Réduire ]' : '[ Continuer la lecture ]'}
          </button>
        )}
      </div>

      {/* --- METADATA BAR --- */}
      <div className="flex flex-wrap justify-between items-center py-6 border-t border-white/5 gap-4">
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <span className="flex items-center gap-2"><FaRegEye className="text-orange-500 text-sm" /> {views} Vues</span>
          <span className="flex items-center gap-2"><FaRegComment className="text-purple-500 text-sm" /> {comments.length} Réactions</span>
          <span className="flex items-center gap-2"><FaRegCalendarAlt /> {date}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-white uppercase italic">Par <span className="text-orange-500">{author}</span></span>
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button onClick={() => onEdit(id, { title, content, author, date, category, tags })} className="p-3 bg-white/5 text-slate-400 hover:text-white rounded-xl transition-all"><FaEdit /></button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(id)} className="p-3 bg-white/5 text-slate-400 hover:text-red-500 rounded-xl transition-all"><FaTrashAlt /></button>
            )}
          </div>
        </div>
      </div>

      {/* --- COMMENTS SECTION --- */}
      <div className="mt-8 pt-8 border-t border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-sm font-black uppercase tracking-[0.3em] text-purple-400">Espace de dialogue</h5>
          {['admin','editor'].includes(userRole) && comments.length > 0 && (
            <button onClick={() => exportCommentsToCSV(comments, title)} className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase hover:underline">
              <FaFileExport /> Exporter CSV
            </button>
          )}
        </div>

        <form onSubmit={handleAddComment} className="relative mb-8">
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            className="w-full pl-6 pr-24 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-orange-500 transition-all"
            placeholder="Partagez votre réflexion..."
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 px-6 bg-orange-600 rounded-xl text-white font-black uppercase text-[10px] tracking-widest hover:bg-orange-500 transition-all">
            <FaPaperPlane />
          </button>
        </form>

        <ul className="space-y-4">
          <AnimatePresence>
            {comments.map((c, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="group/comment p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center"
              >
                <div>
                  <p className="text-slate-300 text-sm font-medium">{c.text}</p>
                  <span className="text-[9px] text-slate-600 uppercase font-bold mt-1 block tracking-tighter">{c.date}</span>
                </div>
                <button onClick={() => handleDeleteComment(idx)} className="opacity-0 group-hover/comment:opacity-100 p-2 text-red-500/50 hover:text-red-500 transition-all">
                  <FaTrashAlt className="text-xs" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
          {comments.length === 0 && (
            <p className="text-slate-600 text-xs italic text-center py-4">Soyez le premier à réveiller la conversation.</p>
          )}
        </ul>
      </div>
    </motion.article>
  );
}
