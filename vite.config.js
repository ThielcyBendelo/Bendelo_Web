import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Ajout de l'option "version" obligatoire exigée par Babel
          ['@babel/plugin-proposal-decorators', { version: 'legacy' }]
        ]
      }
    })
  ]
});
