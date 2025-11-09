import React from 'react';
import { Link } from 'react-router-dom';
import { SEO, buildArticleSchema, buildFAQSchema } from '@/components/SEO';
import { getMediaSrc, createOnErrorHandler } from '@/lib/media';
import { BLOG_FALLBACKS } from '@/lib/mediaFallbacks';
import { buildAlternates, getOgLocale } from '@/lib/seoUtils';
import { useTranslation } from 'react-i18next';
import LazySection from '@/components/LazySection';
import ResponsiveHeroImage from '@/components/ResponsiveHeroImage';

const AogResponseStrategies = () => {
  const { t, i18n } = useTranslation();
  const title = t('blog.aog.seo.articleHeadline');
  const description = t('blog.aog.seo.articleDescription');
  const canonical = 'https://www.orbiparts.com/blog/aog-response-strategies';
  const datePublished = '2024-01-05';

  // Added: hreflang alternates + OG locale
  const alternates = buildAlternates(canonical);
  const locale = getOgLocale();

  const fallbacks = BLOG_FALLBACKS['aog-response-strategies'] || {};
  const heroImage = getMediaSrc('aog-response-strategies-hero.jpg', fallbacks.hero);
  const nightShiftImage = getMediaSrc('aog-response-night-shift.jpg', fallbacks.nightShift);
  const opsRoomImage = getMediaSrc('aog-response-ops-room.jpg', fallbacks.opsControl);
  const freightImage = getMediaSrc('aog-response-freight.jpg', fallbacks.freight);
  const rapidInstallImage = getMediaSrc('aog-response-rapid-install.jpg', fallbacks.rapidInstall);

  const handleHeroError = createOnErrorHandler(fallbacks.hero);
  const handleNightShiftError = createOnErrorHandler(fallbacks.nightShift);
  const handleOpsRoomError = createOnErrorHandler(fallbacks.opsControl);
  const handleFreightError = createOnErrorHandler(fallbacks.freight);
  const handleRapidInstallError = createOnErrorHandler(fallbacks.rapidInstall);
  
  // Localized content collections
  const metrics = t('blog.aog.metrics.items', { returnObjects: true });
  const stabilizationSteps = t('blog.aog.stabilization.steps', { returnObjects: true });
  const commsPlaybook = t('blog.aog.operations.comms', { returnObjects: true });
  const faqItems = t('blog.aog.faq.items', { returnObjects: true });
  const riskControls = t('blog.aog.riskControls.items', { returnObjects: true });

  return (
    <>
      <SEO
        title={`${title} | ORBIPARTS`}
        description={description}
        canonical={canonical}
        ogType="article"
        ogImage={heroImage}
        twitterImage={heroImage}
        alternates={alternates}
        locale={locale}
        breadcrumbs={[
          { name: t('nav.home'), url: 'https://www.orbiparts.com/' },
          { name: t('blogLanding.seo.breadcrumb'), url: 'https://www.orbiparts.com/blog' },
          { name: t('blog.aog.seo.breadcrumb'), url: canonical },
        ]}
        schemas={[
          buildArticleSchema({
            headline: title,
            description,
            image: heroImage,
            author: t('blog.aog.seo.author'),
            datePublished,
            url: canonical,
            keywords: ['AOG response', 'aircraft on ground', 'urgent logistics', 'parts availability', 'MRO coordination'],
          }),
          buildFAQSchema(faqItems),
        ]}
      />
      <article className="min-h-screen pt-16 bg-white">
        <header className="relative">
          <ResponsiveHeroImage
            src={heroImage}
            alt={t('blog.aog.hero.imgAlt')}
            className="w-full h-[300px] md:h-[420px] object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1600px"
            priority={true}
            onError={handleHeroError}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <p className="text-sm font-semibold uppercase text-blue-100 tracking-[0.3em]">{t('blog.aog.hero.badge')}</p>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{title}</h1>
              <p className="text-blue-100 mt-3 max-w-3xl text-base sm:text-lg">{t('blog.aog.hero.subtitle')}</p>
            </div>
          </div>
        </header>
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <LazySection>
          <section className="grid gap-6 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
                <p className="text-3xl font-bold mt-2">{metric.value}</p>
                <p className="text-sm text-slate-200 mt-3">{metric.detail}</p>
              </div>
            ))}
          </section>
          </LazySection>

          <LazySection>
          <section className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">{t('blog.aog.stabilization.sectionBadge')}</p>
              <h2 className="text-3xl font-bold text-gray-900">{t('blog.aog.stabilization.h2')}</h2>
              <p className="text-gray-600">{t('blog.aog.stabilization.intro')}</p>
              <div className="space-y-4">
                {stabilizationSteps.map((step) => (
                  <div key={step.title} className="border-l-4 border-indigo-500 pl-4">
                    <p className="text-sm font-semibold text-indigo-600">{step.title}</p>
                    <p className="text-gray-800">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={nightShiftImage}
                alt={t('blog.aog.stabilization.nightShiftAlt')}
                className="rounded-3xl shadow-2xl h-full w-full object-cover aspect-video"
                loading="lazy"
                decoding="async"
                onError={handleNightShiftError}
              />
              <div className="absolute -right-6 -bottom-6 bg-white rounded-2xl shadow-xl p-5 w-56 sm:w-64 max-sm:right-2 max-sm:bottom-2">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{t('blog.aog.stabilization.liveMetrics.badge')}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">92%</p>
                <p className="text-sm text-gray-600">{t('blog.aog.stabilization.liveMetrics.releaseRate')}</p>
              </div>
            </div>
          </section>
          </LazySection>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="bg-indigo-50 rounded-3xl p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">{t('blog.aog.operations.badge')}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{t('blog.aog.operations.h3')}</h3>
              <p className="text-gray-600 mt-4">{t('blog.aog.operations.intro')}</p>
              <ul className="mt-6 space-y-3 list-disc list-inside text-gray-700">
                {commsPlaybook.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <img
                src={opsRoomImage}
                alt={t('blog.aog.operations.opsRoomAlt')}
                className="rounded-3xl shadow-2xl w-full h-72 object-cover"
                loading="lazy"
                decoding="async"
                onError={handleOpsRoomError}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {riskControls.map((control) => (
                  <div key={control.title} className="border border-gray-200 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-gray-900">{control.title}</p>
                    <p className="text-sm text-gray-600 mt-2">{control.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <img
                src={freightImage}
                alt={t('blog.aog.logistics.card.imgAlt')}
                className="h-60 w-full object-cover"
                loading="lazy"
                decoding="async"
                onError={handleFreightError}
              />
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">{t('blog.aog.logistics.card.h3')}</h3>
                <p className="text-gray-600">{t('blog.aog.logistics.card.p1')}</p>
                <p className="text-sm text-gray-500">{t('blog.aog.logistics.card.p2')}</p>
              </div>
            </div>
            <div className="bg-slate-900 text-white rounded-3xl overflow-hidden">
              <img
                src={rapidInstallImage}
                alt={t('blog.aog.rts.card.imgAlt')}
                className="h-60 w-full object-cover opacity-90"
                loading="lazy"
                decoding="async"
                onError={handleRapidInstallError}
              />
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold">{t('blog.aog.rts.card.h3')}</h3>
                <p className="text-slate-200">{t('blog.aog.rts.card.p1')}</p>
                <p className="text-sm text-slate-400">{t('blog.aog.rts.card.p2')}</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">{t('blog.aog.faq.badge')}</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{t('blog.aog.faq.h3')}</h3>
              </div>
              <Link to="/contact" className="text-indigo-600 font-semibold hover:underline">
                {t('blog.aog.faq.cta')}
              </Link>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details key={item.q} className="border border-gray-200 rounded-2xl p-4 group">
                  <summary className="cursor-pointer text-lg font-semibold text-gray-900 flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-indigo-600 text-sm group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-gray-600 mt-2">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl p-8 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/80">{t('blog.aog.cta.badge')}</p>
                <h3 className="text-3xl font-bold mt-2">{t('blog.aog.cta.h3')}</h3>
                <p className="text-white/80 mt-3 max-w-2xl">{t('blog.aog.cta.p')}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  to="/services"
                  className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-2xl text-center hover:bg-blue-50 transition"
                >
                  {t('blog.aog.cta.primary')}
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border border-white/70 font-semibold px-6 py-3 rounded-2xl text-center hover:bg-white/10 transition"
                >
                  {t('blog.aog.cta.secondary')}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default AogResponseStrategies;
