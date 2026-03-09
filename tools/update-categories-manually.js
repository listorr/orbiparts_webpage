import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo manual de categorías basado en SkyMart
// Según la imagen, vemos: TURBINE ENGINE OIL, HYDRAULIC FLUID, EXPENDABLES, NON-AVIATION, SPECIALTY
const categoryMapping = {
  // TURBINE ENGINE OIL - Aceites de turbina
  '2197-55GL': 'TURBINE ENGINE OIL',
  '2197-QT': 'TURBINE ENGINE OIL',
  '2380-55GL': 'TURBINE ENGINE OIL',
  '2380-QT': 'TURBINE ENGINE OIL',
  '2389-55GL': 'TURBINE ENGINE OIL',
  '2389-QT': 'TURBINE ENGINE OIL',
  'LD4-55GL': 'TURBINE ENGINE OIL',
  'LD4-5GL': 'TURBINE ENGINE OIL',
  'LD4-GL': 'TURBINE ENGINE OIL',
  '28800': 'TURBINE ENGINE OIL',
  '79958': 'TURBINE ENGINE OIL',
  
  // HYDRAULIC FLUID - Fluidos hidráulicos
  '163380': 'HYDRAULIC FLUID',
  '500B4-55GL': 'HYDRAULIC FLUID',
  '500B4-5GL': 'HYDRAULIC FLUID',
  '25-QT': 'HYDRAULIC FLUID',
  '80646': 'HYDRAULIC FLUID',
  '171867': 'HYDRAULIC FLUID',
  '190037': 'HYDRAULIC FLUID',
  '21797': 'HYDRAULIC FLUID',
  '27952': 'HYDRAULIC FLUID',
  '30311': 'HYDRAULIC FLUID',
  
  // SPECIALTY - Productos especiales/greasas
  '18063': 'SPECIALTY',
  '187581': 'SPECIALTY',
  '26526': 'SPECIALTY',
  '33646': 'SPECIALTY',
  '35914': 'SPECIALTY',
  'EMN2380MC-1S': 'SPECIALTY',
  'MCS352B-QT': 'SPECIALTY',
  '121335': 'SPECIALTY',
  '33461': 'SPECIALTY',
  '57217': 'SPECIALTY',
  '60598': 'SPECIALTY',
  '81697': 'SPECIALTY'
};

async function updateCategories() {
  console.log('🔄 Actualizando categorías en lubricants-data.json...\n');
  
  const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  let updated = 0;
  let notFound = 0;
  
  data.products.forEach(product => {
    const category = categoryMapping[product.name];
    
    if (category) {
      const oldCategory = product.category;
      product.category = category;
      console.log(`✓ ${product.name}: ${oldCategory} → ${category}`);
      updated++;
    } else {
      console.log(`⚠ ${product.name}: No se encontró categoría en el mapeo`);
      notFound++;
    }
  });
  
  // Guardar archivo actualizado
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  console.log(`\n✅ Actualización completa!`);
  console.log(`   Productos actualizados: ${updated}`);
  console.log(`   Sin categoría: ${notFound}`);
  
  // Mostrar resumen de categorías
  const categoryCounts = {};
  data.products.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  
  console.log('\n📊 Distribución de categorías:');
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} productos`);
    });
}

updateCategories().catch(console.error);
