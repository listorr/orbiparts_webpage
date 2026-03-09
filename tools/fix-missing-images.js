import puppeteer from 'puppeteer';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsToFix = [
  { partNumber: '51250', name: 'AEROSHELL555-QT', url: 'https://portal.skymart.aero/shop/part/51250' },
  { partNumber: '174674', name: 'ASF41-QT', url: 'https://portal.skymart.aero/shop/part/174674' },
  { partNumber: '175650', name: '7-CTG', url: 'https://portal.skymart.aero/shop/part/175650' },
  { partNumber: '190941', name: 'ASF31-GL', url: 'https://portal.skymart.aero/shop/part/190941' }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const stats = fs.statSync(filepath);
          resolve(stats.size);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function fixMissingImages() {
  console.log('🔧 RECUPERANDO IMÁGENES FALTANTES\n');
  console.log('━'.repeat(70) + '\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--user-data-dir=/tmp/chrome-fix-' + Date.now()
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const results = [];
  
  for (const product of productsToFix) {
    console.log(`\n📦 ${product.name} (${product.partNumber})`);
    console.log(`   URL: ${product.url}`);
    
    try {
      await page.goto(product.url, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.waitForSelector('.q-card', { timeout: 10000 });
      
      // Buscar la mejor imagen (priorizando las que tienen clase imgZoom)
      const bestImage = await page.evaluate(() => {
        const allImages = Array.from(document.querySelectorAll('img'));
        
        // Filtrar: no logos, no iconos, tamaño > 50px
        const validImages = allImages.filter(img => {
          const src = img.src || '';
          const width = img.width || img.naturalWidth || 0;
          const height = img.height || img.naturalHeight || 0;
          
          return !src.toLowerCase().includes('logo') &&
                 !src.toLowerCase().includes('icon') &&
                 src.includes('skymart') &&
                 (width > 50 || height > 50);
        });
        
        // Priorizar imágenes con clase 'imgZoom' (son las principales)
        const zoomImages = validImages.filter(img => 
          img.className && img.className.includes('imgZoom')
        );
        
        const imagesToConsider = zoomImages.length > 0 ? zoomImages : validImages;
        
        if (imagesToConsider.length > 0) {
          // Ordenar por tamaño (área)
          imagesToConsider.sort((a, b) => {
            const areaA = (a.width || a.naturalWidth || 0) * (a.height || a.naturalHeight || 0);
            const areaB = (b.width || b.naturalWidth || 0) * (b.height || b.naturalHeight || 0);
            return areaB - areaA;
          });
          
          const img = imagesToConsider[0];
          return {
            src: img.src,
            width: img.width || img.naturalWidth || 0,
            height: img.height || img.naturalHeight || 0,
            className: img.className || 'N/A'
          };
        }
        
        return null;
      });
      
      if (bestImage) {
        console.log(`   ✅ Imagen encontrada: ${bestImage.width}x${bestImage.height}px`);
        console.log(`   📷 URL: ${bestImage.src.substring(0, 60)}...`);
        
        // Descargar imagen
        const imagePath = path.join(__dirname, '..', 'public', 'images', 'lubricants', `${product.name}.png`);
        
        try {
          const size = await downloadImage(bestImage.src, imagePath);
          console.log(`   💾 Descargada: ${(size / 1024).toFixed(1)} KB`);
          
          results.push({
            partNumber: product.partNumber,
            name: product.name,
            imageUrl: bestImage.src,
            imagePath: `/images/lubricants/${product.name}.png`,
            success: true
          });
        } catch (downloadError) {
          console.log(`   ⚠️  Error descargando: ${downloadError.message}`);
          results.push({
            partNumber: product.partNumber,
            name: product.name,
            success: false,
            error: downloadError.message
          });
        }
      } else {
        console.log(`   ❌ No se encontró imagen válida`);
        results.push({
          partNumber: product.partNumber,
          name: product.name,
          success: false,
          error: 'No image found'
        });
      }
      
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
      results.push({
        partNumber: product.partNumber,
        name: product.name,
        success: false,
        error: error.message
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  await browser.close();
  
  console.log('\n' + '━'.repeat(70));
  console.log('📊 RESUMEN');
  console.log('━'.repeat(70) + '\n');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Imágenes descargadas: ${successful.length}/${results.length}`);
  
  if (successful.length > 0) {
    console.log('\n📥 Descargadas exitosamente:');
    successful.forEach(r => {
      console.log(`   • ${r.name} → ${r.imagePath}`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Fallidas:');
    failed.forEach(r => {
      console.log(`   • ${r.name}: ${r.error}`);
    });
  }
  
  // Actualizar aeroshell-scraped-data.json
  if (successful.length > 0) {
    const scrapedDataPath = path.join(__dirname, 'aeroshell-scraped-data.json');
    const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf8'));
    
    successful.forEach(result => {
      const product = scrapedData.find(p => p.partNumber === result.partNumber);
      if (product) {
        product.productImage = result.imagePath;
      }
    });
    
    fs.writeFileSync(scrapedDataPath, JSON.stringify(scrapedData, null, 2));
    console.log(`\n💾 Actualizado: aeroshell-scraped-data.json`);
  }
  
  console.log('\n✨ Proceso completado!\n');
}

fixMissingImages().catch(console.error);
