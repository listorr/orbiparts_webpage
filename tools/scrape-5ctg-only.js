import puppeteer from 'puppeteer';
import fs from 'fs';

async function scrape5CTG() {
  console.log('🔍 Scraping SOLO para 5-CTG (part 73937)...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const url = 'https://portal.skymart.aero/shop/part/73937'; // 5-CTG
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('.q-card', { timeout: 10000 });
  await page.waitForTimeout(3000);
  
  const data = await page.evaluate(() => {
    const getTextContent = (label) => {
      const elements = Array.from(document.querySelectorAll('.prop.text-bold'));
      const labelElement = elements.find(el => {
        const text = el.textContent.trim();
        return text === label || text === label + ':' || text.replace(':', '') === label || text.replace(':', '').trim() === label;
      });
      
      if (labelElement) {
        const nextDiv = labelElement.nextElementSibling;
        if (nextDiv && nextDiv.classList.contains('prop')) {
          return nextDiv.textContent.trim();
        }
      }
      return '';
    };
    
    let productName = '';
    const h6Element = document.querySelector('.text-h6');
    if (h6Element) {
      productName = h6Element.textContent.trim();
    }
    
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
    
    let productImage = '';
    
    // MÉTODO 1: Buscar imagen con clase imgZoom
    const imgZoom = document.querySelector('img.imgZoom');
    if (imgZoom) {
      productImage = imgZoom.getAttribute('full') || imgZoom.getAttribute('src') || imgZoom.src || '';
    }
    
    // MÉTODO 2: Buscar con data-v-*
    if (!productImage) {
      const vueImages = document.querySelectorAll('img[data-v-06d2a61c]');
      for (let img of vueImages) {
        const fullUrl = img.getAttribute('full');
        const src = img.getAttribute('src') || img.src || '';
        
        if (fullUrl || (src && src.includes('.PNG'))) {
          productImage = fullUrl || src;
          break;
        }
      }
    }
    
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
      ...specifications
    };
  });
  
  await browser.close();
  
  const result = {
    partNumber: '73937',
    ...data,
    url
  };
  
  console.log('━'.repeat(80));
  console.log('📦 DATOS CAPTURADOS:');
  console.log('━'.repeat(80));
  console.log(JSON.stringify(result, null, 2));
  console.log('━'.repeat(80));
  
  fs.writeFileSync('./tools/5ctg-test-result.json', JSON.stringify(result, null, 2));
  console.log('\n✅ Guardado en: ./tools/5ctg-test-result.json\n');
}

scrape5CTG().catch(console.error);
