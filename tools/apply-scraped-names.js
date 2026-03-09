import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer los nombres correctos extraídos
const correctNamesPath = path.join(__dirname, 'correct-names-from-scraped.json');
const correctNames = JSON.parse(fs.readFileSync(correctNamesPath, 'utf-8'));

// Leer el archivo de datos actual
const dataPath = path.join(__dirname, '../src/data/lubricants-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log('🔧 Aplicando nombres CORRECTOS desde los datos scrapeados...\n');

let updatedCount = 0;

data.products.forEach(product => {
  const correctData = correctNames[product.name];
  
  if (correctData) {
    const oldName = product.displayName || product.name;
    const newName = correctData.displayName;
    
    if (oldName !== newName) {
      product.displayName = newName;
      updatedCount++;
      console.log(`✓ ${product.name.padEnd(15)} | ${oldName.padEnd(20)} → ${newName}`);
    } else {
      console.log(`  ${product.name.padEnd(15)} | ${newName.padEnd(20)} (sin cambios)`);
    }
  } else {
    console.log(`⚠️  ${product.name.padEnd(15)} | NO ENCONTRADO EN SCRAPED DATA`);
  }
});

// Guardar archivo actualizado
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log(`\n✅ Actualización completada!`);
console.log(`📊 Productos actualizados: ${updatedCount}`);
console.log(`📄 Total productos: ${data.products.length}`);
console.log(`\n💾 Archivo guardado: ${dataPath}`);
