import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/hero-bg.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/80 to-dark" />
      </div>

      {/* Animated Light Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            x: [-50, 50, -50],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            x: [50, -50, 50],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative section-container text-center z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-white mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">+30 anos criando momentos inesquecíveis</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-xl text-white mb-6"
        >
          <span className="block">Transforme seu</span>
          <span className="text-gradient">Evento</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 text-balance"
        >
          Iluminação profissional, som, efeitos especiais, DJ e locação de equipamentos para
          transformar seu evento em uma experiência inesquecível. Atendemos{' '}
          <span className="text-primary font-semibold">Brasília, DF e Entorno</span>.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
        >
          {[
            { value: '+30', label: 'Anos de experiência' },
            { value: '+1500', label: 'Eventos realizados' },
            { value: '+10k', label: 'Músicas no Karaokê' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-heading text-4xl md:text-5xl text-primary">{stat.value}</div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="https://wa.me/5561983033900?text=Olá! Gostaria de solicitar um orçamento."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-5 h-5" />
            Solicitar Orçamento
          </motion.a>
          <motion.button
            onClick={() => scrollToSection('#equipamentos')}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Equipamentos
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollToSection('#sobre')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-white/50 hover:text-primary transition-colors"
        >
          <span className="text-xs mb-2 uppercase tracking-widest">Explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
