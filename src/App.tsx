/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DealsCarousel } from './components/DealsCarousel';
import { ProductCatalog } from './components/ProductCatalog';
import { BranchSection } from './components/BranchSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { LiveOrderTracker } from './components/LiveOrderTracker';
import { ProfileDrawer } from './components/ProfileDrawer';
import { FeedbackModal } from './components/FeedbackModal';
import { PrivacyModal } from './components/PrivacyModal';
import { FloatingActions } from './components/FloatingActions';
import { CheckCircle2, X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { toastMessage } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  // Professional loading screen simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0c0d12] flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 rounded-2xl bg-amber-500 flex items-center justify-center p-1 shadow-2xl animate-pulse">
          <img
            src="/images/logo_007.jpg"
            alt="Café 007 Logo"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <h2 className="text-xl font-extrabold text-white mt-4 tracking-wider uppercase">
          CAFÉ <span className="text-amber-500">007</span> MART
        </h2>
        <span className="text-xs text-amber-400 font-medium tracking-widest mt-1">
          Burewala · Let's Hangout
        </span>
        <div className="w-32 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
          <div className="w-full h-full bg-amber-500 animate-[indeterminate_1s_infinite_linear]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0c0d12] text-slate-800 dark:text-slate-100 transition-colors selection:bg-amber-500 selection:text-white">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl border border-amber-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header />

      {/* Main Page Layout */}
      <main className="flex-1">
        <Hero />
        <DealsCarousel />
        <ProductCatalog />
        <BranchSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Buttons */}
      <FloatingActions />

      {/* Interactive Modals and Drawers */}
      <ProductModal />
      <CartDrawer />
      <ReservationModal />
      <LiveOrderTracker />
      <ProfileDrawer />
      <FeedbackModal />
      <PrivacyModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
