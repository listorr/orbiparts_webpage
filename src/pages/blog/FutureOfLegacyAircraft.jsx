import React from 'react';
import { Link } from 'react-router-dom';
import { SEO, buildArticleSchema } from '@/components/SEO';
import { getMediaSrc, createOnErrorHandler } from '@/lib/media';
import { BLOG_FALLBACKS } from '@/lib/mediaFallbacks';
import { buildAlternates, getOgLocale } from '@/lib/seoUtils';
import { useTranslation } from 'react-i18next';
import ResponsiveHeroImage from '@/components/ResponsiveHeroImage';

export default function FutureOfLegacyAircraft() {
  const { t } = useTranslation();
  const canonicalUrl = 'https://www.orbiparts.com/blog/future-of-legacy-aircraft';
  const fallbacks = BLOG_FALLBACKS['future-of-legacy-aircraft'];
  const title = t('blog.legacy.seo.articleHeadline');
  const description = t('blog.legacy.seo.articleDescription');

  const heroImage = getMediaSrc('future-of-legacy-aircraft-hero.jpg', fallbacks.hero);
  const handleHeroError = createOnErrorHandler(fallbacks.hero);
  const handleHangarError = createOnErrorHandler(fallbacks.hangar);
  const handleCockpitError = createOnErrorHandler(fallbacks.cockpit);
  const handleEngineModuleError = createOnErrorHandler(fallbacks.engineModule);
  const handleTurbineError = createOnErrorHandler(fallbacks.turbine);
  const handleDocumentationError = createOnErrorHandler(fallbacks.documentation);

  const keywords = t('blog.legacy.seo.keywords', { returnObjects: true });
  const datePublished = '2024-01-15';

  const alternates = buildAlternates(canonicalUrl);
  const locale = getOgLocale();

  return (
    <>
      <SEO
        title={`${title} | ORBIPARTS`}
        description={description}
        canonical={canonicalUrl}
        ogType="article"
        ogImage={heroImage}
        twitterImage={heroImage}
        alternates={alternates}
        locale={locale}
        schemas={[
          buildArticleSchema({
            headline: title,
            description,
            image: heroImage,
            author: t('blog.legacy.seo.author'),
            datePublished,
            url: canonicalUrl,
            keywords
          })
        ]}
        breadcrumbs={[
          { name: t('nav.home'), url: 'https://www.orbiparts.com/' },
          { name: t('blogLanding.seo.breadcrumb'), url: 'https://www.orbiparts.com/blog' },
          { name: t('blog.legacy.seo.breadcrumb'), url: canonicalUrl }
        ]}
      />

      <article className="min-h-screen pt-16 bg-white">
        {/* Hero */}
        <header className="relative overflow-hidden">
          <ResponsiveHeroImage
            src={heroImage}
            alt={t('blog.legacy.hero.imgAlt')}
            className="w-full h-[320px] md:h-[420px] object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1600px"
            priority={true}
            onError={handleHeroError}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{title}</h1>
              <p className="text-blue-100 mt-3 max-w-3xl">{description}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* Market Overview Section */}
          <section className="bg-gray-50 rounded-lg p-8 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('blog.legacy.market.h2')}</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t('blog.legacy.market.stats.aircraftReplacements.value')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.legacy.market.stats.aircraftReplacements.label')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.legacy.market.stats.aircraftReplacements.source')}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t('blog.legacy.market.stats.usmMarket.value')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.legacy.market.stats.usmMarket.label')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.legacy.market.stats.usmMarket.source')}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t('blog.legacy.market.stats.activeLegacy.value')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.legacy.market.stats.activeLegacy.label')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.legacy.market.stats.activeLegacy.source')}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.legacy.market.drivers.h3')}</h3>
              <ul className="space-y-3 text-gray-700">
                {t('blog.legacy.market.drivers.items', { returnObjects: true }).map(item => (
                  <li key={item.title} className="flex items-start gap-3"><span className="text-blue-600 font-bold mt-1">•</span><span><strong>{item.title}:</strong> {item.desc}</span></li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.legacy.persistence.h2')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('blog.legacy.persistence.p1')}</p>
            <p className="text-gray-700 leading-relaxed mt-4">{t('blog.legacy.persistence.p2')}</p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <figure className="rounded-lg overflow-hidden">
                <img src={getMediaSrc('future-of-legacy-aircraft-hangar.jpg', fallbacks.hangar)} alt={t('blog.legacy.persistence.images.hangarAlt')} className="w-full h-56 object-cover" loading="lazy" decoding="async" onError={handleHangarError} />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.legacy.persistence.images.hangarCaption')}</figcaption>
              </figure>
              <figure className="rounded-lg overflow-hidden">
                <img src={getMediaSrc('future-of-legacy-aircraft-cockpit.jpg', fallbacks.cockpit)} alt={t('blog.legacy.persistence.images.cockpitAlt')} className="w-full h-56 object-cover" loading="lazy" decoding="async" onError={handleCockpitError} />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.legacy.persistence.images.cockpitCaption')}</figcaption>
              </figure>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.legacy.usmPma.h2')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('blog.legacy.usmPma.intro')}</p>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.legacy.usmPma.usm.title')}</h3>
                <ul className="space-y-2 text-gray-700">
                  {t('blog.legacy.usmPma.usm.points', { returnObjects: true }).map(p => (
                    <li key={p} className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.legacy.usmPma.pma.title')}</h3>
                <ul className="space-y-2 text-gray-700">
                  {t('blog.legacy.usmPma.pma.points', { returnObjects: true }).map(p => (
                    <li key={p} className="flex items-start gap-2"><span className="text-green-600 font-bold">→</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-8">{t('blog.legacy.usmPma.sourcingH3')}</h3>
            <p className="text-gray-700 leading-relaxed">{t('blog.legacy.usmPma.sourcingP')}</p>
            <ul className="list-disc pl-6 mt-4 text-gray-700 space-y-2">
              {t('blog.legacy.usmPma.sourcingList', { returnObjects: true }).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <img src={getMediaSrc('future-of-legacy-aircraft-engine-module.jpg', fallbacks.engineModule)} alt={t('blog.legacy.usmPma.images.engineModuleAlt')} className="rounded-lg w-full h-44 object-cover" loading="lazy" decoding="async" onError={handleEngineModuleError} />
              <img src={getMediaSrc('future-of-legacy-aircraft-turbine.jpg', fallbacks.turbine)} alt={t('blog.legacy.usmPma.images.turbineAlt')} className="rounded-lg w-full h-44 object-cover" loading="lazy" decoding="async" onError={handleTurbineError} />
              <img src={getMediaSrc('future-of-legacy-aircraft-documentation.jpg', fallbacks.documentation)} alt={t('blog.legacy.usmPma.images.documentationAlt')} className="rounded-lg w-full h-44 object-cover" loading="lazy" decoding="async" onError={handleDocumentationError} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.legacy.lifecycle.h2')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('blog.legacy.lifecycle.p')}</p>
            <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-purple-200">
              <h3 className="font-bold text-xl text-gray-900 mb-4">{t('blog.legacy.lifecycle.programs.h3')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2"> {t('blog.legacy.lifecycle.programs.categories.avionics.title')}</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    {t('blog.legacy.lifecycle.programs.categories.avionics.points', { returnObjects: true }).map(p => <li key={p}>• {p}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2"> {t('blog.legacy.lifecycle.programs.categories.structural.title')}</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    {t('blog.legacy.lifecycle.programs.categories.structural.points', { returnObjects: true }).map(p => <li key={p}>• {p}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2"> {t('blog.legacy.lifecycle.programs.categories.reliability.title')}</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    {t('blog.legacy.lifecycle.programs.categories.reliability.points', { returnObjects: true }).map(p => <li key={p}>• {p}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2"> {t('blog.legacy.lifecycle.programs.categories.data.title')}</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    {t('blog.legacy.lifecycle.programs.categories.data.points', { returnObjects: true }).map(p => <li key={p}>• {p}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-8">Strategic Teardown Sourcing</h3>
            <p className="text-gray-700 leading-relaxed">{t('blog.legacy.teardown.p')}</p>
            <div className="bg-gray-50 rounded-xl p-6 mt-4">
              <h4 className="font-semibold text-gray-900 mb-3">{t('blog.legacy.teardown.presecureH4')}</h4>
              <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                {['col1','col2','col3'].map(col => (
                  <ul key={col} className="space-y-1 text-sm">
                    {t(`blog.legacy.teardown.lists.${col}`, { returnObjects: true }).map(item => <li key={item}>{item}</li>)}
                  </ul>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900">{t('blog.legacy.platforms.h3')}</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-1">
                {t('blog.legacy.platforms.list1', { returnObjects: true }).map(item => <li key={item}>{item}</li>)}
              </ul>
              <ul className="list-disc pl-6 space-y-1">
                {t('blog.legacy.platforms.list2', { returnObjects: true }).map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          {/* How ORBIPARTS Supports Legacy Operations */}
          <section className="bg-blue-50 rounded-lg p-8 border-2 border-indigo-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('blog.legacy.orbiparts.h2')}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{t('blog.legacy.orbiparts.intro')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {['ai','blockchain','exchange','lifecycle'].map(key => {
                const card = t(`blog.legacy.orbiparts.cards.${key}`, { returnObjects: true });
                return (
                  <div key={key} className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2"> {card.title} </h3>
                    <p className="text-gray-700 leading-relaxed"> {card.p} </p>
                  </div>
                );
              })}
            </div>
            <div className="bg-indigo-100 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.legacy.orbiparts.why.h3')}</h3>
              <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                {Object.keys(t('blog.legacy.orbiparts.why.metrics', { returnObjects: true })).map(metricKey => {
                  const metric = t(`blog.legacy.orbiparts.why.metrics.${metricKey}`, { returnObjects: true });
                  return (
                    <div key={metricKey}>
                      <div className="text-2xl font-bold text-indigo-600 mb-1">{metric.value}</div>
                      <div className="text-sm">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="bg-gray-900 text-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">{t('blog.legacy.takeaways.h2')}</h2>
            <div className="space-y-4">
              {t('blog.legacy.takeaways.items', { returnObjects: true }).map((item, idx) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{idx + 1}</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.legacy.forward.h2')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('blog.legacy.forward.p1')}</p>
            <p className="text-gray-700 leading-relaxed mt-4">{t('blog.legacy.forward.p2')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="bg-primary text-white px-5 py-3 rounded-md font-semibold hover:bg-primary/90 transition" to="/contact">{t('blog.legacy.forward.cta.primary')}</Link>
              <Link className="px-5 py-3 rounded-md font-semibold border border-gray-300 hover:bg-gray-50 transition" to="/stock">{t('blog.legacy.forward.cta.secondary')}</Link>
            </div>
            {/* Related Articles */}
            <section className="bg-blue-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.legacy.related.h2')}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/blog/sustainable-aviation-component-trading" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('blog.legacy.related.card1.title')}</h3>
                  <p className="text-sm text-gray-600">{t('blog.legacy.related.card1.desc')}</p>
                </Link>
                <Link to="/blog/top-10-aircraft-parts-suppliers-2025" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('blog.legacy.related.card2.title')}</h3>
                  <p className="text-sm text-gray-600">{t('blog.legacy.related.card2.desc')}</p>
                </Link>
                <Link to="/blog/technology-trends-aircraft-component-management" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('blog.legacy.related.card3.title')}</h3>
                  <p className="text-sm text-gray-600">{t('blog.legacy.related.card3.desc')}</p>
                </Link>
              </div>
            </section>
          </section>
        </div>
      </article>
    </>
  );
}
