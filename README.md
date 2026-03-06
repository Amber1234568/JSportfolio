# Amber Shao · Portfolio

Personal resume-style portfolio. Built with Vite + React + TypeScript + Tailwind CSS.
Deployed to GitHub Pages via GitHub Actions.

**Live URL:** `https://amber1234568.github.io/JSportfolio/`

---

## Local development

```bash
npm install
npm run dev        # → http://localhost:5173/JSportfolio/
npm run build      # production build → dist/
npm run preview    # preview dist/ locally
```

---

## Project structure

```
JSportfolio/
├── .github/workflows/deploy.yml   # GitHub Actions — build + deploy on push to main
├── public/
│   ├── images/                    # Drop project images here (see Images section)
│   ├── resume.pdf                 # Replace with your real resume PDF
│   └── favicon.svg
├── scripts/
│   └── deploy-ghpages.sh          # Manual fallback deploy script
├── src/
│   ├── content.ts                 # All EN/ZH strings (single source of truth)
│   ├── hooks/useLanguage.ts       # Language toggle with localStorage
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── FadeUp.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ImagePlaceholder.tsx
│   │   └── CaseStudyLayout.tsx
│   ├── pages/
│   │   ├── Home.tsx               # Redirects → /work
│   │   ├── Work.tsx               # Resume overview (main page)
│   │   ├── Daplink.tsx
│   │   ├── StudyPal.tsx
│   │   └── AdhdCoach.tsx
│   ├── App.tsx                    # HashRouter routes
│   └── main.tsx
├── vite.config.ts                 # base: '/JSportfolio/'
└── tailwind.config.js
```

---

## Deploying to GitHub Pages

### Primary method — GitHub Actions (recommended)

#### Step 1 — Initialize git and push

Run these commands from inside the `JSportfolio/` folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Amber1234568/JSportfolio.git
git push -u origin main
```

> If the repo already exists with commits and you get a rejection, use:
> `git push -u origin main --force` (only safe if the remote is empty / you own it fully)

#### Step 2 — Enable GitHub Pages

1. Go to `https://github.com/Amber1234568/JSportfolio`
2. Click **Settings** (top tab)
3. Click **Pages** (left sidebar, under "Code and automation")
4. Under **Build and deployment**, set **Source** to **GitHub Actions**
5. Click **Save**

That's it. The workflow at `.github/workflows/deploy.yml` runs automatically on every push to `main`.

#### Step 3 — Verify the deployment

1. Go to the **Actions** tab of your repo
2. Click the latest **Deploy to GitHub Pages** workflow run
3. Wait for both jobs (`build` ✓ then `deploy` ✓) to show green checks
4. Visit `https://amber1234568.github.io/JSportfolio/`

> First deploy takes ~2–3 minutes. Subsequent pushes are faster (~1 min).

---

### Alternative method — Manual deploy to gh-pages branch

Use this only if GitHub Actions is unavailable.

```bash
npm install                          # installs gh-pages package
./scripts/deploy-ghpages.sh          # builds + pushes dist/ to gh-pages branch
```

Then in GitHub:
1. **Settings → Pages → Source → Deploy from a branch**
2. Branch: `gh-pages` / folder: `/ (root)`
3. Save

Or via npm directly:
```bash
npm run deploy:ghpages
```

---

## Images

Drop images into `public/images/` with these filenames:

| Filename | Where it appears |
|---|---|
| `profile.jpg` | Work overview page — profile photo |
| `header.jpg` | Work overview page — optional banner (silently skipped if missing) |
| `daplink-pipeline.png` | DaplinkDemo case study |
| `daplink-json.png` | DaplinkDemo case study |
| `studypal-frames.png` | StudyPal case study |
| `adhd-flow.png` | ADHD Companion case study |
| `adhd-screen-focus.png` | ADHD Companion case study |
| `adhd-screen-reentry.png` | ADHD Companion case study |

Missing images show an inline placeholder — the site never breaks without them.

---

## Resume

Replace `public/resume.pdf` with your actual resume PDF.
The Resume link in the page header downloads this file.

---

## Editing content

All text (EN and ZH) lives in `src/content.ts` — a typed dictionary.
Edit strings there; no hardcoded text exists in any component.

---

## Routes

| Hash URL | Page |
|---|---|
| `/#/` → redirects to `/#/work` | |
| `/#/work` | Resume overview |
| `/#/work/daplink` | DaplinkDemo case study |
| `/#/work/studypal` | StudyPal case study |
| `/#/work/adhd-coach` | ADHD Focus Companion case study |

HashRouter is used so all routes work on GitHub Pages without any server configuration.

---

## Troubleshooting

### Blank page after deploy

Most common cause: wrong `base` path.

- Open browser DevTools → Console/Network. If JS/CSS assets return 404, the base is wrong.
- `vite.config.ts` must have `base: '/JSportfolio/'` — matches the repo name exactly, case-sensitive.
- Rebuild and push after any change to `vite.config.ts`.

### Profile photo or images not loading

- Files must be in `public/images/` (not inside `src/`).
- Filenames are **case-sensitive** on Linux (GitHub Pages). `Profile.jpg` ≠ `profile.jpg`.
- In production the paths resolve to `/JSportfolio/images/profile.jpg`. Check the Network tab for the exact URL being requested vs what exists.

### Resume link not working / downloading wrong file

- Replace `public/resume.pdf` with your actual PDF — the current file is a text placeholder.

### Routes work locally but break on GitHub Pages

This project uses **HashRouter**, so all routes are hash-based:
`https://amber1234568.github.io/JSportfolio/#/work`

If you see a 404, you may be hitting a non-hash URL. All internal `<Link>` components generate hash URLs automatically. Never use BrowserRouter with project pages unless you add a custom `404.html` redirect.

### GitHub Actions workflow not running

1. Confirm the file is at exactly `.github/workflows/deploy.yml` (check with `ls .github/workflows/`).
2. Confirm the default branch is `main`: Settings → General → Default branch.
3. Check Actions are not disabled: Settings → Actions → General → set to "Allow all actions".

### Workflow permissions error

The workflow requests `pages: write` and `id-token: write` itself. If you see a permissions error:

Settings → Actions → General → Workflow permissions → select **"Read and write permissions"** → Save.

### Workflow succeeds but Pages still shows old content

GitHub CDN can cache for 1–2 minutes. Hard-refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows).
If it persists: Settings → Pages — confirm **Source** is **GitHub Actions**, not "Deploy from a branch".

### `gh-pages` branch deploy shows stale content

```bash
npm run deploy:ghpages   # force-pushes a fresh build
```
Wait 60 seconds, then hard-refresh.
