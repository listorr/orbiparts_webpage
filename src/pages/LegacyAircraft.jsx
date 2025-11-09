import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plane, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LegacyAircraft = () => {
  const fleets = [
    {
      manufacturer: 'Boeing (Classic)',
      models: [
        { name: '727 Family', atas: '21-38, 49, 51-57, 71-80' },
        { name: '737 Classic (300/400/500)', atas: '21-38, 49, 51-57, 71-80' },
        { name: '747 Classic', atas: '21-38, 49, 51-57, 71-80' },
      ],
      imageUrl: 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756812616624.jpg'
    },
    {
      manufacturer: 'McDonnell Douglas',
      models: [
        { name: 'MD-80 Series', atas: '21-38, 49, 51-57, 71-80' },
        { name: 'DC-10', atas: '21-38, 49, 51-57, 71-80' },
      ],
      imageUrl: 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756816445076.webp'
    },
    {
      manufacturer: 'Airbus (Classic)',
      models: [
        { name: 'A300 / A310', atas: '21-38, 49, 51-57, 71-80' },
        { name: 'A320 Classic Family', atas: '21-38, 49, 51-57, 71-80' },
      ],
      imageUrl: 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756816529223.webp'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Legacy Aircraft Support | ORBIPARTS - B727, MD80, DC-10</title>
        <meta name="description" content="ORBIPARTS specializes in sourcing and distributing components for legacy aircraft, including Boeing 727, MD-80, DC-10, and classic Airbus A320/A300 families." />
        <meta property="og:title" content="Legacy Aircraft Support | ORBIPARTS" />
        <meta property="og:description" content="Your expert partner for legacy aircraft components. We keep classic fleets flying with our specialized sourcing and global logistics network." />
      </Helmet>

      <div className="min-h-screen pt-16">
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Legacy & Classic Aircraft Parts Support (B727, MD-80, DC-10)</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                Specialized expertise in keeping classic fleets in the air.
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

export default LegacyAircraft;