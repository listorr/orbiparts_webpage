#!/usr/bin/env node

/**
 * Inspecciona la estructura HTML de la página de búsqueda
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const SEARCH_URL = 'https://portal.skymart.aero/shop/partSearch/ZWFzdG1hbg==';

console.log(`🔍 Inspeccionando: ${SEARCH_URL}\n`);

const browser = await puppeteer.launch({
  headless: false, // Ventana visible para ver qué pasa
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('📄 Cargando página...');
  await page.goto(SEARCH_URL, { waitForTimeout: 30000 });
  await page.waitForTimeout(5000);
  
  // Guardar HTML completo
  const html = await page.content();
  fs.writeFileSync('search-page.html', html);
  console.log('💾 HTML guardado en: search-page.html');
  
  // Tomar screenshot
  await page.screenshot({ path: 'search-page.png', fullPage: true });
  console.log('📸 Screenshot guardado en: search-page.png');
  
  // Buscar diferentes patrones de enlaces
  console.log('\n🔍 Buscando patrones de enlaces...\n');
  
  const patterns = await page.evaluate(() => {
    const results = {
      allLinks: [],
      partLinks: [],
      tableRows: [],
      divClasses: [],
      buttonTexts: []
    };
    
    // Todos los enlaces
    document.querySelectorAll('a').forEach(a => {
      if (a.href) results.allLinks.push(a.href);
    });
    
    // Enlaces con "part"
    document.querySelectorAll('a[href*="part"]').forEach(a => {
      results.partLinks.push(a.href);
    });
    
    // Filas de tabla
    document.querySelectorAll('tr').forEach(tr => {
      const text = tr.textContent.substring(0, 100);
      if (text.trim()) results.tableRows.push(text.trim());
    });
    
    // Divs con clases
    document.querySelectorAll('div[class]').forEach(div => {
      const className = div.className;
      if (className && !results.divClasses.includes(className)) {
        results.divClasses.push(className);
      }
    });
    
    // Botones
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.trim();
      if (text) results.buttonTexts.push(text);
    });
    
    return results;
  });
  
  console.log(`Total enlaces: ${patterns.allLinks.length}`);
  console.log(`Enlaces con "part": ${patterns.partLinks.length}`);
  console.log(`Filas de tabla: ${patterns.tableRows.length}`);
  console.log(`Clases de divs: ${patterns.divClasses.length}`);
  console.log(`Botones: ${patterns.buttonTexts.length}`);
  
  console.log('\n📋 Primeros 10 enlaces con "part":');
  patterns.partLinks.slice(0, 10).forEach((link, i) => {
    console.log(`${i + 1}. ${link}`);
  });
  
  console.log('\n📋 Primeras 5 filas de tabla:');
  patterns.tableRows.slice(0, 5).forEach((row, i) => {
    console.log(`${i + 1}. ${row}`);
  });
  
  console.log('\n📋 Clases de divs:');
  patterns.divClasses.slice(0, 20).forEach((className, i) => {
    console.log(`${i + 1}. ${className}`);
  });
  
  console.log('\n⏳ Ventana abierta por 30 segundos para inspección manual...');
  await page.waitForTimeout(30000);
  
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
} finally {
  await browser.close();
  process.exit(0);
}
