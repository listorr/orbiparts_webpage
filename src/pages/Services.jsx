import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plane, Truck, Wrench, Package, Clock } from 'lucide-react';
import { EngineIcon, AircraftIcon } from '@/components/icons/AviationIcons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Plane,
      title: t("servicesPage.trading_title"),
      description: t("servicesPage.trading_desc"),
      features: [
        t("servicesPage.trading_f1"),
        t("servicesPage.trading_f2"),
        t("servicesPage.trading_f3"),
        t("servicesPage.trading_f4"),
        t("servicesPage.trading_f5")
      ]
    },
    {
      icon: Truck,
      title: t("servicesPage.logistics_title"),
      description: t("servicesPage.logistics_desc"),
      features: [
        t("servicesPage.logistics_f1"),
        t("servicesPage.logistics_f2"),
        t("servicesPage.logistics_f3"),
        t("servicesPage.logistics_f4"),
        t("servicesPage.logistics_f5")
      ]
    },
    {
      icon: Wrench,
      title: t("servicesPage.legacy_title"),
      description: t("servicesPage.legacy_desc"),
      features: [
        t("servicesPage.legacy_f1"),
        t("servicesPage.legacy_f2"),
        t("servicesPage.legacy_f3"),
        t("servicesPage.legacy_f4"),
        t("servicesPage.legacy_f5")
      ]
    },
    {
      icon: Package,
      title: t("servicesPage.consignment_title"),
      description: t("servicesPage.consignment_desc"),
      features: [
        t("servicesPage.consignment_f1"),
        t("servicesPage.consignment_f2"),
        t("servicesPage.consignment_f3"),
        t("servicesPage.consignment_f4"),
        t("servicesPage.consignment_f5")
      ]
    },
    {
      icon: Clock,
      title: t("servicesPage.aog_title"),
      description: t("servicesPage.aog_desc"),
      features: [
        t("servicesPage.aog_f1"),
        t("servicesPage.aog_f2"),
        t("servicesPage.aog_f3"),
        t("servicesPage.aog_f4"),
        t("servicesPage.aog_f5")
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Aviation Services Worldwide | Engine Trading, Leasing, Aircraft Parts, OEM Distribution | ORBIPARTS</title>
        <meta name="description" content="Global aviation services: aircraft parts trading, engine trading & leasing, aircraft leasing, OEM distribution, helicopter components, procurement software for airlines & MROs. Certified parts for all platforms worldwide." />
        
        {/* Keywords */}
        <meta name="keywords" content="aviation services worldwide, aircraft parts trading, engine trading, engine leasing, aircraft leasing, OEM distributor, helicopter parts services, aviation procurement software, MRO supplier, AOG support global, aviation logistics, aircraft consignment" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Global Aviation Services - Engine Trading, Leasing, Aircraft Parts | ORBIPARTS" />
        <meta property="og:description" content="Comprehensive worldwide aviation solutions: parts trading, engine trading & leasing, aircraft leasing, OEM distribution, procurement software for all platforms globally." />
        <meta property="og:url" content="https://www.orbiparts.com/services" />
        
        {/* Schema.org Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Aviation Components & Services",
            "provider": {
              "@type": "Organization",
              "name": "ORBIPARTS",
              "telephone": "+1-929-229-9520"
            },
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Global Aviation Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Aircraft Parts Trading",
                    "description": "Global trading of aircraft components for all platforms with extensive inventory"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Engine Trading & Leasing",
                    "description": "Worldwide engine trading and flexible leasing programs for all engine types"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Aviation Logistics Solutions",
                    "description": "Worldwide shipping, customs clearance, AOG support, and expedited delivery 24/7"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "OEM Distribution",
                    "description": "Authorized OEM distributor for major aerospace manufacturers worldwide"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "SoftwareApplication",
                    "name": "Aviation Procurement Software",
                    "applicationCategory": "BusinessApplication",
                    "description": "Advanced sourcing platform for airline purchasing departments and MRO operations"
                  }
                }
              ]
            }
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
                "name": "Services",
                "item": "https://www.orbiparts.com/services"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('servicesPage.title')}</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                {t('servicesPage.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift h-full rounded-lg">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trading Services Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trading Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We buy and sell aircraft, engines, and aviation assets worldwide
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Engine Trading */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <a href="/engine-trading" className="block group">
                  <Card className="hover-lift h-full rounded-lg overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all duration-300">
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/15 rounded-2xl border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <EngineIcon className="w-12 h-12" color="#FFFFFF" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        Engine Trading & Leasing
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Global marketplace for CFM56, LEAP, GE90, Trent, PW4000, and V2500 engine families. Sales, leasing, and asset management.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          CFM International & LEAP engines
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          Pratt & Whitney PW4000 series
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          General Electric GE90 & GEnx
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          Rolls-Royce Trent family
                        </div>
                      </div>
                      <div className="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                        Explore Engine Trading
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>

              {/* Aircraft Trading */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <a href="/aircraft-trading" className="block group">
                  <Card className="hover-lift h-full rounded-lg overflow-hidden border-2 border-transparent group-hover:border-purple-500 transition-all duration-300">
                    <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/15 rounded-2xl border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <AircraftIcon className="w-12 h-12" color="#FFFFFF" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        Aircraft Trading & Leasing
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Buy, sell, and lease commercial aircraft. Connect with aircraft owners, operators, and lessors worldwide.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                          Airbus A320 family & Boeing 737
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                          Wide-body aircraft (777, 787, A330, A350)
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                          Regional jets & turboprops
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                          Freighter & cargo aircraft
                        </div>
                      </div>
                      <div className="text-purple-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                        Explore Aircraft Trading
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('servicesPage.process_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('servicesPage.process_subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: t('servicesPage.process_s1_title'),
                  description: t('servicesPage.process_s1_desc')
                },
                {
                  step: "02",
                  title: t('servicesPage.process_s2_title'),
                  description: t('servicesPage.process_s2_desc')
                },
                {
                  step: "03",
                  title: t('servicesPage.process_s3_title'),
                  description: t('servicesPage.process_s3_desc')
                },
                {
                  step: "04",
                  title: t('servicesPage.process_s4_title'),
                  description: t('servicesPage.process_s4_desc')
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AOG Emergency Section */}
        <section className="py-20 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-8 h-8 text-red-600" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('servicesPage.emergency_title')}</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  {t('servicesPage.emergency_desc')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{t('servicesPage.emergency_f1')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{t('servicesPage.emergency_f2')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{t('servicesPage.emergency_f3')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{t('servicesPage.emergency_f4')}</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img  
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  alt="Aircraft maintenance emergency support"
                 src="https://images.unsplash.com/photo-1596543864210-db0f87db765e" />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;