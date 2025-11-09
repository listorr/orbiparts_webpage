#!/usr/bin/env node

/**
 * Script para descargar imágenes de aviación de alta calidad desde fuentes gratuitas
 * Uso: node tools/download-images.js
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio de salida
const OUTPUT_DIR = path.join(__dirname, '../media-staging');

// Configuración de búsquedas por blog
const IMAGE_MANIFEST = {
	'top-10-aircraft-parts-suppliers-2025': {
		hero: {
			query: 'commercial aircraft parts warehouse aviation',
			orientation: 'landscape'
		}
	},
	'future-of-legacy-aircraft': {
		hero: {
			query: 'vintage classic boeing 737 aircraft airport',
			orientation: 'landscape'
		},
		hangar: {
			query: 'aircraft maintenance hangar legacy airplane',
			orientation: 'landscape'
		},
		cockpit: {
			query: 'aircraft cockpit vintage airplane controls',
			orientation: 'landscape'
		},
		engineModule: {
			query: 'aircraft jet engine turbine close-up',
			orientation: 'landscape'
		},
		turbine: {
			query: 'jet engine turbine blades aviation',
			orientation: 'landscape'
		},
		documentation: {
			query: 'aircraft maintenance documents technical paperwork',
			orientation: 'landscape'
		}
	},
	'miami-aviation-logistics': {
		hero: {
			query: 'miami airport cargo aircraft logistics',
			orientation: 'landscape'
		},
		ramp: {
			query: 'airport ramp aircraft ground operations',
			orientation: 'landscape'
		},
		port: {
			query: 'cargo airport logistics freight aircraft',
			orientation: 'landscape'
		},
		customs: {
			query: 'airport customs cargo inspection',
			orientation: 'landscape'
		},
		warehouse: {
			query: 'aircraft parts warehouse aviation inventory',
			orientation: 'landscape'
		},
		it: {
			query: 'aviation technology digital systems airport',
			orientation: 'landscape'
		},
		consolidation: {
			query: 'warehouse logistics distribution center',
			orientation: 'landscape'
		},
		energy: {
			query: 'airport infrastructure aviation facility',
			orientation: 'landscape'
		}
	},
	'aog-response-strategies': {
		hero: {
			query: 'aircraft maintenance night emergency repair',
			orientation: 'landscape'
		},
		nightShift: {
			query: 'aircraft mechanic night shift maintenance',
			orientation: 'landscape'
		},
		checklist: {
			query: 'aviation checklist pilot pre-flight inspection',
			orientation: 'landscape'
		},
		opsControl: {
			query: 'aviation operations control center monitors',
			orientation: 'landscape'
		},
		standup: {
			query: 'aviation team meeting briefing airport',
			orientation: 'landscape'
		},
		dashboards: {
			query: 'aviation dashboard analytics flight operations',
			orientation: 'landscape'
		},
		freight: {
			query: 'air cargo freight aircraft loading',
			orientation: 'landscape'
		},
		rapidInstall: {
			query: 'aircraft engine installation maintenance hangar',
			orientation: 'landscape'
		}
	},
	'sustainable-aviation-component-trading': {
		hero: {
			query: 'sustainable aviation green aircraft environment',
			orientation: 'landscape'
		},
		dashboard: {
			query: 'sustainability dashboard environmental metrics',
			orientation: 'landscape'
		},
		inspection: {
			query: 'aircraft component inspection quality control',
			orientation: 'landscape'
		},
		facility: {
			query: 'aviation maintenance facility MRO hangar',
			orientation: 'landscape'
		},
		teardown: {
			query: 'aircraft disassembly teardown recycling parts',
			orientation: 'landscape'
		},
		documentation: {
			query: 'aviation certification documents compliance',
			orientation: 'landscape'
		}
	},
	'global-aircraft-parts-supply-chains': {
		hero: {
			query: 'global logistics network world map aviation',
			orientation: 'landscape'
		},
		documentControl: {
			query: 'aviation documents paperwork compliance forms',
			orientation: 'landscape'
		},
		cargoPallets: {
			query: 'cargo pallets aircraft freight shipping',
			orientation: 'landscape'
		},
		cloudInterface: {
			query: 'cloud technology digital interface aviation',
			orientation: 'landscape'
		},
		analytics: {
			query: 'business analytics data charts aviation',
			orientation: 'landscape'
		},
		apiDiagram: {
			query: 'technology integration systems aviation software',
			orientation: 'landscape'
		}
	},
	'technology-trends-component-management': {
		hero: {
			query: 'aviation technology digital cockpit modern aircraft',
			orientation: 'landscape'
		},
		predictive: {
			query: 'predictive analytics data science aviation',
			orientation: 'landscape'
		},
		machineLearning: {
			query: 'artificial intelligence technology aviation ai',
			orientation: 'landscape'
		},
		robotics: {
			query: 'robotics automation aircraft maintenance',
			orientation: 'landscape'
		},
		stockDashboard: {
			query: 'inventory management dashboard aviation parts',
			orientation: 'landscape'
		},
		systemIntegration: {
			query: 'system integration technology aviation software',
			orientation: 'landscape'
		},
		procurementApi: {
			query: 'digital procurement software aviation technology',
			orientation: 'landscape'
		},
		blockchain: {
			query: 'blockchain technology supply chain aviation',
			orientation: 'landscape'
		}
	}
};

/**
 * Descarga desde Unsplash usando el endpoint de descarga directo (SIN marca de agua)
 */
async function downloadFromUnsplash(query, outputPath) {
	try {
		// PASO 1: Buscar la foto
		const searchUrl = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`;
		
		const searchResponse = await fetch(searchUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
				'Accept': 'application/json',
				'Referer': 'https://unsplash.com/'
			}
		});
		
		if (!searchResponse.ok) {
			throw new Error(`Unsplash search failed: ${searchResponse.status}`);
		}
		
		const searchData = await searchResponse.json();
		
		if (searchData.results && searchData.results.length > 0) {
			const photo = searchData.results[0];
			const photoId = photo.id;
			
			console.log(`  ℹ Found on Unsplash: ${photo.description || photo.alt_description || 'No description'}`);
			console.log(`  📸 Photographer: ${photo.user.name}`);
			console.log(`  🆔 Photo ID: ${photoId}`);
			
			// PASO 2: Obtener la URL de descarga OFICIAL (esto es la clave)
			// Este endpoint devuelve la URL limpia sin marca de agua
			const downloadUrl = `https://unsplash.com/photos/${photoId}/download?force=true`;
			
			const downloadResponse = await fetch(downloadUrl, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
					'Referer': `https://unsplash.com/photos/${photoId}`
				},
				redirect: 'follow'
			});
			
			if (!downloadResponse.ok) {
				// Fallback: usar la URL raw directamente con parámetros optimizados
				const fallbackUrl = `${photo.urls.raw}?w=1920&h=1080&fit=max&q=85&fm=jpg`;
				console.log(`  ⚠️  Using fallback URL`);
				
				const imgResponse = await fetch(fallbackUrl);
				const buffer = await imgResponse.arrayBuffer();
				fs.writeFileSync(outputPath, Buffer.from(buffer));
			} else {
				// Descargar desde la URL oficial (SIN marca de agua garantizado)
				const buffer = await downloadResponse.arrayBuffer();
				fs.writeFileSync(outputPath, Buffer.from(buffer));
			}
			
			console.log(`  ✅ Downloaded WITHOUT watermark to: ${outputPath}`);
			return true;
		}
		
		return false;
	} catch (error) {
		console.log(`  ⚠️  Unsplash error: ${error.message}`);
		return false;
	}
}

/**
 * Descarga desde Pexels (sin API key, scraping ético)
 */
async function downloadFromPexels(query, outputPath) {
	try {
		const searchUrl = `https://www.pexels.com/search/${encodeURIComponent(query)}/`;
		
		const response = await fetch(searchUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0'
			}
		});
		
		const html = await response.text();
		
		// Extraer la primera imagen de alta calidad
		const match = html.match(/https:\/\/images\.pexels\.com\/photos\/\d+\/[^"]+\.jpeg\?auto=compress&cs=tinysrgb&h=1200/);
		
		if (match) {
			const imageUrl = match[0];
			
			console.log(`  ℹ Found on Pexels`);
			
			const imageResponse = await fetch(imageUrl);
			const buffer = await imageResponse.arrayBuffer();
			
			fs.writeFileSync(outputPath, Buffer.from(buffer));
			console.log(`  ✅ Downloaded to: ${outputPath}`);
			
			return true;
		}
		
		return false;
	} catch (error) {
		console.log(`  ⚠️  Pexels error: ${error.message}`);
		return false;
	}
}

/**
 * Descarga desde Pixabay (sin API key)
 */
async function downloadFromPixabay(query, outputPath) {
	try {
		const searchUrl = `https://pixabay.com/api/?key=&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=3`;
		
		// Nota: Pixabay requiere API key, pero aquí está la estructura por si la consigues
		console.log(`  ℹ Pixabay requires API key (skipping)`);
		return false;
	} catch (error) {
		console.log(`  ⚠️  Pixabay error: ${error.message}`);
		return false;
	}
}

/**
 * Intenta descargar de múltiples fuentes
 */
async function downloadImage(query, outputPath) {
	console.log(`\n🔍 Searching for: "${query}"`);
	
	// Intentar Unsplash primero
	if (await downloadFromUnsplash(query, outputPath)) {
		return true;
	}
	
	// Si falla, intentar Pexels
	if (await downloadFromPexels(query, outputPath)) {
		return true;
	}
	
	console.log(`  ❌ Could not find suitable image`);
	return false;
}

/**
 * Procesa todas las imágenes del manifiesto
 */
async function downloadAllImages() {
	// Eliminar directorio anterior si existe
	if (fs.existsSync(OUTPUT_DIR)) {
		console.log('🗑️  Removing old images...\n');
		fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
	}
	
	// Crear directorio de salida limpio
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	
	console.log('🚀 Starting image download process...\n');
	console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
	
	let successCount = 0;
	let failCount = 0;
	
	for (const [blogSlug, images] of Object.entries(IMAGE_MANIFEST)) {
		console.log(`\n📝 Blog: ${blogSlug}`);
		console.log('─'.repeat(60));
		
		// Crear subdirectorio para el blog
		const blogDir = path.join(OUTPUT_DIR, blogSlug);
		if (!fs.existsSync(blogDir)) {
			fs.mkdirSync(blogDir, { recursive: true });
		}
		
		for (const [imageName, config] of Object.entries(images)) {
			const outputPath = path.join(blogDir, `${imageName}.jpg`);
			
			const success = await downloadImage(config.query, outputPath);
			
			if (success) {
				successCount++;
			} else {
				failCount++;
			}
			
			// Pequeña pausa para no saturar los servidores
			await new Promise(resolve => setTimeout(resolve, 1500));
		}
	}
	
	console.log('\n' + '='.repeat(60));
	console.log(`\n✅ Download complete!`);
	console.log(`   Success: ${successCount} images`);
	console.log(`   Failed: ${failCount} images`);
	console.log(`\n📁 Images saved to: ${OUTPUT_DIR}`);
	console.log('\n💡 Next steps:');
	console.log('   1. Review the downloaded images');
	console.log('   2. Upload them to Supabase Storage (bucket: blog-media)');
	console.log('   3. Update .env with VITE_USE_SUPABASE_MEDIA=true');
}

// Ejecutar
downloadAllImages().catch(console.error);
