import React, { useState, useEffect } from 'react';
import { useSpring, animated, useTrail, config } from 'react-spring';
import { 
  AircraftIcon, 
  EngineIcon, 
  HelicopterIcon, 
  SupplierIcon, 
  CustomerIcon,
  LogisticsIcon,
  OEMIcon,
  MROIcon,
  GlobalIcon,
  NetworkIcon
} from '@/components/icons/AviationIcons';

const ProfessionalNetworkVisualization = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredSupplier, setHoveredSupplier] = useState(null);

  // Suppliers data with professional structure
  const suppliers = [
    { 
      id: 'oem',
      label: 'OEM Distributors', 
      Icon: OEMIcon,
      color: '#3B82F6',
      description: 'Authorized manufacturers',
      angle: 0
    },
    { 
      id: 'engine',
      label: 'Engine Traders', 
      Icon: EngineIcon,
      color: '#8B5CF6',
      description: 'CFM56, GE90, LEAP',
      angle: 45
    },
    { 
      id: 'mro',
      label: 'MRO Network', 
      Icon: MROIcon,
      color: '#06B6D4',
      description: 'Maintenance providers',
      angle: 90
    },
    { 
      id: 'heli',
      label: 'Rotorcraft Parts', 
      Icon: HelicopterIcon,
      color: '#10B981',
      description: 'Bell, Airbus, Sikorsky',
      angle: 135
    },
    { 
      id: 'logistics',
      label: 'Logistics Partners', 
      Icon: LogisticsIcon,
      color: '#F59E0B',
      description: 'Global delivery',
      angle: 180
    },
    { 
      id: 'components',
      label: 'Component Specialists', 
      Icon: AircraftIcon,
      color: '#EF4444',
      description: 'Avionics, landing gear',
      angle: 225
    },
    { 
      id: 'global',
      label: 'Global Partners', 
      Icon: GlobalIcon,
      color: '#EC4899',
      description: '100+ countries',
      angle: 270
    },
    { 
      id: 'network',
      label: 'Verified Suppliers', 
      Icon: NetworkIcon,
      color: '#6366F1',
      description: 'Certified vendors',
      angle: 315
    }
  ];

  const customers = [
    { id: 'airlines', label: 'Airlines', Icon: AircraftIcon, color: '#3B82F6' },
    { id: 'mro-ops', label: 'MRO Facilities', Icon: MROIcon, color: '#8B5CF6' },
    { id: 'operators', label: 'Operators', Icon: CustomerIcon, color: '#10B981' },
    { id: 'lessors', label: 'Lessors', Icon: GlobalIcon, color: '#F59E0B' }
  ];

  // Animated central hub
  const hubSpring = useSpring({
    from: { scale: 0, rotate: -180, opacity: 0 },
    to: { scale: 1, rotate: 0, opacity: 1 },
    config: config.slow
  });

  // Animated pulse effect
  const pulseSpring = useSpring({
    from: { scale: 1, opacity: 0.5 },
    to: async (next) => {
      while (true) {
        await next({ scale: 1.3, opacity: 0 });
        await next({ scale: 1, opacity: 0.5 });
      }
    },
    config: { duration: 2000 }
  });

  // Trail animation for suppliers
  const supplierTrail = useTrail(suppliers.length, {
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    config: config.gentle,
    delay: 500
  });

  // Trail animation for customers
  const customerTrail = useTrail(customers.length, {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
    config: config.gentle,
    delay: 800
  });

  const getNodePosition = (angle, radius) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad)
    };
  };

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-300"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/50" />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines from suppliers to hub */}
        {suppliers.map((supplier, index) => {
          const pos = getNodePosition(supplier.angle, 38);
          const isActive = hoveredSupplier === supplier.id;
          
          return (
            <g key={`line-${supplier.id}`}>
              <line
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke="url(#lineGradient1)"
                strokeWidth={isActive ? "0.3" : "0.15"}
                strokeDasharray={isActive ? "0" : "1 2"}
                opacity={isActive ? "0.9" : "0.4"}
                filter={isActive ? "url(#glow)" : "none"}
                style={{ transition: 'all 0.3s ease' }}
              />
              {/* Animated particle */}
              {isActive && (
                <circle r="0.5" fill={supplier.color} opacity="0.8" filter="url(#glow)">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M ${pos.x} ${pos.y} L 50 50`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Connection lines from hub to customers */}
        {customers.map((customer, index) => {
          const angle = -90 + (index * 360) / customers.length;
          const pos = getNodePosition(angle, 22);
          
          return (
            <line
              key={`customer-line-${customer.id}`}
              x1="50"
              y1="50"
              x2={pos.x}
              y2={pos.y}
              stroke="url(#lineGradient2)"
              strokeWidth="0.2"
              strokeDasharray="0.5 1"
              opacity="0.6"
            />
          );
        })}
      </svg>

      {/* Supplier nodes */}
      <div className="absolute inset-0">
        {supplierTrail.map((style, index) => {
          const supplier = suppliers[index];
          const pos = getNodePosition(supplier.angle, 38);
          const Icon = supplier.Icon;
          const isHovered = hoveredSupplier === supplier.id;

          return (
            <animated.div
              key={supplier.id}
              style={{
                ...style,
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => setHoveredSupplier(supplier.id)}
              onMouseLeave={() => setHoveredSupplier(null)}
              className="group cursor-pointer"
            >
              <div className={`relative transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
                {/* Glow effect */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 rounded-2xl blur-xl opacity-60 animate-pulse"
                    style={{ backgroundColor: supplier.color }}
                  />
                )}
                
                {/* Node card */}
                <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-4 border transition-all duration-300 ${
                  isHovered 
                    ? 'border-white/40 shadow-2xl bg-white/20' 
                    : 'border-white/20 shadow-lg'
                }`}>
                  <Icon className="w-8 h-8 mb-2 mx-auto" color={supplier.color} />
                  <div className="text-center">
                    <div className="text-xs font-bold text-white whitespace-nowrap mb-0.5">
                      {supplier.label}
                    </div>
                    <div className={`text-[10px] text-blue-200 transition-all duration-300 ${
                      isHovered ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'
                    } overflow-hidden`}>
                      {supplier.description}
                    </div>
                  </div>
                </div>

                {/* Connection indicator */}
                {isHovered && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full animate-ping"
                       style={{ backgroundColor: supplier.color }} />
                )}
              </div>
            </animated.div>
          );
        })}
      </div>

      {/* Customer nodes */}
      <div className="absolute inset-0">
        {customerTrail.map((style, index) => {
          const customer = customers[index];
          const angle = -90 + (index * 360) / customers.length;
          const pos = getNodePosition(angle, 22);
          const Icon = customer.Icon;

          return (
            <animated.div
              key={customer.id}
              style={{
                ...style,
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-3 border border-emerald-400/30 shadow-lg hover:border-emerald-400/60 transition-all">
                  <Icon className="w-6 h-6 mx-auto mb-1" color="#10B981" />
                  <div className="text-[10px] font-semibold text-white text-center whitespace-nowrap">
                    {customer.label}
                  </div>
                </div>
              </div>
            </animated.div>
          );
        })}
      </div>

      {/* Central ORBIPARTS Hub */}
      <animated.div
        style={{
          ...hubSpring,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: hubSpring.scale.to(s => `translate(-50%, -50%) scale(${s}) rotate(${hubSpring.rotate}deg)`)
        }}
        className="z-20"
      >
        <div className="relative">
          {/* Outer pulse ring */}
          <animated.div
            style={pulseSpring}
            className="absolute inset-0 -m-12 rounded-full border-4 border-blue-400/50"
          />

          {/* Rotating ring */}
          <div className="absolute inset-0 -m-10 rounded-full border-2 border-dashed border-blue-400/40 animate-spin-slow" />

          {/* Main hub container */}
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-10 border-4 border-white/20">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-3xl" />
            
            <div className="relative text-center">
              {/* Logo placeholder */}
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <NetworkIcon className="w-10 h-10" color="white" />
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-black text-white tracking-tight">
                  ORBIPARTS
                </div>
                <div className="text-xs text-blue-100 font-semibold uppercase tracking-wider">
                  Global Network Hub
                </div>
              </div>

              {/* Stats grid */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-[9px] text-blue-100 uppercase tracking-wide">Countries</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-[9px] text-blue-100 uppercase tracking-wide">Support</div>
                </div>
              </div>

              {/* Status indicators */}
              <div className="mt-4 flex justify-center gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="font-medium">Active</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-500" />
                  <span className="font-medium">Connected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data flow indicators */}
          <div className="absolute -right-3 top-1/2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
          </div>
          <div className="absolute -left-3 top-1/2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-ping animation-delay-700" />
          </div>
        </div>
      </animated.div>

      {/* Labels */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <div className="bg-gradient-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20">
          <div className="font-bold text-base mb-1">Authorized Suppliers</div>
          <div className="text-xs text-purple-100">Worldwide Network</div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <div className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20">
          <div className="font-bold text-base mb-1">Your Requests</div>
          <div className="text-xs text-emerald-100">Instant Access</div>
        </div>
      </div>

      {/* Bottom description */}
      <div className="absolute bottom-10 left-0 right-0 text-center z-10">
        <div className="inline-block bg-slate-900/60 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10">
          <div className="text-white font-bold text-lg mb-1">
            Connecting Aviation Worldwide
          </div>
          <div className="text-blue-200 text-sm">
            One Platform • Infinite Possibilities • Real-Time Network
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default ProfessionalNetworkVisualization;
