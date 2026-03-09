/**
 * Visualizador de datos scrapeados
 * Muestra un resumen rápido de los productos extraídos
 * 
 * Uso: node tools/view-data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function viewData() {
  const dataPath = path.join(__dirname, '../scraped-data/skymart-products.json');
  
  if (!fs.existsSync(dataPath)) {
    console.log('❌ No hay datos scrapeados aún');
    console.log('   Ejecuta: npm run scrape');
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║         DATOS SCRAPEADOS DE SKYMART                    ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  
  console.log(`📅 Fecha de scraping: ${new Date(data.metadata.scrapedAt).toLocaleString()}`);
  console.log(`📦 Total de productos: ${data.metadata.totalProducts}\n`);
  
  // Por fabricante
  console.log('━'.repeat(60));
  console.log('📊 RESUMEN POR FABRICANTE');
  console.log('━'.repeat(60));
  
  ['eastman', 'aeroshell', 'castrol'].forEach(mfr => {
    const products = data[mfr];
    const inStock = products.filter(p => p.inventory?.some(i => parseInt(i.quantity) > 0)).length;
    const avgPrice = products
      .filter(p => p.price)
      .reduce((sum, p) => sum + p.price, 0) / products.filter(p => p.price).length;
    
    console.log(`\n${mfr.toUpperCase()}`);
    console.log(`  Total:      ${products.length} productos`);
    console.log(`  En stock:   ${inStock} productos (${(inStock/products.length*100).toFixed(1)}%)`);
    console.log(`  Precio avg: $${avgPrice.toFixed(2)}`);
    
    // Top 3 productos más caros
    const top3 = products
      .filter(p => p.price)
      .sort((a, b) => b.price - a.price)
      .slice(0, 3);
    
    if (top3.length > 0) {
      console.log(`  Top 3 más caros:`);
      top3.forEach((p, i) => {
        console.log(`    ${i+1}. ${p.partNumber} - $${p.price.toFixed(2)}`);
      });
    }
  });
  
  // Tipos de producto más comunes
  console.log('\n' + '━'.repeat(60));
  console.log('🔧 TIPOS DE PRODUCTO MÁS COMUNES');
  console.log('━'.repeat(60) + '\n');
  
  const allProducts = [...data.eastman, ...data.aeroshell, ...data.castrol];
  const typeCount = {};
  
  allProducts.forEach(p => {
    typeCount[p.partType] = (typeCount[p.partType] || 0) + 1;
  });
  
  Object.entries(typeCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([type, count]) => {
      const bar = '█'.repeat(Math.floor(count / 2));
      console.log(`${type.padEnd(30)} ${bar} ${count}`);
    });
  
  // Productos con datasheets
  console.log('\n' + '━'.repeat(60));
  console.log('📄 DATASHEETS DISPONIBLES');
  console.log('━'.repeat(60) + '\n');
  
  const withDatasheets = allProducts.filter(p => p.datasheets && p.datasheets.length > 0);
  console.log(`Total productos con datasheets: ${withDatasheets.length} (${(withDatasheets.length/allProducts.length*100).toFixed(1)}%)`);
  
  const totalDatasheets = withDatasheets.reduce((sum, p) => sum + p.datasheets.length, 0);
  console.log(`Total de datasheets: ${totalDatasheets}`);
  
  // Productos con alternativas
  console.log('\n' + '━'.repeat(60));
  console.log('🔄 PRODUCTOS CON ALTERNATIVAS');
  console.log('━'.repeat(60) + '\n');
  
  const withAlternates = allProducts.filter(p => p.alternates && p.alternates.length > 0);
  console.log(`Productos con alternativas: ${withAlternates.length} (${(withAlternates.length/allProducts.length*100).toFixed(1)}%)`);
  
  if (withAlternates.length > 0) {
    const avgAlternates = withAlternates.reduce((sum, p) => sum + p.alternates.length, 0) / withAlternates.length;
    console.log(`Promedio de alternativas por producto: ${avgAlternates.toFixed(1)}`);
    
    const mostAlternates = withAlternates.sort((a, b) => b.alternates.length - a.alternates.length)[0];
    console.log(`Producto con más alternativas: ${mostAlternates.partNumber} (${mostAlternates.alternates.length} alternativas)`);
  }
  
  // Hazmat
  console.log('\n' + '━'.repeat(60));
  console.log('⚠️  MATERIALES PELIGROSOS');
  console.log('━'.repeat(60) + '\n');
  
  const hazmat = allProducts.filter(p => p.hazardous);
  console.log(`Productos peligrosos: ${hazmat.length} (${(hazmat.length/allProducts.length*100).toFixed(1)}%)`);
  
  // Shelf life
  const withShelfLife = allProducts.filter(p => p.limitedShelfLife);
  console.log(`Productos con shelf life limitado: ${withShelfLife.length} (${(withShelfLife.length/allProducts.length*100).toFixed(1)}%)`);
  
  if (withShelfLife.length > 0) {
    const avgShelfLife = withShelfLife
      .filter(p => p.shelfLifeDays)
      .reduce((sum, p) => sum + p.shelfLifeDays, 0) / withShelfLife.filter(p => p.shelfLifeDays).length;
    console.log(`Shelf life promedio: ${avgShelfLife.toFixed(0)} días (${(avgShelfLife/365).toFixed(1)} años)`);
  }
  
  // Almacenes
  console.log('\n' + '━'.repeat(60));
  console.log('📍 UBICACIONES DE ALMACÉN');
  console.log('━'.repeat(60) + '\n');
  
  const warehouses = {};
  allProducts.forEach(p => {
    if (p.inventory) {
      p.inventory.forEach(inv => {
        warehouses[inv.warehouse] = (warehouses[inv.warehouse] || 0) + parseInt(inv.quantity || 0);
      });
    }
  });
  
  Object.entries(warehouses)
    .sort((a, b) => b[1] - a[1])
    .forEach(([warehouse, qty]) => {
      console.log(`${warehouse.padEnd(20)} ${qty.toString().padStart(6)} unidades`);
    });
  
  console.log('\n' + '═'.repeat(60));
  console.log('✅ Datos listos para importar al marketplace');
  console.log('   Ejecuta: npm run import');
  console.log('═'.repeat(60) + '\n');
}

viewData();
