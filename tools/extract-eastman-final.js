#!/usr/bin/env node

/**
 * Extractor de Part Numbers de Eastman desde la página de búsqueda
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

console.log('🚀 Iniciando extracción de productos Eastman...\n');

const browser = await puppeteer.launch({
  headless: "new",
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-web-security'
  ]
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Configurar user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  
  console.log('📄 Navegando a búsqueda de Eastman...');
  await page.goto('https://portal.skymart.aero/shop/partSearch/ZWFzdG1hbg==', {
    waitUntil: 'networkidle0',
    timeout: 60000
  });
  
  console.log('⏳ Esperando que carguen los productos (15 segundos)...');
  await page.waitForTimeout(15000);
  
  // Hacer scroll para asegurar que todos los productos cargan
  console.log('📜 Haciendo scroll para cargar todos los productos...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          setTimeout(resolve, 2000);
        }
      }, 200);
    });
  });
  
  console.log('⏳ Esperando estabilización (5 segundos)...');
  await page.waitForTimeout(5000);
  
  // Extraer part numbers y construir URLs
  console.log('🔍 Extrayendo part numbers y URLs...');
  
  const products = await page.evaluate(() => {
    const results = [];
    
    // Buscar todos los divs con la clase que contiene el part number
    const partNumberDivs = document.querySelectorAll('[class*="text-h6"][class*="text-click"]');
    
    partNumberDivs.forEach(div => {
      const partNumber = div.textContent.trim();
      if (partNumber && /^[A-Z0-9\-]+$/.test(partNumber)) {
        results.push(partNumber);
      }
    });
    
    // También buscar en los botones y enlaces
    const buttons = document.querySelectorAll('button[class*="q-btn"]');
    buttons.forEach(btn => {
      const text = btn.textContent.trim();
      // Buscar el part number en el contexto del botón
      const parent = btn.closest('[class*="column"]');
      if (parent) {
        const partDiv = parent.querySelector('[class*="text-h6"]');
        if (partDiv) {
          const partNumber = partDiv.textContent.trim();
          if (partNumber && /^[A-Z0-9\-]+$/.test(partNumber) && !results.includes(partNumber)) {
            results.push(partNumber);
          }
        }
      }
    });
    
    return [...new Set(results)]; // Eliminar duplicados
  });
  
  console.log(`✅ ${products.length} part numbers encontrados\n`);
  
  if (products.length === 0) {
    console.log('⚠️  No se encontraron part numbers. Guardando HTML para inspección...');
    const html = await page.content();
    fs.writeFileSync('eastman-page-debug.html', html);
    console.log('💾 HTML guardado en: eastman-page-debug.html');
    
    // Intentar buscar en el HTML guardado
    const partMatches = html.match(/>\s*([0-9]{4}-[A-Z0-9]+)\s*</g);
    if (partMatches) {
      const extractedParts = partMatches.map(m => m.replace(/[><\s]/g, ''));
      console.log(`\n📋 Part numbers encontrados en HTML: ${extractedParts.length}`);
      extractedParts.forEach((pn, i) => console.log(`${i + 1}. ${pn}`));
    }
  } else {
    // Mostrar y guardar resultados
    console.log('📋 Part Numbers encontrados:\n');
    products.forEach((partNumber, index) => {
      console.log(`${index + 1}. ${partNumber}`);
    });
    
    // Necesitamos mapear part numbers a IDs de producto
    // Vamos a extraer los enlaces directamente del HTML
    const html = await page.content();
    fs.writeFileSync('eastman-page-full.html', html);
    
    // Buscar todas las URLs de productos en el HTML
    const urlMatches = html.match(/\/shop\/part\/\d+/g);
    
    if (urlMatches) {
      const uniqueUrls = [...new Set(urlMatches)].map(path => 
        `https://portal.skymart.aero${path}`
      );
      
      console.log(`\n🔗 ${uniqueUrls.length} URLs únicas encontradas:\n`);
      uniqueUrls.forEach((url, index) => {
        console.log(`${index + 1}. ${url}`);
      });
      
      // Guardar URLs en archivo
      const content = '# URLs de productos Eastman - SkyMart\n' +
                      `# Fecha: ${new Date().toLocaleString()}\n` +
                      `# Total: ${uniqueUrls.length} productos\n` +
                      `# Extraído automáticamente desde la página de búsqueda\n\n` +
                      uniqueUrls.join('\n');
      
      fs.writeFileSync('eastman-products.txt', content);
      console.log(`\n💾 ✅ URLs guardadas en: eastman-products.txt`);
      console.log(`\n🎯 Listo para ejecutar:`);
      console.log(`   node skymart-batch-scraper.js eastman-products.txt`);
    } else {
      console.log('\n⚠️  No se encontraron URLs en el formato /shop/part/ID');
      console.log('💾 HTML guardado en: eastman-page-full.html para revisión manual');
    }
  }
  
} catch (error) {
  console.error(`\n❌ Error: ${error.message}`);
  console.error(error.stack);
} finally {
  await browser.close();
  process.exit(0);
}
