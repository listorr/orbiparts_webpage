import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * SEOHead Component - Maneja meta tags dinámicos por idioma para SEO multiidioma
 * 
 * @param {string} pageKey - Clave de la página (home, about, services, etc.)
 * @param {string} customTitle - Título personalizado (opcional)
 * @param {string} customDescription - Descripción personalizada (opcional)
 */
const SEOHead = ({ pageKey = 'home', customTitle, customDescription }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const baseUrl = 'https://orbiparts.com';

  // Meta titles por página y idioma
  const metaTitles = {
    home: {
      en: 'ORBIPARTS | Global Aircraft Parts Supply & AOG Support 24/7',
      es: 'ORBIPARTS | Suministro Global de Piezas de Avión y Soporte AOG 24/7',
      de: 'ORBIPARTS | Globale Flugzeugteile-Versorgung & AOG-Support 24/7',
      fr: 'ORBIPARTS | Fourniture Mondiale de Pièces d\'Avion & Support AOG 24/7'
    },
    about: {
      en: 'About ORBIPARTS | Leading Aircraft Components Supplier',
      es: 'Sobre ORBIPARTS | Proveedor Líder de Componentes Aeronáuticos',
      de: 'Über ORBIPARTS | Führender Anbieter von Flugzeugkomponenten',
      fr: 'À propos d\'ORBIPARTS | Fournisseur Leader de Composants Aéronautiques'
    },
    services: {
      en: 'Services | Aircraft Parts Trading & AOG Support - ORBIPARTS',
      es: 'Servicios | Comercio de Piezas de Avión y Soporte AOG - ORBIPARTS',
      de: 'Dienstleistungen | Flugzeugteile-Handel & AOG-Support - ORBIPARTS',
      fr: 'Services | Commerce de Pièces d\'Avion & Support AOG - ORBIPARTS'
    },
    products: {
      en: 'Aircraft Components Catalog | Browse Inventory - ORBIPARTS',
      es: 'Catálogo de Componentes | Explorar Inventario - ORBIPARTS',
      de: 'Flugzeugkomponenten-Katalog | Inventar durchsuchen - ORBIPARTS',
      fr: 'Catalogue de Composants | Parcourir l\'Inventaire - ORBIPARTS'
    },
    industries: {
      en: 'Industries We Serve | Airlines, MROs, Leasing - ORBIPARTS',
      es: 'Industrias que Servimos | Aerolíneas, MROs, Leasing - ORBIPARTS',
      de: 'Branchen | Fluggesellschaften, MROs, Leasing - ORBIPARTS',
      fr: 'Industries Servies | Compagnies, MROs, Leasing - ORBIPARTS'
    },
    contact: {
      en: 'Contact ORBIPARTS | Request Quote for Aircraft Parts',
      es: 'Contacto ORBIPARTS | Solicitar Cotización de Piezas',
      de: 'Kontakt ORBIPARTS | Angebot für Flugzeugteile anfordern',
      fr: 'Contact ORBIPARTS | Demander un Devis pour Pièces d\'Avion'
    },
    stock: {
      en: 'Stock Search | Professional Aircraft Parts Inventory - ORBIPARTS',
      es: 'Búsqueda de Stock | Inventario Profesional de Piezas - ORBIPARTS',
      de: 'Lagersuche | Professionelles Flugzeugteile-Inventar - ORBIPARTS',
      fr: 'Recherche Stock | Inventaire Professionnel de Pièces - ORBIPARTS'
    }
  };

  // Meta descriptions por página y idioma
  const metaDescriptions = {
    home: {
      en: 'ORBIPARTS - Global aircraft parts supplier serving 100+ countries. 24/7 AOG support for modern & legacy fleets. CFM56, Boeing, Airbus components. Request quote today.',
      es: 'ORBIPARTS - Proveedor global de piezas de avión en más de 100 países. Soporte AOG 24/7 para flotas modernas y legacy. Componentes CFM56, Boeing, Airbus. Solicita cotización.',
      de: 'ORBIPARTS - Globaler Flugzeugteile-Lieferant in über 100 Ländern. 24/7 AOG-Support für moderne & Legacy-Flotten. CFM56, Boeing, Airbus Komponenten. Angebot anfordern.',
      fr: 'ORBIPARTS - Fournisseur mondial de pièces d\'avion dans plus de 100 pays. Support AOG 24/7 pour flottes modernes et classiques. Composants CFM56, Boeing, Airbus.'
    },
    about: {
      en: 'Learn about ORBIPARTS: Miami-based aircraft parts supplier with global reach. Expertise in modern & legacy fleets, 24/7 AOG support, competitive pricing.',
      es: 'Conozca ORBIPARTS: Proveedor de piezas de avión con sede en Miami y alcance global. Expertos en flotas modernas y legacy, soporte AOG 24/7, precios competitivos.',
      de: 'Erfahren Sie mehr über ORBIPARTS: In Miami ansässiger Flugzeugteile-Lieferant mit globaler Reichweite. Expertise in modernen & Legacy-Flotten, 24/7 AOG-Support.',
      fr: 'Découvrez ORBIPARTS: Fournisseur de pièces d\'avion basé à Miami avec portée mondiale. Expertise flottes modernes et classiques, support AOG 24/7.'
    },
    services: {
      en: 'ORBIPARTS services: Aircraft component trading, logistics & customs, legacy aircraft expertise, consignment management, 24/7 AOG emergency support.',
      es: 'Servicios ORBIPARTS: Comercio de componentes, logística y aduanas, experiencia en aviones legacy, gestión de consignación, soporte AOG 24/7.',
      de: 'ORBIPARTS Dienstleistungen: Flugzeugkomponenten-Handel, Logistik & Zoll, Legacy-Flugzeug-Expertise, Konsignationsmanagement, 24/7 AOG-Notfallsupport.',
      fr: 'Services ORBIPARTS: Commerce de composants, logistique & douane, expertise avions classiques, gestion consignation, support AOG 24/7.'
    },
    products: {
      en: 'Browse ORBIPARTS aircraft components catalog: Engines & APUs, avionics, landing gear, airframe parts. NEW, OH, SV, AR conditions. Request quote instantly.',
      es: 'Explore el catálogo ORBIPARTS: Motores y APUs, aviónica, tren de aterrizaje, partes de fuselaje. Condiciones NUEVO, OH, SV, AR. Solicite cotización.',
      de: 'ORBIPARTS Flugzeugkomponenten-Katalog: Triebwerke & APUs, Avionik, Fahrwerk, Flugzeugzelle. NEU, OH, SV, AR Zustände. Angebot sofort anfordern.',
      fr: 'Catalogue ORBIPARTS: Moteurs & APU, avionique, train d\'atterrissage, cellule. États NEUF, OH, SV, AR. Devis instantané.'
    },
    industries: {
      en: 'ORBIPARTS serves airlines, MROs, leasing companies, aviation brokers, government operators. Trusted partner in 100+ countries worldwide.',
      es: 'ORBIPARTS sirve aerolíneas, MROs, empresas de leasing, brokers, operadores gubernamentales. Socio de confianza en más de 100 países.',
      de: 'ORBIPARTS bedient Fluggesellschaften, MROs, Leasinggesellschaften, Broker, Regierungsbetreiber. Vertrauenspartner in über 100 Ländern.',
      fr: 'ORBIPARTS sert compagnies aériennes, MRO, sociétés leasing, courtiers, opérateurs gouvernementaux. Partenaire de confiance dans 100+ pays.'
    },
    contact: {
      en: 'Contact ORBIPARTS for aircraft parts quotes. Miami headquarters. 24/7 AOG hotline. Email sales@orbiparts.com. Fast response, competitive pricing.',
      es: 'Contacte ORBIPARTS para cotizaciones de piezas. Sede en Miami. Línea AOG 24/7. Email sales@orbiparts.com. Respuesta rápida, precios competitivos.',
      de: 'Kontaktieren Sie ORBIPARTS für Flugzeugteile-Angebote. Hauptsitz Miami. 24/7 AOG-Hotline. Email sales@orbiparts.com. Schnelle Antwort.',
      fr: 'Contactez ORBIPARTS pour devis pièces avion. Siège Miami. Hotline AOG 24/7. Email sales@orbiparts.com. Réponse rapide, prix compétitifs.'
    },
    stock: {
      en: 'Search ORBIPARTS professional stock inventory. Real-time availability for aircraft parts. Bulk search up to 50 part numbers. Instant quote request.',
      es: 'Busque en el inventario profesional ORBIPARTS. Disponibilidad en tiempo real. Búsqueda masiva hasta 50 números. Cotización instantánea.',
      de: 'Durchsuchen Sie ORBIPARTS professionelles Lagerinventar. Echtzeit-Verfügbarkeit. Massensuche bis 50 Teilenummern. Sofortangebot.',
      fr: 'Recherchez l\'inventaire professionnel ORBIPARTS. Disponibilité temps réel. Recherche en masse jusqu\'à 50 références. Devis instantané.'
    }
  };

  // Keywords por idioma
  const metaKeywords = {
    en: 'aircraft parts, aviation components, AOG support, CFM56, Boeing parts, Airbus parts, legacy aircraft, MRO, aircraft engines, avionics',
    es: 'piezas de avión, componentes aeronáuticos, soporte AOG, CFM56, piezas Boeing, piezas Airbus, aviones legacy, MRO, motores de avión, aviónica',
    de: 'Flugzeugteile, Luftfahrtkomponenten, AOG-Support, CFM56, Boeing-Teile, Airbus-Teile, Legacy-Flugzeuge, MRO, Flugzeugmotoren, Avionik',
    fr: 'pièces d\'avion, composants aéronautiques, support AOG, CFM56, pièces Boeing, pièces Airbus, avions classiques, MRO, moteurs d\'avion, avionique'
  };

  // Seleccionar title y description
  const title = customTitle || (metaTitles[pageKey]?.[currentLang] || metaTitles.home[currentLang]);
  const description = customDescription || (metaDescriptions[pageKey]?.[currentLang] || metaDescriptions.home[currentLang]);
  const keywords = metaKeywords[currentLang] || metaKeywords.en;

  // Locale codes para Open Graph
  const localeMap = {
    en: 'en_US',
    es: 'es_ES',
    de: 'de_DE',
    fr: 'fr_FR'
  };

  const currentLocale = localeMap[currentLang] || 'en_US';
  const alternateLocales = Object.values(localeMap).filter(loc => loc !== currentLocale);

  return (
    <Helmet>
      {/* Lang attribute */}
      <html lang={currentLang} />

      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}${window.location.pathname}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:locale" content={currentLocale} />
      {alternateLocales.map(locale => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${baseUrl}${window.location.pathname}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />

      {/* Canonical URL */}
      <link rel="canonical" href={`${baseUrl}${window.location.pathname}`} />

      {/* Hreflang tags - URLs con parámetro lang */}
      <link rel="alternate" hreflang="en" href={`${baseUrl}${window.location.pathname}?lang=en`} />
      <link rel="alternate" hreflang="es" href={`${baseUrl}${window.location.pathname}?lang=es`} />
      <link rel="alternate" hreflang="de" href={`${baseUrl}${window.location.pathname}?lang=de`} />
      <link rel="alternate" hreflang="fr" href={`${baseUrl}${window.location.pathname}?lang=fr`} />
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}${window.location.pathname}`} />

      {/* Hreflang para regiones específicas */}
      <link rel="alternate" hreflang="en-US" href={`${baseUrl}${window.location.pathname}?lang=en`} />
      <link rel="alternate" hreflang="es-ES" href={`${baseUrl}${window.location.pathname}?lang=es`} />
      <link rel="alternate" hreflang="es-MX" href={`${baseUrl}${window.location.pathname}?lang=es`} />
      <link rel="alternate" hreflang="es-AR" href={`${baseUrl}${window.location.pathname}?lang=es`} />
      <link rel="alternate" hreflang="de-DE" href={`${baseUrl}${window.location.pathname}?lang=de`} />
      <link rel="alternate" hreflang="de-AT" href={`${baseUrl}${window.location.pathname}?lang=de`} />
      <link rel="alternate" hreflang="de-CH" href={`${baseUrl}${window.location.pathname}?lang=de`} />
      <link rel="alternate" hreflang="fr-FR" href={`${baseUrl}${window.location.pathname}?lang=fr`} />
      <link rel="alternate" hreflang="fr-BE" href={`${baseUrl}${window.location.pathname}?lang=fr`} />
      <link rel="alternate" hreflang="fr-CH" href={`${baseUrl}${window.location.pathname}?lang=fr`} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
    </Helmet>
  );
};

export default SEOHead;
