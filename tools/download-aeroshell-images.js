import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear carpeta para las imágenes descargadas
const imagesDir = path.join(__dirname, '..', 'aeroshell-images-review');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Leer los datos scrapeados
const scrapedDataPath = path.join(__dirname, 'aeroshell-scraped-data.json');
const products = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf-8'));

console.log('📥 DESCARGANDO IMÁGENES DE PRODUCTOS AEROSHELL\n');
console.log(`Total de productos: ${products.length}`);
console.log(`Carpeta de destino: ${imagesDir}\n`);

// Función para descargar una imagen
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(filepath);
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Status Code: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Función para sanitizar nombres de archivos
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9-_.]/gi, '_').replace(/_+/g, '_');
}

// Descargar todas las imágenes
async function downloadAllImages() {
  let downloaded = 0;
  let skipped = 0;
  let errors = 0;
  
  const summary = [];
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const num = i + 1;
    
    console.log(`\n[${num}/${products.length}] ${product.partNumber} - ${product.productName || product.productCode}`);
    
    if (!product.productImage) {
      console.log('   ⊝ Sin imagen');
      skipped++;
      summary.push({
        partNumber: product.partNumber,
        productName: product.productName || product.productCode,
        status: 'NO_IMAGE',
        file: null
      });
      continue;
    }
    
    try {
      // Obtener la extensión del archivo de la URL
      const urlObj = new URL(product.productImage);
      const urlPath = urlObj.pathname;
      const ext = path.extname(urlPath).toLowerCase() || '.png';
      
      // Crear nombre de archivo: partNumber_productName.ext
      const productName = sanitizeFilename(product.productName || product.productCode);
      const filename = `${product.partNumber}_${productName}${ext}`;
      const filepath = path.join(imagesDir, filename);
      
      console.log(`   ⬇️  Descargando: ${filename}`);
      await downloadImage(product.productImage, filepath);
      
      // Verificar el tamaño del archivo
      const stats = fs.statSync(filepath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      
      console.log(`   ✅ Descargado (${sizeKB} KB)`);
      downloaded++;
      
      summary.push({
        partNumber: product.partNumber,
        productName: product.productName || product.productCode,
        status: 'DOWNLOADED',
        file: filename,
        sizeKB: parseFloat(sizeKB),
        url: product.productImage
      });
      
      // Pausa pequeña entre descargas para no saturar el servidor
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      errors++;
      
      summary.push({
        partNumber: product.partNumber,
        productName: product.productName || product.productCode,
        status: 'ERROR',
        file: null,
        error: error.message
      });
    }
  }
  
  // Guardar resumen
  const summaryPath = path.join(imagesDir, '_DOWNLOAD_SUMMARY.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  // Crear archivo README
  const readmePath = path.join(imagesDir, 'README.md');
  const readmeContent = `# Imágenes AEROSHELL - Revisión

**Fecha de descarga:** ${new Date().toLocaleString()}
**Total de productos:** ${products.length}

## Estadísticas:
- ✅ **Descargadas:** ${downloaded}
- ⊝ **Sin imagen:** ${skipped}
- ❌ **Errores:** ${errors}

## Archivos descargados:

${summary
  .filter(s => s.status === 'DOWNLOADED')
  .map(s => `- **${s.partNumber}** - ${s.productName} (${s.sizeKB} KB)
  - Archivo: \`${s.file}\`
  - URL: ${s.url}`)
  .join('\n\n')}

## Productos sin imagen:

${summary
  .filter(s => s.status === 'NO_IMAGE')
  .map(s => `- **${s.partNumber}** - ${s.productName}`)
  .join('\n')}

${errors > 0 ? `
## Errores:

${summary
  .filter(s => s.status === 'ERROR')
  .map(s => `- **${s.partNumber}** - ${s.productName}: ${s.error}`)
  .join('\n')}
` : ''}
`;
  
  fs.writeFileSync(readmePath, readmeContent);
  
  console.log('\n\n' + '═'.repeat(80));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(80));
  console.log(`✅ Descargadas:    ${downloaded} imágenes`);
  console.log(`⊝  Sin imagen:     ${skipped} productos`);
  console.log(`❌ Errores:        ${errors}`);
  console.log('═'.repeat(80));
  console.log(`\n📁 Carpeta: ${imagesDir}`);
  console.log(`📄 Resumen: ${summaryPath}`);
  console.log(`📖 README: ${readmePath}\n`);
}

downloadAllImages().catch(console.error);
