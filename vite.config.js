import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', 
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // O bloco 'server' com o proxy foi removido daqui
  plugins: [
    react(),
  ]
});
