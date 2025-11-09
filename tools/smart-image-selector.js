#!/usr/bin/env node

/**
 * Sistema inteligente de selección de imágenes para ORBIPARTS
 * 1. Busca múltiples opciones
 * 2. Genera preview HTML para revisión
 * 3. Solo descarga después de aprobación
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../media-staging');
const PREVIEW_FILE = path.join(__dirname, '../image-preview.html');

// Búsquedas MEJORADAS y específicas para ORBIPARTS
const IMAGE_MANIFEST = {
	'top-10-aircraft-parts-suppliers-2025': {
		hero: {
			query: 'aircraft parts warehouse aviation components',
			context: 'Almacén de partes de aviones, componentes aeronáuticos, inventario de aviación',
			keywords: ['aircraft parts', 'aviation warehouse', 'airplane components', 'aerospace inventory']
		}
	},
	'future-of-legacy-aircraft': {
		hero: {
			query: 'boeing 737 classic vintage commercial aircraft airport',
			context: 'Boeing 737 clásico, avión comercial vintage, aeronaves antiguas en servicio',
			keywords: ['boeing 737', 'vintage aircraft', 'legacy airplane', 'old commercial jet']
		},
		hangar: {
			query: 'aircraft maintenance hangar MRO facility',
			context: 'Hangar de mantenimiento, instalaciones MRO, taller de aviones',
			keywords: ['aircraft hangar', 'MRO facility', 'maintenance hangar', 'airplane workshop']
		},
		cockpit: {
			query: 'commercial aircraft cockpit flight deck instruments',
			context: 'Cabina de avión comercial, controles de vuelo, instrumentos',
			keywords: ['aircraft cockpit', 'flight deck', 'airplane controls', 'pilot instruments']
		},
		engineModule: {
			query: 'jet engine turbofan aircraft powerplant maintenance',
			context: 'Motor de avión a reacción, turbofan, powerplant en mantenimiento',
			keywords: ['jet engine', 'turbofan', 'aircraft engine', 'airplane motor']
		},
		turbine: {
			query: 'jet engine turbine blades compressor aviation',
			context: 'Álabes de turbina, compresor de motor jet, componentes internos',
			keywords: ['turbine blades', 'jet engine blades', 'compressor', 'engine internals']
		},
		documentation: {
			query: 'aircraft maintenance logbook technical documents aviation paperwork',
			context: 'Documentación técnica de aviación, logbook, papeles de mantenimiento',
			keywords: ['aircraft logbook', 'maintenance documents', 'aviation paperwork', 'technical records']
		}
	},
	'miami-aviation-logistics': {
		hero: {
			query: 'miami airport cargo terminal freight aircraft',
			context: 'Terminal de carga de Miami, operaciones de carga aérea',
			keywords: ['miami airport', 'cargo terminal', 'freight operations', 'air cargo']
		},
		ramp: {
			query: 'airport ramp aircraft ground operations loading',
			context: 'Rampa de aeropuerto, operaciones en tierra, carga de aviones',
			keywords: ['airport ramp', 'ground operations', 'aircraft loading', 'ramp operations']
		},
		port: {
			query: 'air cargo freight aircraft logistics shipping',
			context: 'Carga aérea, logística de aviación, transporte de mercancías',
			keywords: ['air freight', 'cargo aircraft', 'aviation logistics', 'air shipping']
		},
		customs: {
			query: 'airport customs cargo inspection freight clearance',
			context: 'Aduana aeroportuaria, inspección de carga, despacho',
			keywords: ['customs inspection', 'cargo clearance', 'airport customs', 'freight inspection']
		},
		warehouse: {
			query: 'aircraft parts warehouse aviation components storage',
			context: 'Almacén de partes de aviones, componentes aeronáuticos',
			keywords: ['parts warehouse', 'aviation storage', 'aircraft components', 'spare parts']
		},
		it: {
			query: 'aviation technology digital systems flight operations',
			context: 'Tecnología de aviación, sistemas digitales, operaciones',
			keywords: ['aviation tech', 'flight systems', 'aviation software', 'digital aviation']
		},
		consolidation: {
			query: 'logistics warehouse distribution center freight',
			context: 'Centro de distribución logística, almacén de consolidación',
			keywords: ['distribution center', 'logistics warehouse', 'freight consolidation', 'shipping hub']
		},
		energy: {
			query: 'airport infrastructure facility aviation terminal',
			context: 'Infraestructura aeroportuaria, instalaciones de aviación',
			keywords: ['airport infrastructure', 'aviation facility', 'airport terminal', 'aviation building']
		}
	},
	'aog-response-strategies': {
		hero: {
			query: 'aircraft emergency maintenance night repair mechanic urgent',
			context: 'Mantenimiento urgente de aeronave, reparación nocturna AOG',
			keywords: ['emergency maintenance', 'aircraft repair', 'urgent service', 'AOG response']
		},
		nightShift: {
			query: 'aircraft mechanic working night maintenance technician',
			context: 'Mecánico de aviación trabajando turno nocturno',
			keywords: ['aircraft mechanic', 'aviation technician', 'maintenance worker', 'airplane repair']
		},
		checklist: {
			query: 'aviation pre-flight checklist pilot inspection procedure',
			context: 'Checklist de aviación, inspección pre-vuelo',
			keywords: ['aviation checklist', 'pre-flight inspection', 'aircraft inspection', 'maintenance checklist']
		},
		opsControl: {
			query: 'aviation operations control center flight dispatch monitors',
			context: 'Centro de control de operaciones aéreas, despacho de vuelos',
			keywords: ['operations center', 'flight control', 'dispatch center', 'aviation operations']
		},
		standup: {
			query: 'aviation team meeting briefing airport staff',
			context: 'Reunión de equipo de aviación, briefing de operaciones',
			keywords: ['aviation meeting', 'team briefing', 'airport staff', 'operations meeting']
		},
		dashboards: {
			query: 'aviation flight operations dashboard monitoring screens analytics',
			context: 'Dashboard de operaciones de vuelo, monitoreo de aviación',
			keywords: ['flight dashboard', 'aviation analytics', 'operations monitoring', 'flight tracking']
		},
		freight: {
			query: 'air cargo loading freight aircraft pallets shipping',
			context: 'Carga aérea, cargando avión de carga, pallets',
			keywords: ['cargo loading', 'freight aircraft', 'air shipping', 'cargo pallets']
		},
		rapidInstall: {
			query: 'aircraft engine installation replacement maintenance hangar',
			context: 'Instalación de motor de avión, reemplazo de motor, hangar',
			keywords: ['engine installation', 'aircraft maintenance', 'engine replacement', 'powerplant change']
		}
	},
	'sustainable-aviation-component-trading': {
		hero: {
			query: 'sustainable aviation green aircraft eco-friendly flight',
			context: 'Aviación sostenible, vuelo eco-amigable, verde',
			keywords: ['sustainable aviation', 'green flight', 'eco aviation', 'sustainable aircraft']
		},
		dashboard: {
			query: 'sustainability metrics dashboard environmental data ESG',
			context: 'Dashboard de métricas de sostenibilidad, datos ambientales',
			keywords: ['sustainability dashboard', 'environmental metrics', 'ESG data', 'green metrics']
		},
		inspection: {
			query: 'aircraft component inspection quality control parts',
			context: 'Inspección de componentes de avión, control de calidad',
			keywords: ['component inspection', 'quality control', 'parts inspection', 'aircraft components']
		},
		facility: {
			query: 'aviation MRO facility maintenance hangar repair shop',
			context: 'Instalación MRO, hangar de mantenimiento, taller',
			keywords: ['MRO facility', 'maintenance hangar', 'repair facility', 'aviation workshop']
		},
		teardown: {
			query: 'aircraft disassembly teardown parts recycling salvage',
			context: 'Desmontaje de avión, reciclaje de partes, salvamento',
			keywords: ['aircraft teardown', 'plane disassembly', 'parts recycling', 'aircraft salvage']
		},
		documentation: {
			query: 'aviation certification documents compliance airworthiness',
			context: 'Documentos de certificación de aviación, aeronavegabilidad',
			keywords: ['aviation certification', 'airworthiness', 'compliance documents', 'FAA certification']
		}
	},
	'global-aircraft-parts-supply-chains': {
		hero: {
			query: 'global logistics network world map aviation supply chain',
			context: 'Red logística global, cadena de suministro de aviación mundial',
			keywords: ['global logistics', 'supply chain', 'worldwide network', 'aviation logistics']
		},
		documentControl: {
			query: 'aviation documents paperwork compliance forms certificates',
			context: 'Documentos de aviación, papeleo de cumplimiento, certificados',
			keywords: ['aviation documents', 'compliance paperwork', 'certificates', 'aviation forms']
		},
		cargoPallets: {
			query: 'cargo pallets freight shipping aircraft loading',
			context: 'Pallets de carga, envío de mercancías, carga de aviones',
			keywords: ['cargo pallets', 'freight pallets', 'shipping cargo', 'air freight']
		},
		cloudInterface: {
			query: 'cloud technology digital interface software aviation',
			context: 'Tecnología cloud, interfaz digital para aviación',
			keywords: ['cloud technology', 'digital interface', 'aviation software', 'cloud computing']
		},
		analytics: {
			query: 'business analytics data charts aviation metrics dashboard',
			context: 'Análisis de negocio, métricas de aviación, dashboard',
			keywords: ['business analytics', 'aviation metrics', 'data analysis', 'performance dashboard']
		},
		apiDiagram: {
			query: 'technology integration systems aviation software API',
			context: 'Integración de sistemas tecnológicos, software de aviación',
			keywords: ['system integration', 'aviation software', 'API technology', 'software systems']
		}
	},
	'technology-trends-component-management': {
		hero: {
			query: 'aviation technology digital cockpit modern aircraft systems',
			context: 'Tecnología de aviación, cabina digital, sistemas modernos',
			keywords: ['aviation technology', 'digital cockpit', 'modern avionics', 'aircraft systems']
		},
		predictive: {
			query: 'predictive analytics aviation data science maintenance',
			context: 'Analítica predictiva para mantenimiento de aviación',
			keywords: ['predictive analytics', 'aviation data', 'predictive maintenance', 'data science']
		},
		machineLearning: {
			query: 'artificial intelligence AI aviation technology machine learning',
			context: 'Inteligencia artificial aplicada a aviación',
			keywords: ['artificial intelligence', 'AI aviation', 'machine learning', 'aviation AI']
		},
		robotics: {
			query: 'robotics automation aircraft maintenance manufacturing',
			context: 'Robótica en mantenimiento de aviones, automatización',
			keywords: ['robotics aviation', 'automation', 'aircraft robotics', 'manufacturing automation']
		},
		stockDashboard: {
			query: 'inventory management dashboard aviation parts stock',
			context: 'Dashboard de gestión de inventario de partes de avión',
			keywords: ['inventory dashboard', 'stock management', 'parts inventory', 'aviation stock']
		},
		systemIntegration: {
			query: 'system integration technology aviation software enterprise',
			context: 'Integración de sistemas empresariales de aviación',
			keywords: ['system integration', 'aviation software', 'enterprise systems', 'software integration']
		},
		procurementApi: {
			query: 'digital procurement software aviation technology purchasing',
			context: 'Software de procurement digital para aviación',
			keywords: ['procurement software', 'aviation purchasing', 'digital procurement', 'supply software']
		},
		blockchain: {
			query: 'blockchain technology supply chain aviation traceability',
			context: 'Blockchain para trazabilidad en cadena de suministro de aviación',
			keywords: ['blockchain aviation', 'supply chain blockchain', 'traceability', 'blockchain supply']
		}
	}
};

/**
 * Busca múltiples opciones en Pexels usando API oficial (sin watermarks)
 * Obtén tu API key gratis en: https://www.pexels.com/api/
 */
async function searchPexelsImages(query, keywords, count = 5) {
	const apiKey = process.env.PEXELS_API_KEY;
	
	if (!apiKey) {
		console.log('  ⚠️  PEXELS_API_KEY no configurada. Usa URLs manuales o configura la API key.');
		return [];
	}
	
	try {
		const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
		
		const response = await fetch(searchUrl, {
			headers: {
				'Authorization': apiKey
			}
		});
		
		if (!response.ok) {
			console.log(`  ⚠️  API error: ${response.status}`);
			return [];
		}
		
		const data = await response.json();
		
		if (!data.photos || data.photos.length === 0) {
			return [];
		}
		
		return data.photos.map(photo => ({
			thumbnail: photo.src.medium,
			full: photo.src.original,
			source: 'Pexels',
			photographer: photo.photographer,
			alt: photo.alt || query
		}));
		
	} catch (error) {
		console.error(`  ✗ Error: ${error.message}`);
		return [];
	}
}

/**
 * Genera HTML de preview para revisión
 */
async function generatePreview() {
	console.log('╔═══════════════════════════════════════════════════════════╗');
	console.log('║  🔍 ORBIPARTS Image Search & Selection System           ║');
	console.log('╚═══════════════════════════════════════════════════════════╝\n');
	
	let htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ORBIPARTS - Image Selection Preview</title>
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			background: #f5f5f5;
			padding: 20px;
		}
		.header {
			background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
			color: white;
			padding: 30px;
			border-radius: 12px;
			margin-bottom: 30px;
			box-shadow: 0 4px 6px rgba(0,0,0,0.1);
		}
		.header h1 { font-size: 28px; margin-bottom: 10px; }
		.header p { opacity: 0.9; font-size: 16px; }
		.blog-section {
			background: white;
			padding: 25px;
			margin-bottom: 30px;
			border-radius: 12px;
			box-shadow: 0 2px 4px rgba(0,0,0,0.05);
		}
		.blog-title {
			font-size: 24px;
			color: #1e40af;
			margin-bottom: 20px;
			padding-bottom: 15px;
			border-bottom: 3px solid #3b82f6;
		}
		.image-slot {
			margin-bottom: 40px;
		}
		.slot-header {
			background: #f8fafc;
			padding: 15px;
			border-radius: 8px;
			margin-bottom: 15px;
		}
		.slot-title {
			font-size: 18px;
			font-weight: 600;
			color: #1e293b;
			margin-bottom: 8px;
		}
		.slot-context {
			font-size: 14px;
			color: #64748b;
			margin-bottom: 8px;
		}
		.slot-keywords {
			font-size: 12px;
			color: #94a3b8;
		}
		.keyword-tag {
			display: inline-block;
			background: #e0e7ff;
			color: #3730a3;
			padding: 4px 10px;
			border-radius: 12px;
			margin-right: 6px;
			margin-bottom: 4px;
		}
		.images-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 20px;
		}
		.image-option {
			border: 3px solid #e2e8f0;
			border-radius: 8px;
			overflow: hidden;
			cursor: pointer;
			transition: all 0.3s ease;
			position: relative;
		}
		.image-option:hover {
			border-color: #3b82f6;
			box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
			transform: translateY(-4px);
		}
		.image-option.selected {
			border-color: #10b981;
			border-width: 4px;
		}
		.image-option img {
			width: 100%;
			height: 200px;
			object-fit: cover;
			display: block;
		}
		.image-info {
			padding: 12px;
			background: white;
		}
		.source-badge {
			display: inline-block;
			background: #10b981;
			color: white;
			padding: 4px 10px;
			border-radius: 12px;
			font-size: 11px;
			font-weight: 600;
		}
		.select-btn {
			background: #3b82f6;
			color: white;
			border: none;
			padding: 8px 16px;
			border-radius: 6px;
			cursor: pointer;
			font-size: 13px;
			font-weight: 600;
			margin-top: 8px;
			width: 100%;
		}
		.select-btn:hover { background: #2563eb; }
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
		.no-results {
			padding: 40px;
			text-align: center;
			color: #64748b;
			background: #f8fafc;
			border-radius: 8px;
		}
		.download-btn {
			position: fixed;
			bottom: 30px;
			right: 30px;
			background: #10b981;
			color: white;
			border: none;
			padding: 16px 32px;
			border-radius: 30px;
			font-size: 16px;
			font-weight: 600;
			cursor: pointer;
			box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
			z-index: 1000;
		}
		.download-btn:hover { background: #059669; transform: scale(1.05); }
		.stats {
			background: #f0f9ff;
			padding: 15px;
			border-radius: 8px;
			margin-top: 20px;
			border-left: 4px solid #3b82f6;
		}
	</style>
</head>
<body>
	<div class="header">
		<h1>🛫 ORBIPARTS - Selección de Imágenes</h1>
		<p>Revisa y selecciona las mejores imágenes para cada sección del blog</p>
		<div class="stats">
			<strong>📊 Contexto ORBIPARTS:</strong> Distribuidor de partes de aeronaves, componentes de motores, 
			servicios MRO, logística de aviación, trading de helicópteros, software de procurement
		</div>
	</div>
`;

	let totalImages = 0;
	let totalSlots = 0;
	
	for (const [blogSlug, images] of Object.entries(IMAGE_MANIFEST)) {
		console.log(`\n📝 Searching images for: ${blogSlug}`);
		console.log('─'.repeat(60));
		
		const blogTitle = blogSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
		htmlContent += `<div class="blog-section"><h2 class="blog-title">${blogTitle}</h2>`;
		
		for (const [imageName, config] of Object.entries(images)) {
			totalSlots++;
			console.log(`  🔍 Searching: ${imageName}...`);
			
			const results = await searchPexelsImages(config.query, config.keywords);
			totalImages += results.length;
			
			htmlContent += `
			<div class="image-slot">
				<div class="slot-header">
					<div class="slot-title">📸 ${imageName}</div>
					<div class="slot-context"><strong>Contexto:</strong> ${config.context}</div>
					<div class="slot-keywords">
						<strong>Keywords:</strong> 
						${config.keywords.map(kw => `<span class="keyword-tag">${kw}</span>`).join('')}
					</div>
				</div>
			`;
			
			if (results.length > 0) {
				htmlContent += `<div class="images-grid">`;
				results.forEach((img, idx) => {
					htmlContent += `
					<div class="image-option" onclick="selectImage(this, '${blogSlug}', '${imageName}', '${img.full}')">
						<img src="${img.thumbnail}" alt="${imageName}" loading="lazy">
						<div class="image-info">
							<span class="source-badge">${img.source}</span>
							<button class="select-btn">✓ Seleccionar esta imagen</button>
						</div>
					</div>
					`;
				});
				htmlContent += `</div>`;
				console.log(`  ✓ Found ${results.length} options`);
			} else {
				htmlContent += `<div class="no-results">⚠️ No se encontraron imágenes relevantes. Intenta con otros términos de búsqueda.</div>`;
				console.log(`  ✗ No results found`);
			}
			
			htmlContent += `</div>`;
			
			// Pausa entre búsquedas
			await new Promise(resolve => setTimeout(resolve, 1500));
		}
		
		htmlContent += `</div>`;
	}

	htmlContent += `
	<button class="download-btn" onclick="downloadSelected()">
		⬇️ Descargar Seleccionadas (<span id="count">0</span>)
	</button>
	
	<script>
		const selections = {};
		
		function selectImage(element, blog, slot, url) {
			// Deseleccionar otras en el mismo slot
			const parent = element.parentElement;
			parent.querySelectorAll('.image-option').forEach(img => {
				img.classList.remove('selected');
				const badge = img.querySelector('.selected-badge');
				if (badge) badge.remove();
			});
			
			// Seleccionar esta
			element.classList.add('selected');
			element.innerHTML += '<div class="selected-badge">✓ Seleccionada</div>';
			
			// Guardar selección
			if (!selections[blog]) selections[blog] = {};
			selections[blog][slot] = url;
			
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
			
			// Generar JSON con selecciones
			const json = JSON.stringify(selections, null, 2);
			const blob = new Blob([json], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'image-selections.json';
			a.click();
			
			alert('✅ Archivo de selecciones descargado. Ahora ejecuta:\\nnode tools/download-selected.js');
		}
	</script>
</body>
</html>
`;

	fs.writeFileSync(PREVIEW_FILE, htmlContent);
	
	console.log('\n' + '═'.repeat(60));
	console.log(`\n✅ Preview generado exitosamente!`);
	console.log(`📊 Total: ${totalImages} opciones para ${totalSlots} slots`);
	console.log(`\n📁 Archivo: ${PREVIEW_FILE}`);
	console.log(`\n🌐 Abre el archivo en tu navegador para revisar y seleccionar las imágenes`);
	console.log(`\n💡 Después de seleccionar, descarga el JSON y ejecuta:`);
	console.log(`   node tools/download-selected.js\n`);
}

generatePreview().catch(console.error);
