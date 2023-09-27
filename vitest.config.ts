import { defineConfig } from "vite";
import { fileURLToPath } from "url";
/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup.js",
    watch: false,
  },
});
