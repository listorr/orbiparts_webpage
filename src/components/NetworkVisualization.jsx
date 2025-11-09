import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Users, Building2, Globe2, Zap, Network } from 'lucide-react';

const NetworkVisualization = () => {
  const [activeConnection, setActiveConnection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % 8);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const suppliers = [
    { icon: '🏭', label: 'OEM Distributors', angle: 0 },
    { icon: '✈️', label: 'Engine Traders', angle: 45 },
    { icon: '🔧', label: 'MRO Suppliers', angle: 90 },
    { icon: '🚁', label: 'Helicopter Parts', angle: 135 },
    { icon: '📦', label: 'Logistics Partners', angle: 180 },
    { icon: '⚙️', label: 'Component Traders', angle: 225 },
    { icon: '🌐', label: 'Global Network', angle: 270 },
    { icon: '🛠️', label: 'Certified Suppliers', angle: 315 },
  ];

  const customers = [
    { icon: '🏢', label: 'Airlines', angle: 0 },
    { icon: '🔬', label: 'MRO Facilities', angle: 72 },
    { icon: '✈️', label: 'Operators', angle: 144 },
    { icon: '🚁', label: 'Helicopter Ops', angle: 216 },
    { icon: '💼', label: 'Lessors', angle: 288 },
  ];

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0
          }}
          animate={{
            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
            y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <div className="relative h-full flex items-center justify-center">
        <div className="relative w-full max-w-4xl aspect-square">
          
          {/* Suppliers Circle (Outer) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {suppliers.map((supplier, index) => {
              const angle = (supplier.angle * Math.PI) / 180;
              const radius = 45; // percentage
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              
              return (
                <React.Fragment key={index}>
                  {/* Connection Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="url(#gradient-supplier)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: activeConnection === index ? 1 : 0.3,
                        opacity: activeConnection === index ? 1 : 0.3
                      }}
                      transition={{ duration: 0.8 }}
                    />
                    <defs>
                      <linearGradient id="gradient-supplier" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Supplier Node */}
                  <motion.div
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: activeConnection === index ? 1.2 : 1,
                      opacity: 1
                    }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className={`bg-white rounded-xl shadow-lg p-3 border-2 transition-all duration-300 ${
                      activeConnection === index ? 'border-blue-500 shadow-blue-500/50' : 'border-gray-200'
                    }`}>
                      <div className="text-2xl mb-1 text-center">{supplier.icon}</div>
                      <div className="text-xs font-semibold text-gray-700 whitespace-nowrap">{supplier.label}</div>
                    </div>
                    
                    {/* Pulse effect */}
                    {activeConnection === index && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-blue-500"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Customers Circle (Inner-Right) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {customers.map((customer, index) => {
              const angle = (customer.angle * Math.PI) / 180 - Math.PI / 2;
              const radius = 25; // percentage - closer to center
              const x = 70 + radius * Math.cos(angle); // Offset to the right
              const y = 50 + radius * Math.sin(angle);
              
              return (
                <React.Fragment key={index}>
                  {/* Connection Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="url(#gradient-customer)"
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1,
                        opacity: 0.5
                      }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    />
                    <defs>
                      <linearGradient id="gradient-customer" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Customer Node */}
                  <motion.div
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="bg-white rounded-lg shadow-md p-2 border-2 border-green-200">
                      <div className="text-xl mb-0.5 text-center">{customer.icon}</div>
                      <div className="text-[10px] font-semibold text-gray-600 whitespace-nowrap">{customer.label}</div>
                    </div>
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Central ORBIPARTS Hub */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative">
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-0 -m-8 rounded-full border-4 border-dashed border-blue-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Main Hub */}
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 border-4 border-white">
                <div className="text-center">
                  <motion.div
                    className="text-4xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🚀
                  </motion.div>
                  <div className="text-2xl font-bold text-white mb-1">ORBIPARTS</div>
                  <div className="text-xs text-blue-100 font-medium">Global Network Hub</div>
                  
                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-white">
                    <div className="bg-white/20 rounded-lg p-2 backdrop-blur">
                      <div className="text-lg font-bold">100+</div>
                      <div className="text-[8px] uppercase">Countries</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2 backdrop-blur">
                      <div className="text-lg font-bold">24/7</div>
                      <div className="text-[8px] uppercase">Support</div>
                    </div>
                  </div>
                </div>

                {/* Data flow indicators */}
                <motion.div
                  className="absolute -right-2 top-1/2 w-4 h-4 bg-green-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -left-2 top-1/2 w-4 h-4 bg-blue-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Labels */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm">
              Authorized Suppliers
              <div className="text-xs font-normal opacity-90">Global Network</div>
            </div>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12">
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm">
              Your Requests
              <div className="text-xs font-normal opacity-90">Worldwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-gray-700 font-semibold"
        >
          <div className="text-lg mb-1">Connecting Aviation Worldwide</div>
          <div className="text-sm text-gray-600">One Platform • Infinite Possibilities</div>
        </motion.div>
      </div>
    </div>
  );
};

export default NetworkVisualization;
