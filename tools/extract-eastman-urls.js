#!/usr/bin/env node

/**
 * Extractor manual de URLs - Más robusto
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const browser = await puppeteer.launch({
  headless: "new",
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('🔍 Navegando a la búsqueda de Eastman...');
  await page.goto('https://portal.skymart.aero/shop/partSearch/ZWFzdG1hbg==', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });
  
  console.log('⏳ Esperando que carguen los productos...');
  await page.waitForTimeout(10000);
  
  // Intentar hacer scroll
  console.log('📜 Haciendo scroll...');
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(1000);
  }
  
  await page.waitForTimeout(3000);
  
  // Guardar HTML para análisis manual
  const html = await page.content();
  fs.writeFileSync('eastman-search-page.html', html);
  console.log('💾 HTML guardado en: eastman-search-page.html');
  
  // Buscar URLs en el HTML guardado
  const urlMatches = html.match(/\/shop\/part\/\d+/g);
  
  if (urlMatches) {
    const uniqueUrls = [...new Set(urlMatches)].map(path => 
      `https://portal.skymart.aero${path}`
    );
    
    console.log(`\n✅ ${uniqueUrls.length} URLs encontradas:\n`);
    uniqueUrls.forEach((url, i) => {
      console.log(`${i + 1}. ${url}`);
    });
    
    // Guardar en archivo
    const content = '# URLs de productos Eastman - SkyMart\n' +
                    `# Fecha: ${new Date().toLocaleString()}\n` +
                    `# Total: ${uniqueUrls.length} productos\n\n` +
                    uniqueUrls.join('\n');
    
    fs.writeFileSync('eastman-products.txt', content);
    console.log(`\n💾 URLs guardadas en: eastman-products.txt`);
  } else {
    console.log('❌ No se encontraron URLs en el HTML');
    console.log('💡 Revisa el archivo eastman-search-page.html manualmente');
  }
  
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
} finally {
  await browser.close();
  process.exit(0);
}
