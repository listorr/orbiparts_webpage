import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Zap, Globe, Clock, Shield, Award, Users, Truck, Package, Star, Target, Lock, CheckCircle, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SEO, buildFAQSchema } from '@/components/SEO';

const WhyChooseUs = () => {
  const advantages = [
    {
      icon: MapPin,
      title: "Miami-Based with Global Reach",
      description: "Strategic location in Miami provides unparalleled access to the Americas and international markets, enabling efficient logistics and faster delivery times worldwide."
    },
    {
      icon: Zap,
      title: "Modern & Legacy Fleet Focus",
      description: "Unique expertise in both cutting-edge modern aircraft (Airbus, Boeing, Embraer) and legacy fleets (B727, MD80, DC-10, classic families) that others overlook."
    },
    {
      icon: Clock,
      title: "Fast Response & 24/7 AOG Support",
      description: "Dedicated AOG desk operating around the clock to minimize aircraft downtime with rapid response times and emergency parts sourcing capabilities."
    },
    {
      icon: Shield,
      title: "Competitive Pricing & Transparency",
      description: "Transparent pricing structure with competitive rates, no hidden fees, and flexible payment terms designed to optimize your operational costs."
    },
    {
      icon: Award,
      title: "Trusted Partner Network",
      description: "Established relationships with certified suppliers, airlines, and MROs worldwide, ensuring reliable sourcing and quality assurance for every transaction."
    },
    {
      icon: Users,
      title: "Industry Expertise",
      description: "Deep aviation knowledge and technical expertise from our experienced team who understand the complexities of aircraft component trading and logistics."
    }
  ];

  const testimonials = [
    {
      quote: "ORBIPARTS has been instrumental in keeping our legacy fleet operational. Their expertise in sourcing hard-to-find components is unmatched.",
      author: "Chief Maintenance Officer",
      company: "Regional Airline"
    },
    {
      quote: "The 24/7 AOG support has saved us countless hours of downtime. Their response time and solution-oriented approach is exceptional.",
      author: "Fleet Manager",
      company: "Cargo Operator"
    },
    {
      quote: "Working with ORBIPARTS has streamlined our parts procurement process. Their Miami location gives us a significant logistics advantage.",
      author: "Procurement Director",
      company: "MRO Facility"
    }
  ];

  return (
    <>
      <SEO
        title="Why Choose ORBIPARTS | Global Aircraft Parts & AI Sourcing"
        description="Why leading airlines, operators and MROs choose ORBIPARTS: <30min AOG, 1000+ certified suppliers, AI procurement, modern & legacy fleet expertise."
        canonical="https://www.orbiparts.com/why-choose-us"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.orbiparts.com/' },
          { name: 'Why Choose Us', url: 'https://www.orbiparts.com/why-choose-us' }
        ]}
        schemas={[buildFAQSchema([
          { q: 'What aircraft platforms do you support?', a: 'We support Airbus, Boeing, Embraer, Bombardier and regional fleets, as well as legacy aircraft such as B727, MD-80 and DC-10.' },
          { q: 'How fast is AOG response?', a: 'Our dedicated AOG desk provides response in under 30 minutes with global coverage and priority logistics.' },
          { q: 'Are parts certified?', a: 'Yes. We work with certified suppliers and provide traceability and compliance (FAA/EASA/8130-3, dual release where applicable).' },
          { q: 'Do you handle engines and rotables?', a: 'Yes. We supply engines, rotables, avionics, landing gear, consumables and chemicals with full documentation.' },
          { q: 'Can you integrate with our procurement systems?', a: 'Our AI-powered quoting and sourcing platform integrates with standard procurement workflows and supports API-based connectivity.' }
        ])]}
      />
      <Helmet>
        <title>Why Choose ORBIPARTS | Global Aircraft Parts Supplier | Engine Trading & Aviation Excellence Worldwide</title>
        <meta name="description" content="Leading global aviation supplier: 10,000+ components inventory, all aircraft platforms, engine trading & leasing, 24/7 AOG support worldwide, OEM distribution, procurement software. Trusted by 100+ airlines & MROs." />
        
        {/* Keywords */}
        <meta name="keywords" content="why choose ORBIPARTS, best aircraft parts supplier, reliable aviation supplier, aircraft engine trading, global aviation company, OEM distributor, procurement software aviation, 24/7 AOG support, worldwide aircraft parts, trusted aviation supplier" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Why Choose ORBIPARTS - Global Aircraft Parts, Engines & Aviation Excellence" />
        <meta property="og:description" content="Global reach, extensive inventory, engine trading & leasing, 24/7 AOG support, OEM distribution, and procurement software make ORBIPARTS the trusted choice for airlines and MROs worldwide." />
        <meta property="og:url" content="https://www.orbiparts.com/why-choose-us" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Why Choose ORBIPARTS",
            "description": "Discover why ORBIPARTS is the preferred global supplier for aircraft parts, engines, helicopters, and aviation solutions worldwide",
            "breadcrumb": {
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
                  "name": "Why Choose Us",
                  "item": "https://www.orbiparts.com/why-choose-us"
                }
              ]
            }
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose ORBIPARTS for Global Aircraft Parts & AOG Support</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                The strategic advantages that make us your ideal aviation partner
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Advantages */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Competitive Advantages</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover what sets ORBIPARTS apart in the global aviation components market
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <advantage.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{advantage.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Miami Advantage */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Miami Advantage</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Our strategic location in Miami isn't just about geography—it's about providing you with 
                  unparalleled access to global markets and logistics infrastructure that translates into 
                  real operational advantages.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Globe className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Gateway to the Americas</h4>
                      <p className="text-gray-600">Direct access to North, Central, and South American markets</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">World-Class Logistics Hub</h4>
                      <p className="text-gray-600">Advanced customs and shipping infrastructure</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Optimal Time Zones</h4>
                      <p className="text-gray-600">Efficient communication across multiple time zones</p>
                    </div>
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
                  alt="Miami International Airport cargo terminal"
                  src="https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/9aade5e9560f082f0f1e848f894b0f53.jpg" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from aviation professionals who trust ORBIPARTS for their critical component needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift h-full">
                    <CardContent className="p-8">
                      <blockquote className="text-gray-600 mb-6 italic leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="border-t pt-4">
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-gray-500 text-sm">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Performance That Speaks</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our track record demonstrates our commitment to excellence and reliability
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  metric: "98%", 
                  label: "On-Time Delivery Rate",
                  Icon: Package,
                  gradient: "from-blue-500 to-blue-600"
                },
                { 
                  metric: "<30min", 
                  label: "AOG Response Time",
                  Icon: Zap,
                  gradient: "from-red-500 to-red-600"
                },
                { 
                  metric: "99.5%", 
                  label: "Customer Satisfaction",
                  Icon: Star,
                  gradient: "from-green-500 to-green-600"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
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

        {/* CTA Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Experience the ORBIPARTS Difference</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Join the growing number of aviation professionals who have discovered the advantages 
                of partnering with ORBIPARTS for their aircraft component needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-md font-medium transition-colors">
                  Get Started Today
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-md font-medium transition-colors">
                  Schedule Consultation
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-neutral-600">Quick answers about platforms, certifications, AOG, and integration.</p>
            </motion.div>

            <div className="space-y-4">
              {[{
                q: 'What aircraft platforms do you support?',
                a: 'Airbus, Boeing, Embraer, Bombardier, regional fleets, and legacy aircraft such as B727, MD-80 and DC-10.'
              },{
                q: 'How fast is AOG response?',
                a: 'Under 30 minutes with 24/7 coverage and priority logistics worldwide.'
              },{
                q: 'Are parts certified?',
                a: 'Yes, with traceability and compliance including FAA/EASA/8130-3 and dual release where applicable.'
              },{
                q: 'Do you handle engines and rotables?',
                a: 'Yes, we supply complete assets: engines, rotables, avionics, gear, consumables and chemicals.'
              },{
                q: 'Can you integrate with our procurement system?',
                a: 'Our AI-powered platform supports standard procurement workflows and API integrations.'
              }].map((item, idx) => (
                <details key={idx} className="group border border-gray-200 rounded-xl p-4 open:bg-gray-50">
                  <summary className="cursor-pointer list-none font-semibold text-neutral-900 flex items-center justify-between">
                    <span>{item.q}</span>
                    <span className="ml-4 text-blue-600 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="mt-2 text-neutral-700">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhyChooseUs;