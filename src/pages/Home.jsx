
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
import { SEO, buildProcurementPlatformSchema, buildWebsiteSchema } from '@/components/SEO';
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
    { title: t("homePage.overview_modern_title"), description: t("homePage.overview_modern_desc"), image: "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/84c72ead01a57858c3507d0a945eb4d4.jpg", alt: "Modern Airbus A350 aircraft on the tarmac", link: "/modern-fleets" },
    { title: t("homePage.overview_legacy_title"), description: t("homePage.overview_legacy_desc"), image: "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/e21a52c5a892d6332555144d3079330d.jpg", alt: "Front view of a classic B727 legacy aircraft", link: "/legacy-aircraft" },
    { title: t("homePage.overview_aog_title"), description: t("homePage.overview_aog_desc"), image: "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/91eb3ae3c01b376fc43bc73a6bfe9a86.webp", alt: "Aircraft on Ground (AOG) support team working on landing gear", link: "/aog-support" },
    { title: t("homePage.overview_global_title"), description: t("homePage.overview_global_desc"), image: "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/585fb08d5993ebb1226a90fbc0e4b744.webp", alt: "Digital representation of a globe showing global network connections", link: "/global-reach" }
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
        schemas={[buildProcurementPlatformSchema(), buildWebsiteSchema()]}
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


    <div className="bg-background text-neutral-900">
      <section className="relative min-h-[92vh] md:min-h-screen hero-gradient-bg text-white flex items-center justify-center">
        <div className="absolute inset-0">
          {/* Isometric background image */}
          <img
            src="/isometric-bg.png"
            alt="ORBIPARTS Global Aviation Network"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center bottom' }}
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#03132B]/95 via-[#03132B]/70 to-[#03132B]/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left z-10"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight tracking-tight mb-6" style={{ lineHeight: 1.15 }}>
                {t('hero.h1')}
              </h1>
              <p className="text-lg text-gray-300 max-w-lg mx-auto lg:mx-0 mb-10">
                {t('hero.subheading')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={handleCheckStockClick} size="lg" className="rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Check Our Stock
                </Button>
                <Button onClick={handleAOGSupportClick} size="lg" variant="outline-white" className="rounded-md border-red-300 text-red-200 hover:bg-red-600 hover:text-white font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  AOG Support
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustElements.map((element, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex flex-col items-center space-y-2">
                <element.icon className="w-8 h-8 text-primary" />
                <span className="font-semibold text-sm text-neutral-600">{element.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Visualization Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('homeHeroExtended.networkHubTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
              {t('homeHeroExtended.networkHubSubtitle1')}
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t('homeHeroExtended.networkHubSubtitle2')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LogicalNetworkVisualization />
          </motion.div>

          {/* Value Propositions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <GlobalIcon className="w-9 h-9" color="white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('homeHeroExtended.value_globalNetwork_title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('homeHeroExtended.value_globalNetwork_desc')}
              </p>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="w-16 h-16 mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <SpeedIcon className="w-9 h-9" color="white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('homeHeroExtended.value_instantConnections_title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('homeHeroExtended.value_instantConnections_desc')}
              </p>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
              <div className="w-16 h-16 mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShieldCheckIcon className="w-9 h-9" color="white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('homeHeroExtended.value_qualityAssured_title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('homeHeroExtended.value_qualityAssured_desc')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{t('homePage.partner_title')}</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {t('homePage.partner_desc')}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {overviewItems.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="hover-lift rounded-lg h-full flex flex-col">
                  <img className="w-full h-48 object-cover rounded-t-lg" alt={item.alt} src={item.image} loading="lazy" decoding="async" />
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">{item.title}</h3>
                    <p className="text-neutral-600 flex-grow mb-4">{item.description}</p>
                    <Link to={item.link}>
                      <Button variant="link" className="text-primary px-0">
                        {t('homePage.learn_more')} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{t('aog.hotline')}</h2>
              <p className="text-lg text-blue-200">{t('homePage.aog_desc')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Button onClick={handleAOGCall} size="lg" variant="default" className="bg-white text-primary hover:bg-gray-200 rounded-md">
                <Phone className="mr-2 w-5 h-5" /> {t('aog.call')}
              </Button>
              <Button onClick={handleAOGChat} size="lg" variant="outline-white" className="rounded-md">
                <MessageSquare className="mr-2 w-5 h-5" /> {t('aog.chat')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{t('homePage.cta_title')}</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('homePage.cta_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleCheckStockClick} size="lg" className="rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2">
                <Package className="w-5 h-5" />
                Check Our Stock
              </Button>
              <Button onClick={handleAOGSupportClick} variant="outline" size="lg" className="rounded-md border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                AOG Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
