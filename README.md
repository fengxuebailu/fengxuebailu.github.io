# Personal Site — Xiao Chenyang

Astro 5 + Tailwind v4 personal site, Read.cv / Stripe Press style two-column
resume layout, deployed to GitHub Pages.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```

---

## The 9 places you actually need to edit

Everything else is structure. Update these and the site is yours.

| #   | File                                                | What to change                                                                          |
| --- | --------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1   | `src/data/site.ts`                                  | Name (中/英), tagline, email, GitHub, research-interest list, scholar/ORCID, sections   |
| 2   | `src/components/About.astro`                        | Two paragraphs (Chinese + English) bio                                                  |
| 3   | `src/content/education/bit.md`                      | School, degree, department, dates, optional `notes:` bullets                            |
| 4   | `src/content/experience/*.md`                       | One file per role; `placeholder: true` shows the muted "coming soon" line               |
| 5   | `src/content/publications/*.md`                     | One file per paper; mark your name with `*` (e.g. `Xiao Chenyang*, …`)                  |
| 6   | `src/content/awards/*.md`                           | Add award files; section is hidden until `sections.awards.enabled = true` in site.ts    |
| 7   | `src/content/skills/*.md`                           | Categories + items; sort with `order:`                                                  |
| 8   | `astro.config.mjs`                                  | `site` and `base` — set to your GitHub Pages URL before pushing                         |
| 9   | `public/favicon.svg`                                | Optional: replace the "XC" emerald block with your own icon                             |

---

## Local development

Requires **Node 18.20+** (Astro 5 requirement). Tested on Node 22.

```bash
npm install
npm run dev
```

Open <http://localhost:4321>. Edits to `.astro`, `.md`, `site.ts`, or any
component hot-reload immediately.

```bash
npm run build      # type-check + build to dist/
npm run preview    # serve dist/ locally
```

---

## Deploy to GitHub Pages

Two common setups:

### A. Repo named `<username>.github.io` (root site)

1. Edit `astro.config.mjs`:
   ```js
   site: "https://<username>.github.io",
   base: "/",
   ```
2. Push to `main`. The workflow at `.github/workflows/deploy.yml` builds and
   deploys automatically.
3. In GitHub repo settings → **Pages** → **Source**, select **GitHub Actions**.

### B. Any other repo name (e.g. `personal-site`)

1. Edit `astro.config.mjs`:
   ```js
   site: "https://<username>.github.io",
   base: "/<repo-name>/",
   ```
2. Push to `main`, then enable **Pages → Source → GitHub Actions** in repo
   settings.
3. Final URL: `https://<username>.github.io/<repo-name>/`.

The included workflow uses the official `withastro/action@v3` runner — no extra
configuration needed.

---

## Project structure

```
personal_site/
├── astro.config.mjs               # site / base — edit before deploy
├── package.json
├── tsconfig.json (strict)
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── docs/
│   └── v2_brief_readcv.md         # design brief (read.cv / Stripe Press)
├── src/
│   ├── content/                   # ← edit markdown to update each section
│   │   ├── config.ts              # collection schemas
│   │   ├── education/
│   │   ├── experience/
│   │   ├── publications/
│   │   ├── awards/
│   │   └── skills/
│   ├── data/
│   │   └── site.ts                # ← single source of truth for global info
│   ├── components/
│   │   ├── Sidebar.astro          # name · tagline · research · contact
│   │   ├── SectionRow.astro       # generic two-column timeline row
│   │   ├── About.astro
│   │   ├── Education.astro
│   │   ├── Experience.astro
│   │   ├── Publications.astro
│   │   ├── Awards.astro           # disabled by default
│   │   ├── Projects.astro
│   │   ├── Skills.astro
│   │   ├── Footer.astro
│   │   └── ThemeToggle.astro
│   ├── layouts/
│   │   └── Base.astro             # html shell, fonts, theme bootstrap
│   ├── pages/
│   │   └── index.astro            # composes the sections
│   └── styles/
│       └── global.css             # Tailwind v4 + theme tokens
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Design notes

- **Layout**: 1080px container, sticky 320px sidebar + scrollable main column,
  collapsing to single column under 1024px.
- **Stack**: Astro 5, Tailwind CSS v4 (via `@tailwindcss/vite`), TypeScript
  strict. No React/Vue runtime — pure static HTML.
- **Typography**: Inter (Latin) + Newsreader (serif accents) + Geist Mono
  (dates) + Noto Sans SC (CJK fallback), all via Google Fonts.
- **Colors**: zinc base + emerald accent. Dark mode uses `zinc-950`, never
  pure black.
- **Theme**: light by default; the toggle in the top-right writes
  `localStorage.theme`. A small inline script in `Base.astro` reads it before
  paint to prevent FOUC.
- **Animation**: pure CSS `@starting-style` fade-in plus a 7-px emerald spike
  pulsing next to the name (respects `prefers-reduced-motion`). No motion
  libraries.
- **Sections**: each section is toggleable from `site.ts → sections`; flip
  `enabled: false` to hide without deleting markup. `awards` is off by default.
