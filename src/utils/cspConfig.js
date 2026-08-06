export const CSPConfig = {
  development: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdn.jsdelivr.net', 'https://www.googletagmanager.com', 'https://www.google-analytics.com'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https://www.google.com', 'https://www.google-analytics.com', 'https://region1.google-analytics.com', 'http://localhost:*', 'https://api.github.com', 'https://api.emailjs.com'],
    // Google Maps embed utilise maps.google.com / www.google.com
    'frame-src': ["'self'", 'https://www.google.com', 'https://maps.google.com', 'https://www.google.com/maps'],
    'frame-ancestors': ["'self'"],
  },
  production: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net', 'https://www.googletagmanager.com', 'https://www.google-analytics.com'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https://api.emailjs.com', 'https://www.google-analytics.com', 'https://region1.google-analytics.com'],
    'frame-src': ["'self'", 'https://www.google.com', 'https://maps.google.com'],
    'frame-ancestors': ["'none'"],
    'form-action': ["'self'"],
    'base-uri': ["'self'"],
    'upgrade-insecure-requests': [],
  }
};

export const generateCSPHeader = (config) => {
  return Object.entries(config)
    .filter(([key, values]) => {
      return values.length > 0 && key !== 'frame-ancestors';
    })
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}; // <--- La correction était ici (ligne 44)

export const applyCSPMeta = () => {
  const isDevelopment = import.meta.env.DEV;
  const config = isDevelopment ? CSPConfig.development : CSPConfig.production;
  const cspContent = generateCSPHeader(config);

  const metaTag = document.createElement('meta');
  metaTag.httpEquiv = 'Content-Security-Policy';
  metaTag.content = cspContent;
  document.head.appendChild(metaTag);
}; // <--- Et ici

export const setupCSPViolationReporting = () => {
  document.addEventListener('securitypolicyviolation', (event) => {
    console.warn('🚨 CSP Violation Detected:', {
      blockedURI: event.blockedURI,
      violatedDirective: event.violatedDirective,
    });
  });
}; // <--- Et ici

export default {
  CSPConfig,
  generateCSPHeader,
  applyCSPMeta,
  setupCSPViolationReporting
};
