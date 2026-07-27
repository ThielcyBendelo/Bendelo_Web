import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormSecurity from '../hooks/useFormSecurity';
import authService from '../services/authService';

const SecureLogin = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = {
    email: { type: 'email', required: true },
    password: { type: 'password', required: true },
  };

  const {
    formData,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
  } = useFormSecurity(formSchema, async (data) => {
    try {
      setApiError('');
      const resp = await authService.login(data.email, data.password);
      if (resp?.user?.role === 'admin') {
        navigate('/client-dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      setApiError(error.userMessage || error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');
    handleFormSubmit(e);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-3 py-6 sm:px-4 relative overflow-hidden">
      {/* Lignes de repères géométriques en arrière-plan */}
      <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto w-full border-x border-white/10">
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
      </div>

      <div className="w-full max-w-sm sm:max-w-md border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] p-4 sm:p-6 lg:p-7 relative z-10">
        
        {/* --- EN-TÊTE DU PANNEAU --- */}
        <div className="text-center mb-5 sm:mb-6">
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">
            // Client Access Portal
          </span>
          <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-1.5">
            Connexion Sécurisée
          </h1>
          <p className="text-[11px] sm:text-xs font-mono text-slate-400 dark:text-slate-500">[auth_required_statement]</p>
        </div>

        {/* --- LOG DES ERREURS API --- */}
        {apiError && (
          <div className="mb-6 p-4 border border-red-500/20 text-red-500 bg-red-500/5 font-mono text-xs">
            <p>[sys_error]: {apiError}</p>
          </div>
        )}

        {/* --- FORMULAIRE DE SAISIE ORTHOGONAL --- */}
        <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-4">
          
          {/* Champ Email */}
          <div className="space-y-2">
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
              className={`w-full px-3 py-2.5 border bg-white dark:bg-white/5 text-sm text-slate-900 dark:text-white rounded-none outline-none focus:border-slate-400 dark:focus:border-white/30 transition-colors font-mono disabled:opacity-50 ${
                touched.email && errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10'
              }`}
              placeholder="user@domain.com"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 font-mono text-[10px] mt-1">[invalid_input]: {errors.email}</p>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-2">
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
              className={`w-full px-3 py-2.5 border bg-white dark:bg-white/5 text-sm text-slate-900 dark:text-white rounded-none outline-none focus:border-slate-400 dark:focus:border-white/30 transition-colors font-mono disabled:opacity-50 ${
                touched.password && errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10'
              }`}
              placeholder="••••••••"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 font-mono text-[10px] mt-1">[invalid_input]: {errors.password}</p>
            )}
          </div>

          {/* Maintien de session & Perte de code */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] font-sans font-medium text-slate-500 dark:text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 border-slate-300 dark:border-white/10 rounded-none text-slate-950 dark:text-white focus:ring-0 focus:ring-offset-0 bg-transparent"
              />
              <span>Se souvenir de moi</span>
            </label>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="hover:text-orange-500 dark:hover:text-white transition-colors"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Bouton d'action principal uniforme */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 sm:px-10 py-3 sm:py-4 bg-slate-950 dark:bg-white text-white dark:text-black font-bold uppercase text-xs tracking-widest hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2 font-mono">
                [processing...]
              </span>
            ) : (
              'Valider l\'accès'
            )}
          </button>
        </form>

        {/* --- ENREGISTREMENT / LIEN SECONDAIRE --- */}
        <div className="mt-5 sm:mt-6 text-center border-t border-slate-200 dark:border-white/5 pt-3 sm:pt-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pas encore de compte?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-slate-950 dark:text-white hover:text-orange-500 dark:hover:text-orange-500 font-bold transition-colors uppercase text-[10px] tracking-widest ml-1"
            >
              S'inscrire
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SecureLogin;
