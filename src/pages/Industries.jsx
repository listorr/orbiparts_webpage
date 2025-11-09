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
      imageUrl: "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/afe1510c6be8707644f730e42efbcb4e.jpg"
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
      imageUrl: "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/75cbed8fd1011deb8be31eee9530cfe0.jpg"
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
      imageUrl: "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/66b19e0b0f7812d6b04b49a5f556ae5f.png"
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
      imageUrl: "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/a8a8ce37de447c58640c141620b78df8.jpg"
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
      imageUrl: "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/467f041fcdb302b38a50999507a31069.jpg"
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
        {/* Hero Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('industriesPage.title')}</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                {t('industriesPage.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <Card className="hover-lift">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <industry.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <CardTitle className="text-2xl">{industry.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-6 text-lg">{industry.description}</p>
                        <ul className="space-y-3">
                          {industry.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <img  
                      className="w-full h-96 object-cover rounded-lg shadow-lg"
                      alt={industry.title}
                     src={industry.imageUrl} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('industriesPage.reach_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('industriesPage.reach_subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "25+", label: t('industriesPage.reach_stat1') },
                { number: "30+", label: t('industriesPage.reach_stat2') },
                { number: "25+", label: t('industriesPage.reach_stat3') },
                { number: "24/7", label: t('industriesPage.reach_stat4') }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="text-4xl md:text-5xl font-bold text-blue-600">{stat.number}</div>
                  <p className="text-lg text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership CTA */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">{t('industriesPage.cta_title')}</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {t('industriesPage.cta_subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/contact')} size="lg" className="bg-white text-primary hover:bg-gray-200 rounded-md">
                  {t('industriesPage.cta_button_start')}
                </Button>
                <Button onClick={() => navigate('/about')} size="lg" variant="outline-white" className="rounded-md">
                  {t('industriesPage.cta_button_learn')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Industries;