import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Globe, Anchor, Plane } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const GlobalReach = () => {
  const regions = [
    { name: 'North America', icon: MapPin },
    { name: 'South America', icon: MapPin },
    { name: 'Europe', icon: MapPin },
    { name: 'Asia', icon: MapPin },
    { name: 'Middle East & Africa', icon: MapPin },
  ];

  return (
    <>
      <Helmet>
        <title>Global Reach | ORBIPARTS - Miami Hub, Worldwide Service</title>
        <meta name="description" content="ORBIPARTS offers global aircraft component services from our strategic hub in Miami, serving key aviation markets in the Americas, Europe, Asia, and beyond." />
        <meta property="og:title" content="Global Reach | ORBIPARTS" />
        <meta property="og:description" content="From Miami to the world. Explore our global service network and discover how we provide rapid aviation support across continents." />
      </Helmet>

      <div className="min-h-screen pt-16">
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Global Aviation Parts Distribution & Network Reach</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                Based in Miami. Serving the World.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Miami: The Hub of Our Global Network</h2>
                        <p className="text-lg text-gray-600 mb-4">Our headquarters in Miami is more than just an office; it's the nerve center of our global operations. This strategic location allows us to provide unparalleled logistics support to the Americas and act as a critical gateway to Europe, Asia, and beyond.</p>
                        <p className="text-lg text-gray-600">With access to one of the world's busiest airports (MIA) and seaports, we ensure your components are delivered with maximum speed and efficiency.</p>
                    </div>
                    <div>
                        <img src="https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756818746128.webp" alt="World map with connection lines" className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Key Regions We Serve</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our network spans across all major aviation markets, ensuring you have support wherever your fleet operates.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {regions.map((region, index) => (
                <motion.div key={region.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card className="text-center hover-lift h-full">
                    <CardContent className="p-6">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                        <region.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold">{region.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GlobalReach;