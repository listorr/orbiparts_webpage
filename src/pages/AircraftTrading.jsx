import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AircraftIcon, GlobalIcon, ShieldCheckIcon, SpeedIcon, EngineIcon } from '../components/icons/AviationIcons';
import { SEO, buildAircraftTradingServiceSchemas } from '@/components/SEO';

const AircraftTrading = () => {
  const { t, i18n } = useTranslation();

  // Aircraft categories
  const aircraftCategories = [
    {
      category: 'Narrow-Body Commercial',
      models: [
        'Airbus A320 Family (A318, A319, A320, A321)',
        'Airbus A220 (CS100, CS300)',
        'Boeing 737 Classic (300, 400, 500)',
        'Boeing 737 NG (600, 700, 800, 900)',
        'Boeing 737 MAX (7, 8, 9, 10)',
      ],
  icon: <AircraftIcon className="w-6 h-6" color="#60A5FA" />,
    },
    {
      category: 'Wide-Body Commercial',
      models: [
        'Airbus A330 (200, 300, 800neo, 900neo)',
        'Airbus A340 (200, 300, 500, 600)',
        'Airbus A350 (900, 1000)',
        'Boeing 767 (200, 300, 400)',
        'Boeing 777 (200, 300, F)',
        'Boeing 787 Dreamliner (8, 9, 10)',
      ],
  icon: <AircraftIcon className="w-6 h-6" color="#A78BFA" />,
    },
    {
      category: 'Regional & Turboprops',
      models: [
        'Embraer E-Jets (170, 175, 190, 195)',
        'Embraer E2 (E175-E2, E190-E2, E195-E2)',
        'Bombardier CRJ Series (200, 700, 900, 1000)',
        'ATR 42/72 (all variants)',
        'Dash 8 Q400',
      ],
  icon: <AircraftIcon className="w-6 h-6" color="#34D399" />,
    },
    {
      category: 'Freighters & Cargo',
      models: [
        'Boeing 747 Freighter (400F, 8F)',
        'Boeing 767 Freighter (300F)',
        'Boeing 777 Freighter (F)',
        'Airbus A330 Freighter (200F)',
        'Converted Passenger-to-Freighter (P2F)',
      ],
      icon: <GlobalIcon className="w-6 h-6" color="#F59E0B" />,
    },
    {
      category: 'Executive & Business Aviation',
      models: [
        'Gulfstream G450/G550/G650/G700',
        'Dassault Falcon 2000/7X/8X/10X',
        'Bombardier Challenger 300/350/600 | Global 5000/6000/7500',
        'Embraer Legacy 600/650 | Praetor 500/600',
        'Cessna Citation Latitude/Longitude',
      ],
      icon: <AircraftIcon className="w-6 h-6" color="#F472B6" />,
    },
  ];

  // Services offered
  const services = [
    {
      title: 'Aircraft Sales',
      description: 'Buy and sell commercial, regional, and cargo aircraft. Complete transaction management from evaluation to delivery.',
      icon: <ShieldCheckIcon className="w-6 h-6" color="#34D399" />,
    },
    {
      title: 'Aircraft Leasing',
      description: 'Operating leases, finance leases, and sale-leaseback solutions. Flexible terms tailored to your fleet strategy.',
      icon: <SpeedIcon className="w-6 h-6" color="#A78BFA" />,
    },
    {
      title: 'Fleet Consulting',
      description: 'Strategic fleet planning, acquisition advisory, and market analysis. Optimize your aircraft portfolio.',
      icon: <GlobalIcon className="w-6 h-6" color="#60A5FA" />,
    },
    {
      title: 'Technical Evaluation',
      description: 'Pre-purchase inspections, records review, airworthiness assessment, and valuations by certified experts.',
      icon: <EngineIcon className="w-6 h-6" color="#F59E0B" />,
    },
    {
      title: 'Asset Management',
      description: 'Full lifecycle asset management: maintenance tracking, lease administration, and remarketing services.',
      icon: <ShieldCheckIcon className="w-6 h-6" color="#34D399" />,
    },
    {
      title: 'Part-Out Programs',
      description: 'End-of-life aircraft teardown and part-out services. Maximize residual value from retired airframes.',
      icon: <EngineIcon className="w-6 h-6" color="#F59E0B" />,
    },
  ];

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Aircraft Trading and Leasing",
    "provider": {
      "@type": "Organization",
      "name": "ORBIPARTS",
      "url": "https://www.orbiparts.com",
      "logo": "https://www.orbiparts.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-305-123-4567",
        "contactType": "Sales",
        "areaServed": "Worldwide",
        "availableLanguage": ["en", "es"]
      }
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "description": "ORBIPARTS connects buyers and sellers globally for commercial aircraft trading, leasing, and asset management. Narrow-body, wide-body, regional, and cargo aircraft.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "price": "Contact for quote"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Aircraft Trading & Leasing | Airbus, Boeing, Embraer | ORBIPARTS</title>
        <meta 
          name="description" 
          content="Global aircraft trading and leasing marketplace. Buy, sell, and lease Airbus A320, Boeing 737, 777, 787, Embraer E-Jets, and cargo aircraft. Fleet consulting and asset management worldwide."
        />
        <meta 
          name="keywords" 
          content="aircraft trading, aircraft leasing, buy aircraft, sell aircraft, Airbus A320, Boeing 737, Boeing 777, Boeing 787, Embraer E-Jets, aircraft sales, fleet management, aircraft broker, commercial aircraft, cargo aircraft, freighter aircraft"
        />
        <link rel="canonical" href="https://www.orbiparts.com/aircraft-trading" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Aircraft Trading & Leasing | ORBIPARTS" />
        <meta property="og:description" content="We buy, sell, and lease aircraft worldwide. Airbus, Boeing, Embraer trading and leasing." />
        <meta property="og:url" content="https://www.orbiparts.com/aircraft-trading" />
        <meta property="og:type" content="website" />
        <SEO
          title="Aircraft Trading & Leasing | Airbus, Boeing, Embraer, Cargo | ORBIPARTS"
          description="Global aircraft trading & leasing: Airbus A320/A330/A350, Boeing 737/767/777/787, regional and cargo fleets. Fleet transition & technical support."
          canonical="https://www.orbiparts.com/aircraft-trading"
          breadcrumbs={[
            { name: 'Home', url: 'https://www.orbiparts.com/' },
            { name: 'Aircraft Trading', url: 'https://www.orbiparts.com/aircraft-trading' }
          ]}
          schemas={buildAircraftTradingServiceSchemas()}
        />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#03132B] via-[#0A1F44] to-[#03132B]">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 mb-16"
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm">
                  <AircraftIcon className="w-16 h-16" color="white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Commercial Aircraft Trading & Leasing
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We buy, sell, and lease commercial aircraft worldwide. Narrow-body, wide-body, regional, and cargo aircraft available.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                >
                  Request Aircraft Quote
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  All Services
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Aircraft Categories Section */}
          <section className="container mx-auto px-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Aircraft We Trade
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {aircraftCategories.map((cat, index) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{cat.icon}</span>
                      <h3 className="text-xl font-bold text-white">
                        {cat.category}
                      </h3>
                    </div>
                    
                    <ul className="space-y-2">
                      {cat.models.map((model) => (
                        <li key={model} className="text-gray-300 text-sm flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>{model}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Services Section */}
          <section className="container mx-auto px-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Comprehensive Aircraft Services
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Why Choose ORBIPARTS */}
          <section className="container mx-auto px-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
                Why Trade Aircraft with ORBIPARTS?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Global Operations</h3>
                    <p className="text-gray-300 text-sm">Direct aircraft sales and leasing operations in 100+ countries worldwide.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Verified Listings</h3>
                    <p className="text-gray-300 text-sm">All aircraft listings verified with complete documentation and records.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Expert Advisory</h3>
                    <p className="text-gray-300 text-sm">Industry experts guiding you through every step of the transaction.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Market Intelligence</h3>
                    <p className="text-gray-300 text-sm">AI-powered market analysis for competitive pricing and timing.</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  Get Aircraft Quote Now
                </Link>
              </div>
            </motion.div>
          </section>

          {/* Executive Aircraft Spotlight */}
          <section className="container mx-auto px-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <AircraftIcon className="w-8 h-8" color="#FFFFFF" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Executive & Business Jets
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-300 mb-3">Popular platforms:</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Gulfstream G450/G550/G650/G700</li>
                      <li>• Dassault Falcon 2000/7X/8X/10X</li>
                      <li>• Bombardier Challenger/Global family</li>
                      <li>• Embraer Praetor/Legacy series</li>
                      <li>• Cessna Citation Latitude/Longitude</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-300 mb-3">Capabilities:</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Off-market sourcing and discrete transactions</li>
                      <li>• Technical records review and inspections</li>
                      <li>• Financing and lease structuring</li>
                      <li>• Global delivery and entry-into-service support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Statistics Section */}
          <section className="container mx-auto px-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                  <div className="text-gray-400 text-sm">Aircraft Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
                  <div className="text-gray-400 text-sm">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-400 text-sm">Airlines & Operators</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
                  <div className="text-gray-400 text-sm">Global Support</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Buy, Sell, or Lease Aircraft?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Contact our aircraft trading team for market insights, valuations, and direct transactions worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-[#03132B] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Contact Aircraft Team
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Explore All Services
                </Link>
              </div>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AircraftTrading;
