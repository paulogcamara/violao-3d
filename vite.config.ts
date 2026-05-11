import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "/violao-3d/",
  plugins: [react(), tailwindcss(), glsl()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/three/")) return "three";
          if (id.includes("/@react-three/")) return "r3f";
          if (id.includes("/postprocessing/")) return "r3f";
          if (id.includes("/gsap/") || id.includes("/lenis/")) return "motion";
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) return "react";
        },
      },
    },
  },
});
