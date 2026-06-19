import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { resolve } from "node:path";

// Builds the ChatGPT Apps SDK widget as a single, self-contained HTML file.
// Everything (JS + CSS) is inlined so the skybridge iframe never has to load
// an external <script src> / <link rel="stylesheet">, and no <base href> is
// needed — all of which the ChatGPT CSP blocks.
export default defineConfig({
  root: resolve(__dirname, "widget"),
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: { "@": resolve(__dirname, ".") },
  },
  // @tailwindcss/vite handles CSS itself; don't let Vite pick up the Next.js
  // postcss.config.mjs (which uses the incompatible @tailwindcss/postcss plugin).
  css: { postcss: { plugins: [] } },
  build: {
    outDir: resolve(__dirname, "widget/dist"),
    emptyOutDir: true,
    // Make sure nothing is split out into a separate chunk/asset file.
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
