#!/usr/bin/env node

/**
 * Convierte datos scrapeados de SkyMart al formato del marketplace de ORBIPARTS
 * Sin mostrar cantidades de stock ni ubicaciones - solo "En Stock" / "Agotado"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPED_DATA_DIR = path.join(__dirname, '../scraped-data');
const OUTPUT_FILE = path.join(__dirname, '../src/data/lubricants-data.json');

console.log('🔄 Convirtiendo datos scrapeados al formato del marketplace...\n');

// Leer todos los archivos JSON de productos
const productFiles = fs.readdirSync(SCRAPED_DATA_DIR)
  .filter(file => file.startsWith('product_') && file.endsWith('.json'));

console.log(`📦 Encontrados ${productFiles.length} productos scrapeados\n`);

const marketplaceProducts = [];

productFiles.forEach((file, index) => {
  try {
    const filePath = path.join(SCRAPED_DATA_DIR, file);
    const productData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Determinar si hay stock (simplemente si el producto existe es "En Stock")
    const inStock = true; // Todos los productos scrapeados están disponibles
    
    // Extraer información del producto
    const partNumber = productData.partNumber || 'N/A';
    const description = productData.description || 'Aviation Lubricant';
    const price = productData.price || 'Contact for pricing';
    
    // Limpiar precio (quitar símbolos extra)
    const cleanPrice = price.replace(/[^\d.,]/g, '');
    const priceNumber = cleanPrice ? parseFloat(cleanPrice.replace(',', '')) : null;
    
    // Determinar categoría basada en la descripción
    let category = 'oils';
    if (description.toLowerCase().includes('grease')) {
      category = 'greases';
    } else if (description.toLowerCase().includes('hydraulic')) {
      category = 'hydraulics';
    } else if (description.toLowerCase().includes('turbine')) {
      category = 'oils';
    }
    
    // Determinar especificación militar
    const milSpecMatch = description.match(/MIL-[A-Z]+-[\d]+[A-Z]?/);
    const milSpec = milSpecMatch ? milSpecMatch[0] : null;
    
    // Crear objeto para el marketplace
    const marketplaceProduct = {
      id: `eastman-${partNumber.toLowerCase()}`,
      brand: 'EASTMAN',
      name: partNumber,
      category,
      description: description || `EASTMAN ${partNumber}`,
      specifications: milSpec ? [milSpec] : ['Aviation Grade'],
      image: `https://portal.skymart.aero/api/docServ/doc/c1094/skymart_shopQC/shopQC/${productData.partNumber}/.png/${productData.partNumber}.png`,
      price: priceNumber || 0,
      inStock: true, // Todos los productos están en stock
      certifications: ['FAA Approved', 'MIL-SPEC'],
      features: [],
      datasheets: productData.datasheets?.map(ds => ({
        filename: ds.filename || 'document.pdf',
        realFilename: ds.realFilename || ds.filename || 'document.pdf',
        displayName: ds.displayName || ds.realFilename || ds.filename || 'Technical Document',
        docType: ds.docType || 'Technical Document',
        language: ds.language || 'English',
        url: ds.url || ''
      })) || []
    };
    
    // Añadir características basadas en especificaciones
    if (productData.specifications) {
      if (productData.specifications['Shelf Life']) {
        marketplaceProduct.features.push(`Shelf Life: ${productData.specifications['Shelf Life']}`);
      }
      if (productData.specifications['Hazardous Material'] === 'No') {
        marketplaceProduct.features.push('Non-Hazardous');
      }
    }
    
    // Añadir características genéricas
    if (milSpec) {
      marketplaceProduct.features.push(`Meets ${milSpec}`);
    }
    marketplaceProduct.features.push('Aviation Grade Quality');
    marketplaceProduct.features.push('OEM Approved');
    
    marketplaceProducts.push(marketplaceProduct);
    
    console.log(`✓ [${index + 1}/${productFiles.length}] ${partNumber} - ${description.substring(0, 40)}...`);
    
  } catch (error) {
    console.error(`✗ Error procesando ${file}: ${error.message}`);
  }
});

// Ordenar por nombre
marketplaceProducts.sort((a, b) => a.name.localeCompare(b.name));

// Guardar archivo JSON
const outputData = {
  metadata: {
    generatedAt: new Date().toISOString(),
    totalProducts: marketplaceProducts.length,
    source: 'SkyMart Portal',
    manufacturer: 'EASTMAN'
  },
  products: marketplaceProducts
};

// Crear directorio de salida si no existe
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2));

console.log(`\n✅ Datos convertidos exitosamente`);
console.log(`📁 Archivo generado: ${OUTPUT_FILE}`);
console.log(`📊 Total productos: ${marketplaceProducts.length}`);

// Generar estadísticas
const stats = {
  oils: marketplaceProducts.filter(p => p.category === 'oils').length,
  greases: marketplaceProducts.filter(p => p.category === 'greases').length,
  hydraulics: marketplaceProducts.filter(p => p.category === 'hydraulics').length,
  withPrice: marketplaceProducts.filter(p => p.price > 0).length,
  withDatasheets: marketplaceProducts.filter(p => p.datasheets.length > 0).length
};

console.log(`\n📈 Estadísticas:`);

// NO SOBRESCRIBIR EL COMPONENTE - Ya está personalizado manualmente
console.log(`
📝 Componente React NO modificado (preservando diseño personalizado)`);
console.log(`📁 Ubicación: ${path.join(__dirname, '../src/components/EastmanMarketplace.jsx')}`);
console.log(`
✅ ¡Todo listo! Los datos se han actualizado en lubricants-data.json`);
