import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSpring, animated, useTrail, config } from 'react-spring';
import { 
  AircraftIcon, 
  EngineIcon, 
  HelicopterIcon, 
  CustomerIcon,
  LogisticsIcon,
  OEMIcon,
  MROIcon,
  GlobalIcon
} from '@/components/icons/AviationIcons';

const LogicalNetworkVisualization = () => {
  const [activeFlow, setActiveFlow] = useState(0);
  const svgRef = useRef(null);
  const hubRef = useRef(null);
  const leftIndicatorRef = useRef(null);
  const rightIndicatorRef = useRef(null);
  const requesterRefs = useRef([]);
  const supplierRefs = useRef([]);
  const [reqLines, setReqLines] = useState([]);
  const [supLines, setSupLines] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // YOUR REQUESTS (Left side - Customers/Requesters)
  const requesters = [
    { id: 'airlines', label: 'Airlines', Icon: AircraftIcon, color: '#3B82F6' },
    { id: 'operators', label: 'Operators', Icon: CustomerIcon, color: '#8B5CF6' },
    { id: 'mro', label: 'MRO Facilities', Icon: MROIcon, color: '#10B981' },
    { id: 'lessors', label: 'Lessors', Icon: GlobalIcon, color: '#F59E0B' }
  ];

  // GLOBAL SUPPLIERS (Right side - Providers)
  const suppliers = [
    { id: 'oem', label: 'OEM Distributors', Icon: OEMIcon, color: '#EF4444', desc: 'Authorized manufacturers' },
    { id: 'engine', label: 'Engine Traders', Icon: EngineIcon, color: '#8B5CF6', desc: 'CFM56, GE90, LEAP' },
    { id: 'components', label: 'Component Specialists', Icon: AircraftIcon, color: '#3B82F6', desc: 'Avionics, landing gear' },
    { id: 'heli', label: 'Rotorcraft Parts', Icon: HelicopterIcon, color: '#10B981', desc: 'Bell, Airbus, Sikorsky' },
    { id: 'logistics', label: 'Logistics Partners', Icon: LogisticsIcon, color: '#F59E0B', desc: 'Global delivery' },
    { id: 'global', label: 'Certified Vendors', Icon: GlobalIcon, color: '#EC4899', desc: '100+ countries' }
  ];

  // Animations
  const hubSpring = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: config.gentle,
    delay: 300
  });

  // Calculate line endpoints using absolute positioning strategy
  useLayoutEffect(() => {
    const computeLines = () => {
      const svgEl = svgRef.current;
      const leftIndicator = leftIndicatorRef.current;
      const rightIndicator = rightIndicatorRef.current;
      
      if (!svgEl || !leftIndicator || !rightIndicator) return;

      const svgRect = svgEl.getBoundingClientRect();
      const leftIndicatorRect = leftIndicator.getBoundingClientRect();
      const rightIndicatorRect = rightIndicator.getBoundingClientRect();

      // Convert pixel coordinates to SVG percentage (0-100)
      const toSvgX = (px) => ((px - svgRect.left) / svgRect.width) * 100;
      const toSvgY = (py) => ((py - svgRect.top) / svgRect.height) * 100;

      // Get exact center of the indicator circles
      const hubLeftIndicatorX = toSvgX(leftIndicatorRect.left + leftIndicatorRect.width / 2);
      const hubLeftIndicatorY = toSvgY(leftIndicatorRect.top + leftIndicatorRect.height / 2);
      
      const hubRightIndicatorX = toSvgX(rightIndicatorRect.left + rightIndicatorRect.width / 2);
      const hubRightIndicatorY = toSvgY(rightIndicatorRect.top + rightIndicatorRect.height / 2);

      // Requester lines: from right edge of each requester card to LEFT GREEN indicator CENTER
      const newReqLines = requesters.map((_, i) => {
        const el = requesterRefs.current[i];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cardCenterY = toSvgY(r.top + r.height / 2);
        const cardRightX = toSvgX(r.right);
        
        return {
          x1: cardRightX,
          y1: cardCenterY,
          x2: hubLeftIndicatorX,
          y2: hubLeftIndicatorY,
        };
      });

      // Supplier lines: from RIGHT PURPLE indicator CENTER to left edge of each supplier card
      const newSupLines = suppliers.map((_, i) => {
        const el = supplierRefs.current[i];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cardCenterY = toSvgY(r.top + r.height / 2);
        const cardLeftX = toSvgX(r.left);
        
        return {
          x1: hubRightIndicatorX,
          y1: hubRightIndicatorY,
          x2: cardLeftX,
          y2: cardCenterY,
        };
      });

      setReqLines(newReqLines);
      setSupLines(newSupLines);
    };

    computeLines();
    const handle = setTimeout(computeLines, 100);
    const handleResize = () => computeLines();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(handle);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const requesterTrail = useTrail(requesters.length, {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
    config: config.gentle,
    delay: 500
  });

  const supplierTrail = useTrail(suppliers.length, {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
    config: config.gentle,
    delay: 700
  });

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-slate-900/80" />

  <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {/* Gradient for request flow (green -> blue) */}
          <linearGradient id="requestGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
          </linearGradient>
          
          {/* Gradient for supply flow (blue -> purple) */}
          <linearGradient id="supplyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines from requesters to hub */}
        {requesters.map((requester, index) => {
          const line = reqLines[index];
          if (!line) return null;
          const isActive = activeFlow === 0;
          
          return (
            <g key={`req-line-${requester.id}`}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#requestGradient)"
                strokeWidth={isActive ? "0.5" : "0.3"}
                opacity={isActive ? "0.9" : "0.5"}
                filter={isActive ? "url(#glow)" : "none"}
                strokeLinecap="round"
                style={{ transition: 'all 0.5s ease' }}
              />
              
              {/* Animated particle on ALL requester lines when active */}
              {isActive && (
                <circle r="1" fill="#10B981" opacity="0.9" filter="url(#glow)">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
                    begin={`${index * 0.3}s`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Connection lines from hub to suppliers */}
        {suppliers.map((supplier, index) => {
          const line = supLines[index];
          if (!line) return null;
          const isActive = activeFlow === 2;
          
          return (
            <g key={`sup-line-${supplier.id}`}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#supplyGradient)"
                strokeWidth={isActive ? "0.5" : "0.3"}
                opacity={isActive ? "0.9" : "0.5"}
                filter={isActive ? "url(#glow)" : "none"}
                strokeLinecap="round"
                style={{ transition: 'all 0.5s ease' }}
              />
              
              {/* Animated particle on ALL supplier lines when active */}
              {isActive && (
                <circle r="1" fill="#8B5CF6" opacity="0.9" filter="url(#glow)">
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    path={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
                    begin={`${index * 0.25}s`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* LEFT SIDE - YOUR REQUESTS */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-4 z-10">
        {requesterTrail.map((style, index) => {
          const requester = requesters[index];
          const Icon = requester.Icon;
          const isActive = activeFlow === 0;

          return (
            <animated.div
              key={requester.id}
              style={style}
              className="group"
            >
              <div className={`relative transition-all duration-500 ${isActive ? 'scale-105' : ''}`}>
                {isActive && (
                  <div 
                    className="absolute inset-0 rounded-xl blur-xl opacity-40 animate-pulse"
                    style={{ backgroundColor: requester.color }}
                  />
                )}
                
                <div ref={(el) => (requesterRefs.current[index] = el)} className={`relative bg-white/10 backdrop-blur-md rounded-xl p-3 border transition-all duration-300 ${
                  isActive ? 'border-emerald-400/60 bg-white/20' : 'border-white/20'
                } hover:border-emerald-400/60 hover:bg-white/20`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform ${
                      isActive ? 'scale-110' : ''
                    }`} style={{ backgroundColor: `${requester.color}20` }}>
                      <Icon className="w-6 h-6" color={requester.color} />
                    </div>
                    <div className="text-xs font-semibold text-white whitespace-nowrap">
                      {requester.label}
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          );
        })}
      </div>

      {/* CENTER - ORBIPARTS HUB */}
      <animated.div
        style={{
          ...hubSpring,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: hubSpring.scale.to(s => `translate(-50%, -50%) scale(${s})`)
        }}
        className="z-20"
      >
        <div className="relative">
          {/* Outer pulse ring */}
          <div className="absolute inset-0 -m-16 rounded-full border-4 border-blue-400/20 animate-ping-slow" />
          
          {/* Rotating dashed ring */}
          <div className="absolute inset-0 -m-12 rounded-full border-2 border-dashed border-blue-400/30">
            <div className="w-full h-full rounded-full border-2 border-dashed border-purple-400/30 animate-spin-slow" />
          </div>

          {/* Main hub card */}
          <div ref={hubRef} className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-8 border-4 border-white/20 min-w-[220px]">
            {/* Inner glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-transparent to-purple-400/20 rounded-3xl" />
            
            <div className="relative text-center">
              {/* Logo container */}
              <div className="w-16 h-16 mx-auto mb-3 bg-white/95 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg p-2">
                <img 
                  src="https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756807193009.png" 
                  alt="ORBIPARTS Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Brand name */}
              <div className="mb-2">
                <div className="text-3xl font-black text-white tracking-tight mb-1">
                  ORBIPARTS
                </div>
                <div className="text-xs text-blue-100 font-semibold uppercase tracking-wider">
                  Global Network Hub
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                  <div className="text-lg font-bold text-white">+1000</div>
                  <div className="text-[8px] text-blue-100 uppercase tracking-wide">Suppliers</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                  <div className="text-lg font-bold text-white flex items-center justify-center gap-1">
                    <span>AI</span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                  <div className="text-[8px] text-blue-100 uppercase tracking-wide">Powered</div>
                </div>
              </div>

              {/* Status indicators removed per request */}
            </div>

            {/* Flow indicators */}
            <div ref={leftIndicatorRef} className={`absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              activeFlow === 0 ? 'bg-emerald-500 scale-110' : 'bg-emerald-500/50'
            }`}>
              <div className="w-4 h-4 bg-emerald-300 rounded-full animate-ping" />
            </div>
            <div ref={rightIndicatorRef} className={`absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              activeFlow === 2 ? 'bg-purple-500 scale-110' : 'bg-purple-500/50'
            }`}>
              <div className="w-4 h-4 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '500ms' }} />
            </div>
          </div>
        </div>
      </animated.div>

      {/* RIGHT SIDE - AUTHORIZED SUPPLIERS */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-3 z-10 max-w-[280px]">
        {supplierTrail.map((style, index) => {
          const supplier = suppliers[index];
          const Icon = supplier.Icon;
          const isActive = activeFlow === 2;

          return (
            <animated.div
              key={supplier.id}
              style={style}
              className="group"
            >
              <div className={`relative transition-all duration-500 ${isActive ? 'scale-105' : ''}`}>
                {isActive && (
                  <div 
                    className="absolute inset-0 rounded-xl blur-lg opacity-40 animate-pulse"
                    style={{ backgroundColor: supplier.color }}
                  />
                )}
                
                <div ref={(el) => (supplierRefs.current[index] = el)} className={`relative bg-white/10 backdrop-blur-md rounded-xl p-3 border transition-all duration-300 ${
                  isActive ? 'border-purple-400/60 bg-white/20' : 'border-white/20'
                } hover:border-purple-400/60 hover:bg-white/20 cursor-pointer`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform ${
                      isActive ? 'scale-110' : ''
                    }`} style={{ backgroundColor: `${supplier.color}20` }}>
                      <Icon className="w-6 h-6" color={supplier.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        {supplier.label}
                      </div>
                      <div className="text-[10px] text-blue-200 truncate opacity-70">
                        {supplier.desc}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          );
        })}
      </div>

      {/* TOP LABELS */}
      <div className="absolute top-8 left-8 z-10">
        <div className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-md text-white px-5 py-3 rounded-xl shadow-lg border border-white/20">
          <div className="font-bold text-sm">Your Requests</div>
          <div className="text-xs text-emerald-100">Airlines • Operators • MROs</div>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-10">
        <div className="bg-gradient-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-md text-white px-5 py-3 rounded-xl shadow-lg border border-white/20">
          <div className="font-bold text-sm">Authorized Suppliers</div>
          <div className="text-xs text-purple-100">Worldwide Certified Network</div>
        </div>
      </div>

      {/* BOTTOM DESCRIPTION */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-slate-900/70 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 shadow-xl">
          <div className="text-center">
            <div className="text-white font-bold text-base mb-1">
              One Platform • Infinite Connections
            </div>
            <div className="text-blue-200 text-sm">
              ORBIPARTS connects your requests with a global network of certified suppliers
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LogicalNetworkVisualization;
