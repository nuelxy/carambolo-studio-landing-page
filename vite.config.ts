import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3333",
        changeOrigin: true,
      },
    },
  },
  plugins: [viteReact(), tailwindcss(), tsConfigPaths()],
});
