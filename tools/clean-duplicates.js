import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const data = rawData.products || rawData; // Manejar ambos formatos
const metadata = rawData.metadata;

console.log('📊 Total productos antes:', data.length);

const aeroshell = data.filter(p => p.brand === 'AEROSHELL');
const eastman = data.filter(p => p.brand === 'EASTMAN');

console.log('   • EASTMAN:', eastman.length);
console.log('   • AEROSHELL:', aeroshell.length);

// Agrupar AEROSHELL por nombre
const byName = {};
aeroshell.forEach(p => {
  const name = p.name;
  if (!byName[name]) byName[name] = [];
  byName[name].push(p);
});

// Analizar duplicados
const duplicados = Object.entries(byName).filter(([name, products]) => products.length > 1);
console.log('\n🔄 Productos duplicados:', duplicados.length);

// Mostrar algunos ejemplos
console.log('\n📝 Ejemplos de duplicados:');
duplicados.slice(0, 5).forEach(([name, products]) => {
  console.log(`\n  ${name} (${products.length} copias):`);
  products.forEach(p => {
    const hasImage = p.image && !p.image.includes('placeholder');
    console.log(`    • ${hasImage ? '✅' : '❌'} ${p.image || 'sin imagen'}`);
  });
});

// Estrategia de limpieza: Para cada nombre, mantener solo uno
// Prioridad: 1) Con imagen, 2) Primero encontrado
const uniqueAeroshell = [];
const toRemove = [];

Object.entries(byName).forEach(([name, products]) => {
  if (products.length === 1) {
    uniqueAeroshell.push(products[0]);
  } else {
    // Ordenar: primero los que tienen imagen
    const sorted = products.sort((a, b) => {
      const aHasImage = a.image && !a.image.includes('placeholder');
      const bHasImage = b.image && !b.image.includes('placeholder');
      if (aHasImage && !bHasImage) return -1;
      if (!aHasImage && bHasImage) return 1;
      return 0;
    });
    
    uniqueAeroshell.push(sorted[0]); // Mantener el mejor
    toRemove.push(...sorted.slice(1)); // Eliminar el resto
  }
});

console.log(`\n🧹 Limpieza:`);
console.log(`   • Productos únicos a mantener: ${uniqueAeroshell.length}`);
console.log(`   • Duplicados a eliminar: ${toRemove.length}`);

// Mostrar qué se va a eliminar
console.log('\n❌ Productos a eliminar (primeros 10):');
toRemove.slice(0, 10).forEach(p => {
  const hasImage = p.image && !p.image.includes('placeholder');
  console.log(`   • ${p.name} (${hasImage ? 'con imagen' : 'SIN imagen'})`);
});

// Crear nuevo dataset
const cleanedData = [...eastman, ...uniqueAeroshell];

console.log(`\n📊 Total productos después: ${cleanedData.length}`);
console.log(`   • EASTMAN: ${eastman.length}`);
console.log(`   • AEROSHELL: ${uniqueAeroshell.length}`);

// Guardar backup
const backupPath = path.join(__dirname, 'lubricants-data-backup.json');
fs.writeFileSync(backupPath, JSON.stringify(rawData, null, 2));
console.log(`\n💾 Backup guardado en: ${backupPath}`);

// Guardar limpio con estructura completa
const cleanedOutput = {
  metadata: {
    ...metadata,
    generatedAt: new Date().toISOString(),
    totalProducts: cleanedData.length
  },
  products: cleanedData
};

fs.writeFileSync(dataPath, JSON.stringify(cleanedOutput, null, 2));
console.log(`✅ Archivo limpiado guardado en: ${dataPath}`);

console.log('\n✨ Proceso completado!');
