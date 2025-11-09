// Reusable helpers for SEO hreflang alternates and OG locale codes

export const SUPPORTED_LANGS = ['en', 'es', 'de', 'fr'];

const OG_LOCALE_MAP = {
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
};

export function getOgLocale(lang = 'en') {
  return OG_LOCALE_MAP[lang] || OG_LOCALE_MAP.en;
}

// Generate hreflang alternates. Uses query param `?lang=` for language variants
// and includes x-default as the canonical URL without a lang param.
export function buildAlternates(canonicalUrl) {
  if (!canonicalUrl) return [];
  const list = [];

  // Generic language alternates
  for (const lang of SUPPORTED_LANGS) {
    list.push({ hrefLang: lang, url: `${canonicalUrl}?lang=${lang}` });
  }

  // Region-specific alternates (map to same URLs for now)
  // These help search engines better geo-target when content is the same.
  list.push(
    { hrefLang: 'en-US', url: `${canonicalUrl}?lang=en` },
    { hrefLang: 'es-ES', url: `${canonicalUrl}?lang=es` },
    { hrefLang: 'es-MX', url: `${canonicalUrl}?lang=es` },
    { hrefLang: 'es-AR', url: `${canonicalUrl}?lang=es` },
    { hrefLang: 'de-DE', url: `${canonicalUrl}?lang=de` },
    { hrefLang: 'de-AT', url: `${canonicalUrl}?lang=de` },
    { hrefLang: 'de-CH', url: `${canonicalUrl}?lang=de` },
    { hrefLang: 'fr-FR', url: `${canonicalUrl}?lang=fr` },
    { hrefLang: 'fr-BE', url: `${canonicalUrl}?lang=fr` },
    { hrefLang: 'fr-CH', url: `${canonicalUrl}?lang=fr` }
  );

  // x-default
  list.push({ hrefLang: 'x-default', url: canonicalUrl });

  return list;
}
