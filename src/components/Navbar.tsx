import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Instagram } from 'lucide-react';
import { buildWhatsAppUrl, INSTAGRAM_URL, WHATSAPP_MESSAGES } from '../constants';
import { handleNavClick } from '../utils/scroll';
import { useScrollPosition } from '../hooks/useScrollPosition';
import WhatsAppIcon from './icons/WhatsAppIcon';

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Equipamentos', href: '#equipamentos' },
  { label: 'Portfólio', href: '#galeria' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');
  const { isScrolled } = useScrollPosition(50);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Handle navbar visibility on scroll
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768; // md breakpoint

      if (!isMobile) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Show navbar if scrolling up or at the top
      // Hide if scrolling down and past 100px
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    window.addEventListener('resize', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('resize', controlNavbar);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleNavClick(e, href, () => setIsOpen(false));
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible || isOpen ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isOpen
            ? 'bg-dark/95 backdrop-blur-lg shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="section-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#inicio"
              onClick={(e) => onNavClick(e, '#inicio')}
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/assets/logo-reflex-som.jpg"
                alt="Reflex Som"
                className="h-12 w-auto rounded"
                loading="eager"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div
              className="hidden lg:flex items-center gap-8"
              role="navigation"
              aria-label="Navegação principal"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className={`text-sm font-medium transition-colors relative group ${
                    activeSection === item.href
                      ? 'text-primary'
                      : 'text-white/80 hover:text-primary'
                  }`}
                  whileHover={{ y: -2 }}
                  aria-current={activeSection === item.href ? 'page' : undefined}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/80 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={buildWhatsAppUrl(WHATSAPP_MESSAGES.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/80 hover:text-green-500 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative z-10 p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Outside header to avoid transform issues */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 top-20 bg-dark-50 z-40 overflow-y-auto"
            role="navigation"
            aria-label="Menu de navegação móvel"
          >
            <div className="section-container py-6 flex flex-col gap-4 min-h-full">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`text-lg font-medium transition-colors py-2 ${
                    activeSection === item.href
                      ? 'text-primary'
                      : 'text-white/80 hover:text-primary'
                  }`}
                  aria-current={activeSection === item.href ? 'page' : undefined}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@reflex_som</span>
                </a>
              </div>
              <a
                href={buildWhatsAppUrl(WHATSAPP_MESSAGES.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-2"
              >
                <Phone className="w-5 h-5" />
                <span>Fale pelo WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
