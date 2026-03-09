import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo de nombres REALES de productos según SkyMart
const productNames = {
  // TURBINE ENGINE OIL
  '2197-55GL': 'TURBINE OIL (MIL-PRF-23699 HTS)',
  '2197-QT': 'TURBINE OIL (MIL-PRF-23699 HTS)',
  '2380-55GL': 'TURBINE OIL (MIL-PRF-23699G-STD)',
  '2380-QT': 'TURBINE OIL (MIL-PRF-23699G-STD)',
  '28800': 'TURBINE OIL (MIL-PRF-23699G-STD)',
  '2389-55GL': 'LUBRICATING OIL (MIL-PRF-7808L GR 3)',
  '2389-QT': 'LUBRICATING OIL (MIL-PRF-7808L GR 3)',
  '25-QT': 'TURBINE OIL',
  
  // HYDRAULIC FLUID
  '163380': 'SKYDROL HYD FLUID (10138724)',
  'LD4-5GL': 'SKYDROL HYD. FLUID (10138707)',
  'LD4-GL': 'SKYDROL HYD FLUID (10138721)',
  'LD4-55GL': 'SKYDROL HYD FLUID (10138846)',
  '18063': 'SKYDROL SAMPLING BOTTLE',
  '500B4-55GL': 'SKYDROL HYD. FLUID (10138730)',
  '500B4-5GL': 'SKYDROL HYD FLUID (10138733)',
  '79958': 'SKYDROL HYD. FLUID (10138727)',
  '80646': 'SKYDROL HYD. FLUID (10138849)',
  '121335': 'HYDRAULIC FLUID',
  '171867': 'HYDRAULIC FLUID',
  '190037': 'HYDRAULIC FLUID (10376576)',
  '21797': 'HYDRAULIC FLUID (10336384)',
  '27952': 'HYDRAULIC FLUID (10325240)',
  '60598': 'HYDRAULIC FLUID (10138698)',
  '57217': 'HYDRAULIC FLUID (10138692)',
  '81697': 'HYDRAULIC FLUID',
  
  // SPECIALTY
  '187581': 'ASSEMBLY FLUID',
  '26526': 'SKYKLEEN AVIATION SOLVENT (10138670)',
  '33646': 'SKYKLEEN 1000 (10138691)',
  '30311': 'AVIATION SOLVENT',
  
  // EXPENDABLES
  'EMN2380MC-1S': 'EASTMAN 2380 DECAL (2.75" X 4")',
  'MCS352B-QT': 'EASTMAN 2380 DECAL (1.25" WIDE X 2" LONG)',
  
  // NON-AVIATION
  '33461': 'SYNTHETIC LUBRICANT'
};

async function updateProductNames() {
  console.log('🔄 Actualizando nombres de productos...\n');
  
  const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  let updated = 0;
  
  data.products.forEach(product => {
    const realName = productNames[product.name];
    
    if (realName) {
      const partNumber = product.name; // Guardar el part number original
      
      console.log(`✓ ${partNumber.padEnd(20)} → "${realName}"`);
      
      // Actualizar: el part number va como ID, el nombre descriptivo como description
      product.description = realName;
      
      updated++;
    } else {
      console.log(`⚠️  ${product.name}: No encontrado en mapeo`);
    }
  });
  
  // Guardar
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  console.log(`\n✅ Actualización completa!`);
  console.log(`   Productos actualizados: ${updated}/${data.products.length}`);
}

updateProductNames().catch(console.error);
