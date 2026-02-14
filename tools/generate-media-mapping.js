import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEDIA_DIR = path.join(__dirname, '..', 'media-staging');

function toKebab(s) {
  if (!s) return s;
  s = s.replace(/[ _]+/g, '-');
  s = s.replace(/([a-z0-9])([A-Z])/g, '$1-$2');
  s = s.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2');
  s = s.replace(/--+/g, '-');
  return s.toLowerCase();
}

function suggestMapping(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const normalized = base.replace(/\s+/g, '-');

  if (!/[A-Z]/.test(normalized)) {
    const parts = normalized.split('-');
    const commonFileNames = ['hero','hangar','turbine','cockpit','inspection','it','warehouse','port','ramp','facility','analytics','cargoPallets','stockDashboard','teardown','freight','nightShift','opsControl','machineLearning','robotics','engine-module','engine','module','hero'];
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

try {
  const files = (await fs.readdir(MEDIA_DIR)).filter(f => !f.startsWith('.'));
  const map = files.map(f => ({
    local: f,
    suggested: suggestMapping(f)
  }));

  console.log('Suggested mapping (local -> bucket path under blog-media):\n');
  map.forEach(m => {
    console.log(`${m.local}  ->  ${m.suggested}`);
  });

} catch (err) {
  console.error('Error reading media directory:', err.message);
  process.exit(1);
}
