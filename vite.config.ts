import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {imagetools} from "vite-imagetools";
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false
    })
  ],
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    // open: true,
  }
})
