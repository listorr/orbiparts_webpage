import puppeteer from 'puppeteer';

async function testAlternatives() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('📥 Cargando página de prueba...');
  await page.goto('https://portal.skymart.aero/shop/part/37935', {
    waitUntil: 'networkidle0',
    timeout: 60000
  });
  
  await page.waitForSelector('.q-card', { timeout: 10000 });
  console.log('✓ Página cargada\n');
  
  // Buscar TODO el HTML relacionado con alternativos
  const pageContent = await page.evaluate(() => {
    // Extraer todo el HTML
    const fullHTML = document.body.innerHTML;
    
    // Buscar secciones específicas
    const results = {
      fullText: document.body.innerText,
      hasAlternateKeyword: document.body.innerText.includes('Alternate'),
      hasEquivalentKeyword: document.body.innerText.includes('Equivalent'),
      
      // Buscar divs que contengan "alternate" en clase o ID
      alternativeSections: [],
      allCards: []
    };
    
    // Buscar elementos con "alternate" en clase o contenido
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const className = el.className || '';
      const id = el.id || '';
      const text = el.textContent || '';
      
      if (className.toLowerCase().includes('alternate') || 
          id.toLowerCase().includes('alternate') ||
          text.includes('Alternates') ||
          text.includes('Alternative Products')) {
        results.alternativeSections.push({
          tag: el.tagName,
          className: className,
          id: id,
          innerHTML: el.innerHTML.substring(0, 500)
        });
      }
    });
    
    // Obtener todas las cards
    const cards = document.querySelectorAll('.q-card');
    cards.forEach((card, i) => {
      results.allCards.push({
        index: i,
        text: card.textContent.substring(0, 200),
        hasAlternate: card.textContent.includes('Alternate')
      });
    });
    
    return results;
  });
  
  console.log('🔍 ANÁLISIS DE PRODUCTOS ALTERNATIVOS:\n');
  console.log('Has "Alternate" keyword:', pageContent.hasAlternateKeyword);
  console.log('Has "Equivalent" keyword:', pageContent.hasEquivalentKeyword);
  console.log('Alternative sections found:', pageContent.alternativeSections.length);
  console.log('Total cards:', pageContent.allCards.length);
  
  console.log('\n📄 SECCIONES CON "ALTERNATE":');
  pageContent.alternativeSections.forEach((section, i) => {
    console.log(`\n  ${i+1}. ${section.tag} (class: ${section.className})`);
    console.log(`     HTML: ${section.innerHTML.substring(0, 200)}...`);
  });
  
  console.log('\n🃏 CARDS ENCONTRADAS:');
  pageContent.allCards.forEach(card => {
    if (card.hasAlternate) {
      console.log(`\n  Card #${card.index} (contiene "Alternate"):`);
      console.log(`     ${card.text}`);
    }
  });
  
  // Buscar en el texto completo
  const lines = pageContent.fullText.split('\n');
  console.log('\n📝 LÍNEAS CON "ALTERNATE":');
  lines.forEach((line, i) => {
    if (line.toLowerCase().includes('alternate')) {
      console.log(`  Línea ${i}: ${line.trim()}`);
    }
  });
  
  await browser.close();
  console.log('\n✅ Análisis completado');
}

testAlternatives().catch(console.error);
