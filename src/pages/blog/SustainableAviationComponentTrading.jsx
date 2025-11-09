import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, buildArticleSchema, buildFAQSchema } from '@/components/SEO';
import { getMediaSrc, createOnErrorHandler } from '@/lib/media';
import { BLOG_FALLBACKS } from '@/lib/mediaFallbacks';
import { buildAlternates, getOgLocale } from '@/lib/seoUtils';
import LazySection from '@/components/LazySection';

const SustainableAviationComponentTrading = () => {
  const { t } = useTranslation();
  const title = t('blog.sustainable.seo.articleHeadline', 'Sustainable Aviation: The Role of Component Trading in Green Initiatives');
  const description = t('blog.sustainable.seo.articleDescription', 'How strategic component trading, refurbishment, and lifecycle optimization reduce waste and support sustainability in aviation operations.');
  const canonical = 'https://www.orbiparts.com/blog/sustainable-aviation-component-trading';

  // Added: hreflang alternates + OG locale
  const alternates = buildAlternates(canonical);
  const locale = getOgLocale();

  const fallbacks = BLOG_FALLBACKS['sustainable-aviation-component-trading'];
  const heroImage = getMediaSrc('sustainable-aviation-component-trading-hero.jpg', fallbacks.hero);
  const image = heroImage;
  const handleHeroError = createOnErrorHandler(fallbacks.hero);
  const handleDashboardError = createOnErrorHandler(fallbacks.dashboard);
  const handleInspectionError = createOnErrorHandler(fallbacks.inspection);
  const handleFacilityError = createOnErrorHandler(fallbacks.facility);
  const handleTeardownError = createOnErrorHandler(fallbacks.teardown);
  const handleDocumentationError = createOnErrorHandler(fallbacks.documentation);
  const keywords = [
    t('blog.sustainable.hero.h1'),
    t('blog.sustainable.regulatory.h2'),
    t('blog.sustainable.netZero.h2'),
    t('blog.sustainable.circular.h2'),
    t('blog.sustainable.esg.h2'),
    t('blog.sustainable.risk.h2')
  ];
  const datePublished = '2023-12-28';

  return (
    <>
      <SEO
        title={`${title} | ORBIPARTS`}
        description={description}
        canonical={canonical}
        ogType="article"
        ogImage={image}
        twitterImage={image}
        alternates={alternates}
        locale={locale}
          schemas={[
            buildArticleSchema({
              headline: title,
              description,
              image,
              author: t('blog.sustainable.seo.author', 'Sustainability Team'),
              datePublished,
              url: canonical,
              keywords
            }),
            buildFAQSchema(
              Object.values(t('blog.sustainable.faq', { returnObjects: true }) || {})
            )
          ]}
        breadcrumbs={[
          { name: t('breadcrumbs.home', 'Home'), url: 'https://www.orbiparts.com/' },
          { name: t('breadcrumbs.blog', 'Blog'), url: 'https://www.orbiparts.com/blog' },
          { name: t('blog.sustainable.seo.breadcrumb', 'Sustainable Aviation'), url: canonical }
        ]}
      />
      <article className="min-h-screen pt-16 bg-white">
        <header className="relative">
          <img
            src={heroImage}
            srcSet={`${heroImage}?w=640 640w, ${heroImage}?w=960 960w, ${heroImage}?w=1280 1280w, ${heroImage}?w=1600 1600w`}
            sizes="(max-width: 640px) 640px, (max-width: 1024px) 960px, (max-width: 1280px) 1280px, 1600px"
            alt={t('blog.sustainable.hero.imgAlt')}
            className="w-full h-[300px] md:h-[420px] object-cover"
            loading="eager"
            decoding="async"
            onError={handleHeroError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{title}</h1>
              <p className="text-blue-100 mt-3 max-w-3xl">{description}</p>
            </div>
          </div>
        </header>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          
          {/* ICAO CORSIA & Regulatory Framework */}
          <LazySection>
          <section className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('blog.sustainable.regulatory.h2')}</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">{t('blog.sustainable.regulatory.cards.corsia.value')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.sustainable.regulatory.cards.corsia.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.sustainable.regulatory.cards.corsia.desc')}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">{t('blog.sustainable.regulatory.cards.netZero.value')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.sustainable.regulatory.cards.netZero.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.sustainable.regulatory.cards.netZero.desc')}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">{t('blog.sustainable.regulatory.cards.safGrowth.value')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.sustainable.regulatory.cards.safGrowth.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.sustainable.regulatory.cards.safGrowth.desc')}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.sustainable.regulatory.corsia.h3')}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{t('blog.sustainable.regulatoryIntro', 'CORSIA overview default')}</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3"><span className="text-green-600 font-bold mt-1">→</span><span>{t('blog.sustainable.regulatory.corsia.baseline')}</span></li>
                <li className="flex items-start gap-3"><span className="text-green-600 font-bold mt-1">→</span><span>{t('blog.sustainable.regulatory.corsia.scope')}</span></li>
                <li className="flex items-start gap-3"><span className="text-green-600 font-bold mt-1">→</span><span>{t('blog.sustainable.regulatory.corsia.mechanism')}</span></li>
                <li className="flex items-start gap-3"><span className="text-green-600 font-bold mt-1">→</span><span>{t('blog.sustainable.regulatory.corsia.monitoring')}</span></li>
                <li className="flex items-start gap-3"><span className="text-green-600 font-bold mt-1">→</span><span>{t('blog.sustainable.regulatory.corsia.cost')}</span></li>
              </ul>
            </div>
          </section>
          </LazySection>

          {/* Net-Zero Pathway */}
          <LazySection>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.sustainable.netZero.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{t('blog.sustainable.netZero.intro')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.sustainable.netZero.pillar1.title')}</h3>
                <p className="text-gray-700 mb-3">{t('blog.sustainable.netZero.pillar1.points.0')}</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.sustainable.netZero.pillar1.points.1')}</li>
                  <li>• {t('blog.sustainable.netZero.pillar1.points.2')}</li>
                  <li>• {t('blog.sustainable.netZero.pillar1.points.3')}</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.sustainable.netZero.pillar2.title')}</h3>
                <p className="text-gray-700 mb-3">{t('blog.sustainable.netZero.pillar2.points.0')}</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.sustainable.netZero.pillar2.points.1')}</li>
                  <li>• {t('blog.sustainable.netZero.pillar2.points.2')}</li>
                  <li>• {t('blog.sustainable.netZero.pillar2.points.3')}</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.sustainable.netZero.pillar3.title')}</h3>
                <p className="text-gray-700 mb-3">{t('blog.sustainable.netZero.pillar3.points.0')}</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.sustainable.netZero.pillar3.points.1')}</li>
                  <li>• {t('blog.sustainable.netZero.pillar3.points.2')}</li>
                  <li>• {t('blog.sustainable.netZero.pillar3.points.3')}</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.sustainable.netZero.pillar4.title')}</h3>
                <p className="text-gray-700 mb-3">{t('blog.sustainable.netZero.pillar4.points.0')}</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.sustainable.netZero.pillar4.points.1')}</li>
                  <li>• {t('blog.sustainable.netZero.pillar4.points.2')}</li>
                  <li>• {t('blog.sustainable.netZero.pillar4.points.3')}</li>
                </ul>
              </div>
            </div>
          </section>
          </LazySection>

          {/* Circular Economy Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.sustainable.circular.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.sustainable.circular.p1')}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{t('blog.sustainable.circular.p2')}</p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4">{t('blog.sustainable.circular.numbersH3', 'Aviation Circular Economy: By The Numbers')}</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{t('blog.sustainable.circular.numbers.retirements.value', '18,930')}</div>
                  <div className="text-sm text-gray-700">{t('blog.sustainable.circular.numbers.retirements.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{t('blog.sustainable.circular.numbers.usmMarket.value', '$45B+')}</div>
                  <div className="text-sm text-gray-700">{t('blog.sustainable.circular.numbers.usmMarket.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{t('blog.sustainable.circular.numbers.carbon.value', '40-70%')}</div>
                  <div className="text-sm text-gray-700">{t('blog.sustainable.circular.numbers.carbon.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{t('blog.sustainable.circular.numbers.recoverable.value', '85-90%')}</div>
                  <div className="text-sm text-gray-700">{t('blog.sustainable.circular.numbers.recoverable.label')}</div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('blog.sustainable.levers.h3')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">1.</span> {t('blog.sustainable.levers.items.1.title')}
                </h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.sustainable.levers.items.1.p')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">2.</span> {t('blog.sustainable.levers.items.2.title')}
                </h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.sustainable.levers.items.2.p')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">3.</span> {t('blog.sustainable.levers.items.3.title')}
                </h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.sustainable.levers.items.3.p')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">4.</span> {t('blog.sustainable.levers.items.4.title')}
                </h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.sustainable.levers.items.4.p')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">5.</span> {t('blog.sustainable.levers.items.5.title')}
                </h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.sustainable.levers.items.5.p')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">6.</span> {t('blog.sustainable.levers.items.6.title')}
                </h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.sustainable.levers.items.6.p')}</p>
              </div>
            </div>
          </section>
          {/* ESG Measurement & Reporting */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.sustainable.esg.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.sustainable.esg.intro1')}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{t('blog.sustainable.esg.intro2')}</p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-xl text-gray-900 mb-4">{t('blog.sustainable.esg.method.h3')}</h3>
              <p className="text-gray-700 mb-4">{t('blog.sustainable.esg.methodIntro', 'Lifecycle assessment phases')}</p>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('blog.sustainable.esg.method.extraction')}</h4>
                  <p className="text-sm text-gray-700">{t('blog.sustainable.esg.method.extractionDetail', 'Mining, refining, alloys')}</p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('blog.sustainable.esg.method.manufacturing')}</h4>
                  <p className="text-sm text-gray-700">{t('blog.sustainable.esg.method.manufacturingDetail', 'Casting, machining, heat treatment, coating')}</p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('blog.sustainable.esg.method.logistics')}</h4>
                  <p className="text-sm text-gray-700">{t('blog.sustainable.esg.method.logisticsDetail', 'Transport, packaging, warehousing')}</p>
                </div>
              </div>
              <div className="bg-green-50 rounded p-5">
                <h4 className="font-semibold text-gray-900 mb-3">{t('blog.sustainable.esg.example.h4')}</h4>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>{t('blog.sustainable.esg.example.component')}</p>
                  <p>{t('blog.sustainable.esg.example.new')}</p>
                  <p>{t('blog.sustainable.esg.example.refurb')}</p>
                  <p className="font-bold text-green-700">{t('blog.sustainable.esg.example.avoidance')}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4">{t('blog.sustainable.esg.tracking.h3')}</h3>
              <p className="text-gray-700 mb-4">
                {t('blog.sustainable.esg.trackingIntro', 'Digital procurement systems capture:')}
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.sustainable.esg.tracking.provenance')}</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.sustainable.esg.tracking.refurbishment')}</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.sustainable.esg.tracking.logistics')}</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.sustainable.esg.tracking.avoided')}</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.sustainable.esg.tracking.verification')}</span></li>
              </ul>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <img
                src={getMediaSrc('sustainable-aviation-component-trading/sustainability-kpi-dashboard.jpg', fallbacks.dashboard)}
                alt={t('blog.sustainable.esg.images.dashboardAlt', 'Dashboard showing sustainability KPIs and carbon metrics')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleDashboardError}
              />
              <img
                src={getMediaSrc('sustainable-aviation-component-trading-inspection.jpg', fallbacks.inspection)}
                alt={t('blog.sustainable.esg.images.inspectionAlt', 'Technician performing component inspection for refurbishment')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleInspectionError}
              />
              <img
                src={getMediaSrc('sustainable-aviation-component-trading-facility.jpg', fallbacks.facility)}
                alt={t('blog.sustainable.esg.images.facilityAlt', 'Green-certified facility corridor')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleFacilityError}
              />
            </div>
          </section>
          {/* Risk Management in Sustainable Component Trading */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.sustainable.risk.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.sustainable.risk.intro')}</p>
            <div className="bg-yellow-50 rounded-lg p-6 mb-6 border-l-4 border-yellow-600">
              <h3 className="font-bold text-xl text-gray-900 mb-4">{t('blog.sustainable.risk.qc.h3')}</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold text-xl">1.</span>
                  <div>
                    <h4 className="font-semibold">{t('blog.sustainable.risk.qc.points.1.title')}</h4>
                    <p className="text-sm mt-1">{t('blog.sustainable.risk.qc.points.1.p')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold text-xl">2.</span>
                  <div>
                    <h4 className="font-semibold">{t('blog.sustainable.risk.qc.points.2.title')}</h4>
                    <p className="text-sm mt-1">{t('blog.sustainable.risk.qc.points.2.p')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold text-xl">3.</span>
                  <div>
                    <h4 className="font-semibold">{t('blog.sustainable.risk.qc.points.3.title')}</h4>
                    <p className="text-sm mt-1">{t('blog.sustainable.risk.qc.points.3.p')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold text-xl">4.</span>
                  <div>
                    <h4 className="font-semibold">{t('blog.sustainable.risk.qc.points.4.title')}</h4>
                    <p className="text-sm mt-1">{t('blog.sustainable.risk.qc.points.4.p')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold text-xl">5.</span>
                  <div>
                    <h4 className="font-semibold">{t('blog.sustainable.risk.qc.points.5.title')}</h4>
                    <p className="text-sm mt-1">{t('blog.sustainable.risk.qc.points.5.p')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('sustainable-aviation-component-trading/engine-teardown-parts-harvest.jpg', fallbacks.teardown)}
                  alt={t('blog.sustainable.risk.images.teardownAlt')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleTeardownError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.sustainable.risk.images.teardownCaption')}</figcaption>
              </figure>
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('sustainable-aviation-component-trading/documentation-lab-review.jpg', fallbacks.documentation)}
                  alt={t('blog.sustainable.risk.images.docAlt')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleDocumentationError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.sustainable.risk.images.docCaption')}</figcaption>
              </figure>
            </div>
          </section>

          {/* ORBIPARTS Sustainability Capabilities */}
          <section className="bg-green-50 rounded-lg p-8 border-2 border-green-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('blog.sustainable.orbiparts.h2')}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{t('blog.sustainable.orbiparts.intro')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.sustainable.orbiparts.cards.circular.title')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">→</span><span>{t('blog.sustainable.orbiparts.cards.circular.teardown')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">→</span><span>{t('blog.sustainable.orbiparts.cards.circular.repairNetwork')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">→</span><span>{t('blog.sustainable.orbiparts.cards.circular.exchangePrograms')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">→</span><span>{t('blog.sustainable.orbiparts.cards.circular.endOfLife')}</span></li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.sustainable.orbiparts.cards.digital.title')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">→</span><span>{t('blog.sustainable.orbiparts.cards.digital.carbonCalculator')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">→</span><span>{t('blog.sustainable.orbiparts.cards.digital.blockchain')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">→</span><span>{t('blog.sustainable.orbiparts.cards.digital.esgIntegration')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">→</span><span>{t('blog.sustainable.orbiparts.cards.digital.apiFeeds')}</span></li>
                </ul>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.sustainable.orbiparts.metricsH3')}</h3>
              <div className="grid md:grid-cols-4 gap-4 text-gray-700">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{t('blog.sustainable.orbiparts.metrics.co2Avoided.value')}</div>
                  <div className="text-sm">{t('blog.sustainable.orbiparts.metrics.co2Avoided.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{t('blog.sustainable.orbiparts.metrics.circularPercent.value')}</div>
                  <div className="text-sm">{t('blog.sustainable.orbiparts.metrics.circularPercent.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{t('blog.sustainable.orbiparts.metrics.landfillZero.value')}</div>
                  <div className="text-sm">{t('blog.sustainable.orbiparts.metrics.landfillZero.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{t('blog.sustainable.orbiparts.metrics.iso.value')}</div>
                  <div className="text-sm">{t('blog.sustainable.orbiparts.metrics.iso.label')}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="bg-gray-900 text-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">{t('blog.sustainable.takeaways.h2')}</h2>
            <div className="space-y-4">
              {Object.entries(t('blog.sustainable.takeaways.items', { returnObjects: true }) || {}).map(([key, item]) => (
                <div className="flex items-start gap-4" key={key}>
                  <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{key}</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.sustainable.cta.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('blog.sustainable.cta.p1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('blog.sustainable.cta.p2')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="bg-primary text-white px-5 py-3 rounded-md font-semibold hover:bg-primary/90 transition" to="/contact">{t('blog.sustainable.cta.primary')}</Link>
              <Link className="px-5 py-3 rounded-md font-semibold border border-gray-300 hover:bg-gray-50 transition" to="/stock">{t('blog.sustainable.cta.secondary')}</Link>
            </div>
          {/* Related Articles */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.sustainable.related.h2')}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/blog/technology-trends-aircraft-component-management" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.sustainable.related.card1.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.sustainable.related.card1.desc')}</p>
              </Link>
              <Link to="/blog/future-of-legacy-aircraft" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.sustainable.related.card2.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.sustainable.related.card2.desc')}</p>
              </Link>
              <Link to="/blog/global-aircraft-parts-supply-chains" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.sustainable.related.card3.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.sustainable.related.card3.desc')}</p>
              </Link>
            </div>
          </section>

          </section>
        </div>
      </article>
    </>
  );
};

export default SustainableAviationComponentTrading;
