import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from '../constants';

const faqs = [
  {
    id: 1,
    question: 'Qual a área de atendimento da Reflex Som?',
    answer:
      'Atendemos Brasília, todo o Distrito Federal e região do Entorno. Para eventos em outras localidades, entre em contato para verificarmos a disponibilidade.',
  },
  {
    id: 2,
    question: 'Qual a antecedência necessária para reservar os equipamentos?',
    answer:
      'Recomendamos reservar com pelo menos 15 dias de antecedência para garantir a disponibilidade, especialmente em épocas de alta demanda como fim de ano e período de casamentos. Para eventos de grande porte, sugerimos contato com 30 dias ou mais.',
  },
  {
    id: 3,
    question: 'A instalação está inclusa no serviço?',
    answer:
      'Sim! Todos os nossos serviços incluem montagem, instalação, operação durante o evento e desmontagem. Nossa equipe técnica cuida de tudo para você.',
  },
  {
    id: 4,
    question: 'É possível visitar o showroom para conhecer os equipamentos?',
    answer:
      'Sim, agende uma visita ao nosso espaço no Park Way para conhecer nossos equipamentos pessoalmente. Entre em contato pelo WhatsApp para combinar o melhor horário.',
  },
  {
    id: 5,
    question: 'Vocês oferecem pacotes combinados?',
    answer:
      'Sim! Oferecemos pacotes que combinam diferentes serviços como som, iluminação e efeitos especiais, com condições especiais. Solicite um orçamento personalizado.',
  },
  {
    id: 6,
    question: 'Como funciona o pagamento?',
    answer:
      'Trabalhamos com diversas formas de pagamento: PIX, transferência bancária e cartão de crédito. É necessário um sinal para confirmar a reserva e o restante pode ser pago até o dia do evento.',
  },
  {
    id: 7,
    question: 'Os equipamentos são seguros para eventos fechados?',
    answer:
      'Absolutamente! Todos os nossos equipamentos são profissionais e seguros. O Low Fog, por exemplo, não usa CO² e é seguro para ambientes fechados. Nossa equipe é treinada para garantir a segurança em todos os eventos.',
  },
  {
    id: 8,
    question: 'O que acontece em caso de chuva em eventos externos?',
    answer:
      'Para eventos externos, sempre recomendamos um plano B. Nossos equipamentos externos como o Sky Walker são resistentes, mas por segurança elétrica, podemos precisar interromper em caso de tempestade. Isso é avaliado caso a caso.',
  },
];

interface FAQItemProps {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  inView: boolean;
}

function FAQItem({ faq, isOpen, onToggle, index, inView }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-glass overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white pr-4">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-6 text-white/70 leading-relaxed">{faq.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding relative">
      {/* Background decoration */}
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
            Perguntas Frequentes
          </span>
          <h2 className="heading-lg text-white mt-2 mb-4">
            Tire suas <span className="text-gradient">dúvidas</span>
          </h2>
          <p className="text-white/60 text-lg">
            Encontre respostas para as perguntas mais comuns sobre nossos serviços.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="card-glass p-8 max-w-xl mx-auto">
            <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-xl text-white mb-2">Ainda tem dúvidas?</h3>
            <p className="text-white/60 mb-6">
              Entre em contato conosco pelo WhatsApp. Teremos prazer em ajudar!
            </p>
            <a
              href={buildWhatsAppUrl(WHATSAPP_MESSAGES.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
