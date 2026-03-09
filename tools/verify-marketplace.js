import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log('📊 RESUMEN DE MARKETPLACE EASTMAN\n');
console.log('='  .repeat(50));

// Total de productos
console.log(`\n📦 Total de productos: ${data.products.length}`);

// Productos en stock
const inStock = data.products.filter(p => p.inStock).length;
console.log(`✅ En stock: ${inStock} (${((inStock/data.products.length)*100).toFixed(0)}%)`);

// Distribución por categorías
console.log('\n📂 Distribución por categorías:');
const categories = {};
data.products.forEach(p => {
  categories[p.category] = (categories[p.category] || 0) + 1;
});
Object.entries(categories)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    const pct = ((count/data.products.length)*100).toFixed(1);
    console.log(`   • ${cat}: ${count} productos (${pct}%)`);
  });

// Productos con documentación
const withDocs = data.products.filter(p => p.datasheets && p.datasheets.length > 0).length;
console.log(`\n📄 Con documentación: ${withDocs} productos`);

// Total de PDFs
const totalPDFs = data.products.reduce((sum, p) => sum + (p.datasheets?.length || 0), 0);
console.log(`   Total PDFs: ${totalPDFs} archivos`);

// Verificar imágenes
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'lubricants');
const images = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));
console.log(`\n🖼️  Imágenes disponibles: ${images.length}`);

// Productos sin imagen
const withoutImage = data.products.filter(p => {
  const imagePath = path.join(imagesDir, `${p.name}.png`);
  return !fs.existsSync(imagePath);
});

if (withoutImage.length > 0) {
  console.log(`\n⚠️  Productos sin imagen: ${withoutImage.length}`);
  withoutImage.forEach(p => console.log(`   - ${p.name}`));
} else {
  console.log(`✓ Todos los productos tienen imagen`);
}

console.log('\n' + '='.repeat(50));
console.log('✅ Marketplace listo para producción\n');
