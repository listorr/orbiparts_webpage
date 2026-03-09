import puppeteer from 'puppeteer';
import fs from 'fs';

async function testSingleAlternate() {
  console.log('🚀 Testing alternate extraction...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Test con un producto conocido
  const testUrl = 'https://portal.skymart.aero/shop/part/79614'; // 2197-QT
  console.log(`📥 Cargando: ${testUrl}\n`);
  
  await page.goto(testUrl, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('.q-card', { timeout: 10000 });
  
  console.log('✓ Página cargada\n');
  console.log('🔍 Buscando botón "Show Alternates"...\n');
  
  // Esperar un poco para asegurar que todo esté cargado
  await page.waitForTimeout(2000);
  
  // Buscar y hacer clic en "Show Alternates"
  const alternates = await page.evaluate(() => {
    // Buscar el botón o enlace de Show Alternates
    const buttons = Array.from(document.querySelectorAll('button, a, div[role="button"]'));
    const showAltButton = buttons.find(btn => 
      btn.textContent.includes('Show Alternates') || 
      btn.textContent.includes('Alternates')
    );
    
    if (showAltButton) {
      showAltButton.click();
      return 'clicked';
    }
    return 'not_found';
  });
  
  console.log(`Botón status: ${alternates}\n`);
  
  if (alternates === 'clicked') {
    // Esperar a que aparezca el contenido de alternates
    await page.waitForTimeout(3000);
    
    // Capturar screenshot para debug
    await page.screenshot({ path: '/tmp/alternates-modal.png' });
    console.log('📸 Screenshot guardado en /tmp/alternates-modal.png\n');
    
    // Extraer datos de alternates
    const alternateData = await page.evaluate(() => {
      const results = [];
      
      // Buscar todos los elementos que puedan contener alternates
      const allDivs = document.querySelectorAll('div[class*="q-"], div[data-v-5fd02a3f]');
      
      allDivs.forEach(div => {
        const text = div.textContent;
        
        // Buscar patrones de manufactureros conocidos
        if (text.includes('EXXONMOBIL') || text.includes('AEROSHELL') || text.includes('ROYCO')) {
          const manufacturer = text.includes('EXXONMOBIL') ? 'EXXONMOBIL' :
                             text.includes('AEROSHELL') ? 'AEROSHELL' : 'ROYCO';
          
          // Buscar el part number (generalmente está antes o después del manufacturero)
          const lines = text.split('\\n').filter(l => l.trim());
          lines.forEach(line => {
            const trimmed = line.trim();
            // Part numbers suelen ser alfanuméricos con guiones
            if (/^[A-Z0-9\-]{3,20}$/i.test(trimmed) && 
                !trimmed.includes('MIL') && 
                !trimmed.includes('TURB') &&
                !trimmed.includes('SYNTHETIC')) {
              results.push({
                partNumber: trimmed,
                manufacturer: manufacturer,
                description: text.substring(0, 100)
              });
            }
          });
        }
      });
      
      // También buscar en la estructura del modal específico
      const modal = document.querySelector('[role="dialog"], .q-dialog');
      if (modal) {
        const modalText = modal.innerText;
        const modalLines = modalText.split('\\n');
        
        let currentManufacturer = '';
        let currentPartNumber = '';
        
        modalLines.forEach(line => {
          const trimmed = line.trim();
          
          if (trimmed.includes('EXXONMOBIL') || trimmed.includes('AEROSHELL') || trimmed.includes('ROYCO')) {
            currentManufacturer = trimmed.includes('EXXONMOBIL') ? 'EXXONMOBIL' :
                                 trimmed.includes('AEROSHELL') ? 'AEROSHELL' : 'ROYCO';
          }
          
          if (/^[A-Z0-9\-]{3,20}$/i.test(trimmed) && !trimmed.includes('MIL')) {
            if (currentManufacturer) {
              results.push({
                partNumber: trimmed,
                manufacturer: currentManufacturer
              });
              currentManufacturer = '';
            }
          }
        });
      }
      
      // Eliminar duplicados
      const unique = [];
      results.forEach(item => {
        if (!unique.find(u => u.partNumber === item.partNumber)) {
          unique.push(item);
        }
      });
      
      return unique;
    });
    
    console.log('📋 ALTERNATES ENCONTRADOS:\n');
    alternateData.forEach((alt, i) => {
      console.log(`  ${i+1}. ${alt.partNumber} (${alt.manufacturer})`);
      if (alt.description) {
        console.log(`     ${alt.description.substring(0, 80)}...`);
      }
    });
    console.log(`\n✅ Total: ${alternateData.length} alternates`);
    
    // Guardar resultado
    fs.writeFileSync('/tmp/test-alternates.json', JSON.stringify(alternateData, null, 2));
    console.log('\n💾 Datos guardados en /tmp/test-alternates.json');
  }
  
  await browser.close();
}

testSingleAlternate().catch(console.error);
