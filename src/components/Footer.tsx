import { Instagram, Phone, MapPin, ArrowUp } from 'lucide-react';
import { buildWhatsAppUrl, INSTAGRAM_URL, WHATSAPP_PHONE_FORMATTED, COMPANY } from '../constants';
import { handleNavClick as handleNavClickUtil } from '../utils/scroll';

const footerLinks = {
  equipamentos: [
    { label: 'Sky Walker', href: '#equipamentos' },
    { label: 'Low Fog', href: '#equipamentos' },
    { label: 'Máquina de Neve', href: '#equipamentos' },
    { label: 'Máquina de Bolhas', href: '#equipamentos' },
    { label: 'Sky Paper', href: '#equipamentos' },
    { label: 'Canhão Seguidor', href: '#equipamentos' },
  ],
  empresa: [
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Portfólio', href: '#galeria' },
    { label: 'Clientes', href: '#clientes' },
    { label: 'Contato', href: '#contato' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleNavClickUtil(e, href);
  };

  return (
    <footer className="bg-dark-100 border-t border-white/5">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <a href="#inicio" onClick={(e) => onNavClick(e, '#inicio')}>
              <picture>
                <source srcSet="/assets/logo-reflex-som.webp" type="image/webp" />
                <img
                  src="/assets/logo-reflex-som.png"
                  alt="Reflex Som"
                  className="h-14 w-auto rounded mb-6"
                  loading="lazy"
                  width="158"
                  height="48"
                />
              </picture>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Há mais de 30 anos criando momentos inesquecíveis em Brasília. Locação de equipamentos
              profissionais de iluminação, som e efeitos especiais.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-green-500 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Equipment */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Equipamentos</h4>
            <ul className="space-y-3">
              {footerLinks.equipamentos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.href)}
                    className="text-white/60 text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.href)}
                    className="text-white/60 text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4 text-primary" />
                <span>{WHATSAPP_PHONE_FORMATTED}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{COMPANY.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Reflex Som. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
