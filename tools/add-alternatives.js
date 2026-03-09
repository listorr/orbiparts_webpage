import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { alternativeProducts } from './alternative-products-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');

console.log('📦 Agregando productos alternativos...\n');

// Leer el archivo actual
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let updated = 0;
let total = 0;

// Agregar alternativos a cada producto
data.products.forEach(product => {
  const skuNumber = product.name; // El SKU number es el "name" field
  const alternatives = alternativeProducts[skuNumber];
  
  if (alternatives && alternatives.length > 0) {
    product.alternativeProducts = alternatives.map(partNumber => ({
      partNumber,
      manufacturer: 'EASTMAN'
    }));
    updated++;
    total += alternatives.length;
    console.log(`✓ ${product.displayName.padEnd(20)} → ${alternatives.length} alternativos: ${alternatives.join(', ')}`);
  } else {
    product.alternativeProducts = [];
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log(`\n✅ Proceso completado!`);
console.log(`   Productos actualizados: ${updated}/${data.products.length}`);
console.log(`   Total alternativos agregados: ${total}`);
console.log(`   Archivo: ${dataPath}\n`);
