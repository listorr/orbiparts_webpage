#!/usr/bin/env node

/**
 * Post-procesa los datos scrapeados para extraer correctamente:
 * - Part numbers reales
 * - Nombres correctos de PDFs
 * - Todas las especificaciones
 * - Metadata completa
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPED_DATA_DIR = path.join(__dirname, '../scraped-data');

console.log('🔧 Post-procesando datos scrapeados para corregir metadata...\n');

// Leer todos los archivos JSON de productos
const productFiles = fs.readdirSync(SCRAPED_DATA_DIR)
  .filter(file => file.startsWith('product_') && file.endsWith('.json') && file.includes('2026-03-08T18-43'));

console.log(`📦 Encontrados ${productFiles.length} productos para procesar\n`);

let correctedCount = 0;

productFiles.forEach((file, index) => {
  try {
    const filePath = path.join(SCRAPED_DATA_DIR, file);
    const productData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    let hasChanges = false;
    
    // 1. Corregir part number real desde la imagen URL
    if (productData.productImage && productData.productImage.url) {
      const imageMatch = productData.productImage.url.match(/\/([A-Z0-9\-]+)-removebg-preview\.png/);
      if (imageMatch && imageMatch[1] !== productData.partNumber) {
        console.log(`✓ [${index + 1}] Corrigiendo part number: ${productData.partNumber} → ${imageMatch[1]}`);
        productData.partNumber = imageMatch[1];
        hasChanges = true;
      }
    }
    
    // 2. Corregir nombres de PDFs
    if (productData.datasheets && productData.datasheets.length > 0) {
      productData.datasheets.forEach((pdf, idx) => {
        // Extraer nombre real del PDF de la URL
        const urlMatch = pdf.url.match(/\/([^\/]+\.(?:pdf|PDF))$/);
        if (urlMatch) {
          const realFilename = urlMatch[1];
          
          // Determinar el tipo de documento
          let docType = 'Technical Document';
          if (realFilename.toLowerCase().includes('sds') || realFilename.toLowerCase().includes('safety')) {
            docType = 'Safety Data Sheet';
          } else if (realFilename.toLowerCase().includes('spec')) {
            docType = 'Technical Specification';
          } else if (realFilename.toLowerCase().includes('cert')) {
            docType = 'Certificate';
          }
          
          // Determinar idioma
          let language = 'English';
          if (realFilename.toLowerCase().includes('spanish') || realFilename.toLowerCase().includes('mexico')) {
            language = 'Spanish';
          } else if (realFilename.toLowerCase().includes('portuguese') || realFilename.toLowerCase().includes('brasil')) {
            language = 'Portuguese';
          }
          
          pdf.realFilename = realFilename;
          pdf.docType = docType;
          pdf.language = language;
          pdf.displayName = `${docType} (${language})`;
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        console.log(`   ✓ Corregidos ${productData.datasheets.length} PDFs`);
      }
    }
    
    // 3. Si hay cambios, guardar el archivo actualizado
    if (hasChanges) {
      fs.writeFileSync(filePath, JSON.stringify(productData, null, 2));
      correctedCount++;
    }
    
  } catch (error) {
    console.error(`✗ Error procesando ${file}: ${error.message}`);
  }
});

console.log(`\n✅ Post-procesamiento completado`);
console.log(`📊 Productos corregidos: ${correctedCount}/${productFiles.length}`);
console.log(`\n💡 Ahora ejecuta: node convert-to-marketplace.js para regenerar el marketplace`);
