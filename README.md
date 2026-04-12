# Boyfriend's Guide To Taylor Swift

Personal blog built with [Astro](https://astro.build/), Markdown content, and [Decap CMS](https://decapcms.org/) for optional in-browser editing.

## Commands

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Dev server at `http://localhost:4321`       |
| `npm run build`   | Production build to `dist/`                 |
| `npm run preview` | Preview the production build locally          |

## Project layout

- **`src/content/blog/`** — Blog posts (Markdown). `draft: true` hides a post from production builds (still visible in `npm run dev`).
- **`src/pages/`** — Routes (`index.astro`, `blog/`, `about.astro`, RSS).
- **`public/admin/`** — Decap CMS UI at **`/admin`** after deploy.

## Configure production URL

Set the `site` in [`astro.config.mjs`](astro.config.mjs) to your real domain (used for RSS, sitemap, and canonical URLs).

## Decap CMS (`/admin`)

1. Edit [`public/admin/config.yml`](public/admin/config.yml): set `backend.repo` to `your-username/your-repo` and `branch` to your default branch.
2. **GitHub authentication** — Follow [Decap’s GitHub backend guide](https://decapcms.org/docs/github-backend/). Common setups:
   - **Netlify**: enable Identity + Git Gateway, or use Netlify’s OAuth with a GitHub OAuth app.
   - **Any host**: create a GitHub OAuth app and use Netlify’s [external OAuth client](https://decapcms.org/docs/authentication-backends/#external-oauth-clients) pattern (`auth_endpoint` / `base_url`) so Decap can log in without hosting on Netlify.
3. **Local editing**: run `npx decap-server` from the repo root and add `local_backend: true` to `config.yml` (remove before merge if you prefer not to commit it).

Uploaded images from Decap go to **`public/images/blog/`** and are referenced in Markdown as `/images/blog/your-file.jpg`.

New posts ask for a **URL slug** (`filenameSlug`); that value becomes the Markdown filename and the public URL path (e.g. `my-post` → `my-post.md` → `/blog/my-post/`).

## Deploy (Vercel or Netlify)

1. Push this repo to GitHub (`git remote add origin …` then `git push -u origin main`).
2. Import the repo in [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
3. Build command: `npm run build`, output directory: `dist`.
4. Attach your custom domain in the host’s DNS settings.

## Requirements

- Node.js **18.17+**, **20.3+**, or **21+** (see `package.json` `engines`). Astro **4.x** is pinned for broad local compatibility; you can upgrade to Astro 6 on **Node 22.12+** when ready.

## Credit

Starter based on Astro’s blog template and [Bear Blog](https://github.com/HermanMartinus/bearblog/) CSS ideas; typography uses [Fraunces](https://fonts.google.com/specimen/Fraunces) + local Atkinson.
