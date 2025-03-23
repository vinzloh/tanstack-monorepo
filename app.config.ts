// app.config.ts
import { defineConfig } from "@tanstack/react-start/config";
import { cloudflare } from "unenv";
import tsConfigPaths from "vite-tsconfig-paths";
console.log(`app.config defineConfig`);

export default defineConfig({
  server: {
    preset: "cloudflare-pages",
    unenv: cloudflare,
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
