import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, MapPin, Instagram, Clock, Send } from 'lucide-react';

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contato" className="section-padding bg-dark-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <div className="section-container relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Contato
          </span>
          <h2 className="heading-lg text-white mt-2 mb-4">
            Vamos <span className="text-gradient">conversar?</span>
          </h2>
          <p className="text-white/60 text-lg">
            Entre em contato conosco para tirar suas dúvidas ou solicitar um orçamento.
            Responderemos o mais rápido possível!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* WhatsApp - Featured */}
            <a
              href="https://wa.me/5561983033900?text=Olá! Gostaria de saber mais sobre os serviços da Reflex Som."
              target="_blank"
              rel="noopener noreferrer"
              className="block card-glass p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl text-white mb-1">WhatsApp</h3>
                  <p className="text-white/70 font-semibold text-lg">(61) 98303-3900</p>
                  <p className="text-white/50 text-sm mt-2">Clique para iniciar uma conversa</p>
                </div>
                <Send className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/reflex_som"
              target="_blank"
              rel="noopener noreferrer"
              className="block card-glass p-6 group hover:border-pink-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                  <Instagram className="w-7 h-7 text-pink-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl text-white mb-1">Instagram</h3>
                  <p className="text-pink-400 font-semibold">@reflex_som</p>
                  <p className="text-white/50 text-sm mt-2">Siga-nos para novidades e bastidores</p>
                </div>
                <Send className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Location */}
            <div className="card-glass p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-white mb-1">Localização</h3>
                  <p className="text-white/70">Park Way</p>
                  <p className="text-white/70">Brasília - DF</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="card-glass p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-white mb-1">Horário de Atendimento</h3>
                  <p className="text-white/70">Segunda a Sexta: 9h às 18h</p>
                  <p className="text-white/70">Sábado: 9h às 13h</p>
                  <p className="text-white/50 text-sm mt-2">
                    * WhatsApp disponível 24h para mensagens
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
