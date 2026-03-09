import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
const scrapedDataPath = path.join(__dirname, 'aeroshell-scraped-data.json');

console.log('🔄 Actualizando rutas de imágenes AEROSHELL en lubricants-data.json...\n');

// Leer datos
const lubricantsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf-8'));

// Crear mapa de partNumber -> extensión de imagen
const imageMap = {};
scrapedData.forEach(product => {
  if (product.productImage) {
    const ext = product.productImage.includes('.jpg') || product.productImage.includes('.JPG') ? '.jpg' : '.png';
    imageMap[product.partNumber] = ext;
  }
});

let updated = 0;
let notFound = 0;

// Actualizar productos
lubricantsData.products.forEach((product, index) => {
  if (product.brand === 'AEROSHELL') {
    const partNumber = product.name; // El "name" es el part number
    
    if (imageMap[partNumber]) {
      const oldImage = product.image;
      const newImage = `/images/lubricants/${partNumber}${imageMap[partNumber]}`;
      
      if (oldImage !== newImage) {
        product.image = newImage;
        console.log(`✅ [${index + 1}] ${product.displayName} (${partNumber})`);
        console.log(`   Anterior: ${oldImage}`);
        console.log(`   Nueva:    ${newImage}\n`);
        updated++;
      }
    } else {
      console.log(`⚠️  [${index + 1}] ${product.displayName} (${partNumber}) - No tiene imagen\n`);
      notFound++;
    }
  }
});

// Actualizar metadata
lubricantsData.metadata.generatedAt = new Date().toISOString();

// Guardar backup
const backupPath = path.join(__dirname, `lubricants-data-backup-${Date.now()}.json`);
fs.writeFileSync(backupPath, fs.readFileSync(dataPath, 'utf-8'));
console.log(`💾 Backup creado: ${backupPath}\n`);

// Guardar cambios
fs.writeFileSync(dataPath, JSON.stringify(lubricantsData, null, 2));

console.log('═'.repeat(80));
console.log('📊 RESUMEN');
console.log('═'.repeat(80));
console.log(`✅ Actualizados:  ${updated} productos`);
console.log(`⚠️  Sin imagen:   ${notFound} productos`);
console.log('═'.repeat(80));
console.log(`\n✅ Archivo actualizado: ${dataPath}\n`);

// Verificar específicamente el producto 5-CTG
const ctg5 = lubricantsData.products.find(p => p.name === '73937');
if (ctg5) {
  console.log(`🎯 VERIFICACIÓN - Producto 5-CTG:`);
  console.log(`   ID: ${ctg5.id}`);
  console.log(`   Display Name: ${ctg5.displayName}`);
  console.log(`   Imagen: ${ctg5.image}`);
  console.log(`   ✅ Imagen actualizada correctamente\n`);
}
