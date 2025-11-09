## ORBIPARTS Multilingual Blog & Platform

> Deployment: initial run trigger commit (this line ensures GitHub Actions workflow runs to publish the first build).

### Tech Stack
React + Vite SPA, TailwindCSS, react-i18next localization (EN/ES/DE/FR), structured SEO (Article + FAQ + Breadcrumb + hreflang + og:locale), performance enhancements (lazy sections, responsive hero images planned), and Apache SPA routing via `.htaccess`.

### Development
1. Install dependencies: `npm ci`
2. Run dev server: `npm run dev`
3. Build production: `npm run build`

### Localization Pattern
Keys live in `src/locales/<lang>/translation.json` under `blog.<slug>.*`. Arrays consumed with `t(key, { returnObjects: true })`.

### SEO
`SEO` component + helpers build schemas and meta tags. Each blog supplies localized headline, description, author, keywords, FAQ items, breadcrumbs.

### Performance
`LazySection` defers rendering of heavy sections. Hero images will use `srcSet` + `sizes` (pending). Tables wrapped with `overflow-x-auto` where required.

### Deploy (GitHub Actions → Hostinger)
Workflow file: `.github/workflows/deploy-hostinger.yml` builds on pushes to `main` then deploys `dist` via secure FTPS.

Add the following GitHub repository secrets:
- `HOSTINGER_FTP_SERVER` (e.g. ftp.tudominio.com)
- `HOSTINGER_FTP_USERNAME`
- `HOSTINGER_FTP_PASSWORD`
- `HOSTINGER_FTP_TARGET_DIR` (e.g. `public_html/` or subfolder)
- Optional: `CACHE_PURGE_URL` for post-deploy cache invalidation

### Apache / Hostinger Routing
`public/.htaccess` ensures SPA fallback to `index.html` and sets cache headers.

### Removing Nested Export Folder
If `orbiparts_webpage/` is an accidental nested repo, run: `git rm --cached orbiparts_webpage` then commit.

### Common Scripts
`npm run build` → production assets in `dist/`

### Future Improvements
- Add hero `srcSet` for all posts.
- Preload critical hero images.
- Add automated Lighthouse CI.

### Contact
Internal team – update as needed.
