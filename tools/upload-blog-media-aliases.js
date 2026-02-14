#!/usr/bin/env node

/**
 * Upload flat kebab-case aliases of media-staging files to Supabase blog-media.
 * This ensures keys like `future-of-legacy-aircraft-hero.jpg` exist (no subfolders),
 * matching the filenames referenced by the app's `getMediaSrc(...)` calls.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { spawnSync } from 'child_process';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STAGING = path.join(__dirname, '../media-staging');
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY;
const BUCKET = 'blog-media';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_KEY must be set in .env');
  process.exit(1);
}

function toKebab(s) {
  return s.replace(/[ _]+/g,'-')
    .replace(/([a-z0-9])([A-Z])/g,'$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g,'$1-$2')
    .replace(/--+/g,'-')
    .toLowerCase();
}

const files = fs.readdirSync(STAGING).filter(f => f.toLowerCase().endsWith('.jpg'));
console.log(`Found ${files.length} jpg files in media-staging`);
let uploaded = 0, failed = 0;
for (const fn of files) {
  const fp = path.join(STAGING, fn);
  const ext = path.extname(fn);
  const base = path.basename(fn, ext);
  const alias = `${toKebab(base)}${ext}`; // flat alias e.g., future-of-legacy-aircraft-hero.jpg
  const url = `${SUPABASE_URL.replace(/^https?:\/\//,'')}`;
  const fullUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodeURIComponent(alias)}`;

  process.stdout.write(`Uploading alias ${alias} ... `);
  const proc = spawnSync('curl', ['-sS', '-X', 'PUT', fullUrl, '-H', `Authorization: Bearer ${SUPABASE_KEY}`, '-H', 'Content-Type: image/jpeg', '--data-binary', `@${fp}`], { maxBuffer: 1024*1024*50 });
  if (proc.error) {
    console.log('ERR', proc.error.message);
    failed++;
    continue;
  }
  if (proc.status !== 0) {
    console.log('ERR', (proc.stderr||proc.stdout).toString().slice(0,200));
    failed++;
    continue;
  }
  console.log('OK');
  uploaded++;
}

console.log(`Done. uploaded=${uploaded}, failed=${failed}`);
