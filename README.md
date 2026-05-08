# Personal Site — Xiao Chenyang

Astro 5 + Tailwind v4 academic / portfolio site, deployed to GitHub Pages.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```

---

## The 8 places you actually need to edit

Everything else is structure. Update these files and the site is yours.

| #   | File                                                   | What to change                                                                            |
| --- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| 1   | `src/data/site.ts`                                     | Name (中/英), tagline, email, GitHub, research-interest chips, scholar/ORCID links         |
| 2   | `src/content/education/bit.md`                         | School, degree, department, dates, GPA / honours bullets                                  |
| 3   | `src/content/publications/placeholder-{1,2,3}.md`      | Replace title / authors / venue / year as papers come in. Rename files freely             |
| 4   | `src/content/news/*.md`                                | Add / remove news entries — file per entry, sorted by `date` field automatically          |
| 5   | `src/components/About.astro`                           | Two `[TODO]` paragraphs — your real Chinese + English bio                                 |
| 6   | `astro.config.mjs`                                     | `site` and `base` — set to your GitHub Pages URL before pushing (see comments in file)    |
| 7   | `public/favicon.svg`                                   | Optional: replace the "XC" gradient block with your own icon                              |
| 8   | `public/og.png`                                        | Optional: drop a 1200×630 social card image here (auto-served at `/og.png`)               |

> Tip: search the repo for `TODO` to find every placeholder — they're all marked.

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
2. Push to `main`. The workflow at `.github/workflows/deploy.yml` builds and deploys automatically.
3. In GitHub repo settings → **Pages** → **Source**, select **GitHub Actions**.

### B. Any other repo name (e.g. `personal-site`)

1. Edit `astro.config.mjs`:
   ```js
   site: "https://<username>.github.io",
   base: "/<repo-name>/",
   ```
2. Push to `main`, then enable **Pages → Source → GitHub Actions** in repo settings.
3. Final URL: `https://<username>.github.io/<repo-name>/`.

The included workflow uses the official `withastro/action@v3` runner — no extra
configuration needed.

---

## Project structure

```
personal_site/
├── astro.config.mjs            # site / base — edit before deploy
├── package.json
├── tsconfig.json (strict)
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── content/                # ← edit markdown to update each section
│   │   ├── config.ts           # collection schemas
│   │   ├── education/
│   │   ├── publications/
│   │   └── news/
│   ├── data/
│   │   └── site.ts             # ← single source of truth for global info
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Education.astro
│   │   ├── ResearchInterests.astro
│   │   ├── Publications.astro
│   │   ├── News.astro
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   ├── Section.astro       # generic wrapper
│   │   ├── ThemeToggle.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Base.astro          # html shell, fonts, theme bootstrap
│   ├── pages/
│   │   └── index.astro         # composes the 7 sections
│   └── styles/
│       └── global.css          # Tailwind v4 + theme tokens
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Design notes

- **Stack**: Astro 5, Tailwind CSS v4 (via `@tailwindcss/vite`), TypeScript strict.
  No React/Vue runtime — pure static HTML.
- **Typography**: Inter for Latin, Noto Sans SC for Chinese, both via Google Fonts.
- **Colors**: zinc base + emerald accent. Dark mode uses `zinc-950`, never pure black.
- **Theme**: light by default; the toggle in the top-right writes `localStorage.theme`.
  A small inline script in `Base.astro` reads it before paint to prevent FOUC.
- **Animation**: pure CSS `@starting-style` + keyframe stagger, no motion libraries.
- **Container**: `max-w-3xl` (~720px) — keeps academic copy readable.
