import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo EXACTO basado en los datos de SkyMart que proporcionaste
const partTypeMapping = {
  // TURBINE ENGINE OIL [8]
  '2197-55GL': 'TURBINE ENGINE OIL',   // TURBINE OIL (MIL-PRF-23699 HTS) - DRUM - $ 5,871.60
  '2197-QT': 'TURBINE ENGINE OIL',     // TURBINE OIL (MIL-PRF-23699 HTS) - Quart - $ 28.72
  '2380-55GL': 'TURBINE ENGINE OIL',   // TURBINE OIL (MIL-PRF-23699G-STD) - DRUM - $ 6,195.44
  '28800': 'TURBINE ENGINE OIL',       // TURBINE OIL (MIL-PRF-23699G-STD) - PAIL - $ 569.93
  '2380-QT': 'TURBINE ENGINE OIL',     // TURBINE OIL (MIL-PRF-23699G-STD) - Quart - $ 29.09
  '2389-55GL': 'TURBINE ENGINE OIL',   // LUBRICATING OIL (MIL-PRF-7808L GR 3) - DRUM - $ 6,396.03
  '2389-QT': 'TURBINE ENGINE OIL',     // LUBRICATING OIL (MIL-PRF-7808L GR 3) - Quart - $ 30.38
  '25-QT': 'TURBINE ENGINE OIL',       // TURBINE OIL - Quart - $ 33.05
  
  // HYDRAULIC FLUID [17]
  '163380': 'HYDRAULIC FLUID',         // SKYDROL HYD FLUID (10138724) - DRUM - $ 9,881.19
  'LD4-5GL': 'HYDRAULIC FLUID',        // SKYDROL HYD. FLUID (10138707) - PAIL - $ 941.73
  'LD4-GL': 'HYDRAULIC FLUID',         // SKYDROL HYD FLUID (10138721) - Gallon - $ 203.33
  'LD4-55GL': 'HYDRAULIC FLUID',       // SKYDROL HYD FLUID (10138846) - Quart - $ 53.24
  '18063': 'HYDRAULIC FLUID',          // SKYDROL SAMPLING BOTTLE - Bottle - $ 8.22
  '500B4-55GL': 'HYDRAULIC FLUID',     // SKYDROL HYD. FLUID (10138730) - DRUM - $ 9,109.72
  '500B4-5GL': 'HYDRAULIC FLUID',      // SKYDROL HYD FLUID (10138733) - PAIL - $ 860.05
  '79958': 'HYDRAULIC FLUID',          // SKYDROL HYD. FLUID (10138727) - Gallon - $ 186.80
  '80646': 'HYDRAULIC FLUID',          // SKYDROL HYD. FLUID (10138849) - Quart - $ 49.07
  '121335': 'HYDRAULIC FLUID',         // HYDRAULIC FLUID - Quart - $ 304.48 (PE5-QT en imagen)
  '171867': 'HYDRAULIC FLUID',         // HYDRAULIC FLUID - DRUM - $ 8,989.06
  '190037': 'HYDRAULIC FLUID',         // HYDRAULIC FLUID (10376576) - PAIL - $ 860.05
  '21797': 'HYDRAULIC FLUID',          // HYDRAULIC FLUID (10336384) - CAN - $ 186.80
  '27952': 'HYDRAULIC FLUID',          // HYDRAULIC FLUID (10325240) - Quart - $ 49.07
  '60598': 'HYDRAULIC FLUID',          // HYDRAULIC FLUID (10138698) - PAIL - $ 973.81
  '57217': 'HYDRAULIC FLUID',          // HYDRAULIC FLUID (10138692) - CAN - $ 209.55
  '81697': 'HYDRAULIC FLUID',          // HYDRAULIC FLUID - Quart - $ 54.75
  
  // SPECIALTY [4]
  '187581': 'SPECIALTY',               // ASSEMBLY FLUID - TUBE - $ 113.61
  '26526': 'SPECIALTY',                // SKYKLEEN AVIATION SOLVENT (10138670) - Bottle - $ 25.83
  '33646': 'SPECIALTY',                // SKYKLEEN 1000 (10138691) - PAIL - $ 412.86
  '30311': 'SPECIALTY',                // AVIATION SOLVENT - CAN - $ 122.17
  
  // EXPENDABLES [2]
  'EMN2380MC-1S': 'EXPENDABLES',       // EASTMAN 2380 DECAL (2.75" X 4") - Each - Pricing not available
  'MCS352B-QT': 'EXPENDABLES',         // EASTMAN 2380 DECAL (1.25" WIDE X 2" LONG) - Each - Pricing not available (probablemente este)
  
  // NON-AVIATION [1]
  '33461': 'NON-AVIATION'              // SYNTHETIC LUBRICANT - Gallon - Pricing not available
  
  // Nota: 35914 no aparece en nuestros 32 productos, era una imagen extra
};

async function updateWithRealCategories() {
  console.log('🔄 Actualizando categorías con datos REALES de SkyMart...\n');
  
  const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  let updated = 0;
  let notFound = 0;
  
  data.products.forEach(product => {
    const partType = partTypeMapping[product.name];
    
    if (partType) {
      const oldCategory = product.category;
      product.category = partType;
      console.log(`✓ ${product.name.padEnd(20)} ${oldCategory.padEnd(20)} → ${partType}`);
      updated++;
    } else {
      console.log(`⚠️  ${product.name}: NO ENCONTRADO en mapeo`);
      notFound++;
    }
  });
  
  // Guardar archivo actualizado
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  console.log(`\n✅ Actualización completa!`);
  console.log(`   Productos actualizados: ${updated}`);
  console.log(`   Sin categoría: ${notFound}`);
  
  // Mostrar distribución final
  const categoryCounts = {};
  data.products.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  
  console.log('\n📊 Distribución de categorías (debe coincidir con SkyMart):');
  console.log('   SkyMart → Nuestro marketplace\n');
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      const expected = {
        'HYDRAULIC FLUID': 17,
        'TURBINE ENGINE OIL': 8,
        'SPECIALTY': 4,
        'EXPENDABLES': 2,
        'NON-AVIATION': 1
      }[cat] || '?';
      const match = expected === count ? '✅' : '⚠️';
      console.log(`   ${match} ${cat}: ${count} productos (esperado: ${expected})`);
    });
}

updateWithRealCategories().catch(console.error);
