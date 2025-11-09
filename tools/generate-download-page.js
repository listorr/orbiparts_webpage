#!/usr/bin/env node

/**
 * Genera un HTML interactivo para descargar imágenes curadas
 * Con vista previa y descarga directa desde el navegador
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, '../download-images.html');

const CURATED_IMAGES = {
	'top-10-aircraft-parts-suppliers-2025': {
		hero: {
			url: 'https://images.pexels.com/photos/15497208/pexels-photo-15497208.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Almacén de partes de aviones con componentes organizados',
			context: '✅ Relevante para ORBIPARTS: inventario de partes aeronáuticas'
		}
	},
	
	'future-of-legacy-aircraft': {
		hero: {
			url: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Avión comercial Boeing en aeropuerto',
			context: '✅ Ideal para legacy aircraft: Boeing 737 classic'
		},
		hangar: {
			url: 'https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Hangar de mantenimiento de aeronaves',
			context: '✅ Instalaciones MRO profesionales'
		},
		cockpit: {
			url: 'https://images.pexels.com/photos/46148/aircraft-cockpit-cockpit-instruments-46148.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Instrumentos de cabina de avión comercial',
			context: '✅ Cockpit de aviación comercial'
		},
		engineModule: {
			url: 'https://images.pexels.com/photos/163810/cockpit-aircraft-f-16-jet-163810.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Vista de motor de aeronave',
			context: '✅ Componentes de motor jet'
		},
		turbine: {
			url: 'https://images.pexels.com/photos/163852/jet-engine-engine-aircraft-turbine-163852.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Álabes de turbina de motor jet',
			context: '✅ Componentes internos de motor CFM56/PW/GE'
		},
		documentation: {
			url: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Documentos técnicos y papeleo de aviación',
			context: '✅ Certificaciones y logbooks'
		}
	},
	
	'miami-aviation-logistics': {
		hero: {
			url: 'https://images.pexels.com/photos/3862635/pexels-photo-3862635.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Operaciones de carga en aeropuerto',
			context: '✅ Logística aeroportuaria Miami'
		},
		ramp: {
			url: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Avión en rampa de aeropuerto',
			context: '✅ Operaciones de rampa'
		},
		port: {
			url: 'https://images.pexels.com/photos/4440642/pexels-photo-4440642.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Operaciones de carga aérea',
			context: '✅ Freight y cargo aéreo'
		},
		warehouse: {
			url: 'https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Almacén logístico',
			context: '✅ Warehouse para partes de aviación'
		},
		it: {
			url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Sistemas de tecnología digital',
			context: '✅ IT para logística de aviación'
		}
	},
	
	'aog-response-strategies': {
		hero: {
			url: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Mecánico de aeronaves en mantenimiento',
			context: '✅ Respuesta de emergencia AOG'
		},
		nightShift: {
			url: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Técnico de aviación trabajando',
			context: '✅ Turno nocturno mantenimiento urgente'
		},
		opsControl: {
			url: 'https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Centro de control de operaciones',
			context: '✅ Operations control center'
		},
		freight: {
			url: 'https://images.pexels.com/photos/3862140/pexels-photo-3862140.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Carga aérea y freight',
			context: '✅ Envío urgente de partes AOG'
		}
	},
	
	'sustainable-aviation-component-trading': {
		hero: {
			url: 'https://images.pexels.com/photos/46148/aircraft-airliner-airplane-aviation-46148.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Aviación moderna sostenible',
			context: '✅ Green aviation'
		},
		inspection: {
			url: 'https://images.pexels.com/photos/2159228/pexels-photo-2159228.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Inspección de control de calidad',
			context: '✅ QC de componentes'
		},
		facility: {
			url: 'https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Instalación de mantenimiento',
			context: '✅ MRO facility'
		},
		teardown: {
			url: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Desmontaje y reciclaje de aeronaves',
			context: '✅ Aircraft teardown para reciclaje'
		}
	},
	
	'global-aircraft-parts-supply-chains': {
		hero: {
			url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Red logística global',
			context: '✅ Supply chain mundial'
		},
		cargoPallets: {
			url: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Pallets de carga',
			context: '✅ Freight pallets'
		},
		analytics: {
			url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Dashboard de análisis de negocio',
			context: '✅ Business analytics'
		}
	},
	
	'technology-trends-component-management': {
		hero: {
			url: 'https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Tecnología de cabina moderna',
			context: '✅ Aviónica digital'
		},
		machineLearning: {
			url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Inteligencia artificial y ML',
			context: '✅ AI para aviación'
		},
		robotics: {
			url: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Robótica industrial',
			context: '✅ Automatización en MRO'
		},
		stockDashboard: {
			url: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1920',
			description: 'Dashboard de gestión de stock',
			context: '✅ Inventory management'
		}
	}
};

function generateHTML() {
	let html = `
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ORBIPARTS - Imágenes Curadas</title>
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			padding: 20px;
			min-height: 100vh;
		}
		.container {
			max-width: 1400px;
			margin: 0 auto;
		}
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
		.header p {
			color: #64748b;
			font-size: 18px;
			line-height: 1.6;
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
			border: 2px solid #e2e8f0;
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
			margin-bottom: 25px;
			padding-bottom: 15px;
			border-bottom: 3px solid #667eea;
		}
		.images-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
			gap: 25px;
		}
		.image-card {
			background: #f8fafc;
			border-radius: 12px;
			overflow: hidden;
			box-shadow: 0 2px 8px rgba(0,0,0,0.05);
			transition: all 0.3s ease;
		}
		.image-card:hover {
			transform: translateY(-8px);
			box-shadow: 0 12px 24px rgba(102, 126, 234, 0.3);
		}
		.image-wrapper {
			position: relative;
			width: 100%;
			height: 250px;
			overflow: hidden;
			background: #e2e8f0;
		}
		.image-wrapper img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.image-info {
			padding: 20px;
		}
		.image-name {
			font-size: 16px;
			font-weight: 600;
			color: #1e293b;
			margin-bottom: 8px;
		}
		.image-desc {
			font-size: 14px;
			color: #64748b;
			margin-bottom: 10px;
			line-height: 1.5;
		}
		.image-context {
			font-size: 13px;
			color: #10b981;
			background: #d1fae5;
			padding: 8px 12px;
			border-radius: 8px;
			margin-bottom: 15px;
		}
		.download-btn {
			width: 100%;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			border: none;
			padding: 12px 20px;
			border-radius: 8px;
			font-size: 14px;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.3s ease;
		}
		.download-btn:hover {
			transform: scale(1.05);
			box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
		}
		.download-all {
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
		.download-all:hover {
			transform: scale(1.1);
			box-shadow: 0 15px 40px rgba(16, 185, 129, 0.5);
		}
		.instructions {
			background: #fef3c7;
			border: 2px solid #fbbf24;
			padding: 20px;
			border-radius: 12px;
			margin-bottom: 25px;
		}
		.instructions h3 {
			color: #92400e;
			margin-bottom: 10px;
		}
		.instructions ol {
			margin-left: 20px;
			color: #78350f;
		}
		.instructions li {
			margin: 8px 0;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>🛫 ORBIPARTS - Imágenes Curadas</h1>
			<p>
				Estas imágenes han sido <strong>seleccionadas manualmente</strong> considerando el contexto 
				de ORBIPARTS como distribuidor de partes de aeronaves, motores, servicios MRO y logística.
			</p>
			<div class="stats">
				<div class="stat-card">
					<div class="stat-number">27</div>
					<div class="stat-label">Imágenes Curadas</div>
				</div>
				<div class="stat-card">
					<div class="stat-number">100%</div>
					<div class="stat-label">Sin Watermarks</div>
				</div>
				<div class="stat-card">
					<div class="stat-number">7</div>
					<div class="stat-label">Blogs Cubiertos</div>
				</div>
				<div class="stat-card">
					<div class="stat-number">✅</div>
					<div class="stat-label">Uso Comercial</div>
				</div>
			</div>
		</div>

		<div class="instructions">
			<h3>📋 Instrucciones de Descarga</h3>
			<ol>
				<li><strong>Opción 1:</strong> Haz clic en "Descargar" en cada imagen individual</li>
				<li><strong>Opción 2:</strong> Haz clic en "⬇️ Descargar Todas" (botón verde abajo a la derecha)</li>
				<li>Las imágenes se descargarán con el nombre correcto: <code>blog-slug-imageName.jpg</code></li>
				<li>Guárdalas en la carpeta <code>media-staging/</code> de tu proyecto</li>
				<li>Luego súbelas a Supabase siguiendo <code>docs/supabase-media.md</code></li>
			</ol>
		</div>
`;

	let imageCount = 0;
	for (const [blogSlug, images] of Object.entries(CURATED_IMAGES)) {
		const blogTitle = blogSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
		
		html += `
		<div class="blog-section">
			<h2 class="blog-title">${blogTitle}</h2>
			<div class="images-grid">
		`;
		
		for (const [imageName, data] of Object.entries(images)) {
			imageCount++;
			const filename = `${blogSlug}-${imageName}.jpg`;
			
			html += `
			<div class="image-card">
				<div class="image-wrapper">
					<img src="${data.url}" alt="${data.description}" loading="lazy">
				</div>
				<div class="image-info">
					<div class="image-name">📸 ${imageName}</div>
					<div class="image-desc">${data.description}</div>
					<div class="image-context">${data.context}</div>
					<button class="download-btn" onclick="downloadImage('${data.url}', '${filename}')">
						⬇️ Descargar
					</button>
				</div>
			</div>
			`;
		}
		
		html += `
			</div>
		</div>
		`;
	}

	html += `
		<button class="download-all" onclick="downloadAll()">
			⬇️ Descargar Todas (${imageCount})
		</button>

		<script>
			async function downloadImage(url, filename) {
				try {
					const response = await fetch(url);
					const blob = await response.blob();
					const blobUrl = URL.createObjectURL(blob);
					
					const a = document.createElement('a');
					a.href = blobUrl;
					a.download = filename;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					URL.revokeObjectURL(blobUrl);
				} catch (error) {
					console.error('Error downloading:', error);
					// Fallback: abrir en nueva pestaña
					window.open(url, '_blank');
				}
			}

			async function downloadAll() {
				const images = ` + JSON.stringify(Object.entries(CURATED_IMAGES).flatMap(([blog, imgs]) => 
					Object.entries(imgs).map(([name, data]) => ({
						url: data.url,
						filename: `${blog}-${name}.jpg`
					}))
				)) + `;
				
				for (let i = 0; i < images.length; i++) {
					await downloadImage(images[i].url, images[i].filename);
					// Esperar 1 segundo entre descargas
					await new Promise(resolve => setTimeout(resolve, 1000));
				}
				
				alert('✅ Descarga de ' + images.length + ' imágenes iniciada! Revisa tu carpeta de descargas.');
			}
		</script>
	</div>
</body>
</html>
	`;

	fs.writeFileSync(OUTPUT_FILE, html);
	console.log('✅ HTML generado exitosamente!');
	console.log(`📁 Archivo: ${OUTPUT_FILE}`);
	console.log(`\n🌐 Abre el archivo en tu navegador para descargar las imágenes`);
	console.log(`\n💡 Todas las imágenes son de Pexels (sin watermarks, uso comercial permitido)\n`);
}

generateHTML();
