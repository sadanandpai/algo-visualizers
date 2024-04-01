import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@sortViz': path.resolve(__dirname, './src/apps/sorting-visualizer'),
      '@pathFinder': path.resolve(__dirname, './src/apps/path-finder'),
      '@nQueen': path.resolve(__dirname, './src/apps/n-queen'),
    },
  },
  base: '/algo-visualizers/',
  build: {
    outDir: 'docs',
  },
});
