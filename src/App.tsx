import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import SkipToContent from './components/SkipToContent';
import ErrorBoundary from './components/ErrorBoundary';
import PageTransition from './components/PageTransition';

// Lazy load heavy components
const Equipment = lazy(() => import('./components/Equipment'));
const Gallery = lazy(() => import('./components/Gallery'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));

// Loading fallback component
function SectionSkeleton() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-dark-100 rounded w-1/3 mx-auto" />
          <div className="h-4 bg-dark-100 rounded w-2/3 mx-auto" />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-dark-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <PageTransition>
          <div className="relative">
            {/* Skip to content for accessibility */}
            <SkipToContent />

            {/* Subtle noise texture overlay */}
            <div className="noise-overlay" />

            {/* Main content */}
            <Navbar />
            <main id="main-content">
              <Hero />
              <About />
              <Services />
              <Suspense fallback={<SectionSkeleton />}>
                <Equipment />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <Gallery />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <Testimonials />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <FAQ />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <Contact />
              </Suspense>
            </main>
            <Footer />

            {/* Floating Buttons */}
            <WhatsAppButton />
            <BackToTop />
          </div>
        </PageTransition>
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
