import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plane, Wrench, Building, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Industries = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const industries = [
    {
      icon: Plane,
      title: t("industriesPage.airlines_title"),
      description: t("industriesPage.airlines_desc"),
      features: [
        t("industriesPage.airlines_f1"),
        t("industriesPage.airlines_f2"),
        t("industriesPage.airlines_f3"),
        t("industriesPage.airlines_f4"),
        t("industriesPage.airlines_f5")
      ],
      imageUrl: "/industry-airlines.jpg"
    },
    {
      icon: Wrench,
      title: t("industriesPage.mros_title"),
      description: t("industriesPage.mros_desc"),
      features: [
        t("industriesPage.mros_f1"),
        t("industriesPage.mros_f2"),
        t("industriesPage.mros_f3"),
        t("industriesPage.mros_f4"),
        t("industriesPage.mros_f5")
      ],
      imageUrl: "/industry-mros.jpg"
    },
    {
      icon: Building,
      title: t("industriesPage.leasing_title"),
      description: t("industriesPage.leasing_desc"),
      features: [
        t("industriesPage.leasing_f1"),
        t("industriesPage.leasing_f2"),
        t("industriesPage.leasing_f3"),
        t("industriesPage.leasing_f4"),
        t("industriesPage.leasing_f5")
      ],
      imageUrl: "/industry-leasing.jpg"
    },
    {
      icon: Users,
      title: t("industriesPage.brokers_title"),
      description: t("industriesPage.brokers_desc"),
      features: [
        t("industriesPage.brokers_f1"),
        t("industriesPage.brokers_f2"),
        t("industriesPage.brokers_f3"),
        t("industriesPage.brokers_f4"),
        t("industriesPage.brokers_f5")
      ],
      imageUrl: "/industry-brokers.jpg"
    },
    {
      icon: Shield,
      title: t("industriesPage.gov_title"),
      description: t("industriesPage.gov_desc"),
      features: [
        t("industriesPage.gov_f1"),
        t("industriesPage.gov_f2"),
        t("industriesPage.gov_f3"),
        t("industriesPage.gov_f4"),
        t("industriesPage.gov_f5")
      ],
      imageUrl: "/industry-government.jpg"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('industriesPage.title')} - Airlines, MROs, Leasing Companies | ORBIPARTS</title>
        <meta name="description" content="ORBIPARTS serves airlines, MROs, leasing companies, aviation brokers, and government operators worldwide with reliable aircraft components and support." />
        <meta property="og:title" content={`${t('industriesPage.title')} - ORBIPARTS`} />
        <meta property="og:description" content="Comprehensive aviation component solutions for airlines, MROs, leasing companies, brokers, and defense operators from Miami-based ORBIPARTS." />
      </Helmet>

      <div className="min-h-screen pt-16">
        {/* Hero Section - Ultra Modern */}
        <section className="relative py-32 gradient-bg overflow-hidden">
          {/* Advanced Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
              animation: 'gridMove 20s linear infinite'
            }}></div>
            
            {/* Floating Orbs */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            {/* Diagonal Accent Lines */}
            <svg className="absolute top-0 right-0 w-1/2 h-full opacity-10" viewBox="0 0 500 1000" fill="none">
              <path d="M0 0L500 1000" stroke="white" strokeWidth="2"/>
              <path d="M100 0L600 1000" stroke="white" strokeWidth="1" strokeDasharray="10,10"/>
              <path d="M-100 0L400 1000" stroke="white" strokeWidth="1"/>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20"
              >
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse delay-150"></div>
                </div>
                <span className="text-sm font-semibold tracking-wide">Trusted by Leading Aviation Companies</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  {t('industriesPage.title')}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
                {t('industriesPage.subtitle')}
              </p>
              
              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16"
              >
                <div className="inline-flex flex-col items-center gap-2">
                  <span className="text-sm text-blue-200 font-medium">Explore Industries</span>
                  <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Modern Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#F9FAFB"/>
            </svg>
          </div>
        </section>

        {/* Industries Grid - Asymmetric Layout */}
        <section className="py-32 bg-gray-50 relative overflow-hidden">
          {/* Subtle Background Decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-blue-50 via-transparent to-transparent opacity-60"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="space-y-32">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`grid lg:grid-cols-12 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Content Side */}
                  <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-8' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {/* Simple Accent Line */}
                      <div className="mb-8">
                        <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      </div>

                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {industry.title}
                      </h2>
                      
                      <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
                        {industry.description}
                      </p>
                      
                      {/* Features List - Minimalist */}
                      <ul className="space-y-4">
                        {industry.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + featureIndex * 0.1 }}
                            className="flex items-start gap-4 group"
                          >
                            <div className="flex-shrink-0 mt-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:scale-150 transition-transform"></div>
                            </div>
                            <span className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-900 transition-colors">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                  
                  {/* Image Side with Advanced Effects */}
                  <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="relative group"
                    >
                      {/* Decorative Frame */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                      
                      {/* Main Image Container */}
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                        
                        <img  
                          className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                          alt={industry.title}
                          src={industry.imageUrl}
                        />
                        
                        {/* Bottom Accent Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                      </div>
                      
                      {/* Floating Number Badge */}
                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-gray-50 transform group-hover:rotate-12 transition-transform duration-500">
                        <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section - Data Visualization Style */}
        <section className="py-32 bg-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #e5e7eb 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-100 to-transparent rounded-full blur-3xl opacity-40"></div>
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
                <span className="text-sm font-bold text-blue-900 tracking-wide">Global Impact</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
                  {t('industriesPage.reach_title')}
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                {t('industriesPage.reach_subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "25+", label: t('industriesPage.reach_stat1'), color: "from-blue-500 to-blue-600" },
                { number: "30+", label: t('industriesPage.reach_stat2'), color: "from-purple-500 to-purple-600" },
                { number: "25+", label: t('industriesPage.reach_stat3'), color: "from-indigo-500 to-indigo-600" },
                { number: "24/7", label: t('industriesPage.reach_stat4'), color: "from-cyan-500 to-cyan-600" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="group"
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    {/* Card */}
                    <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                      {/* Top Accent */}
                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${stat.color} rounded-full`}></div>
                      
                      {/* Number */}
                      <div className={`text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                        {stat.number}
                      </div>
                      
                      {/* Label */}
                      <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership CTA - Premium Design */}
        <section className="relative py-32 gradient-bg overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`
            }}></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-10"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Ready to Partner</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                {t('industriesPage.cta_title')}
              </h2>
              
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
                {t('industriesPage.cta_subtitle')}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/contact')}
                  className="group relative px-10 py-5 bg-white text-blue-700 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative">
                    {t('industriesPage.cta_button_start')}
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/about')}
                  className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-blue-700 transition-all duration-300"
                >
                  {t('industriesPage.cta_button_learn')}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Industries;