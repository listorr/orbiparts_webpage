/**
 * SkyMart Simple Scraper - Versión Simplificada
 * Extrae información básica de productos de forma más robusta
 * 
 * Uso: node skymart-simple-scraper.js <URL>
 * Ejemplo: node skymart-simple-scraper.js https://portal.skymart.aero/shop/part/37935
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtener URL de los argumentos
const productUrl = process.argv[2] || 'https://portal.skymart.aero/shop/part/37935';

console.log('\n🔍 SkyMart Simple Scraper');
console.log(`📄 URL: ${productUrl}\n`);

async function scrapeProduct() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    console.log('🌐 Cargando página...');
    await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    console.log('📊 Extrayendo información...\n');
    
    // Extraer TODO el texto de la página
    const pageContent = await page.evaluate(() => {
      return document.body.innerText;
    });
    
    // Extraer también el HTML para análisis
    const htmlContent = await page.content();
    
    // Guardar el contenido para análisis
    const outputDir = path.join(__dirname, '../scraped-data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const textFile = path.join(outputDir, `product-${timestamp}.txt`);
    const htmlFile = path.join(outputDir, `product-${timestamp}.html`);
    
    fs.writeFileSync(textFile, pageContent);
    fs.writeFileSync(htmlFile, htmlContent);
    
    console.log('✅ Contenido guardado:');
    console.log(`   📄 Texto: ${textFile}`);
    console.log(`   🌐 HTML: ${htmlFile}`);
    
    // Mostrar primeras líneas del contenido
    console.log('\n📝 Contenido extraído (primeras 100 líneas):');
    console.log('═'.repeat(60));
    const lines = pageContent.split('\n').slice(0, 100);
    lines.forEach(line => {
      if (line.trim()) console.log(line);
    });
    console.log('═'.repeat(60));
    
    // Intentar extraer información estructurada de forma simple
    const product = {
      url: productUrl,
      scrapedAt: new Date().toISOString(),
      rawText: pageContent,
      
      // Buscar patrones comunes
      partNumber: extractPattern(pageContent, /Part(?:\s+Number)?[\s:]+([A-Z0-9\-]+)/i),
      nsn: extractPattern(pageContent, /(?:NSN|National\s+Stock\s+(?:Number|#))[\s:]+([0-9\-]+)/i),
      manufacturer: extractPattern(pageContent, /Manufacturer[\s:]+([A-Z]+)/i),
      partType: extractPattern(pageContent, /Part\s+Type[\s:]+([A-Z\s]+)/i),
      price: extractPattern(pageContent, /\$\s*([0-9,]+\.?\d*)/),
      units: extractPattern(pageContent, /Units[\s:]+([A-Z]+)/i),
    };
    
    console.log('\n🎯 Información extraída:');
    console.log(JSON.stringify(product, null, 2));
    
    // Guardar JSON
    const jsonFile = path.join(outputDir, `product-${timestamp}.json`);
    fs.writeFileSync(jsonFile, JSON.stringify(product, null, 2));
    console.log(`\n💾 JSON guardado: ${jsonFile}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

function extractPattern(text, pattern) {
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

scrapeProduct().catch(console.error);
