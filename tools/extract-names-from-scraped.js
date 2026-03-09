import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scrapedDir = path.join(__dirname, '../scraped-data');
const dataPath = path.join(__dirname, '../src/data/lubricants-data.json');

// Leer todos los archivos JSON scrapeados
const files = fs.readdirSync(scrapedDir).filter(f => f.startsWith('product_') && f.endsWith('.json'));

console.log('🔍 Extrayendo nombres correctos de los archivos scrapeados originales...\n');

const extractedNames = {};

files.forEach(file => {
  const filePath = path.join(scrapedDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  const partNumber = data.partNumber;
  
  // Extraer el nombre del producto de la URL de la imagen
  let productName = partNumber;
  
  if (data.productImage && data.productImage.url) {
    const imageUrl = data.productImage.url;
    // Extraer el nombre del archivo de la URL
    // Ejemplo: .../571772/.png/LD4-QT-removebg-preview.png
    const match = imageUrl.match(/\/([^\/]+)\.png$/i);
    if (match) {
      let imageName = match[1];
      // Remover sufijos como -removebg-preview
      imageName = imageName.replace(/-removebg-preview$/i, '');
      imageName = imageName.replace(/-removebg$/i, '');
      
      // Si el nombre extraído no es solo números, usarlo
      if (!/^\d+$/.test(imageName)) {
        productName = imageName;
      }
    }
  }
  
  // También intentar extraer de la descripción si existe
  let description = data.description || '';
  
  // Buscar en specifications si existe
  if (data.specifications) {
    const specs = Object.entries(data.specifications);
    specs.forEach(([key, value]) => {
      if (key.includes('Part Type') && value && typeof value === 'string') {
        description = value;
      }
    });
  }
  
  extractedNames[partNumber] = {
    displayName: productName,
    description: description,
    imageUrl: data.productImage?.url || ''
  };
  
  console.log(`${partNumber.padEnd(10)} → ${productName.padEnd(20)} | ${data.productImage?.url ? '✓ imagen' : '✗ sin imagen'}`);
});

// Guardar resultados
const outputPath = path.join(__dirname, 'correct-names-from-scraped.json');
fs.writeFileSync(outputPath, JSON.stringify(extractedNames, null, 2));

console.log(`\n✅ Nombres extraídos de ${files.length} archivos`);
console.log(`📄 Resultados guardados en: ${outputPath}`);

// Mostrar resumen de nombres únicos encontrados
console.log('\n📋 NOMBRES ÚNICOS ENCONTRADOS:');
const uniqueNames = new Set(Object.values(extractedNames).map(e => e.displayName));
[...uniqueNames].sort().forEach(name => {
  const count = Object.values(extractedNames).filter(e => e.displayName === name).length;
  console.log(`  ${name.padEnd(20)} (${count} producto${count > 1 ? 's' : ''})`);
});
