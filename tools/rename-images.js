#!/usr/bin/env node

/**
 * Renombra las imágenes descargadas con sus part numbers correctos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPED_DATA_DIR = path.join(__dirname, '../scraped-data');
const IMAGES_DIR = path.join(__dirname, '../public/images/lubricants');

console.log('🖼️  Renombrando imágenes con part numbers correctos...\n');

// Leer todos los archivos JSON de productos
const productFiles = fs.readdirSync(SCRAPED_DATA_DIR)
  .filter(file => file.startsWith('product_') && file.endsWith('.json'));

console.log(`📦 Encontrados ${productFiles.length} productos\n`);

let renamedCount = 0;
const mapping = {};

productFiles.forEach((file) => {
  try {
    const filePath = path.join(SCRAPED_DATA_DIR, file);
    const productData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Extraer ID de la URL original
    const urlMatch = productData.url?.match(/\/part\/(\d+)/);
    if (!urlMatch) return;
    
    const urlId = urlMatch[1];
    const partNumber = productData.partNumber;
    
    // Buscar imagen con ese ID en cualquier extensión
    const possibleExtensions = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG'];
    
    for (const ext of possibleExtensions) {
      const oldImagePath = path.join(IMAGES_DIR, `${urlId}.${ext}`);
      
      if (fs.existsSync(oldImagePath)) {
        const newImagePath = path.join(IMAGES_DIR, `${partNumber}.png`);
        
        // Si ya existe con el nombre correcto, skip
        if (oldImagePath === newImagePath) {
          console.log(`✓ Ya correcto: ${partNumber}.png`);
          mapping[partNumber] = `${partNumber}.png`;
          break;
        }
        
        // Renombrar
        try {
          // Si el destino ya existe, eliminarlo primero
          if (fs.existsSync(newImagePath)) {
            fs.unlinkSync(newImagePath);
          }
          
          fs.renameSync(oldImagePath, newImagePath);
          console.log(`✓ Renombrado: ${urlId}.${ext} → ${partNumber}.png`);
          mapping[partNumber] = `${partNumber}.png`;
          renamedCount++;
        } catch (err) {
          console.error(`✗ Error renombrando ${urlId}.${ext}:`, err.message);
        }
        
        break;
      }
    }
  } catch (error) {
    console.error(`✗ Error procesando ${file}:`, error.message);
  }
});

console.log(`\n✅ Proceso completado`);
console.log(`📊 Imágenes renombradas: ${renamedCount}`);
console.log(`\n💡 Todas las imágenes ahora tienen extensión .png uniforme`);

// Guardar mapping
const mappingPath = path.join(__dirname, '../image-mapping.json');
fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
console.log(`📄 Mapping guardado en: image-mapping.json`);
