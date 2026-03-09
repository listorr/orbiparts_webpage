import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Los 32 URLs originales
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
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractProductData(html, partNumber) {
  // El HTML contiene los datos en formato JSON dentro de un script tag o en los elementos
  // Buscar patrones comunes
  
  let productName = partNumber;
  let description = '';
  let partType = '';
  let manufacturer = '';
  
  // Intentar extraer del título de la página
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1];
    // El título suele tener formato: "Nombre del Producto - SkyMart"
    const cleanTitle = title.replace(/\s*-\s*SkyMart.*$/i, '').trim();
    if (cleanTitle && cleanTitle !== 'ShopQC') {
      productName = cleanTitle;
    }
  }
  
  // Buscar en meta tags
  const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
  if (ogTitleMatch) {
    productName = ogTitleMatch[1].trim();
  }
  
  const descMatch = html.match(/<meta\s+(?:name|property)="(?:description|og:description)"\s+content="([^"]+)"/i);
  if (descMatch) {
    description = descMatch[1].trim();
  }
  
  // Buscar datos estructurados en el HTML
  // SkyMart usa Vue/Quasar, los datos pueden estar en el HTML inicial
  
  // Buscar patrones en el contenido HTML
  const patterns = [
    /Part Number[^\w]*(\w[\w-]+)/i,
    /Manufacturer[^\w]*(EASTMAN|[A-Z]+)/i,
    /Part Type[^\w]*([A-Z\s]+(?:\([^)]+\))?)/i,
  ];
  
  patterns.forEach(pattern => {
    const match = html.match(pattern);
    if (match && match[1]) {
      const value = match[1].trim();
      if (pattern.source.includes('Part Type')) {
        partType = value;
      } else if (pattern.source.includes('Manufacturer')) {
        manufacturer = value;
      }
    }
  });
  
  return {
    partNumber,
    productName,
    description,
    partType,
    manufacturer,
    rawTitle: titleMatch ? titleMatch[1] : ''
  };
}

async function main() {
  console.log('🚀 Descargando HTML de los 32 productos de SkyMart...\n');
  
  const results = [];
  const htmlDir = path.join(__dirname, '../scraped-html');
  
  if (!fs.existsSync(htmlDir)) {
    fs.mkdirSync(htmlDir, { recursive: true });
  }
  
  for (const url of productUrls) {
    const partNumber = url.split('/').pop();
    console.log(`📥 Descargando: ${url}`);
    
    try {
      const html = await downloadHTML(url);
      
      // Guardar HTML para inspección manual
      const htmlPath = path.join(htmlDir, `${partNumber}.html`);
      fs.writeFileSync(htmlPath, html);
      
      // Extraer datos
      const data = extractProductData(html, partNumber);
      results.push(data);
      
      console.log(`   ✓ ${partNumber}: ${data.productName}`);
      console.log(`     Título: ${data.rawTitle}`);
      console.log(`     Part Type: ${data.partType || 'N/A'}`);
      
      // Pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 800));
      
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`);
      results.push({
        partNumber,
        productName: partNumber,
        description: '',
        partType: '',
        error: error.message
      });
    }
  }
  
  // Guardar resultados
  const outputPath = path.join(__dirname, 'extracted-from-html.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Completado!`);
  console.log(`📄 Resultados: ${outputPath}`);
  console.log(`📂 HTML guardado en: ${htmlDir}`);
  console.log(`\n📊 Total: ${results.length} productos`);
}

main().catch(console.error);
