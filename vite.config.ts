import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    hmr: {
      overlay: false,
      timeout: 120000
    },
    watch: {
      usePolling: true,
      interval: 1000,
      binaryInterval: 3000
    },
    host: true,
    strictPort: false,
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    }
  },
  css: {
    devSourcemap: true
  }
});