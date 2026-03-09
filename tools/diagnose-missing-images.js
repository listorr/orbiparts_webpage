import puppeteer from 'puppeteer';
import fs from 'fs';

const productsToTest = [
  { partNumber: '51250', name: 'AEROSHELL555-QT', url: 'https://portal.skymart.aero/shop/part/51250' },
  { partNumber: '174674', name: 'ASF41-QT', url: 'https://portal.skymart.aero/shop/part/174674' },
  { partNumber: '175650', name: '7-CTG', url: 'https://portal.skymart.aero/shop/part/175650' },
  { partNumber: '190941', name: 'ASF31-GL', url: 'https://portal.skymart.aero/shop/part/190941' }
];

async function diagnoseProduct(page, product) {
  console.log(`\n${'━'.repeat(70)}`);
  console.log(`🔍 DIAGNOSTICANDO: ${product.name} (${product.partNumber})`);
  console.log(`   URL: ${product.url}`);
  console.log(`${'━'.repeat(70)}\n`);
  
  try {
    await page.goto(product.url, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForSelector('.q-card', { timeout: 10000 });
    
    const imageAnalysis = await page.evaluate(() => {
      const allImages = Array.from(document.querySelectorAll('img'));
      
      return {
        totalImages: allImages.length,
        images: allImages.map(img => ({
          src: img.src || img.getAttribute('src') || 'N/A',
          alt: img.alt || 'N/A',
          width: img.width || img.naturalWidth || 0,
          height: img.height || img.naturalHeight || 0,
          className: img.className || 'N/A',
          hasLogo: (img.src || '').toLowerCase().includes('logo'),
          hasIcon: (img.src || '').toLowerCase().includes('icon'),
          hasProduct: (img.src || '').toLowerCase().includes('product'),
          hasSkymart: (img.src || '').toLowerCase().includes('skymart'),
          hasDocServ: (img.src || '').toLowerCase().includes('docserv'),
        }))
      };
    });
    
    console.log(`📊 Total imágenes encontradas: ${imageAnalysis.totalImages}\n`);
    
    // Filtrar y mostrar imágenes relevantes
    const validImages = imageAnalysis.images.filter(img => 
      !img.hasLogo && 
      !img.hasIcon && 
      (img.width > 50 || img.height > 50)
    );
    
    console.log(`✅ Imágenes potencialmente válidas: ${validImages.length}\n`);
    
    if (validImages.length > 0) {
      console.log('📷 IMÁGENES DETECTADAS:\n');
      validImages.forEach((img, i) => {
        console.log(`   ${i + 1}. ${img.src.substring(0, 80)}...`);
        console.log(`      • Dimensiones: ${img.width}x${img.height}px`);
        console.log(`      • Alt: ${img.alt}`);
        console.log(`      • ClassName: ${img.className}`);
        console.log(`      • En SkyMart: ${img.hasSkymart ? 'SÍ' : 'NO'}`);
        console.log(`      • En DocServ: ${img.hasDocServ ? 'SÍ' : 'NO'}`);
        console.log('');
      });
    } else {
      console.log('❌ NO SE ENCONTRARON IMÁGENES VÁLIDAS\n');
      
      // Mostrar TODAS las imágenes para debugging
      console.log('🔍 TODAS LAS IMÁGENES (incluyendo logos/iconos):\n');
      imageAnalysis.images.forEach((img, i) => {
        console.log(`   ${i + 1}. ${img.src.substring(0, 60)}...`);
        console.log(`      • ${img.width}x${img.height}px | Logo: ${img.hasLogo} | Icon: ${img.hasIcon}`);
      });
    }
    
    // Buscar elementos con background-image
    const backgroundImages = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const withBg = elements
        .filter(el => {
          const bg = window.getComputedStyle(el).backgroundImage;
          return bg && bg !== 'none' && bg.includes('url');
        })
        .map(el => ({
          tag: el.tagName,
          className: el.className || 'N/A',
          backgroundImage: window.getComputedStyle(el).backgroundImage
        }));
      return withBg;
    });
    
    if (backgroundImages.length > 0) {
      console.log(`\n🎨 Elementos con background-image: ${backgroundImages.length}`);
      backgroundImages.slice(0, 3).forEach((el, i) => {
        console.log(`   ${i + 1}. <${el.tag}> ${el.backgroundImage.substring(0, 60)}...`);
      });
    }
    
  } catch (error) {
    console.error(`❌ ERROR: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 INICIANDO DIAGNÓSTICO DE IMÁGENES FALTANTES\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--user-data-dir=/tmp/chrome-diagnose-' + Date.now()
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  for (const product of productsToTest) {
    await diagnoseProduct(page, product);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  await browser.close();
  
  console.log('\n✅ DIAGNÓSTICO COMPLETADO\n');
}

main().catch(console.error);
