import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'aeroshell-images-review');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'lubricants');

console.log('🚀 Copiando imágenes AEROSHELL al marketplace...\n');
console.log(`📂 Origen: ${sourceDir}`);
console.log(`📂 Destino: ${targetDir}\n`);

// Leer el resumen de descargas
const summaryPath = path.join(sourceDir, '_DOWNLOAD_SUMMARY.json');
const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));

let copied = 0;
let skipped = 0;
let errors = 0;

summary.forEach((item, index) => {
  if (item.status !== 'DOWNLOADED' || !item.file) {
    skipped++;
    return;
  }
  
  try {
    const sourceFile = path.join(sourceDir, item.file);
    const ext = path.extname(item.file);
    
    // Nombre de archivo de destino: {partNumber}.png o {partNumber}.jpg
    const targetFile = path.join(targetDir, `${item.partNumber}${ext}`);
    
    // Copiar archivo
    fs.copyFileSync(sourceFile, targetFile);
    
    const stats = fs.statSync(targetFile);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    console.log(`✅ [${index + 1}/${summary.length}] ${item.partNumber} - ${item.productName} (${sizeKB} KB)`);
    copied++;
    
  } catch (error) {
    console.log(`❌ [${index + 1}/${summary.length}] ${item.partNumber} - Error: ${error.message}`);
    errors++;
  }
});

console.log('\n' + '═'.repeat(80));
console.log('📊 RESUMEN');
console.log('═'.repeat(80));
console.log(`✅ Copiadas:  ${copied} imágenes`);
console.log(`⊝  Saltadas:  ${skipped}`);
console.log(`❌ Errores:   ${errors}`);
console.log('═'.repeat(80));

console.log(`\n📁 Ubicación: ${targetDir}\n`);

// Verificar específicamente el producto 5-CTG
const ctg5Path = path.join(targetDir, '73937.png');
if (fs.existsSync(ctg5Path)) {
  const stats = fs.statSync(ctg5Path);
  console.log(`\n🎯 VERIFICACIÓN - Producto 5-CTG (73937):`);
  console.log(`   ✅ Archivo existe: ${ctg5Path}`);
  console.log(`   📊 Tamaño: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`   📅 Modificado: ${stats.mtime.toLocaleString()}`);
} else {
  console.log(`\n❌ Producto 5-CTG (73937) NO encontrado`);
}
