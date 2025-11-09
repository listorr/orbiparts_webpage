#!/usr/bin/env node

/**
 * Script mejorado para descargar imágenes de aviación SIN marca de agua
 * Usa principalmente Pexels que NUNCA tiene marcas de agua
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../media-staging');

// Configuración de búsquedas por blog
const IMAGE_MANIFEST = {
	'top-10-aircraft-parts-suppliers-2025': {
		hero: { query: 'commercial aircraft warehouse' }
	},
	'future-of-legacy-aircraft': {
		hero: { query: 'vintage boeing 737 aircraft' },
		hangar: { query: 'aircraft maintenance hangar' },
		cockpit: { query: 'aircraft cockpit vintage' },
		engineModule: { query: 'jet engine turbine' },
		turbine: { query: 'aircraft turbine blades' },
		documentation: { query: 'aircraft maintenance documents' }
	},
	'miami-aviation-logistics': {
		hero: { query: 'miami airport cargo' },
		ramp: { query: 'airport ramp operations' },
		port: { query: 'cargo airport freight' },
		customs: { query: 'airport cargo inspection' },
		warehouse: { query: 'aircraft parts warehouse' },
		it: { query: 'aviation technology systems' },
		consolidation: { query: 'logistics warehouse' },
		energy: { query: 'airport infrastructure' }
	},
	'aog-response-strategies': {
		hero: { query: 'aircraft maintenance night' },
		nightShift: { query: 'aircraft mechanic working' },
		checklist: { query: 'aviation checklist inspection' },
		opsControl: { query: 'control center monitors' },
		standup: { query: 'team meeting aviation' },
		dashboards: { query: 'dashboard analytics screens' },
		freight: { query: 'air cargo loading' },
		rapidInstall: { query: 'aircraft engine maintenance' }
	},
	'sustainable-aviation-component-trading': {
		hero: { query: 'sustainable aviation green' },
		dashboard: { query: 'sustainability dashboard' },
		inspection: { query: 'aircraft component inspection' },
		facility: { query: 'aviation maintenance facility' },
		teardown: { query: 'aircraft disassembly' },
		documentation: { query: 'aviation certification documents' }
	},
	'global-aircraft-parts-supply-chains': {
		hero: { query: 'global logistics network' },
		documentControl: { query: 'business documents paperwork' },
		cargoPallets: { query: 'cargo pallets freight' },
		cloudInterface: { query: 'cloud technology digital' },
		analytics: { query: 'business analytics charts' },
		apiDiagram: { query: 'technology integration systems' }
	},
	'technology-trends-component-management': {
		hero: { query: 'aviation technology digital' },
		predictive: { query: 'data analytics technology' },
		machineLearning: { query: 'artificial intelligence technology' },
		robotics: { query: 'robotics automation' },
		stockDashboard: { query: 'inventory management dashboard' },
		systemIntegration: { query: 'system integration technology' },
		procurementApi: { query: 'digital software technology' },
		blockchain: { query: 'blockchain technology' }
	}
};

/**
 * Descarga desde Pexels (SIN marca de agua NUNCA, sin API key)
 */
async function downloadFromPexels(query, outputPath) {
	try {
		console.log(`  🔍 Searching Pexels for: "${query}"`);
		
		const searchUrl = `https://www.pexels.com/search/${encodeURIComponent(query)}/`;
		
		const response = await fetch(searchUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.5',
				'Referer': 'https://www.pexels.com/'
			}
		});
		
		const html = await response.text();
		
		// Buscar URLs de imágenes en el HTML
		// Pexels usa diferentes formatos, buscamos el de alta calidad
		const patterns = [
			/https:\/\/images\.pexels\.com\/photos\/\d+\/[^"']+\.jpeg\?[^"']*w=1920[^"']*/g,
			/https:\/\/images\.pexels\.com\/photos\/\d+\/[^"']+\.jpeg\?[^"']*h=1080[^"']*/g,
			/https:\/\/images\.pexels\.com\/photos\/\d+\/[^"']+\.jpeg/g
		];
		
		let imageUrl = null;
		
		for (const pattern of patterns) {
			const matches = html.match(pattern);
			if (matches && matches.length > 0) {
				// Tomar la primera imagen que encuentre
				imageUrl = matches[0];
				// Asegurar alta calidad
				if (!imageUrl.includes('w=1920')) {
					imageUrl = imageUrl.split('?')[0] + '?auto=compress&cs=tinysrgb&w=1920';
				}
				break;
			}
		}
		
		if (imageUrl) {
			console.log(`  ✓ Found image on Pexels`);
			console.log(`  📥 Downloading...`);
			
			const imageResponse = await fetch(imageUrl, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
					'Referer': 'https://www.pexels.com/'
				}
			});
			
			if (!imageResponse.ok) {
				throw new Error(`Failed to download: ${imageResponse.status}`);
			}
			
			const buffer = await imageResponse.arrayBuffer();
			fs.writeFileSync(outputPath, Buffer.from(buffer));
			
			console.log(`  ✅ Downloaded WITHOUT watermark (Pexels guarantee)`);
			return true;
		}
		
		console.log(`  ⚠️  No suitable image found`);
		return false;
		
	} catch (error) {
		console.log(`  ❌ Pexels error: ${error.message}`);
		return false;
	}
}

/**
 * Descarga desde Pixabay (sin marca de agua, sin API key)
 */
async function downloadFromPixabay(query, outputPath) {
	try {
		console.log(`  🔍 Trying Pixabay for: "${query}"`);
		
		const searchUrl = `https://pixabay.com/images/search/${encodeURIComponent(query)}/`;
		
		const response = await fetch(searchUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
			}
		});
		
		const html = await response.text();
		
		// Buscar URLs de imágenes de alta calidad
		const matches = html.match(/https:\/\/cdn\.pixabay\.com\/photo\/[^"']+_1280\.jpg/g);
		
		if (matches && matches.length > 0) {
			const imageUrl = matches[0];
			
			console.log(`  ✓ Found image on Pixabay`);
			console.log(`  📥 Downloading...`);
			
			const imageResponse = await fetch(imageUrl);
			const buffer = await imageResponse.arrayBuffer();
			fs.writeFileSync(outputPath, Buffer.from(buffer));
			
			console.log(`  ✅ Downloaded WITHOUT watermark (Pixabay guarantee)`);
			return true;
		}
		
		return false;
		
	} catch (error) {
		console.log(`  ❌ Pixabay error: ${error.message}`);
		return false;
	}
}

/**
 * Intenta descargar de múltiples fuentes
 */
async function downloadImage(query, outputPath) {
	console.log(`\n📸 Processing: ${path.basename(outputPath)}`);
	
	// Intentar Pexels primero (NUNCA tiene marca de agua)
	if (await downloadFromPexels(query, outputPath)) {
		return true;
	}
	
	// Pausa entre intentos
	await new Promise(resolve => setTimeout(resolve, 1000));
	
	// Si falla, intentar Pixabay
	if (await downloadFromPixabay(query, outputPath)) {
		return true;
	}
	
	console.log(`  ❌ Could not download image`);
	return false;
}

/**
 * Procesa todas las imágenes
 */
async function downloadAllImages() {
	// Limpiar y crear directorio
	if (fs.existsSync(OUTPUT_DIR)) {
		console.log('🗑️  Removing old images...\n');
		fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
	}
	
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	
	console.log('╔═══════════════════════════════════════════════════════════╗');
	console.log('║  🚀 Aviation Images Downloader (NO Watermarks!)          ║');
	console.log('╚═══════════════════════════════════════════════════════════╝\n');
	console.log(`📁 Output: ${OUTPUT_DIR}\n`);
	console.log('🌐 Sources: Pexels (primary), Pixabay (fallback)');
	console.log('✓  Both sources guarantee NO watermarks\n');
	
	let successCount = 0;
	let failCount = 0;
	
	for (const [blogSlug, images] of Object.entries(IMAGE_MANIFEST)) {
		console.log('\n' + '─'.repeat(60));
		console.log(`📝 Blog: ${blogSlug}`);
		console.log('─'.repeat(60));
		
		const blogDir = path.join(OUTPUT_DIR, blogSlug);
		fs.mkdirSync(blogDir, { recursive: true });
		
		for (const [imageName, config] of Object.entries(images)) {
			const outputPath = path.join(blogDir, `${imageName}.jpg`);
			
			const success = await downloadImage(config.query, outputPath);
			
			if (success) {
				successCount++;
			} else {
				failCount++;
			}
			
			// Pausa para no saturar servidores
			await new Promise(resolve => setTimeout(resolve, 2000));
		}
	}
	
	console.log('\n' + '═'.repeat(60));
	console.log('\n📊 Download Summary:');
	console.log(`   ✅ Success: ${successCount} images`);
	console.log(`   ❌ Failed: ${failCount} images`);
	console.log(`\n📁 Images saved to: ${OUTPUT_DIR}`);
	console.log('\n💡 Next steps:');
	console.log('   1. Review images in media-staging/');
	console.log('   2. Upload to Supabase Storage (bucket: blog-media)');
	console.log('   3. Set VITE_USE_SUPABASE_MEDIA=true in .env\n');
}

downloadAllImages().catch(console.error);
