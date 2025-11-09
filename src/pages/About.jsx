import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Zap, Clock, Shield, Award, Users, Package, Star, Target, Lock, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/SEO';

const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const advantages = [
    {
      icon: MapPin,
      titleKey: "aboutPage.advantage_miami_title",
      descriptionKey: "aboutPage.advantage_miami_desc"
    },
    {
      icon: Zap,
      titleKey: "aboutPage.advantage_fleets_title",
      descriptionKey: "aboutPage.advantage_fleets_desc"
    },
    {
      icon: Clock,
      titleKey: "aboutPage.advantage_aog_title",
      descriptionKey: "aboutPage.advantage_aog_desc"
    },
    {
      icon: Shield,
      titleKey: "aboutPage.advantage_pricing_title",
      descriptionKey: "aboutPage.advantage_pricing_desc"
    },
    {
      icon: Award,
      titleKey: "aboutPage.advantage_network_title",
      descriptionKey: "aboutPage.advantage_network_desc"
    },
    {
      icon: Users,
      titleKey: "aboutPage.advantage_expertise_title",
      descriptionKey: "aboutPage.advantage_expertise_desc"
    }
  ];

  return (
    <>
      <SEO
        title="About ORBIPARTS | Global Aircraft Parts & Aviation Solutions"
        description="About ORBIPARTS: global supplier of aircraft parts, engines and helicopter components. AI-driven procurement, OEM distribution and AOG under 30 minutes."
        canonical="https://www.orbiparts.com/about"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.orbiparts.com/' },
          { name: 'About', url: 'https://www.orbiparts.com/about' }
        ]}
        ogImage="https://images.unsplash.com/photo-1578575437195-235a396d11b3?q=80&w=2070"
        ogType="website"
        siteName="ORBIPARTS"
        twitterImage="https://images.unsplash.com/photo-1578575437195-235a396d11b3?q=80&w=2070"
        locale="en_US"
        alternates={[
          { hrefLang: 'en', url: 'https://www.orbiparts.com/about' },
          { hrefLang: 'es', url: 'https://www.orbiparts.com/es/about' },
          { hrefLang: 'x-default', url: 'https://www.orbiparts.com/about' }
        ]}
      />
      <Helmet>
        <title>About ORBIPARTS | Global Aircraft Parts, Engines & Helicopter Supplier | Aviation Excellence Worldwide</title>
        <meta name="description" content="ORBIPARTS: Leading global supplier of aircraft parts, engines, helicopters for all platforms worldwide. OEM distributor, engine trading & leasing, procurement software. Serving 100+ countries with 10,000+ components inventory." />
        
        {/* Keywords */}
        <meta name="keywords" content="ORBIPARTS global, aircraft parts supplier worldwide, aviation components international, aircraft engines supplier, helicopter parts distributor, OEM distributor aviation, engine trading company, aircraft leasing company, aviation procurement software provider, global aviation supplier" />
        
  {/* OG/Twitter handled by <SEO /> */}
        
        {/* Schema.org AboutPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "ORBIPARTS",
              "url": "https://www.orbiparts.com",
              "description": "ORBIPARTS is a leading global supplier of aircraft parts, engines, helicopter components, and aviation procurement software serving airlines, MROs, operators, and lessors worldwide.",
              "foundingDate": "2010",
              "slogan": "The Future of Aviation Component Supply - Worldwide Excellence",
              "telephone": "+1-929-229-9520",
              "areaServed": "Worldwide",
              "knowsAbout": [
                "Aircraft Parts Trading Worldwide",
                "Engine Trading & Leasing Global",
                "Aircraft Leasing International",
                "Helicopter Components Distribution",
                "Aviation Procurement Software",
                "OEM Distribution Aerospace",
                "Airbus Parts",
                "Boeing Components",
                "CFM56 Engine Parts",
                "Bell Helicopter Parts",
                "Business Aviation",
                "General Aviation",
                "Legacy Aircraft Support"
              ]
            }
          })}
        </script>
        
        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What does ORBIPARTS supply worldwide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ORBIPARTS is a leading global supplier of aircraft parts, engines, and helicopter components for all platforms worldwide including Airbus, Boeing, Embraer, Bombardier, business jets, general aviation, and helicopters. We also provide engine trading, engine leasing, aircraft leasing, OEM distribution, and aviation procurement software solutions."
                }
              },
              {
                "@type": "Question",
                "name": "Which aircraft engines does ORBIPARTS trade and lease?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ORBIPARTS trades and leases all major aircraft engines including CFM56, LEAP, PW4000, PW1000G, GE90, GEnx, Trent series, V2500, and turboprop engines. We offer engine sales, acquisition, leasing programs, and complete asset management services worldwide."
                }
              },
              {
                "@type": "Question",
                "name": "Is ORBIPARTS an OEM authorized distributor?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, ORBIPARTS is an authorized OEM distributor for major aerospace manufacturers worldwide. We distribute new OEM parts, PMA approved parts, and DER repaired components with full certifications (FAA 8130-3, EASA Form 1) for all aircraft and engine platforms globally."
                }
              },
              {
                "@type": "Question",
                "name": "Does ORBIPARTS offer aviation procurement software?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, ORBIPARTS provides advanced aviation procurement and sourcing software solutions for airline purchasing departments and MRO operations worldwide. Our platform includes vendor management, quote comparison, inventory tracking, and compliance management to streamline the procurement process globally."
                }
              }
            ]
          })}
        </script>
        
        {/* Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.orbiparts.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://www.orbiparts.com/about"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen pt-16 bg-background">
        <section className="py-20 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('aboutPage.title')}</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                {t('aboutPage.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">{t('aboutPage.missionTitle')}</h2>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  {t('aboutPage.missionText1')}
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {t('aboutPage.missionText2')}
                </p>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                <img className="w-full h-96 object-cover rounded-lg shadow-lg" alt="Beautiful skyline of Miami at dusk" src="https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756826183094.png" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">{t('aboutPage.performanceTitle')}</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                {t('aboutPage.performanceSubtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  metric: "98%", 
                  label: t('aboutPage.performance_rate'),
                  Icon: Package,
                  gradient: "from-blue-500 to-blue-600"
                },
                { 
                  metric: "<30min", 
                  label: t('aboutPage.performance_time'),
                  Icon: Zap,
                  gradient: "from-red-500 to-red-600"
                },
                { 
                  metric: "99.5%", 
                  label: t('aboutPage.performance_satisfaction'),
                  Icon: Star,
                  gradient: "from-green-500 to-green-600"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-opacity" 
                       style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                    <div className="mb-4 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                        <stat.Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4`}>
                      {stat.metric}
                    </div>
                    <p className="text-lg font-semibold text-gray-700">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Intelligence Desk */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-blue-500/20">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Cpu className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text">
                      AI Intelligence Desk
                    </h3>
                  </div>
                  <p className="text-xl text-center text-gray-300 mb-6 leading-relaxed">
                    Our proprietary AI-powered procurement system instantly connects with <span className="font-bold text-white">+100 certified suppliers simultaneously</span>, delivering quotes and availability in seconds—not hours.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-semibold">Instant Multi-Supplier Query</span>
                    </div>
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400 font-semibold">Smart Price Comparison</span>
                    </div>
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400 font-semibold">Verified Authenticity</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">{t('aboutPage.advantagesTitle')}</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                {t('aboutPage.advantagesSubtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift h-full rounded-lg">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <advantage.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-4">{t(advantage.titleKey)}</h3>
                      <p className="text-neutral-600 leading-relaxed">{t(advantage.descriptionKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">{t('aboutPage.ctaTitle')}</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {t('aboutPage.ctaSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/contact')} size="lg" className="bg-white text-primary hover:bg-gray-200 rounded-md">
                  {t('aboutPage.ctaButton')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;