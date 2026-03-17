import { URL, fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@sortViz': fileURLToPath(
        new URL('./src/apps/sorting-visualizer', import.meta.url)
      ),
      '@pathFinder': fileURLToPath(
        new URL('./src/apps/path-finder', import.meta.url)
      ),
    },
  },
  base: '/algo-visualizers/',
  build: {
    outDir: 'docs',
  },
});
