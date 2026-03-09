import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Filter, Package, ShoppingCart, AlertCircle, CheckCircle2, Calendar, ChevronDown, Search, X, Droplet, Zap, Shield, TrendingUp, Star, Clock, Box } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

const LubricantMarketplace = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    inStock: false,
    partType: [],
    unitOfMeasure: [],
    classifications: []
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Eastman Products Data with professional images
  const products = [
    {
      id: 1,
      name: "TURBINE OIL (MIL-PRF-23699 HTS)",
      shortName: "MIL-PRF-23699 HTS",
      manufacturer: "EASTMAN",
      nsn: "9150-01-439-2070",
      partType: "TURBINE ENGINE OIL",
      units: "DRUM",
      price: 5871.60,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "High-temperature synthetic turbine oil meeting military specifications",
      featured: true,
      rating: 4.8
    },
    {
      id: 2,
      name: "TURBINE OIL (MIL-PRF-23699 HTS)",
      shortName: "MIL-PRF-23699 HTS",
      manufacturer: "EASTMAN",
      nsn: "9150-01-439-0756",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: 28.72,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Premium turbine oil for aircraft engines, quart packaging",
      rating: 4.8
    },
    {
      id: 3,
      name: "TURBINE OIL (MIL-PRF-23699G-STD)",
      shortName: "MIL-PRF-23699G",
      manufacturer: "EASTMAN",
      nsn: "9150-01-476-1083",
      partType: "TURBINE ENGINE OIL",
      units: "DRUM",
      price: 6195.44,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Standard grade synthetic turbine oil for gas turbine engines",
      rating: 4.7
    },
    {
      id: 4,
      name: "TURBINE OIL (MIL-PRF-23699G-STD)",
      shortName: "MIL-PRF-23699G",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "TURBINE ENGINE OIL",
      units: "PAIL",
      price: 569.93,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Convenient pail packaging for maintenance operations",
      rating: 4.7
    },
    {
      id: 5,
      name: "TURBINE OIL (MIL-PRF-23699G-STD)",
      shortName: "MIL-PRF-23699G",
      manufacturer: "EASTMAN",
      nsn: "9150-01-476-1074",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: 29.09,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Quart bottle for precision application and testing",
      rating: 4.7
    },
    {
      id: 6,
      name: "LUBRICATING OIL (MIL-PRF-7808L GR 3)",
      shortName: "MIL-PRF-7808L",
      manufacturer: "EASTMAN",
      nsn: "9150-00-782-2679",
      partType: "TURBINE ENGINE OIL",
      units: "DRUM",
      price: 6396.03,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Grade 3 lubricating oil for aircraft turbine engines",
      rating: 4.6
    },
    {
      id: 7,
      name: "LUBRICATING OIL (MIL-PRF-7808L GR 3)",
      shortName: "MIL-PRF-7808L",
      manufacturer: "EASTMAN",
      nsn: "9150-00-782-2627",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: 30.38,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Premium aircraft engine lubricant, quart size",
      rating: 4.6
    },
    {
      id: 8,
      name: "TURBINE OIL",
      shortName: "Standard Turbine Oil",
      manufacturer: "EASTMAN",
      nsn: "9150-01-209-2684",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: 33.05,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 30,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "General purpose turbine oil for aviation applications",
      rating: 4.5
    },
    {
      id: 9,
      name: "SKYDROL HYD FLUID (10138724)",
      shortName: "Skydrol 500B-4",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "HYDRAULIC FLUID",
      units: "DRUM",
      price: 9881.19,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 19,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Fire-resistant hydraulic fluid for commercial aircraft",
      featured: true,
      rating: 4.9
    },
    {
      id: 10,
      name: "SKYDROL HYD. FLUID (10138707)",
      shortName: "Skydrol 500B-4",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "HYDRAULIC FLUID",
      units: "PAIL",
      price: 941.73,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Premium fire-resistant hydraulic fluid, pail packaging",
      rating: 4.9
    },
    {
      id: 11,
      name: "SKYDROL HYD FLUID (10138721)",
      shortName: "Skydrol 500B-4",
      manufacturer: "EASTMAN",
      nsn: "9150-00-857-9069",
      partType: "HYDRAULIC FLUID",
      units: "Gallon",
      price: 203.33,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Gallon container for hydraulic system maintenance",
      rating: 4.9
    },
    {
      id: 12,
      name: "SKYDROL HYD FLUID (10138846)",
      shortName: "Skydrol 500B-4",
      manufacturer: "EASTMAN",
      nsn: "9150-01-056-4883",
      partType: "HYDRAULIC FLUID",
      units: "Quart",
      price: 53.24,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Convenient quart size for small jobs and testing",
      rating: 4.9
    },
    {
      id: 13,
      name: "SKYDROL SAMPLING BOTTLE",
      shortName: "Sampling Bottle",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "HYDRAULIC FLUID",
      units: "Bottle",
      price: 8.22,
      inStock: true,
      limitedShelfLife: false,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80",
      description: "Specialized bottle for hydraulic fluid sampling and testing",
      rating: 4.5
    },
    {
      id: 14,
      name: "EASTMAN 2380 DECAL (2.75\" X 4\")",
      shortName: "Decal Large",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "EXPENDABLES",
      units: "Each",
      price: null,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80",
      description: "Product identification decal, large format",
      rating: 4.0
    },
    {
      id: 15,
      name: "EASTMAN 2380 DECAL (1.25\" WIDE X 2\" LONG)",
      shortName: "Decal Small",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "EXPENDABLES",
      units: "Each",
      price: null,
      inStock: false,
      limitedShelfLife: false,
      leadTime: 30,
      image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80",
      description: "Product identification decal, small format",
      rating: 4.0
    },
    {
      id: 16,
      name: "SKYDROL HYD. FLUID (10138730)",
      shortName: "Skydrol LD-4",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "HYDRAULIC FLUID",
      units: "DRUM",
      price: 9109.72,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Low density fire-resistant hydraulic fluid for aerospace",
      featured: true,
      rating: 4.8
    },
    {
      id: 17,
      name: "SKYDROL HYD FLUID (10138733)",
      shortName: "Skydrol LD-4",
      manufacturer: "EASTMAN",
      nsn: "9150-01-641-1075",
      partType: "HYDRAULIC FLUID",
      units: "PAIL",
      price: 860.05,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "LD-4 formulation in convenient pail packaging",
      rating: 4.8
    },
    {
      id: 18,
      name: "SKYDROL HYD. FLUID (10138727)",
      shortName: "Skydrol LD-4",
      manufacturer: "EASTMAN",
      nsn: "9150-01-096-6497",
      partType: "HYDRAULIC FLUID",
      units: "Gallon",
      price: 186.80,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Low density hydraulic fluid, gallon container",
      rating: 4.8
    },
    {
      id: 19,
      name: "SKYDROL HYD. FLUID (10138849)",
      shortName: "Skydrol LD-4",
      manufacturer: "EASTMAN",
      nsn: "9150-01-056-4883",
      partType: "HYDRAULIC FLUID",
      units: "Quart",
      price: 49.07,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Quart bottle for precision servicing and testing",
      rating: 4.8
    },
    {
      id: 20,
      name: "ASSEMBLY FLUID",
      shortName: "Assembly Lubricant",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "SPECIALTY",
      units: "TUBE",
      price: 113.61,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1625806786037-2af608423424?w=800&q=80",
      description: "Specialized assembly lubricant for aircraft components",
      rating: 4.6
    },
    {
      id: 21,
      name: "HYDRAULIC FLUID",
      shortName: "Standard Hydraulic",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "HYDRAULIC FLUID",
      units: "Quart",
      price: 304.48,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "General purpose hydraulic fluid for aviation systems",
      rating: 4.5
    },
    {
      id: 22,
      name: "HYDRAULIC FLUID",
      shortName: "Environmental Grade",
      manufacturer: "EASTMAN",
      nsn: "",
      psn: "ENVIRONEMNTALLY HAZARDOUS SUBSTANCE",
      unNumber: "UN3082",
      class: "9",
      partType: "HYDRAULIC FLUID",
      units: "DRUM",
      price: 8989.06,
      inStock: false,
      limitedShelfLife: true,
      hazardous: true,
      leadTime: 25,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Environmentally classified hydraulic fluid, bulk drum",
      rating: 4.4
    },
    {
      id: 23,
      name: "HYDRAULIC FLUID (10376576)",
      shortName: "Bio-Degradable",
      manufacturer: "EASTMAN",
      nsn: "",
      psn: "ENVIRONMENTALLY HAZARDOUS SUBSTANCE",
      unNumber: "UN3082",
      class: "9",
      partType: "HYDRAULIC FLUID",
      units: "PAIL",
      price: 860.05,
      inStock: false,
      limitedShelfLife: true,
      hazardous: true,
      leadTime: 9,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Environmentally friendly hydraulic fluid formulation",
      rating: 4.4
    },
    {
      id: 24,
      name: "HYDRAULIC FLUID (10336384)",
      shortName: "Premium Grade",
      manufacturer: "EASTMAN",
      nsn: "9150-01-654-6741",
      psn: "ENVIRONEMNTALLY HAZARDOUS SUBSTANCE",
      unNumber: "UN3082",
      class: "9",
      partType: "HYDRAULIC FLUID",
      units: "CAN",
      price: 186.80,
      inStock: true,
      limitedShelfLife: true,
      hazardous: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Premium hydraulic fluid in can packaging",
      rating: 4.5
    },
    {
      id: 25,
      name: "HYDRAULIC FLUID (10325240)",
      shortName: "Liquid Grade 9",
      manufacturer: "EASTMAN",
      nsn: "9150016547558",
      psn: "ENVIRONMENTALLY HAZARDOUS SUBSTANCE, LIQ",
      unNumber: "3082",
      class: "9",
      partType: "HYDRAULIC FLUID",
      units: "Quart",
      price: 49.07,
      inStock: true,
      limitedShelfLife: true,
      hazardous: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Class 9 liquid hydraulic fluid, quart size",
      rating: 4.5
    },
    {
      id: 26,
      name: "SYNTHETIC LUBRICANT",
      shortName: "Synthetic Multi-Purpose",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "NON-AVIATION",
      units: "Gallon",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 120,
      image: "https://images.unsplash.com/photo-1625806786037-2af608423424?w=800&q=80",
      description: "High-performance synthetic lubricant for various applications",
      rating: 4.3
    },
    {
      id: 27,
      name: "SKYKLEEN AVIATION SOLVENT (10138670)",
      shortName: "Skykleen Solvent",
      manufacturer: "EASTMAN",
      nsn: "6850-01-442-0527",
      partType: "SPECIALTY",
      units: "Bottle",
      price: 25.83,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      description: "Specialized aviation cleaning solvent, bottle format",
      rating: 4.7
    },
    {
      id: 28,
      name: "SKYKLEEN 1000 (10138691)",
      shortName: "Skykleen 1000",
      manufacturer: "EASTMAN",
      nsn: "6850-01-442-0769",
      partType: "SPECIALTY",
      units: "PAIL",
      price: 412.86,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 20,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      description: "Industrial strength aviation cleaning solution, pail size",
      rating: 4.7
    },
    {
      id: 29,
      name: "AVIATION SOLVENT",
      shortName: "Multi-Purpose Solvent",
      manufacturer: "EASTMAN",
      nsn: "6850-01-456-7458",
      partType: "SPECIALTY",
      units: "CAN",
      price: 122.17,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      description: "Versatile aviation solvent for maintenance operations",
      rating: 4.6
    },
    {
      id: 30,
      name: "HYDRAULIC FLUID (10138698)",
      shortName: "Eco-Hydraulic",
      manufacturer: "EASTMAN",
      nsn: "",
      psn: "ENVIRONMENTALLY HAZARDOUS SUBSTANCE",
      unNumber: "3082",
      class: "9",
      partType: "HYDRAULIC FLUID",
      units: "PAIL",
      price: 973.81,
      inStock: true,
      limitedShelfLife: true,
      hazardous: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Eco-friendly hydraulic fluid with reduced environmental impact",
      rating: 4.6
    },
    {
      id: 31,
      name: "HYDRAULIC FLUID (10138692)",
      shortName: "Standard Hydraulic",
      manufacturer: "EASTMAN",
      nsn: "",
      partType: "HYDRAULIC FLUID",
      units: "CAN",
      price: 209.55,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Reliable hydraulic fluid in convenient can packaging",
      rating: 4.5
    },
    {
      id: 32,
      name: "HYDRAULIC FLUID",
      shortName: "MIL-SPEC Hydraulic",
      manufacturer: "EASTMAN",
      nsn: "9150-01-473-2172",
      partType: "HYDRAULIC FLUID",
      units: "Quart",
      price: 54.75,
      inStock: true,
      limitedShelfLife: true,
      hazardous: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Military specification hydraulic fluid, quart bottle",
      rating: 4.7
    },
    // AeroShell Products
    {
      id: 33,
      name: "ENGINE OIL (SAE J-1966 GRADE 50)(550041131)",
      shortName: "AeroShell W100",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-235-9059",
      partType: "PISTON ENGINE OIL",
      units: "DRUM",
      price: 1542.83,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "SAE J-1966 Grade 50 mineral piston engine oil for general aviation",
      rating: 4.7
    },
    {
      id: 34,
      name: "MINERAL OIL SAE J-1966 GRADE 50 (550069886)",
      shortName: "AeroShell W100",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-007-9134",
      partType: "PISTON ENGINE OIL",
      units: "Quart",
      price: 7.58,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Premium mineral oil for piston aircraft engines, quart size",
      rating: 4.7,
      featured: true
    },
    {
      id: 35,
      name: "ENGINE OIL (SAE J-1966 GRADE 60)(550041188)",
      shortName: "AeroShell W120",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "DRUM",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "SAE J-1966 Grade 60 aviation piston engine oil, bulk drum",
      rating: 4.6
    },
    {
      id: 36,
      name: "HELICOPTER GREASE MIL-G-25537 550043625",
      shortName: "AeroShell Grease 7",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-721-8581",
      partType: "GREASES",
      units: "PAIL",
      price: 475.07,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Wide temperature range grease for helicopter bearings and mechanisms",
      rating: 4.8,
      featured: true
    },
    {
      id: 37,
      name: "HELICOPTER GREASE (MIL-G-25537) 550043631",
      shortName: "AeroShell Grease 7",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-721-8570",
      partType: "GREASES",
      units: "CAN",
      price: 89.67,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Helicopter grease in convenient can packaging",
      rating: 4.8
    },
    {
      id: 38,
      name: "GREASE MIL-G-25537 550063163",
      shortName: "AeroShell Grease 7",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "GREASES",
      units: "CARTRIDGE",
      price: 12.74,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Grease cartridge for precision application",
      rating: 4.8
    },
    {
      id: 39,
      name: "MULTI GRADE OIL (550050888)",
      shortName: "AeroShell W15W-50",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "DRUM",
      price: 1827.19,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Multi-grade piston engine oil for all-season operation",
      rating: 4.9,
      featured: true
    },
    {
      id: 40,
      name: "PISTON OIL 550050835",
      shortName: "AeroShell W15W-50",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "Quart",
      price: 9.11,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Multi-grade piston oil, quart bottle for easy handling",
      rating: 4.9
    },
    {
      id: 41,
      name: "GREASE (MIL-PRF-81322G) (550043616)",
      shortName: "AeroShell Grease 33",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-935-5851",
      partType: "GREASES",
      units: "PAIL",
      price: 724.18,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 1,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Advanced general purpose grease for aircraft applications",
      rating: 4.7
    },
    {
      id: 42,
      name: "ADVANCED GENERAL PURPOSE GREASE (MIL-PRF-81322G)",
      shortName: "AeroShell Grease 33",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "GREASES",
      units: "DRUM",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 30,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "General purpose grease meeting MIL-PRF-81322G specifications",
      rating: 4.7
    },
    {
      id: 43,
      name: "MIL-PRF-81322G GREASE 550043633",
      shortName: "AeroShell Grease 33",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-117-2928",
      partType: "GREASES",
      units: "CAN",
      price: 137.28,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "MIL-PRF-81322G compliant grease in can format",
      rating: 4.7
    },
    {
      id: 44,
      name: "ADVANCED GENERAL PURPOSE GREASE (MIL-PRF-81322G)",
      shortName: "AeroShell Grease 33",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-181-7724",
      partType: "GREASES",
      units: "TUBE",
      price: 17.63,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Tube applicator for precise grease application",
      rating: 4.7
    },
    {
      id: 45,
      name: "GREASE BMS 3-33 MIL-PRF-23827C",
      shortName: "AeroShell Grease 5",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "GREASES",
      units: "KILOGRAM",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 30,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Advanced airframe grease meeting BMS 3-33 specifications",
      rating: 4.6
    },
    {
      id: 46,
      name: "GREASE BMS 3-33 & MIL-PRF-23827C 550043623",
      shortName: "AeroShell Grease 5",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "GREASES",
      units: "PAIL",
      price: 802.27,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Premium airframe grease for extreme conditions",
      rating: 4.6
    },
    {
      id: 47,
      name: "GREASE (BMS 3-33 & MIL-PRF-23827C) (550043635)",
      shortName: "AeroShell Grease 5",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-491-8032",
      partType: "GREASES",
      units: "CAN",
      price: 151.02,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Advanced grease can for airframe applications",
      rating: 4.6
    },
    {
      id: 48,
      name: "GREASE 0.4KG 550072764",
      shortName: "AeroShell Grease 5",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-505-4294",
      partType: "GREASES",
      units: "CARTRIDGE",
      price: 21.47,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Cartridge format for grease gun application",
      rating: 4.6
    },
    {
      id: 49,
      name: "HIGH TEMP. GREASE (MIL-G-3545C)(550043617)",
      shortName: "AeroShell Grease 6",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "GREASES",
      units: "PAIL",
      price: 579.51,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "High temperature grease for wheel bearings and hot applications",
      rating: 4.5
    },
    {
      id: 50,
      name: "HIGH TEMP. GREASE (MIL-G-3545C)(550043619)",
      shortName: "AeroShell Grease 6",
      manufacturer: "AEROSHELL",
      nsn: "9150-99-756-1746",
      partType: "GREASES",
      units: "CAN",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 20,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Heat-resistant grease for high-temperature applications",
      rating: 4.5
    },
    {
      id: 51,
      name: "GENERAL PURPOSE & WHEEL BEARING GREASE 550063164",
      shortName: "AeroShell Grease 6",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "GREASES",
      units: "Each",
      price: 18.56,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Versatile grease for wheel bearings and general use",
      rating: 4.5
    },
    {
      id: 52,
      name: "HIGH TEMP. GREASE (MIL-G-3545) 550043641",
      shortName: "AeroShell Grease 6",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "GREASES",
      units: "TUBE",
      price: 16.12,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Tube format for precise application in tight spaces",
      rating: 4.5
    },
    {
      id: 53,
      name: "AIRFRAME GREASE (MIL-PRF-24139B)(550043621)",
      shortName: "AeroShell Grease 17",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-180-6383",
      partType: "GREASES",
      units: "PAIL",
      price: null,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Specialized airframe grease for aircraft structures",
      rating: 4.4
    },
    {
      id: 54,
      name: "EXTREME PRESSURE GREASE MIL-G-21164D (550043636)",
      shortName: "AeroShell Grease 14",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PAINTS",
      units: "PAIL",
      price: 972.16,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Extreme pressure grease for heavy-duty applications",
      rating: 4.6
    },
    {
      id: 55,
      name: "EXTREME PRESSURE GREASE MIL-G-21164D (550043632)",
      shortName: "AeroShell Grease 14",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-223-4004",
      partType: "GREASES",
      units: "CAN",
      price: 188.30,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "EP grease for high-load bearing applications",
      rating: 4.6
    },
    {
      id: 56,
      name: "EXTREME PRESSURE GREASE MIL-G-21164D 550072760",
      shortName: "AeroShell Grease 14",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "GREASES",
      units: "TUBE",
      price: 25.56,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Tube applicator for extreme pressure grease",
      rating: 4.6
    },
    {
      id: 57,
      name: "MINERAL OIL (J-1966 SAE GRADE 30) 550041159",
      shortName: "AeroShell W80",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-007-9134",
      partType: "PISTON ENGINE OIL",
      units: "Quart",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 30,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "SAE Grade 30 mineral oil for piston engines",
      rating: 4.5
    },
    {
      id: 58,
      name: "AIRFRAME GREASE (MIL-PRF-24139B)(550043630)",
      shortName: "AeroShell Grease 17",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-180-6382",
      partType: "GREASES",
      units: "CAN",
      price: 83.37,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Airframe grease in can packaging",
      rating: 4.4
    },
    {
      id: 59,
      name: "AIRFRAME GREASE MIL-PRF-24139B 550067090",
      shortName: "AeroShell Grease 17",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-491-0907",
      partType: "GREASES",
      units: "TUBE",
      price: 12.58,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Tube format for easy application on airframes",
      rating: 4.4
    },
    {
      id: 60,
      name: "GREASE (MIL-PRF-23827C)(550043646)",
      shortName: "AeroShell Grease 22",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-985-7248",
      partType: "GREASES",
      units: "PAIL",
      price: 966.73,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Advanced synthetic grease for wide temperature range",
      rating: 4.7
    },
    {
      id: 61,
      name: "ADVANCED AIRFRAME GREASE MIL-PRF-23827 550067480",
      shortName: "AeroShell Grease 22",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "GREASES",
      units: "CAN",
      price: 179.28,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Synthetic grease for modern aircraft systems",
      rating: 4.7
    },
    {
      id: 62,
      name: "ADVANCED AIRFRAME GREASE MIL-PRF-23827C 550066860",
      shortName: "AeroShell Grease 22",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-527-1093",
      partType: "GREASES",
      units: "CARTRIDGE",
      price: 24.95,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Cartridge applicator for synthetic grease",
      rating: 4.7
    },
    {
      id: 63,
      name: "MIL-PRF-7808L TURBINE OIL ( 550050174 )",
      shortName: "AeroShell Turbine 390",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: 28.98,
      inStock: true,
      limitedShelfLife: true,
      hazardous: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Type II turbine oil for gas turbine engines",
      rating: 4.8,
      featured: true
    },
    {
      id: 64,
      name: "GREASE (MIL-G-21164D)(550011309)",
      shortName: "AeroShell Grease 14",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-965-2003",
      partType: "GREASES",
      units: "PAIL",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 21,
      image: "https://images.unsplash.com/photo-1635236066451-2f68e1f0b24c?w=800&q=80",
      description: "Extreme pressure grease for demanding applications",
      rating: 4.6
    },
    {
      id: 65,
      name: "TURBINE OIL (MIL-PRF-23699G) (550042548)",
      shortName: "AeroShell Turbine 560",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-476-1083",
      partType: "TURBINE ENGINE OIL",
      units: "DRUM",
      price: 3455.18,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Synthetic gas turbine oil meeting MIL-PRF-23699G",
      rating: 4.9,
      featured: true
    },
    {
      id: 66,
      name: "TURBINE OIL MIL-PRF-23699G STD 550063909",
      shortName: "AeroShell Turbine 560",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-985-7099",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: 16.45,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Standard grade synthetic turbine oil, quart size",
      rating: 4.9
    },
    {
      id: 67,
      name: "TURBINE OIL (DOD-PRF-85734)(550050220)",
      shortName: "AeroShell Turbine 555",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-209-2684",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: 18.33,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "High stability turbine oil for modern engines",
      rating: 4.8
    },
    {
      id: 68,
      name: "TURBINE OIL MIL-PRF-23699G CLASS HTS 550050223",
      shortName: "AeroShell Turbine 500",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-439-0756",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: 17.11,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "High temperature stability turbine oil",
      rating: 4.8
    },
    {
      id: 69,
      name: "TURBINE OIL (550049744)",
      shortName: "AeroShell Turbine 500",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-152-7060",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: 29.67,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Premium turbine oil for commercial aviation",
      rating: 4.8
    },
    {
      id: 70,
      name: "DE-ICING FLUID (550066756)",
      shortName: "AeroShell Fluid 41",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "TURBINE ENGINE OIL",
      units: "Each",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      hazardous: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
      description: "Anti-icing and de-icing fluid for aircraft systems",
      rating: 4.5
    },
    {
      id: 71,
      name: "DIESEL OIL (550041177)",
      shortName: "AeroShell Diesel",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "Liter",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Diesel engine oil for ground support equipment",
      rating: 4.3
    },
    {
      id: 72,
      name: "CORROSION PREVENTATIVE CONCENTRATE (MIL-C-6529)",
      shortName: "AeroShell Compound 06",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "SPECIALTY",
      units: "PAIL",
      price: 550.58,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      description: "Corrosion prevention compound for aircraft preservation",
      rating: 4.6
    },
    {
      id: 73,
      name: "HYDRAULIC FLUID (MIL-PRF-83282D) 550043629",
      shortName: "AeroShell Fluid 41",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-149-7432",
      partType: "HYDRAULIC FLUID",
      units: "Gallon",
      price: 82.95,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Fire-resistant hydraulic fluid for aircraft systems",
      rating: 4.7
    },
    {
      id: 74,
      name: "HYDRAULIC OIL (MIL-PRF-5606)(550072526)",
      shortName: "AeroShell Fluid 4",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "HYDRAULIC FLUID",
      units: "DRUM",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 14,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Mineral-based hydraulic fluid for aircraft systems",
      rating: 4.6
    },
    {
      id: 75,
      name: "HYDRAULIC OIL (MIL-PRF-5606) 550043667",
      shortName: "AeroShell Fluid 4",
      manufacturer: "AEROSHELL",
      nsn: "9150-01-515-7826",
      partType: "HYDRAULIC FLUID",
      units: "Gallon",
      price: 36.64,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "MIL-PRF-5606 hydraulic fluid, gallon container",
      rating: 4.6
    },
    {
      id: 76,
      name: "HYDRAULIC OIL (MIL-PRF-5606) 550043663",
      shortName: "AeroShell Fluid 4",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "HYDRAULIC FLUID",
      units: "Quart",
      price: 10.61,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1582558449440-5cea787b9fbe?w=800&q=80",
      description: "Quart bottle for small hydraulic servicing",
      rating: 4.6
    },
    {
      id: 77,
      name: "TURBINE OIL (550049742)",
      shortName: "AeroShell Turbine 500",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "TURBINE ENGINE OIL",
      units: "Quart",
      price: null,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Synthetic turbine oil for jet engines",
      rating: 4.7
    },
    {
      id: 78,
      name: "PISTON ENGINE OIL 550069042",
      shortName: "AeroShell Oil Sport+4",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "Liter",
      price: 12.70,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Semi-synthetic piston engine oil with dispersant",
      rating: 4.8
    },
    {
      id: 79,
      name: "PISTON ENGINE OIL (SAE J-1899 GRADE 50) 550041163",
      shortName: "AeroShell W80 Plus",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-753-4937",
      partType: "PISTON ENGINE OIL",
      units: "DRUM",
      price: 1697.72,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Ashless dispersant piston oil, Grade 50",
      rating: 4.7
    },
    {
      id: 80,
      name: "ENGINE OIL SAE-J-1899 GRADE 50 (550045829)",
      shortName: "AeroShell W80 Plus",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "Each",
      price: 55.22,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Premium ashless dispersant oil for aviation",
      rating: 4.7
    },
    {
      id: 81,
      name: "ENGINE OIL SAE J-1899 GRADE 50 550050970",
      shortName: "AeroShell W80 Plus",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "DRUM",
      price: 1851.39,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 8,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Bulk drum of Grade 50 ashless dispersant oil",
      rating: 4.7
    },
    {
      id: 82,
      name: "ENGINE OIL SAE J-1899 GRADE 50 550050837",
      shortName: "AeroShell W80 Plus",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "Quart",
      price: 11.53,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Quart bottle of premium piston engine oil",
      rating: 4.7
    },
    {
      id: 83,
      name: "PISTON ENGINE OIL (SAE J-1899 GRADE 50) 550050832",
      shortName: "AeroShell W100 Plus",
      manufacturer: "AEROSHELL",
      nsn: "9150-00-019-5701",
      partType: "PISTON ENGINE OIL",
      units: "Quart",
      price: 8.65,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Ashless dispersant oil with anti-wear additives",
      rating: 4.7
    },
    {
      id: 84,
      name: "ENGINE OIL SAE J-1899 GRADE 60 550041182",
      shortName: "AeroShell W120 Plus",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "DRUM",
      price: 2194.79,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Grade 60 ashless dispersant oil for hot climates",
      rating: 4.6
    },
    {
      id: 85,
      name: "ENGINE OIL (SAE J-1899 GRADE 60) 550045828",
      shortName: "AeroShell W120 Plus",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "CAN",
      price: 56.63,
      inStock: false,
      limitedShelfLife: true,
      leadTime: 15,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Can packaging for Grade 60 piston oil",
      rating: 4.6
    },
    {
      id: 86,
      name: "ENGINE PISTON OIL (SAE J-1899 GRADE 60) 550050833",
      shortName: "AeroShell W120 Plus",
      manufacturer: "AEROSHELL",
      nsn: "",
      partType: "PISTON ENGINE OIL",
      units: "Each",
      price: 8.79,
      inStock: true,
      limitedShelfLife: true,
      leadTime: null,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
      description: "Individual container of Grade 60 aviation oil",
      rating: 4.6
    }
  ];

  // Get filter counts
  const filterCounts = useMemo(() => {
    const counts = {
      inStock: products.filter(p => p.inStock).length,
      partType: {},
      unitOfMeasure: {},
      classifications: {
        limitedShelfLife: products.filter(p => p.limitedShelfLife).length,
        hazardous: products.filter(p => p.hazardous).length
      }
    };

    products.forEach(p => {
      counts.partType[p.partType] = (counts.partType[p.partType] || 0) + 1;
      counts.unitOfMeasure[p.units] = (counts.unitOfMeasure[p.units] || 0) + 1;
    });

    return counts;
  }, []);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.shortName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Other filters
      if (selectedFilters.inStock && !product.inStock) return false;
      if (selectedFilters.partType.length > 0 && !selectedFilters.partType.includes(product.partType)) return false;
      if (selectedFilters.unitOfMeasure.length > 0 && !selectedFilters.unitOfMeasure.includes(product.units)) return false;
      if (selectedFilters.classifications.includes('limitedShelfLife') && !product.limitedShelfLife) return false;
      if (selectedFilters.classifications.includes('hazardous') && !product.hazardous) return false;
      return true;
    });
  }, [selectedFilters, searchTerm]);

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: category === 'inStock' ? !prev.inStock : 
        prev[category].includes(value) 
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      inStock: false,
      partType: [],
      unitOfMeasure: [],
      classifications: []
    });
    setSearchTerm('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedFilters.inStock) count++;
    count += selectedFilters.partType.length;
    count += selectedFilters.unitOfMeasure.length;
    count += selectedFilters.classifications.length;
    return count;
  };

  return (
    <>
      <SEO
        title="Aviation Lubricants & Fluids Marketplace | ORBIPARTS"
        description="Premium aviation lubricants, hydraulic fluids, and specialty products from Eastman. Turbine oils, Skydrol hydraulic fluids, and aviation solvents in stock."
        canonical="https://www.orbiparts.com/lubricants"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.orbiparts.com/' },
          { name: 'Lubricants Marketplace', url: 'https://www.orbiparts.com/lubricants' }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Floating Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Droplet className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">Aviation Lubricants & Fluids</h1>
              </div>
              <p className="text-xl text-red-100 mb-6 max-w-3xl">
                Premium aviation lubricants and fluids for maintenance and operations. Certified, reliable, and ready to ship.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">{products.length} Products</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">{filterCounts.inStock} In Stock</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Certified Quality</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Fast Shipping</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filter Bar */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Box */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products by name, NSN, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors relative"
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">Filters</span>
                  {getActiveFilterCount() > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {getActiveFilterCount()}
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-6 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span className="font-medium">Clear All</span>
                  </button>
                )}
              </div>

              {/* Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
                      {/* In Stock Filter */}
                      <div>
                        <h3 className="font-semibold mb-3 text-gray-900">Availability</h3>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedFilters.inStock}
                            onChange={() => toggleFilter('inStock')}
                            className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                          />
                          <span className="text-sm group-hover:text-red-600 transition-colors">
                            In Stock ({filterCounts.inStock})
                          </span>
                        </label>
                      </div>

                      {/* Type of Part */}
                      <div>
                        <h3 className="font-semibold mb-3 text-gray-900">Product Type</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {Object.entries(filterCounts.partType).map(([type, count]) => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedFilters.partType.includes(type)}
                                onChange={() => toggleFilter('partType', type)}
                                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm group-hover:text-red-600 transition-colors truncate">
                                {type} ({count})
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Unit of Measure */}
                      <div>
                        <h3 className="font-semibold mb-3 text-gray-900">Package Size</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {Object.entries(filterCounts.unitOfMeasure).map(([unit, count]) => (
                            <label key={unit} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedFilters.unitOfMeasure.includes(unit)}
                                onChange={() => toggleFilter('unitOfMeasure', unit)}
                                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm group-hover:text-red-600 transition-colors">
                                {unit} ({count})
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Classifications */}
                      <div>
                        <h3 className="font-semibold mb-3 text-gray-900">Classifications</h3>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedFilters.classifications.includes('limitedShelfLife')}
                              onChange={() => toggleFilter('classifications', 'limitedShelfLife')}
                              className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm group-hover:text-red-600 transition-colors">
                              Limited Shelf Life ({filterCounts.classifications.limitedShelfLife})
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedFilters.classifications.includes('hazardous')}
                              onChange={() => toggleFilter('classifications', 'hazardous')}
                              className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm group-hover:text-red-600 transition-colors">
                              Hazardous Material ({filterCounts.classifications.hazardous})
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{products.length}</span> products
            </p>
          </div>

          {/* Products List - Single Column */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Product Image */}
                    <div className="relative lg:w-80 h-64 lg:h-auto bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.featured && (
                          <div className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </div>
                        )}
                        {product.inStock && (
                          <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            In Stock
                          </div>
                        )}
                        {product.hazardous && (
                          <div className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            <AlertCircle className="w-3 h-3" />
                            Hazmat
                          </div>
                        )}
                      </div>

                      {/* Rating */}
                      {product.rating && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                              {product.manufacturer}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                              {product.units}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                            {product.shortName}
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                        </div>
                      </div>

                      {/* Specifications Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {product.nsn && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">NSN</p>
                            <p className="text-sm font-semibold text-gray-900">{product.nsn}</p>
                          </div>
                        )}
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Type</p>
                          <p className="text-sm font-semibold text-gray-900">{product.partType}</p>
                        </div>
                        {product.unNumber && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">UN Number</p>
                            <p className="text-sm font-semibold text-gray-900">{product.unNumber}</p>
                          </div>
                        )}
                        {product.class && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Class</p>
                            <p className="text-sm font-semibold text-gray-900">{product.class}</p>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.limitedShelfLife && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            Limited Shelf Life
                          </div>
                        )}
                        {product.hazardous && (
                          <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                            <AlertCircle className="w-3 h-3" />
                            Hazardous Material
                          </div>
                        )}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-200">
                        <div>
                          {product.price !== null ? (
                            <div>
                              <div className="text-3xl font-bold text-red-600">
                                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">per {product.units}</p>
                            </div>
                          ) : (
                            <div className="text-lg font-semibold text-gray-500">Contact for pricing</div>
                          )}
                          
                          {product.inStock ? (
                            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mt-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Ready to ship immediately
                            </div>
                          ) : product.leadTime ? (
                            <div className="flex items-center gap-2 text-orange-600 text-sm font-medium mt-2">
                              <Calendar className="w-4 h-4" />
                              {product.leadTime < 25 ? `Ships in ${product.leadTime} days` : `${product.leadTime} days lead time`}
                            </div>
                          ) : null}
                        </div>

                        <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                          <ShoppingCart className="w-5 h-5" />
                          Request Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Box className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default LubricantMarketplace;
