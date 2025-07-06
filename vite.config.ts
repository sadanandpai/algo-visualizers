import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@sortViz': path.resolve(__dirname, './src/apps/sorting-visualizer'),
      '@pathFinder': path.resolve(__dirname, './src/apps/path-finder'),
    },
  },
  base: '/algo-visualizers/',
  build: {
    outDir: 'docs',
  },
});
