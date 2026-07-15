/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

import { Header, BottomNav } from './components/Navigation';
import { ReminderBanner } from './components/ReminderBanner';
import { WishlistProvider } from './context/WishlistContext';
import HomeView from './views/Home';
import InformationView from './views/Information';
import AboutView from './views/About';
import ScheduleView from './views/Schedule';
import PapersView from './views/Papers';

// Heavier / secondary views are code-split so the initial bundle stays lean on mobile.
const WishlistView = lazy(() => import('./views/Wishlist'));
const MapView = lazy(() => import('./views/Map'));
const ScheduleTableView = lazy(() => import('./views/ScheduleTable'));
const ContactView = lazy(() => import('./views/Contact'));

function PageFallback() {
  return (
    <div className="min-h-screen pt-32 pb-32 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} {...({ key: location.pathname } as object)}>
        <Route path="/" element={<PageWrapper><HomeView /></PageWrapper>} />
        <Route path="/info" element={<PageWrapper><InformationView /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutView /></PageWrapper>} />
        <Route path="/schedule" element={<PageWrapper><ScheduleView /></PageWrapper>} />
        <Route path="/papers" element={<PageWrapper><PapersView /></PageWrapper>} />
        <Route path="/schedule/wishlist" element={<PageWrapper><Suspense fallback={<PageFallback />}><WishlistView /></Suspense></PageWrapper>} />
        <Route path="/map" element={<PageWrapper><Suspense fallback={<PageFallback />}><MapView /></Suspense></PageWrapper>} />
        <Route path="/schedule/table" element={<PageWrapper><Suspense fallback={<PageFallback />}><ScheduleTableView /></Suspense></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Suspense fallback={<PageFallback />}><ContactView /></Suspense></PageWrapper>} />
        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<PageWrapper><HomeView /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <WishlistProvider>
        <div className="min-h-screen bg-background pb-16 md:pb-0">
          <Header />
          <ReminderBanner />
          <AnimatedRoutes />
          <BottomNav />

        {/* Desktop Footer Placeholder */}
        <footer className="hidden md:block bg-slate-900 text-white py-20 mt-20">
          <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-2xl font-black mb-6 tracking-tighter">PIANC-COPEDEC 9</h4>
              <p className="text-blue-200/60 text-sm leading-relaxed max-w-sm">
                The premier global exchange for maritime infrastructure innovation and coastal engineering excellence.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-tertiary uppercase tracking-widest text-xs">Quick Links</h5>
              <a href="#" className="text-sm hover:text-tertiary transition-colors">Registration</a>
              <a href="#" className="text-sm hover:text-tertiary transition-colors">Venue & Travel</a>
              <a href="#" className="text-sm hover:text-tertiary transition-colors">Call for Papers</a>
            </div>
            <div>
              <h5 className="font-bold text-tertiary uppercase tracking-widest text-xs mb-4">Newsletter</h5>
              <p className="text-sm text-blue-200/60 mb-6 font-medium">Get the latest updates from the organizing committee.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="email@institution.edu" className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm flex-1" />
                <button className="bg-tertiary text-primary font-bold px-6 py-3 rounded-full text-sm">Join</button>
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 text-[10px] uppercase font-black tracking-widest text-blue-100/30">
            © 2027 PIANC-COPEDEC • Indian Institute of Technology Madras
          </div>
        </footer>
        </div>
      </WishlistProvider>
    </Router>
  );
}
