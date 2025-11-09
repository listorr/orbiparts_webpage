#!/bin/bash

# Renombra los archivos para que coincidan con los slugs en mediaFallbacks.js

cd media-staging/

# Blog 1: top-10 -> top10Suppliers2025
mv "top-10-aircraft-parts-suppliers-2025-hero.jpg" "top10Suppliers2025-hero.jpg" 2>/dev/null

# Blog 2: future-of-legacy -> futureOfLegacyAircraft
mv "future-of-legacy-aircraft-hero.jpg" "futureOfLegacyAircraft-hero.jpg" 2>/dev/null
mv "future-of-legacy-aircraft-hangar.jpg" "futureOfLegacyAircraft-hangar.jpg" 2>/dev/null
mv "future-of-legacy-aircraft-cockpit.jpg" "futureOfLegacyAircraft-cockpit.jpg" 2>/dev/null
mv "future-of-legacy-aircraft-engineModule.jpg" "futureOfLegacyAircraft-engineModule.jpg" 2>/dev/null
mv "future-of-legacy-aircraft-turbine.jpg" "futureOfLegacyAircraft-turbine.jpg" 2>/dev/null
mv "future-of-legacy-aircraft-documentation.jpg" "futureOfLegacyAircraft-documentation.jpg" 2>/dev/null

# Blog 3: miami-aviation -> miamiAviationLogistics
mv "miami-aviation-logistics-hero.jpg" "miamiAviationLogistics-hero.jpg" 2>/dev/null
mv "miami-aviation-logistics-ramp.jpg" "miamiAviationLogistics-ramp.jpg" 2>/dev/null
mv "miami-aviation-logistics-port.jpg" "miamiAviationLogistics-port.jpg" 2>/dev/null
mv "miami-aviation-logistics-warehouse.jpg" "miamiAviationLogistics-warehouse.jpg" 2>/dev/null
mv "miami-aviation-logistics-it.jpg" "miamiAviationLogistics-it.jpg" 2>/dev/null

# Blog 4: aog-response -> aogResponseStrategies
mv "aog-response-strategies-hero.jpg" "aogResponseStrategies-hero.jpg" 2>/dev/null
mv "aog-response-strategies-nightShift.jpg" "aogResponseStrategies-nightShift.jpg" 2>/dev/null
mv "aog-response-strategies-opsControl.jpg" "aogResponseStrategies-opsControl.jpg" 2>/dev/null
mv "aog-response-strategies-freight.jpg" "aogResponseStrategies-freight.jpg" 2>/dev/null

# Blog 5: sustainable-aviation -> sustainableAviationComponentTrading
mv "sustainable-aviation-component-trading-hero.jpg" "sustainableAviationComponentTrading-hero.jpg" 2>/dev/null
mv "sustainable-aviation-component-trading-inspection.jpg" "sustainableAviationComponentTrading-inspection.jpg" 2>/dev/null
mv "sustainable-aviation-component-trading-facility.jpg" "sustainableAviationComponentTrading-facility.jpg" 2>/dev/null

# Blog 6: global-aircraft -> globalAircraftPartsSupplyChains
mv "global-aircraft-parts-supply-chains-hero.jpg" "globalAircraftPartsSupplyChains-hero.jpg" 2>/dev/null
mv "global-aircraft-parts-supply-chains-cargoPallets.jpg" "globalAircraftPartsSupplyChains-cargoPallets.jpg" 2>/dev/null
mv "global-aircraft-parts-supply-chains-analytics.jpg" "globalAircraftPartsSupplyChains-analytics.jpg" 2>/dev/null

# Blog 7: technology-trends -> technologyTrendsComponentManagement
mv "technology-trends-component-management-hero.jpg" "technologyTrendsComponentManagement-hero.jpg" 2>/dev/null
mv "technology-trends-component-management-machineLearning.jpg" "technologyTrendsComponentManagement-machineLearning.jpg" 2>/dev/null
mv "technology-trends-component-management-robotics.jpg" "technologyTrendsComponentManagement-robotics.jpg" 2>/dev/null
mv "technology-trends-component-management-stockDashboard.jpg" "technologyTrendsComponentManagement-stockDashboard.jpg" 2>/dev/null

echo "✅ Archivos renombrados correctamente"
echo ""
echo "📋 Archivos renombrados:"
ls -1 *.jpg | grep -v "miami prot"
