import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, buildArticleSchema } from '@/components/SEO';
import { getMediaSrc, createOnErrorHandler } from '@/lib/media';
import { BLOG_FALLBACKS } from '@/lib/mediaFallbacks';
import { buildAlternates, getOgLocale } from '@/lib/seoUtils';
import LazySection from '@/components/LazySection';
import ResponsiveHeroImage from '@/components/ResponsiveHeroImage';

const GlobalAircraftPartsSupplyChains = () => {
  const { t } = useTranslation();
  const title = t('blog.globalSupply.seo.articleHeadline');
  const description = t('blog.globalSupply.seo.articleDescription');
  const canonical = 'https://www.orbiparts.com/blog/global-aircraft-parts-supply-chains';

  // Added: hreflang alternates + OG locale
  const alternates = buildAlternates(canonical);
  const locale = getOgLocale();

  const fallbacks = BLOG_FALLBACKS['global-aircraft-parts-supply-chains'];
  const heroImage = getMediaSrc('global-aircraft-parts-supply-chains-hero.jpg', fallbacks.hero);
  const image = heroImage;
  const handleHeroError = createOnErrorHandler(fallbacks.hero);
  const handleDocumentControlError = createOnErrorHandler(fallbacks.documentControl);
  const handleCargoPalletsError = createOnErrorHandler(fallbacks.cargoPallets);
  const handleCloudInterfaceError = createOnErrorHandler(fallbacks.cloudInterface);
  const handleAnalyticsError = createOnErrorHandler(fallbacks.analytics);
  const handleApiDiagramError = createOnErrorHandler(fallbacks.apiDiagram);
  const keywords = [
    t('blog.globalSupply.hero.h1'),
    t('blog.globalSupply.postCovid.h2'),
    t('blog.globalSupply.geopolitical.h2'),
    t('blog.globalSupply.semiconductor.h2'),
    t('blog.globalSupply.data.h2'),
    t('blog.globalSupply.orbiparts.h2')
  ];
  const datePublished = '2023-12-20';

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
        schemas={[buildArticleSchema({
          headline: title,
          description,
          image,
          author: t('blog.globalSupply.seo.author'),
          datePublished,
          url: canonical,
          keywords
        })]}
        breadcrumbs={[
          { name: t('breadcrumbs.home', 'Home'), url: 'https://www.orbiparts.com/' },
          { name: t('breadcrumbs.blog', 'Blog'), url: 'https://www.orbiparts.com/blog' },
          { name: t('blog.globalSupply.seo.breadcrumb'), url: canonical }
        ]}
      />
      <article className="min-h-screen pt-16 bg-white">
        <header className="relative">
          <ResponsiveHeroImage
            src={heroImage}
            alt={t('blog.globalSupply.hero.imgAlt')}
            className="w-full h-[300px] md:h-[420px] object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1600px"
            priority={true}
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
          
          {/* Post-COVID Supply Chain Reality */}
          <LazySection>
          <section className="bg-red-50 rounded-lg p-8 border-2 border-red-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('blog.globalSupply.postCovid.h2')}</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-2">{t('blog.globalSupply.postCovid.cards.costIncrease.value')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.globalSupply.postCovid.cards.costIncrease.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.globalSupply.postCovid.cards.costIncrease.desc')}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-2">{t('blog.globalSupply.postCovid.cards.leadTimes.value')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.globalSupply.postCovid.cards.leadTimes.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.globalSupply.postCovid.cards.leadTimes.desc')}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-2">{t('blog.globalSupply.postCovid.cards.bellyCapacity.value')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.globalSupply.postCovid.cards.bellyCapacity.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.globalSupply.postCovid.cards.bellyCapacity.desc')}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.globalSupply.postCovid.shiftsH3')}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{t('blog.globalSupply.postCovid.pIntro')}</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3"><span className="text-red-600 font-bold mt-1">•</span><span>{t('blog.globalSupply.postCovid.list.justInCase')}</span></li>
                <li className="flex items-start gap-3"><span className="text-red-600 font-bold mt-1">•</span><span>{t('blog.globalSupply.postCovid.list.nearshoring')}</span></li>
                <li className="flex items-start gap-3"><span className="text-red-600 font-bold mt-1">•</span><span>{t('blog.globalSupply.postCovid.list.diversification')}</span></li>
                <li className="flex items-start gap-3"><span className="text-red-600 font-bold mt-1">•</span><span>{t('blog.globalSupply.postCovid.list.digitalDocs')}</span></li>
                <li className="flex items-start gap-3"><span className="text-red-600 font-bold mt-1">•</span><span>{t('blog.globalSupply.postCovid.list.usmBoom')}</span></li>
              </ul>
            </div>
          </section>
          </LazySection>

          {/* Geopolitical Tensions */}
          <LazySection>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.globalSupply.geopolitical.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.globalSupply.geopolitical.p1')}</p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.globalSupply.geopolitical.usChina.h3')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.globalSupply.geopolitical.usChina.tariffs')}</li>
                  <li>• {t('blog.globalSupply.geopolitical.usChina.entity')}</li>
                  <li>• {t('blog.globalSupply.geopolitical.usChina.bifurcation')}</li>
                  <li>• {t('blog.globalSupply.geopolitical.usChina.rareEarth')}</li>
                  <li>• {t('blog.globalSupply.geopolitical.usChina.costImpact')}</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.globalSupply.geopolitical.itar.h3')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.globalSupply.geopolitical.itar.dualUse')}</li>
                  <li>• {t('blog.globalSupply.geopolitical.itar.endUser')}</li>
                  <li>• {t('blog.globalSupply.geopolitical.itar.reExport')}</li>
                  <li>• {t('blog.globalSupply.geopolitical.itar.penalty')}</li>
                  <li>• {t('blog.globalSupply.geopolitical.itar.delays')}</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{t('blog.globalSupply.geopolitical.p2')}</p>
          </section>
          </LazySection>

          {/* Semiconductor Shortage */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.globalSupply.semiconductor.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.globalSupply.semiconductor.p1')}</p>
            <div className="bg-orange-50 rounded-lg p-6 mb-6 border-l-4 border-orange-600">
              <h3 className="font-bold text-xl text-gray-900 mb-4">{t('blog.globalSupply.semiconductor.whyH3')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h4 className="font-semibold text-gray-900 mb-2">{t('blog.globalSupply.semiconductor.why.longQualification')}</h4><p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.semiconductor.why.longQualification')}</p></div>
                <div><h4 className="font-semibold text-gray-900 mb-2">{t('blog.globalSupply.semiconductor.why.legacyNode')}</h4><p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.semiconductor.why.legacyNode')}</p></div>
                <div><h4 className="font-semibold text-gray-900 mb-2">{t('blog.globalSupply.semiconductor.why.lowVolume')}</h4><p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.semiconductor.why.lowVolume')}</p></div>
                <div><h4 className="font-semibold text-gray-900 mb-2">{t('blog.globalSupply.semiconductor.why.singleSource')}</h4><p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.semiconductor.why.singleSource')}</p></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.globalSupply.semiconductor.impactH3')}</h3>
              <div className="grid md:grid-cols-4 gap-4 text-center mb-4">
                <div><div className="text-2xl font-bold text-orange-600">{t('blog.globalSupply.semiconductor.impact.lead.value')}</div><div className="text-sm text-gray-700">{t('blog.globalSupply.semiconductor.impact.lead.label')}</div></div>
                <div><div className="text-2xl font-bold text-orange-600">{t('blog.globalSupply.semiconductor.impact.price.value')}</div><div className="text-sm text-gray-700">{t('blog.globalSupply.semiconductor.impact.price.label')}</div></div>
                <div><div className="text-2xl font-bold text-orange-600">{t('blog.globalSupply.semiconductor.impact.markup.value')}</div><div className="text-sm text-gray-700">{t('blog.globalSupply.semiconductor.impact.markup.label')}</div></div>
                <div><div className="text-2xl font-bold text-orange-600">{t('blog.globalSupply.semiconductor.impact.chipsAct.value')}</div><div className="text-sm text-gray-700">{t('blog.globalSupply.semiconductor.impact.chipsAct.label')}</div></div>
              </div>
              <p className="text-gray-700 text-sm">{t('blog.globalSupply.semiconductor.supplierStrategy')}</p>
            </div>
          </section>

          {/* Resilience Strategies */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('blog.globalSupply.resilienceH3', 'Eight Proven Resilience Strategies for Aviation Supply Chains')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><span className="text-blue-600">1.</span> {t('blog.globalSupply.resilience.1.title', 'Multi-Region Stocking for Critical Components')}</h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.resilience.1.p', 'Maintain inventory in Americas, EMEA, and Asia-Pacific to mitigate regional disruptions.')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><span className="text-blue-600">2.</span> {t('blog.globalSupply.resilience.2.title', 'Predictive Demand Analytics')}</h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.resilience.2.p', 'Machine learning models correlate component failures with utilization patterns.')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><span className="text-blue-600">3.</span> {t('blog.globalSupply.resilience.3.title', 'Strategic Teardown Partnerships')}</h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.resilience.3.p', 'Lock in USM supply via exclusive agreements with teardown specialists.')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><span className="text-blue-600">4.</span> {t('blog.globalSupply.resilience.4.title', 'Exchange Pools & Rotable Sharing')}</h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.resilience.4.p', 'Join or establish component pools to access rotables without upfront purchase.')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><span className="text-blue-600">5.</span> {t('blog.globalSupply.resilience.5.title', 'Supplier Financial Health Monitoring')}</h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.resilience.5.p', 'Track supplier credit ratings and financial stability to anticipate disruption.')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><span className="text-blue-600">6.</span> {t('blog.globalSupply.resilience.6.title', 'Digital Twin Supply Chain Modeling')}</h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.resilience.6.p', 'Simulate disruption scenarios to identify failure points and alternatives.')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><span className="text-blue-600">7.</span> {t('blog.globalSupply.resilience.7.title', 'Blockchain for Provenance Assurance')}</h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.resilience.7.p', 'Immutable component history eliminates counterfeit risk and speeds clearance.')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><span className="text-blue-600">8.</span> {t('blog.globalSupply.resilience.8.title', 'Contract Flexibility & Supplier Incentives')}</h4>
                <p className="text-gray-700 text-sm mb-3">{t('blog.globalSupply.resilience.8.p', 'Hybrid contracts with committed minimums plus flexible capacity clauses.')}</p>
              </div>
            </div>
          </section>
          {/* Blockchain & Digital Traceability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.globalSupply.blockchain.h2', 'Blockchain Revolution: Solving Aviation Traceability')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.globalSupply.blockchain.p1', 'Aviation supply chains create traceability challenges and counterfeit risk.')}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{t('blog.globalSupply.blockchain.p2', 'Blockchain ledgers promise immutable provenance and instant verification.')}</p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-indigo-50 rounded-lg p-6 border-l-4 border-indigo-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.globalSupply.blockchain.oldProblemsH3', 'Traditional Paper-Based Problems')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.globalSupply.blockchain.old.lost', 'Lost documentation delays transactions')}</li>
                  <li>• {t('blog.globalSupply.blockchain.old.counterfeit', 'Counterfeit certificate risk persists')}</li>
                  <li>• {t('blog.globalSupply.blockchain.old.manual', 'Manual verification wastes hours')}</li>
                  <li>• {t('blog.globalSupply.blockchain.old.audit', 'Long-term paper archives costly')}</li>
                  <li>• {t('blog.globalSupply.blockchain.old.handoff', 'Custody handoffs create friction')}</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.globalSupply.blockchain.solutionsH3', 'Blockchain-Enabled Solutions')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.globalSupply.blockchain.solutions.instant', 'Instant QR-based verification')}</li>
                  <li>• {t('blog.globalSupply.blockchain.solutions.history', 'Tamper-proof ownership history')}</li>
                  <li>• {t('blog.globalSupply.blockchain.solutions.consensus', 'Multi-party consensus validation')}</li>
                  <li>• {t('blog.globalSupply.blockchain.solutions.smart', 'Smart contract automated transfers')}</li>
                  <li>• {t('blog.globalSupply.blockchain.solutions.audit', 'Perpetual audit trail')}</li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.globalSupply.blockchain.implementationsH3', 'Real-World Blockchain Implementations')}</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="border-l-4 border-blue-500 pl-3"><h4 className="font-semibold mb-1">{t('blog.globalSupply.blockchain.impl.honeywell.title', 'Honeywell GoDirect Trade')}</h4><p>{t('blog.globalSupply.blockchain.impl.honeywell.p', 'Blockchain marketplace enabling instant certificate verification')}</p></div>
                <div className="border-l-4 border-blue-500 pl-3"><h4 className="font-semibold mb-1">{t('blog.globalSupply.blockchain.impl.ibm.title', 'IBM Blockchain for Aviation')}</h4><p>{t('blog.globalSupply.blockchain.impl.ibm.p', 'Collaboration tracking overhauls reducing processing time')}</p></div>
                <div className="border-l-4 border-blue-500 pl-3"><h4 className="font-semibold mb-1">{t('blog.globalSupply.blockchain.impl.moog.title', 'Moog VeriPart')}</h4><p>{t('blog.globalSupply.blockchain.impl.moog.p', 'Authentication platform preventing counterfeit parts')}</p></div>
              </div>
            </div>
          </section>

          {/* Compliance & Documentation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.globalSupply.compliance.h2', 'Global Compliance & Documentation')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.globalSupply.compliance.p1', 'Aviation parts cross borders and require jurisdiction-specific documentation.')}</p>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">{t('blog.globalSupply.compliance.docs.faa.title', 'FAA 8130-3')}</h4>
                <p className="text-sm text-gray-700">{t('blog.globalSupply.compliance.docs.faa.p', 'United States Authorized Release Certificate')}</p>
              </div>
              <div className="bg-blue-50 rounded p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">{t('blog.globalSupply.compliance.docs.easa.title', 'EASA Form 1')}</h4>
                <p className="text-sm text-gray-700">{t('blog.globalSupply.compliance.docs.easa.p', 'European Union Authorized Release Certificate')}</p>
              </div>
              <div className="bg-blue-50 rounded p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">{t('blog.globalSupply.compliance.docs.tcca.title', 'TCCA 24-0078')}</h4>
                <p className="text-sm text-gray-700">{t('blog.globalSupply.compliance.docs.tcca.p', 'Transport Canada Authorized Release Certificate')}</p>
              </div>
              <div className="bg-blue-50 rounded p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">{t('blog.globalSupply.compliance.docs.caac.title', 'CAAC Form One')}</h4>
                <p className="text-sm text-gray-700">{t('blog.globalSupply.compliance.docs.caac.p', 'Civil Aviation Administration of China Release')}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{t('blog.globalSupply.compliance.p2', 'Harmonization remains incomplete; bilateral agreements reduce some duplication.')}</p>
            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-600">
              <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.globalSupply.compliance.best.h3', 'Documentation Best Practices')}</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• {t('blog.globalSupply.compliance.best.digital')}</li>
                <li>• {t('blog.globalSupply.compliance.best.preclass')}</li>
                <li>• {t('blog.globalSupply.compliance.best.audit')}</li>
                <li>• {t('blog.globalSupply.compliance.best.version')}</li>
                <li>• {t('blog.globalSupply.compliance.best.screening')}</li>
              </ul>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <img
                src={getMediaSrc('global-aircraft-parts-supply-chains/document-control-room.jpg', fallbacks.documentControl)}
                alt={t('blog.globalSupply.compliance.images.documentAlt', 'Document control shelves in a compliance room')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleDocumentControlError}
              />
              <img
                src={getMediaSrc('global-aircraft-parts-supply-chains-cargo-pallets.jpg', fallbacks.cargoPallets)}
                alt={t('blog.globalSupply.compliance.images.cargoAlt', 'Air cargo pallets prepared for outbound flights')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleCargoPalletsError}
              />
              <img
                src={getMediaSrc('global-aircraft-parts-supply-chains/cloud-documentation-interface.jpg', fallbacks.cloudInterface)}
                alt={t('blog.globalSupply.compliance.images.cloudAlt', 'Cloud-based documentation system interface')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleCloudInterfaceError}
              />
            </div>
          </section>
          {/* Data Integration & Predictive Analytics */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.globalSupply.data.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.globalSupply.data.p1')}</p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.globalSupply.data.integration.h3')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.globalSupply.data.integration.procurementMaintenance')}</li>
                  <li>• {t('blog.globalSupply.data.integration.inventoryFinance')}</li>
                  <li>• {t('blog.globalSupply.data.integration.supplierPerformance')}</li>
                  <li>• {t('blog.globalSupply.data.integration.fleetUtilization')}</li>
                  <li>• {t('blog.globalSupply.data.integration.marketIntelligence')}</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.globalSupply.data.ml.h3')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {t('blog.globalSupply.data.ml.failurePrediction')}</li>
                  <li>• {t('blog.globalSupply.data.ml.leadTimeForecasting')}</li>
                  <li>• {t('blog.globalSupply.data.ml.pricingOptimization')}</li>
                  <li>• {t('blog.globalSupply.data.ml.routeOptimization')}</li>
                  <li>• {t('blog.globalSupply.data.ml.anomalyDetection')}</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('global-aircraft-parts-supply-chains-analytics.jpg', fallbacks.analytics)}
                  alt={t('blog.globalSupply.data.images.analyticsAlt')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleAnalyticsError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.globalSupply.data.images.analyticsCaption')}</figcaption>
              </figure>
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('global-aircraft-parts-supply-chains/api-integration-diagram.jpg', fallbacks.apiDiagram)}
                  alt={t('blog.globalSupply.data.images.apiAlt')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleApiDiagramError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.globalSupply.data.images.apiCaption')}</figcaption>
              </figure>
            </div>
          </section>

          {/* ORBIPARTS Supply Chain Capabilities */}
          <section className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('blog.globalSupply.orbiparts.h2')}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{t('blog.globalSupply.orbiparts.intro')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.globalSupply.orbiparts.cards.sourcing.title')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.globalSupply.orbiparts.cards.sourcing.multiRegion')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.globalSupply.orbiparts.cards.sourcing.vettedSuppliers')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.globalSupply.orbiparts.cards.sourcing.usmReserves')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.globalSupply.orbiparts.cards.sourcing.dualSource')}</span></li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.globalSupply.orbiparts.cards.transparency.title')}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.globalSupply.orbiparts.cards.transparency.realTime')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.globalSupply.orbiparts.cards.transparency.blockchain')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.globalSupply.orbiparts.cards.transparency.predictive')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">→</span><span>{t('blog.globalSupply.orbiparts.cards.transparency.api')}</span></li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-100 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.globalSupply.orbiparts.metricsH3')}</h3>
              <div className="grid md:grid-cols-4 gap-4 text-gray-700">
                <div className="text-center"><div className="text-3xl font-bold text-blue-600 mb-1">{t('blog.globalSupply.orbiparts.metrics.fillRate.value')}</div><div className="text-sm">{t('blog.globalSupply.orbiparts.metrics.fillRate.label')}</div></div>
                <div className="text-center"><div className="text-3xl font-bold text-blue-600 mb-1">{t('blog.globalSupply.orbiparts.metrics.leadTime.value')}</div><div className="text-sm">{t('blog.globalSupply.orbiparts.metrics.leadTime.label')}</div></div>
                <div className="text-center"><div className="text-3xl font-bold text-blue-600 mb-1">{t('blog.globalSupply.orbiparts.metrics.docs.value')}</div><div className="text-sm">{t('blog.globalSupply.orbiparts.metrics.docs.label')}</div></div>
                <div className="text-center"><div className="text-3xl font-bold text-blue-600 mb-1">{t('blog.globalSupply.orbiparts.metrics.rfq.value')}</div><div className="text-sm">{t('blog.globalSupply.orbiparts.metrics.rfq.label')}</div></div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="bg-gray-900 text-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">{t('blog.globalSupply.takeaways.h2')}</h2>
            <div className="space-y-4">
              {Object.entries(t('blog.globalSupply.takeaways.items', { returnObjects: true }) || {}).map(([key, item]) => (
                <div className="flex items-start gap-4" key={key}>
                  <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{key}</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Articles */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.globalSupply.related.h2')}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/blog/technology-trends-aircraft-component-management" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.globalSupply.related.card1.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.globalSupply.related.card1.desc')}</p>
              </Link>
              <Link to="/blog/miami-aviation-logistics" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.globalSupply.related.card2.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.globalSupply.related.card2.desc')}</p>
              </Link>
              <Link to="/blog/top-10-aircraft-parts-suppliers-2025" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.globalSupply.related.card3.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.globalSupply.related.card3.desc')}</p>
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <section className="border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.globalSupply.cta.h2')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.globalSupply.cta.p1')}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{t('blog.globalSupply.cta.p2')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="bg-primary text-white px-5 py-3 rounded-md font-semibold hover:bg-primary/90 transition" to="/contact">{t('blog.globalSupply.cta.primary')}</Link>
              <Link className="px-5 py-3 rounded-md font-semibold border border-gray-300 hover:bg-gray-50 transition" to="/stock">{t('blog.globalSupply.cta.secondary')}</Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default GlobalAircraftPartsSupplyChains;
