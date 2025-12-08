import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Embaixada da Holanda',
    role: 'Evento Institucional',
    content:
      'Serviço impecável! A equipe da Reflex Som superou nossas expectativas no evento Dia do Rei. Profissionalismo e qualidade em cada detalhe.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Via Engenharia',
    role: 'Inauguração',
    content:
      'O Sky Walker foi o destaque da nossa inauguração. Visível a quilômetros de distância, trouxe uma visibilidade incrível para o empreendimento.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Associação Nipo',
    role: 'Evento Cultural',
    content:
      'O karaokê foi um sucesso absoluto! Com mais de 40.000 músicas, todos encontraram suas favoritas. Atendimento excepcional.',
    rating: 5,
  },
  {
    id: 4,
    name: 'ParkShopping',
    role: 'Evento de Natal',
    content:
      'As máquinas de bolhas criaram uma atmosfera mágica para o lançamento da nossa árvore de Natal. As crianças adoraram!',
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="depoimentos" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Depoimentos
          </span>
          <h2 className="heading-lg text-white mt-2 mb-4">
            O que nossos <span className="text-gradient">clientes</span> dizem
          </h2>
          <p className="text-white/60 text-lg">
            A satisfação dos nossos clientes é nossa maior recompensa. Veja o que dizem sobre nossos
            serviços.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glass p-8 card-hover relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white/80 text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
                  <span className="font-heading text-xl text-white">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 card-glass rounded-full">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-primary-700/50 border-2 border-dark-50 flex items-center justify-center"
                >
                  <Star className="w-4 h-4 text-primary" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="font-semibold text-white">+1500 Eventos</div>
              <div className="text-sm text-white/60">realizados com sucesso</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
