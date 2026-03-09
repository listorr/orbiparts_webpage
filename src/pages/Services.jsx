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
        {/* Hero Section with Geometric Patterns */}
        <section className="relative py-32 gradient-bg overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Grid Pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
            
            {/* Floating Geometric Shapes */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
            
            {/* Diagonal Lines */}
            <div className="absolute top-0 right-0 w-1/3 h-full">
              <svg className="w-full h-full opacity-10" viewBox="0 0 400 800" fill="none">
                <path d="M0 0L400 800" stroke="white" strokeWidth="2"/>
                <path d="M100 0L500 800" stroke="white" strokeWidth="1"/>
                <path d="M-100 0L300 800" stroke="white" strokeWidth="1"/>
              </svg>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              {/* Small Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Professional Aviation Services</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                {t('servicesPage.title')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                {t('servicesPage.subtitle')}
              </p>
              
              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex flex-wrap justify-center gap-8"
              >
                {[
                  { value: '24/7', label: 'AOG Support' },
                  { value: '150+', label: 'Countries Served' },
                  { value: '5000+', label: 'Parts Delivered' }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 54" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0 22L60 18.8C120 15.7 240 9.3 360 7.8C480 6.3 600 9.7 720 13.2C840 16.7 960 20.3 1080 20.3C1200 20.3 1320 16.7 1380 14.8L1440 13V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" fill="#F9FAFB"/>
            </svg>
          </div>
        </section>

        {/* Services Grid with Modern Design */}
        <section className="py-24 bg-gray-50 relative">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl opacity-50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-semibold text-blue-900">Our Expertise</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Comprehensive Aviation Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From parts trading to logistics support, we provide end-to-end services
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="hover-lift h-full rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden relative">
                    {/* Card Accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-500"></div>
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl group-hover:text-blue-700 transition-colors">{service.title}</CardTitle>
                          <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">{service.description}</p>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: featureIndex * 0.05 }}
                            className="flex items-start space-x-3 group/item"
                          >
                            <div className="mt-1 flex-shrink-0">
                              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center group-hover/item:bg-blue-600 transition-colors">
                                <svg className="w-3 h-3 text-blue-600 group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                            <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trading Services Section with Professional Design */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-100 to-blue-100 rounded-full opacity-30 blur-3xl"></div>
            
            {/* Subtle Dots Pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.3
            }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                  Asset Trading & Management
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
                  Global Trading Services
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We buy and sell aircraft, engines, and aviation assets worldwide with full regulatory compliance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Engine Trading Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <a href="/engine-trading" className="block group">
                  <Card className="hover-lift h-full rounded-3xl overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500 pointer-events-none"></div>
                    
                    {/* Header with Icon */}
                    <div className="relative h-56 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center overflow-hidden">
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
                        }}></div>
                      </div>
                      
                      {/* Icon Container */}
                      <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <div className="w-24 h-24 bg-white/20 rounded-3xl border-2 border-white/40 backdrop-blur-md flex items-center justify-center shadow-2xl">
                          <EngineIcon className="w-14 h-14" color="#FFFFFF" />
                        </div>
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-75"></div>
                      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/25 rounded-full animate-pulse delay-150"></div>
                    </div>
                    
                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                        Engine Trading & Leasing
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Global marketplace for CFM56, LEAP, GE90, Trent, PW4000, and V2500 engine families. Complete sales, leasing, and asset management solutions.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          'CFM International & LEAP',
                          'Pratt & Whitney PW4000',
                          'General Electric GE90',
                          'Rolls-Royce Trent'
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2 group/item">
                            <div className="mt-1 flex-shrink-0">
                              <div className="w-5 h-5 rounded-lg bg-blue-100 group-hover/item:bg-blue-600 flex items-center justify-center transition-all duration-300">
                                <svg className="w-3 h-3 text-blue-600 group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-blue-700 font-bold group-hover:text-blue-900 transition-colors flex items-center gap-2">
                          <span>Explore Engine Trading</span>
                          <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>

              {/* Aircraft Trading Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <a href="/aircraft-trading" className="block group">
                  <Card className="hover-lift h-full rounded-3xl overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500 pointer-events-none"></div>
                    
                    {/* Header with Icon */}
                    <div className="relative h-56 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex items-center justify-center overflow-hidden">
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
                        }}></div>
                      </div>
                      
                      {/* Icon Container */}
                      <div className="relative z-10 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                        <div className="w-24 h-24 bg-white/20 rounded-3xl border-2 border-white/40 backdrop-blur-md flex items-center justify-center shadow-2xl">
                          <AircraftIcon className="w-14 h-14" color="#FFFFFF" />
                        </div>
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute top-6 left-4 w-3 h-3 bg-white/40 rounded-full animate-pulse delay-100"></div>
                      <div className="absolute bottom-4 right-6 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/25 rounded-full animate-pulse delay-200"></div>
                    </div>
                    
                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                        Aircraft Trading & Leasing
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Complete aircraft transactions including narrow-body, wide-body, and regional aircraft. Full asset lifecycle management and flexible leasing programs.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          'Narrow-Body Aircraft',
                          'Wide-Body Aircraft',
                          'Regional Jets',
                          'Aircraft Leasing'
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2 group/item">
                            <div className="mt-1 flex-shrink-0">
                              <div className="w-5 h-5 rounded-lg bg-purple-100 group-hover/item:bg-purple-600 flex items-center justify-center transition-all duration-300">
                                <svg className="w-3 h-3 text-purple-600 group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-purple-700 font-bold group-hover:text-purple-900 transition-colors flex items-center gap-2">
                          <span>Explore Aircraft Trading</span>
                          <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>

              {/* Lubricant Marketplace Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <a href="/lubricants" className="block group">
                  <Card className="hover-lift h-full rounded-3xl overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/0 to-amber-600/0 group-hover:from-orange-600/5 group-hover:to-amber-600/5 transition-all duration-500 pointer-events-none"></div>
                    
                    {/* Header with Icon */}
                    <div className="relative h-56 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex items-center justify-center overflow-hidden">
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
                        }}></div>
                      </div>
                      
                      {/* Icon Container */}
                      <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <div className="w-24 h-24 bg-white/20 rounded-3xl border-2 border-white/40 backdrop-blur-md flex items-center justify-center shadow-2xl">
                          <Package className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      
                      {/* Floating Orbs */}
                      <div className="absolute top-10 right-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                      <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    </div>

                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                        Lubricants & Fluids Marketplace
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Premium aviation lubricants, hydraulic fluids, and specialty products from Eastman. Turbine oils, Skydrol, and aviation solvents available.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          'Turbine Engine Oils',
                          'Hydraulic Fluids',
                          'Aviation Solvents',
                          '32 Products Available'
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2 group/item">
                            <div className="mt-1 flex-shrink-0">
                              <div className="w-5 h-5 rounded-lg bg-orange-100 group-hover/item:bg-orange-600 flex items-center justify-center transition-all duration-300">
                                <svg className="w-3 h-3 text-orange-600 group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-orange-700 font-bold group-hover:text-orange-900 transition-colors flex items-center gap-2">
                          <span>Browse Lubricants</span>
                          <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
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

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
              
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
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center relative group"
                >
                  {/* Step Circle with Gradient and Glow */}
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transform group-hover:scale-110 transition-all duration-300 border-4 border-white">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
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