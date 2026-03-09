import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para descargar imagen
function downloadImage(url, filepath) {
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
          fs.unlink(filepath, () => {}); // Eliminar archivo incompleto
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

// Mapeo de categorías de SkyMart a nuestras categorías
const categoryMap = {
  'HYDRAULIC FLUID': 'HYDRAULIC FLUID',
  'TURBINE ENGINE OIL': 'TURBINE ENGINE OIL',
  'SPECIALTY': 'SPECIALTY',
  'EXPENDABLES': 'EXPENDABLES',
  'NON-AVIATION': 'NON-AVIATION'
};

console.log('🚀 Iniciando actualización de productos e imágenes...\n');

// 1. Leer datos scrapeados
const scrapedDataPath = path.join(__dirname, 'auto-scraped-data.json');
const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf-8'));
console.log(`✓ Datos scrapeados leídos: ${scrapedData.length} productos\n`);

// 2. Leer datos actuales de lubricantes
const lubricantsDataPath = path.join(__dirname, '..', 'src', 'data', 'lubricants-data.json');
const lubricantsData = JSON.parse(fs.readFileSync(lubricantsDataPath, 'utf-8'));
console.log(`✓ Datos actuales leídos: ${lubricantsData.products.length} productos\n`);

// 3. Directorio de imágenes
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'lubricants');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📥 DESCARGANDO Y RENOMBRANDO IMÁGENES...\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 4. Descargar imágenes con el nombre del producto
const imageDownloadPromises = scrapedData.map(async (product, index) => {
  if (!product.productImage) {
    console.log(`[${index + 1}/${scrapedData.length}] ⚠️  ${product.productName || product.partNumber} - Sin imagen`);
    return null;
  }

  try {
    // Nombre del archivo: nombre del producto + extensión
    const productName = product.productName || product.partNumber;
    const sanitizedName = productName.replace(/[^a-zA-Z0-9-]/g, '-'); // Limpiar caracteres especiales
    const extension = product.productImage.includes('.jpg') ? '.jpg' : '.png';
    const fileName = `${sanitizedName}${extension}`;
    const filePath = path.join(imagesDir, fileName);

    await downloadImage(product.productImage, filePath);
    console.log(`[${index + 1}/${scrapedData.length}] ✓ ${productName} → ${fileName}`);
    
    return {
      partNumber: product.partNumber,
      fileName: fileName,
      productName: productName
    };
  } catch (error) {
    console.log(`[${index + 1}/${scrapedData.length}] ✗ ${product.productName || product.partNumber} - Error: ${error.message}`);
    return null;
  }
});

// Esperar a que todas las imágenes se descarguen
const downloadedImages = await Promise.all(imageDownloadPromises);
const imageMap = {};
downloadedImages.filter(img => img !== null).forEach(img => {
  imageMap[img.partNumber] = img.fileName;
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`✓ Imágenes descargadas: ${Object.keys(imageMap).length}/${scrapedData.length}\n`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📝 ACTUALIZANDO DATOS DE PRODUCTOS...\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 5. Actualizar productos con datos scrapeados
let updatedCount = 0;
let notFoundCount = 0;

lubricantsData.products = lubricantsData.products.map((product) => {
  // Extraer el número del ID (quitar el prefijo "eastman-")
  const partNumber = product.id.replace('eastman-', '');
  const scrapedProduct = scrapedData.find(sp => sp.partNumber === partNumber);
  
  if (!scrapedProduct) {
    console.log(`⚠️  Producto ${product.id} (${partNumber}) no encontrado en datos scrapeados`);
    notFoundCount++;
    return product;
  }

  const productName = scrapedProduct.productName || scrapedProduct.partNumber;
  const oldName = product.displayName || product.name;

  // Actualizar datos
  const updatedProduct = {
    ...product,
    name: scrapedProduct.partNumber,
    displayName: productName,
    category: categoryMap[scrapedProduct.partType] || product.category,
    description: scrapedProduct.description || product.description,
    image: imageMap[partNumber] ? `/images/lubricants/${imageMap[partNumber]}` : product.image,
    specifications: {
      ...product.specifications,
      manufacturer: scrapedProduct.manufacturer || product.specifications?.manufacturer,
      units: scrapedProduct.units || product.specifications?.units,
      nationalStockNumber: scrapedProduct.nationalStock || '',
      productCode: scrapedProduct.productCode || '',
      groupCode: scrapedProduct.groupCode || '',
      class: scrapedProduct.class || '',
      unNumber: scrapedProduct.un || '',
      limitedShelfLife: scrapedProduct.limitedShelfLife || '',
      shelfLife: scrapedProduct.shelfLife || '',
      hazardousMaterial: scrapedProduct.hazardousMaterial || '',
      application: scrapedProduct.application || ''
    }
  };

  // Actualizar PDFs si existen
  if (scrapedProduct.pdfs && scrapedProduct.pdfs.length > 0) {
    updatedProduct.datasheets = scrapedProduct.pdfs.map(pdf => ({
      name: pdf.name,
      url: pdf.url,
      type: pdf.name.includes('TECHNICAL') ? 'Technical Data Sheet' : 
            pdf.name.includes('SAFETY') ? 'Safety Data Sheet' : 'Document'
    }));
  }

  console.log(`✓ ${oldName} → ${productName} | ${scrapedProduct.partType}`);
  updatedCount++;
  
  return updatedProduct;
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`✓ Productos actualizados: ${updatedCount}`);
console.log(`⚠️  Productos no encontrados: ${notFoundCount}\n`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 6. Guardar datos actualizados
fs.writeFileSync(lubricantsDataPath, JSON.stringify(lubricantsData, null, 2), 'utf-8');
console.log('✅ Archivo lubricants-data.json actualizado exitosamente!\n');

// 7. Resumen de cambios críticos
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📊 RESUMEN DE CAMBIOS CRÍTICOS:\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Mostrar algunos ejemplos de correcciones importantes
const examples = [
  { id: '187581', oldName: 'MCS352B-5.4OZ', description: 'EXPENDABLES - Decal' },
  { id: '26526', oldName: 'SK1000-16OZ', description: 'TURBINE ENGINE OIL - 5GL Pail' },
  { id: '21797', oldName: 'LD5-GL', description: 'LD4-QT - Hydraulic Fluid' },
  { id: '190037', oldName: 'LD5-5GL', description: 'SKY5-QT - Hydraulic Fluid' }
];

examples.forEach(ex => {
  const scraped = scrapedData.find(p => p.partNumber === ex.id);
  if (scraped) {
    console.log(`${ex.id}:`);
    console.log(`  ✗ Antes: ${ex.oldName}`);
    console.log(`  ✓ Ahora: ${scraped.productName}`);
    console.log(`  📝 ${ex.description}\n`);
  }
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('✅ PROCESO COMPLETADO!\n');
console.log('Nuevos campos agregados:');
console.log('  • National Stock Number');
console.log('  • Product Code');
console.log('  • Group Code');
console.log('  • Class (para materiales peligrosos)');
console.log('  • UN Number (para materiales peligrosos)');
console.log('  • Limited Shelf Life');
console.log('  • Shelf Life (días)');
console.log('  • Hazardous Material');
console.log('  • Application');
console.log('  • PDFs con nombres descriptivos\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
