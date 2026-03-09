#!/usr/bin/env node

/**
 * Extrae URLs de productos de una página de búsqueda de SkyMart
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const SEARCH_URL = process.argv[2] || 'https://portal.skymart.aero/shop/partSearch/ZWFzdG1hbg==';

console.log(`🔍 Extrayendo URLs de productos desde: ${SEARCH_URL}\n`);

const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage'
  ]
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('📄 Cargando página...');
  await page.goto(SEARCH_URL, { waitForTimeout: 30000 });
  await page.waitForTimeout(3000); // Esperar a que cargue el contenido
  
  // Intentar hacer scroll para cargar todos los productos
  console.log('📜 Haciendo scroll para cargar todos los productos...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  await page.waitForTimeout(2000);
  
  // Extraer todos los enlaces de productos
  console.log('🔗 Extrayendo enlaces de productos...');
  
  const productUrls = await page.evaluate(() => {
    const urls = [];
    
    // Buscar todos los enlaces que contienen /shop/part/
    const links = document.querySelectorAll('a[href*="/shop/part/"]');
    
    links.forEach(link => {
      const href = link.href;
      if (href && href.includes('/shop/part/') && !urls.includes(href)) {
        urls.push(href);
      }
    });
    
    return urls;
  });
  
  console.log(`✅ ${productUrls.length} URLs únicas encontradas\n`);
  
  // Mostrar las URLs
  productUrls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });
  
  // Guardar en archivo
  const outputFile = 'eastman-products.txt';
  const content = '# URLs de productos Eastman extraídas automáticamente\n' +
                  `# Fecha: ${new Date().toLocaleString()}\n` +
                  `# Total: ${productUrls.length} productos\n\n` +
                  productUrls.join('\n');
  
  fs.writeFileSync(outputFile, content);
  console.log(`\n💾 URLs guardadas en: ${outputFile}`);
  
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
} finally {
  await browser.close();
  process.exit(0);
}
