import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs de los productos
const productUrls = [
  'https://portal.skymart.aero/shop/part/163380',
  'https://portal.skymart.aero/shop/part/2380-QT',
  'https://portal.skymart.aero/shop/part/2197-QT',
  'https://portal.skymart.aero/shop/part/2197-55GL',
  'https://portal.skymart.aero/shop/part/2380-55GL',
  'https://portal.skymart.aero/shop/part/2389-QT',
  'https://portal.skymart.aero/shop/part/2389-55GL',
  'https://portal.skymart.aero/shop/part/LD4-55GL',
  'https://portal.skymart.aero/shop/part/LD4-5GL',
  'https://portal.skymart.aero/shop/part/LD4-GL',
  'https://portal.skymart.aero/shop/part/500B4-55GL',
  'https://portal.skymart.aero/shop/part/500B4-5GL',
  'https://portal.skymart.aero/shop/part/18063',
  'https://portal.skymart.aero/shop/part/187581',
  'https://portal.skymart.aero/shop/part/25-QT',
  'https://portal.skymart.aero/shop/part/26526',
  'https://portal.skymart.aero/shop/part/28800',
  'https://portal.skymart.aero/shop/part/33646',
  'https://portal.skymart.aero/shop/part/35914',
  'https://portal.skymart.aero/shop/part/79958',
  'https://portal.skymart.aero/shop/part/80646',
  'https://portal.skymart.aero/shop/part/EMN2380MC-1S',
  'https://portal.skymart.aero/shop/part/MCS352B-QT',
  'https://portal.skymart.aero/shop/part/121335',
  'https://portal.skymart.aero/shop/part/171867',
  'https://portal.skymart.aero/shop/part/190037',
  'https://portal.skymart.aero/shop/part/21797',
  'https://portal.skymart.aero/shop/part/27952',
  'https://portal.skymart.aero/shop/part/30311',
  'https://portal.skymart.aero/shop/part/33461',
  'https://portal.skymart.aero/shop/part/57217',
  'https://portal.skymart.aero/shop/part/60598',
  'https://portal.skymart.aero/shop/part/81697'
];

async function extractCategories() {
  console.log('🚀 Iniciando extracción de categorías...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  for (let i = 0; i < productUrls.length; i++) {
    const url = productUrls[i];
    const partNumber = url.split('/').pop();
    
    try {
      console.log(`[${i + 1}/${productUrls.length}] Procesando: ${partNumber}`);
      
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Extraer Part Type (categoría)
      const partType = await page.evaluate(() => {
        // Buscar el elemento que contiene "Part Type"
        const labels = Array.from(document.querySelectorAll('label, dt, th, td, div'));
        const partTypeLabel = labels.find(el => el.textContent.trim() === 'Part Type');
        
        if (partTypeLabel) {
          // Buscar el valor asociado
          const parent = partTypeLabel.closest('tr, div');
          if (parent) {
            const value = parent.querySelector('td:last-child, dd, .value, a');
            if (value) return value.textContent.trim();
          }
          
          // Alternativa: buscar el siguiente elemento
          const nextElement = partTypeLabel.nextElementSibling;
          if (nextElement) return nextElement.textContent.trim();
        }
        
        return null;
      });
      
      // Extraer también la descripción completa
      const description = await page.evaluate(() => {
        const descElement = document.querySelector('.product-description, .description, h2');
        return descElement ? descElement.textContent.trim() : '';
      });
      
      results.push({
        partNumber,
        url,
        partType: partType || 'Unknown',
        description
      });
      
      console.log(`   ✓ Part Type: ${partType || 'No encontrado'}`);
      
      try {
        await page.close();
      } catch (e) {
        // Ignorar errores al cerrar
      }
      
      // Pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`);
      results.push({
        partNumber,
        url,
        partType: 'Error',
        description: '',
        error: error.message
      });
    }
  }

  await browser.close();

  // Guardar resultados
  const outputPath = path.join(__dirname, '..', 'scraped-data', 'product-categories.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Extracción completa!`);
  console.log(`📄 Resultados guardados en: ${outputPath}\n`);
  
  // Mostrar resumen de categorías
  const categoryCounts = {};
  results.forEach(r => {
    categoryCounts[r.partType] = (categoryCounts[r.partType] || 0) + 1;
  });
  
  console.log('📊 Resumen de categorías:');
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} productos`);
  });
}

extractCategories().catch(console.error);
