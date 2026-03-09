import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function downloadHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractFromHTML(html, partNumber) {
  // Buscar el Product Code en el HTML
  // Patrón: <div class="prop text-bold">Product Code</div> seguido de <div class="prop">NOMBRE</div>
  
  let productCode = partNumber;
  let partType = '';
  let manufacturer = '';
  let units = '';
  let application = '';
  
  // Extraer Product Code
  const productCodeMatch = html.match(/Product Code<\/div>\s*<div[^>]*class="prop"[^>]*>([^<]+)</i);
  if (productCodeMatch) {
    productCode = productCodeMatch[1].trim();
  }
  
  // Extraer Part Type
  const partTypeMatch = html.match(/Part Type<\/div>\s*<div[^>]*class="prop"[^>]*>([^<]+)</i);
  if (partTypeMatch) {
    partType = partTypeMatch[1].trim();
  }
  
  // Extraer Manufacturer
  const manufacturerMatch = html.match(/Manufacturer<\/div>\s*<div[^>]*class="prop"[^>]*>([^<]+)</i);
  if (manufacturerMatch) {
    manufacturer = manufacturerMatch[1].trim();
  }
  
  // Extraer Units
  const unitsMatch = html.match(/Units<\/div>\s*<div[^>]*class="prop"[^>]*>([^<]+)</i);
  if (unitsMatch) {
    units = unitsMatch[1].trim();
  }
  
  // Extraer Application
  const applicationMatch = html.match(/Application<\/div>\s*<div[^>]*class="prop"[^>]*>([^<]+)</i);
  if (applicationMatch) {
    application = applicationMatch[1].trim();
  }
  
  // Extraer Group Code (puede ser FLUID, etc)
  const groupCodeMatch = html.match(/Group Code<\/div>\s*<div[^>]*class="prop"[^>]*>([^<]+)</i);
  let groupCode = '';
  if (groupCodeMatch) {
    groupCode = groupCodeMatch[1].trim();
  }
  
  // Construir descripción completa
  let description = partType;
  if (application && application !== 'No Application Specified') {
    description = `${partType} - ${application}`;
  }
  
  return {
    partNumber,
    productCode,
    partType,
    manufacturer,
    units,
    application,
    groupCode,
    description
  };
}

async function main() {
  console.log('🚀 Extrayendo datos de los 32 productos desde SkyMart...\n');
  
  const results = [];
  
  for (let i = 0; i < productUrls.length; i++) {
    const url = productUrls[i];
    const partNumber = url.split('/').pop();
    
    console.log(`[${(i+1).toString().padStart(2)}/${productUrls.length}] ${partNumber}`);
    
    try {
      const html = await downloadHTML(url);
      const data = extractFromHTML(html, partNumber);
      results.push(data);
      
      console.log(`      ✓ ${data.productCode.padEnd(20)} | ${data.partType}`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`      ✗ Error: ${error.message}`);
      results.push({
        partNumber,
        productCode: partNumber,
        partType: '',
        error: error.message
      });
    }
  }
  
  // Guardar resultados
  const outputPath = path.join(__dirname, 'skymart-extracted-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Extracción completada!`);
  console.log(`📄 Archivo: ${outputPath}`);
  console.log(`📊 Total: ${results.length} productos\n`);
  
  // Mostrar tabla resumen
  console.log('📋 RESUMEN:');
  console.log('─'.repeat(80));
  console.log(`${'Part#'.padEnd(10)} → ${'Product Code'.padEnd(20)} | ${'Part Type'.padEnd(30)}`);
  console.log('─'.repeat(80));
  results.forEach(r => {
    console.log(`${r.partNumber.padEnd(10)} → ${r.productCode.padEnd(20)} | ${r.partType.substring(0, 30)}`);
  });
  console.log('─'.repeat(80));
}

main().catch(console.error);
