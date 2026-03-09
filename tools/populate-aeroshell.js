import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scrapedDataPath = path.join(__dirname, 'aeroshell-scraped-data.json');
const outputDataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'lubricants');
const pdfsDir = path.join(__dirname, '..', 'public', 'pdfs', 'lubricants');

// Crear directorios si no existen
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

// Función para descargar archivos
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Función para sanitizar nombres de archivo
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9\-_.]/gi, '-').replace(/-+/g, '-');
}

// Mapeo de categorías
function mapCategory(partType) {
  const typeUpper = (partType || '').toUpperCase();
  
  if (typeUpper.includes('TURBINE')) return 'TURBINE ENGINE OIL';
  if (typeUpper.includes('PISTON')) return 'PISTON ENGINE OIL';
  if (typeUpper.includes('HYDRAULIC')) return 'HYDRAULIC FLUID';
  if (typeUpper.includes('GREASE')) return 'GREASES';
  if (typeUpper.includes('FLUID')) return 'FLUIDS';
  if (typeUpper.includes('OIL')) return 'OILS';
  
  return 'SPECIALTY';
}

async function main() {
  console.log('🚀 POBLANDO PRODUCTOS AEROSHELL DESDE aeroshell-scraped-data.json\n');
  
  // Leer datos scrapeados
  const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf8'));
  console.log(`✓ Datos scrapeados leídos: ${scrapedData.length} productos\n`);
  
  // Leer datos actuales
  const currentData = JSON.parse(fs.readFileSync(outputDataPath, 'utf8'));
  const eastmanProducts = currentData.products.filter(p => p.brand === 'EASTMAN');
  console.log(`✓ Datos actuales: ${eastmanProducts.length} productos EASTMAN\n`);
  
  console.log('━'.repeat(80));
  console.log('📥 FASE 1: DESCARGANDO IMÁGENES\n');
  console.log('━'.repeat(80) + '\n');
  
  const downloadedImages = [];
  
  for (let i = 0; i < scrapedData.length; i++) {
    const product = scrapedData[i];
    const num = i + 1;
    
    if (product.productImage) {
      try {
        const imageName = `${sanitizeFilename(product.productName || product.partNumber)}.png`;
        const imagePath = path.join(imagesDir, imageName);
        
        // Si la imagen ya existe localmente (del re-scraping), no descargar
        if (fs.existsSync(imagePath)) {
          downloadedImages.push(imageName);
          console.log(`[${num}/${scrapedData.length}] ✓ ${product.productName} → ${imageName} (ya existe)`);
        } else if (product.productImage.startsWith('http')) {
          // Solo descargar si es una URL HTTP válida
          await downloadFile(product.productImage, imagePath);
          downloadedImages.push(imageName);
          console.log(`[${num}/${scrapedData.length}] ✓ ${product.productName} → ${imageName}`);
        } else {
          // Es una ruta local, verificar si existe
          const localPath = path.join(__dirname, '..', 'public', product.productImage);
          if (fs.existsSync(localPath)) {
            downloadedImages.push(imageName);
            console.log(`[${num}/${scrapedData.length}] ✓ ${product.productName} → ${imageName} (local)`);
          } else {
            console.log(`[${num}/${scrapedData.length}] ⚠️  ${product.productName} - Imagen no encontrada`);
          }
        }
      } catch (error) {
        console.log(`[${num}/${scrapedData.length}] ⚠️  ${product.productName} - Error: ${error.message}`);
      }
    } else {
      console.log(`[${num}/${scrapedData.length}] ⚠️  ${product.productName} - Sin imagen`);
    }
  }
  
  console.log(`\n✅ Imágenes descargadas: ${downloadedImages.length}/${scrapedData.length}\n`);
  
  console.log('━'.repeat(80));
  console.log('📄 FASE 2: DESCARGANDO PDFs\n');
  console.log('━'.repeat(80) + '\n');
  
  for (let i = 0; i < scrapedData.length; i++) {
    const product = scrapedData[i];
    const num = i + 1;
    
    console.log(`[${num}/${scrapedData.length}] ${product.productName} - ${product.pdfs?.length || 0} PDFs`);
    
    if (product.pdfs && product.pdfs.length > 0) {
      for (let j = 0; j < product.pdfs.length; j++) {
        const pdf = product.pdfs[j];
        try {
          const pdfName = `${product.partNumber}-${j+1}-${sanitizeFilename(pdf.name)}.pdf`;
          const pdfPath = path.join(pdfsDir, pdfName);
          
          await downloadFile(pdf.url, pdfPath);
          pdf.localPath = `/pdfs/lubricants/${pdfName}`;
          console.log(`   ✓ ${pdf.name}`);
        } catch (error) {
          console.log(`   ✗ ${pdf.name} - Error`);
        }
      }
    }
  }
  
  console.log(`\n✅ PDFs descargados\n`);
  
  console.log('━'.repeat(80));
  console.log('📦 FASE 3: CREANDO PRODUCTOS\n');
  console.log('━'.repeat(80) + '\n');
  
  const newProducts = [];
  
  scrapedData.forEach((scraped, index) => {
    const num = index + 1;
    const category = mapCategory(scraped.partType);
    
    const product = {
      id: `aeroshell-${scraped.partNumber}`,
      brand: 'AEROSHELL',
      name: scraped.partNumber,
      displayName: scraped.productName || scraped.partNumber,
      category: category,
      description: scraped.description || `AEROSHELL ${scraped.partType || 'Product'}`,
      specifications: {
        manufacturer: scraped.manufacturer || 'AEROSHELL',
        units: scraped.units || '',
        nationalStockNumber: scraped.nationalStock || '',
        productCode: scraped.productCode || '',
        groupCode: scraped.groupCode || '',
        class: scraped.class || '',
        unNumber: scraped.un || '',
        limitedShelfLife: scraped.limitedShelfLife || '',
        shelfLife: scraped.shelfLife || '',
        hazardousMaterial: scraped.hazardousMaterial || '',
        application: scraped.application || 'No Application Specified',
        partType: scraped.partType || ''
      },
      image: scraped.productImage ? `/images/lubricants/${sanitizeFilename(scraped.productName || scraped.partNumber)}.png` : '',
      price: 0,
      inStock: true,
      certifications: ['FAA Approved', 'MIL-SPEC'],
      features: ['Aviation Grade Quality', 'OEM Approved'],
      datasheets: (scraped.pdfs || []).map((pdf, i) => ({
        name: pdf.name,
        url: pdf.localPath || `/pdfs/lubricants/${scraped.partNumber}-${i+1}-${sanitizeFilename(pdf.name)}.pdf`,
        type: pdf.name.includes('SAFETY') ? 'Safety Data Sheet' : 
              pdf.name.includes('TECHNICAL') ? 'Technical Data Sheet' : 'PDF'
      })),
      alternativeProducts: []
    };
    
    newProducts.push(product);
    console.log(`[${num}/${scrapedData.length}] ✓ ${product.displayName} | ${category} | ${product.datasheets.length} PDFs`);
  });
  
  console.log('\n━'.repeat(80));
  console.log('💾 FASE 4: GUARDANDO DATOS COMBINADOS (EASTMAN + AEROSHELL)\n');
  console.log('━'.repeat(80) + '\n');
  
  // Filtrar productos EASTMAN existentes y combinar con nuevos AEROSHELL
  // Esto previene duplicados al re-ejecutar el script
  const onlyEastman = currentData.products.filter(p => p.brand === 'EASTMAN');
  currentData.products = [...onlyEastman, ...newProducts];
  currentData.metadata = {
    generatedAt: new Date().toISOString(),
    totalProducts: currentData.products.length,
    source: 'SkyMart Portal',
    manufacturers: ['EASTMAN', 'AEROSHELL']
  };
  
  fs.writeFileSync(outputDataPath, JSON.stringify(currentData, null, 2));
  
  console.log(`✅ Archivo guardado`);
  console.log(`   Productos EASTMAN: ${onlyEastman.length}`);
  console.log(`   Productos AEROSHELL: ${newProducts.length}`);
  console.log(`   Total: ${currentData.products.length}\n`);
  
  console.log('━'.repeat(80));
  console.log('🎉 PROCESO COMPLETADO\n');
  console.log('━'.repeat(80) + '\n');
  
  // Resumen por categoría
  const categoryCounts = {};
  currentData.products.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  
  console.log('📊 RESUMEN POR CATEGORÍA:');
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    console.log(`   • ${cat}: ${count}`);
  });
  
  console.log('\n━'.repeat(80));
  console.log(`✨ Ver en localhost:3000/lubricants`);
}

main().catch(console.error);
