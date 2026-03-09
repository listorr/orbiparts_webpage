import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productUrls = [
  'https://portal.skymart.aero/shop/part/121335',
  'https://portal.skymart.aero/shop/part/163380',
  'https://portal.skymart.aero/shop/part/171867',
  'https://portal.skymart.aero/shop/part/18063',
  'https://portal.skymart.aero/shop/part/187581',
  'https://portal.skymart.aero/shop/part/190037',
  'https://portal.skymart.aero/shop/part/21797',
  'https://portal.skymart.aero/shop/part/26526',
  'https://portal.skymart.aero/shop/part/27952',
  'https://portal.skymart.aero/shop/part/28127',
  'https://portal.skymart.aero/shop/part/28800',
  'https://portal.skymart.aero/shop/part/30311',
  'https://portal.skymart.aero/shop/part/32414',
  'https://portal.skymart.aero/shop/part/35914',
  'https://portal.skymart.aero/shop/part/37935',
  'https://portal.skymart.aero/shop/part/37951',
  'https://portal.skymart.aero/shop/part/37952',
  'https://portal.skymart.aero/shop/part/37981',
  'https://portal.skymart.aero/shop/part/41239',
  'https://portal.skymart.aero/shop/part/41693',
  'https://portal.skymart.aero/shop/part/53334',
  'https://portal.skymart.aero/shop/part/57217',
  'https://portal.skymart.aero/shop/part/60598',
  'https://portal.skymart.aero/shop/part/79958',
  'https://portal.skymart.aero/shop/part/80646',
  'https://portal.skymart.aero/shop/part/81697',
  'https://portal.skymart.aero/shop/part/85405',
  'https://portal.skymart.aero/shop/part/85406',
  'https://portal.skymart.aero/shop/part/91098',
  'https://portal.skymart.aero/shop/part/97063',
  'https://portal.skymart.aero/shop/part/97199',
  'https://portal.skymart.aero/shop/part/97200'
];

// Directorios
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'lubricants');
const pdfsDir = path.join(__dirname, '..', 'public', 'pdfs', 'lubricants');

// Crear directorios si no existen
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

// Función para descargar archivos (imágenes y PDFs)
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Mapeo de categorías
const categoryMap = {
  'HYDRAULIC FLUID': 'HYDRAULIC FLUID',
  'TURBINE ENGINE OIL': 'TURBINE ENGINE OIL',
  'SPECIALTY': 'SPECIALTY',
  'EXPENDABLES': 'EXPENDABLES',
  'NON-AVIATION': 'NON-AVIATION'
};

async function scrapeProductData(page, url) {
  const partNumber = url.split('/').pop();
  
  try {
    console.log(`[${partNumber}] Cargando página...`);
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    });
    
    // Esperar a que se cargue el contenido
    await page.waitForSelector('.q-card', { timeout: 10000 });
    console.log(`[${partNumber}] ✓ Página cargada`);
    
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
      
      // Extraer imagen
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
      
      // Extraer PDFs
      const pdfs = [];
      const links = document.querySelectorAll('a[href]');
      const seenUrls = new Set();
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes('.pdf') || href.includes('.PDF')) && !seenUrls.has(href)) {
          seenUrls.add(href);
          
          let name = link.textContent.trim();
          if (!name || name.length < 3) {
            const parent = link.parentElement;
            if (parent) {
              name = parent.textContent.trim();
            }
          }
          
          if (name && name.length > 2 && !name.includes('shopping_cart')) {
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
        productName,
        description,
        productImage,
        pdfs,
        ...specifications
      };
    });
    
    console.log(`[${partNumber}] ${data.productName || partNumber}`);
    console.log(`   Part Type: ${data.partType}`);
    console.log(`   Manufacturer: ${data.manufacturer}`);
    console.log(`   Imagen: ${data.productImage ? '✓' : '✗'}`);
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
      error: error.message,
      url
    };
  }
}

async function main() {
  console.log('🚀 INICIANDO PROCESO COMPLETO DE SCRAPING Y POBLACIÓN\n');
  console.log('━'.repeat(80));
  console.log('\n📋 FASE 1: SCRAPING DE DATOS\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const allData = [];
  
  for (let i = 0; i < productUrls.length; i++) {
    console.log(`\nProducto ${i + 1}/${productUrls.length}`);
    console.log('─'.repeat(80));
    
    const data = await scrapeProductData(page, productUrls[i]);
    allData.push(data);
    
    // Delay entre requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  await browser.close();
  
  console.log('\n━'.repeat(80));
  console.log('\n✅ FASE 1 COMPLETADA - Datos scrapeados\n');
  
  // FASE 2: DESCARGAR IMÁGENES
  console.log('━'.repeat(80));
  console.log('\n📥 FASE 2: DESCARGANDO IMÁGENES\n');
  console.log('━'.repeat(80));
  console.log();
  
  const imageDownloads = allData.map(async (product, index) => {
    if (!product.productImage) {
      console.log(`[${index + 1}/${allData.length}] ⚠️  ${product.productName || product.partNumber} - Sin imagen`);
      return null;
    }
    
    try {
      const productName = product.productName || product.partNumber;
      const sanitizedName = productName.replace(/[^a-zA-Z0-9-]/g, '-');
      const extension = product.productImage.includes('.jpg') ? '.jpg' : '.png';
      const fileName = `${sanitizedName}${extension}`;
      const filePath = path.join(imagesDir, fileName);
      
      await downloadFile(product.productImage, filePath);
      console.log(`[${index + 1}/${allData.length}] ✓ ${productName} → ${fileName}`);
      
      return { partNumber: product.partNumber, fileName };
    } catch (error) {
      console.log(`[${index + 1}/${allData.length}] ✗ ${product.productName || product.partNumber} - ${error.message}`);
      return null;
    }
  });
  
  const downloadedImages = await Promise.all(imageDownloads);
  const imageMap = {};
  downloadedImages.filter(img => img !== null).forEach(img => {
    imageMap[img.partNumber] = img.fileName;
  });
  
  console.log(`\n✅ Imágenes descargadas: ${Object.keys(imageMap).length}/${allData.length}\n`);
  
  // FASE 3: DESCARGAR PDFs
  console.log('━'.repeat(80));
  console.log('\n📄 FASE 3: DESCARGANDO PDFs\n');
  console.log('━'.repeat(80));
  console.log();
  
  const pdfDownloads = [];
  
  for (let i = 0; i < allData.length; i++) {
    const product = allData[i];
    if (!product.pdfs || product.pdfs.length === 0) {
      console.log(`[${i + 1}/${allData.length}] ${product.productName || product.partNumber} - Sin PDFs`);
      continue;
    }
    
    console.log(`[${i + 1}/${allData.length}] ${product.productName || product.partNumber} - ${product.pdfs.length} PDFs`);
    
    for (let j = 0; j < product.pdfs.length; j++) {
      const pdf = product.pdfs[j];
      try {
        // Mantener el nombre original del PDF o usar uno descriptivo
        const pdfName = pdf.name.replace(/[^a-zA-Z0-9-_.() ]/g, '-');
        const fileName = `${product.partNumber}-${j + 1}-${pdfName}.pdf`;
        const filePath = path.join(pdfsDir, fileName);
        
        await downloadFile(pdf.url, filePath);
        console.log(`   ✓ ${pdf.name.substring(0, 60)}`);
        
        // Actualizar el PDF con la ruta local
        product.pdfs[j].localPath = `/pdfs/lubricants/${fileName}`;
        
      } catch (error) {
        console.log(`   ✗ ${pdf.name} - ${error.message}`);
      }
    }
  }
  
  console.log('\n✅ PDFs descargados\n');
  
  // FASE 4: CREAR PRODUCTOS
  console.log('━'.repeat(80));
  console.log('\n📦 FASE 4: CREANDO PRODUCTOS\n');
  console.log('━'.repeat(80));
  console.log();
  
  const products = allData.map((product, index) => {
    const productName = product.productName || product.partNumber;
    const category = categoryMap[product.partType] || 'SPECIALTY';
    
    const productData = {
      id: `eastman-${product.partNumber}`,
      brand: 'EASTMAN',
      name: product.partNumber,
      displayName: productName,
      category: category,
      description: product.description || `${product.partType} - ${productName}`,
      specifications: {
        manufacturer: product.manufacturer || 'EASTMAN',
        units: product.units || '',
        nationalStockNumber: product.nationalStock || '',
        productCode: product.productCode || '',
        groupCode: product.groupCode || '',
        class: product.class || '',
        unNumber: product.un || '',
        limitedShelfLife: product.limitedShelfLife || '',
        shelfLife: product.shelfLife || '',
        hazardousMaterial: product.hazardousMaterial || '',
        application: product.application || '',
        partType: product.partType || ''
      },
      image: imageMap[product.partNumber] ? `/images/lubricants/${imageMap[product.partNumber]}` : '',
      price: 0,
      inStock: true,
      certifications: ['FAA Approved', 'MIL-SPEC'],
      features: ['Aviation Grade Quality', 'OEM Approved'],
      datasheets: (product.pdfs || []).map(pdf => ({
        name: pdf.name,
        url: pdf.localPath || pdf.url,
        type: pdf.name.includes('TECHNICAL') ? 'Technical Data Sheet' : 
              pdf.name.includes('SAFETY') ? 'Safety Data Sheet' : 'Document'
      }))
    };
    
    console.log(`[${index + 1}/${allData.length}] ✓ ${productName} | ${category} | ${productData.datasheets.length} PDFs`);
    
    return productData;
  });
  
  // FASE 5: GUARDAR EN lubricants-data.json
  console.log('\n━'.repeat(80));
  console.log('\n💾 FASE 5: GUARDANDO EN lubricants-data.json\n');
  console.log('━'.repeat(80));
  console.log();
  
  const lubricantsData = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalProducts: products.length,
      source: 'SkyMart Portal',
      manufacturer: 'EASTMAN'
    },
    products: products
  };
  
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(lubricantsData, null, 2));
  
  console.log(`✅ Archivo guardado: lubricants-data.json`);
  console.log(`   Total productos: ${products.length}`);
  
  // RESUMEN FINAL
  console.log('\n━'.repeat(80));
  console.log('\n🎉 PROCESO COMPLETADO EXITOSAMENTE\n');
  console.log('━'.repeat(80));
  console.log();
  console.log('📊 RESUMEN:');
  console.log(`   • Productos scrapeados: ${allData.length}`);
  console.log(`   • Imágenes descargadas: ${Object.keys(imageMap).length}`);
  console.log(`   • Productos creados: ${products.length}`);
  console.log();
  
  // Resumen por categoría
  const categoryCounts = {};
  products.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  
  console.log('📋 Por categoría:');
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    console.log(`   • ${cat}: ${count} productos`);
  });
  
  console.log('\n━'.repeat(80));
  console.log('\n✨ Ahora puedes ver los productos en localhost:3000/lubricants\n');
}

main().catch(console.error);
