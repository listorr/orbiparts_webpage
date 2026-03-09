import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo manual COMPLETO basado en los datos reales de SkyMart
// Formato: partNumber (URL) → displayName (cómo aparece en el título de SkyMart)
const productMapping = {
  // TURBINE ENGINE OIL
  '2197-55GL': '2197-55GL',      // TURBINE OIL (MIL-PRF-23699 HTS) - DRUM
  '2197-QT': '2197-QT',          // TURBINE OIL (MIL-PRF-23699 HTS) - Quart
  '2380-55GL': '2380-55GL',      // TURBINE OIL (MIL-PRF-23699G-STD) - DRUM
  '2380-QT': '2380-QT',          // TURBINE OIL (MIL-PRF-23699G-STD) - Quart
  '28800': '28800',              // TURBINE OIL (MIL-PRF-23699G-STD) - PAIL
  '2389-55GL': '2389-55GL',      // LUBRICATING OIL (MIL-PRF-7808L GR 3) - DRUM
  '2389-QT': '2389-QT',          // LUBRICATING OIL (MIL-PRF-7808L GR 3) - Quart
  '25-QT': '25-QT',              // TURBINE OIL - Quart
  
  // HYDRAULIC FLUID - Con nombres específicos de SkyMart
  '163380': '163380',            // SKYDROL HYD FLUID (10138724)
  'LD4-5GL': 'LD4-5GL',          // SKYDROL HYD. FLUID (10138707)
  'LD4-GL': 'LD4-GL',            // SKYDROL HYD FLUID (10138721)
  'LD4-55GL': 'LD4-55GL',        // SKYDROL HYD FLUID (10138846)
  '18063': 'SK-BTL',             // SKYDROL SAMPLING BOTTLE
  '500B4-55GL': '500B4-55GL',    // SKYDROL HYD. FLUID (10138730)
  '500B4-5GL': '500B4-5GL',      // SKYDROL HYD FLUID (10138733)
  '79958': '79958',              // SKYDROL HYD. FLUID (10138727)
  '80646': '80646',              // SKYDROL HYD. FLUID (10138849)
  '121335': 'PE5-QT',            // HYDRAULIC FLUID - Quart (PE5-QT es el nombre real)
  '171867': 'LD5-55GL',          // HYDRAULIC FLUID - DRUM
  '190037': 'LD5-5GL',           // HYDRAULIC FLUID (10376576) - PAIL
  '21797': 'LD5-GL',             // HYDRAULIC FLUID (10336384) - CAN
  '27952': 'LD5-QT',             // HYDRAULIC FLUID (10325240) - Quart
  '60598': '500B5-5GL',          // HYDRAULIC FLUID (10138698) - PAIL
  '57217': '500B5-GL',           // HYDRAULIC FLUID (10138692) - CAN
  '81697': '500B5-QT',           // HYDRAULIC FLUID - Quart
  
  // SPECIALTY - Nombres completamente diferentes
  '187581': 'MCS352B-5.4OZ',     // ASSEMBLY FLUID - TUBE
  '26526': 'SK1000-16OZ',        // SKYKLEEN AVIATION SOLVENT (10138670) - Bottle
  '33646': 'SK1000-5GL',         // SKYKLEEN 1000 (10138691) - PAIL
  '30311': 'SK2000-QT',          // AVIATION SOLVENT - CAN
  
  // EXPENDABLES
  'EMN2380MC-1S': 'EMN2380MC-1S',    // EASTMAN 2380 DECAL (2.75" X 4")
  'MCS352B-QT': 'MCS352B-QT',        // EASTMAN 2380 DECAL (1.25" WIDE X 2" LONG)
  
  // NON-AVIATION
  '33461': '33461'               // SYNTHETIC LUBRICANT
};

async function updateDisplayNames() {
  console.log('🔄 Actualizando nombres para mostrar...\n');
  
  const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  let updated = 0;
  
  data.products.forEach(product => {
    const displayName = productMapping[product.name];
    
    if (displayName && displayName !== product.name) {
      console.log(`✓ ${product.name.padEnd(20)} → mostrar como: "${displayName}"`);
      
      // Agregar campo displayName para mostrar en la UI
      product.displayName = displayName;
      updated++;
    } else {
      // Si no hay mapping, usar el part number original
      product.displayName = product.name;
    }
  });
  
  // Guardar
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  console.log(`\n✅ Actualización completa!`);
  console.log(`   Productos con displayName personalizado: ${updated}`);
  console.log(`   El resto usa el part number original\n`);
  
  console.log('📋 Ejemplo de productos SPECIALTY:');
  data.products.filter(p => p.category === 'SPECIALTY').forEach(p => {
    console.log(`   ${p.displayName || p.name} - ${p.description}`);
  });
}

updateDisplayNames().catch(console.error);
