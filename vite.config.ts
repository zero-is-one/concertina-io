import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import inlineCssModules from "vite-plugin-inline-css-modules";

export default defineConfig({
  plugins: [react(), inlineCssModules()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
