import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Lightbulb, Heart } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Tradição',
    description:
      'Desde 1995 no mercado de Brasília, construindo uma reputação sólida baseada em qualidade e confiança.',
  },
  {
    icon: Users,
    title: 'Equipe Especializada',
    description:
      'Profissionais experientes que garantem a instalação e operação perfeita dos equipamentos.',
  },
  {
    icon: Lightbulb,
    title: 'Equipamentos Premium',
    description:
      'Trabalhamos apenas com marcas renomadas como JEM Martin, garantindo o melhor resultado.',
  },
  {
    icon: Heart,
    title: 'Atendimento Personalizado',
    description:
      'Cada evento é único. Criamos soluções sob medida para tornar seu momento especial.',
  },
];

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="sobre" className="section-padding bg-dark-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="section-container relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main image */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden card-glass">
                <img
                  src="/assets/evento.jpg"
                  alt="Evento"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 card-glass p-4 rounded-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-center">
                  <div className="font-heading text-4xl text-primary">30+</div>
                  <div className="text-xs text-white/60">Anos</div>
                </div>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                className="absolute -bottom-4 -left-4 card-glass p-4 rounded-2xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <div className="text-center">
                  <div className="font-heading text-3xl text-primary">DF</div>
                  <div className="text-xs text-white/60">Brasília</div>
                </div>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl animate-pulse-slow" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Sobre Nós
            </span>
            <h2 className="heading-lg text-white mt-2 mb-6">
              Transformando
              <br />
              <span className="text-gradient">sonhos em luz</span>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Foi em 1985 que André Aroeira começou a fazer som e luz em festas. Na época do
                vinil, onde a facilidade da internet era impensável, construímos nossa história
                tijolo por tijolo.
              </p>
              <p>
                Em 1995 nasceu oficialmente a <strong className="text-white">Reflex Som</strong>, e
                desde então nos tornamos referência em Brasília para locação de equipamentos
                profissionais de iluminação e efeitos especiais.
              </p>
              <p>
                Hoje, atendemos eventos de todos os portes – de casamentos intimistas a grandes
                shows e inaugurações. Nossa missão é fazer cada momento brilhar de forma única e
                inesquecível.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="card-glass p-6 card-hover group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
