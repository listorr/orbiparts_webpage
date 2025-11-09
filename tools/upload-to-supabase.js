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
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const BUCKET_NAME = 'blog-media';

async function uploadAllImages() {
	console.log('╔═══════════════════════════════════════════════════════════╗');
	console.log('║  📤 Subiendo Imágenes a Supabase Storage                ║');
	console.log('╚═══════════════════════════════════════════════════════════╝\n');

	if (!SUPABASE_URL || !SUPABASE_KEY) {
		console.error('❌ Variables de Supabase no encontradas en .env');
		process.exit(1);
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
		console.log(`📦 Creando bucket "${BUCKET_NAME}"...`);
		const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
			public: true,
			fileSizeLimit: 10485760 // 10MB
		});
		
		if (createError) {
			console.error('❌ Error creando bucket:', createError.message);
			process.exit(1);
		}
		console.log('✓ Bucket creado\n');
	} else {
		console.log(`✓ Bucket "${BUCKET_NAME}" existe\n`);
	}

	// Obtener lista de archivos
	const files = fs.readdirSync(STAGING_DIR).filter(f => f.endsWith('.jpg'));
	
	console.log(`📊 Total de imágenes a subir: ${files.length}\n`);

	let uploaded = 0;
	let failed = 0;

	for (const filename of files) {
		const filepath = path.join(STAGING_DIR, filename);
		const fileBuffer = fs.readFileSync(filepath);
		const fileSizeMB = (fileBuffer.length / 1024 / 1024).toFixed(2);

		console.log(`  ⬆️  ${filename} (${fileSizeMB} MB)...`);

		// Subir a Supabase Storage
		const { data, error } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(filename, fileBuffer, {
				contentType: 'image/jpeg',
				upsert: true // Sobrescribir si ya existe
			});

		if (error) {
			console.log(`  ✗ Error: ${error.message}`);
			failed++;
		} else {
			console.log(`  ✓ Subido correctamente`);
			uploaded++;
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
