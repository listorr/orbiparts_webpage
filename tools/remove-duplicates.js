#!/usr/bin/env node

/**
 * Elimina productos duplicados del JSON del marketplace
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/lubricants-data.json');

console.log('🔧 Eliminando productos duplicados...\n');

// Leer datos actuales
const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

console.log(`📦 Total productos antes: ${data.products.length}`);

// Eliminar duplicados basándose en el nombre del producto
const seen = new Map();
const uniqueProducts = [];

data.products.forEach(product => {
  if (!seen.has(product.name)) {
    seen.set(product.name, true);
    uniqueProducts.push(product);
  }
});

console.log(`✓ Productos únicos: ${uniqueProducts.length}`);
console.log(`✗ Duplicados eliminados: ${data.products.length - uniqueProducts.length}`);

// Actualizar datos
data.products = uniqueProducts;
data.metadata.totalProducts = uniqueProducts.length;
data.metadata.updatedAt = new Date().toISOString();

// Guardar archivo actualizado
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

console.log(`\n✅ Archivo actualizado: ${DATA_FILE}`);
console.log(`📊 Total productos final: ${uniqueProducts.length}`);
