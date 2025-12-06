import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Equipment from './components/Equipment';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SkipToContent from './components/SkipToContent';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
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
          <Equipment />
          <Gallery />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />

        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </div>
    </ErrorBoundary>
  );
}

export default App;
