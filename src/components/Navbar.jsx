import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X, LogOut, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrandLogo from '@/components/BrandLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
    }
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, [isOpen]);

  const handleAOGSupportClick = () => {
    setIsOpen(false);
    navigate('/aog-support');
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.industries'), path: '/industries' },
    // Insert Stock link between Industries and Expert Corner
    { name: t('nav.stock') || 'Stock', path: '/stock' },
    { name: t('nav.expertCorner'), path: '/blog' },
    // Swap order: show Contact before Orbiparts (About)
    { name: t('nav.contact'), path: '/contact' },
    { name: t('nav.about'), path: '/about' },
  ];
  
  if (user) {
    navItems.push(
      { name: 'Components Admin', path: '/admin/components' },
      { name: 'Asset Library', path: '/admin/asset-library' }
    );
  }

  const isTransparent = !scrolled && location.pathname === '/';
  const finalIsTransparent = isTransparent && !isOpen;

  return (
    <motion.nav
      initial={false}
      animate={finalIsTransparent ? "transparent" : "solid"}
      variants={{
        transparent: { backgroundColor: 'rgba(3, 19, 43, 0)', y: 0 },
        solid: { backgroundColor: 'rgba(247, 249, 252, 0.9)', y: 0 },
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <BrandLogo theme={finalIsTransparent ? 'white' : 'blue'} includeText={true} />

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary font-semibold'
                    : finalIsTransparent
                    ? 'text-gray-200'
                    : 'text-neutral-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
            ) : (
                <Button onClick={handleAOGSupportClick} className="rounded-md bg-blue-600 hover:bg-red-600 text-white font-semibold transition-colors duration-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    AOG Support
                </Button>
            )}
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-md transition-colors ${
              finalIsTransparent 
                ? 'text-white hover:bg-white/10' 
                : 'text-neutral-900 hover:bg-black/5'
            }`}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            id="mobile-menu"
            className="lg:hidden bg-white border-t border-gray-200 fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto shadow-xl"
          >
            <div className="px-6 py-6 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'text-white bg-blue-600 shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 space-y-4 border-t border-gray-200">
                 {user ? (
                    <Button onClick={handleSignOut} variant="outline" className="w-full py-6 text-base">
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign Out
                    </Button>
                ) : (
                    <Button 
                      onClick={handleAOGSupportClick} 
                      className="w-full py-6 text-base rounded-lg bg-blue-600 hover:bg-red-600 text-white font-semibold transition-colors duration-300 flex items-center gap-3 justify-center shadow-lg"
                    >
                      <AlertCircle className="w-5 h-5" />
                      AOG Support
                    </Button>
                )}
                <div className="flex justify-center pt-4">
                    <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;