#!/usr/bin/env node

/**
 * Sube todas las imágenes de media-staging/ a Supabase Storage
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STAGING_DIR = path.join(__dirname, '../media-staging');
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
// Prefer a service role key if provided (needed to create buckets / bypass RLS)
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const BUCKET_NAME = 'blog-media';

// Utility: decode JWT payload (no signature verification) to inspect which project the key references
function decodeJwtPayload(token) {
	try {
		const parts = token.split('.');
		if (parts.length < 2) return null;
		let payload = parts[1];
		payload = payload.replace(/-/g, '+').replace(/_/g, '/');
		payload += '='.repeat((4 - payload.length % 4) % 4);
		const json = Buffer.from(payload, 'base64').toString('utf8');
		return JSON.parse(json);
	} catch (e) {
		return null;
	}
}

async function uploadAllImages() {
	console.log('╔═══════════════════════════════════════════════════════════╗');
	console.log('║  📤 Subiendo Imágenes a Supabase Storage                ║');
	console.log('╚═══════════════════════════════════════════════════════════╝\n');

	if (!SUPABASE_URL || !SUPABASE_KEY) {
		console.error('❌ Variables de Supabase no encontradas en .env');
		process.exit(1);
	}

	// Decode anon key payload locally to detect which project it belongs to
	const decoded = SUPABASE_KEY ? decodeJwtPayload(SUPABASE_KEY) : null;
	if (decoded) {
		console.log('🔎 Anon key payload (decoded):');
		if (decoded.iss) console.log(`  iss: ${decoded.iss}`);
		if (decoded.sub) console.log(`  sub: ${decoded.sub}`);
		if (decoded.aud) console.log(`  aud: ${decoded.aud}`);
		if (decoded.role) console.log(`  role: ${decoded.role}`);
		if (decoded.ref) console.log(`  ref: ${decoded.ref}`);
	} else {
		console.log('🔎 No se pudo decodificar el anon key payload');
	}

	const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

	// Verificar que el bucket existe
	const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
	
	if (bucketsError) {
		console.error('❌ Error al conectar con Supabase:', bucketsError.message);
		process.exit(1);
	}

	const bucketExists = buckets.some(b => b.name === BUCKET_NAME);

	if (!bucketExists) {
		console.error(`❌ El bucket "${BUCKET_NAME}" no existe en tu proyecto Supabase (${SUPABASE_URL}).`);
		console.error('   Nota: con la anon key no siempre es posible crear buckets (RLS/permiso denegado).');
		console.error('   Opciones:');
		console.error('     1) Crea el bucket manualmente en Supabase Dashboard -> Storage -> Create bucket (nombre: blog-media) y marca Public.');
		console.error('     2) Usa una Service Role key (temporal) con permisos para crear/subir objetos y vuelve a ejecutar este script.');
		console.error('     3) Sube los archivos manualmente desde el Dashboard o usando la CLI:');
		console.error('        supabase storage upload --project <project-ref> --bucket blog-media --path <path/in/bucket> <local-file>');
		process.exit(1);
	} else {
		console.log(`✓ Bucket "${BUCKET_NAME}" existe\n`);
	}

	// Obtener lista de archivos
	const files = fs.readdirSync(STAGING_DIR).filter(f => f.endsWith('.jpg'));

	// Helper: produce suggested kebab-case/nested path for an input filename
	const toKebab = (s) => s.replace(/[ _]+/g,'-').replace(/([a-z0-9])([A-Z])/g,'$1-$2').replace(/([A-Z])([A-Z][a-z])/g,'$1-$2').replace(/--+/g,'-').toLowerCase();

	const suggestMapping = (filename) => {
		const ext = path.extname(filename);
		const base = path.basename(filename, ext);
		const normalized = base.replace(/\s+/g, '-');

		if (!/[A-Z]/.test(normalized)) {
			const parts = normalized.split('-');
			const commonFileNames = ['hero','hangar','turbine','cockpit','inspection','it','warehouse','port','ramp','facility','analytics','cargo-pallets','stock-dashboard','teardown','freight','night-shift','ops-control','machine-learning','robotics','engine-module','engine','module'];
			const last = parts[parts.length-1];
			if (parts.length >= 3 && commonFileNames.includes(last)) {
				const folder = parts.slice(0, parts.length-1).join('-');
				const file = parts.slice(parts.length-1).join('-');
				return `${toKebab(folder)}/${toKebab(file)}${ext}`;
			}
		}

		if (/[A-Z]/.test(base) && normalized.includes('-')) {
			const firstDash = normalized.indexOf('-');
			const left = normalized.slice(0, firstDash);
			const right = normalized.slice(firstDash+1);
			return `${toKebab(left)}/${toKebab(right)}${ext}`;
		}

		if (/[A-Z]/.test(base) && !normalized.includes('-')) {
			const keb = toKebab(base);
			const parts = keb.split('-');
			if (parts.length >= 2) {
				const folder = parts.slice(0, parts.length-1).join('-');
				const file = parts.slice(parts.length-1).join('-');
				return `${folder}/${file}${ext}`;
			}
			return `${keb}${ext}`;
		}

		return `${toKebab(normalized)}${ext}`;
	};
	
	console.log(`📊 Total de imágenes a subir: ${files.length}\n`);

	let uploaded = 0;
	let failed = 0;

	for (const filename of files) {
		const filepath = path.join(STAGING_DIR, filename);
		const fileBuffer = fs.readFileSync(filepath);
		const fileSizeMB = (fileBuffer.length / 1024 / 1024).toFixed(2);

		const targetPath = suggestMapping(filename);
		console.log(`  ⬆️  ${filename} -> ${targetPath} (${fileSizeMB} MB)...`);

		try {
			const { data, error } = await supabase.storage
				.from(BUCKET_NAME)
				.upload(targetPath, fileBuffer, {
					contentType: 'image/jpeg',
					upsert: true // Sobrescribir si ya existe
				});

			if (error) {
				// Detect common RLS/permission error
				if (error.message && error.message.toLowerCase().includes('row-level security')) {
					console.log(`  ✗ Error de permisos (RLS): ${error.message}`);
					console.log('    -> Usa una service_role key o crea el bucket desde el Dashboard.');
				} else {
					console.log(`  ✗ Error: ${error.message}`);
				}
				failed++;
			} else {
				console.log(`  ✓ Subido correctamente`);
				uploaded++;
			}
		} catch (ex) {
			console.log(`  ✗ Exception: ${ex.message}`);
			failed++;
		}

		// Pequeña pausa entre uploads
		await new Promise(resolve => setTimeout(resolve, 300));
	}

	console.log('\n' + '═'.repeat(60));
	console.log('\n✅ Proceso completado!');
	console.log(`   Subidas exitosas: ${uploaded}/${files.length}`);
	
	if (failed > 0) {
		console.log(`   ⚠️  Fallidas: ${failed}`);
	}

	console.log(`\n🌐 Ver imágenes en Supabase:`);
	console.log(`   https://supabase.com/dashboard/project/${SUPABASE_URL.split('//')[1].split('.')[0]}/storage/buckets/blog-media`);
	
	console.log(`\n📋 Siguiente paso:`);
	console.log(`   1. Verifica que las imágenes se vean bien en Supabase`);
	console.log(`   2. Cambia en .env: VITE_USE_SUPABASE_MEDIA=true`);
	console.log(`   3. Reinicia: npm run dev\n`);
}

uploadAllImages().catch(error => {
	console.error('\n❌ Error fatal:', error.message);
	process.exit(1);
});
