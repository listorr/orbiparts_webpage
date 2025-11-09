import React from 'react';
import { Link } from 'react-router-dom';
import { SEO, buildArticleSchema } from '@/components/SEO';
import { getMediaSrc, createOnErrorHandler } from '@/lib/media';
import { BLOG_FALLBACKS } from '@/lib/mediaFallbacks';
import { buildAlternates, getOgLocale } from '@/lib/seoUtils';
import LazySection from '@/components/LazySection';
import { useTranslation } from 'react-i18next';
import ResponsiveHeroImage from '@/components/ResponsiveHeroImage';

const MiamiAviationLogistics = () => {
  const { t } = useTranslation();
  const title = t('blog.miami.seo.articleHeadline', "Miami's Strategic Role in Global Aviation Logistics");
  const description = t(
    'blog.miami.seo.articleDescription',
    'How Miami\'s geostrategic position, customs speed, and multimodal infrastructure optimize aviation parts distribution across the Americas.'
  );
  const canonical = 'https://www.orbiparts.com/blog/miami-aviation-logistics';

  // Added: hreflang alternates + OG locale
  const alternates = buildAlternates(canonical);
  const locale = getOgLocale();

  const fallbacks = BLOG_FALLBACKS['miami-aviation-logistics'];
  const heroImage = getMediaSrc('miami-aviation-logistics-hero.jpg', fallbacks.hero);
  const image = heroImage;
  const handleHeroError = createOnErrorHandler(fallbacks.hero);
  const handleRampError = createOnErrorHandler(fallbacks.ramp);
  const handlePortError = createOnErrorHandler(fallbacks.port);
  const handleCustomsError = createOnErrorHandler(fallbacks.customs);
  const handleWarehouseError = createOnErrorHandler(fallbacks.warehouse);
  const handleItError = createOnErrorHandler(fallbacks.it);
  const handleConsolidationError = createOnErrorHandler(fallbacks.consolidation);
  const handleEnergyError = createOnErrorHandler(fallbacks.energy);

  const keywords = [
    'Miami aviation logistics',
    'MIA cargo',
    'aircraft parts distribution',
    'hemispheric gateway',
    'AOG dispatch',
    'Latin America aviation',
    'bonded warehouse',
    'customs clearance speed'
  ];
  const datePublished = '2024-01-10';

  return (
    <>
      <SEO
        title={t('blog.miami.seo.title', `${title} | ORBIPARTS`)}
        description={t('blog.miami.seo.description', description)}
        canonical={canonical}
        ogType="article"
        ogImage={image}
        twitterImage={image}
        alternates={alternates}
        locale={locale}
        schemas={[
          buildArticleSchema({
            headline: t('blog.miami.seo.articleHeadline', title),
            description: t('blog.miami.seo.articleDescription', description),
            image,
            author: t('blog.miami.seo.author', 'Logistics Expert'),
            datePublished,
            url: canonical,
            keywords
          })
        ]}
        breadcrumbs={[
          { name: t('common.home', 'Home'), url: 'https://www.orbiparts.com/' },
          { name: t('common.blog', 'Blog'), url: 'https://www.orbiparts.com/blog' },
          { name: t('blog.miami.seo.breadcrumb', 'Miami Aviation Logistics'), url: canonical }
        ]}
      />
      <article className="min-h-screen pt-16 bg-white">
        <header className="relative">
          <ResponsiveHeroImage
            src={heroImage}
            alt={t('blog.miami.hero.imgAlt', 'Cargo aircraft operations at Miami logistics hub')}
            className="w-full h-[300px] md:h-[420px] object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1600px"
            priority={true}
            onError={handleHeroError}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{t('blog.miami.hero.h1', title)}</h1>
              <p className="text-blue-100 mt-3 max-w-3xl">{t('blog.miami.hero.subtitle', description)}</p>
            </div>
          </div>
        </header>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* Market Statistics */}
          <LazySection>
          <section className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("blog.miami.stats.sectionH2")}</h2>
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t('blog.miami.stats.cards.usInternational.value', '#1')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.miami.stats.cards.usInternational.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.miami.stats.cards.usInternational.desc')}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t('blog.miami.stats.cards.tons.value', '2.7M')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.miami.stats.cards.tons.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.miami.stats.cards.tons.desc')}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t('blog.miami.stats.cards.latam.value', '74%')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.miami.stats.cards.latam.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.miami.stats.cards.latam.desc')}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t('blog.miami.stats.cards.airlines.value', '100+')}</div>
                <div className="text-gray-700 font-semibold">{t('blog.miami.stats.cards.airlines.title')}</div>
                <div className="text-sm text-gray-600 mt-2">{t('blog.miami.stats.cards.airlines.desc')}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.miami.stats.whyH3')}</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{t('blog.miami.stats.list.gateway')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{t('blog.miami.stats.list.market')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{t('blog.miami.stats.list.ftz')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{t('blog.miami.stats.list.ops247')}</span>
                </li>
              </ul>
            </div>
          </section>
          </LazySection>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.miami.geostrategic.h2')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('blog.miami.geostrategic.p1')}</p>
            <p className="text-gray-700 leading-relaxed mt-4">{t('blog.miami.geostrategic.p2')}</p>
            <div className="bg-green-50 rounded-xl p-6 my-6 border-2 border-green-200">
              <h3 className="font-bold text-xl text-gray-900 mb-4">{t('blog.miami.geostrategic.flightTable.title')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="p-3 font-semibold">{t('blog.miami.geostrategic.flightTable.destination')}</th>
                      <th className="p-3 font-semibold">{t('blog.miami.geostrategic.flightTable.mia')}</th>
                      <th className="p-3 font-semibold">{t('blog.miami.geostrategic.flightTable.atl')}</th>
                      <th className="p-3 font-semibold">{t('blog.miami.geostrategic.flightTable.jfk')}</th>
                      <th className="p-3 font-semibold">{t('blog.miami.geostrategic.flightTable.timeSaved')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b">
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row1.dest')}</td>
                      <td className="p-3 font-bold text-green-700">{t('blog.miami.geostrategic.flightTable.row1.mia')}</td>
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row1.atl')}</td>
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row1.jfk')}</td>
                      <td className="p-3 bg-green-50">{t('blog.miami.geostrategic.flightTable.row1.saved')}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row2.dest')}</td>
                      <td className="p-3 font-bold text-green-700">{t('blog.miami.geostrategic.flightTable.row2.mia')}</td>
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row2.atl')}</td>
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row2.jfk')}</td>
                      <td className="p-3 bg-green-50">{t('blog.miami.geostrategic.flightTable.row2.saved')}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row3.dest')}</td>
                      <td className="p-3 font-bold text-green-700">{t('blog.miami.geostrategic.flightTable.row3.mia')}</td>
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row3.atl')}</td>
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row3.jfk')}</td>
                      <td className="p-3 bg-green-50">{t('blog.miami.geostrategic.flightTable.row3.saved')}</td>
                    </tr>
                    <tr>
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row4.dest')}</td>
                      <td className="p-3 font-bold text-green-700">{t('blog.miami.geostrategic.flightTable.row4.mia')}</td>
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row4.atl')}</td>
                      <td className="p-3">{t('blog.miami.geostrategic.flightTable.row4.jfk')}</td>
                      <td className="p-3 bg-green-50">{t('blog.miami.geostrategic.flightTable.row4.saved')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 text-sm mt-4 italic">{t('blog.miami.geostrategic.flightTable.aogImpact')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('miami-aviation-logistics-ramp.jpg', fallbacks.ramp)}
                  alt={t('blog.miami.geostrategic.rampAlt', 'Cargo loaders operating at Miami ramp')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleRampError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.miami.geostrategic.rampCaption')}</figcaption>
              </figure>
              <figure className="rounded-lg overflow-hidden">
                <img
                  src={getMediaSrc('miami-aviation-logistics-port.jpg', fallbacks.port)}
                  alt={t('blog.miami.geostrategic.portAlt', 'Aerial view of port and airport logistics convergence')}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handlePortError}
                />
                <figcaption className="text-sm text-gray-500 mt-2">{t('blog.miami.geostrategic.portCaption')}</figcaption>
              </figure>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.miami.customs.h2')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('blog.miami.customs.p1')}</p>
            <div className="bg-yellow-50 rounded-xl p-6 my-6 border-l-4 border-yellow-600">
              <h3 className="font-bold text-xl text-gray-900 mb-4">{t('blog.miami.customs.advantagesH3')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3"> {t('blog.miami.customs.expressH4')}</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• {t('blog.miami.customs.expressList.aog')}</li>
                    <li>• {t('blog.miami.customs.expressList.routine')}</li>
                    <li>• {t('blog.miami.customs.expressList.staffing')}</li>
                    <li>• {t('blog.miami.customs.expressList.comparison')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3"> {t('blog.miami.customs.ftzH4')}</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• {t('blog.miami.customs.ftzList.deferral')}</li>
                    <li>• {t('blog.miami.customs.ftzList.elimination')}</li>
                    <li>• {t('blog.miami.customs.ftzList.manufacturing')}</li>
                    <li>• {t('blog.miami.customs.ftzList.inverted')}</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">{t('blog.miami.customs.p2')}</p>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <img
                src={getMediaSrc('miami-aviation-logistics/digital-customs-processing.jpg', fallbacks.customs)}
                alt={t('blog.miami.customs.digitalAlt', 'Customs paperwork being processed digitally')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleCustomsError}
              />
              <img
                src={getMediaSrc('miami-aviation-logistics-warehouse.jpg', fallbacks.warehouse)}
                alt={t('blog.miami.customs.warehouseAlt', 'Bonded warehouse storage racks')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleWarehouseError}
              />
              <img
                src={getMediaSrc('miami-aviation-logistics-it.jpg', fallbacks.it)}
                alt={t('blog.miami.customs.itAlt', 'Secure logistics IT infrastructure')}
                className="rounded-lg w-full h-44 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleItError}
              />
            </div>
          </section>
          {/* ORBIPARTS Miami Hub Positioning */}
          <section className="bg-blue-50 rounded-lg p-8 border-2 border-indigo-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('blog.miami.orbiparts.h2')}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6"> {t('blog.miami.orbiparts.intro')} </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl"></span> {t('blog.miami.orbiparts.cards.gateway.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed"> {t('blog.miami.orbiparts.cards.gateway.p')} </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl"></span> {t('blog.miami.orbiparts.cards.customs.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed"> {t('blog.miami.orbiparts.cards.customs.p')} </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl"></span> {t('blog.miami.orbiparts.cards.ops.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed"> {t('blog.miami.orbiparts.cards.ops.p')} </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl"></span> {t('blog.miami.orbiparts.cards.ecosystem.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed"> {t('blog.miami.orbiparts.cards.ecosystem.p')} </p>
              </div>
            </div>
            <div className="bg-indigo-100 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-xl text-gray-900 mb-3">{t('blog.miami.orbiparts.capabilitiesH3')}</h3>
              <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                <div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">{t('blog.miami.orbiparts.capabilities.clearance.value')}</div>
                  <div className="text-sm">{t('blog.miami.orbiparts.capabilities.clearance.desc')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">{t('blog.miami.orbiparts.capabilities.cities.value')}</div>
                  <div className="text-sm">{t('blog.miami.orbiparts.capabilities.cities.desc')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">{t('blog.miami.orbiparts.capabilities.warehouse.value')}</div>
                  <div className="text-sm">{t('blog.miami.orbiparts.capabilities.warehouse.desc')}</div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900">{t('blog.miami.multimodal.h3')}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{t('blog.miami.multimodal.p1')}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
              <li>{t('blog.miami.multimodal.list.hybrid')}</li>
              <li>{t('blog.miami.multimodal.list.repair')}</li>
              <li>{t('blog.miami.multimodal.list.warehouse')}</li>
              <li>{t('blog.miami.multimodal.list.staging')}</li>
              <li>{t('blog.miami.multimodal.list.ground')}</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.miami.sustainability.h2')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('blog.miami.sustainability.p1')}</p>
            <div className="bg-green-50 rounded-xl p-6 my-6 border-l-4 border-green-600">
              <h3 className="font-bold text-lg text-gray-900 mb-3">{t('blog.miami.sustainability.envH3')}</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{t('blog.miami.sustainability.list.legs')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{t('blog.miami.sustainability.list.consolidation')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{t('blog.miami.sustainability.list.proximity')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{t('blog.miami.sustainability.list.efficiency')}</span>
                </li>
              </ul>
            </div>
          </section>
          {/* Key Takeaways */}
          <section className="bg-gray-900 text-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">{t('blog.miami.takeaways.h2')}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{t('blog.miami.takeaways.items.1.title')}</h3>
                  <p className="text-gray-300 leading-relaxed">{t('blog.miami.takeaways.items.1.p')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{t('blog.miami.takeaways.items.2.title')}</h3>
                  <p className="text-gray-300 leading-relaxed">{t('blog.miami.takeaways.items.2.p')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{t('blog.miami.takeaways.items.3.title')}</h3>
                  <p className="text-gray-300 leading-relaxed">{t('blog.miami.takeaways.items.3.p')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{t('blog.miami.takeaways.items.4.title')}</h3>
                  <p className="text-gray-300 leading-relaxed">{t('blog.miami.takeaways.items.4.p')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">5</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{t('blog.miami.takeaways.items.5.title')}</h3>
                  <p className="text-gray-300 leading-relaxed">{t('blog.miami.takeaways.items.5.p')}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.miami.related.h2')}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/blog/global-aircraft-parts-supply-chains" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.miami.related.card1.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.miami.related.card1.desc')}</p>
              </Link>
              <Link to="/blog/aog-response-strategies" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.miami.related.card2.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.miami.related.card2.desc')}</p>
              </Link>
              <Link to="/blog/sustainable-aviation-component-trading" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{t('blog.miami.related.card3.title')}</h3>
                <p className="text-sm text-gray-600">{t('blog.miami.related.card3.desc')}</p>
              </Link>
            </div>
          </section>
          <section className="border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('blog.miami.cta.h2')}</h2>
            <p className="text-gray-700 leading-relaxed">{t('blog.miami.cta.p1')}</p>
            <p className="text-gray-700 leading-relaxed mt-4">{t('blog.miami.cta.p2')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="bg-primary text-white px-5 py-3 rounded-md font-semibold hover:bg-primary/90 transition" to="/contact">{t('blog.miami.cta.primary')}</Link>
              <Link className="px-5 py-3 rounded-md font-semibold border border-gray-300 hover:bg-gray-50 transition" to="/stock">{t('blog.miami.cta.secondary')}</Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default MiamiAviationLogistics;
