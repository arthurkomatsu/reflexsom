import { Instagram, Phone, MapPin, ArrowUp } from 'lucide-react';

const footerLinks = {
  servicos: [
    { label: 'Iluminação', href: '#servicos' },
    { label: 'Som Profissional', href: '#servicos' },
    { label: 'Efeitos Especiais', href: '#equipamentos' },
    { label: 'Videokê', href: '#equipamentos' },
    { label: 'DJ Profissional', href: '#servicos' },
  ],
  equipamentos: [
    { label: 'Sky Walker', href: '#equipamentos' },
    { label: 'Low Fog', href: '#equipamentos' },
    { label: 'Máquina de Neve', href: '#equipamentos' },
    { label: 'Máquina de Bolhas', href: '#equipamentos' },
    { label: 'Canhão Seguidor', href: '#equipamentos' },
  ],
  empresa: [
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Portfólio', href: '#galeria' },
    { label: 'Preços', href: '#precos' },
    { label: 'Contato', href: '#contato' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-100 border-t border-white/5">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')}>
              <img
                src="/assets/logo-reflex-som.jpg"
                alt="Reflex Som"
                className="h-14 w-auto rounded mb-6"
              />
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Há mais de 30 anos criando momentos inesquecíveis em Brasília. Locação de equipamentos
              profissionais de iluminação, som e efeitos especiais.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/reflex_som"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5561983033900"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-green-500 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/60 text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Equipamentos</h4>
            <ul className="space-y-3">
              {footerLinks.equipamentos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
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
                    onClick={(e) => handleNavClick(e, link.href)}
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
                <span>(61) 98303-3900</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Park Way, Brasília - DF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
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
