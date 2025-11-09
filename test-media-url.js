// Test para verificar la URL generada
const SUPABASE_MEDIA_BASE_URL = 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/blog-media';

// Simular la función
const supabaseImage = (path) => `${SUPABASE_MEDIA_BASE_URL}/${path}`;

// Test con los paths que estamos usando
console.log('\n=== TEST DE URLs DE SUPABASE ===\n');

const testPaths = [
  'top-10-aircraft-parts-suppliers-2025/seo-cover.jpg',
  'future-of-legacy-aircraft/hero-boeing-737-classic.jpg',
  'miami-aviation-logistics/hero-mia-cargo-apron.jpg'
];

testPaths.forEach(path => {
  const url = supabaseImage(path);
  console.log(`Path: ${path}`);
  console.log(`URL:  ${url}`);
  console.log('');
});

console.log('\n=== URLs ESPERADAS EN SUPABASE (sin subdirectorios) ===\n');

const expectedFiles = [
  'top-10-aircraft-parts-suppliers-2025-hero.jpg',
  'future-of-legacy-aircraft-hero.jpg',
  'miami-aviation-logistics-hero.jpg'
];

expectedFiles.forEach(file => {
  const url = `${SUPABASE_MEDIA_BASE_URL}/${file}`;
  console.log(`File: ${file}`);
  console.log(`URL:  ${url}`);
  console.log('');
});
