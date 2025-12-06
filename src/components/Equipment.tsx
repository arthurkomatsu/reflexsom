import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Info, X, Sparkles, Clock, Users, Shield, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface EquipmentItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  specs: string[];
  idealFor: string;
  detailedInfo: {
    whatIs: string;
    howItWorks: string;
    benefits: string[];
    useCases: string[];
    technicalDetails: string;
    tips: string;
  };
}

const equipment: EquipmentItem[] = [
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
    detailedInfo: {
      whatIs: 'O Sky Walker é um sistema de holofotes profissionais de altíssima potência, originalmente desenvolvido para sinalização aérea e hoje amplamente utilizado em grandes eventos. Esses refletores projetam feixes de luz intensos que podem ser vistos a quilômetros de distância, criando um espetáculo visual impressionante no céu noturno.',
      howItWorks: 'Cada unidade possui lâmpadas de 4000W que geram feixes luminosos concentrados. O sistema conta com bases motorizadas que permitem movimentos giratórios sincronizados, criando coreografias de luz no céu. A varredura de 90° possibilita cobrir grandes áreas com padrões dinâmicos.',
      benefits: [
        'Atrai atenção de longas distâncias, perfeito para divulgação',
        'Cria atmosfera épica e memorável para qualquer evento',
        'Pode ser sincronizado com música para efeitos dramáticos',
        'Visível mesmo em áreas urbanas com poluição luminosa',
      ],
      useCases: [
        'Inaugurações de shoppings, lojas e empreendimentos',
        'Shows e festivais de música',
        'Eventos corporativos de grande porte',
        'Réveillon e celebrações ao ar livre',
        'Hotéis e resorts como atração noturna',
      ],
      technicalDetails: 'Trabalhamos com conjuntos de 2 a 8 unidades. Cada Sky Walker pesa aproximadamente 80kg e requer alimentação elétrica de 220V. O setup completo leva cerca de 2 horas e nossa equipe técnica opera os equipamentos durante todo o evento.',
      tips: 'Para melhor efeito visual, recomendamos o uso em noites com pouca nebulosidade. Combine com máquina de fumaça para intensificar os feixes de luz.',
    },
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
    detailedInfo: {
      whatIs: 'O Low Fog é uma máquina especializada que produz uma névoa densa que permanece rente ao chão, criando o famoso efeito de "andar nas nuvens". Diferente do gelo seco tradicional (CO²), utiliza um sistema de refrigeração que torna a fumaça mais pesada que o ar.',
      howItWorks: 'A máquina aquece um fluido especial que se transforma em vapor. Esse vapor passa por um sistema de refrigeração que o resfria rapidamente, tornando-o mais denso que o ar ambiente. O resultado é uma névoa que se espalha pelo chão e permanece baixa por vários minutos.',
      benefits: [
        'Não utiliza CO² - muito mais seguro para ambientes fechados',
        'Não causa desconforto respiratório nos convidados',
        'Efeito dura mais tempo que o gelo seco tradicional',
        'Pode ser usado próximo a alimentos sem contaminação',
      ],
      useCases: [
        'Entrada da noiva em casamentos - efeito inesquecível',
        'Valsa de 15 anos com atmosfera mágica',
        'Festas temáticas Frozen ou inverno',
        'Produções teatrais e audiovisuais',
        'Primeiro beijo ou dança dos noivos',
      ],
      technicalDetails: 'Utilizamos a renomada JEM Martin 1500, referência mundial em efeitos especiais. O equipamento cobre áreas de até 50m² e o efeito pode durar de 3 a 5 minutos por acionamento. Fornecemos fluido suficiente para múltiplos acionamentos.',
      tips: 'O efeito fica mais intenso em ambientes climatizados. Para casamentos, recomendamos combinar com iluminação cênica para realçar a névoa.',
    },
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
    detailedInfo: {
      whatIs: 'A Máquina de Neve produz flocos de espuma que imitam com perfeição a neve natural. Os flocos são leves, caem suavemente e criam uma atmosfera mágica de inverno, mesmo no calor brasileiro. É a solução perfeita para quem quer trazer o encanto da neve para seu evento.',
      howItWorks: 'A máquina mistura ar com um fluido especial à base de sabão neutro, criando pequenas bolhas que se assemelham a flocos de neve. Um ventilador interno dispersa os flocos em uma área ampla, simulando uma nevasca suave e constante.',
      benefits: [
        'Líquido 100% atóxico e seguro para crianças',
        'Não mancha roupas nem danifica superfícies',
        'Evapora naturalmente sem deixar resíduos',
        'Pode ser tocado e brincado sem riscos',
      ],
      useCases: [
        'Festas de Natal e fim de ano',
        'Eventos temáticos de inverno',
        'Decoração de vitrines e shoppings',
        'Produções fotográficas e audiovisuais',
        'Festas infantis com tema Frozen',
      ],
      technicalDetails: 'Nossas máquinas cobrem áreas de até 100m² e podem operar continuamente por horas. A neve evapora naturalmente em cerca de 15-20 minutos, facilitando a limpeza. Fornecemos fluido extra para eventos longos.',
      tips: 'Para fotos incríveis, combine a neve com iluminação azulada ou branca. Em festas infantis, as crianças adoram tentar "pegar" os flocos!',
    },
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
    detailedInfo: {
      whatIs: 'A Máquina de Bolhas profissional é um equipamento que produz centenas de bolhas de sabão por minuto de forma automática e contínua. Diferente das bolhas caseiras, essas são mais resistentes e criam um efeito visual encantador que fascina pessoas de todas as idades.',
      howItWorks: 'O equipamento possui um conjunto de anéis rotativos que mergulham em uma solução especial de bolhas e, ao girar, são expostos a um fluxo de ar que forma e libera as bolhas. O resultado é uma produção constante e volumosa de bolhas brilhantes.',
      benefits: [
        'Produz bolhas por horas sem interrupção',
        'Bolhas mais resistentes que as caseiras',
        'Cria atmosfera lúdica e descontraída',
        'Líquido seguro e não irritante',
      ],
      useCases: [
        'Festas infantis e animação',
        'Saída dos noivos na igreja ou festa',
        'Pista de dança em festas',
        'Eventos ao ar livre e jardins',
        'Sessões de fotos criativas',
      ],
      technicalDetails: 'Trabalhamos com máquinas profissionais que produzem até 5.000 bolhas por minuto. O alcance é de aproximadamente 8 metros e podem operar por até 6 horas contínuas. Fornecemos líquido extra para eventos mais longos.',
      tips: 'As bolhas ficam ainda mais bonitas com iluminação colorida - elas refletem as cores e criam um efeito mágico! Para casamentos, posicione a máquina na saída da cerimônia.',
    },
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
    detailedInfo: {
      whatIs: 'O Canhão Seguidor é um refletor profissional de alta potência operado manualmente, usado para acompanhar e destacar pessoas ou elementos em movimento durante um evento. É o mesmo tipo de equipamento usado em shows de grandes artistas, produções de TV e teatro profissional.',
      howItWorks: 'Um operador treinado controla o canhão em tempo real, direcionando o feixe de luz para acompanhar artistas, palestrantes ou momentos especiais. O equipamento possui controle de zoom, intensidade e filtros de cor, permitindo ajustes precisos durante o uso.',
      benefits: [
        'Destaca protagonistas e momentos importantes',
        'Operação profissional em tempo real',
        'Intensidade e foco ajustáveis',
        'Eleva o nível de produção do evento',
      ],
      useCases: [
        'Shows e apresentações musicais',
        'Peças de teatro e espetáculos',
        'Entrada de debutantes e noivos',
        'Palestras e eventos corporativos',
        'Premiações e reconhecimentos',
      ],
      technicalDetails: 'Nossos canhões seguidores possuem lâmpadas de 1200W a 2500W, com alcance de até 50 metros. O kit inclui tripé profissional, gelatinas coloridas e operador técnico especializado durante todo o evento.',
      tips: 'O canhão seguidor transforma momentos simples em experiências cinematográficas. Use na entrada da debutante ou noivos para criar um momento inesquecível!',
    },
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
    detailedInfo: {
      whatIs: 'O Videokê Profissional é um sistema completo de karaokê com mais de 10.000 músicas em alta qualidade. Diferente de aplicativos de celular, oferece áudio cristalino, vídeos originais e um catálogo organizado que facilita encontrar qualquer música rapidamente.',
      howItWorks: 'O sistema inclui uma central de reprodução conectada a uma TV ou projetor, onde aparecem a letra da música sincronizada com o vídeo. Os convidados escolhem as músicas através de um catálogo impresso ou digital e se revezam no microfone.',
      benefits: [
        'Repertório gigante com +10.000 músicas',
        'Qualidade de áudio profissional',
        'Fácil de usar para qualquer pessoa',
        'Anima festas de todos os estilos',
      ],
      useCases: [
        'Confraternizações de empresa',
        'Festas de aniversário adulto',
        'Happy hours e encontros',
        'Festas de família',
        'Eventos de integração',
      ],
      technicalDetails: 'O kit completo inclui a central RAFT, 2 microfones sem fio profissionais, caixa de som amplificada e catálogo organizado por artista e estilo. Repertório atualizado com músicas de todos os gêneros: sertanejo, MPB, rock, pop internacional, forró e muito mais.',
      tips: 'Monte uma "playlist de aquecimento" com músicas conhecidas para quebrar o gelo inicial. Geralmente após as primeiras músicas, todos querem participar!',
    },
  },
];

export default function Equipment() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);

  const closeModal = () => setSelectedEquipment(null);

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
              className="card-glass overflow-hidden card-hover group cursor-pointer"
              onClick={() => setSelectedEquipment(item)}
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

                {/* Click to learn more button */}
                <button
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-xl text-white/80 hover:text-white transition-all duration-300 group/btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEquipment(item);
                  }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Clique aqui para saber mais</span>
                  <ChevronRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Equipment Detail Modal */}
      <AnimatePresence>
        {selectedEquipment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-100 border border-white/10 rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-dark/80 hover:bg-primary rounded-full text-white/60 hover:text-white transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Hero Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedEquipment.image}
                  alt={selectedEquipment.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-2">
                    {selectedEquipment.tagline}
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl text-white">{selectedEquipment.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* What is it section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-primary" />
                    <h4 className="font-heading text-xl text-white uppercase tracking-wider">O que é?</h4>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {selectedEquipment.detailedInfo.whatIs}
                  </p>
                </div>

                {/* How it works section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <h4 className="font-heading text-xl text-white uppercase tracking-wider">Como funciona?</h4>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {selectedEquipment.detailedInfo.howItWorks}
                  </p>
                </div>

                {/* Benefits and Use Cases Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Benefits */}
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-primary" />
                      <h4 className="font-heading text-lg text-white uppercase tracking-wider">Benefícios</h4>
                    </div>
                    <ul className="space-y-3">
                      {selectedEquipment.detailedInfo.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use Cases */}
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-primary" />
                      <h4 className="font-heading text-lg text-white uppercase tracking-wider">Quando usar?</h4>
                    </div>
                    <ul className="space-y-3">
                      {selectedEquipment.detailedInfo.useCases.map((useCase, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
                          <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="p-5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                  <h4 className="font-heading text-lg text-white uppercase tracking-wider mb-3">
                    📋 Detalhes Técnicos
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {selectedEquipment.detailedInfo.technicalDetails}
                  </p>
                </div>

                {/* Pro Tip */}
                <div className="p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20">
                  <h4 className="font-heading text-lg text-white uppercase tracking-wider mb-3">
                    💡 Dica Profissional
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed italic">
                    {selectedEquipment.detailedInfo.tips}
                  </p>
                </div>

                {/* Specs quick view */}
                <div className="flex flex-wrap gap-2">
                  {selectedEquipment.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/5561983033900?text=Olá! Gostaria de saber mais sobre o ${selectedEquipment.name} e solicitar um orçamento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary justify-center text-lg py-5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Solicitar Orçamento</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
