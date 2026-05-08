// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// ─────────────────────────────────────────────────────────────────────────────
// TODO (user): before pushing to GitHub, edit the two values below.
//
//   1) `site`  — your published URL.
//        - If repo is `<username>.github.io`  → "https://<username>.github.io"
//        - If repo is any other name (e.g. `personal-site`)
//                                           → "https://<username>.github.io/<repo-name>/"
//
//   2) `base`  — the URL path the site is served from.
//        - For `<username>.github.io`        → "/"
//        - For any other repo name           → "/<repo-name>/"
//
// Example for user `fengxuebailu` deploying to repo `personal-site`:
//   site: "https://fengxuebailu.github.io",
//   base: "/personal-site/",
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  site: "https://fengxuebailu.github.io",
  base: "/",
  trailingSlash: "ignore",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
