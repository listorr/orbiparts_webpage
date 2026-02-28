
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Globe, Clock, Shield, Award, Phone, MessageSquare, Package, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LogicalNetworkVisualization from '@/components/LogicalNetworkVisualization';
import { GlobalIcon, SpeedIcon, ShieldCheckIcon } from '@/components/icons/AviationIcons';
import { SEO, buildProcurementPlatformSchema, buildWebsiteSchema, buildOrganizationSchema } from '@/components/SEO';
import SEOHead from '@/components/SEOHead';
import SchemaOrg from '@/components/SchemaOrg';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const heroContent = {
    imageUrl: "https://images.unsplash.com/photo-1578575437195-235a396d11b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Aircraft in a hangar during maintenance",
  };

  const handleCheckStockClick = () => navigate('/stock');
  const handleAOGSupportClick = () => navigate('/aog-support');
  const handleAOGCall = () => { window.location.href = "tel:+19292299520"; };
  const handleAOGChat = () => {
    const phoneNumber = "+19292299520";
    const message = "Hi ORBIPARTS team, I have an AOG situation and need urgent assistance.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const trustElements = [
    { icon: Globe, text: t("homePage.trust_global") },
    { icon: Shield, text: t("homePage.trust_certified") },
    { icon: Clock, text: t("homePage.trust_aog") },
    { icon: Award, text: t("homePage.trust_leaders") }
  ];

  const overviewItems = [
    { 
      title: t("homePage.overview_modern_title"), 
      description: t("homePage.overview_modern_desc"), 
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop&q=80", 
      alt: "Modern Airbus A350 aircraft on the tarmac", 
      link: "/modern-fleets" 
    },
    { 
      title: t("homePage.overview_legacy_title"), 
      description: t("homePage.overview_legacy_desc"), 
      image: "/legacy-aircraft-hero.jpg", 
      alt: "Front view of a classic B727 legacy aircraft", 
      link: "/legacy-aircraft" 
    },
    { 
      title: t("homePage.overview_aog_title"), 
      description: t("homePage.overview_aog_desc"), 
      image: "/aog-support-hero.jpg", 
      alt: "Aircraft on Ground (AOG) support team working on landing gear", 
      link: "/aog-support" 
    },
    { 
      title: t("homePage.overview_global_title"), 
      description: t("homePage.overview_global_desc"), 
      image: "/global-reach-hero.jpg", 
      alt: "Global aircraft parts supply chain network", 
      link: "/global-reach" 
    }
  ];

  return (
    <>
      {/* SEO Multiidioma - Nuevo componente optimizado */}
      <SEOHead pageKey="home" />
      <SchemaOrg />
      
      {/* SEO Component - Mantener componente existente */}
      <SEO
        title="ORBIPARTS | Global Aircraft Parts & AI Procurement Platform"
        description="Global supplier of aircraft parts, engines and helicopter components with AI procurement platform. AOG support under 30 minutes. 1000+ certified suppliers worldwide."
        canonical="https://www.orbiparts.com/"
        breadcrumbs={[{ name: 'Home', url: 'https://www.orbiparts.com/' }]}
        schemas={[
          buildProcurementPlatformSchema(), 
          buildWebsiteSchema(),
          buildOrganizationSchema()
        ]}
        ogImage="https://images.unsplash.com/photo-1578575437195-235a396d11b3?q=80&w=2070"
        ogType="website"
        siteName="ORBIPARTS"
        twitterImage="https://images.unsplash.com/photo-1578575437195-235a396d11b3?q=80&w=2070"
        locale="en_US"
        alternates={[
          { hrefLang: 'en', url: 'https://www.orbiparts.com/' },
          { hrefLang: 'es', url: 'https://www.orbiparts.com/es/' },
          { hrefLang: 'x-default', url: 'https://www.orbiparts.com/' }
        ]}
      />


    <div className="bg-white text-neutral-900">
      {/* Hero Section - Integrated Design */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F2847] to-[#1a3a5c] text-white flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <img
            src="/isometric-bg.png"
            alt="ORBIPARTS Global Aviation Network"
            className="w-full h-full object-cover opacity-30"
            style={{ objectPosition: 'center bottom' }}
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-purple-900/30"></div>
          
          {/* Animated Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 right-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-40 left-20 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl"
            />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-10"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
              >
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  {t('hero.h1').split(' ').slice(0, 2).join(' ')}
                </span>
                <span className="block mt-2 text-white">
                  {t('hero.h1').split(' ').slice(2).join(' ')}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl lg:text-2xl text-blue-100 max-w-2xl font-light leading-relaxed"
              >
                {t('hero.subheading')}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-5 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCheckStockClick}
                  className="group relative px-10 py-5 bg-white text-blue-900 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    Check Our Stock
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAOGSupportClick}
                  className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-blue-900 transition-all duration-300"
                >
                  AOG Support
                </motion.button>
              </motion.div>

              {/* Stats Pills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap gap-4 pt-8"
              >
                {[
                  { value: '100+', label: 'Countries' },
                  { value: '24/7', label: 'Support' },
                  { value: '1000+', label: 'Suppliers' }
                ].map((stat, i) => (
                  <div key={i} className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                    <span className="text-white font-bold text-lg">{stat.value}</span>
                    <span className="text-blue-200 text-sm ml-2">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Organic Wave Divider - Seamless Integration */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-24 md:h-32 lg:h-40" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
            <path 
              d="M0,160 C360,280 720,280 1080,160 C1260,100 1350,70 1440,64 L1440,320 L0,320 Z" 
              fill="white"
              className="drop-shadow-2xl"
            />
            <path 
              d="M0,192 C360,280 720,280 1080,192 C1260,140 1350,110 1440,96" 
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* Trust Ticker - Integrated with Wave */}
      <section className="relative -mt-1 py-8 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 overflow-hidden">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 120px)'
          }}></div>
        </div>
        
        <div className="relative">
          <motion.div
            animate={{ x: [-1200, 0] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-20 whitespace-nowrap"
          >
            {[...Array(3)].map((_, repeatIndex) => (
              <div key={repeatIndex} className="flex gap-20 items-center">
                {trustElements.map((element, index) => (
                  <div key={`${repeatIndex}-${index}`} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    <span className="text-white font-semibold text-base tracking-wide">
                      {element.text}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Network Visualization - Premium Section */}
      <section className="relative py-32 bg-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-50 via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-50 via-transparent to-transparent opacity-60"></div>
          
          {/* Dot Pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-blue-900 tracking-wide">Global Network</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('homeHeroExtended.networkHubTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4 font-light leading-relaxed">
              {t('homeHeroExtended.networkHubSubtitle1')}
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
              {t('homeHeroExtended.networkHubSubtitle2')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="relative">
              {/* Glow Effect Behind Visualization */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-3xl rounded-3xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <LogicalNetworkVisualization />
              </div>
            </div>
          </motion.div>

          {/* Value Propositions - Modern Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                gradient: 'from-blue-500 to-indigo-600',
                icon: GlobalIcon,
                title: t('homeHeroExtended.value_globalNetwork_title'),
                desc: t('homeHeroExtended.value_globalNetwork_desc'),
                borderColor: 'hover:border-blue-300'
              },
              {
                gradient: 'from-purple-500 to-pink-600',
                icon: SpeedIcon,
                title: t('homeHeroExtended.value_instantConnections_title'),
                desc: t('homeHeroExtended.value_instantConnections_desc'),
                borderColor: 'hover:border-purple-300'
              },
              {
                gradient: 'from-emerald-500 to-teal-600',
                icon: ShieldCheckIcon,
                title: t('homeHeroExtended.value_qualityAssured_title'),
                desc: t('homeHeroExtended.value_qualityAssured_desc'),
                borderColor: 'hover:border-emerald-300'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 ${value.borderColor} transform hover:-translate-y-2`}
              >
                {/* Glow Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <value.icon className="w-9 h-9" color="white" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overview Section - Magazine Style Cards */}
      <section className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-full mb-8 border border-blue-200/30">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-base font-bold text-blue-900 tracking-wide">Our Solutions</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {t('homePage.partner_title')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              {t('homePage.partner_desc')}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {overviewItems.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={item.link} className="group block h-full">
                  <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                        alt={item.alt} 
                        src={item.image} 
                        loading="lazy" 
                        decoding="async" 
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                      
                      {/* Number Badge - Larger and more prominent */}
                      <div className="absolute top-5 right-5 w-14 h-14 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-xl font-black bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed font-light text-base">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>{t('homePage.learn_more')}</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AOG Hotline - Urgent Banner */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Animated Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="flex flex-col md:flex-row justify-between items-center gap-10"
          >
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-bold tracking-wider">24/7 EMERGENCY SUPPORT</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">{t('aog.hotline')}</h2>
              <p className="text-xl md:text-2xl text-red-50 font-light leading-relaxed">{t('homePage.aog_desc')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAOGCall}
                className="px-10 py-5 bg-white text-red-700 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
              >
                {t('aog.call')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAOGChat}
                className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-red-700 transition-all shadow-lg"
              >
                {t('aog.chat')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-full border border-blue-200/30">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-base font-bold text-blue-900 tracking-wide">Ready to Start</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {t('homePage.cta_title')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              {t('homePage.cta_desc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckStockClick}
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
              >
                Check Our Stock
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAOGSupportClick}
                className="px-10 py-5 bg-white border-2 border-gray-300 text-gray-900 font-bold text-lg rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all shadow-lg"
              >
                AOG Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
