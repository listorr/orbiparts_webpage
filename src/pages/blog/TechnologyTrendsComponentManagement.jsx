import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, buildArticleSchema, buildFAQSchema } from '@/components/SEO';
import { getMediaSrc, createOnErrorHandler } from '@/lib/media';
import { BLOG_FALLBACKS } from '@/lib/mediaFallbacks';
import { buildAlternates, getOgLocale } from '@/lib/seoUtils';

const TechnologyTrendsComponentManagement = () => {
  const { t } = useTranslation();
  const title = t('blog.technology.seo.articleHeadline', 'Technology Trends Shaping Aircraft Component Management');
  const description = t('blog.technology.seo.articleDescription', 'Emerging technologies reshaping inventory control, predictive maintenance, procurement velocity, and transparency in component management.');
  const canonical = 'https://www.orbiparts.com/blog/technology-trends-aircraft-component-management';

  // Added: hreflang alternates + OG locale
  const alternates = buildAlternates(canonical);
  const locale = getOgLocale();

  const fallbacks = BLOG_FALLBACKS['technology-trends-component-management'];
  const heroImage = getMediaSrc('technology-trends-component-management-hero.jpg', fallbacks.hero);
  const image = heroImage;
  const handleHeroError = createOnErrorHandler(fallbacks.hero);
  const handlePredictiveError = createOnErrorHandler(fallbacks.predictive);
  const handleMachineLearningError = createOnErrorHandler(fallbacks.machineLearning);
  const handleRoboticsError = createOnErrorHandler(fallbacks.robotics);
  const handleStockDashboardError = createOnErrorHandler(fallbacks.stockDashboard);
  const handleSystemIntegrationError = createOnErrorHandler(fallbacks.systemIntegration);
  const handleProcurementApiError = createOnErrorHandler(fallbacks.procurementApi);
  const handleBlockchainError = createOnErrorHandler(fallbacks.blockchain);
  const keywords = [
    t('blog.technology.hero.h1'),
    t('blog.technology.predictive.h2'),
    t('blog.technology.twins.h2'),
    t('blog.technology.iot.h2'),
    t('blog.technology.blockchain.h2'),
    t('blog.technology.automation.h2'),
    t('blog.technology.cyber.h2')
  ];
  const datePublished = '2023-12-15';

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
            author: t('blog.technology.seo.author', 'Technology Analyst'),
            datePublished,
            url: canonical,
            keywords
          }),
          buildFAQSchema(t('blog.technology.faq', { returnObjects: true }) || [])
        ]}
        breadcrumbs={[
          { name: t('breadcrumbs.home', 'Home'), url: 'https://www.orbiparts.com/' },
          { name: t('breadcrumbs.blog', 'Blog'), url: 'https://www.orbiparts.com/blog' },
          { name: t('blog.technology.seo.breadcrumb', 'Technology Trends'), url: canonical }
        ]}
      />
      <article className="min-h-screen pt-16 bg-white">
        <header className="relative">
          <img
            src={heroImage}
            srcSet={`${heroImage}?w=640 640w, ${heroImage}?w=960 960w, ${heroImage}?w=1280 1280w, ${heroImage}?w=1600 1600w`}
            sizes="(max-width: 640px) 640px, (max-width: 1024px) 960px, (max-width: 1280px) 1280px, 1600px"
            alt={t('blog.technology.hero.imgAlt')}
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
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.technology.market.h2')}</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div>
                <div className="text-3xl font-bold text-blue-600">{t('blog.technology.market.stats.mroSoftwareValue.value')}</div>
                <div className="text-sm text-gray-700 mt-1">{t('blog.technology.market.stats.mroSoftwareValue.label')}</div>
                <div className="text-xs text-gray-500 mt-1">{t('blog.technology.market.stats.mroSoftwareValue.source')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{t('blog.technology.market.stats.aiAdoption.value')}</div>
                <div className="text-sm text-gray-700 mt-1">{t('blog.technology.market.stats.aiAdoption.label')}</div>
                <div className="text-xs text-gray-500 mt-1">{t('blog.technology.market.stats.aiAdoption.source')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{t('blog.technology.market.stats.unscheduledReduction.value')}</div>
                <div className="text-sm text-gray-700 mt-1">{t('blog.technology.market.stats.unscheduledReduction.label')}</div>
                <div className="text-xs text-gray-500 mt-1">{t('blog.technology.market.stats.unscheduledReduction.source')}</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.technology.predictive.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.technology.predictive.intro')}</p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('blog.technology.predictive.implementationsH3')}</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <div className="font-semibold text-gray-900">{t('blog.technology.predictive.cases.delta.title')}</div>
                <p className="text-sm text-gray-700 mt-1">{t('blog.technology.predictive.cases.delta.p')}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{t('blog.technology.predictive.cases.afklm.title')}</div>
                <p className="text-sm text-gray-700 mt-1">{t('blog.technology.predictive.cases.afklm.p')}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{t('blog.technology.predictive.cases.boeing.title')}</div>
                <p className="text-sm text-gray-700 mt-1">{t('blog.technology.predictive.cases.boeing.p')}</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('blog.technology.predictive.dataSourcesH3')}</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {(t('blog.technology.predictive.dataSources', { returnObjects: true }) || []).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('technology-trends-component-management/predictive-maintenance-analytics.jpg', fallbacks.predictive)}
                  alt={t('blog.technology.predictive.images.predictiveAlt')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handlePredictiveError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.technology.predictive.images.predictiveCaption')}</figcaption>
              </figure>
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('technology-trends-component-management-machine-learning.jpg', fallbacks.machineLearning)}
                  alt={t('blog.technology.predictive.images.mlAlt')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleMachineLearningError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.technology.predictive.images.mlCaption')}</figcaption>
              </figure>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.technology.twins.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.technology.twins.intro')}</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('blog.technology.twins.useCasesH3')}</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900">{t('blog.technology.twins.useCases.lifecycle.title')}</div>
                <p className="text-sm text-gray-700 mt-2">{t('blog.technology.twins.useCases.lifecycle.p')}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900">{t('blog.technology.twins.useCases.inventory.title')}</div>
                <p className="text-sm text-gray-700 mt-2">{t('blog.technology.twins.useCases.inventory.p')}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900">{t('blog.technology.twins.useCases.training.title')}</div>
                <p className="text-sm text-gray-700 mt-2">{t('blog.technology.twins.useCases.training.p')}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.technology.iot.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.technology.iot.intro')}</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('blog.technology.iot.sensorH3')}</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {(t('blog.technology.iot.sensors', { returnObjects: true }) || []).map((s, i) => <li key={i}>{s}</li>)}
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('blog.technology.iot.deploymentsH3')}</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <div className="font-semibold text-gray-900">{t('blog.technology.iot.deployments.rollsRoyce.title')}</div>
                <p className="text-sm text-gray-700 mt-1">{t('blog.technology.iot.deployments.rollsRoyce.p')}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{t('blog.technology.iot.deployments.collins.title')}</div>
                <p className="text-sm text-gray-700 mt-1">{t('blog.technology.iot.deployments.collins.p')}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.technology.blockchain.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.technology.blockchain.intro')}</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('blog.technology.blockchain.appsH3')}</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900">{t('blog.technology.blockchain.apps.certs.title')}</div>
                <p className="text-sm text-gray-700 mt-2">{t('blog.technology.blockchain.apps.certs.p')}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900">{t('blog.technology.blockchain.apps.trace.title')}</div>
                <p className="text-sm text-gray-700 mt-2">{t('blog.technology.blockchain.apps.trace.p')}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900">{t('blog.technology.blockchain.apps.counterfeit.title')}</div>
                <p className="text-sm text-gray-700 mt-2">{t('blog.technology.blockchain.apps.counterfeit.p')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('technology-trends-component-management/procurement-api-interface.jpg', fallbacks.procurementApi)}
                  alt={t('blog.technology.blockchain.images.procurementAlt')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleProcurementApiError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.technology.blockchain.images.procurementCaption')}</figcaption>
              </figure>
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('technology-trends-component-management/blockchain-traceability-concept.jpg', fallbacks.blockchain)}
                  alt={t('blog.technology.blockchain.images.blockchainAlt')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleBlockchainError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.technology.blockchain.images.blockchainCaption')}</figcaption>
              </figure>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.technology.automation.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.technology.automation.intro')}</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('blog.technology.automation.techH3')}</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <div className="font-semibold text-gray-900">{t('blog.technology.automation.tech.amr.title')}</div>
                <p className="text-sm text-gray-700 mt-1">{t('blog.technology.automation.tech.amr.p')}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{t('blog.technology.automation.tech.picking.title')}</div>
                <p className="text-sm text-gray-700 mt-1">{t('blog.technology.automation.tech.picking.p')}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{t('blog.technology.automation.tech.vision.title')}</div>
                <p className="text-sm text-gray-700 mt-1">{t('blog.technology.automation.tech.vision.p')}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{t('blog.technology.automation.tech.rfid.title')}</div>
                <p className="text-sm text-gray-700 mt-1">{t('blog.technology.automation.tech.rfid.p')}</p>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <img
                src={getMediaSrc('technology-trends-component-management-robotics.jpg', fallbacks.robotics)}
                alt={t('blog.technology.automation.images.roboticsAlt')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleRoboticsError}
              />
              <img
                src={getMediaSrc('technology-trends-component-management-stock-dashboard.jpg', fallbacks.stockDashboard)}
                alt={t('blog.technology.automation.images.stockAlt')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleStockDashboardError}
              />
              <img
                src={getMediaSrc('technology-trends-component-management/system-integration-diagram.jpg', fallbacks.systemIntegration)}
                alt={t('blog.technology.automation.images.integrationAlt')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleSystemIntegrationError}
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.technology.cyber.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.technology.cyber.intro')}</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('blog.technology.cyber.requirementsH3')}</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {(t('blog.technology.cyber.requirements', { returnObjects: true }) || []).map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('blog.technology.cyber.bestH3')}</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                {(t('blog.technology.cyber.bestPractices', { returnObjects: true }) || []).map((bp, i) => <li key={i}>{bp}</li>)}
              </ol>
            </div>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.technology.orbiparts.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.technology.orbiparts.intro')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.technology.orbiparts.capabilities.ai.title')}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {(t('blog.technology.orbiparts.capabilities.ai.items', { returnObjects: true }) || []).map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.technology.orbiparts.capabilities.docs.title')}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {(t('blog.technology.orbiparts.capabilities.docs.items', { returnObjects: true }) || []).map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.technology.orbiparts.capabilities.inventory.title')}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {(t('blog.technology.orbiparts.capabilities.inventory.items', { returnObjects: true }) || []).map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.technology.orbiparts.capabilities.security.title')}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {(t('blog.technology.orbiparts.capabilities.security.items', { returnObjects: true }) || []).map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-white p-4 rounded-lg border-l-4 border-blue-600">
              <div className="font-semibold text-gray-900 mb-2">{t('blog.technology.orbiparts.metricsH3')}</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{t('blog.technology.orbiparts.metrics.aog.value')}</div>
                  <div className="text-xs text-gray-600">{t('blog.technology.orbiparts.metrics.aog.label')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{t('blog.technology.orbiparts.metrics.fill.value')}</div>
                  <div className="text-xs text-gray-600">{t('blog.technology.orbiparts.metrics.fill.label')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{t('blog.technology.orbiparts.metrics.uptime.value')}</div>
                  <div className="text-xs text-gray-600">{t('blog.technology.orbiparts.metrics.uptime.label')}</div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.technology.takeaways.h2')}</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              {Object.values(t('blog.technology.takeaways.items', { returnObjects: true }) || {}).map((item, i) => (
                <li key={i}>
                  <strong>{item.title}:</strong> {item.p}
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.technology.related.h2')}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/blog/global-aircraft-parts-supply-chains" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.technology.related.card1.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.technology.related.card1.desc')}</p>
              </Link>
              <Link to="/blog/sustainable-aviation-component-trading" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.technology.related.card2.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.technology.related.card2.desc')}</p>
              </Link>
              <Link to="/blog/aog-response-strategies" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.technology.related.card3.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.technology.related.card3.desc')}</p>
              </Link>
            </div>
          </section>

          <section className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.technology.cta.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="block mb-2">{t('blog.technology.cta.p1')}</span>
              <span className="block">{t('blog.technology.cta.p2')}</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="bg-primary text-white px-5 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors" to="/contact">{t('blog.technology.cta.primary')}</Link>
              <Link className="px-5 py-3 rounded-md font-semibold border border-gray-300 hover:border-gray-400 transition-colors" to="/stock">{t('blog.technology.cta.secondary')}</Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default TechnologyTrendsComponentManagement;
