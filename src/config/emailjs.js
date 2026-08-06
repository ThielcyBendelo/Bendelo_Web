/**
 * Configuration EmailJS — uniquement via variables Vite (.env).
 * Configurez avec: powershell -ExecutionPolicy Bypass -File .\scripts\setup-emailjs.ps1
 * Public Key = Account → API keys (pas user_...)
 *
 * Templates recommandés pour le devis :
 * - VITE_EMAILJS_TEMPLATE_ID          → notification prestataire (To: {{to_email}})
 * - VITE_EMAILJS_CLIENT_TEMPLATE_ID   → copie client (optionnel, sinon même template)
 * Le champ "To Email" du template doit être {{to_email}} pour router toi + le client.
 * Pièces jointes : plan EmailJS qui autorise les attachments (sinon PDF téléchargé côté navigateur).
 */
const isPlaceholder = (value) => {
  if (typeof value !== 'string' || !value.trim()) return true;
  const v = value.trim();
  if (v.includes('YOUR_') || v === 'PUBLIC_KEY') return true;
  if (v.startsWith('user_')) return true;
  return false;
};

const fromEnv = (key) => {
  const value = import.meta.env[key];
  return isPlaceholder(value) ? '' : value.trim();
};

export const emailJsConfig = {
  serviceId: fromEnv('VITE_EMAILJS_SERVICE_ID'),
  templateId: fromEnv('VITE_EMAILJS_TEMPLATE_ID'),
  /** Template copie client (optionnel) */
  clientTemplateId:
    fromEnv('VITE_EMAILJS_CLIENT_TEMPLATE_ID') ||
    fromEnv('VITE_EMAILJS_TEMPLATE_ID'),
  publicKey: fromEnv('VITE_EMAILJS_PUBLIC_KEY'),
  ownerEmail: fromEnv('VITE_OWNER_EMAIL') || 'bendelothielcy@gmail.com',
  apiUrl: 'https://api.emailjs.com/api/v1.0/email/send',
};

export const isEmailJsConfigured = () =>
  Boolean(
    emailJsConfig.serviceId &&
      emailJsConfig.templateId &&
      emailJsConfig.publicKey
  );

export default emailJsConfig;
