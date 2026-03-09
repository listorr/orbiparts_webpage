import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basado en la inspección manual de SkyMart y los 32 enlaces proporcionados
// Mapeo COMPLETO verificado manualmente
const correctProductNames = {
  // SPECIALTY
  '187581': { displayName: 'MCS352B-5.4OZ', description: 'ASSEMBLY FLUID' },
  '26526': { displayName: 'SK1000-16OZ', description: 'SKYKLEEN AVIATION SOLVENT (10138670)' },
  '30311': { displayName: 'SK2000-QT', description: 'AVIATION SOLVENT' },
  '35914': { displayName: 'SK1000-5GL', description: 'SKYKLEEN 1000 (10138691)' },
  
  // HYDRAULIC FLUID - Skydrol 5 series
  '27952': { displayName: 'SKY5-5GL', description: 'HYDRAULIC FLUID (10138692)' },
  '57217': { displayName: 'SKY5-GL', description: 'HYDRAULIC FLUID (10138692)' },
  '97063': { displayName: 'SKY5-QT', description: 'HYDRAULIC FLUID (10138692)' },
  
  // HYDRAULIC FLUID - Skydrol 500B-4/5 series
  '53334': { displayName: '500B5-5GL', description: 'HYDRAULIC FLUID (10138698)' },
  '80646': { displayName: '500B5-GL', description: 'HYDRAULIC FLUID (10138698)' },
  '81697': { displayName: '500B5-QT', description: 'HYDRAULIC FLUID (10138698)' },
  
  // HYDRAULIC FLUID - Skydrol LD-4 series
  '28127': { displayName: 'LD4-55GL', description: 'SKYDROL HYD. FLUID (10138730)' },
  '32414': { displayName: 'LD4-5GL', description: 'SKYDROL HYD FLUID (10138733)' },
  '41239': { displayName: 'LD4-GL', description: 'SKYDROL HYD. FLUID (10138727)' },
  '41693': { displayName: 'LD4-QT', description: 'SKYDROL HYD. FLUID (10138849)' },
  'LD4-55GL': { displayName: 'LD4-55GL', description: 'SKYDROL HYD. FLUID (10138730)' },
  'LD4-5GL': { displayName: 'LD4-5GL', description: 'SKYDROL HYD FLUID (10138733)' },
  'LD4-GL': { displayName: 'LD4-GL', description: 'SKYDROL HYD. FLUID (10138727)' },
  
  // HYDRAULIC FLUID - Skydrol LD-5 series
  '97199': { displayName: 'LD5-55GL', description: 'SKYDROL HYD FLUID (10138721)' },
  '190037': { displayName: 'LD5-5GL', description: 'HYDRAULIC FLUID (10138691)' },
  '21797': { displayName: 'LD5-GL', description: 'HYDRAULIC FLUID (10138624)' },
  '60598': { displayName: 'LD5-QT', description: 'HYDRAULIC FLUID (10138615)' },
  
  // HYDRAULIC FLUID - PE5 series
  '121335': { displayName: 'PE5-QT', description: 'HYDRAULIC FLUID' },
  '163380': { displayName: 'PE5-55GL', description: 'PE5-55GL HYDRAULIC FLUID' },
  
  // HYDRAULIC FLUID - Otros
  '171867': { displayName: 'SK-BTL', description: 'SKYDROL SAMPLING BOTTLE' },
  '18063': { displayName: 'SK-BTL', description: 'SKYDROL SAMPLING BOTTLE' },
  
  // TURBINE ENGINE OIL - 2197 series
  '37935': { displayName: '2197-QT', description: 'TURBINE OIL (MIL-PRF-23699 HTS)' },
  '2197-QT': { displayName: '2197-QT', description: 'TURBINE OIL (MIL-PRF-23699 HTS)' },
  '2197-55GL': { displayName: '2197-55GL', description: 'TURBINE OIL (MIL-PRF-23699 HTS)' },
  
  // TURBINE ENGINE OIL - 2380 series
  '37951': { displayName: '2380-GL', description: 'TURBINE OIL (MIL-PRF-7808)' },
  '37952': { displayName: '2380-QT', description: 'TURBINE OIL (MIL-PRF-7808)' },
  '2380-QT': { displayName: '2380-QT', description: 'TURBINE OIL (MIL-PRF-7808)' },
  '2380-55GL': { displayName: '2380-55GL', description: 'TURBINE OIL (MIL-PRF-7808)' },
  
  // TURBINE ENGINE OIL - 2380M series
  '28800': { displayName: '2380M-QT', description: 'TURBINE OIL (MIL-PRF-6081)' },
  
  // TURBINE ENGINE OIL - 2380V series
  '79958': { displayName: '2380V-5GL', description: 'TURBINE OIL (MIL-PRF-6081)' },
  '37981': { displayName: '2380V-GL', description: 'TURBINE OIL (MIL-PRF-6081)' },
  '91098': { displayName: '2380V-QT', description: 'TURBINE OIL (MIL-PRF-6081)' },
  
  // TURBINE ENGINE OIL - 2389 series
  '2389-55GL': { displayName: '2389-55GL', description: 'TURBINE OIL (MIL-PRF-23699)' },
  '2389-QT': { displayName: '2389-QT', description: 'TURBINE OIL (MIL-PRF-23699)' },
  
  // TURBINE ENGINE OIL - 6626 series
  '97200': { displayName: '6626-GL', description: 'TURBINE OIL (MIL-PRF-23699 STD)' },
  
  // TURBINE ENGINE OIL - 25 series
  '25-QT': { displayName: '25-QT', description: 'TURBINE OIL' },
  
  // SPECIALTY - MCS352B
  'MCS352B-QT': { displayName: 'MCS352B-QT', description: 'ASSEMBLY FLUID' },
  
  // HYDRAULIC FLUID - 500B4 series
  '500B4-55GL': { displayName: '500B4-55GL', description: 'HYDRAULIC FLUID' },
  '500B4-5GL': { displayName: '500B4-5GL', description: 'HYDRAULIC FLUID' },
  
  // EXPENDABLES
  '85405': { displayName: 'EC776', description: 'HAND CLEANER (EXPENDABLE)' },
  '85406': { displayName: 'P1600', description: 'HAND CLEANER (EXPENDABLE)' },
  
  // NON-AVIATION
  'EMN2380MC-1S': { displayName: 'EMN2380MC-1S', description: 'NON-AVIATION LUBRICANT' },
  
  // Otros
  '33461': { displayName: '33461', description: 'AVIATION PRODUCT' },
  '33646': { displayName: '33646', description: 'AVIATION PRODUCT' },
};

// Leer archivo JSON actual
const dataPath = path.join(__dirname, '../src/data/lubricants-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log('🔧 Actualizando nombres de productos con datos correctos de SkyMart...\n');

let updatedCount = 0;
let notFoundCount = 0;

data.products.forEach(product => {
  const mapping = correctProductNames[product.name];
  
  if (mapping) {
    const oldName = product.displayName || product.name;
    product.displayName = mapping.displayName;
    product.description = mapping.description;
    updatedCount++;
    console.log(`✓ ${product.name.padEnd(10)} → ${mapping.displayName.padEnd(15)} (${mapping.description})`);
  } else {
    notFoundCount++;
    console.log(`⚠️  ${product.name.padEnd(10)} → NO ENCONTRADO EN MAPEO`);
  }
});

// Guardar archivo actualizado
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log(`\n✅ Actualización completada!`);
console.log(`📊 Productos actualizados: ${updatedCount}`);
console.log(`⚠️  Productos no encontrados: ${notFoundCount}`);
console.log(`📄 Total productos: ${data.products.length}`);
console.log(`\n💾 Archivo guardado: ${dataPath}`);
