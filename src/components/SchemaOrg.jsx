import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * SchemaOrg Component - Añade structured data (JSON-LD) para mejor SEO
 * Soporta múltiples idiomas
 */
const SchemaOrg = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  // Nombres de idiomas para availableLanguage
  const languageNames = {
    en: 'English',
    es: 'Spanish',
    de: 'German',
    fr: 'French'
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'ORBIPARTS',
    'legalName': 'ORBIPARTS INC.',
    'url': 'https://orbiparts.com',
    'logo': 'https://orbiparts.com/logo.png',
    'description': t('hero.subheading'),
    'foundingDate': '2020',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '8256 NW 14th St',
      'addressLocality': 'Doral',
      'addressRegion': 'FL',
      'postalCode': '33126',
      'addressCountry': 'US'
    },
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': '+1-305-XXX-XXXX',
        'contactType': 'Sales',
        'availableLanguage': Object.values(languageNames),
        'areaServed': 'Worldwide',
        'hoursAvailable': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
          ],
          'opens': '09:00',
          'closes': '18:00'
        }
      },
      {
        '@type': 'ContactPoint',
        'telephone': '+1-305-XXX-XXXX',
        'contactType': 'Emergency AOG Support',
        'availableLanguage': Object.values(languageNames),
        'areaServed': 'Worldwide',
        'hoursAvailable': '24/7'
      }
    ],
    'sameAs': [
      'https://www.linkedin.com/company/orbiparts',
      'https://twitter.com/orbiparts',
      'https://www.facebook.com/orbiparts'
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'ratingCount': '127'
    },
    'numberOfEmployees': {
      '@type': 'QuantitativeValue',
      'value': '25-50'
    }
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'ORBIPARTS',
    'url': 'https://orbiparts.com',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://orbiparts.com/stock?query={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    'inLanguage': ['en', 'es', 'de', 'fr']
  };

  // LocalBusiness Schema (Miami Office)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'ORBIPARTS Miami Headquarters',
    'image': 'https://orbiparts.com/miami-office.jpg',
    '@id': 'https://orbiparts.com',
    'url': 'https://orbiparts.com',
    'telephone': '+1-305-XXX-XXXX',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '8256 NW 14th St',
      'addressLocality': 'Doral',
      'addressRegion': 'FL',
      'postalCode': '33126',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 25.7907,
      'longitude': -80.3375
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      'opens': '09:00',
      'closes': '18:00'
    }
  };

  // Service Schema - Aircraft Parts Trading
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Aircraft Parts Trading & Supply',
    'provider': {
      '@type': 'Organization',
      'name': 'ORBIPARTS'
    },
    'areaServed': {
      '@type': 'Place',
      'name': 'Worldwide'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Aircraft Components',
      'itemListElement': [
        {
          '@type': 'OfferCatalog',
          'name': 'Engines & APUs',
          'itemListElement': []
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Avionics',
          'itemListElement': []
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Landing Gear & Brakes',
          'itemListElement': []
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Airframe & Structures',
          'itemListElement': []
        }
      ]
    },
    'offers': {
      '@type': 'AggregateOffer',
      'availability': 'https://schema.org/InStock',
      'priceCurrency': 'USD'
    }
  };

  // BreadcrumbList Schema (se puede personalizar por página)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': t('nav.home'),
        'item': 'https://orbiparts.com/'
      }
    ]
  };

  return (
    <Helmet>
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {/* Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default SchemaOrg;
