/**
 * SkyMart Product Scraper
 * Extrae información detallada de productos de lubricantes de aviación
 * Incluyendo: especificaciones, precios, inventario, datasheets y alternativas
 * 
 * Uso:
 * node tools/skymart-scraper.js
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Procesar argumentos de línea de comandos
const args = process.argv.slice(2);
const TEST_MODE = args.includes('--test');
const MANUFACTURER_FILTER = args.find(arg => arg.startsWith('--manufacturer'))?.split('=')[1];

// Configuración
const CONFIG = {
  // URLs base para buscar productos
  SEARCH_URLS: [
    'https://portal.skymart.aero/shop?query=eastman',
    'https://portal.skymart.aero/shop?query=aeroshell',
    'https://portal.skymart.aero/shop?query=castrol'
  ],
  
  // URLs de ejemplo de productos (para testing)
  TEST_PRODUCT_URLS: [
    'https://portal.skymart.aero/shop/part/37935', // 2380-QT Turbine Oil
    'https://portal.skymart.aero/shop/part/35914', // Otro producto
  ],
  
  // Carpetas de salida
  OUTPUT_DIR: path.join(__dirname, '../scraped-data'),
  DATASHEETS_DIR: path.join(__dirname, '../scraped-data/datasheets'),
  
  // Configuración de scraping
  HEADLESS: true, // false para ver el navegador en acción (puede causar errores en algunos sistemas)
  DELAY: 2000, // delay entre requests (ms)
  MAX_PRODUCTS: 100, // máximo de productos por marca
  TEST_MODE: TEST_MODE, // activado con --test
  MANUFACTURER_FILTER: MANUFACTURER_FILTER, // filtro por fabricante
};

// Crear directorios si no existen
if (!fs.existsSync(CONFIG.OUTPUT_DIR)) {
  fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(CONFIG.DATASHEETS_DIR)) {
  fs.mkdirSync(CONFIG.DATASHEETS_DIR, { recursive: true });
}

/**
 * Utilidad para esperar
 */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * NO SE NECESITA LOGIN - SkyMart permite acceso público a la información
 * Esta función se mantiene por si en el futuro se requiere autenticación
 */
async function checkAccess(page) {
  console.log('✅ Acceso público disponible - No se requiere login');
  return true;
}

/**
 * Extraer información detallada de un producto
 */
async function scrapeProductDetails(page, productUrl) {
  console.log(`📄 Scrapeando: ${productUrl}`);
  
  try {
    await page.goto(productUrl, { waitUntil: 'networkidle2' });
    await wait(CONFIG.DELAY);
    
    const productData = await page.evaluate(() => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.textContent.trim() : null;
      };
      
      const getSpecValue = (label) => {
        const rows = Array.from(document.querySelectorAll('table tr, div.spec-row'));
        for (const row of rows) {
          const text = row.textContent;
          if (text.includes(label)) {
            const parts = text.split(label);
            if (parts[1]) {
              return parts[1].trim();
            }
          }
        }
        return null;
      };
      
      // Extraer información básica
      const partNumber = getText('h1, .part-number, .product-title');
      const description = getText('.product-description, h2, .subtitle');
      
      // Extraer especificaciones
      const nsn = getSpecValue('National Stock #') || getSpecValue('NSN');
      const manufacturer = getSpecValue('Manufacturer');
      const partType = getSpecValue('Part Type');
      const units = getSpecValue('Units');
      const groupCode = getSpecValue('Group Code');
      const unNumber = getSpecValue('UN #');
      const limitedShelfLife = getSpecValue('Limited Shelf Life');
      const shelfLifeDays = getSpecValue('Shelf Life');
      const hazardous = getSpecValue('Hazardous Material');
      const application = getSpecValue('Application');
      
      // Extraer precio
      let price = null;
      const priceEl = document.querySelector('.price, .unit-price, [class*="price"]');
      if (priceEl) {
        const priceText = priceEl.textContent;
        const priceMatch = priceText.match(/\$?\s*([0-9,]+\.?\d*)/);
        if (priceMatch) {
          price = parseFloat(priceMatch[1].replace(/,/g, ''));
        }
      }
      
      // Extraer información de inventario
      const inventoryData = [];
      const inventoryRows = document.querySelectorAll('table.inventory tr, .inventory-row');
      inventoryRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
          inventoryData.push({
            condition: cells[0]?.textContent.trim(),
            warehouse: cells[1]?.textContent.trim(),
            quantity: cells[2]?.textContent.trim(),
            shelfLifeRemaining: cells[3]?.textContent.trim()
          });
        }
      });
      
      // Extraer datasheets/documentos
      const datasheets = [];
      const docLinks = document.querySelectorAll('a[href*=".pdf"], a[href*="datasheet"], a[href*="SDS"]');
      docLinks.forEach(link => {
        datasheets.push({
          name: link.textContent.trim(),
          url: link.href
        });
      });
      
      // Extraer imagen del producto
      const image = document.querySelector('img.product-image, img[alt*="product"]')?.src;
      
      return {
        partNumber,
        description,
        nsn,
        manufacturer,
        partType,
        units,
        groupCode,
        unNumber,
        limitedShelfLife: limitedShelfLife === 'Yes',
        shelfLifeDays: shelfLifeDays ? parseInt(shelfLifeDays) : null,
        hazardous: hazardous === 'Yes',
        application,
        price,
        inventory: inventoryData,
        datasheets,
        image,
        sourceUrl: window.location.href
      };
    });
    
    // Obtener productos alternativos
    productData.alternates = await scrapeAlternates(page);
    
    // Descargar datasheets si existen
    if (productData.datasheets && productData.datasheets.length > 0) {
      productData.downloadedDatasheets = await downloadDatasheets(page, productData.datasheets, productData.partNumber);
    }
    
    console.log(`✅ Producto scrapeado: ${productData.partNumber}`);
    return productData;
    
  } catch (error) {
    console.error(`❌ Error scrapeando producto ${productUrl}:`, error.message);
    return null;
  }
}

/**
 * Extraer productos alternativos
 */
async function scrapeAlternates(page) {
  console.log('🔄 Buscando productos alternativos...');
  
  try {
    // Buscar botón de "Alternates" o "Show Alternates"
    const alternatesButton = await page.$('button:contains("Alternates"), button:contains("Show Alternates"), .alternates-btn');
    
    if (!alternatesButton) {
      console.log('ℹ️ No hay botón de alternativas');
      return [];
    }
    
    // Hacer clic en el botón
    await alternatesButton.click();
    await wait(1000);
    
    // Extraer información de alternativas
    const alternates = await page.evaluate(() => {
      const alternatesList = [];
      const alternateRows = document.querySelectorAll('.alternate-row, tr[data-alternate]');
      
      alternateRows.forEach(row => {
        const partNum = row.querySelector('.part-number, [data-part-number]')?.textContent.trim();
        const manufacturer = row.querySelector('.manufacturer, [data-manufacturer]')?.textContent.trim();
        const qtyAvail = row.querySelector('.qty-available, [data-qty]')?.textContent.trim();
        const link = row.querySelector('a')?.href;
        
        if (partNum) {
          alternatesList.push({
            partNumber: partNum,
            manufacturer,
            qtyAvailable: qtyAvail ? parseInt(qtyAvail) : null,
            url: link
          });
        }
      });
      
      return alternatesList;
    });
    
    console.log(`✅ ${alternates.length} alternativas encontradas`);
    return alternates;
    
  } catch (error) {
    console.log('⚠️ Error obteniendo alternativas:', error.message);
    return [];
  }
}

/**
 * Descargar datasheets
 */
async function downloadDatasheets(page, datasheets, partNumber) {
  console.log(`📥 Descargando ${datasheets.length} datasheets...`);
  
  const downloaded = [];
  
  for (const sheet of datasheets) {
    try {
      const sanitizedName = partNumber.replace(/[^a-z0-9]/gi, '_');
      const sheetName = sheet.name.replace(/[^a-z0-9]/gi, '_');
      const filename = `${sanitizedName}_${sheetName}.pdf`;
      const filepath = path.join(CONFIG.DATASHEETS_DIR, filename);
      
      // Descargar el PDF
      const client = await page.target().createCDPSession();
      await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: CONFIG.DATASHEETS_DIR
      });
      
      // Navegar al PDF (esto iniciará la descarga)
      await page.goto(sheet.url);
      await wait(2000); // Esperar a que se descargue
      
      downloaded.push({
        name: sheet.name,
        filename: filename,
        localPath: filepath
      });
      
      console.log(`✅ Descargado: ${filename}`);
      
    } catch (error) {
      console.error(`❌ Error descargando ${sheet.name}:`, error.message);
    }
  }
  
  return downloaded;
}

/**
 * Buscar todos los productos de una marca
 */
async function scrapeManufacturerProducts(page, searchUrl, manufacturer) {
  console.log(`\n🔍 Buscando productos de ${manufacturer}...`);
  
  try {
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });
    await wait(CONFIG.DELAY);
    
    // Extraer URLs de todos los productos
    const productUrls = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="/shop/part/"]'));
      return [...new Set(links.map(link => link.href))]; // Eliminar duplicados
    });
    
    console.log(`📦 ${productUrls.length} productos encontrados`);
    
    const products = [];
    const maxProducts = Math.min(productUrls.length, CONFIG.MAX_PRODUCTS);
    
    for (let i = 0; i < maxProducts; i++) {
      console.log(`\n[${i + 1}/${maxProducts}] Procesando producto...`);
      
      const productData = await scrapeProductDetails(page, productUrls[i]);
      
      if (productData) {
        products.push(productData);
      }
      
      await wait(CONFIG.DELAY); // Respetar rate limiting
    }
    
    return products;
    
  } catch (error) {
    console.error(`❌ Error buscando productos de ${manufacturer}:`, error.message);
    return [];
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando SkyMart Scraper\n');
  console.log('📋 Configuración:');
  console.log(`   - Headless: ${CONFIG.HEADLESS}`);
  console.log(`   - Output: ${CONFIG.OUTPUT_DIR}`);
  console.log(`   - Max productos: ${CONFIG.MAX_PRODUCTS}`);
  console.log(`   - Test Mode: ${CONFIG.TEST_MODE}`);
  console.log('');
  
  const browser = await puppeteer.launch({
    headless: CONFIG.HEADLESS,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ],
    ignoreHTTPSErrors: true,
    protocolTimeout: 60000
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Verificar acceso (no requiere login)
  await checkAccess(page);
  
  const allProducts = {
    eastman: [],
    aeroshell: [],
    castrol: [],
    metadata: {
      scrapedAt: new Date().toISOString(),
      totalProducts: 0,
      testMode: CONFIG.TEST_MODE
    }
  };
  
  // MODO TEST: Solo scrapea productos de ejemplo
  if (CONFIG.TEST_MODE) {
    console.log('\n🧪 MODO TEST ACTIVADO');
    console.log(`   Scrapeando ${CONFIG.TEST_PRODUCT_URLS.length} productos de prueba...\n`);
    
    for (const url of CONFIG.TEST_PRODUCT_URLS) {
      const productData = await scrapeProductDetails(page, url);
      if (productData) {
        // Categorizar por fabricante
        const mfr = productData.manufacturer?.toLowerCase() || 'unknown';
        if (mfr.includes('eastman')) {
          allProducts.eastman.push(productData);
        } else if (mfr.includes('aeroshell')) {
          allProducts.aeroshell.push(productData);
        } else if (mfr.includes('castrol')) {
          allProducts.castrol.push(productData);
        }
      }
      await wait(CONFIG.DELAY);
    }
    
    allProducts.metadata.totalProducts = 
      allProducts.eastman.length + 
      allProducts.aeroshell.length + 
      allProducts.castrol.length;
    
  } else {
    // MODO PRODUCCIÓN: Scrapea todas las marcas
    const manufacturers = [
      { name: 'eastman', url: CONFIG.SEARCH_URLS[0] },
      { name: 'aeroshell', url: CONFIG.SEARCH_URLS[1] },
      { name: 'castrol', url: CONFIG.SEARCH_URLS[2] }
    ];
    
    for (const mfr of manufacturers) {
      const products = await scrapeManufacturerProducts(page, mfr.url, mfr.name);
      allProducts[mfr.name] = products;
      allProducts.metadata.totalProducts += products.length;
      
      console.log(`\n✅ ${mfr.name.toUpperCase()}: ${products.length} productos scrapeados`);
    }
  }
  
  // Guardar resultados
  const outputFile = path.join(CONFIG.OUTPUT_DIR, 'skymart-products.json');
  fs.writeFileSync(outputFile, JSON.stringify(allProducts, null, 2));
  console.log(`\n💾 Datos guardados en: ${outputFile}`);
  
  // Generar resumen
  console.log('\n📊 RESUMEN:');
  console.log(`   - Eastman: ${allProducts.eastman.length} productos`);
  console.log(`   - AeroShell: ${allProducts.aeroshell.length} productos`);
  console.log(`   - Castrol: ${allProducts.castrol.length} productos`);
  console.log(`   - TOTAL: ${allProducts.metadata.totalProducts} productos`);
  
  await browser.close();
  console.log('\n✅ Scraping completado!');
}

// Ejecutar
main().catch(console.error);
