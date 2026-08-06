import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaUser, FaEnvelope, FaPhoneAlt, FaBuilding, FaBriefcase,
  FaIndustry, FaGlobe, FaCogs, FaDollarSign, FaClock,
  FaCommentAlt, FaPaperclip, FaTimes, FaPaperPlane,
  FaCheckCircle, FaExclamationTriangle, FaFileAlt,
  FaShieldAlt, FaRocket, FaInfoCircle, FaTrash
} from 'react-icons/fa';
import emailService from '../services/emailService';

const SERVICES = [
  { value: 'site-web', label: 'Site Web vitrine' },
  { value: 'e-commerce', label: 'Site E-commerce' },
  { value: 'application', label: 'Application Web' },
  { value: 'mobile', label: 'Application Mobile' },
  { value: 'cybersecurite', label: 'Cybersécurité' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'cloud', label: 'Cloud & Hébergement' },
  { value: 'autre', label: 'Autre projet' },
];

const TIMELINES = [
  { value: 'urgent', label: "Urgent (< 1 semaine)" },
  { value: '1-2-semaines', label: '1–2 semaines' },
  { value: '1-2-mois', label: '1–2 mois' },
  { value: '3-6-mois', label: '3–6 mois' },
  { value: 'flexible', label: 'Flexible' },
];

const initialState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  job: '',
  sector: '',
  website: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

const labelClass =
  'text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5';

const inputBase =
  'w-full pl-10 pr-3 py-3 border bg-white dark:bg-white/5 text-sm text-slate-950 dark:text-white rounded-none outline-none transition-colors font-mono placeholder:text-slate-400 dark:placeholder:text-slate-600';

const inputOk =
  'border-slate-200 dark:border-white/10 focus:border-[#FF6B35] dark:focus:border-[#FF6B35]';

const inputErr =
  'border-red-500 focus:border-red-500';

const Field = ({ icon: Icon, label, error, children, required }) => (
  <div className="space-y-0.5">
    <label className={labelClass}>
      {label}{required ? ' *' : ''}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6B35]/80 text-xs pointer-events-none">
        <Icon />
      </span>
      {children}
    </div>
    {error && (
      <p className="text-[10px] font-mono text-red-500 flex items-center gap-1.5 pt-1">
        <FaExclamationTriangle className="text-[9px]" /> {error}
      </p>
    )}
  </div>
);

const QuoteModal = ({ isOpen, onClose, defaultService }) => {
  const [formData, setFormData] = useState({ ...initialState, projectType: defaultService || '' });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...initialState, projectType: defaultService || '' });
      setFiles([]);
      setResult(null);
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, defaultService]);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      const t = setTimeout(() => firstInputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen || !modalRef.current) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = modalRef.current.querySelectorAll(
        'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e) => {
    const next = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...next].slice(0, 5));
    e.target.value = '';
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Nom requis';
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      next.email = 'Email valide requis';
    }
    if (!formData.projectType) next.projectType = 'Service requis';
    if (!formData.timeline) next.timeline = 'Délai requis';
    if (formData.website && formData.website.trim() && !/^https?:\/\/.+\..+/.test(formData.website)) {
      next.website = 'URL valide (https://...)';
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await emailService.sendQuoteRequest(formData, files, {
        downloadPdf: true,
      });
      setResult({
        ...res,
        quoteRef: res.pdf?.quoteRef,
        filename: res.pdf?.filename,
      });
      if (res.success) {
        setFormData({ ...initialState, projectType: defaultService || '' });
        setFiles([]);
      }
    } catch {
      setResult({
        success: false,
        message: "Erreur d'envoi. Réessayez ou contactez-moi via WhatsApp.",
      });
    }
    setLoading(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) onClose();
  };

  const fieldClass = (name) =>
    `${inputBase} ${errors[name] ? inputErr : inputOk}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
          aria-labelledby="quote-modal-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <motion.div
            ref={modalRef}
            className="relative w-full max-w-2xl max-h-[92vh] flex flex-col border border-white/10 bg-[#0A1622] shadow-2xl rounded-none overflow-hidden"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            tabIndex={-1}
          >
            {/* Accent top line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent flex-shrink-0" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-6 pb-4 border-b border-white/10 flex-shrink-0">
              <div className="min-w-0">
                <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.3em] text-[9px] block mb-2">
                  // quote_request_protocol
                </span>
                <h2
                  id="quote-modal-title"
                  className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3"
                  style={{ fontFamily: "'Antonio', sans-serif" }}
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 border border-[#FF6B35]/40 bg-[#FF6B35]/10 text-[#FF6B35] text-sm">
                    <FaFileAlt />
                  </span>
                  Dossier Devis
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 font-medium tracking-wide max-w-md">
                  Décrivez votre besoin. Réponse sous 24–48h ouvrées avec une proposition structurée.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-shrink-0 w-10 h-10 border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/10 transition-colors flex items-center justify-center disabled:opacity-40"
                aria-label="Fermer"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* Body scrollable */}
            <div className="overflow-y-auto flex-1 px-5 sm:px-8 py-6 custom-scrollbar">
              {result?.success ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center py-10 px-4"
                >
                  <div className="w-16 h-16 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl mb-5">
                    <FaCheckCircle />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-white mb-2">
                    Demande transmise
                  </h3>
                  {result.quoteRef && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6B35] mb-3">
                      REF {result.quoteRef}
                    </p>
                  )}
                  <p className="text-sm text-slate-400 max-w-md mb-3 leading-relaxed">
                    {result.message ||
                      'Votre dossier a été reçu. Une copie PDF a été préparée pour vous.'}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 max-w-md mb-8 leading-relaxed">
                    PDF personnalisé généré
                    {result.filename ? ` : ${result.filename}` : ''}.
                    Vérifiez aussi vos emails (boîte de réception / spam) pour la copie client.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3.5 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors"
                  >
                    Fermer
                  </button>
                </motion.div>
              ) : (
                <form id="quote-request-form" onSubmit={handleSubmit} className="space-y-7" noValidate>
                  {/* Section contact */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <FaUser className="text-[#FF6B35] text-xs" />
                      <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-300">
                        // identité_client
                      </h3>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field icon={FaUser} label="Nom complet" error={errors.name} required>
                        <input
                          ref={firstInputRef}
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jean Dupont"
                          className={fieldClass('name')}
                        />
                      </Field>
                      <Field icon={FaEnvelope} label="Email pro" error={errors.email} required>
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jean@entreprise.com"
                          className={fieldClass('email')}
                        />
                      </Field>
                      <Field icon={FaPhoneAlt} label="Téléphone">
                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+243 ..."
                          className={`${inputBase} ${inputOk}`}
                        />
                      </Field>
                      <Field icon={FaBuilding} label="Société">
                        <input
                          type="text"
                          name="company"
                          autoComplete="organization"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Nom de l'entreprise"
                          className={`${inputBase} ${inputOk}`}
                        />
                      </Field>
                      <Field icon={FaBriefcase} label="Fonction">
                        <input
                          type="text"
                          name="job"
                          value={formData.job}
                          onChange={handleChange}
                          placeholder="CEO, CTO, Founder..."
                          className={`${inputBase} ${inputOk}`}
                        />
                      </Field>
                      <Field icon={FaIndustry} label="Secteur">
                        <input
                          type="text"
                          name="sector"
                          value={formData.sector}
                          onChange={handleChange}
                          placeholder="Fintech, Santé, Éducation..."
                          className={`${inputBase} ${inputOk}`}
                        />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field icon={FaGlobe} label="Site web" error={errors.website}>
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://..."
                            className={fieldClass('website')}
                          />
                        </Field>
                      </div>
                    </div>
                  </section>

                  {/* Section projet */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <FaRocket className="text-[#FF6B35] text-xs" />
                      <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-300">
                        // scope_projet
                      </h3>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field icon={FaCogs} label="Service" error={errors.projectType} required>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className={`${fieldClass('projectType')} appearance-none cursor-pointer`}
                        >
                          <option value="" className="bg-[#0A1622]">Sélectionnez un service</option>
                          {SERVICES.map((s) => (
                            <option key={s.value} value={s.value} className="bg-[#0A1622]">
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field icon={FaClock} label="Délai souhaité" error={errors.timeline} required>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className={`${fieldClass('timeline')} appearance-none cursor-pointer`}
                        >
                          <option value="" className="bg-[#0A1622]">Sélectionnez un délai</option>
                          {TIMELINES.map((t) => (
                            <option key={t.value} value={t.value} className="bg-[#0A1622]">
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field icon={FaDollarSign} label="Budget estimé (USD)">
                        <input
                          type="number"
                          name="budget"
                          min="0"
                          step="50"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="ex: 1500"
                          className={`${inputBase} ${inputOk}`}
                        />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field icon={FaCommentAlt} label="Description du besoin">
                          <textarea
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Objectifs, contraintes, stack souhaitée, livrables attendus..."
                            className={`${inputBase} ${inputOk} resize-none min-h-[110px] py-3`}
                          />
                        </Field>
                      </div>
                    </div>
                  </section>

                  {/* Fichiers */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <FaPaperclip className="text-[#FF6B35] text-xs" />
                      <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-300">
                        // pièces_jointes
                      </h3>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border border-dashed border-white/15 hover:border-[#FF6B35]/50 bg-white/[0.02] hover:bg-[#FF6B35]/5 py-6 px-4 transition-colors group"
                    >
                      <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-[#FF6B35] transition-colors">
                        <FaPaperclip className="text-lg" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                          Ajouter des fichiers
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono">
                          PDF, DOC, images, ZIP — max 5 fichiers
                        </span>
                      </div>
                    </button>

                    {files.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {files.map((file, i) => (
                          <li
                            key={`${file.name}-${i}`}
                            className="flex items-center justify-between gap-3 px-3 py-2.5 border border-white/10 bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <FaFileAlt className="text-[#FF6B35] text-xs flex-shrink-0" />
                              <span className="text-xs font-mono text-slate-300 truncate">
                                {file.name}
                              </span>
                              <span className="text-[9px] font-mono text-slate-500 flex-shrink-0">
                                {(file.size / 1024).toFixed(0)} KB
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="text-slate-500 hover:text-red-400 transition-colors p-1"
                              aria-label="Retirer le fichier"
                            >
                              <FaTrash className="text-[10px]" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>

                  {/* Info banner */}
                  <div className="flex items-start gap-3 p-4 border border-white/10 bg-white/[0.02]">
                    <FaShieldAlt className="text-[#FF6B35] text-sm mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] font-mono leading-relaxed text-slate-400">
                      <span className="text-slate-300 font-bold">[confidentialité]</span>{' '}
                      Vos données servent uniquement au traitement de la demande. Aucune revente, aucun spam.
                    </p>
                  </div>

                  {result && !result.success && (
                    <div className="flex items-start gap-3 p-4 border border-red-500/30 bg-red-500/10 text-red-300">
                      <FaExclamationTriangle className="text-sm mt-0.5 flex-shrink-0" />
                      <p className="text-xs font-mono leading-relaxed">
                        {result.message || "Échec de l'envoi."}
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Footer actions */}
            {!result?.success && (
              <div className="flex-shrink-0 border-t border-white/10 px-5 sm:px-8 py-4 bg-[#071018] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="hidden sm:flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                  <FaInfoCircle className="text-[#FF6B35]" />
                  Champs * obligatoires
                </div>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 sm:flex-none px-5 py-3.5 border border-white/15 text-slate-300 font-bold uppercase text-[10px] tracking-widest hover:border-white/30 hover:text-white transition-colors disabled:opacity-40"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    form="quote-request-form"
                    disabled={loading}
                    className="flex-1 sm:flex-none px-6 py-3.5 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B35] hover:text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2 min-w-[160px]"
                  >
                    {loading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        PDF + envoi...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-[10px]" />
                        Envoyer le devis PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
