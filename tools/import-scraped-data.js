/**
 * Importador de datos scrapeados al formato del marketplace
 * Convierte los datos de SkyMart a la estructura de productos del marketplace
 * 
 * Uso:
 * node tools/import-scraped-data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo de tipos de producto a categorías de imágenes de Unsplash
const IMAGE_MAPPING = {
  'TURBINE ENGINE OIL': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
  'PISTON ENGINE OIL': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
  'HYDRAULIC FLUID': 'https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80',
  'GREASES': 'https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80',
  'GREASE': 'https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80',
  'SPECIALTY': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  'PAINTS': 'https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80',
  'DEFAULT': 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80'
};

/**
 * Genera un nombre corto basado en el part number y descripción
 */
function generateShortName(product) {
  if (product.partNumber) {
    // Extraer el identificador principal (ej: "W100" de "AeroShell W100")
    const match = product.partNumber.match(/([A-Z]+\d+[A-Z]*)/);
    if (match) {
      return `${product.manufacturer} ${match[1]}`;
    }
  }
  
  // Fallback a las primeras palabras de la descripción
  if (product.description) {
    const words = product.description.split(' ').slice(0, 3).join(' ');
    return words.length > 30 ? words.substring(0, 30) + '...' : words;
  }
  
  return product.partNumber || 'Unknown Product';
}

/**
 * Genera un rating aleatorio realista (4.3 - 4.9)
 */
function generateRating() {
  return Math.round((Math.random() * 0.6 + 4.3) * 10) / 10;
}

/**
 * Determina si un producto debe ser destacado (featured)
 */
function isFeatured(product) {
  // Featured si:
  // - Tiene stock disponible
  // - Precio razonable
  // - Es de una marca principal
  const hasStock = product.inventory && product.inventory.some(inv => 
    parseInt(inv.quantity) > 0
  );
  
  const isPopularBrand = ['EASTMAN', 'AEROSHELL', 'CASTROL'].includes(
    product.manufacturer?.toUpperCase()
  );
  
  return hasStock && isPopularBrand && Math.random() > 0.7;
}

/**
 * Convierte un producto scrapeado al formato del marketplace
 */
function convertProduct(scrapedProduct, index) {
  // Calcular stock
  const totalStock = scrapedProduct.inventory?.reduce((sum, inv) => {
    return sum + (parseInt(inv.quantity) || 0);
  }, 0) || 0;
  
  const inStock = totalStock > 0;
  
  // Calcular lead time si no hay stock
  let leadTime = null;
  if (!inStock) {
    leadTime = Math.floor(Math.random() * 21) + 5; // 5-25 días
  }
  
  // Obtener la mejor ubicación de almacén
  const primaryWarehouse = scrapedProduct.inventory?.[0]?.warehouse || 'MIAMI';
  
  // Seleccionar imagen apropiada
  const partType = scrapedProduct.partType?.toUpperCase() || 'DEFAULT';
  let image = IMAGE_MAPPING[partType] || IMAGE_MAPPING.DEFAULT;
  
  // Si el producto tiene imagen propia, usarla
  if (scrapedProduct.image && scrapedProduct.image.startsWith('http')) {
    image = scrapedProduct.image;
  }
  
  const marketplaceProduct = {
    id: index,
    name: scrapedProduct.description || scrapedProduct.partNumber,
    shortName: generateShortName(scrapedProduct),
    manufacturer: scrapedProduct.manufacturer?.toUpperCase() || 'UNKNOWN',
    nsn: scrapedProduct.nsn || '',
    partNumber: scrapedProduct.partNumber || '',
    partType: scrapedProduct.partType || 'FLUID',
    units: scrapedProduct.units || 'Each',
    price: scrapedProduct.price || null,
    inStock: inStock,
    limitedShelfLife: scrapedProduct.limitedShelfLife || false,
    shelfLifeDays: scrapedProduct.shelfLifeDays || null,
    hazardous: scrapedProduct.hazardous || false,
    leadTime: leadTime,
    image: image,
    description: scrapedProduct.description || `${scrapedProduct.manufacturer} ${scrapedProduct.partType}`.toLowerCase(),
    rating: generateRating(),
    featured: isFeatured(scrapedProduct),
    
    // Información adicional
    warehouse: primaryWarehouse,
    inventory: scrapedProduct.inventory || [],
    datasheets: scrapedProduct.datasheets || [],
    alternates: scrapedProduct.alternates || [],
    application: scrapedProduct.application || 'Aviation',
    groupCode: scrapedProduct.groupCode || 'FLUID',
    unNumber: scrapedProduct.unNumber || null,
    
    // Metadata
    sourceUrl: scrapedProduct.sourceUrl || null,
    lastUpdated: new Date().toISOString()
  };
  
  return marketplaceProduct;
}

/**
 * Importa y convierte todos los productos
 */
function importProducts() {
  console.log('📦 Importando productos scrapeados...\n');
  
  // Leer datos scrapeados
  const scrapedDataPath = path.join(__dirname, '../scraped-data/skymart-products.json');
  
  if (!fs.existsSync(scrapedDataPath)) {
    console.error('❌ No se encontró el archivo de datos scrapeados');
    console.error(`   Esperado en: ${scrapedDataPath}`);
    console.error('   Ejecuta primero: npm run scrape');
    process.exit(1);
  }
  
  const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf-8'));
  
  // Combinar todos los productos
  const allScrapedProducts = [
    ...scrapedData.eastman,
    ...scrapedData.aeroshell,
    ...scrapedData.castrol
  ];
  
  console.log(`📊 Total de productos scrapeados: ${allScrapedProducts.length}\n`);
  
  // Convertir al formato del marketplace
  const marketplaceProducts = allScrapedProducts.map((product, index) => 
    convertProduct(product, index + 1)
  );
  
  // Filtrar productos sin información esencial
  const validProducts = marketplaceProducts.filter(p => 
    p.name && p.manufacturer && (p.price !== null || p.inStock)
  );
  
  console.log(`✅ Productos válidos: ${validProducts.length}`);
  console.log(`⚠️  Productos descartados: ${marketplaceProducts.length - validProducts.length}\n`);
  
  // Estadísticas
  const stats = {
    total: validProducts.length,
    byManufacturer: {},
    byType: {},
    inStock: 0,
    featured: 0,
    withDatasheets: 0,
    withAlternates: 0,
    hazardous: 0,
    avgPrice: 0
  };
  
  validProducts.forEach(p => {
    // Por fabricante
    stats.byManufacturer[p.manufacturer] = (stats.byManufacturer[p.manufacturer] || 0) + 1;
    
    // Por tipo
    stats.byType[p.partType] = (stats.byType[p.partType] || 0) + 1;
    
    // Contadores
    if (p.inStock) stats.inStock++;
    if (p.featured) stats.featured++;
    if (p.datasheets.length > 0) stats.withDatasheets++;
    if (p.alternates.length > 0) stats.withAlternates++;
    if (p.hazardous) stats.hazardous++;
    if (p.price) stats.avgPrice += p.price;
  });
  
  stats.avgPrice = (stats.avgPrice / validProducts.filter(p => p.price).length).toFixed(2);
  
  // Guardar productos para el marketplace
  const outputPath = path.join(__dirname, '../scraped-data/marketplace-products.json');
  fs.writeFileSync(outputPath, JSON.stringify(validProducts, null, 2));
  
  console.log(`💾 Productos exportados a: ${outputPath}\n`);
  
  // Mostrar estadísticas
  console.log('📊 ESTADÍSTICAS:');
  console.log('─'.repeat(50));
  console.log(`Total de productos:      ${stats.total}`);
  console.log(`En stock:                ${stats.inStock} (${(stats.inStock/stats.total*100).toFixed(1)}%)`);
  console.log(`Destacados (Featured):   ${stats.featured} (${(stats.featured/stats.total*100).toFixed(1)}%)`);
  console.log(`Con datasheets:          ${stats.withDatasheets} (${(stats.withDatasheets/stats.total*100).toFixed(1)}%)`);
  console.log(`Con alternativas:        ${stats.withAlternates} (${(stats.withAlternates/stats.total*100).toFixed(1)}%)`);
  console.log(`Materiales peligrosos:   ${stats.hazardous}`);
  console.log(`Precio promedio:         $${stats.avgPrice}`);
  
  console.log('\n📦 Por Fabricante:');
  Object.entries(stats.byManufacturer)
    .sort((a, b) => b[1] - a[1])
    .forEach(([mfr, count]) => {
      console.log(`   ${mfr.padEnd(15)} ${count.toString().padStart(4)} productos`);
    });
  
  console.log('\n🔧 Por Tipo:');
  Object.entries(stats.byType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`   ${type.padEnd(25)} ${count.toString().padStart(4)} productos`);
    });
  
  // Generar código para el componente React
  generateReactComponent(validProducts);
  
  console.log('\n✅ Importación completada!');
}

/**
 * Genera el código del componente React con los productos
 */
function generateReactComponent(products) {
  console.log('\n📝 Generando componente React...');
  
  const componentPath = path.join(__dirname, '../scraped-data/LubricantMarketplace-GENERATED.jsx');
  
  const productsCode = JSON.stringify(products, null, 2)
    .replace(/"([^"]+)":/g, '$1:'); // Eliminar comillas de las keys
  
  const componentTemplate = `// ARCHIVO GENERADO AUTOMÁTICAMENTE
// No editar manualmente - se sobrescribirá en la próxima importación
// Generado: ${new Date().toISOString()}
// Total productos: ${products.length}

const products = ${productsCode};

export default products;
`;
  
  fs.writeFileSync(componentPath, componentTemplate);
  console.log(`✅ Componente generado: ${componentPath}`);
  console.log('\nPara usar en tu marketplace:');
  console.log('1. Copia este archivo a src/pages/');
  console.log('2. Importa los productos: import products from "./LubricantMarketplace-GENERATED"');
  console.log('3. Reemplaza el array de productos actual');
}

// Ejecutar
importProducts();
