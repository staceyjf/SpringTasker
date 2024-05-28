/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/todo",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/config/vitest-setup.js"],
  },
});
