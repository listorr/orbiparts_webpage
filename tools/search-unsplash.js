#!/usr/bin/env node

/**
 * Sistema avanzado de búsqueda de imágenes usando Unsplash API
 * Búsquedas ULTRA específicas para ORBIPARTS (aviación industrial, MRO, partes)
 * Sin watermarks, alta calidad, uso comercial permitido
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config(); // Cargar variables de entorno

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PREVIEW_FILE = path.join(__dirname, '../unsplash-preview.html');
const API_KEY = process.env.UNSPLASH_API_KEY;

// Búsquedas ULTRA específicas para cada slot de cada blog
const IMAGE_SEARCHES = {
	'top-10-aircraft-parts-suppliers-2025': {
		hero: [
			'aircraft parts warehouse inventory',
			'aerospace components storage',
			'aviation spare parts organized'
		]
	},
	
	'future-of-legacy-aircraft': {
		hero: [
			'boeing 737 classic aircraft',
			'commercial airliner vintage',
			'legacy aircraft maintenance'
		],
		hangar: [
			'aircraft maintenance hangar',
			'aviation MRO facility interior',
			'airplane repair workshop'
		],
		cockpit: [
			'commercial aircraft cockpit instruments',
			'boeing cockpit flight deck',
			'airplane cockpit controls'
		],
		engineModule: [
			'aircraft jet engine close up',
			'turbofan engine nacelle',
			'airplane engine maintenance'
		],
		turbine: [
			'jet engine turbine blades',
			'aircraft engine compressor',
			'turbine engine internals'
		],
		documentation: [
			'aviation maintenance documents',
			'aircraft logbook technical',
			'aviation paperwork inspection'
		]
	},
	
	'miami-aviation-logistics': {
		hero: [
			'miami airport cargo operations',
			'airport freight terminal loading',
			'aviation logistics warehouse'
		],
		ramp: [
			'airport ramp operations ground',
			'aircraft ground handling equipment',
			'airplane tarmac loading'
		],
		port: [
			'air cargo freight pallets',
			'airport cargo containers',
			'aviation shipping operations'
		],
		warehouse: [
			'aviation parts warehouse industrial',
			'aerospace logistics storage',
			'aircraft components inventory'
		],
		it: [
			'aviation technology systems digital',
			'airport operations control screens',
			'logistics software dashboard'
		]
	},
	
	'aog-response-strategies': {
		hero: [
			'aircraft mechanic emergency repair',
			'aviation technician working urgent',
			'airplane maintenance night shift'
		],
		nightShift: [
			'aircraft technician working hangar',
			'aviation mechanic tools equipment',
			'airplane maintenance professional'
		],
		opsControl: [
			'aviation operations control center',
			'airport operations room monitors',
			'flight operations control'
		],
		freight: [
			'air cargo loading aircraft',
			'freight pallets airplane cargo',
			'aviation shipping urgent'
		]
	},
	
	'sustainable-aviation-component-trading': {
		hero: [
			'sustainable aviation green aircraft',
			'modern commercial airplane efficient',
			'aviation environmental technology'
		],
		inspection: [
			'aircraft component quality inspection',
			'aviation parts quality control',
			'aerospace component testing'
		],
		facility: [
			'aviation MRO facility modern',
			'aircraft maintenance center clean',
			'aerospace repair facility'
		],
		teardown: [
			'aircraft disassembly recycling parts',
			'airplane teardown salvage',
			'aviation component recycling'
		]
	},
	
	'global-aircraft-parts-supply-chains': {
		hero: [
			'global logistics network world',
			'international shipping aviation',
			'worldwide aviation supply chain'
		],
		cargoPallets: [
			'cargo pallets freight shipping',
			'aviation logistics pallets',
			'air freight cargo containers'
		],
		analytics: [
			'business analytics dashboard data',
			'supply chain analytics graphs',
			'logistics data visualization'
		]
	},
	
	'technology-trends-component-management': {
		hero: [
			'modern aircraft cockpit technology',
			'aviation digital systems avionics',
			'airplane cockpit glass displays'
		],
		machineLearning: [
			'artificial intelligence technology AI',
			'machine learning data analytics',
			'AI technology neural network'
		],
		robotics: [
			'industrial robotics automation factory',
			'robotic arm manufacturing',
			'automated assembly line'
		],
		stockDashboard: [
			'inventory management dashboard software',
			'stock control system digital',
			'warehouse management technology'
		]
	}
};

/**
 * Busca imágenes en Unsplash usando la API oficial
 */
async function searchUnsplash(query, perPage = 6) {
	if (!API_KEY) {
		console.error('❌ UNSPLASH_API_KEY no encontrada en .env');
		process.exit(1);
	}

	try {
		const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
		
		const response = await fetch(url, {
			headers: {
				'Authorization': `Client-ID ${API_KEY}`
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const data = await response.json();
		
		return data.results.map(photo => ({
			id: photo.id,
			thumbnail: photo.urls.small,
			regular: photo.urls.regular,
			full: photo.urls.full,
			download: photo.links.download_location, // Para trackear descarga
			photographer: photo.user.name,
			photographerUrl: photo.user.links.html,
			alt: photo.alt_description || query,
			description: photo.description || photo.alt_description || query
		}));

	} catch (error) {
		console.error(`  ✗ Error searching "${query}": ${error.message}`);
		return [];
	}
}

/**
 * Genera HTML de preview con múltiples opciones
 */
async function generatePreview() {
	console.log('╔═══════════════════════════════════════════════════════════╗');
	console.log('║  🔍 ORBIPARTS - Unsplash Image Selector                 ║');
	console.log('║  ✅ Sin watermarks | ✅ Alta calidad | ✅ Uso comercial  ║');
	console.log('╚═══════════════════════════════════════════════════════════╝\n');

	const allResults = {};
	let totalImages = 0;
	let totalSearches = 0;

	// Realizar todas las búsquedas
	for (const [blogSlug, slots] of Object.entries(IMAGE_SEARCHES)) {
		console.log(`\n📝 Buscando imágenes para: ${blogSlug}`);
		console.log('─'.repeat(60));
		
		allResults[blogSlug] = {};

		for (const [slotName, queries] of Object.entries(slots)) {
			console.log(`  🔍 ${slotName}...`);
			
			allResults[blogSlug][slotName] = {
				queries: queries,
				images: []
			};

			// Buscar con cada query alternativa
			for (const query of queries) {
				totalSearches++;
				const results = await searchUnsplash(query, 3); // 3 imágenes por query
				
				if (results.length > 0) {
					allResults[blogSlug][slotName].images.push(...results);
					console.log(`    ✓ "${query}": ${results.length} imágenes`);
				} else {
					console.log(`    ○ "${query}": sin resultados`);
				}

				// Rate limiting: esperar entre búsquedas
				await new Promise(resolve => setTimeout(resolve, 1000));
			}

			const totalForSlot = allResults[blogSlug][slotName].images.length;
			totalImages += totalForSlot;
			console.log(`  ✅ Total para ${slotName}: ${totalForSlot} opciones`);
		}
	}

	console.log('\n' + '═'.repeat(60));
	console.log(`\n📊 Búsqueda completada:`);
	console.log(`   Total de búsquedas: ${totalSearches}`);
	console.log(`   Total de imágenes encontradas: ${totalImages}`);

	// Generar HTML
	console.log('\n🎨 Generando preview HTML...\n');
	
	let html = `
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ORBIPARTS - Unsplash Image Selector</title>
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			padding: 20px;
			min-height: 100vh;
		}
		.container { max-width: 1600px; margin: 0 auto; }
		.header {
			background: white;
			padding: 40px;
			border-radius: 16px;
			margin-bottom: 30px;
			box-shadow: 0 10px 30px rgba(0,0,0,0.2);
		}
		.header h1 {
			font-size: 36px;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			margin-bottom: 15px;
		}
		.stats {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 15px;
			margin-top: 20px;
		}
		.stat-card {
			background: #f8fafc;
			padding: 20px;
			border-radius: 12px;
			text-align: center;
		}
		.stat-number {
			font-size: 32px;
			font-weight: 700;
			color: #667eea;
		}
		.stat-label {
			font-size: 14px;
			color: #64748b;
			margin-top: 5px;
		}
		.blog-section {
			background: white;
			padding: 30px;
			border-radius: 16px;
			margin-bottom: 25px;
			box-shadow: 0 4px 12px rgba(0,0,0,0.1);
		}
		.blog-title {
			font-size: 26px;
			color: #1e293b;
			margin-bottom: 30px;
			padding-bottom: 15px;
			border-bottom: 3px solid #667eea;
		}
		.slot-section {
			margin-bottom: 40px;
		}
		.slot-header {
			background: #f8fafc;
			padding: 15px 20px;
			border-radius: 8px;
			margin-bottom: 15px;
			border-left: 4px solid #667eea;
		}
		.slot-title {
			font-size: 20px;
			font-weight: 600;
			color: #1e293b;
			margin-bottom: 8px;
		}
		.slot-queries {
			font-size: 13px;
			color: #64748b;
		}
		.query-tag {
			display: inline-block;
			background: #e0e7ff;
			color: #4338ca;
			padding: 4px 10px;
			border-radius: 12px;
			margin-right: 6px;
			margin-bottom: 4px;
		}
		.images-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
			gap: 20px;
		}
		.image-card {
			background: #f8fafc;
			border: 3px solid #e2e8f0;
			border-radius: 12px;
			overflow: hidden;
			transition: all 0.3s ease;
			cursor: pointer;
		}
		.image-card:hover {
			border-color: #667eea;
			transform: translateY(-4px);
			box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
		}
		.image-card.selected {
			border-color: #10b981;
			border-width: 4px;
			box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
		}
		.image-wrapper {
			position: relative;
			width: 100%;
			height: 200px;
			overflow: hidden;
			background: #e2e8f0;
		}
		.image-wrapper img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.selected-badge {
			position: absolute;
			top: 10px;
			right: 10px;
			background: #10b981;
			color: white;
			padding: 6px 12px;
			border-radius: 20px;
			font-size: 12px;
			font-weight: 600;
			box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
		}
		.image-info {
			padding: 15px;
		}
		.image-desc {
			font-size: 13px;
			color: #64748b;
			margin-bottom: 8px;
			line-height: 1.4;
			height: 40px;
			overflow: hidden;
		}
		.photographer {
			font-size: 11px;
			color: #94a3b8;
			margin-bottom: 10px;
		}
		.photographer a {
			color: #667eea;
			text-decoration: none;
		}
		.select-btn {
			width: 100%;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			border: none;
			padding: 10px;
			border-radius: 8px;
			font-size: 13px;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.3s ease;
		}
		.select-btn:hover {
			transform: scale(1.05);
		}
		.download-all-btn {
			position: fixed;
			bottom: 30px;
			right: 30px;
			background: linear-gradient(135deg, #10b981 0%, #059669 100%);
			color: white;
			border: none;
			padding: 18px 36px;
			border-radius: 50px;
			font-size: 18px;
			font-weight: 700;
			cursor: pointer;
			box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
			z-index: 1000;
			transition: all 0.3s ease;
		}
		.download-all-btn:hover {
			transform: scale(1.1);
		}
		.no-results {
			padding: 30px;
			text-align: center;
			color: #64748b;
			background: #fef3c7;
			border-radius: 8px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>🛫 ORBIPARTS - Unsplash Image Selector</h1>
			<p style="color: #64748b; font-size: 18px; margin-bottom: 20px;">
				Imágenes de alta calidad sin watermarks para tu blog de aviación.
				<strong>Selecciona la mejor opción para cada sección.</strong>
			</p>
			<div class="stats">
				<div class="stat-card">
					<div class="stat-number">${totalImages}</div>
					<div class="stat-label">Imágenes Encontradas</div>
				</div>
				<div class="stat-card">
					<div class="stat-number">${totalSearches}</div>
					<div class="stat-label">Búsquedas Realizadas</div>
				</div>
				<div class="stat-card">
					<div class="stat-number">100%</div>
					<div class="stat-label">Sin Watermarks</div>
				</div>
				<div class="stat-card">
					<div class="stat-number">✅</div>
					<div class="stat-label">Uso Comercial</div>
				</div>
			</div>
		</div>
`;

	// Generar secciones para cada blog
	for (const [blogSlug, slots] of Object.entries(allResults)) {
		const blogTitle = blogSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
		
		html += `
		<div class="blog-section">
			<h2 class="blog-title">${blogTitle}</h2>
		`;

		for (const [slotName, data] of Object.entries(slots)) {
			html += `
			<div class="slot-section">
				<div class="slot-header">
					<div class="slot-title">📸 ${slotName}</div>
					<div class="slot-queries">
						Búsquedas: ${data.queries.map(q => `<span class="query-tag">${q}</span>`).join('')}
					</div>
				</div>
			`;

			if (data.images.length > 0) {
				html += `<div class="images-grid">`;
				
				data.images.forEach((img, idx) => {
					html += `
					<div class="image-card" onclick="selectImage(this, '${blogSlug}', '${slotName}', '${img.regular}', '${img.download}')">
						<div class="image-wrapper">
							<img src="${img.thumbnail}" alt="${img.alt}" loading="lazy">
						</div>
						<div class="image-info">
							<div class="image-desc">${img.description}</div>
							<div class="photographer">
								📷 <a href="${img.photographerUrl}?utm_source=orbiparts&utm_medium=referral" target="_blank">${img.photographer}</a>
							</div>
							<button class="select-btn">✓ Seleccionar</button>
						</div>
					</div>
					`;
				});
				
				html += `</div>`;
			} else {
				html += `<div class="no-results">⚠️ No se encontraron imágenes. Intenta con términos más genéricos.</div>`;
			}

			html += `</div>`;
		}

		html += `</div>`;
	}

	html += `
		<button class="download-all-btn" onclick="downloadSelected()">
			⬇️ Descargar Seleccionadas (<span id="count">0</span>)
		</button>

		<script>
			const selections = {};
			const downloadEndpoints = {};

			function selectImage(element, blog, slot, url, downloadEndpoint) {
				const parent = element.parentElement;
				parent.querySelectorAll('.image-card').forEach(card => {
					card.classList.remove('selected');
					const badge = card.querySelector('.selected-badge');
					if (badge) badge.remove();
				});

				element.classList.add('selected');
				element.querySelector('.image-wrapper').innerHTML += '<div class="selected-badge">✓ Seleccionada</div>';

				if (!selections[blog]) selections[blog] = {};
				selections[blog][slot] = url;
				
				if (!downloadEndpoints[blog]) downloadEndpoints[blog] = {};
				downloadEndpoints[blog][slot] = downloadEndpoint;

				updateCount();
			}

			function updateCount() {
				let count = 0;
				for (const blog in selections) {
					count += Object.keys(selections[blog]).length;
				}
				document.getElementById('count').textContent = count;
			}

			function downloadSelected() {
				if (Object.keys(selections).length === 0) {
					alert('⚠️ No has seleccionado ninguna imagen');
					return;
				}

				const data = {
					selections: selections,
					downloadEndpoints: downloadEndpoints
				};

				const json = JSON.stringify(data, null, 2);
				const blob = new Blob([json], { type: 'application/json' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'unsplash-selections.json';
				a.click();

				alert(\`✅ Selecciones guardadas!\\n\\nAhora ejecuta:\\nnode tools/download-from-unsplash.js\`);
			}
		</script>
	</div>
</body>
</html>
	`;

	fs.writeFileSync(PREVIEW_FILE, html);

	console.log('═'.repeat(60));
	console.log(`\n✅ Preview generado exitosamente!`);
	console.log(`📁 Archivo: ${PREVIEW_FILE}`);
	console.log(`\n🌐 Abriendo en tu navegador...\n`);
}

generatePreview().catch(console.error);
