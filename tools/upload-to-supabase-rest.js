#!/usr/bin/env node

/**
 * Fallback uploader using Supabase Storage REST API with Service Role key.
 * It uploads files from media-staging/ to the blog-media bucket using direct HTTP PUT
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import https from 'https';
import { spawnSync } from 'child_process';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STAGING_DIR = path.join(__dirname, '../media-staging');
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY;
const BUCKET = 'blog-media';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

function toKebab(s) {
  return s.replace(/[ _]+/g,'-').replace(/([a-z0-9])([A-Z])/g,'$1-$2').replace(/([A-Z])([A-Z][a-z])/g,'$1-$2').replace(/--+/g,'-').toLowerCase();
}

function suggestMapping(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const normalized = base.replace(/\s+/g, '-');
  if (!/[A-Z]/.test(normalized)) {
    const parts = normalized.split('-');
    const commonFileNames = ['hero','hangar','turbine','cockpit','inspection','it','warehouse','port','ramp','facility','analytics','cargo-pallets','stock-dashboard','teardown','freight','night-shift','ops-control','machine-learning','robotics','engine-module','engine','module'];
    const last = parts[parts.length-1];
    if (parts.length >= 3 && commonFileNames.includes(last)) {
      const folder = parts.slice(0, parts.length-1).join('-');
      const file = parts.slice(parts.length-1).join('-');
      return `${toKebab(folder)}/${toKebab(file)}${ext}`;
    }
  }
  if (/[A-Z]/.test(base) && normalized.includes('-')) {
    const firstDash = normalized.indexOf('-');
    const left = normalized.slice(0, firstDash);
    const right = normalized.slice(firstDash+1);
    return `${toKebab(left)}/${toKebab(right)}${ext}`;
  }
  if (/[A-Z]/.test(base) && !normalized.includes('-')) {
    const keb = toKebab(base);
    const parts = keb.split('-');
    if (parts.length >= 2) {
      const folder = parts.slice(0, parts.length-1).join('-');
      const file = parts.slice(parts.length-1).join('-');
      return `${folder}/${file}${ext}`;
    }
    return `${keb}${ext}`;
  }
  return `${toKebab(normalized)}${ext}`;
}

function uploadFileBuffer(targetPath, buffer) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(SUPABASE_URL);
    // Encode each path segment but keep slashes as-is (encoding entire path encodes slashes -> signature fail)
    const encodedPath = targetPath.split('/').map(encodeURIComponent).join('/');
    // Use curl via spawnSync for reliable behavior (curl has worked in manual tests)
    const parsedUrl = `${parsed.protocol}//${parsed.hostname}/storage/v1/object/${BUCKET}/${encodedPath}`;
    const args = ['-sS', '-X', 'PUT', parsedUrl, '-H', `Authorization: Bearer ${SUPABASE_KEY}`, '-H', 'Content-Type: image/jpeg', '--data-binary', `@-`];

    const proc = spawnSync('curl', args, { input: buffer, maxBuffer: 1024 * 1024 * 50 });
    if (proc.error) return reject(proc.error);
    const stdout = proc.stdout ? proc.stdout.toString() : '';
    const stderr = proc.stderr ? proc.stderr.toString() : '';
    const status = proc.status;
    if (status === 0) {
      resolve({ ok: true, status: 200, body: stdout });
    } else {
      reject(new Error(`curl exit ${status}: ${stderr || stdout}`));
    }
  });
}

async function run() {
  const files = fs.readdirSync(STAGING_DIR).filter(f => f.endsWith('.jpg'));
  console.log(`Found ${files.length} jpg files`);
  let uploaded=0; let failed=0;
  for (const fn of files) {
    const buf = fs.readFileSync(path.join(STAGING_DIR, fn));
    const target = suggestMapping(fn);
    process.stdout.write(`Uploading ${fn} -> ${target} ... `);
    try {
      const res = await uploadFileBuffer(target, buf);
      console.log('OK', res.status);
      uploaded++;
    } catch (e) {
      console.log('ERR', e.message);
      failed++;
    }
    await new Promise(r=>setTimeout(r, 200));
  }
  console.log(`Done. uploaded=${uploaded}, failed=${failed}`);
}

run().catch(e=>{console.error('Fatal', e.message); process.exit(1)});
