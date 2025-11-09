import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '..', 'src', 'pages', 'blog');

// Patterns to simplify
const replacements = [
  // Replace colorful gradients with simple solid backgrounds
  {
    pattern: /bg-gradient-to-r from-blue-50 to-indigo-50/g,
    replacement: 'bg-gray-50'
  },
  {
    pattern: /bg-gradient-to-r from-indigo-50 to-purple-50/g,
    replacement: 'bg-blue-50'
  },
  {
    pattern: /bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50/g,
    replacement: 'bg-blue-50'
  },
  {
    pattern: /bg-gradient-to-r from-purple-50 to-pink-50/g,
    replacement: 'bg-gray-50'
  },
  {
    pattern: /bg-gradient-to-r from-red-50 to-orange-50/g,
    replacement: 'bg-red-50'
  },
  {
    pattern: /bg-gradient-to-r from-blue-50 to-cyan-50/g,
    replacement: 'bg-blue-50'
  },
  {
    pattern: /bg-gradient-to-r from-green-50 to-teal-50/g,
    replacement: 'bg-green-50'
  },
  {
    pattern: /bg-gradient-to-br from-indigo-50 to-blue-50/g,
    replacement: 'bg-gray-50'
  },
  {
    pattern: /bg-gradient-to-br from-blue-50 to-indigo-50/g,
    replacement: 'bg-white'
  },
  {
    pattern: /bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900/g,
    replacement: 'bg-blue-900'
  },
  {
    pattern: /bg-gradient-to-r from-blue-900 to-indigo-900/g,
    replacement: 'bg-blue-900'
  },
  {
    pattern: /bg-gradient-to-r from-blue-600 to-indigo-600/g,
    replacement: 'bg-blue-600'
  },
  {
    pattern: /bg-gradient-to-r from-yellow-400 to-orange-500/g,
    replacement: 'bg-yellow-500'
  },
  {
    pattern: /bg-gradient-to-t from-black\/60 to-black\/10/g,
    replacement: 'bg-black/40'
  },
  {
    pattern: /bg-gradient-to-t from-black\/70 to-black\/10/g,
    replacement: 'bg-black/40'
  },
  {
    pattern: /bg-gradient-to-t from-black\/70 to-black\/20/g,
    replacement: 'bg-black/40'
  },
  {
    pattern: /bg-gradient-to-b from-gray-50 to-white/g,
    replacement: 'bg-white'
  },
  // Simplify rounded corners - less extreme rounding
  {
    pattern: /rounded-2xl/g,
    replacement: 'rounded-lg'
  },
  // Remove overly colorful badges
  {
    pattern: /bg-blue-700\/50/g,
    replacement: 'bg-blue-700'
  }
];

const files = [
  'Top10AircraftPartsSuppliers2025.jsx',
  'FutureOfLegacyAircraft.jsx',
  'MiamiAviationLogistics.jsx',
  'AogResponseStrategies.jsx'
];

let totalChanges = 0;

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filename} no encontrado`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fileChanges = 0;

  replacements.forEach(({ pattern, replacement }) => {
    const matches = content.match(pattern);
    if (matches) {
      fileChanges += matches.length;
      content = content.replace(pattern, replacement);
    }
  });

  if (fileChanges > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filename}: ${fileChanges} simplificaciones de diseño`);
    totalChanges += fileChanges;
  } else {
    console.log(`➖ ${filename}: No se encontraron patrones a simplificar`);
  }
});

console.log(`\n🎨 Total: ${totalChanges} elementos de diseño simplificados`);
console.log('✅ Rediseño profesional completado - Se eliminaron gradientes coloridos y bordes excesivos');
