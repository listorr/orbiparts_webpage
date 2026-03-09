import puppeteer from 'puppeteer';

async function test5CTG() {
  console.log('🧪 Probando extracción de imagen de 5-CTG...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new', // Headless mode
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1920,1080'
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const url = 'https://portal.skymart.aero/shop/part/29616'; // 5-CTG
  console.log(`📍 URL: ${url}\n`);
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('.q-card', { timeout: 10000 });
  console.log('✓ Página cargada\n');
  
  // Esperar a que Vue.js cargue las imágenes
  await page.waitForTimeout(3000);
  console.log('✓ Esperando carga dinámica...\n');
  
  const result = await page.evaluate(() => {
    let productImage = '';
    let method = '';
    
    // MÉTODO 1: Buscar imagen con clase imgZoom
    const imgZoom = document.querySelector('img.imgZoom');
    if (imgZoom) {
      productImage = imgZoom.getAttribute('full') || imgZoom.getAttribute('src') || imgZoom.src || '';
      method = 'imgZoom class';
    }
    
    // MÉTODO 2: Buscar con data-v-*
    if (!productImage) {
      const vueImages = document.querySelectorAll('img[data-v-06d2a61c]');
      for (let img of vueImages) {
        const fullUrl = img.getAttribute('full');
        const src = img.getAttribute('src') || img.src || '';
        
        if (fullUrl || (src && src.includes('.PNG'))) {
          productImage = fullUrl || src;
          method = 'Vue.js data-v attribute';
          break;
        }
      }
    }
    
    // Debug: Listar TODAS las imágenes
    const allImages = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.getAttribute('src') || img.src || '',
      full: img.getAttribute('full') || '',
      alt: img.getAttribute('alt') || '',
      classes: img.className,
      width: img.width || img.naturalWidth || 0,
      height: img.height || img.naturalHeight || 0,
      'data-v': img.getAttribute('data-v-06d2a61c') !== null
    }));
    
    return {
      productImage,
      method,
      allImages
    };
  });
  
  console.log('━'.repeat(80));
  console.log('📸 RESULTADO:');
  console.log('━'.repeat(80));
  if (result.productImage) {
    console.log(`✅ IMAGEN ENCONTRADA!`);
    console.log(`   Método: ${result.method}`);
    console.log(`   URL: ${result.productImage}\n`);
  } else {
    console.log(`❌ NO SE ENCONTRÓ IMAGEN\n`);
  }
  
  console.log('━'.repeat(80));
  console.log('🔍 TODAS LAS IMÁGENES EN LA PÁGINA:');
  console.log('━'.repeat(80));
  result.allImages.forEach((img, idx) => {
    console.log(`\n[${idx + 1}]`);
    console.log(`   src: ${img.src.substring(0, 80)}${img.src.length > 80 ? '...' : ''}`);
    console.log(`   full: ${img.full}`);
    console.log(`   alt: ${img.alt}`);
    console.log(`   classes: ${img.classes}`);
    console.log(`   size: ${img.width}x${img.height}`);
    console.log(`   Vue: ${img['data-v'] ? 'SI' : 'NO'}`);
  });
  
  console.log('\n\n✅ Test completado!');
  
  await browser.close();
}

test5CTG().catch(console.error);
