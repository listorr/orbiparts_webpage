import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productUrls = [
  { name: '163380', url: 'https://portal.skymart.aero/shop/part/163380' },
  { name: '2380-QT', url: 'https://portal.skymart.aero/shop/part/2380-QT' },
  { name: '2197-QT', url: 'https://portal.skymart.aero/shop/part/2197-QT' },
  { name: '2197-55GL', url: 'https://portal.skymart.aero/shop/part/2197-55GL' },
  { name: '2380-55GL', url: 'https://portal.skymart.aero/shop/part/2380-55GL' },
  { name: '2389-QT', url: 'https://portal.skymart.aero/shop/part/2389-QT' },
  { name: '2389-55GL', url: 'https://portal.skymart.aero/shop/part/2389-55GL' },
  { name: 'LD4-55GL', url: 'https://portal.skymart.aero/shop/part/LD4-55GL' },
  { name: 'LD4-5GL', url: 'https://portal.skymart.aero/shop/part/LD4-5GL' },
  { name: 'LD4-GL', url: 'https://portal.skymart.aero/shop/part/LD4-GL' },
  { name: '500B4-55GL', url: 'https://portal.skymart.aero/shop/part/500B4-55GL' },
  { name: '500B4-5GL', url: 'https://portal.skymart.aero/shop/part/500B4-5GL' },
  { name: '18063', url: 'https://portal.skymart.aero/shop/part/18063' },
  { name: '187581', url: 'https://portal.skymart.aero/shop/part/187581' },
  { name: '25-QT', url: 'https://portal.skymart.aero/shop/part/25-QT' },
  { name: '26526', url: 'https://portal.skymart.aero/shop/part/26526' },
  { name: '28800', url: 'https://portal.skymart.aero/shop/part/28800' },
  { name: '33646', url: 'https://portal.skymart.aero/shop/part/33646' },
  { name: '35914', url: 'https://portal.skymart.aero/shop/part/35914' },
  { name: '79958', url: 'https://portal.skymart.aero/shop/part/79958' },
  { name: '80646', url: 'https://portal.skymart.aero/shop/part/80646' },
  { name: 'EMN2380MC-1S', url: 'https://portal.skymart.aero/shop/part/EMN2380MC-1S' },
  { name: 'MCS352B-QT', url: 'https://portal.skymart.aero/shop/part/MCS352B-QT' },
  { name: '121335', url: 'https://portal.skymart.aero/shop/part/121335' },
  { name: '171867', url: 'https://portal.skymart.aero/shop/part/171867' },
  { name: '190037', url: 'https://portal.skymart.aero/shop/part/190037' },
  { name: '21797', url: 'https://portal.skymart.aero/shop/part/21797' },
  { name: '27952', url: 'https://portal.skymart.aero/shop/part/27952' },
  { name: '30311', url: 'https://portal.skymart.aero/shop/part/30311' },
  { name: '33461', url: 'https://portal.skymart.aero/shop/part/33461' },
  { name: '57217', url: 'https://portal.skymart.aero/shop/part/57217' },
  { name: '60598', url: 'https://portal.skymart.aero/shop/part/60598' },
  { name: '81697', url: 'https://portal.skymart.aero/shop/part/81697' }
];

async function extractPartTypes() {
  console.log('🔍 Extrayendo Part Type de SkyMart...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  for (let i = 0; i < productUrls.length; i++) {
    const { name, url } = productUrls[i];
    
    try {
      console.log(`[${i + 1}/${productUrls.length}] ${name}...`);
      
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Esperar a que cargue el contenido
      await page.waitForTimeout(2000);
      
      // Extraer Part Type
      const partType = await page.evaluate(() => {
        // Buscar el link azul que dice "TURBINE ENGINE OIL", "HYDRAULIC FLUID", etc.
        const partTypeLink = Array.from(document.querySelectorAll('a')).find(a => {
          const text = a.textContent.trim().toUpperCase();
          return text === 'TURBINE ENGINE OIL' || 
                 text === 'HYDRAULIC FLUID' || 
                 text === 'SPECIALTY' || 
                 text === 'EXPENDABLES' || 
                 text === 'NON-AVIATION';
        });
        
        if (partTypeLink) {
          return partTypeLink.textContent.trim();
        }
        
        // Método alternativo: buscar en toda la página
        const bodyText = document.body.innerText;
        if (bodyText.includes('TURBINE ENGINE OIL')) return 'TURBINE ENGINE OIL';
        if (bodyText.includes('HYDRAULIC FLUID')) return 'HYDRAULIC FLUID';
        if (bodyText.includes('SPECIALTY')) return 'SPECIALTY';
        if (bodyText.includes('EXPENDABLES')) return 'EXPENDABLES';
        if (bodyText.includes('NON-AVIATION')) return 'NON-AVIATION';
        
        return null;
      });
      
      results.push({
        name,
        url,
        partType: partType || 'Unknown'
      });
      
      console.log(`   → ${partType || 'NO ENCONTRADO'}`);
      
      await page.close();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`);
      results.push({
        name,
        url,
        partType: 'Error',
        error: error.message
      });
    }
  }

  await browser.close();

  // Guardar resultados
  const outputPath = path.join(__dirname, '..', 'scraped-data', 'part-types.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Extracción completa`);
  console.log(`📄 Guardado en: part-types.json\n`);
  
  // Resumen
  const categoryCounts = {};
  results.forEach(r => {
    categoryCounts[r.partType] = (categoryCounts[r.partType] || 0) + 1;
  });
  
  console.log('📊 Distribución:');
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });
}

extractPartTypes().catch(console.error);
