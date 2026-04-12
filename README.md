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

Config lives in [`public/admin/config.yml`](public/admin/config.yml). The live admin URL is **`https://boyfriendguidetotaylorswift.com/admin`** (after deploy).

### Vercel + GitHub (recommended for this project)

GitHub does not allow “pure browser” OAuth for CMS writes; Decap uses **[Netlify’s OAuth service](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/)** only to complete the GitHub login — your site still runs on **Vercel**.

1. **GitHub OAuth app** — [Developer Settings → OAuth Apps → New](https://github.com/settings/developers)  
   - **Homepage URL:** `https://boyfriendguidetotaylorswift.com`  
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`  
   - Create the app, copy **Client ID**, generate and copy **Client Secret**.

2. **Netlify** (free account; you are not moving hosting off Vercel)  
   - If you do not already have a site, add one once (e.g. import the same GitHub repo).  
   - Open the site → **Site configuration** → **Access & security** → **OAuth** → **Install provider** → **GitHub** → paste Client ID and Secret → Save.  
   - **Important:** In **Domain management**, copy this site’s default **`*.netlify.app`** hostname (e.g. `taylor-swift-blog-abc123.netlify.app`). Set **`site_domain`** in `public/admin/config.yml` to that value exactly. Netlify looks up OAuth by that hostname; if Decap sends your Vercel/custom domain instead, **`https://api.netlify.com/auth` responds with “Not Found”**.  
   - **After GitHub authorizes but the CMS still shows “Login”:** In Netlify → **Site configuration** → **General** → **Site details** → **Site URL**, set it to the **exact origin where you open `/admin`** (e.g. `https://boyfriendguidetotaylorswift.com`). Netlify’s OAuth popup only `postMessage`s the token back to that origin; if Site URL still says `https://chimerical-scone-f89175.netlify.app` while you use the custom domain, login appears to do nothing. ([Background](https://github.com/netlify/netlify-cms/issues/1890#issuecomment-459387565).)  
   - **Workaround:** Open the CMS at `https://<your-netlify-subdomain>.netlify.app/admin` instead — same repo, commits still trigger Vercel.  
   - Same steps as Netlify’s doc: [OAuth provider tokens](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/).

3. **This repo** — In `public/admin/config.yml`, set `backend.repo` to `your-github-username/your-repo` (the repo Vercel deploys). OAuth must use **`base_url: https://api.netlify.com`** and **`auth_endpoint: auth`** (path only). Using your Vercel domain as `base_url` makes Decap open `/auth` on your site and you get a Vercel **404**.

4. **Deploy** — Commit and push; wait for Vercel. Open `/admin`, use **Login with GitHub**. The GitHub user must be able to **push** to the content repo.

5. **Troubleshooting** — Popup errors often mean the callback URL on the GitHub OAuth app is not exactly `https://api.netlify.com/auth/done`, or the Client ID/Secret is not saved under **OAuth** on the Netlify site you use. **“Not Found” on Login with GitHub** usually means **`site_domain` in `config.yml` is missing or wrong** — it must be your **`something.netlify.app`** hostname from the Netlify site where OAuth is configured, not `boyfriendguidetotaylorswift.com`. If the CMS says **Failed to load config.yml (404)**, you were probably on `/admin` without a trailing slash; the repo uses `<base href="/admin/">` plus a Vercel redirect `/admin` → `/admin/` so `/admin/config.yml` always loads.

More context: [Decap GitHub backend](https://decapcms.org/docs/github-backend/).

### Local-only editing

From the repo root, add `local_backend: true` under `backend` in `config.yml`, run `npx decap-server`, then open the URL it prints (often `http://localhost:8080/admin`). Remove or set `local_backend: false` when you are done if you do not want that in production config.

### Content notes

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
