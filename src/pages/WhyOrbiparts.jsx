import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Zap, Globe, Clock, Shield, Award, Users, Truck, Package, Star, Target, Lock, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/SEO';

const WhyOrbiparts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    { metric: '98%', label: 'On-Time Delivery Rate', Icon: Package, gradient: 'from-blue-500 to-blue-600' },
    { metric: '<30min', label: 'AOG Response Time', Icon: Zap, gradient: 'from-red-500 to-red-600' },
    { metric: '99.5%', label: 'Customer Satisfaction', Icon: Star, gradient: 'from-green-500 to-green-600' }
  ];

  const advantages = [
    { icon: MapPin, title: t('whyOrbipartsPage.miamiGatewayTitle'), description: t('whyOrbipartsPage.miamiGatewayDesc') },
    { icon: Zap, title: t('whyOrbipartsPage.aiInstantQuery'), description: t('whyOrbipartsPage.aiDeskText') },
    { icon: Clock, title: t('whyOrbipartsPage.performanceTitle'), description: t('whyOrbipartsPage.performanceSubtitle') },
    { icon: Shield, title: t('whyOrbipartsPage.aiVerifiedAuthenticity'), description: t('whyOrbipartsPage.subtitle') },
    { icon: Award, title: t('whyOrbipartsPage.advantagesTitle'), description: t('whyOrbipartsPage.advantagesSubtitle') },
    { icon: Users, title: 'Industry Expertise', description: 'Deep aviation knowledge and technical expertise from our experienced team.' }
  ];

  return (
    <>
      <SEO
        title="Why ORBIPARTS | Aviation Component Partner & Global Network"
        description="Strategic Miami gateway, <30min AOG response, AI procurement, modern & legacy expertise, certified supplier network in 100+ countries."
        canonical="https://www.orbiparts.com/why-orbiparts"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.orbiparts.com/' },
          { name: 'Why ORBIPARTS', url: 'https://www.orbiparts.com/why-orbiparts' }
        ]}
        ogImage="https://images.unsplash.com/photo-1578575437195-235a396d11b3?q=80&w=2070"
        twitterImage="https://images.unsplash.com/photo-1578575437195-235a396d11b3?q=80&w=2070"
        ogType="website"
        siteName="ORBIPARTS"
        locale="en_US"
        alternates={[
          { hrefLang: 'en', url: 'https://www.orbiparts.com/why-orbiparts' },
          { hrefLang: 'es', url: 'https://www.orbiparts.com/es/why-orbiparts' },
          { hrefLang: 'x-default', url: 'https://www.orbiparts.com/why-orbiparts' }
        ]}
      />

      <div className="min-h-screen pt-16 bg-base-bg">
        {/* Hero */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('whyOrbipartsPage.pageTitle')}</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">{t('whyOrbipartsPage.subtitle')}</p>
            </motion.div>
          </div>
        </section>

        {/* Performance */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">{t('whyOrbipartsPage.performanceTitle')}</h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">{t('whyOrbipartsPage.performanceSubtitle')}</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group"
                  >
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                      <div className="mb-4 flex items-center justify-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                          <stat.Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4`}>{stat.metric}</div>
                      <p className="text-lg font-semibold text-gray-700">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Desk */}
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
                      <h3 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text">{t('whyOrbipartsPage.aiDeskTitle')}</h3>
                    </div>
                    <p
                      className="text-xl text-center text-gray-300 mb-6 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: t('whyOrbipartsPage.aiDeskText').replace('+100', '<span class=\"font-bold text-white\">+100</span>') }}
                    />
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-semibold">{t('whyOrbipartsPage.aiInstantQuery')}</span>
                      </div>
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 font-semibold">{t('whyOrbipartsPage.aiSmartComparison')}</span>
                      </div>
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-semibold">{t('whyOrbipartsPage.aiVerifiedAuthenticity')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
        </section>

        {/* Advantages */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">{t('whyOrbipartsPage.advantagesTitle')}</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">{t('whyOrbipartsPage.advantagesSubtitle')}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((adv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="hover-lift h-full rounded-lg">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <adv.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-4">{adv.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{adv.description}</p>
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
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">{t('whyOrbipartsPage.miamiTitle')}</h2>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">{t('whyOrbipartsPage.miamiText1')}</p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Globe className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{t('whyOrbipartsPage.miamiGatewayTitle')}</h4>
                      <p className="text-neutral-600">{t('whyOrbipartsPage.miamiGatewayDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{t('whyOrbipartsPage.miamiLogisticsTitle')}</h4>
                      <p className="text-neutral-600">{t('whyOrbipartsPage.miamiLogisticsDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{t('whyOrbipartsPage.miamiTimezonesTitle')}</h4>
                      <p className="text-neutral-600">{t('whyOrbipartsPage.miamiTimezonesDesc')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  alt="Miami International Airport cargo terminal"
                  src="https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/9aade5e9560f082f0f1e848f894b0f53.jpg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">{t('whyOrbipartsPage.ctaTitle')}</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">{t('whyOrbipartsPage.ctaSubtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/contact')} size="lg" className="bg-white text-primary hover:bg-gray-200 rounded-md">
                  {t('whyOrbipartsPage.ctaGetStarted')}
                </Button>
                <Button onClick={() => navigate('/contact')} size="lg" variant="outline-white" className="rounded-md">
                  {t('whyOrbipartsPage.ctaSchedule')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhyOrbiparts;