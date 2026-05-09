/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PromoBanner from './components/PromoBanner';
import WhatsAppFloat from './components/WhatsAppFloat';
import MarketingPopup from './components/MarketingPopup';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import FarmLogs from './pages/FarmLogs';
import Farms from './pages/Farms';
import PurityPromise from './pages/PurityPromise';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

function AppContent() {
  const [promoVisible, setPromoVisible] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <MarketingPopup />
      {promoVisible && <PromoBanner onClose={() => setPromoVisible(false)} />}
      <Navbar promoVisible={promoVisible} />
      <main className="flex-grow flex flex-col relative z-0">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/farm-logs" element={<FarmLogs />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/purity" element={<PurityPromise />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<Shipping />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

