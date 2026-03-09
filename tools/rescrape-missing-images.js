import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Productos que necesitan re-scrapear imágenes
const productsToRescrape = [
  { partNumber: '19149', url: 'https://portal.skymart.aero/shop/part/19149' },
  { partNumber: '23969', url: 'https://portal.skymart.aero/shop/part/23969' },
  { partNumber: '54365', url: 'https://portal.skymart.aero/shop/part/54365' },
  { partNumber: '21610', url: 'https://portal.skymart.aero/shop/part/21610' },
  { partNumber: '124734', url: 'https://portal.skymart.aero/shop/part/124734' },
  { partNumber: '35519', url: 'https://portal.skymart.aero/shop/part/35519' },
  { partNumber: '19104', url: 'https://portal.skymart.aero/shop/part/19104' },
  { partNumber: '73937', url: 'https://portal.skymart.aero/shop/part/73937' },
  { partNumber: '188791', url: 'https://portal.skymart.aero/shop/part/188791' },
  { partNumber: '190814', url: 'https://portal.skymart.aero/shop/part/190814' },
  { partNumber: '175168', url: 'https://portal.skymart.aero/shop/part/175168' },
  { partNumber: '18987', url: 'https://portal.skymart.aero/shop/part/18987' },
  { partNumber: '173688', url: 'https://portal.skymart.aero/shop/part/173688' },
  { partNumber: '19883', url: 'https://portal.skymart.aero/shop/part/19883' },
  { partNumber: '175650', url: 'https://portal.skymart.aero/shop/part/175650' },
  { partNumber: '71895', url: 'https://portal.skymart.aero/shop/part/71895' },
  { partNumber: '51250', url: 'https://portal.skymart.aero/shop/part/51250' },
  { partNumber: '171527', url: 'https://portal.skymart.aero/shop/part/171527' },
  { partNumber: '189141', url: 'https://portal.skymart.aero/shop/part/189141' },
  { partNumber: '166178', url: 'https://portal.skymart.aero/shop/part/166178' },
  { partNumber: '190941', url: 'https://portal.skymart.aero/shop/part/190941' },
  { partNumber: '129235', url: 'https://portal.skymart.aero/shop/part/129235' },
  { partNumber: '174674', url: 'https://portal.skymart.aero/shop/part/174674' },
  { partNumber: '194045', url: 'https://portal.skymart.aero/shop/part/194045' },
  { partNumber: '194037', url: 'https://portal.skymart.aero/shop/part/194037' }
];

const downloadImage = (url, filepath) => {
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
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function rescrapeImages() {
  console.log('🔄 Re-scrapeando imágenes de productos...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--user-data-dir=/tmp/chrome-rescrape-' + Date.now()
    ]
  });

  for (let i = 0; i < productsToRescrape.length; i++) {
    const { partNumber, url } = productsToRescrape[i];
    
    try {
      console.log(`[${i + 1}/${productsToRescrape.length}] ${partNumber}...`);
      
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(60000);
      
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(3000);
      
      // Extraer la URL de la imagen del producto
      const imageUrl = await page.evaluate(() => {
        // Buscar imágenes del producto
        const images = Array.from(document.querySelectorAll('img'));
        
        // Filtrar imágenes que parecen ser del producto (no logos, iconos, etc)
        const productImages = images.filter(img => {
          const src = img.src || '';
          const alt = img.alt || '';
          
          // Excluir logos y iconos pequeños
          if (img.width < 50 || img.height < 50) return false;
          if (src.includes('logo') || src.includes('icon')) return false;
          
          // Buscar imágenes que probablemente sean del producto
          return src.includes('docServ') || src.includes('.png') || src.includes('.jpg');
        });
        
        if (productImages.length > 0) {
          // Ordenar por tamaño (más grande = más probable que sea la imagen principal)
          productImages.sort((a, b) => (b.width * b.height) - (a.width * a.height));
          return productImages[0].src;
        }
        
        return null;
      });
      
      if (imageUrl) {
        console.log(`   📷 URL encontrada: ${imageUrl.substring(0, 60)}...`);
        
        // Descargar a public/images/lubricants
        const publicImagePath = path.join(__dirname, '..', 'public', 'images', 'lubricants', `${partNumber}.png`);
        
        try {
          const size = await downloadImage(imageUrl, publicImagePath);
          console.log(`   ✅ Descargada: ${(size / 1024).toFixed(1)} KB`);
        } catch (downloadError) {
          console.log(`   ⚠️  Error descargando: ${downloadError.message}`);
        }
      } else {
        console.log(`   ⚠️  No se encontró imagen en la página`);
      }
      
      await page.close().catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`);
    }
  }

  await browser.close();
  
  console.log('\n✅ Re-scraping completado!');
  console.log('\n📊 Verificando tamaños:');
  
  productsToRescrape.forEach(({ partNumber }) => {
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'lubricants', `${partNumber}.png`);
    if (fs.existsSync(imagePath)) {
      const stats = fs.statSync(imagePath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      const status = stats.size > 5000 ? '✅' : '⚠️';
      console.log(`   ${status} ${partNumber}.png: ${sizeKB} KB`);
    } else {
      console.log(`   ❌ ${partNumber}.png: NO EXISTE`);
    }
  });
}

rescrapeImages().catch(console.error);
