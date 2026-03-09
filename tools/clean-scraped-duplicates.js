#!/usr/bin/env node

/**
 * Elimina archivos JSON duplicados de scraped-data
 * Mantiene solo el más reciente de cada producto
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPED_DATA_DIR = path.join(__dirname, '../scraped-data');

console.log('🔧 Eliminando archivos JSON duplicados...\n');

// Leer todos los archivos JSON
const files = fs.readdirSync(SCRAPED_DATA_DIR)
  .filter(file => file.startsWith('product_') && file.endsWith('.json'));

console.log(`📦 Total archivos encontrados: ${files.length}`);

// Agrupar por ID de producto (el número después de product_)
const grouped = {};

files.forEach(file => {
  const match = file.match(/product_(\d+|[A-Z0-9\-]+)_/);
  if (match) {
    const productId = match[1];
    if (!grouped[productId]) {
      grouped[productId] = [];
    }
    grouped[productId].push(file);
  }
});

console.log(`✓ Productos únicos encontrados: ${Object.keys(grouped).length}`);

// Para cada grupo, mantener solo el más reciente
let deletedCount = 0;

Object.entries(grouped).forEach(([productId, fileList]) => {
  if (fileList.length > 1) {
    // Ordenar por timestamp (está en el nombre del archivo)
    fileList.sort((a, b) => {
      const timeA = a.match(/(\d{4}-\d{2}-\d{2}T[\d:\-\.]+Z)/)?.[1] || '';
      const timeB = b.match(/(\d{4}-\d{2}-\d{2}T[\d:\-\.]+Z)/)?.[1] || '';
      return timeB.localeCompare(timeA); // Más reciente primero
    });
    
    // Eliminar todos excepto el primero (más reciente)
    const toDelete = fileList.slice(1);
    
    console.log(`\n📦 Producto ${productId}:`);
    console.log(`  ✓ Manteniendo: ${fileList[0]}`);
    
    toDelete.forEach(file => {
      const filePath = path.join(SCRAPED_DATA_DIR, file);
      fs.unlinkSync(filePath);
      console.log(`  ✗ Eliminado: ${file}`);
      deletedCount++;
    });
  }
});

console.log(`\n✅ Proceso completado`);
console.log(`📊 Archivos eliminados: ${deletedCount}`);
console.log(`📊 Archivos restantes: ${files.length - deletedCount}`);
