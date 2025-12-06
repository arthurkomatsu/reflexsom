import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Volume2, Lightbulb, Music, Tv, Sparkles, Mic } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: 'Iluminação Profissional',
    description:
      'Moving heads, PAR LEDs, strobes e sistemas de iluminação cênica para criar ambientes únicos.',
    features: ['Moving Heads', 'PAR LEDs', 'Strobes', 'Iluminação Cênica'],
  },
  {
    icon: Volume2,
    title: 'Som Profissional',
    description:
      'Sistemas de som de alta qualidade para eventos de qualquer porte, com operadores experientes.',
    features: ['Line Array', 'Subwoofers', 'Microfones', 'Mesa de Som'],
  },
  {
    icon: Sparkles,
    title: 'Efeitos Especiais',
    description:
      'Low Fog, máquinas de neve, bolhas e muito mais para momentos mágicos e inesquecíveis.',
    features: ['Low Fog', 'Neve', 'Bolhas', 'Confete'],
  },
  {
    icon: Mic,
    title: 'DJ Profissional',
    description:
      'DJs experientes com repertório personalizado para animar sua festa do início ao fim.',
    features: ['Playlist Personalizada', 'Equipamento Completo', 'Iluminação DJ', 'Karaokê'],
  },
  {
    icon: Tv,
    title: 'Telões e Projeção',
    description:
      'Telões LED, projetores e painéis de vídeo para exibição de conteúdo em alta definição.',
    features: ['Telões LED', 'Projetores HD', 'Painéis de Vídeo', 'Transmissão Ao Vivo'],
  },
  {
    icon: Music,
    title: 'Videokê',
    description: 'Sistema de karaokê profissional com mais de 10.000 músicas de todos os estilos.',
    features: ['+10.000 Músicas', 'MPB', 'Sertanejo', 'Internacional'],
  },
];

export default function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="servicos" className="section-padding relative">
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
            Nossos Serviços
          </span>
          <h2 className="heading-lg text-white mt-2 mb-4">
            Soluções completas para seu <span className="text-gradient">evento</span>
          </h2>
          <p className="text-white/60 text-lg">
            Oferecemos tudo que você precisa para transformar seu evento em uma experiência
            memorável. Do som à iluminação, dos efeitos especiais ao DJ.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group card-glass p-8 card-hover"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-2xl text-white mb-3">{service.title}</h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">{service.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 text-xs font-medium text-white/70 bg-white/5 rounded-full border border-white/10"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/5561983033900?text=Olá! Gostaria de saber mais sobre os serviços da Reflex Som."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Mande sua dúvida
          </a>
        </motion.div>
      </div>
    </section>
  );
}
