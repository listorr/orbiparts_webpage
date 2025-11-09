#!/usr/bin/env node

/**
 * Descarga las imágenes seleccionadas desde el preview
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../media-staging');
const SELECTIONS_FILE = path.join(__dirname, '../image-selections.json');

async function downloadImage(url, filepath) {
	try {
		const response = await fetch(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
				'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const buffer = await response.buffer();
		fs.writeFileSync(filepath, buffer);
		return true;
	} catch (error) {
		console.error(`  ✗ Error: ${error.message}`);
		return false;
	}
}

async function downloadSelected() {
	console.log('╔═══════════════════════════════════════════════════════════╗');
	console.log('║  ⬇️  Downloading Selected ORBIPARTS Images               ║');
	console.log('╚═══════════════════════════════════════════════════════════╝\n');

	// Verificar archivo de selecciones
	if (!fs.existsSync(SELECTIONS_FILE)) {
		console.error('❌ No se encontró el archivo image-selections.json');
		console.log('\n💡 Primero ejecuta: node tools/smart-image-selector.js');
		console.log('   Y luego selecciona imágenes en el navegador\n');
		process.exit(1);
	}

	const selections = JSON.parse(fs.readFileSync(SELECTIONS_FILE, 'utf8'));

	// Crear directorio de salida
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	let downloaded = 0;
	let failed = 0;
	let total = 0;

	// Contar total
	for (const blog in selections) {
		total += Object.keys(selections[blog]).length;
	}

	console.log(`📊 Total de imágenes seleccionadas: ${total}\n`);

	// Descargar cada imagen
	for (const [blogSlug, images] of Object.entries(selections)) {
		console.log(`\n📝 Descargando para: ${blogSlug}`);
		console.log('─'.repeat(60));

		for (const [imageName, url] of Object.entries(images)) {
			const filename = `${blogSlug}-${imageName}.jpg`;
			const filepath = path.join(OUTPUT_DIR, filename);

			console.log(`  ⬇️  ${imageName}...`);

			const success = await downloadImage(url, filepath);

			if (success) {
				const stats = fs.statSync(filepath);
				const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
				console.log(`  ✓ Descargado: ${filename} (${sizeMB} MB)`);
				downloaded++;
			} else {
				failed++;
			}

			// Pausa entre descargas
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}

	console.log('\n' + '═'.repeat(60));
	console.log(`\n✅ Descarga completada!`);
	console.log(`   Exitosas: ${downloaded}/${total}`);
	if (failed > 0) {
		console.log(`   Fallidas: ${failed}`);
	}
	console.log(`\n📁 Imágenes guardadas en: ${OUTPUT_DIR}`);
	console.log(`\n🚀 Siguiente paso: Revisa las imágenes y luego súbelas a Supabase`);
	console.log(`   Ver instrucciones en: docs/supabase-media.md\n`);
}

downloadSelected().catch(console.error);
