#!/usr/bin/env node

/**
 * Script para eliminar emojis de WhatsApp y rediseñar con look profesional
 * Reemplaza emojis con iconos de lucide-react o simplemente los elimina
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../src/pages/blog');

// Mapeo de emojis a reemplazos profesionales
const replacements = [
  // Emojis comunes que se deben eliminar completamente
  { pattern: /🌎|🌍|🌏/g, replacement: '' },
  { pattern: /⚡|💡/g, replacement: '' },
  { pattern: /🔄|♻️/g, replacement: '' },
  { pattern: /🤝|👥/g, replacement: '' },
  { pattern: /🔍|🔎/g, replacement: '' },
  { pattern: /✅|☑️|✓/g, replacement: '' },
  { pattern: /📊|📈|📉/g, replacement: '' },
  { pattern: /🚀|✈️|🛩️/g, replacement: '' },
  { pattern: /🔧|🔨|⚙️/g, replacement: '' },
  { pattern: /🛩️/g, replacement: '' },
  { pattern: /🏢|🏭/g, replacement: '' },
  { pattern: /💰|💵|💴/g, replacement: '' },
  { pattern: /🌱|🌿|♻️/g, replacement: '' },
  { pattern: /🔗|⛓️/g, replacement: '' },
  { pattern: /🌐|🗺️/g, replacement: '' },
  { pattern: /🤖|🦾/g, replacement: '' },
  
  // Limpiar espacios múltiples que quedan después de eliminar emojis
  { pattern: /\s{2,}/g, replacement: ' ' },
  
  // Limpiar líneas que empiezan con espacio después de eliminar emoji
  { pattern: />\s+</g, replacement: '><' },
];

// Archivos a procesar
const files = [
  'Top10AircraftPartsSuppliers2025.jsx',
  'FutureOfLegacyAircraft.jsx',
  'MiamiAviationLogistics.jsx',
  'AogResponseStrategies.jsx',
];

console.log('🔧 Iniciando rediseño profesional (eliminando emojis)...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Archivo no encontrado: ${filename}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changesMade = 0;
  
  // Aplicar todos los reemplazos
  replacements.forEach(({ pattern, replacement }) => {
    const matches = content.match(pattern);
    if (matches) {
      changesMade += matches.length;
      content = content.replace(pattern, replacement);
    }
  });
  
  // Escribir el archivo actualizado
  if (changesMade > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filename}: ${changesMade} emojis eliminados`);
  } else {
    console.log(`✓  ${filename}: Sin emojis encontrados`);
  }
});

console.log('\n✅ Rediseño completado - Look profesional aplicado');
console.log('💡 Ahora los blogs tienen un diseño más corporativo sin emojis\n');
