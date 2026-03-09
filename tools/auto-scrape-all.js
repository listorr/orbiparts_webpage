import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productUrls = [
  'https://portal.skymart.aero/shop/part/35914',
  'https://portal.skymart.aero/shop/part/79614',
  'https://portal.skymart.aero/shop/part/19310',
  'https://portal.skymart.aero/shop/part/26526',
  'https://portal.skymart.aero/shop/part/37935',
  'https://portal.skymart.aero/shop/part/67709',
  'https://portal.skymart.aero/shop/part/55983',
  'https://portal.skymart.aero/shop/part/194462',
  'https://portal.skymart.aero/shop/part/17969',
  'https://portal.skymart.aero/shop/part/18330',
  'https://portal.skymart.aero/shop/part/33646',
  'https://portal.skymart.aero/shop/part/18063',
  'https://portal.skymart.aero/shop/part/80646',
  'https://portal.skymart.aero/shop/part/187581',
  'https://portal.skymart.aero/shop/part/187580',
  'https://portal.skymart.aero/shop/part/19311',
  'https://portal.skymart.aero/shop/part/18993',
  'https://portal.skymart.aero/shop/part/28839',
  'https://portal.skymart.aero/shop/part/28800',
  'https://portal.skymart.aero/shop/part/26412',
  'https://portal.skymart.aero/shop/part/163380',
  'https://portal.skymart.aero/shop/part/79958',
  'https://portal.skymart.aero/shop/part/81697',
  'https://portal.skymart.aero/shop/part/121335',
  'https://portal.skymart.aero/shop/part/60598',
  'https://portal.skymart.aero/shop/part/33461',
  'https://portal.skymart.aero/shop/part/30311',
  'https://portal.skymart.aero/shop/part/171867',
  'https://portal.skymart.aero/shop/part/27952',
  'https://portal.skymart.aero/shop/part/57217',
  'https://portal.skymart.aero/shop/part/190037',
  'https://portal.skymart.aero/shop/part/21797'
];

async function scrapeProductData(page, url) {
  const partNumber = url.split('/').pop();
  console.log(`\n[${partNumber}] Cargando página...`);
  
  try {
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    });
    
    // Esperar a que se cargue el contenido
    await page.waitForSelector('.q-card', { timeout: 10000 });
    console.log(`[${partNumber}] ✓ Página cargada`);
    
    // Hacer clic en "Show Alternates" si existe
    let alternatesData = [];
    try {
      const showAlternatesButton = await page.$('button:has-text("Show Alternates"), a:has-text("Show Alternates"), [class*="alternate"]');
      
      if (showAlternatesButton) {
        console.log(`[${partNumber}] 🔍 Buscando alternates...`);
        await showAlternatesButton.click();
        await page.waitForTimeout(2000); // Esperar a que se abra el modal
        
        // Extraer datos de alternates del modal o sección que se abrió
        alternatesData = await page.evaluate(() => {
          const alternates = [];
          
          // Buscar en el modal o sección de alternates
          const modalAlternates = document.querySelectorAll('[class*="alternate"] .row, [data-v-5fd02a3f]');
          
          modalAlternates.forEach(row => {
            const text = row.textContent;
            // Buscar part numbers y manufactureros
            const partMatch = text.match(/([A-Z0-9\-]+)/g);
            if (partMatch && partMatch.length > 0) {
              const manufacturer = text.includes('EXXONMOBIL') ? 'EXXONMOBIL' : 
                                 text.includes('AEROSHELL') ? 'AEROSHELL' :
                                 text.includes('EASTMAN') ? 'EASTMAN' :
                                 text.includes('ROYCO') ? 'ROYCO' : 'Unknown';
              
              partMatch.forEach(part => {
                if (part.length > 2 && part.length < 30 && !part.includes('MIL') && !part.includes('PRF')) {
                  alternates.push({
                    partNumber: part,
                    manufacturer: manufacturer
                  });
                }
              });
            }
          });
          
          return alternates;
        });
        
        console.log(`[${partNumber}] ✓ Encontrados ${alternatesData.length} alternates`);
        
        // Cerrar el modal si existe un botón OK o Close
        try {
          const okButton = await page.$('button:has-text("OK"), button:has-text("Close"), button[class*="close"]');
          if (okButton) {
            await okButton.click();
            await page.waitForTimeout(500);
          }
        } catch (e) {
          // No hay problema si no encontramos el botón
        }
      }
    } catch (error) {
      console.log(`[${partNumber}] ⚠️  No se encontró botón Show Alternates`);
    }
    
    // Extraer datos del DOM
    const data = await page.evaluate(() => {
      const getTextContent = (label) => {
        const elements = Array.from(document.querySelectorAll('.prop.text-bold'));
        // Buscar coincidencias exactas o parciales (algunos labels tienen ":" o no)
        const labelElement = elements.find(el => {
          const text = el.textContent.trim();
          return text === label || 
                 text === label + ':' || 
                 text.replace(':', '') === label ||
                 text.replace(':', '').trim() === label;
        });
        
        if (labelElement) {
          const nextDiv = labelElement.nextElementSibling;
          if (nextDiv && nextDiv.classList.contains('prop')) {
            return nextDiv.textContent.trim();
          }
        }
        return '';
      };
      
      // Extraer el nombre del producto (título principal en text-h6)
      let productName = '';
      const h6Element = document.querySelector('.text-h6');
      if (h6Element) {
        productName = h6Element.textContent.trim();
      }
      
      // Extraer la descripción correcta (está justo después del h6, en un q-ml-sm)
      let description = '';
      if (h6Element) {
        const nextElement = h6Element.nextElementSibling;
        if (nextElement && nextElement.classList.contains('q-ml-sm')) {
          description = nextElement.textContent.trim();
          // Limpiar texto no deseado como "shopping_cart0"
          if (description.includes('shopping_cart')) {
            description = '';
          }
        }
      }
      
      // Si no hay descripción en q-ml-sm, buscar en otros lugares
      if (!description) {
        const allDivs = document.querySelectorAll('.q-ml-sm');
        for (let div of allDivs) {
          const text = div.textContent.trim();
          if (text && !text.includes('shopping_cart') && text.length > 5 && text.includes('(')) {
            description = text;
            break;
          }
        }
      }
      
      // Extraer imagen del producto
      let productImage = '';
      const allImages = document.querySelectorAll('img');
      for (let img of allImages) {
        const src = img.getAttribute('src') || img.src || '';
        if (src && (src.includes('.png') || src.includes('.jpg')) && 
            !src.includes('logo') && !src.includes('icon') && 
            src.includes('skymart')) {
          productImage = src;
          break;
        }
      }
      
      // Extraer PDFs con sus nombres correctos desde la sección Data Sheets / Documents
      const pdfs = [];
      const pdfSections = document.querySelectorAll('[class*="data-sheet"], [class*="document"]');
      
      // Buscar en toda la página por enlaces PDF
      const allLinks = document.querySelectorAll('a');
      allLinks.forEach(link => {
        const href = link.href;
        if (href && (href.includes('.pdf') || href.includes('.PDF'))) {
          // Obtener el texto del enlace o del elemento padre
          let name = link.textContent.trim();
          
          // Si el texto es muy corto, buscar en elementos cercanos
          if (!name || name.length < 3) {
            const parent = link.closest('[class*="col"]');
            if (parent) {
              name = parent.textContent.trim().split('\n')[0];
            }
          }
          
          // Limpiar el nombre
          name = name.replace(/\s+/g, ' ').trim();
          
          if (!pdfs.find(p => p.url === href)) {
            pdfs.push({
              url: href,
              name: name || 'Document'
            });
          }
        }
      });
      
      // Extraer TODOS los campos de Specifications
      const specifications = {
        nationalStock: getTextContent('National Stock #'),
        productCode: getTextContent('Product Code'),
        application: getTextContent('Application'),
        manufacturer: getTextContent('Manufacturer'),
        partType: getTextContent('Part Type'),
        units: getTextContent('Units'),
        groupCode: getTextContent('Group Code'),
        class: getTextContent('Class'),
        un: getTextContent('UN #'),
        limitedShelfLife: getTextContent('Limited Shelf Life'),
        shelfLife: getTextContent('Shelf Life'),
        hazardousMaterial: getTextContent('Hazardous Material')
      };
      
      // Extraer productos alternativos/equivalentes
      const alternativeProducts = [];
      
      // Ya no necesitamos buscar alternativos aquí porque los obtuvimos antes
      // Esta sección se eliminará
      
      return {
        productName: productName,
        description: description,
        productImage: productImage,
        pdfs: pdfs,
        alternativeProducts: [], // Se llenará después
        ...specifications
      };
    });
    
    // Agregar los alternates obtenidos al hacer clic en el botón
    data.alternativeProducts = alternatesData;
    
    console.log(`[${partNumber}] ✓ Datos extraídos:`);
    console.log(`   Nombre: ${data.productName}`);
    console.log(`   Descripción: ${data.description || 'N/A'}`);
    console.log(`   Part Type: ${data.partType}`);
    console.log(`   Application: ${data.application || 'N/A'}`);
    console.log(`   Manufacturer: ${data.manufacturer}`);
    console.log(`   Units: ${data.units}`);
    console.log(`   Group Code: ${data.groupCode}`);
    console.log(`   Class: ${data.class || 'N/A'}`);
    console.log(`   UN #: ${data.un || 'N/A'}`);
    console.log(`   National Stock: ${data.nationalStock || 'N/A'}`);
    console.log(`   Limited Shelf Life: ${data.limitedShelfLife || 'N/A'}`);
    console.log(`   Shelf Life: ${data.shelfLife || 'N/A'}`);
    console.log(`   Hazardous Material: ${data.hazardousMaterial || 'N/A'}`);
    console.log(`   Productos Alternativos: ${data.alternativeProducts ? data.alternativeProducts.length : 0}`);
    if (data.alternativeProducts && data.alternativeProducts.length > 0) {
      data.alternativeProducts.forEach((alt, i) => {
        console.log(`      ${i+1}. ${alt.partNumber}`);
      });
    }
    console.log(`   PDFs: ${data.pdfs.length} archivos`);
    if (data.pdfs.length > 0) {
      data.pdfs.forEach((pdf, i) => {
        console.log(`      ${i+1}. ${pdf.name.substring(0, 50)}`);
      });
    }
    console.log(`   Imagen: ${data.productImage ? '✓ ' + data.productImage.substring(0, 70) + '...' : '✗'}`);
    
    return {
      partNumber,
      ...data,
      url
    };
    
  } catch (error) {
    console.error(`[${partNumber}] ✗ Error: ${error.message}`);
    return {
      partNumber,
      productCode: partNumber,
      error: error.message,
      url
    };
  }
}

async function main() {
  console.log('🚀 Iniciando scraping automatizado con Puppeteer...\n');
  
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080'
      ],
      dumpio: false
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Configurar timeouts más largos
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
    
    const results = [];
    
    for (let i = 0; i < productUrls.length; i++) {
      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`Producto ${i + 1}/${productUrls.length}`);
      
      const data = await scrapeProductData(page, productUrls[i]);
      results.push(data);
      
      // Pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    await browser.close();
    
    // Guardar resultados
    const outputPath = path.join(__dirname, 'auto-scraped-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    
    console.log(`\n\n✅ SCRAPING COMPLETADO!`);
    console.log(`📄 Archivo: ${outputPath}`);
    console.log(`📊 Total: ${results.length} productos\n`);
    
    // Mostrar tabla resumen
    console.log('📋 RESUMEN FINAL:');
    console.log('━'.repeat(100));
    console.log(`${'Part#'.padEnd(10)} | ${'Nombre Producto'.padEnd(25)} | ${'Part Type'.padEnd(30)} | ${'PDFs'.padEnd(5)}`);
    console.log('━'.repeat(100));
    results.forEach(r => {
      const name = r.productName || r.productCode || r.partNumber;
      const type = r.partType || 'N/A';
      const pdfCount = r.pdfs ? r.pdfs.length : 0;
      console.log(`${r.partNumber.padEnd(10)} | ${name.padEnd(25).substring(0, 25)} | ${type.substring(0, 30).padEnd(30)} | ${pdfCount}`);
    });
    console.log('━'.repeat(100));
    
  } catch (error) {
    console.error('\n❌ ERROR FATAL:', error.message);
    if (browser) await browser.close();
    process.exit(1);
  }
}

main().catch(console.error);
