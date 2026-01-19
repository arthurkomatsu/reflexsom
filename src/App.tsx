import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import SkipToContent from './components/SkipToContent';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoadingBar from './components/PageLoadingBar';
import NotFound from './components/NotFound';

// Lazy load heavy components
const Equipment = lazy(() => import('./components/Equipment'));
const Gallery = lazy(() => import('./components/Gallery'));
const Clients = lazy(() => import('./components/Clients'));
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

// Home page component with all sections
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<SectionSkeleton />}>
        <Equipment />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Clients />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      {/* Page loading progress bar */}
      <PageLoadingBar />

      {/* Fixed elements - outside PageTransition to prevent transform issues */}
      <Navbar />
      <WhatsAppButton />
      <BackToTop />

      <div className="relative">
        {/* Skip to content for accessibility */}
        <SkipToContent />

        {/* Subtle noise texture overlay */}
        <div className="noise-overlay" />

        {/* Main content */}
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Future routes can be added here:
                    <Route path="/equipamentos/:id" element={<EquipmentDetail />} />
                    <Route path="/blog" element={<Blog />} />
                */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
