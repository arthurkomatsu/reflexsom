import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Equipment from './components/Equipment';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="relative">
      {/* Subtle noise texture overlay */}
      <div className="noise-overlay" />

      {/* Main content */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Equipment />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
