#!/usr/bin/env node
/**
 * Script para convertir todos los paths de camelCase a kebab-case
 * para que coincidan con los archivos en Supabase
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo de paths camelCase a kebab-case
const pathMappings = {
  // Top 10 Suppliers
  'top10Suppliers2025-hero.jpg': 'top-10-aircraft-parts-suppliers-2025-hero.jpg',
  
  // Future of Legacy Aircraft
  'futureOfLegacyAircraft-hero.jpg': 'future-of-legacy-aircraft-hero.jpg',
  'futureOfLegacyAircraft-hangar.jpg': 'future-of-legacy-aircraft-hangar.jpg',
  'futureOfLegacyAircraft-cockpit.jpg': 'future-of-legacy-aircraft-cockpit.jpg',
  'futureOfLegacyAircraft-engineModule.jpg': 'future-of-legacy-aircraft-engine-module.jpg',
  'futureOfLegacyAircraft-turbine.jpg': 'future-of-legacy-aircraft-turbine.jpg',
  'futureOfLegacyAircraft-documentation.jpg': 'future-of-legacy-aircraft-documentation.jpg',
  
  // Miami Aviation Logistics
  'miamiAviationLogistics-hero.jpg': 'miami-aviation-logistics-hero.jpg',
  'miamiAviationLogistics-ramp.jpg': 'miami-aviation-logistics-ramp.jpg',
  'miamiAviationLogistics-port.jpg': 'miami-aviation-logistics-port.jpg',
  'miamiAviationLogistics-warehouse.jpg': 'miami-aviation-logistics-warehouse.jpg',
  'miamiAviationLogistics-it.jpg': 'miami-aviation-logistics-it.jpg',
  
  // AOG Response Strategies
  'aogResponseStrategies-hero.jpg': 'aog-response-strategies-hero.jpg',
  'aogResponseStrategies-nightShift.jpg': 'aog-response-strategies-night-shift.jpg',
  'aogResponseStrategies-opsControl.jpg': 'aog-response-strategies-ops-control.jpg',
  'aogResponseStrategies-freight.jpg': 'aog-response-strategies-freight.jpg',
  
  // Sustainable Aviation Component Trading
  'sustainableAviationComponentTrading-hero.jpg': 'sustainable-aviation-component-trading-hero.jpg',
  'sustainableAviationComponentTrading-inspection.jpg': 'sustainable-aviation-component-trading-inspection.jpg',
  'sustainableAviationComponentTrading-facility.jpg': 'sustainable-aviation-component-trading-facility.jpg',
  
  // Global Aircraft Parts Supply Chains
  'globalAircraftPartsSupplyChains-hero.jpg': 'global-aircraft-parts-supply-chains-hero.jpg',
  'globalAircraftPartsSupplyChains-cargoPallets.jpg': 'global-aircraft-parts-supply-chains-cargo-pallets.jpg',
  'globalAircraftPartsSupplyChains-analytics.jpg': 'global-aircraft-parts-supply-chains-analytics.jpg',
  
  // Technology Trends Component Management
  'technologyTrendsComponentManagement-hero.jpg': 'technology-trends-component-management-hero.jpg',
  'technologyTrendsComponentManagement-machineLearning.jpg': 'technology-trends-component-management-machine-learning.jpg',
  'technologyTrendsComponentManagement-robotics.jpg': 'technology-trends-component-management-robotics.jpg',
  'technologyTrendsComponentManagement-stockDashboard.jpg': 'technology-trends-component-management-stock-dashboard.jpg',
};

// Archivos a procesar
const filesToProcess = [
  'src/pages/Blog.jsx',
  'src/pages/blog/Top10AircraftPartsSuppliers2025.jsx',
  'src/pages/blog/FutureOfLegacyAircraft.jsx',
  'src/pages/blog/MiamiAviationLogistics.jsx',
  'src/pages/blog/AogResponseStrategies.jsx',
  'src/pages/blog/SustainableAviationComponentTrading.jsx',
  'src/pages/blog/GlobalAircraftPartsSupplyChains.jsx',
  'src/pages/blog/TechnologyTrendsComponentManagement.jsx',
];

let totalReplacements = 0;

filesToProcess.forEach(relativePath => {
  const filePath = path.join(path.dirname(__dirname), relativePath);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Archivo no encontrado: ${relativePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;
  
  // Reemplazar cada path camelCase con kebab-case
  Object.entries(pathMappings).forEach(([camelCase, kebabCase]) => {
    const oldPattern = `getMediaSrc('${camelCase}'`;
    const newPattern = `getMediaSrc('${kebabCase}'`;
    
    if (content.includes(oldPattern)) {
      content = content.replace(new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
      replacements++;
    }
  });
  
  if (replacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${relativePath}: ${replacements} reemplazos`);
    totalReplacements += replacements;
  } else {
    console.log(`   ${relativePath}: sin cambios`);
  }
});

console.log(`\n🎉 Total: ${totalReplacements} paths actualizados a kebab-case\n`);
console.log('Las imágenes ahora deberían cargar desde Supabase con los nombres correctos.');
console.log('\nEjemplo de URL generada:');
console.log('https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/blog-media/aog-response-strategies-freight.jpg');
