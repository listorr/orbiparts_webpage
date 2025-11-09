#!/usr/bin/env node
/**
 * Script para actualizar todos los paths de imágenes para que coincidan 
 * con los archivos reales en Supabase (sin subdirectorios)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo de paths viejos (con subdirectorios) a nuevos (nombres simples)
const pathMappings = {
  // Top 10 Suppliers
  'top-10-aircraft-parts-suppliers-2025/seo-cover.jpg': 'top10Suppliers2025-hero.jpg',
  
  // Future of Legacy Aircraft
  'future-of-legacy-aircraft/hero-boeing-737-classic.jpg': 'futureOfLegacyAircraft-hero.jpg',
  'future-of-legacy-aircraft/hangar-maintenance-md80.jpg': 'futureOfLegacyAircraft-hangar.jpg',
  'future-of-legacy-aircraft/cockpit-avionics-upgrade.jpg': 'futureOfLegacyAircraft-cockpit.jpg',
  'future-of-legacy-aircraft/engine-module-warehouse.jpg': 'futureOfLegacyAircraft-engineModule.jpg',
  'future-of-legacy-aircraft/turbine-inspection-bench.jpg': 'futureOfLegacyAircraft-turbine.jpg',
  'future-of-legacy-aircraft/airworthiness-documentation.jpg': 'futureOfLegacyAircraft-documentation.jpg',
  
  // Miami Aviation Logistics
  'miami-aviation-logistics/hero-mia-cargo-apron.jpg': 'miamiAviationLogistics-hero.jpg',
  'miami-aviation-logistics/ramp-cargo-loaders.jpg': 'miamiAviationLogistics-ramp.jpg',
  'miami-aviation-logistics/port-airport-convergence.jpg': 'miamiAviationLogistics-port.jpg',
  'miami-aviation-logistics/bonded-warehouse-racks.jpg': 'miamiAviationLogistics-warehouse.jpg',
  'miami-aviation-logistics/secure-logistics-it.jpg': 'miamiAviationLogistics-it.jpg',
  
  // AOG Response Strategies
  'aog-response-strategies/hero-night-maintenance.jpg': 'aogResponseStrategies-hero.jpg',
  'aog-response-strategies/night-shift-maintenance.jpg': 'aogResponseStrategies-nightShift.jpg',
  'aog-response-strategies/operations-control-center.jpg': 'aogResponseStrategies-opsControl.jpg',
  'aog-response-strategies/freight-aircraft-loading.jpg': 'aogResponseStrategies-freight.jpg',
  
  // Sustainable Aviation Component Trading
  'sustainable-aviation-component-trading/hero-sustainable-flight.jpg': 'sustainableAviationComponentTrading-hero.jpg',
  'sustainable-aviation-component-trading/component-inspection-refurbishment.jpg': 'sustainableAviationComponentTrading-inspection.jpg',
  'sustainable-aviation-component-trading/green-certified-facility.jpg': 'sustainableAviationComponentTrading-facility.jpg',
  
  // Global Aircraft Parts Supply Chains
  'global-aircraft-parts-supply-chains/hero-global-network.jpg': 'globalAircraftPartsSupplyChains-hero.jpg',
  'global-aircraft-parts-supply-chains/air-cargo-pallets.jpg': 'globalAircraftPartsSupplyChains-cargoPallets.jpg',
  'global-aircraft-parts-supply-chains/supply-chain-analytics-dashboard.jpg': 'globalAircraftPartsSupplyChains-analytics.jpg',
  
  // Technology Trends Component Management
  'technology-trends-component-management/hero-digital-interface.jpg': 'technologyTrendsComponentManagement-hero.jpg',
  'technology-trends-component-management/machine-learning-concept.jpg': 'technologyTrendsComponentManagement-machineLearning.jpg',
  'technology-trends-component-management/automated-warehouse-robotics.jpg': 'technologyTrendsComponentManagement-robotics.jpg',
  'technology-trends-component-management/stock-health-dashboard.jpg': 'technologyTrendsComponentManagement-stockDashboard.jpg',
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
  
  // Reemplazar cada path viejo con el nuevo
  Object.entries(pathMappings).forEach(([oldPath, newPath]) => {
    const oldPattern = `getMediaSrc('${oldPath}'`;
    const newPattern = `getMediaSrc('${newPath}'`;
    
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

console.log(`\n🎉 Total: ${totalReplacements} paths actualizados\n`);
console.log('Las imágenes ahora deberían cargar desde Supabase correctamente.');
