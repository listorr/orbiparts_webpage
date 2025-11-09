import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BrandLogo from '@/components/BrandLogo';
import { MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=ORBIPARTS+INC.+8256+NW+14th+St,+Doral,+FL+33126";

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: 'Search Inventory', path: '/stock' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  // SEO-optimized category links
  const categoryLinks = [
    { name: 'Aircraft Parts', path: '/stock' },
    { name: 'Engine Trading', path: '/engine-trading' },
    { name: 'Aircraft Trading', path: '/aircraft-trading' },
    { name: 'Modern Fleets', path: '/modern-fleets' },
    { name: 'Legacy Aircraft', path: '/legacy-aircraft' },
    { name: 'AOG Support', path: '/aog-support' },
    { name: 'Global Reach', path: '/global-reach' },
  ];

  const resourceLinks = [
    { name: 'Why ORBIPARTS', path: '/why-orbiparts' },
    { name: 'Industries', path: '/industries' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <BrandLogo theme="white" includeText={true} />
            <p className="text-neutral-400 text-sm">Global Aircraft Parts, Engines & Helicopter Components Supplier Worldwide</p>
            <div className="text-neutral-400 text-xs">
              <p>OEM Distributor</p>
              <p>Engine Trading & Leasing</p>
              <p>24/7 AOG Support</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-semibold text-white mb-4">Company</p>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - SEO Links */}
          <div>
            <p className="font-semibold text-white mb-4">Products & Services</p>
            <ul className="space-y-2">
              {categoryLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - SEO Links */}
          <div>
            <p className="font-semibold text-white mb-4">Resources</p>
            <ul className="space-y-2">
              {resourceLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-white mb-4">Contact Us 24/7</p>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li>
                <a href="mailto:sales@orbiparts.com" className="hover:text-white transition-colors">
                  sales@orbiparts.com
                </a>
              </li>
              <li>
                <a href="tel:+19292299520" className="hover:text-white transition-colors">
                  +1 929 229 9520
                </a>
              </li>
              <li className="flex items-start space-x-2 mt-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <p>Miami, Florida</p>
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    View Map
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Keywords Footer */}
        <div className="mt-8 pt-6 border-t border-neutral-800">
          <div className="text-neutral-500 text-xs text-center mb-4">
            <p className="mb-2">
              <strong className="text-neutral-400">Aircraft Parts:</strong> Airbus A320, A350, A380 | Boeing 737, 777, 787 | Embraer | Bombardier
            </p>
            <p className="mb-2">
              <strong className="text-neutral-400">Engines:</strong> CFM56, LEAP, PW4000, GE90, Trent, V2500 | Engine Trading & Leasing
            </p>
            <p>
              <strong className="text-neutral-400">Services:</strong> Engine Trading & Leasing | Aircraft Trading | OEM Distribution | Helicopter Parts | Business Aviation | General Aviation | Legacy Aircraft | AOG Support Worldwide
            </p>
          </div>
        </div>

        {/* Copyright & Schema */}
        <div className="mt-6 pt-6 border-t border-neutral-800 text-center text-neutral-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ORBIPARTS INC. All rights reserved. | Global Aviation Supplier</p>
          <p className="text-xs mt-2">Serving Airlines, MROs, Operators & Lessors in 100+ Countries Worldwide</p>
        </div>

        {/* Schema.org Organization for Footer */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ORBIPARTS",
            "url": "https://www.orbiparts.com",
            "logo": "https://horizons-cdn.hostinger.com/2ef424c8-0ac1-4054-84ba-36e23eef1963/98d353c201a1ce1dfe4285c61d777c1b.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-929-229-9520",
              "contactType": "sales",
              "email": "sales@orbiparts.com",
              "areaServed": "Worldwide",
              "availableLanguage": ["English", "Spanish"]
            },
            "sameAs": [
              "https://www.linkedin.com/company/orbiparts"
            ]
          })}
        </script>
      </div>
    </footer>
  );
};

export default Footer;