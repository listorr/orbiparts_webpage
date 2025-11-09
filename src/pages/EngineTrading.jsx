import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EngineIcon, AircraftIcon, ShieldCheckIcon, SpeedIcon, GlobalIcon } from '../components/icons/AviationIcons';

const EngineTrading = () => {
  const { t, i18n } = useTranslation();

  // Engine models we trade (commercial + executive)
  const engineModels = [
    {
      family: 'CFM International',
      models: ['CFM56-3', 'CFM56-5A/5B/5C', 'CFM56-7B', 'LEAP-1A', 'LEAP-1B'],
      aircraft: 'A320 family, Boeing 737 Classic & NG/MAX',
    },
    {
      family: 'Pratt & Whitney',
      models: ['PW4000-94', 'PW4000-100', 'PW4000-112', 'PW1100G-JM', 'PW1500G'],
      aircraft: 'Boeing 747, 767, 777; Airbus A220, A320neo family',
    },
    {
      family: 'General Electric',
      models: ['GE90-85B', 'GE90-94B', 'GE90-115B', 'GEnx-1B', 'GEnx-2B'],
      aircraft: 'Boeing 777, 787, 747-8',
    },
    {
      family: 'Rolls-Royce',
      models: ['Trent 700', 'Trent 800', 'Trent 900', 'Trent 1000', 'Trent XWB'],
      aircraft: 'Airbus A330, A340, A350, A380; Boeing 777, 787',
    },
    {
      family: 'International Aero Engines',
      models: ['V2500-A1', 'V2500-A5'],
      aircraft: 'Airbus A320 family',
    },
    {
      family: 'Executive & Business Aviation',
      models: ['PW300 Series', 'PW500 Series', 'TFE731', 'CF34-3/8/10', 'HTF7000'],
      aircraft: 'Gulfstream, Dassault Falcon, Bombardier Challenger/Global, Embraer Legacy/Lineage',
    },
  ];

  // Services offered
  const services = [
    {
      title: 'Engine Sales',
      description: 'Full engine sales for commercial, cargo, and business aviation. Complete documentation, FAA/EASA certifications, and global delivery.',
      icon: <GlobalIcon className="w-6 h-6" color="#60A5FA" />,
    },
    {
      title: 'Engine Leasing',
      description: 'Short-term and long-term engine leasing solutions. Flexible contracts, competitive rates, and 24/7 AOG support worldwide.',
      icon: <SpeedIcon className="w-6 h-6" color="#A78BFA" />,
    },
    {
      title: 'Asset Management',
      description: 'End-to-end engine asset management: acquisition, maintenance tracking, lease management, and remarketing services.',
      icon: <ShieldCheckIcon className="w-6 h-6" color="#34D399" />,
    },
    {
      title: 'Technical Support',
      description: 'Expert technical evaluation, borescope inspections, records review, and airworthiness compliance verification.',
      icon: <EngineIcon className="w-6 h-6" color="#F59E0B" />,
    },
    {
      title: 'Logistics & Delivery',
      description: 'Global engine transportation with specialized carriers. Insurance, customs clearance, and on-site installation support.',
      icon: <GlobalIcon className="w-6 h-6" color="#60A5FA" />,
    },
    {
      title: 'Part-Out Services',
      description: 'Engine teardown and part-out services. Maximum value recovery from end-of-life engines with certified component sales.',
      icon: <EngineIcon className="w-6 h-6" color="#F59E0B" />,
    },
  ];

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Aircraft Engine Trading and Leasing",
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
    "description": "ORBIPARTS provides global aircraft engine trading, leasing, and asset management services for CFM56, LEAP, PW4000, GE90, Trent, and V2500 engine families.",
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
        <title>Aircraft Engine Trading & Leasing | CFM56, LEAP, GE90, Trent | ORBIPARTS</title>
              <SEO
                title="Engine Trading & Leasing | CFM56, LEAP, GE90, PW4000 | ORBIPARTS"
                description="Global engine trading and leasing: CFM56, LEAP, GE90, PW4000, Trent, GEnx. Certified overhaul parts and 24/7 AOG support."
                canonical="https://www.orbiparts.com/engine-trading"
                breadcrumbs={[
                  { name: 'Home', url: 'https://www.orbiparts.com/' },
                  { name: 'Engine Trading', url: 'https://www.orbiparts.com/engine-trading' }
                ]}
                schemas={buildAircraftEngineServiceSchemas()}
              />
        <meta 
          name="description" 
          content="Global aircraft engine trading and leasing services. CFM56, LEAP, PW4000, GE90, GEnx, Trent engine families. Sales, leasing, asset management, and logistics worldwide. 24/7 AOG support."
        />
        <meta 
          name="keywords" 
          content="aircraft engine trading, engine leasing, CFM56 sale, LEAP engine, GE90 lease, Trent engine, PW4000, V2500, engine asset management, AOG engine support, commercial engine sales, jet engine leasing"
        />
        <link rel="canonical" href="https://www.orbiparts.com/engine-trading" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Aircraft Engine Trading & Leasing | ORBIPARTS" />
        <meta property="og:description" content="Global engine trading and leasing for CFM56, LEAP, GE90, Trent families. 24/7 AOG support worldwide." />
        <meta property="og:url" content="https://www.orbiparts.com/engine-trading" />
        <meta property="og:type" content="website" />
        
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
                  <EngineIcon className="w-16 h-16" color="white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Aircraft Engine Trading & Leasing
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We buy, sell, and lease commercial aircraft engines worldwide. CFM56, LEAP, GE90, Trent, PW4000, and V2500 engine families available.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                >
                  Request Engine Quote
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

          {/* Engine Models Section */}
          <section className="container mx-auto px-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Engine Families We Trade
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {engineModels.map((engine, index) => (
                  <motion.div
                    key={engine.family}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      {engine.family}
                    </h3>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2 font-semibold">Models:</p>
                      <ul className="space-y-1">
                        {engine.models.map((model) => (
                          <li key={model} className="text-gray-300 text-sm">
                            • {model}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-gray-400 mb-1">Aircraft:</p>
                      <p className="text-sm text-gray-300">{engine.aircraft}</p>
                    </div>
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
                Comprehensive Engine Services
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

          {/* Executive Engines Spotlight */}
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
                    Executive & Business Aviation Engines
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-300 mb-3">Popular platforms:</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Gulfstream G450/G550/G650 (BR710, BR725)</li>
                      <li>• Dassault Falcon 2000/7X/8X (PW308, PW307, PW307D)</li>
                      <li>• Bombardier Challenger/Global (CF34, BR710)</li>
                      <li>• Embraer Legacy/Lineage (AE3007, CF34)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-300 mb-3">Capabilities:</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Sale & lease of mid-life and serviceable engines</li>
                      <li>• Records audit, borescope, and LLP status analysis</li>
                      <li>• Exchange programs and AOG support</li>
                      <li>• Global logistics and induction to MRO partners</li>
                    </ul>
                  </div>
                </div>
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
                Why Trade Engines with ORBIPARTS?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Global Supplier Network</h3>
                    <p className="text-gray-300 text-sm">Access to 1000+ authorized engine suppliers and lessors worldwide.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Verified Authenticity</h3>
                    <p className="text-gray-300 text-sm">All engines verified with full documentation and airworthiness records.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">24/7 AOG Support</h3>
                    <p className="text-gray-300 text-sm">Emergency engine availability with rapid deployment worldwide.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Competitive Pricing</h3>
                    <p className="text-gray-300 text-sm">AI-powered marketplace connecting you with the best offers globally.</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  Get Engine Quote Now
                </Link>
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
                Need an Engine? We'll Find It.
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Connect with global engine suppliers through our AI-powered marketplace. Get competitive quotes within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-[#03132B] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Contact Engine Team
                </Link>
                <Link
                  to="/stock"
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Search Engine Parts
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

export default EngineTrading;
