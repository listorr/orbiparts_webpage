import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plane, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ModernFleets = () => {
  const fleets = [
    {
      manufacturer: 'Airbus',
      models: [
        { name: 'A320 Family (CEO & NEO)', atas: '21, 22, 24, 27, 29, 32, 34, 35, 36, 38, 52, 70-80' },
        { name: 'A330 Family', atas: '21, 24, 27, 29, 32, 34, 36, 49, 52, 70-80' },
        { name: 'A350 Family', atas: '21, 24, 27, 29, 32, 34, 36, 49, 52, 70-80' },
        { name: 'A380', atas: '21, 24, 27, 29, 32, 34, 36, 49, 52, 70-80' },
      ],
      imageUrl: 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756812604417.jpg'
    },
    {
      manufacturer: 'Boeing',
      models: [
        { name: '737 NG & MAX Series', atas: '21, 24, 27, 29, 32, 34, 35, 36, 38, 52, 70-80' },
        { name: '777 Family', atas: '21, 24, 27, 29, 32, 34, 36, 49, 52, 70-80' },
        { name: '787 Dreamliner', atas: '21, 24, 27, 29, 32, 34, 36, 49, 52, 70-80' },
        { name: '747-8', atas: '21, 24, 27, 29, 32, 34, 36, 49, 52, 70-80' },
      ],
      imageUrl: 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756818626803.webp'
    },
    {
      manufacturer: 'Embraer',
      models: [
        { name: 'E-Jet Family (E170-E195)', atas: '21, 24, 27, 29, 32, 34, 36, 49, 52, 70-80' },
        { name: 'E-Jet E2 Family', atas: '21, 24, 27, 29, 32, 34, 36, 49, 52, 70-80' },
      ],
      imageUrl: 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756812595958.webp'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Modern Fleets Support | ORBIPARTS - Airbus, Boeing, Embraer</title>
        <meta name="description" content="ORBIPARTS provides comprehensive component support for modern aircraft fleets, including Airbus A320/A330/A350, Boeing 737/777/787, and Embraer E-Jets." />
        <meta property="og:title" content="Modern Fleets Support | ORBIPARTS" />
        <meta property="og:description" content="Your trusted partner for modern aircraft components. We support the latest fleets from Airbus, Boeing, and Embraer with reliable and cost-effective solutions." />
      </Helmet>

      <div className="min-h-screen pt-16">
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Modern Commercial Aircraft Fleet Support & Parts</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                Keeping the world's most advanced aircraft flying with reliable component solutions.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {fleets.map((fleet, index) => (
              <motion.div key={fleet.manufacturer} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <img src={fleet.imageUrl} alt={`${fleet.manufacturer} aircraft`} className="w-full h-96 object-cover rounded-lg shadow-lg" />
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{fleet.manufacturer}</h2>
                  <div className="space-y-4">
                    {fleet.models.map(model => (
                      <Card key={model.name} className="hover-lift">
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-lg text-blue-800">{model.name}</h3>
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Supported ATA Chapters:</span> {model.atas}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ModernFleets;