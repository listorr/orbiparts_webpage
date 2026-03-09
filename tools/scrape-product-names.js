import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Los 32 URLs originales de SkyMart
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

async function scrapeProductName(page, url) {
  try {
    console.log(`\n🔍 Scrapeando: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Esperar a que cargue el contenido
    await page.waitForSelector('.q-card', { timeout: 10000 });
    
    // Extraer el nombre del producto y descripción
    const productData = await page.evaluate(() => {
      // Buscar el nombre del producto (el título principal)
      const titleElement = document.querySelector('.text-h6');
      const productName = titleElement ? titleElement.textContent.trim() : '';
      
      // Buscar la descripción (usualmente después del nombre)
      const descElements = document.querySelectorAll('.q-card .q-ml-sm');
      let description = '';
      
      for (let elem of descElements) {
        const text = elem.textContent.trim();
        if (text && text !== productName && !text.includes('$') && !text.includes('Stock')) {
          description = text;
          break;
        }
      }
      
      // También intentar obtener del meta o del body
      if (!description) {
        const bodyText = document.body.textContent;
        // Buscar patrones como "HYDRAULIC FLUID (10138...)"
        const match = bodyText.match(/([A-Z\s]+)\s*\((\d+)\)/);
        if (match) {
          description = match[0];
        }
      }
      
      return {
        name: productName,
        description: description
      };
    });
    
    const partNumber = url.split('/').pop();
    
    console.log(`  ✅ ${partNumber}: ${productData.name} - ${productData.description}`);
    
    return {
      partNumber,
      url,
      displayName: productData.name,
      description: productData.description
    };
    
  } catch (error) {
    const partNumber = url.split('/').pop();
    console.error(`  ❌ Error en ${partNumber}:`, error.message);
    return {
      partNumber,
      url,
      displayName: partNumber,
      description: 'Error scraping',
      error: error.message
    };
  }
}

async function main() {
  console.log('🚀 Iniciando scraping de nombres de productos desde SkyMart...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const results = [];
  
  for (const url of productUrls) {
    const data = await scrapeProductName(page, url);
    results.push(data);
    
    // Pequeña pausa entre requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  await browser.close();
  
  // Guardar resultados
  const outputPath = path.join(__dirname, 'scraped-product-names.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log('\n✅ Scraping completado!');
  console.log(`📄 Resultados guardados en: ${outputPath}`);
  console.log(`\n📊 Total productos: ${results.length}`);
  
  // Mostrar resumen
  console.log('\n📋 RESUMEN DE NOMBRES:');
  results.forEach(r => {
    console.log(`  ${r.partNumber.padEnd(8)} → ${r.displayName}`);
  });
}

main().catch(console.error);
