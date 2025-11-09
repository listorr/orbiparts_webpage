#!/usr/bin/env node

/**
 * Descarga las imágenes curadas manualmente para ORBIPARTS
 * Estas imágenes fueron seleccionadas específicamente por su relevancia
 * al negocio de trading de partes de aviones, motores, y servicios MRO
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../media-staging');

// Imágenes curadas manualmente de Pexels (sin watermarks, uso comercial OK)
const CURATED_IMAGES = {
	'top-10-aircraft-parts-suppliers-2025': {
		hero: 'https://images.pexels.com/photos/15497208/pexels-photo-15497208.jpeg?auto=compress&cs=tinysrgb&w=1920'
	},
	
	'future-of-legacy-aircraft': {
		hero: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1920',
		hangar: 'https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg?auto=compress&cs=tinysrgb&w=1920',
		cockpit: 'https://images.pexels.com/photos/46148/aircraft-cockpit-cockpit-instruments-46148.jpeg?auto=compress&cs=tinysrgb&w=1920',
		engineModule: 'https://images.pexels.com/photos/163810/cockpit-aircraft-f-16-jet-163810.jpeg?auto=compress&cs=tinysrgb&w=1920',
		turbine: 'https://images.pexels.com/photos/163852/jet-engine-engine-aircraft-turbine-163852.jpeg?auto=compress&cs=tinysrgb&w=1920',
		documentation: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1920'
	},
	
	'miami-aviation-logistics': {
		hero: 'https://images.pexels.com/photos/3862635/pexels-photo-3862635.jpeg?auto=compress&cs=tinysrgb&w=1920',
		ramp: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1920',
		port: 'https://images.pexels.com/photos/4440642/pexels-photo-4440642.jpeg?auto=compress&cs=tinysrgb&w=1920',
		warehouse: 'https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg?auto=compress&cs=tinysrgb&w=1920',
		it: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920'
	},
	
	'aog-response-strategies': {
		hero: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1920',
		nightShift: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1920',
		opsControl: 'https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=1920',
		freight: 'https://images.pexels.com/photos/3862140/pexels-photo-3862140.jpeg?auto=compress&cs=tinysrgb&w=1920'
	},
	
	'sustainable-aviation-component-trading': {
		hero: 'https://images.pexels.com/photos/46148/aircraft-airliner-airplane-aviation-46148.jpeg?auto=compress&cs=tinysrgb&w=1920',
		inspection: 'https://images.pexels.com/photos/2159228/pexels-photo-2159228.jpeg?auto=compress&cs=tinysrgb&w=1920',
		facility: 'https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg?auto=compress&cs=tinysrgb&w=1920',
		teardown: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1920'
	},
	
	'global-aircraft-parts-supply-chains': {
		hero: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920',
		cargoPallets: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1920',
		analytics: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1920'
	},
	
	'technology-trends-component-management': {
		hero: 'https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=1920',
		machineLearning: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920',
		robotics: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1920',
		stockDashboard: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1920'
	}
};

async function downloadImage(url, filepath) {
	try {
		const response = await fetch(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
				'Accept': 'image/*'
			}
		});

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

async function downloadAllCurated() {
	console.log('╔═══════════════════════════════════════════════════════════╗');
	console.log('║  📸 Downloading Curated ORBIPARTS Images                 ║');
	console.log('║  ✅ Sin watermarks | ✅ Uso comercial | ✅ Alta calidad  ║');
	console.log('╚═══════════════════════════════════════════════════════════╝\n');

	// Crear directorio
	if (fs.existsSync(OUTPUT_DIR)) {
		console.log('🧹 Limpiando directorio anterior...\n');
		fs.rmSync(OUTPUT_DIR, { recursive: true });
	}
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });

	let totalDownloaded = 0;
	let totalFailed = 0;
	let totalSize = 0;
	let totalImages = 0;

	// Contar total
	for (const blog in CURATED_IMAGES) {
		totalImages += Object.keys(CURATED_IMAGES[blog]).length;
	}

	console.log(`📊 Total de imágenes curadas: ${totalImages}\n`);

	// Descargar todas
	for (const [blogSlug, images] of Object.entries(CURATED_IMAGES)) {
		console.log(`\n📝 Blog: ${blogSlug}`);
		console.log('─'.repeat(60));

		for (const [imageName, url] of Object.entries(images)) {
			const filename = `${blogSlug}-${imageName}.jpg`;
			const filepath = path.join(OUTPUT_DIR, filename);

			console.log(`  ⬇️  ${imageName}...`);

			const result = await downloadImage(url, filepath);

			if (result.success) {
				console.log(`  ✓ ${filename} (${result.size} MB)`);
				totalDownloaded++;
				totalSize += parseFloat(result.size);
			} else {
				console.log(`  ✗ Error: ${result.error}`);
				totalFailed++;
			}

			// Pausa entre descargas
			await new Promise(resolve => setTimeout(resolve, 800));
		}
	}

	console.log('\n' + '═'.repeat(60));
	console.log('\n✅ Descarga completada!');
	console.log(`   Exitosas: ${totalDownloaded}/${totalImages}`);
	console.log(`   Tamaño total: ${totalSize.toFixed(2)} MB`);
	
	if (totalFailed > 0) {
		console.log(`   ⚠️  Fallidas: ${totalFailed}`);
	}
	
	console.log(`\n📁 Imágenes guardadas en: ${OUTPUT_DIR}`);
	console.log('\n📋 Siguiente paso:');
	console.log('   1. Revisa las imágenes en media-staging/');
	console.log('   2. Si te gustan, súbelas a Supabase:');
	console.log('      Ver: docs/supabase-media.md');
	console.log('   3. Después cambia VITE_USE_SUPABASE_MEDIA=true en .env\n');
}

downloadAllCurated().catch(console.error);
