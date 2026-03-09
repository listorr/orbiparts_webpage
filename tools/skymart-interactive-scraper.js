/**
 * SkyMart Interactive Scraper
 * Extrae TODA la información incluyendo secciones colapsadas y descarga PDFs
 * 
 * Uso: node skymart-interactive-scraper.js <URL>
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productUrl = process.argv[2] || 'https://portal.skymart.aero/shop/part/37935';

console.log('\n🚀 SkyMart Interactive Scraper');
console.log(`📄 URL: ${productUrl}\n`);

// Crear directorios
const outputDir = path.join(__dirname, '../scraped-data');
const pdfDir = path.join(outputDir, 'pdfs');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadPDF(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(pdfDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`   ✅ Descargado: ${filename}`);
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.log(`   ❌ Error: ${filename}`);
      reject(err);
    });
  });
}

async function scrapeProduct() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    console.log('🌐 Cargando página...');
    await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await wait(2000);
    
    const product = {
      url: productUrl,
      scrapedAt: new Date().toISOString(),
      specifications: {},
      inventory: [],
      datasheets: [],
      alternates: []
    };
    
    // Extraer información básica visible
    console.log('📋 Extrayendo información básica...');
    const basicInfo = await page.evaluate(() => {
      const h1 = document.querySelector('h1, .part-number, [class*="part"]');
      const partNumber = h1 ? h1.textContent.trim().split('\n')[0] : null;
      
      const descElements = document.querySelectorAll('h2, .description, [class*="description"]');
      let description = null;
      for (const el of descElements) {
        const text = el.textContent.trim();
        if (text && text.length > 10 && !text.includes('menu')) {
          description = text;
          break;
        }
      }
      
      // Buscar precio
      let price = null;
      const priceElements = document.querySelectorAll('[class*="price"], td, div');
      for (const el of priceElements) {
        const text = el.textContent;
        if (text.includes('$')) {
          const match = text.match(/\$\s*([0-9,]+\.?\d*)/);
          if (match) {
            price = parseFloat(match[1].replace(/,/g, ''));
            break;
          }
        }
      }
      
      return { partNumber, description, price };
    });
    
    Object.assign(product, basicInfo);
    console.log(`   Part Number: ${product.partNumber}`);
    console.log(`   Description: ${product.description}`);
    console.log(`   Price: $${product.price}`);
    
    // 1. EXPANDIR Y EXTRAER SPECIFICATIONS
    console.log('\n📊 Expandiendo Specifications...');
    try {
      const specsButton = await page.$x("//div[contains(text(), 'Specifications')]");
      if (specsButton.length > 0) {
        await specsButton[0].click();
        await wait(1500);
        
        const specs = await page.evaluate(() => {
          const specs = {};
          const rows = document.querySelectorAll('tr, .spec-row, [class*="specification"]');
          
          rows.forEach(row => {
            const cells = row.querySelectorAll('td, th, div, span');
            if (cells.length >= 2) {
              const key = cells[0].textContent.trim();
              const value = cells[1].textContent.trim();
              if (key && value && key.length < 50) {
                specs[key] = value;
              }
            }
          });
          
          return specs;
        });
        
        product.specifications = specs;
        console.log(`   ✅ ${Object.keys(specs).length} especificaciones extraídas`);
        Object.entries(specs).forEach(([key, value]) => {
          console.log(`      ${key}: ${value}`);
        });
      }
    } catch (error) {
      console.log(`   ⚠️  No se pudo expandir Specifications`);
    }
    
    // 2. EXPANDIR Y DESCARGAR DATA SHEETS
    console.log('\n📄 Expandiendo Data Sheets / Documents...');
    try {
      const docsButton = await page.$x("//div[contains(text(), 'Data Sheets')]");
      if (docsButton.length > 0) {
        await docsButton[0].click();
        await wait(1500);
        
        const pdfLinks = await page.evaluate(() => {
          const links = [];
          const anchors = document.querySelectorAll('a[href*=".pdf"], a[href*="download"], a[href*="document"]');
          
          anchors.forEach(a => {
            const href = a.href;
            const text = a.textContent.trim();
            if (href && text) {
              links.push({ url: href, name: text });
            }
          });
          
          return links;
        });
        
        console.log(`   📥 Encontrados ${pdfLinks.length} documentos`);
        
        for (const doc of pdfLinks) {
          const filename = `${product.partNumber || 'document'}_${doc.name.replace(/[^a-z0-9]/gi, '_')}.pdf`;
          try {
            await downloadPDF(doc.url, filename);
            product.datasheets.push({
              name: doc.name,
              url: doc.url,
              filename: filename,
              downloaded: true
            });
          } catch (error) {
            product.datasheets.push({
              name: doc.name,
              url: doc.url,
              downloaded: false,
              error: error.message
            });
          }
        }
      }
    } catch (error) {
      console.log(`   ⚠️  No se pudo expandir Data Sheets`);
    }
    
    // 3. EXPANDIR Y EXTRAER ALTERNATES
    console.log('\n🔄 Expandiendo Show Alternates...');
    try {
      const alternatesButton = await page.$x("//button[contains(text(), 'Alternates')] | //div[contains(text(), 'Alternates')]");
      if (alternatesButton.length > 0) {
        await alternatesButton[0].click();
        await wait(2000);
        
        const alternates = await page.evaluate(() => {
          const alts = [];
          const rows = document.querySelectorAll('tr[data-alternate], .alternate-row, tbody tr');
          
          rows.forEach(row => {
            const cells = row.querySelectorAll('td, div');
            if (cells.length >= 2) {
              const partNum = cells[0]?.textContent.trim();
              const manufacturer = cells[1]?.textContent.trim();
              const qty = cells[2]?.textContent.trim();
              
              if (partNum && partNum.length > 0 && !partNum.includes('Part')) {
                alts.push({
                  partNumber: partNum,
                  manufacturer: manufacturer || 'Unknown',
                  qtyAvailable: qty || 'N/A'
                });
              }
            }
          });
          
          return alts;
        });
        
        product.alternates = alternates;
        console.log(`   ✅ ${alternates.length} productos alternativos encontrados`);
        alternates.forEach(alt => {
          console.log(`      ${alt.partNumber} (${alt.manufacturer}) - Qty: ${alt.qtyAvailable}`);
        });
      }
    } catch (error) {
      console.log(`   ⚠️  No se pudo expandir Alternates`);
    }
    
    // 4. EXTRAER INVENTARIO (siempre visible)
    console.log('\n📦 Extrayendo Inventario...');
    const inventory = await page.evaluate(() => {
      const inv = [];
      const rows = document.querySelectorAll('tbody tr, .inventory-row');
      
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
          const condition = cells[0]?.textContent.trim();
          const warehouse = cells[1]?.textContent.trim();
          const qty = cells[2]?.textContent.trim();
          const shelfLife = cells[3]?.textContent.trim();
          
          if (warehouse && qty) {
            inv.push({
              condition,
              warehouse,
              qtyAvailable: qty,
              shelfLife
            });
          }
        }
      });
      
      return inv;
    });
    
    product.inventory = inventory;
    console.log(`   ✅ ${inventory.length} ubicaciones de inventario`);
    inventory.forEach(loc => {
      console.log(`      ${loc.warehouse}: ${loc.qtyAvailable} (${loc.shelfLife})`);
    });
    
    // Guardar JSON completo
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonFile = path.join(outputDir, `product-complete-${timestamp}.json`);
    fs.writeFileSync(jsonFile, JSON.stringify(product, null, 2));
    
    console.log('\n✅ SCRAPING COMPLETADO');
    console.log('═'.repeat(60));
    console.log(`📄 Datos guardados: ${jsonFile}`);
    console.log(`📁 PDFs descargados: ${pdfDir}`);
    console.log('\n📊 RESUMEN:');
    console.log(`   Especificaciones: ${Object.keys(product.specifications).length}`);
    console.log(`   Datasheets: ${product.datasheets.length} (${product.datasheets.filter(d => d.downloaded).length} descargados)`);
    console.log(`   Alternativas: ${product.alternates.length}`);
    console.log(`   Ubicaciones: ${product.inventory.length}`);
    console.log('═'.repeat(60));
    
    return product;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

scrapeProduct().catch(console.error);
