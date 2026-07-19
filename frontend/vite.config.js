import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    hmr: false,
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 1000, // 1MB — acceptable for Recharts and vendor bundles
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor';
          if (id.includes('node_modules/recharts')) return 'charts';
          if (id.includes('node_modules/@supabase')) return 'supabase';
        },
      },
    },
  },
})
