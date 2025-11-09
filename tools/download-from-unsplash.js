#!/usr/bin/env node

/**
 * Descarga las imágenes seleccionadas desde Unsplash
 * Usa los download endpoints para notificar a Unsplash (requerido por sus términos)
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../media-staging');
const SELECTIONS_FILE = path.join(__dirname, '../unsplash-selections.json');
const API_KEY = process.env.UNSPLASH_API_KEY;

/**
 * Notifica a Unsplash de la descarga (requerido por sus términos de API)
 */
async function triggerDownload(downloadEndpoint) {
	try {
		await fetch(downloadEndpoint, {
			headers: {
				'Authorization': `Client-ID ${API_KEY}`
			}
		});
	} catch (error) {
		console.log(`    ⚠️ No se pudo notificar descarga: ${error.message}`);
	}
}

/**
 * Descarga una imagen
 */
async function downloadImage(url, filepath) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const buffer = await response.buffer();
		fs.writeFileSync(filepath, buffer);

		const stats = fs.statSync(filepath);
		const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

		return { success: true, size: sizeMB };
	} catch (error) {
		return { success: false, error: error.message };
	}
}

async function downloadSelected() {
	console.log('╔═══════════════════════════════════════════════════════════╗');
	console.log('║  ⬇️  Descargando Imágenes de Unsplash                    ║');
	console.log('╚═══════════════════════════════════════════════════════════╝\n');

	if (!API_KEY) {
		console.error('❌ UNSPLASH_API_KEY no encontrada en .env');
		process.exit(1);
	}

	if (!fs.existsSync(SELECTIONS_FILE)) {
		console.error('❌ No se encontró unsplash-selections.json');
		console.log('\n💡 Primero ejecuta: node tools/search-unsplash.js');
		console.log('   Y selecciona imágenes en el navegador\n');
		process.exit(1);
	}

	const data = JSON.parse(fs.readFileSync(SELECTIONS_FILE, 'utf8'));
	const { selections, downloadEndpoints } = data;

	// Crear directorio
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	} else {
		console.log('🧹 Limpiando directorio anterior...\n');
		const files = fs.readdirSync(OUTPUT_DIR);
		files.forEach(file => {
			fs.unlinkSync(path.join(OUTPUT_DIR, file));
		});
	}

	let downloaded = 0;
	let failed = 0;
	let totalSize = 0;
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

			// Notificar a Unsplash (requerido por sus términos)
			if (downloadEndpoints[blogSlug] && downloadEndpoints[blogSlug][imageName]) {
				await triggerDownload(downloadEndpoints[blogSlug][imageName]);
			}

			// Descargar imagen
			const result = await downloadImage(url, filepath);

			if (result.success) {
				console.log(`  ✓ ${filename} (${result.size} MB)`);
				downloaded++;
				totalSize += parseFloat(result.size);
			} else {
				console.log(`  ✗ Error: ${result.error}`);
				failed++;
			}

			// Pausa entre descargas
			await new Promise(resolve => setTimeout(resolve, 800));
		}
	}

	console.log('\n' + '═'.repeat(60));
	console.log('\n✅ Descarga completada!');
	console.log(`   Exitosas: ${downloaded}/${total}`);
	console.log(`   Tamaño total: ${totalSize.toFixed(2)} MB`);

	if (failed > 0) {
		console.log(`   ⚠️  Fallidas: ${failed}`);
	}

	console.log(`\n📁 Imágenes guardadas en: ${OUTPUT_DIR}`);
	console.log('\n📋 Siguiente paso:');
	console.log('   1. Revisa las imágenes en media-staging/');
	console.log('   2. Súbelas a Supabase Storage:');
	console.log('      - Ve a https://supabase.com/dashboard/project/fjhynjjirvcyeahmlopq/storage/buckets/blog-media');
	console.log('      - Sube todas las imágenes');
	console.log('   3. Cambia VITE_USE_SUPABASE_MEDIA=true en .env');
	console.log('   4. Reinicia el servidor: npm run dev\n');
	console.log('💡 Atribución: Las fotos de Unsplash requieren atribución al fotógrafo');
	console.log('   (opcional pero recomendado). Ya están incluidas en los alt tags.\n');
}

downloadSelected().catch(console.error);
