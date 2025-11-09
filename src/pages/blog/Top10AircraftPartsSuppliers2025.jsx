import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle2, TrendingUp, Globe2, Zap, Shield, Star, MapPin, Sparkles } from 'lucide-react';
import { SEO, buildArticleSchema } from '@/components/SEO';
import { getMediaSrc } from '@/lib/media';
import { BLOG_FALLBACKS } from '@/lib/mediaFallbacks';
import { useTranslation } from 'react-i18next';
import { buildAlternates, getOgLocale } from '@/lib/seoUtils';

// Supplier dataset base (static rank/rating/website). All textual fields are localized via i18n.
const BASE_SUPPLIERS = [
  { rank: 1, rating: 4.8, website: 'https://www.aarcorp.com' },
  { rank: 2, rating: 4.7, website: 'https://www.satair.com' },
  { rank: 3, rating: 4.7, website: 'https://www.boeing.com/services' },
  { rank: 4, rating: 4.6, website: 'https://www.ajw-group.com' },
  { rank: 5, rating: 4.5, website: 'https://www.gatelesis.com' },
  { rank: 6, rating: 4.5, website: 'https://www.wencor.com' },
  { rank: 7, rating: 4.4, website: 'https://www.asrl.aero' },
  { rank: 8, rating: 4.4, website: 'https://www.heico.com' },
  { rank: 9, rating: 4.3, website: 'https://www.kellstrom.com' },
  { rank: 10, rating: 4.3, website: 'https://www.dodson-intl.com' },
];

const EVALUATION = [
  { icon: <Globe2 className="w-6 h-6 text-blue-600" />, title: 'Global Reach', description: 'Warehouse locations, delivery speed, and international coverage' },
  { icon: <Shield className="w-6 h-6 text-blue-600" />, title: 'Part Authenticity', description: 'OEM certification, traceability, and quality guarantees' },
  { icon: <Zap className="w-6 h-6 text-blue-600" />, title: 'AOG Response', description: 'Emergency support availability and response times' },
  { icon: <TrendingUp className="w-6 h-6 text-blue-600" />, title: 'Technology & Innovation', description: 'Digital platforms, procurement software, and supply chain tech' },
  { icon: <Building2 className="w-6 h-6 text-blue-600" />, title: 'Industry Experience', description: 'Years in business, certifications, and customer base' },
  { icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />, title: 'Customer Support', description: 'Service quality, technical support, and multilingual capabilities' },
];

export default function Top10AircraftPartsSuppliers2025() {
  const { t } = useTranslation();
  const seoFallback = BLOG_FALLBACKS['top-10-aircraft-parts-suppliers-2025'].hero;
  const seoImage = getMediaSrc('top-10-aircraft-parts-suppliers-2025-hero.jpg', seoFallback);

  // Localized suppliers assembled from i18n keys
  const SUPPLIERS = React.useMemo(() =>
    BASE_SUPPLIERS.map((s) => ({
      ...s,
      name: t(`blog.top10.suppliers.${s.rank}.name`),
      headquarters: t(`blog.top10.suppliers.${s.rank}.headquarters`),
      description: t(`blog.top10.suppliers.${s.rank}.description`),
      specialties: t(`blog.top10.suppliers.${s.rank}.specialties`, { returnObjects: true }),
      strengths: t(`blog.top10.suppliers.${s.rank}.strengths`, { returnObjects: true }),
    })),
  [t]);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('blog.top10.seo.itemListName', 'Top 10 Aircraft Parts Suppliers 2025'),
    description: t('blog.top10.seo.itemListDesc', 'Ranked list of the best aircraft parts suppliers and distributors worldwide'),
    numberOfItems: SUPPLIERS.length,
    itemListElement: SUPPLIERS.map((s) => ({
      '@type': 'ListItem',
      position: s.rank,
      item: { '@type': 'Organization', name: s.name, description: s.description, url: s.website },
    })),
  };

  const canonicalUrl = 'https://www.orbiparts.com/blog/top-10-aircraft-parts-suppliers-2025';
  const alternates = buildAlternates(canonicalUrl);
  const locale = getOgLocale(t('common.langCode', { defaultValue: undefined }) || undefined); // fallback inside helper

  return (
    <>
      <SEO
        title={t('blog.top10.seo.title', 'Top 10 Aircraft Parts Suppliers & Distributors in 2025 | ORBIPARTS')}
        description={t('blog.top10.seo.description', 'Comprehensive comparison of leading aircraft parts suppliers, OEM distributors, and engine trading companies for 2025.')}
  canonical={canonicalUrl}
        ogImage={seoImage}
        twitterImage={seoImage}
  alternates={alternates}
  locale={locale}
        schemas={[
          buildArticleSchema({
            headline: t('blog.top10.seo.articleHeadline', 'Top 10 Aircraft Parts Suppliers & Distributors in 2025'),
            description: t('blog.top10.seo.articleDescription', 'Comprehensive comparison of leading aircraft parts suppliers, OEM distributors, and engine trading companies for 2025.'),
            image: seoImage,
            author: t('blog.top10.seo.author', 'ORBIPARTS Industry Team'),
            datePublished: '2025-01-15',
            url: 'https://www.orbiparts.com/blog/top-10-aircraft-parts-suppliers-2025',
          }),
          itemListSchema,
        ]}
        breadcrumbs={[
          { name: t('common.home', 'Home'), url: 'https://www.orbiparts.com/' },
          { name: t('common.blog', 'Blog'), url: 'https://www.orbiparts.com/blog' },
          { name: t('blog.top10.seo.breadcrumb', 'Top 10 Suppliers 2025'), url: 'https://www.orbiparts.com/blog/top-10-aircraft-parts-suppliers-2025' },
        ]}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                {t('blog.top10.hero.badge', 'Industry Analysis • Updated January 2025')}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('blog.top10.hero.h1', 'Top 10 Aircraft Parts Suppliers & Distributors in 2025')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                {t('blog.top10.hero.subtitle', "Expert comparison of the world's leading aviation parts suppliers, OEM distributors, and engine trading companies")}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /><span>{t('blog.top10.hero.stat1', '10 Suppliers Analyzed')}</span></div>
                <div className="flex items-center gap-2"><TrendingUp className="w-5 h-5" /><span>{t('blog.top10.hero.stat2', '6 Evaluation Criteria')}</span></div>
                <div className="flex items-center gap-2"><Globe2 className="w-5 h-5" /><span>{t('blog.top10.hero.stat3', 'Global Coverage')}</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction + Market Stats */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('blog.top10.intro.h2', 'Introduction')}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('blog.top10.intro.p1', 'Selecting the right aircraft parts supplier is one of the most critical decisions for airlines, MROs, and aircraft operators. The right partner can mean the difference between efficient operations and costly downtime, between budget control and unexpected expenses, between compliance and regulatory issues.')}
              </p>
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('blog.top10.intro.box.h3', 'Global Aviation Parts Market Outlook 2025-2044')}</h3>
                <p className="text-gray-700 mb-4">{t('blog.top10.intro.box.p', "According to Airbus' Global Market Forecast 2025-2044 and Boeing's Commercial Market Outlook, the aviation industry is entering an unprecedented growth phase:")}</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-1">•</span><span>{t('blog.top10.intro.box.li1', '43,420 new aircraft will be delivered globally over the next 20 years (Airbus forecast)')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-1">•</span><span>{t('blog.top10.intro.box.li2', '18,930 aircraft replacements are needed to modernize aging fleets')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-1">•</span><span>{t('blog.top10.intro.box.li3', '+3.6% annual passenger growth continues to drive parts demand')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-1">•</span><span>{t('blog.top10.intro.box.li4', 'Global fleet doubling from ~24,700 to ~49,200 aircraft by 2044')}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-1">•</span><span>{t('blog.top10.intro.box.li5', 'Aviation contributes $4.1T to the global economy and supports 86.5M jobs (ICAO 2025)')}</span></li>
                </ul>
                <p className="text-sm text-gray-600 mt-4 italic">{t('blog.top10.intro.box.sources', 'Sources: Airbus GMF 2025-2044, Boeing CMO 2025-2044, ICAO 2025')}</p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('blog.top10.intro.p2', 'This explosive growth translates directly into surging demand for aircraft parts, components, and MRO services. With Asia-Pacific leading traffic growth, parts suppliers must demonstrate global reach, multi-fleet expertise, and rapid AOG response capabilities.')}
              </p>
            </div>
          </div>
        </section>

        {/* Evaluation Criteria */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('blog.top10.eval.h2', 'Evaluation Criteria')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVALUATION.map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  {c.icon}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{t(`blog.top10.eval.items.${i}.title`, c.title)}</h3>
                    <p className="text-sm text-gray-600">{t(`blog.top10.eval.items.${i}.desc`, c.description)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rankings */}
        <section className="container mx-auto px-4 pb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('blog.top10.rankings.h2', 'The Rankings')}</h2>
          {SUPPLIERS.map((s) => (
            <div
              key={s.rank}
              className={`mb-10 rounded-xl shadow p-6 border-l-4 ${
                s.rank === 1
                  ? 'bg-yellow-50 border-yellow-500'
                  : s.rank === 2
                  ? 'bg-gray-50 border-gray-400'
                  : s.rank === 3
                  ? 'bg-amber-50 border-amber-500'
                  : 'bg-white border-blue-100'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      s.rank === 1
                        ? 'bg-yellow-500 text-white'
                        : s.rank === 2
                        ? 'bg-gray-400 text-white'
                        : s.rank === 3
                        ? 'bg-amber-500 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    #{s.rank}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{s.name}</h3>
                  {s.rank === 1 && (
                    <span className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      <Star className="w-4 h-4" /> {t('blog.top10.rankings.topRated', 'Top Rated')}
                    </span>
                  )}
                </div>
                <div className="text-sm flex items-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold">
                    <Star className="w-4 h-4" /> {s.rating}/5.0
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-blue-600" /> {s.headquarters}
              </div>
              <p className="text-gray-700 mt-4 leading-relaxed">{s.description}</p>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">{t('blog.top10.rankings.coreSpecialties', 'Core Specialties:')}</h4>
                <div className="flex flex-wrap gap-2">
                  {s.specialties.map((sp) => (
                    <span key={sp} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> {t('blog.top10.rankings.keyStrengths', 'Key Strengths')}
                </h4>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                  {s.strengths.map((st) => (
                    <li key={st}>{st}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Comparison Table */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('blog.top10.table.h2', 'Quick Comparison Table')}</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">{t('blog.top10.table.rank', 'Rank')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">{t('blog.top10.table.supplier', 'Supplier')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">{t('blog.top10.table.rating', 'Rating')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">{t('blog.top10.table.primaryFocus', 'Primary Focus')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">{t('blog.top10.table.coverage', 'Coverage')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {SUPPLIERS.map((s) => (
                  <tr key={s.rank} className={s.rank === 1 ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-3 font-bold text-gray-900">#{s.rank}</td>
                    <td className="px-6 py-3 font-medium text-gray-800">{s.name}</td>
                    <td className="px-6 py-3 text-gray-700 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" /> {s.rating}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{s.specialties[0]}</td>
                    <td className="px-6 py-3 text-gray-700">{s.rank <= 3 ? t('blog.top10.coverage.worldwide', 'Worldwide') : s.rank <= 6 ? t('blog.top10.coverage.multiRegional', 'Multi-Regional') : t('blog.top10.coverage.regionalPlus', 'Regional+')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Choose Section */}
        <section className="container mx-auto px-4 my-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('blog.top10.how.h2', 'How to Choose the Right Supplier for Your Operation')}</h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-white rounded-lg p-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.how.s1.title', '1. Assess Your Fleet Composition')}</h3><p>{t('blog.top10.how.s1.p', 'If you operate primarily Airbus aircraft, consider Satair for OEM authenticity. Boeing-heavy fleets benefit from Boeing Distribution. Mixed fleets? AAR Corp and pooled programs offer broad coverage.')}</p></div>
              <div className="bg-white rounded-lg p-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.how.s2.title', '2. Evaluate Your Geographic Needs')}</h3><p>{t('blog.top10.how.s2.p', 'Global operations require suppliers with worldwide warehouse networks and 24/7 AOG desks.')}</p></div>
              <div className="bg-white rounded-lg p-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.how.s3.title', '3. Consider Your Budget Strategy')}</h3><p>{t('blog.top10.how.s3.p', 'PMA alternatives (Wencor) or USM (GA Telesis, Kellstrom) can reduce expenses by 30–60% while maintaining airworthiness.')}</p></div>
              <div className="bg-white rounded-lg p-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.how.s4.title', '4. Technology & Procurement Efficiency')}</h3><p>{t('blog.top10.how.s4.p', 'Modern platforms streamline ordering, tracking, and inventory management—cutting cycle times drastically.')}</p></div>
              <div className="bg-white rounded-lg p-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.how.s5.title', '5. Engine-Specific Requirements')}</h3><p>{t('blog.top10.how.s5.p', 'For engine trading and leasing, prioritize strong CFM56, LEAP, Trent, GE90 program support.')}</p></div>
              <div className="bg-white rounded-lg p-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.how.s6.title', '6. Helicopter Operations')}</h3><p>{t('blog.top10.how.s6.p', 'Rotorcraft operators should consider Dodson International or a specialist with proven rotorcraft coverage.')}</p></div>
            </div>
          </div>
        </section>

        {/* Emerging Companies to Watch */}
        <section className="container mx-auto px-4 my-16">
          <div className="my-16 bg-blue-50 rounded-lg p-8 border-2 border-indigo-200">
            <div className="flex items-start gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('blog.top10.emerging.h2', 'Emerging Companies to Watch: Digital Disruptors')}</h2>
                <p className="text-gray-700 text-lg">{t('blog.top10.emerging.p', 'While established players dominate, a new wave of innovators is reshaping procurement, traceability, and marketplace efficiency.')}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-indigo-600">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">ORBIPARTS</h3>
                  <p className="text-indigo-600 font-semibold">{t('blog.top10.emerging.card.meta', 'Miami, Florida • Founded 2024 • orbiparts.com')}</p>
                </div>
                <div className="bg-indigo-100 px-4 py-2 rounded-full"><span className="text-indigo-700 font-bold">{t('blog.top10.emerging.card.badge', 'Innovation Leader')}</span></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2"><Zap className="w-5 h-5 text-indigo-600" /> {t('blog.top10.emerging.card.tech.h4', 'Technology Innovation')}</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" /><span>{t('blog.top10.emerging.card.tech.li1', 'AI-powered procurement and vendor optimization')}</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" /><span>{t('blog.top10.emerging.card.tech.li2', 'Blockchain traceability for authenticity')}</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" /><span>{t('blog.top10.emerging.card.tech.li3', 'Real-time inventory transparency across surplus markets')}</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" /><span>{t('blog.top10.emerging.card.tech.li4', 'Predictive analytics for demand forecasting')}</span></li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-600" /> {t('blog.top10.emerging.card.market.h4', 'Market Disruption Focus')}</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" /><span>{t('blog.top10.emerging.card.market.li1', 'Unified digital marketplace for fragmented surplus supply')}</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" /><span>{t('blog.top10.emerging.card.market.li2', 'Automated workflows reducing cycle times from weeks to hours')}</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" /><span>{t('blog.top10.emerging.card.market.li3', 'Pricing transparency with market-wide intelligence')}</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" /><span>{t('blog.top10.emerging.card.market.li4', 'Cloud-native operations for 24/7 global access')}</span></li>
                  </ul>
                </div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6 mb-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2"><Building2 className="w-5 h-5 text-indigo-600" /> {t('blog.top10.emerging.card.position.h4', 'Strategic Positioning')}</h4>
                <p className="text-gray-700 leading-relaxed">{t('blog.top10.emerging.card.position.p', 'Leveraging Miami as a logistics hub, ORBIPARTS targets the fragmented surplus and aftermarket sectors—over $8B annually—bringing instant inventory visibility, automated compliance, and frictionless cross-border transactions.')}</p>
              </div>
              <p className="text-gray-600 italic">{t('blog.top10.emerging.card.why', 'Why watch ORBIPARTS: companies that bridge traditional expertise with modern tech will capture outsized value as aviation digitizes.')}</p>
            </div>
          </div>
        </section>

        {/* Industry Trends */}
        <section className="container mx-auto px-4 my-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('blog.top10.trends.h2', '2025 Aviation Parts Supply Industry Trends')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-xl text-gray-900 mb-2">{t('blog.top10.trends.ai.title', 'AI-Powered Procurement')}</h3>
              <p className="text-gray-700">{t('blog.top10.trends.ai.desc', 'Advanced AI platforms revolutionize ordering with predictive maintenance and automated vendor selection.')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
              <h3 className="font-bold text-xl text-gray-900 mb-2">{t('blog.top10.trends.sustainability.title', 'Sustainability Focus')}</h3>
              <p className="text-gray-700">{t('blog.top10.trends.sustainability.desc', 'Circular economy practices expand—aircraft recycling, USM growth, and emissions tracking.')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-600">
              <h3 className="font-bold text-xl text-gray-900 mb-2">{t('blog.top10.trends.blockchain.title', 'Blockchain Traceability')}</h3>
              <p className="text-gray-700">{t('blog.top10.trends.blockchain.desc', 'Immutable records ensure component authenticity and streamline compliance documentation.')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-600">
              <h3 className="font-bold text-xl text-gray-900 mb-2">{t('blog.top10.trends.consolidation.title', 'Global Consolidation')}</h3>
              <p className="text-gray-700">{t('blog.top10.trends.consolidation.desc', 'M&A continues as suppliers seek scale—broader inventories and stronger logistics follow.')}</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 my-16">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('blog.top10.faq.h2', 'Frequently Asked Questions')}</h2>
            <div className="space-y-6">
              <div className="border-b pb-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.faq.q1', "What's the difference between OEM and PMA parts?")}</h3><p className="text-gray-700">{t('blog.top10.faq.a1', 'OEM parts are made by aircraft manufacturers or authorized suppliers. PMA parts are FAA-certified alternatives that typically cost 30–60% less while meeting the same standards.')}</p></div>
              <div className="border-b pb-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.faq.q2', 'How important is global AOG support?')}</h3><p className="text-gray-700">{t('blog.top10.faq.a2', 'Critical. AOG can cost $150,000+ per day. Suppliers with 24/7 global teams and strategic warehouses minimize downtime.')}</p></div>
              <div className="border-b pb-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.faq.q3', 'Should I use multiple suppliers or consolidate?')}</h3><p className="text-gray-700">{t('blog.top10.faq.a3', 'Most operators use a primary supplier for 60–80% of needs plus 2–3 specialists for specific platforms or savings.')}</p></div>
              <div><h3 className="font-bold text-lg text-gray-900 mb-2">{t('blog.top10.faq.q4', 'What about used serviceable material (USM)?')}</h3><p className="text-gray-700">{t('blog.top10.faq.a4', 'USM from certified teardowns offers 40–70% savings. Ensure complete traceability and remaining life data.')}</p></div>
            </div>
          </div>
        </section>

        {/* Conclusion + CTA */}
        <section className="container mx-auto px-4 my-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('blog.top10.conclusion.h2', 'Conclusion')}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{t('blog.top10.conclusion.p1', "The aircraft parts supply industry in 2025 offers more choice than ever—from OEM distributors to technology-driven platforms. Each supplier in our Top 10 brings unique strengths, from Satair's Airbus expertise to Wencor's cost-effective PMA alternatives.")}</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{t('blog.top10.conclusion.p2', 'Selecting the right partner depends on your fleet mix, geography, budget strategy, and urgency. Use this guide to shortlist candidates and align supplier capabilities with your operational goals.')}</p>
          <div className="bg-blue-900 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">{t('blog.top10.cta.h3', 'Ready to Optimize Your Aviation Parts Supply Chain?')}</h3>
            <p className="text-blue-100 mb-6">{t('blog.top10.cta.p', 'Experience modern procurement efficiency—AOG speed, OEM authenticity, and data-driven decisions.')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition shadow">
                {t('blog.top10.cta.getStarted', 'Get Started Today')}
              </Link>
              <Link to="/stock" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition">
                {t('blog.top10.cta.searchInventory', 'Search Our Inventory')}
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="container mx-auto px-4 my-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('blog.top10.related.h3', 'Related Articles')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/blog/global-aircraft-parts-supply-chains" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition"><div className="text-blue-600 font-bold mb-2">{t('blog.top10.related.card1.title', 'Global Supply Chain Strategies')}</div><p className="text-gray-700 text-sm">{t('blog.top10.related.card1.desc', 'How multi-region distribution and blockchain technology overcome disruptions')}</p></Link>
            <Link to="/blog/sustainable-aviation-component-trading" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition"><div className="text-blue-600 font-bold mb-2">{t('blog.top10.related.card2.title', 'Sustainable Aviation & USM Parts')}</div><p className="text-gray-700 text-sm">{t('blog.top10.related.card2.desc', '40–70% carbon reduction through circular economy practices')}</p></Link>
            <Link to="/blog/technology-trends-aircraft-component-management" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition"><div className="text-blue-600 font-bold mb-2">{t('blog.top10.related.card3.title', 'Technology Trends in Aviation')}</div><p className="text-gray-700 text-sm">{t('blog.top10.related.card3.desc', 'AI, blockchain, and digital twins transforming maintenance')}</p></Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">{t('blog.top10.cta.h3', 'Ready to Optimize Your Aviation Parts Supply Chain?')}</h3>
            <p className="text-blue-100 mb-6">{t('blog.top10.cta.why', 'Discover why global operators trust ORBIPARTS for procurement efficiency and reliability.')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition">{t('blog.top10.cta.getStartedShort', 'Get Started')}</Link>
              <Link to="/stock" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">{t('blog.top10.cta.browseInventory', 'Browse Inventory')}</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
