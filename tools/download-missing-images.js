import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs completas para descargar imágenes directamente
// Estas son las URLs que vemos en las capturas del usuario
const imageUrls = {
  '163380': 'https://portal.skymart.aero/api/docServ/doc/c1094/skymart_shopQC/shopQC/574810/163380.png',
  '26526': 'https://portal.skymart.aero/api/docServ/doc/c1094/skymart_shopQC/shopQC/1067233/26526.png',
  '27952': 'https://portal.skymart.aero/api/docServ/doc/c1094/skymart_shopQC/shopQC/41937/27952.JPG',
  '81697': 'https://portal.skymart.aero/api/docServ/doc/c1094/skymart_shopQC/shopQC/574820/81697.png'
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Seguir redirect
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const stats = fs.statSync(filepath);
          resolve(stats.size);
        });
        fileStream.on('error', reject);
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function downloadMissingImages() {
  console.log('📥 Descargando imágenes faltantes...\n');
  
  for (const [partNumber, url] of Object.entries(imageUrls)) {
    console.log(`📦 ${partNumber}:`);
    console.log(`   URL: ${url}`);
    
    const outputPath = path.join(__dirname, '..', 'public', 'images', 'lubricants', `${partNumber}.png`);
    
    try {
      const size = await downloadImage(url, outputPath);
      const sizeKB = (size / 1024).toFixed(1);
      const status = size > 5000 ? '✅' : '⚠️';
      console.log(`   ${status} Descargada: ${sizeKB} KB\n`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
    }
  }
  
  console.log('📊 Resumen final:');
  for (const partNumber of Object.keys(imageUrls)) {
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'lubricants', `${partNumber}.png`);
    if (fs.existsSync(imagePath)) {
      const stats = fs.statSync(imagePath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      const status = stats.size > 5000 ? '✅' : '⚠️';
      console.log(`   ${status} ${partNumber}.png: ${sizeKB} KB`);
    } else {
      console.log(`   ❌ ${partNumber}.png: NO EXISTE`);
    }
  }
}

downloadMissingImages().catch(console.error);
