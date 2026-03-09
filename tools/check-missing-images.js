import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const imagesDir = path.join(__dirname, '..', 'public', 'images', 'lubricants');
const scrapedImagesDir = path.join(__dirname, '..', 'scraped-data', 'images');

const missing = [];
const available = [];

data.products.forEach(product => {
  const imagePath = path.join(imagesDir, `${product.name}.png`);
  
  if (!fs.existsSync(imagePath)) {
    missing.push({
      partNumber: product.name,
      displayName: product.displayName || product.name,
      category: product.category
    });
  } else {
    available.push(product.name);
  }
});

console.log('📊 ESTADO DE LAS IMÁGENES\n');
console.log(`✅ Con imagen: ${available.length}`);
console.log(`❌ Sin imagen: ${missing.length}\n`);

if (missing.length > 0) {
  console.log('Productos SIN imagen:');
  missing.forEach(p => {
    console.log(`   ❌ ${p.partNumber.padEnd(15)} → ${p.displayName.padEnd(20)} | ${p.category}`);
    
    // Verificar si existe en scraped-data/images
    const scrapedImagePath = path.join(scrapedImagesDir, `${p.partNumber}.png`);
    if (fs.existsSync(scrapedImagePath)) {
      console.log(`      ✓ Imagen encontrada en: scraped-data/images/${p.partNumber}.png`);
    } else {
      console.log(`      ⚠️  No existe en scraped-data/images/`);
    }
  });
}
