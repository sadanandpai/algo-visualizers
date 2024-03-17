/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.js',
    watch: false,
  },
});
