import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1024,
  viewportHeight: 800,
  defaultCommandTimeout: 50000,
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
