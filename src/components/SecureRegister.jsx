import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormSecurity from '../hooks/useFormSecurity';
import authService from '../services/authService';
import { register as apiRegister } from '../services/authApi';

const SecureRegister = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const formSchema = {
    name: { type: 'text', minLength: 2, maxLength: 50, required: true },
    email: { type: 'email', required: true },
    password: { type: 'password', required: true },
    confirmPassword: { type: 'password', required: true },
  };

  const {
    formData,
    errors,
    touched,
    isLoading,
    handleChange: baseHandleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
  } = useFormSecurity(formSchema, async (data) => {
    try {
      setApiError('');

      if (data.password !== data.confirmPassword) {
        setApiError('Les mots de passe ne correspondent pas');
        return;
      }

      const resp = await apiRegister({
        name: data.name,
        email: data.email,
        password: data.password
      });

      const user = resp?.user || authService.getCurrentUser();
      if (user?.role === 'admin') {
        navigate('/client-dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      setApiError(error.userMessage || error.message || 'Erreur lors de l\'inscription');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password' && value.length > 0) {
      const strength = authService.validatePasswordStrength(value);
      setPasswordStrength(strength);
    } else if (name === 'password') {
      setPasswordStrength(null);
    }

    baseHandleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');
    handleFormSubmit(e);
  };

  const getPasswordStrengthLabel = (score) => {
    if (score <= 2) return 'LOW_SECURITY_RISK';
    if (score <= 4) return 'MEDIUM_COMPLEXITY';
    return 'STRONG_ENCRYPTION_READY';
  };

  const getPasswordStrengthColor = (score) => {
    if (score <= 2) return 'text-red-500 border-red-500/20 bg-red-500/5';
    if (score <= 4) return 'text-orange-500 border-orange-500/20 bg-orange-500/5';
    return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-y-auto">
      {/* Lignes de repères géométriques en arrière-plan */}
      <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto w-full border-x border-white/10">
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
      </div>

      <div className="w-full max-w-md border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] p-6 sm:p-8 relative z-10 my-auto shadow-2xl">
        
        {/* --- EN-TÊTE DU PANNEAU --- */}
        <div className="text-center mb-8">
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Register New Credentials
          </span>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-2">
            Créer un compte
          </h1>
          <p className="text-xs font-mono text-slate-400 dark:text-slate-500">[initialize_secure_session]</p>
        </div>

        {/* --- LOG DES ERREURS API --- */}
        {apiError && (
          <div className="mb-6 p-4 border border-red-500/20 text-red-500 bg-red-500/5 font-mono text-xs">
            <p>[sys_error]: {apiError}</p>
          </div>
        )}

        {/* --- FORMULAIRE DE SAISIE ORTHOGONAL --- */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          
          {/* Champ Nom Complet */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Nom complet
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full px-4 py-2.5 border bg-white dark:bg-white/5 text-sm text-slate-900 dark:text-white rounded-none outline-none focus:border-slate-400 dark:focus:border-white/30 transition-colors font-mono disabled:opacity-50 ${
                touched.name && errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10'
              }`}
              placeholder="Thielcy Bendelo"
            />
            {touched.name && errors.name && (
              <p className="text-red-500 font-mono text-[10px] mt-1">[invalid_input]: {errors.name}</p>
            )}
          </div>

          {/* Champ Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Adresse Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full px-4 py-2.5 border bg-white dark:bg-white/5 text-sm text-slate-900 dark:text-white rounded-none outline-none focus:border-slate-400 dark:focus:border-white/30 transition-colors font-mono disabled:opacity-50 ${
                touched.email && errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10'
              }`}
              placeholder="user@domain.com"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 font-mono text-[10px] mt-1">[invalid_input]: {errors.email}</p>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] font-mono text-slate-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? '[ hide ]' : '[ show ]'}
              </button>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full px-4 py-2.5 border bg-white dark:bg-white/5 text-sm text-slate-900 dark:text-white rounded-none outline-none focus:border-slate-400 dark:focus:border-white/30 transition-colors font-mono disabled:opacity-50 ${
                touched.password && errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10'
              }`}
              placeholder="••••••••"
            />

            {/* Test log de force de clé de chiffrement */}
            {passwordStrength && (
              <div className={`mt-2 p-2 border font-mono text-[9px] flex justify-between items-center ${getPasswordStrengthColor(passwordStrength.score)}`}>
                <span>KEY_STRENGTH_LOG:</span>
                <span className="font-bold">[{getPasswordStrengthLabel(passwordStrength.score)}]</span>
              </div>
            )}
            
            {touched.password && errors.password && (
              <p className="text-red-500 font-mono text-[10px] mt-1">[invalid_input]: {errors.password}</p>
            )}
          </div>

          {/* Champ Confirmer le mot de passe */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="confirmPassword" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Confirmer le mot de passe
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-[10px] font-mono text-slate-400 hover:text-orange-500 transition-colors"
              >
                {showConfirmPassword ? '[ hide ]' : '[ show ]'}
              </button>
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full px-4 py-2.5 border bg-white dark:bg-white/5 text-sm text-slate-900 dark:text-white rounded-none outline-none focus:border-slate-400 dark:focus:border-white/30 transition-colors font-mono disabled:opacity-50 ${
                touched.confirmPassword && errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10'
              }`}
              placeholder="••••••••"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-500 font-mono text-[10px] mt-1">[invalid_input]: {errors.confirmPassword}</p>
            )}
          </div>

          {/* Bouton d'action principal uniforme */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-10 py-4 bg-slate-950 dark:bg-white text-white dark:text-black font-bold uppercase text-xs tracking-widest hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50 pt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2 font-mono">
                [writing_to_cluster...]
              </span>
            ) : (
              'Initialiser le compte'
            )}
          </button>
        </form>

        {/* --- RETOUR DE CONNEXION --- */}
        <div className="mt-8 text-center border-t border-slate-200 dark:border-white/5 pt-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Déjà inscrit ?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-slate-950 dark:text-white hover:text-orange-500 dark:hover:text-orange-500 font-bold transition-colors uppercase text-[10px] tracking-widest ml-1"
            >
              Se connecter
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SecureRegister;
