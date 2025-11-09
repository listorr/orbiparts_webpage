import React from 'react';

// Professional SVG Icons for Aviation Industry
export const AircraftIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
          fill={color} stroke={color} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const EngineIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
    <path d="M12 4V8M12 16V20M20 12H16M8 12H4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.95 7.05L14.12 9.88M9.88 14.12L7.05 16.95M16.95 16.95L14.12 14.12M9.88 9.88L7.05 7.05" 
          stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const HelicopterIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 16C5 16 3 13 3 11C3 9 4 8 6 8H18C20 8 21 9 21 11C21 13 19 16 19 16" 
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V5M8 5H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 16H19V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V16Z" 
          stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M9 20V22M15 20V22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const NetworkIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="2" fill={color}/>
    <circle cx="5" cy="12" r="2" fill={color}/>
    <circle cx="19" cy="12" r="2" fill={color}/>
    <circle cx="8" cy="19" r="2" fill={color}/>
    <circle cx="16" cy="19" r="2" fill={color}/>
    <path d="M12 7V11M5 12L10 13M14 13L19 12M8 17L10 13M14 13L16 17" 
          stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.5" fill={color}/>
  </svg>
);

export const SupplierIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 4L21 9M3 9V15M3 9H21M21 9V15M21 15L12 20L3 15M21 15H3" 
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 9V15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const CustomerIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" 
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const LogisticsIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8H15V17H1V8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M15 11H19L21 13V17H15V11Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="5.5" cy="19.5" r="2.5" stroke={color} strokeWidth="1.5"/>
    <circle cx="18.5" cy="19.5" r="2.5" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const OEMIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3H15L21 9V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9Z" 
          stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 3V9H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 13H15M9 17H12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const MROIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9L13.1 3.3C12.7 2.9 12.1 2.9 11.7 3.3L10.5 4.5L13.5 7.5L14.7 6.3Z" 
          stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M3 17.25V21H6.75L17.81 9.94L13.81 5.94L3 17.25Z" 
          stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
  </svg>
);

export const GlobalIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
    <path d="M2 12H22M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22M12 2C9.5 4.5 8 8 8 12C8 16 9.5 19.5 12 22" 
          stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SpeedIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" 
          stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 6V12L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 12L8 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ShieldCheckIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" 
          stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ConnectionIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" 
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11C13.5705 10.4259 13.0226 9.9508 12.3934 9.60704C11.7642 9.26328 11.0685 9.05886 10.3533 9.00765C9.63819 8.95643 8.92037 9.05963 8.24861 9.31018C7.57685 9.56073 6.96689 9.9529 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.542 3.52086 20.4691C4.44791 21.3961 5.70197 21.9219 7.01295 21.9333C8.32393 21.9447 9.58694 21.4408 10.53 20.53L12.24 18.82" 
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
