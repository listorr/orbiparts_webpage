import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingQuoteButton from '@/components/FloatingQuoteButton';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Products from '@/pages/Products';
import ProductSearch from '@/pages/ProductSearch';
import Industries from '@/pages/Industries';
import Contact from '@/pages/Contact';
import ModernFleets from '@/pages/ModernFleets';
import LegacyAircraft from '@/pages/LegacyAircraft';
import AogSupport from '@/pages/AogSupport';
import GlobalReach from '@/pages/GlobalReach';
import EmployeeLogin from '@/pages/EmployeeLogin';
import Blog from '@/pages/Blog';
import Top10AircraftPartsSuppliers2025 from '@/pages/blog/Top10AircraftPartsSuppliers2025';
// New blog post components (to be created)
import FutureOfLegacyAircraft from '@/pages/blog/FutureOfLegacyAircraft';
import MiamiAviationLogistics from '@/pages/blog/MiamiAviationLogistics';
import AogResponseStrategies from '@/pages/blog/AogResponseStrategies';
import SustainableAviationComponentTrading from '@/pages/blog/SustainableAviationComponentTrading';
import GlobalAircraftPartsSupplyChains from '@/pages/blog/GlobalAircraftPartsSupplyChains';
import TechnologyTrendsComponentManagement from '@/pages/blog/TechnologyTrendsComponentManagement';
import EngineTrading from '@/pages/EngineTrading';
import AircraftTrading from '@/pages/AircraftTrading';
import WhyOrbiparts from '@/pages/WhyOrbiparts';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Footer from '@/components/Footer';
import i18n from '@/i18n';

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div>Cargando...</div>
    </div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<Navigate to="/stock" replace />} />
          <Route path="/stock" element={<ProductSearch />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/modern-fleets" element={<ModernFleets />} />
          <Route path="/legacy-aircraft" element={<LegacyAircraft />} />
          <Route path="/aog-support" element={<AogSupport />} />
          <Route path="/global-reach" element={<GlobalReach />} />
          <Route path="/why-orbiparts" element={<WhyOrbiparts />} />
          {/* Legacy URL redirect */}
          <Route path="/why-choose-us" element={<Navigate to="/why-orbiparts" replace />} />
          
          {/* Trading Services */}
          <Route path="/engine-trading" element={<EngineTrading />} />
          <Route path="/aircraft-trading" element={<AircraftTrading />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/top-10-aircraft-parts-suppliers-2025" element={<Top10AircraftPartsSuppliers2025 />} />
          <Route path="/blog/future-of-legacy-aircraft" element={<FutureOfLegacyAircraft />} />
          <Route path="/blog/miami-aviation-logistics" element={<MiamiAviationLogistics />} />
          <Route path="/blog/aog-response-strategies" element={<AogResponseStrategies />} />
          <Route path="/blog/sustainable-aviation-component-trading" element={<SustainableAviationComponentTrading />} />
          <Route path="/blog/global-aircraft-parts-supply-chains" element={<GlobalAircraftPartsSupplyChains />} />
          <Route path="/blog/technology-trends-aircraft-component-management" element={<TechnologyTrendsComponentManagement />} />
          
          <Route path="/login" element={user ? <Navigate to="/" /> : <EmployeeLogin />} />
          
        </Routes>
      </main>
  {location.pathname !== '/stock' && <FloatingQuoteButton />}
      <Footer />
      <Toaster />
    </>
  );
}

function App() {
  useEffect(() => {
    const lang = i18n.language || 'en';
    document.documentElement.setAttribute('lang', lang);
  }, [i18n.language]);
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <AppContent />
      </div>
    </>
  )
}

export default App;