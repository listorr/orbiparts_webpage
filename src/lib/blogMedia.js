const BLOG_MEDIA = {
  'future-of-legacy-aircraft': {
    hero: 'future-of-legacy-aircraft-hero.jpg',
    hangar: 'future-of-legacy-aircraft-hangar.jpg',
    cockpit: 'future-of-legacy-aircraft-cockpit.jpg',
    engineModule: 'future-of-legacy-aircraft-engine-module.jpg',
    turbine: 'future-of-legacy-aircraft-turbine.jpg',
    documentation: 'future-of-legacy-aircraft-documentation.jpg',
  },
  'miami-aviation-logistics': {
    hero: 'miami-aviation-logistics-hero.jpg',
    ramp: 'miami-aviation-logistics-ramp.jpg',
    port: 'miami-aviation-logistics-port.jpg',
    customs: 'miami-aviation-logistics-customs.jpg',
    warehouse: 'miami-aviation-logistics-warehouse.jpg',
    it: 'miami-aviation-logistics-it.jpg',
    consolidation: 'miami-aviation-logistics-consolidation.jpg',
    energy: 'miami-aviation-logistics-energy.jpg',
  },
  'aog-response-strategies': {
    hero: 'aog-response-strategies-hero.jpg',
    nightShift: 'aog-response-strategies-nightShift.jpg',
    opsControl: 'aog-response-strategies-opsControl.jpg',
    freight: 'aog-response-strategies-freight.jpg',
    rapidInstall: 'aog-response-rapid-install.jpg',
  },
  'sustainable-aviation-component-trading': {
    hero: 'sustainable-aviation-component-trading-hero.jpg',
    dashboard: 'sustainable-aviation-component-trading-dashboard.jpg',
    inspection: 'sustainable-aviation-component-trading-inspection.jpg',
    facility: 'sustainable-aviation-component-trading-facility.jpg',
    teardown: 'sustainable-aviation-component-trading-teardown.jpg',
    documentation: 'sustainable-aviation-component-trading-documentation.jpg',
  },
  'global-aircraft-parts-supply-chains': {
    hero: 'global-aircraft-parts-supply-chains-hero.jpg',
    documentControl: null,
    cargoPallets: 'global-aircraft-parts-supply-chains-cargoPallets.jpg',
    cloudInterface: 'global-aircraft-parts-supply-chains-cloudInterface.jpg',
    analytics: 'global-aircraft-parts-supply-chains-analytics.jpg',
    apiDiagram: 'global-aircraft-parts-supply-chains-apiDiagram.jpg',
  },
  'technology-trends-component-management': {
    hero: 'technology-trends-component-management-hero.jpg',
    predictive: 'technology-trends-component-management-predictive.jpg',
    machineLearning: 'technology-trends-component-management-machineLearning.jpg',
    robotics: 'technology-trends-component-management-robotics.jpg',
    stockDashboard: 'technology-trends-component-management-stockDashboard.jpg',
    systemIntegration: 'technology-trends-component-management-systemIntegration.jpg',
    procurementApi: null,
    blockchain: null,
  },
  'top-10-aircraft-parts-suppliers-2025': {
    hero: 'top-10-aircraft-parts-suppliers-2025-hero.jpg',
  },
};

export const getBlogMedia = (slug) => BLOG_MEDIA[slug] ?? {};

export const getBlogMediaPath = (slug, key) => BLOG_MEDIA[slug]?.[key] ?? null;

export const BLOG_MEDIA_MAP = BLOG_MEDIA;
