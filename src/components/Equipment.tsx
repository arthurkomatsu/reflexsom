import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Info } from 'lucide-react';

const equipment = [
  {
    id: 'skywalker',
    name: 'Sky Walker',
    tagline: 'Holofotes de alta potência',
    image: '/assets/skywalker-equipamento.jpg',
    description:
      'Refletor de grande potência para uso externo. Projeta fachos de luz com alcance de quilômetros de distância e surpreende pela beleza da coreografia de seus efeitos.',
    specs: [
      '4000W de potência cada',
      'Alcance de até 20 Km',
      'Movimento giratório',
      'Varredura de 90°',
    ],
    idealFor: 'Shows, inaugurações, eventos culturais e hotéis.',
  },
  {
    id: 'lowfog',
    name: 'Low Fog',
    tagline: 'Efeito de gelo seco',
    image: '/assets/low-fog-maquina.jpg',
    description:
      'Máquina que cria uma névoa baixa densa, dando a sensação de "voando nas nuvens". Não utiliza CO², apenas refrigera a fumaça.',
    specs: [
      'JEM Martin 1500',
      'Fluido de rápida dispersão',
      'Efeito de longa duração',
      'Seguro e não tóxico',
    ],
    idealFor: 'Casamentos, 15 anos, festas Frozen e cenas teatrais.',
  },
  {
    id: 'neve',
    name: 'Máquina de Neve',
    tagline: 'Neve artificial realista',
    image: '/assets/maquina-neve-01.jpg',
    description:
      'Efeito extremamente semelhante à neve natural. Líquido totalmente atóxico que pode ficar em contato com a pele.',
    specs: ['Neve realista', 'Líquido atóxico', 'Cobertura ampla', 'Fácil limpeza'],
    idealFor: 'Festas de Natal, eventos temáticos e produções.',
  },
  {
    id: 'bolhas',
    name: 'Máquina de Bolhas',
    tagline: 'Diversão garantida',
    image: '/assets/maquina-bolhas.jpg',
    description:
      'Máquina que produz centenas de bolhas de sabão de forma contínua por várias horas consecutivas.',
    specs: ['Produção contínua', 'Centenas de bolhas', 'Operação por horas', 'Ideal para crianças'],
    idealFor: 'Festas infantis, casamentos e eventos ao ar livre.',
  },
  {
    id: 'seguidor',
    name: 'Canhão Seguidor',
    tagline: 'Foco profissional',
    image: '/assets/canhao-seguidor.jpg',
    description:
      'Utilizado para projeção de focos definidos em atores, cenários e pessoas. Muito usado em TV, cinema e shows.',
    specs: ['Foco preciso', 'Alta luminosidade', 'Controle manual', 'Tripé incluso'],
    idealFor: 'Shows, teatro, TV e eventos corporativos.',
  },
  {
    id: 'videoke',
    name: 'Videokê Profissional',
    tagline: '+10.000 músicas',
    image: '/assets/videoke-equipamento.jpg',
    description:
      'Sistema RAFT com repertório completo em diversos idiomas e estilos musicais, do forró ao clássico.',
    specs: ['+10.000 músicas', 'Catálogo organizado', 'Controle remoto', 'Todos os estilos'],
    idealFor: 'Confraternizações, eventos empresariais e festas.',
  },
];

export default function Equipment() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="equipamentos" className="section-padding bg-dark-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Locação de Equipamentos
          </span>
          <h2 className="heading-lg text-white mt-2 mb-4">
            Equipamentos <span className="text-gradient">profissionais</span>
          </h2>
          <p className="text-white/60 text-lg">
            Trabalhamos com as melhores marcas do mercado para garantir resultados excepcionais em
            cada evento.
          </p>
        </motion.div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-glass overflow-hidden card-hover group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-primary text-sm font-medium">{item.tagline}</span>
                  <h3 className="font-heading text-3xl text-white">{item.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{item.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {item.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-sm text-white/60">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-xl text-sm">
                  <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-white/70">
                    <strong className="text-white">Ideal para:</strong> {item.idealFor}
                  </span>
                </div>

                <a
                  href={`https://wa.me/5561983033900?text=Olá! Gostaria de saber mais sobre o ${item.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full btn-primary justify-center"
                >
                  <span>Solicitar Orçamento</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
