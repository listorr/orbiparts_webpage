import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');

console.log('📦 Agregando productos alternativos reales de SkyMart...\n');

// Alternativos reales extraídos de SkyMart
const realAlternatives = {
  // 2197-QT (SKU: 79614)
  '79614': [
    {
      partNumber: '254-QT',
      manufacturer: 'EXXONMOBIL',
      description: 'SYNTHETIC TURBINE OIL (MIL-PRF-23699G HTS)'
    },
    {
      partNumber: 'AEROSHELL560-QT',
      manufacturer: 'AEROSHELL',
      description: 'TURBINE OIL MIL-PRF-23699G CLASS HTS 550050223'
    }
  ],
  
  // 2380-55GL (SKU: 19310)
  '19310': [
    {
      partNumber: 'MOBILJETII-55GL',
      manufacturer: 'EXXONMOBIL',
      description: 'TURBINE OIL (MIL-PRF-23699G-STD) 104496'
    }
  ],
  
  // 2380-QT (SKU: 37935)
  '37935': [
    {
      partNumber: 'AEROSHELL500-QT',
      manufacturer: 'AEROSHELL',
      description: 'TURBINE OIL MIL-PRF-23699G STD 550063909'
    },
    {
      partNumber: 'MOBILJETII-QT',
      manufacturer: 'EXXONMOBIL',
      description: 'TURBINE OIL (MIL-PRF-23699G-STD) 104765'
    }
  ],
  
  // 2389-QT (SKU: 55983)
  '55983': [
    {
      partNumber: 'AEROSHELL308-QT',
      manufacturer: 'AEROSHELL',
      description: 'MIL-PRF-7808L TURBINE OIL ( 550050174 )'
    }
  ]
};

// Leer el archivo actual
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let updated = 0;
let total = 0;

// Agregar alternativos a cada producto
data.products.forEach(product => {
  const skuNumber = product.name; // El SKU number es el "name" field
  const alternatives = realAlternatives[skuNumber];
  
  if (alternatives && alternatives.length > 0) {
    product.alternativeProducts = alternatives;
    updated++;
    total += alternatives.length;
    console.log(`✓ ${product.displayName.padEnd(20)} → ${alternatives.length} alternativos:`);
    alternatives.forEach(alt => {
      console.log(`    - ${alt.partNumber} (${alt.manufacturer})`);
    });
    console.log('');
  } else {
    // Mantener el array vacío
    product.alternativeProducts = [];
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log(`✅ Proceso completado!`);
console.log(`   Productos con alternativos: ${updated}/${data.products.length}`);
console.log(`   Total alternativos agregados: ${total}`);
console.log(`   Archivo: ${dataPath}\n`);
