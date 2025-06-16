import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Your tailwindcss plugin import
import path from "path"; 

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), // Your existing tailwindcss plugin
  ],

  // This section is CORRECT. It allows you to use "@/" as an alias for "/src".
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true, 
    port: 5173, 
    
    // --- PROXY SECTION REMOVED ---
    // The proxy below was causing the error. It was redirecting requests
    // to the wrong backend port (3001).
    //
    // Since we are using the full URL ('http://localhost:8000/api/projects')
    // in our apiConfig.js and have enabled CORS on our backend, a proxy is not needed.
    //
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001',
    //     changeOrigin: true,
    //   },
    // }
  },
});