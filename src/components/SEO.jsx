import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
  SEO Component
  Props:
    - title: string
    - description: string
    - canonical: string (optional)
    - lang: 'en' | 'es'
    - breadcrumbs: array of { name, url }
    - schemas: array of JSON-LD objects

  Injects into <head> at runtime (SPA) to improve crawler rendering when prerendering tools used or for social sharing.
*/

function setMetaTag(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name='${name}']`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  if (!url) return;
  let link = document.querySelector("link[rel='canonical']");
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function injectJSONLD(id, data) {
  if (!data) return;
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export const SEO = ({
  title,
  description,
  canonical,
  lang = 'en',
  breadcrumbs = [],
  schemas = [],
  ogImage,
  ogType = 'website',
  siteName = 'ORBIPARTS',
  twitterImage,
  locale,
  alternates = [],
  prevUrl,
  nextUrl
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (title) document.title = title;
    if (description) setMetaTag('description', description);
  // Open Graph basic
  setMetaTag('og:title', title);
  setMetaTag('og:description', description);
  setMetaTag('og:type', ogType);
  setMetaTag('og:site_name', siteName);
  if (ogImage) setMetaTag('og:image', ogImage);
  if (locale) setMetaTag('og:locale', locale);
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
  if (twitterImage) setMetaTag('twitter:image', twitterImage);
    if (canonical) setCanonical(canonical);

    // hreflang alternates
    // Remove existing alternates we manage
    document.querySelectorAll('link[rel="alternate"]').forEach(el => {
      if (el.getAttribute('data-managed') === 'true') el.remove();
    });
    alternates.forEach(({ hrefLang, url }) => {
      if (!hrefLang || !url) return;
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hrefLang);
      link.setAttribute('href', url);
      link.setAttribute('data-managed', 'true');
      document.head.appendChild(link);
    });

    // prev/next for pagination
    // Clean previous managed prev/next
    document.querySelectorAll('link[rel="prev"], link[rel="next"]').forEach(el => {
      if (el.getAttribute('data-managed') === 'true') el.remove();
    });
    if (prevUrl) {
      const prev = document.createElement('link');
      prev.setAttribute('rel', 'prev');
      prev.setAttribute('href', prevUrl);
      prev.setAttribute('data-managed', 'true');
      document.head.appendChild(prev);
    }
    if (nextUrl) {
      const next = document.createElement('link');
      next.setAttribute('rel', 'next');
      next.setAttribute('href', nextUrl);
      next.setAttribute('data-managed', 'true');
      document.head.appendChild(next);
    }

    // Breadcrumb schema
    if (breadcrumbs.length > 0) {
      const itemListElement = breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.url
      }));
      injectJSONLD('breadcrumbs-schema', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement
      });
    }

    // Additional schemas
    schemas.forEach((schemaObj, idx) => {
      injectJSONLD(`dynamic-schema-${idx}`, schemaObj);
    });
  }, [title, description, canonical, lang, pathname, breadcrumbs, schemas, ogImage, ogType, siteName, twitterImage, locale, alternates, prevUrl, nextUrl]);

  return null;
};

export function buildServiceSchema({ name, description, areaServed = 'Worldwide', provider = 'ORBIPARTS', category }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'Organization',
      name: provider
    },
    areaServed: areaServed,
    description,
    category
  };
}

export function buildProductSchema({ name, description, brand = 'ORBIPARTS', sku, gtin13, mpn }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    ...(sku && { sku }),
    ...(gtin13 && { gtin13 }),
    ...(mpn && { mpn })
  };
}

export function buildFAQSchema(qaPairs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qaPairs.map(q => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.a
      }
    }))
  };
}

export function buildAircraftEngineServiceSchemas() {
  return [
    buildServiceSchema({
      name: 'Aircraft Engine Trading',
      description: 'Global trading of commercial aircraft engines including CFM56, LEAP, GE90, PW4000 and more.',
      category: 'Aviation' }),
    buildServiceSchema({
      name: 'Aircraft Engine Leasing',
      description: 'Short and long-term leasing solutions for airline and MRO operations across fleets.',
      category: 'Aviation' }),
    buildServiceSchema({
      name: 'Engine Overhaul Parts Supply',
      description: 'Supply of certified overhaul and repair parts for turbine engines worldwide.',
      category: 'Aviation' })
  ];
}

export function buildAircraftTradingServiceSchemas() {
  return [
    buildServiceSchema({
      name: 'Aircraft Trading',
      description: 'Purchase and sale of commercial aircraft across Airbus, Boeing, Embraer, Bombardier and more.',
      category: 'Aviation' }),
    buildServiceSchema({
      name: 'Aircraft Leasing',
      description: 'Flexible aircraft leasing solutions for operators and lessors globally.',
      category: 'Aviation' }),
    buildServiceSchema({
      name: 'Fleet Transition Support',
      description: 'Support services for fleet phase-in and phase-out including documentation and parts.',
      category: 'Aviation' })
  ];
}

export function buildProcurementPlatformSchema() {
  return buildServiceSchema({
    name: 'Aviation Procurement Software',
    description: 'Digital platform connecting operators with certified suppliers for aircraft parts quoting, sourcing and compliance.',
    category: 'Software'
  });
}

export function buildArticleSchema({
  headline,
  description,
  image,
  author = 'ORBIPARTS Editorial',
  datePublished,
  dateModified,
  keywords = [],
  url
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image ? [image] : undefined,
    author: {
      '@type': 'Organization',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'ORBIPARTS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/98d353c201a1ce1dfe4285c61d777c1b.png'
      }
    },
    datePublished,
    dateModified: dateModified || datePublished,
    keywords: keywords.join(', '),
    mainEntityOfPage: url
  };
}

export function buildWebsiteSchema({
  name = 'ORBIPARTS',
  url = 'https://www.orbiparts.com',
  searchUrl = 'https://www.orbiparts.com/search?q={search_term_string}'
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: searchUrl,
      'query-input': 'required name=search_term_string'
    }
  };
}
