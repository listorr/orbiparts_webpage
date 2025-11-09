#!/usr/bin/env node

/**
 * Versión OPTIMIZADA para límite de API de Unsplash (50 requests/hora)
 * 1 búsqueda por slot con el término MÁS específico
 * 6 imágenes por búsqueda para tener opciones
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PREVIEW_FILE = path.join(__dirname, '../unsplash-preview.html');
const API_KEY = process.env.UNSPLASH_API_KEY;

// UNA búsqueda por slot, la MÁS específica
const IMAGE_SEARCHES = {
	'top-10-aircraft-parts-suppliers-2025': {
		hero: 'aircraft parts warehouse inventory'
	},
	
	'future-of-legacy-aircraft': {
		hero: 'boeing 737 classic aircraft',
		hangar: 'aircraft maintenance hangar MRO',
		cockpit: 'commercial aircraft cockpit instruments',
		engineModule: 'jet engine turbofan closeup',
		turbine: 'jet engine turbine blades',
		documentation: 'aviation maintenance documents logbook'
	},
	
	'miami-aviation-logistics': {
		hero: 'miami airport cargo operations',
		ramp: 'airport ramp operations ground handling',
		port: 'air cargo freight pallets loading',
		warehouse: 'aviation parts warehouse industrial',
		it: 'aviation technology control systems'
	},
	
	'aog-response-strategies': {
		hero: 'aircraft mechanic emergency repair urgent',
		nightShift: 'aircraft technician working maintenance',
		opsControl: 'aviation operations control center',
		freight: 'air cargo loading aircraft urgent'
	},
	
	'sustainable-aviation-component-trading': {
		hero: 'sustainable aviation green technology',
		inspection: 'aircraft component quality inspection',
		facility: 'aviation MRO facility modern',
		teardown: 'aircraft disassembly recycling parts'
	},
	
	'global-aircraft-parts-supply-chains': {
		hero: 'global logistics network worldwide',
		cargoPallets: 'cargo pallets freight shipping',
		analytics: 'business analytics dashboard data'
	},
	
	'technology-trends-component-management': {
		hero: 'modern aircraft cockpit technology digital',
		machineLearning: 'artificial intelligence AI technology',
		robotics: 'industrial robotics automation',
		stockDashboard: 'inventory management dashboard software'
	}
};

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
			if (response.status === 403) {
				throw new Error('Rate limit alcanzado (50 requests/hora). Espera 1 hora.');
			}
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const data = await response.json();
		
		return data.results.map(photo => ({
			id: photo.id,
			thumbnail: photo.urls.small,
			regular: photo.urls.regular,
			full: photo.urls.full,
			download: photo.links.download_location,
			photographer: photo.user.name,
			photographerUrl: photo.user.links.html,
			alt: photo.alt_description || query,
			description: photo.description || photo.alt_description || query
		}));

	} catch (error) {
		console.error(`  ✗ Error: ${error.message}`);
		if (error.message.includes('Rate limit')) {
			console.log('\n⏰ SOLUCIÓN: Espera 1 hora o usa la versión manual de imágenes.');
			process.exit(1);
		}
		return [];
	}
}

async function generatePreview() {
	console.log('╔═══════════════════════════════════════════════════════════╗');
	console.log('║  🔍 ORBIPARTS - Unsplash Optimizado (50 req/hora)       ║');
	console.log('╚═══════════════════════════════════════════════════════════╝\n');

	const allResults = {};
	let totalImages = 0;
	let requestCount = 0;

	// Contar requests totales
	const totalRequests = Object.values(IMAGE_SEARCHES).reduce((sum, blog) => 
		sum + Object.keys(blog).length, 0
	);

	console.log(`📊 Total de búsquedas a realizar: ${totalRequests}`);
	
	if (totalRequests > 50) {
		console.log(`⚠️  ADVERTENCIA: Esto superará el límite de 50 requests/hora`);
		console.log(`   Solo se procesarán los primeros 50 slots\n`);
	}

	for (const [blogSlug, slots] of Object.entries(IMAGE_SEARCHES)) {
		console.log(`\n📝 ${blogSlug}`);
		console.log('─'.repeat(60));
		
		allResults[blogSlug] = {};

		for (const [slotName, query] of Object.entries(slots)) {
			requestCount++;
			
			if (requestCount > 50) {
				console.log(`\n⚠️  Límite de 50 requests alcanzado. Deteniendo búsqueda.`);
				console.log(`   Espera 1 hora para continuar con los demás blogs.\n`);
				break;
			}

			console.log(`  [${requestCount}/50] 🔍 ${slotName}...`);
			
			const results = await searchUnsplash(query, 6);
			
			allResults[blogSlug][slotName] = {
				query: query,
				images: results
			};

			totalImages += results.length;
			console.log(`    ✓ ${results.length} imágenes encontradas`);

			// Rate limiting: esperar 1.2 segundos entre búsquedas
			await new Promise(resolve => setTimeout(resolve, 1200));
		}
		
		if (requestCount > 50) break;
	}

	console.log('\n' + '═'.repeat(60));
	console.log(`\n📊 Búsqueda completada:`);
	console.log(`   Requests utilizados: ${requestCount}/50`);
	console.log(`   Total de imágenes: ${totalImages}`);
	console.log(`\n🎨 Generando preview HTML...\n`);
	
	// [El resto del código HTML es igual...]
	let html = `
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ORBIPARTS - Unsplash Selector</title>
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
		.slot-query {
			font-size: 13px;
			color: #64748b;
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
			<h1>🛫 ORBIPARTS - Unsplash Selector</h1>
			<p style="color: #64748b; font-size: 18px; margin-bottom: 20px;">
				Imágenes de alta calidad sin watermarks. <strong>Requests usados: ${requestCount}/50 por hora</strong>
			</p>
			<div class="stats">
				<div class="stat-card">
					<div class="stat-number">${totalImages}</div>
					<div class="stat-label">Imágenes Encontradas</div>
				</div>
				<div class="stat-card">
					<div class="stat-number">${requestCount}</div>
					<div class="stat-label">Requests Usados/50</div>
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
					<div class="slot-query">Búsqueda: "${data.query}"</div>
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
				html += `<div class="no-results">⚠️ No se encontraron imágenes.</div>`;
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

				alert('✅ Selecciones guardadas!\\n\\nAhora ejecuta:\\nnode tools/download-from-unsplash.js');
			}
		</script>
	</div>
</body>
</html>
	`;

	fs.writeFileSync(PREVIEW_FILE, html);

	console.log('═'.repeat(60));
	console.log(`\n✅ Preview generado: ${PREVIEW_FILE}`);
	console.log(`\n🌐 Abriendo en navegador...\n`);
}

generatePreview().catch(console.error);
