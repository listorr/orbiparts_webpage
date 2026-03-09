import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer el archivo JSON
const dataPath = path.join(__dirname, '../src/data/lubricants-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Mapeo completo según SkyMart
const productNameMapping = {
  // SPECIALTY products
  '187581': { displayName: 'MCS352B-5.4OZ', description: 'ASSEMBLY FLUID' },
  '26526': { displayName: 'SK1000-16OZ', description: 'SKYKLEEN AVIATION SOLVENT (10138670)' },
  '30311': { displayName: 'SK2000-QT', description: 'AVIATION SOLVENT' },
  '35914': { displayName: 'SK1000-5GL', description: 'SKYKLEEN 1000 (10138691)' },
  
  // HYDRAULIC FLUID products
  '121335': { displayName: 'PE5-QT', description: 'HYDRAULIC FLUID' },
  '163380': { displayName: 'PE5-55GL', description: 'PE5-55GL HYDRAULIC FLUID' },
  '171867': { displayName: 'SK-BTL', description: 'SKYDROL SAMPLING BOTTLE' },
  '190037': { displayName: 'LD5-5GL', description: 'HYDRAULIC FLUID (10138691)' },
  '18063': { displayName: 'SK-BTL', description: 'SKYDROL SAMPLING BOTTLE' }, // Duplicado?
  '21797': { displayName: 'LD5-GL', description: 'HYDRAULIC FLUID (10138624)' },
  '27952': { displayName: 'LD5-QT', description: 'HYDRAULIC FLUID (10138615)' },
  '28127': { displayName: 'LD4-55GL', description: 'SKYDROL HYD. FLUID (10138730)' },
  '32414': { displayName: 'LD4-5GL', description: 'SKYDROL HYD FLUID (10138733)' },
  '41239': { displayName: 'LD4-GL', description: 'SKYDROL HYD. FLUID (10138727)' },
  '41693': { displayName: 'LD4-QT', description: 'SKYDROL HYD. FLUID (10138849)' },
  '53334': { displayName: '500B5-5GL', description: 'HYDRAULIC FLUID (10138698)' },
  '60598': { displayName: 'SKY5-5GL', description: 'HYDRAULIC FLUID (10138698)' },
  '79958': { displayName: 'SKY5-GL', description: 'SKYDROL HYD. FLUID (10138727)' }, // Posible
  '80646': { displayName: '500B5-GL', description: 'SKYDROL HYD FLUID (10138846)' },
  '81697': { displayName: '500B5-QT', description: 'HYDRAULIC FLUID' },
  '97063': { displayName: 'SKY5-QT', description: 'SKYDROL HYD. FLUID (10138707)' }, // Posible
  '97199': { displayName: 'LD5-55GL', description: 'SKYDROL HYD FLUID (10138721)' },
  
  // TURBINE ENGINE OIL products
  '2197-QT': { displayName: '2197-QT', description: 'TURBINE OIL (MIL-PRF-23699 HTS)' },
  '2380-GL': { displayName: '2380-GL', description: 'TURBINE OIL (MIL-PRF-7808)' },
  '2380-QT': { displayName: '2380-QT', description: 'TURBINE OIL (MIL-PRF-7808)' },
  '2380M-QT': { displayName: '2380M-QT', description: 'TURBINE OIL (MIL-PRF-6081)' },
  '2380V-5GL': { displayName: '2380V-5GL', description: 'TURBINE OIL (MIL-PRF-6081)' },
  '2380V-GL': { displayName: '2380V-GL', description: 'TURBINE OIL (MIL-PRF-6081)' },
  '2380V-QT': { displayName: '2380V-QT', description: 'TURBINE OIL (MIL-PRF-6081)' },
  '6626-GL': { displayName: '6626-GL', description: 'TURBINE OIL (MIL-PRF-23699 STD)' },
  
  // EXPENDABLES
  'EC776': { displayName: 'EC776', description: 'HAND CLEANER (EXPENDABLE)' },
  'P1600': { displayName: 'P1600', description: 'HAND CLEANER (EXPENDABLE)' },
  
  // NON-AVIATION
  'MV2197-QT': { displayName: 'MV2197-QT', description: 'NON-AVIATION LUBRICANT' }
};

// Actualizar productos
let updatedCount = 0;
data.products.forEach(product => {
  const mapping = productNameMapping[product.name];
  if (mapping) {
    product.displayName = mapping.displayName;
    product.description = mapping.description;
    updatedCount++;
    console.log(`✓ Actualizado: ${product.name} → ${mapping.displayName}`);
  }
});

// Guardar archivo actualizado
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log(`\n✅ Total de productos actualizados: ${updatedCount}/${data.products.length}`);
console.log(`📄 Archivo guardado en: ${dataPath}`);
