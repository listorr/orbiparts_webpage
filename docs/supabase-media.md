# Supabase media workflow

This project now centralizes every blog fallback image in `src/lib/mediaFallbacks.js`. To make sure production traffic never relies on third-party CDNs, you can mirror the curated aviation imagery into your Supabase storage bucket and update the mappings so that `getMediaSrc` always resolves to assets you own.

## 1. Curate aviation-specific assets

1. Review the entries in `mediaFallbacks.js`. Each slug (for example `futureOfLegacyAircraft`) lists the images used throughout the page.
2. For every key, identify a high-quality aviation photo that matches the narrative (hangars, engine close-ups, control rooms, logistics hubs, etc.). You can source from:
   - Your internal media library.
   - Licensed stock (Unsplash, Pexels, Adobe, etc.).
   - Vendor marketing kits with redistribution rights.
3. Download each file locally, standardising filenames to mirror the Supabase object structure. Example: `future-of-legacy-aircraft/hero.jpg`.

## 2. Prepare files for upload

From the repository root, create a local staging directory and store the curated images in matching subfolders:

```bash
mkdir -p media-staging
# Place files inside media-staging/<slug>/...
```

While downloading from a URL you can use `curl`:

```bash
curl -L "https://example.com/your-image.jpg" -o media-staging/future-of-legacy-aircraft/hero.jpg
```

Repeat for every slot listed in the manifest.

## 3. Upload to Supabase storage

You can upload either through the Supabase Dashboard or via the Supabase CLI.

### Option A: Supabase Dashboard

1. Open **Project Settings → Storage**.
2. Navigate to the `blog-media` bucket (create it if it does not exist).
3. Drag the entire `media-staging` structure into the bucket so the paths match the ones used in code (e.g., `future-of-legacy-aircraft/hero.jpg`).
4. Set the bucket policy to public read access or configure signed URLs depending on your security model.

### Option B: Supabase CLI

1. Install the CLI if needed: `npm install -g supabase`.
2. Log in: `supabase login` and follow the browser prompt.
3. Move the staging directory contents into storage:

```bash
supabase storage upload --bucket blog-media --path future-of-legacy-aircraft/hero.jpg media-staging/future-of-legacy-aircraft/hero.jpg
supabase storage upload --bucket blog-media --path future-of-legacy-aircraft/hangar.jpg media-staging/future-of-legacy-aircraft/hangar.jpg
# Repeat for each image slot
```

Automate uploads with a simple script if you have many assets; the CLI accepts glob patterns, or you can write a small Node.js script using `@supabase/supabase-js` and `fs` to walk the directory.

## 4. Point fallbacks to your hosted assets

Once each image is present in Supabase:

1. Confirm the object URL format: `https://<project-ref>.supabase.co/storage/v1/object/public/blog-media/<path>`.
2. Update the corresponding entry in `mediaFallbacks.js` from the stock placeholder to your Supabase URL.
3. Set `VITE_USE_SUPABASE_MEDIA=true` in your `.env` so `getMediaSrc` prefers Supabase-hosted assets at runtime.
4. Run `npm run build` (or `npm run dev`) and verify that all images resolve to Supabase URLs with no 404s.

## 5. Continuous maintenance tips

- Keep the manifest organised: add a new key to `mediaFallbacks.js` whenever a page introduces additional imagery slots.
- Version large media changes by noting the source and usage in Git commits or maintaining an accompanying spreadsheet.
- Periodically audit Supabase storage for orphaned files once articles are retired or redesigned.

Following this workflow ensures every fallback image is aviation-specific, under your control, and immune to third-party outages or content changes.
