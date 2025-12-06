import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Zap, Phone } from 'lucide-react';

const pricingPlans = [
  {
    id: 'skywalker',
    name: 'Sky Walker',
    description: 'Par de holofotes de alta potência',
    price: 'R$ 2.000',
    period: 'até 5h de evento',
    features: [
      '2 unidades de 4000W cada',
      'Alcance de até 20 Km',
      'Transporte incluso',
      'Instalação profissional',
      'Operador durante o evento',
    ],
    popular: true,
    cta: 'Reservar Agora',
  },
  {
    id: 'lowfog',
    name: 'Low Fog',
    description: 'Efeito de névoa baixa',
    price: 'Consulte',
    period: 'orçamento personalizado',
    features: [
      'Máquina JEM Martin 1500',
      'Fluido especial incluso',
      'Efeito de longa duração',
      'Instalação e operação',
      'Ideal para casamentos',
    ],
    popular: false,
    cta: 'Solicitar Orçamento',
  },
  {
    id: 'videoke',
    name: 'Videokê',
    description: 'Sistema de karaokê profissional',
    price: 'Consulte',
    period: 'orçamento personalizado',
    features: [
      '+10.000 músicas disponíveis',
      'Todos os estilos musicais',
      'Catálogo organizado',
      'Controle remoto',
      'Equipamento completo',
    ],
    popular: false,
    cta: 'Solicitar Orçamento',
  },
];

const additionalServices = [
  { name: 'Máquina de Neve', price: 'Consulte' },
  { name: 'Máquina de Bolhas', price: 'Consulte' },
  { name: 'Canhão Seguidor', price: 'Consulte' },
  { name: 'Som Profissional', price: 'Sob orçamento' },
  { name: 'Iluminação Cênica', price: 'Sob orçamento' },
  { name: 'DJ Profissional', price: 'Sob orçamento' },
];

export default function Pricing() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="precos" className="section-padding relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />

      <div className="section-container relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Preços
          </span>
          <h2 className="heading-lg text-white mt-2 mb-4">
            Investimento para seu <span className="text-gradient">evento</span>
          </h2>
          <p className="text-white/60 text-lg">
            Oferecemos preços competitivos com a qualidade que você merece. Entre em contato para um
            orçamento personalizado.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative card-glass p-8 ${
                plan.popular ? 'border-primary/50 ring-1 ring-primary/30' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    <Star className="w-3 h-3" />
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="font-heading text-2xl text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="font-heading text-4xl text-primary">{plan.price}</div>
                <div className="text-white/50 text-sm">{plan.period}</div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/5561983033900?text=Olá! Gostaria de um orçamento para ${plan.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'} justify-center`}
              >
                {plan.popular && <Zap className="w-4 h-4" />}
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card-glass p-8"
        >
          <h3 className="font-heading text-2xl text-white text-center mb-8">Outros Serviços</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalServices.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
              >
                <span className="text-white font-medium">{service.name}</span>
                <span className="text-primary font-semibold">{service.price}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <p className="text-white/60 mb-4">
              Precisa de uma combinação especial? Montamos pacotes personalizados!
            </p>
            <a
              href="https://wa.me/5561983033900?text=Olá! Gostaria de montar um pacote personalizado para meu evento."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              <Phone className="w-5 h-5" />
              Falar pelo WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-white/40 text-sm mt-8"
        >
          * Preços válidos para Brasília e entorno. Para outras localidades, consulte-nos. Valores
          sujeitos a alteração sem aviso prévio.
        </motion.p>
      </div>
    </section>
  );
}
