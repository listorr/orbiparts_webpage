import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para descargar archivos
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
        reject(new Error(`Failed: ${response.statusCode}`));
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

console.log('🚀 POBLANDO PRODUCTOS DESDE auto-scraped-data.json\n');
console.log('━'.repeat(80));

// 1. Leer datos scrapeados
const scrapedDataPath = path.join(__dirname, 'auto-scraped-data.json');
const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf-8'));
console.log(`✓ Datos scrapeados leídos: ${scrapedData.length} productos\n`);

// 2. Crear directorios
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'lubricants');
const pdfsDir = path.join(__dirname, '..', 'public', 'pdfs', 'lubricants');

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

console.log('━'.repeat(80));
console.log('\n📥 FASE 1: DESCARGANDO IMÁGENES\n');
console.log('━'.repeat(80));
console.log();

// 3. Descargar imágenes con nombre del producto
const imagePromises = scrapedData.map(async (product, index) => {
  if (!product.productImage) {
    console.log(`[${index + 1}/${scrapedData.length}] ⚠️  ${product.productName || product.partNumber} - Sin imagen`);
    return null;
  }
  
  try {
    const productName = product.productName || product.partNumber;
    const sanitizedName = productName.replace(/[^a-zA-Z0-9-]/g, '-');
    const extension = product.productImage.includes('.jpg') ? '.jpg' : '.png';
    const fileName = `${sanitizedName}${extension}`;
    const filePath = path.join(imagesDir, fileName);
    
    await downloadFile(product.productImage, filePath);
    console.log(`[${index + 1}/${scrapedData.length}] ✓ ${productName} → ${fileName}`);
    
    return { partNumber: product.partNumber, fileName };
  } catch (error) {
    console.log(`[${index + 1}/${scrapedData.length}] ✗ ${product.productName || product.partNumber} - ${error.message}`);
    return null;
  }
});

const downloadedImages = await Promise.all(imagePromises);
const imageMap = {};
downloadedImages.filter(img => img !== null).forEach(img => {
  imageMap[img.partNumber] = img.fileName;
});

console.log(`\n✅ Imágenes descargadas: ${Object.keys(imageMap).length}/${scrapedData.length}\n`);

// 4. Descargar PDFs
console.log('━'.repeat(80));
console.log('\n📄 FASE 2: DESCARGANDO PDFs\n');
console.log('━'.repeat(80));
console.log();

for (let i = 0; i < scrapedData.length; i++) {
  const product = scrapedData[i];
  if (!product.pdfs || product.pdfs.length === 0) {
    console.log(`[${i + 1}/${scrapedData.length}] ${product.productName || product.partNumber} - Sin PDFs`);
    continue;
  }
  
  console.log(`[${i + 1}/${scrapedData.length}] ${product.productName || product.partNumber} - ${product.pdfs.length} PDFs`);
  
  for (let j = 0; j < product.pdfs.length; j++) {
    const pdf = product.pdfs[j];
    try {
      // Mantener el nombre original del PDF
      const pdfName = pdf.name.replace(/[^a-zA-Z0-9-_.() ]/g, '-').substring(0, 100);
      const fileName = `${product.partNumber}-${j + 1}-${pdfName}.pdf`;
      const filePath = path.join(pdfsDir, fileName);
      
      await downloadFile(pdf.url, filePath);
      console.log(`   ✓ ${pdf.name.substring(0, 60)}`);
      
      // Actualizar con ruta local
      product.pdfs[j].localPath = `/pdfs/lubricants/${fileName}`;
      
    } catch (error) {
      console.log(`   ✗ ${pdf.name.substring(0, 40)} - ${error.message}`);
    }
  }
}

console.log('\n✅ PDFs descargados\n');

// 5. Crear productos
console.log('━'.repeat(80));
console.log('\n📦 FASE 3: CREANDO PRODUCTOS\n');
console.log('━'.repeat(80));
console.log();

const products = scrapedData.map((product, index) => {
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
  
  console.log(`[${index + 1}/${scrapedData.length}] ✓ ${productName} | ${category} | ${productData.datasheets.length} PDFs`);
  
  return productData;
});

// 6. Guardar
console.log('\n━'.repeat(80));
console.log('\n💾 FASE 4: GUARDANDO lubricants-data.json\n');
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

console.log(`✅ Archivo guardado`);
console.log(`   Productos: ${products.length}`);

// Resumen
console.log('\n━'.repeat(80));
console.log('\n🎉 PROCESO COMPLETADO\n');
console.log('━'.repeat(80));
console.log();
console.log('📊 RESUMEN:');
console.log(`   • Imágenes: ${Object.keys(imageMap).length}`);
console.log(`   • Productos: ${products.length}`);
console.log();

const categoryCounts = {};
products.forEach(p => {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
});

console.log('📋 Por categoría:');
Object.entries(categoryCounts).forEach(([cat, count]) => {
  console.log(`   • ${cat}: ${count}`);
});

console.log('\n━'.repeat(80));
console.log('\n✨ Ver en localhost:3000/lubricants\n');
