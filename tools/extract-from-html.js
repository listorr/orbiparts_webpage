import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Los 32 URLs de SkyMart
const productUrls = [
  'https://portal.skymart.aero/shop/part/121335',
  'https://portal.skymart.aero/shop/part/163380',
  'https://portal.skymart.aero/shop/part/171867',
  'https://portal.skymart.aero/shop/part/18063',
  'https://portal.skymart.aero/shop/part/187581',
  'https://portal.skymart.aero/shop/part/190037',
  'https://portal.skymart.aero/shop/part/21797',
  'https://portal.skymart.aero/shop/part/26526',
  'https://portal.skymart.aero/shop/part/27952',
  'https://portal.skymart.aero/shop/part/28127',
  'https://portal.skymart.aero/shop/part/28800',
  'https://portal.skymart.aero/shop/part/30311',
  'https://portal.skymart.aero/shop/part/32414',
  'https://portal.skymart.aero/shop/part/35914',
  'https://portal.skymart.aero/shop/part/37935',
  'https://portal.skymart.aero/shop/part/37951',
  'https://portal.skymart.aero/shop/part/37952',
  'https://portal.skymart.aero/shop/part/37981',
  'https://portal.skymart.aero/shop/part/41239',
  'https://portal.skymart.aero/shop/part/41693',
  'https://portal.skymart.aero/shop/part/53334',
  'https://portal.skymart.aero/shop/part/57217',
  'https://portal.skymart.aero/shop/part/60598',
  'https://portal.skymart.aero/shop/part/79958',
  'https://portal.skymart.aero/shop/part/80646',
  'https://portal.skymart.aero/shop/part/81697',
  'https://portal.skymart.aero/shop/part/85405',
  'https://portal.skymart.aero/shop/part/85406',
  'https://portal.skymart.aero/shop/part/91098',
  'https://portal.skymart.aero/shop/part/97063',
  'https://portal.skymart.aero/shop/part/97199',
  'https://portal.skymart.aero/shop/part/97200'
];

function extractProductInfo(html, partNumber) {
  try {
    // Extraer el nombre del producto (aparece en class="text-h6")
    const nameMatch = html.match(/<div[^>]*class="[^"]*text-h6[^"]*"[^>]*>([^<]+)<\/div>/i);
    const productName = nameMatch ? nameMatch[1].trim() : partNumber;
    
    // Extraer descripción (aparece después del nombre, en class="q-ml-sm" o similar)
    let description = '';
    
    // Buscar patrones como "HYDRAULIC FLUID (10138692)" o "TURBINE OIL (MIL-PRF-23699)"
    const descPatterns = [
      /class="prop[^"]*">([^<]+\(\d+\))/i,
      /class="prop[^"]*">([A-Z\s]+(MIL-PRF-\d+[^<]*))/i,
      /<div[^>]*class="[^"]*q-ml-sm[^"]*"[^>]*>([^<]+\([^)]+\))/i,
    ];
    
    for (const pattern of descPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        description = match[1].trim();
        break;
      }
    }
    
    // Si no encontramos descripción, buscar en el Part Type
    if (!description) {
      const partTypeMatch = html.match(/Part Type[^<]*<\/div>\s*<div[^>]*class="prop[^"]*">([^<]+)</i);
      if (partTypeMatch) {
        description = partTypeMatch[1].trim();
      }
    }
    
    console.log(`  ✅ ${partNumber.padEnd(10)} → ${productName.padEnd(20)} | ${description}`);
    
    return {
      partNumber,
      displayName: productName,
      description: description || 'Product description'
    };
    
  } catch (error) {
    console.error(`  ❌ Error parsing ${partNumber}:`, error.message);
    return {
      partNumber,
      displayName: partNumber,
      description: 'Error parsing'
    };
  }
}

function downloadPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
      
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  console.log('🚀 Descargando HTML de SkyMart para extraer nombres...\n');
  
  const results = [];
  
  for (const url of productUrls) {
    const partNumber = url.split('/').pop();
    console.log(`🔍 Descargando: ${url}`);
    
    try {
      const html = await downloadPage(url);
      const info = extractProductInfo(html, partNumber);
      results.push(info);
      
      // Pequeña pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`  ❌ Error descargando ${partNumber}:`, error.message);
      results.push({
        partNumber,
        displayName: partNumber,
        description: 'Error downloading'
      });
    }
  }
  
  // Guardar resultados
  const outputPath = path.join(__dirname, 'extracted-product-names.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Extracción completada!`);
  console.log(`📄 Resultados en: ${outputPath}`);
  console.log(`📊 Total: ${results.length} productos`);
  
  // Mostrar resumen
  console.log('\n📋 NOMBRES EXTRAÍDOS:');
  results.forEach(r => {
    console.log(`  ${r.partNumber.padEnd(10)} → ${r.displayName}`);
  });
}

main().catch(console.error);
