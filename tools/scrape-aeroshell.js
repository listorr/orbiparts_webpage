import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aeroshellUrls = [
  'https://portal.skymart.aero/shop/part/29616',
  'https://portal.skymart.aero/shop/part/39603',
  'https://portal.skymart.aero/shop/part/19185',
  'https://portal.skymart.aero/shop/part/19150',
  'https://portal.skymart.aero/shop/part/19149',
  'https://portal.skymart.aero/shop/part/23969',
  'https://portal.skymart.aero/shop/part/22646',
  'https://portal.skymart.aero/shop/part/54365',
  'https://portal.skymart.aero/shop/part/8921',
  'https://portal.skymart.aero/shop/part/34779',
  'https://portal.skymart.aero/shop/part/21610',
  'https://portal.skymart.aero/shop/part/124734',
  'https://portal.skymart.aero/shop/part/201366',
  'https://portal.skymart.aero/shop/part/28091',
  'https://portal.skymart.aero/shop/part/35519',
  'https://portal.skymart.aero/shop/part/9300',
  'https://portal.skymart.aero/shop/part/19104',
  'https://portal.skymart.aero/shop/part/204829',
  'https://portal.skymart.aero/shop/part/73937',
  'https://portal.skymart.aero/shop/part/1805',
  'https://portal.skymart.aero/shop/part/188792',
  'https://portal.skymart.aero/shop/part/188791',
  'https://portal.skymart.aero/shop/part/190814',
  'https://portal.skymart.aero/shop/part/175168',
  'https://portal.skymart.aero/shop/part/18987',
  'https://portal.skymart.aero/shop/part/173688',
  'https://portal.skymart.aero/shop/part/10210',
  'https://portal.skymart.aero/shop/part/19883',
  'https://portal.skymart.aero/shop/part/175650',
  'https://portal.skymart.aero/shop/part/169450',
  'https://portal.skymart.aero/shop/part/42603',
  'https://portal.skymart.aero/shop/part/38143',
  'https://portal.skymart.aero/shop/part/71895',
  'https://portal.skymart.aero/shop/part/51250',
  'https://portal.skymart.aero/shop/part/171527',
  'https://portal.skymart.aero/shop/part/189141',
  'https://portal.skymart.aero/shop/part/37657',
  'https://portal.skymart.aero/shop/part/194795',
  'https://portal.skymart.aero/shop/part/166178',
  'https://portal.skymart.aero/shop/part/190941',
  'https://portal.skymart.aero/shop/part/23664',
  'https://portal.skymart.aero/shop/part/129235',
  'https://portal.skymart.aero/shop/part/174674',
  'https://portal.skymart.aero/shop/part/200745',
  'https://portal.skymart.aero/shop/part/194045',
  'https://portal.skymart.aero/shop/part/23509',
  'https://portal.skymart.aero/shop/part/194240',
  'https://portal.skymart.aero/shop/part/35651',
  'https://portal.skymart.aero/shop/part/194037',
  'https://portal.skymart.aero/shop/part/196894'
];

async function scrapeProductData(page, url) {
  const partNumber = url.split('/').pop();
  console.log(`\n[${partNumber}] Cargando página...`);
  
  try {
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    });
    
    await page.waitForSelector('.q-card', { timeout: 10000 });
    console.log(`[${partNumber}] ✓ Página cargada`);
    
    // Esperar a que las imágenes dinámicas de Vue se carguen
    await page.waitForTimeout(3000);
    console.log(`[${partNumber}] ⏳ Esperando carga dinámica de imágenes...`);
    
    // Extraer datos del DOM
    const data = await page.evaluate(() => {
      const getTextContent = (label) => {
        const elements = Array.from(document.querySelectorAll('.prop.text-bold'));
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
      
      // Extraer el nombre del producto
      let productName = '';
      const h6Element = document.querySelector('.text-h6');
      if (h6Element) {
        productName = h6Element.textContent.trim();
      }
      
      // Extraer la descripción
      let description = '';
      if (h6Element) {
        const nextElement = h6Element.nextElementSibling;
        if (nextElement && nextElement.classList.contains('q-ml-sm')) {
          description = nextElement.textContent.trim();
          if (description.includes('shopping_cart')) {
            description = '';
          }
        }
      }
      
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
      
      // MÉTODO 1: Buscar imagen con clase imgZoom (las imágenes dinámicas de Vue)
      const imgZoom = document.querySelector('img.imgZoom');
      if (imgZoom) {
        // Priorizar el atributo 'full' que contiene la imagen en tamaño completo
        productImage = imgZoom.getAttribute('full') || imgZoom.getAttribute('src') || imgZoom.src || '';
        console.log('🎯 Imagen encontrada con clase imgZoom');
      }
      
      // MÉTODO 2: Si no encontramos con imgZoom, buscar en imágenes con data-v-* (Vue.js)
      if (!productImage) {
        const allImages = document.querySelectorAll('img[data-v-06d2a61c], img[class*="imgZoom"]');
        for (let img of allImages) {
          const fullUrl = img.getAttribute('full');
          const src = img.getAttribute('src') || img.src || '';
          
          if (fullUrl || (src && (src.includes('.png') || src.includes('.jpg') || src.includes('.PNG') || src.includes('.JPG')))) {
            productImage = fullUrl || src;
            console.log('🎯 Imagen encontrada con atributo Vue.js');
            break;
          }
        }
      }
      
      // MÉTODO 3: Buscar imágenes tradicionales (método anterior)
      if (!productImage) {
        const allImages = document.querySelectorAll('img');
        for (let img of allImages) {
          const src = img.getAttribute('src') || img.src || '';
          const alt = img.getAttribute('alt') || '';
          
          // Buscar imágenes que:
          // 1. Sean PNG o JPG
          // 2. NO sean logos o iconos
          // 3. Tengan un tamaño razonable (width/height > 100px)
          const width = img.width || img.naturalWidth || 0;
          const height = img.height || img.naturalHeight || 0;
          
          if (src && 
              (src.includes('.png') || src.includes('.jpg') || src.includes('.jpeg') || src.includes('.PNG') || src.includes('.JPG')) && 
              !src.includes('logo') && 
              !src.includes('icon') &&
              !alt.toLowerCase().includes('logo') &&
              (width > 100 || height > 100 || width === 0)) {
            productImage = src;
            console.log('🎯 Imagen encontrada con método tradicional');
            break;
          }
        }
      }
      
      // MÉTODO 4: Si no encontramos imagen, buscar cualquier imagen grande
      if (!productImage) {
        const allImagesLarge = document.querySelectorAll('img');
        for (let img of allImagesLarge) {
          const src = img.getAttribute('src') || img.src || '';
          if (src && (src.includes('.png') || src.includes('.jpg') || src.includes('.PNG') || src.includes('.JPG'))) {
            const width = img.width || img.naturalWidth || 0;
            const height = img.height || img.naturalHeight || 0;
            if (width > 150 || height > 150) {
              productImage = src;
              console.log('🎯 Imagen encontrada con método alternativo (>150px)');
              break;
            }
          }
        }
      }
      
      // Extraer PDFs
      const pdfs = [];
      const allLinks = document.querySelectorAll('a');
      allLinks.forEach(link => {
        const href = link.href;
        if (href && (href.includes('.pdf') || href.includes('.PDF'))) {
          let name = link.textContent.trim();
          
          if (!name || name.length < 3) {
            const parent = link.closest('[class*="col"]');
            if (parent) {
              name = parent.textContent.trim().split('\n')[0];
            }
          }
          
          name = name.replace(/\s+/g, ' ').trim();
          
          if (!pdfs.find(p => p.url === href)) {
            pdfs.push({
              url: href,
              name: name || 'Document'
            });
          }
        }
      });
      
      // Extraer especificaciones
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
      
      return {
        productName: productName,
        description: description,
        productImage: productImage,
        pdfs: pdfs,
        ...specifications
      };
    });
    
    console.log(`[${partNumber}] ✓ Datos extraídos:`);
    console.log(`   Nombre: ${data.productName}`);
    console.log(`   Imagen: ${data.productImage ? '✓ SI' : '✗ NO'}`);
    if (data.productImage) {
      console.log(`   URL Imagen: ${data.productImage}`);
    }
    console.log(`   Manufacturer: ${data.manufacturer}`);
    console.log(`   Part Type: ${data.partType}`);
    console.log(`   Units: ${data.units}`);
    console.log(`   PDFs: ${data.pdfs.length} archivos`);
    
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
  console.log('🚀 Iniciando scraping de productos AEROSHELL...\n');
  console.log(`📊 Total de productos: ${aeroshellUrls.length}\n`);
  
  let browser;
  try {
    console.log('🔧 Lanzando navegador...');
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--user-data-dir=/tmp/chrome-aeroshell-' + Date.now()
      ],
      dumpio: false,
      timeout: 60000,
      protocolTimeout: 60000
    });
    console.log('✓ Navegador lanzado exitosamente');
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
    
    const results = [];
    
    for (let i = 0; i < aeroshellUrls.length; i++) {
      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`Producto ${i + 1}/${aeroshellUrls.length}`);
      
      const data = await scrapeProductData(page, aeroshellUrls[i]);
      results.push(data);
      
      // Pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    await browser.close();
    
    // Guardar resultados
    const outputPath = path.join(__dirname, 'aeroshell-scraped-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    
    console.log(`\n\n✅ SCRAPING COMPLETADO!`);
    console.log(`📄 Archivo: ${outputPath}`);
    console.log(`📊 Total: ${results.length} productos\n`);
    
    // Mostrar tabla resumen
    console.log('📋 RESUMEN FINAL:');
    console.log('━'.repeat(100));
    console.log(`${'Part#'.padEnd(10)} | ${'Nombre Producto'.padEnd(25)} | ${'Manufacturer'.padEnd(15)} | ${'PDFs'.padEnd(5)}`);
    console.log('━'.repeat(100));
    results.forEach(r => {
      const name = r.productName || r.productCode || r.partNumber;
      const manufacturer = r.manufacturer || 'N/A';
      const pdfCount = r.pdfs ? r.pdfs.length : 0;
      console.log(`${r.partNumber.padEnd(10)} | ${name.padEnd(25).substring(0, 25)} | ${manufacturer.substring(0, 15).padEnd(15)} | ${pdfCount}`);
    });
    console.log('━'.repeat(100));
    
  } catch (error) {
    console.error('\n❌ ERROR FATAL:', error.message);
    if (browser) await browser.close();
    process.exit(1);
  }
}

main().catch(console.error);
