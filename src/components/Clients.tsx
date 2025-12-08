import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const clients = [
  // Major Commercial
  { name: 'ParkShopping', logo: '/assets/logos/parkshopping.png' },
  { name: 'Taguatinga Shopping', logo: '/assets/logos/taguatinga-shopping.png' },
  { name: 'Grupo Saga', logo: '/assets/logos/saga.jpg' },
  { name: 'Brookfield Empreendimento', logo: '/assets/logos/brookfield.png' },
  { name: 'Alphaville Brasília', logo: '/assets/logos/alphaville.jpeg' },
  { name: 'Sabin', logo: '/assets/logos/sabin.jpeg' },

  // Education
  { name: 'Escola Americana', logo: '/assets/logos/escola-americana.png' },
  { name: 'Escola das Nações', logo: '/assets/logos/escola-das-nacoes.png' },
  { name: 'Mackenzie', logo: '/assets/logos/mackenzie.png' },

  // Entertainment & Culture
  { name: '60 Minutos Escape Room', logo: '/assets/logos/60-minutos-escape-room.png' },
  { name: 'SESC', logo: '/assets/logos/sesc.png' },

  // Institutions
  { name: 'GDF', logo: '/assets/logos/gdf.jpeg' },
  { name: 'Cavalaria do Exército', logo: '/assets/logos/cavalaria.png' },
  { name: 'CBM DF', logo: '/assets/logos/cbm.webp' },

  // Religious
  { name: 'Igreja Sara Nossa Terra', logo: '/assets/logos/sara.png' },
  { name: 'Comunidade das Nações', logo: '/assets/logos/comunidade-das-nacoes.jpg' },

  // Embassies
  { name: 'Embaixada da Finlândia', logo: 'https://flagcdn.com/w160/fi.png' },
  { name: 'Embaixada da Irlanda', logo: 'https://flagcdn.com/w160/ie.png' },
  { name: 'Embaixada do Canadá', logo: 'https://flagcdn.com/w160/ca.png' },
  { name: 'Embaixada de Israel', logo: 'https://flagcdn.com/w160/il.png' },
  { name: 'Embaixada da República Tcheca', logo: 'https://flagcdn.com/w160/cz.png' },
  { name: 'Embaixada do Reino Unido', logo: 'https://flagcdn.com/w160/gb.png' },
  { name: 'Embaixada do Azerbaijão', logo: 'https://flagcdn.com/w160/az.png' },
];

export default function Clients() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="clientes" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Clientes
          </span>
          <h2 className="heading-lg text-white mt-2 mb-4">
            Quem <span className="text-gradient">confia</span> em nós
          </h2>
          <p className="text-white/60 text-lg">
            Empresas e instituições renomadas que escolheram a Reflex Som para seus eventos
            especiais.
          </p>
        </motion.div>

        {/* Clients Logo Grid - Modern circular layout */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8 justify-items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                type: 'spring',
                stiffness: 100,
              }}
              className="group flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/15 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,107,0,0.2)]">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className="mt-3 text-white/70 text-xs md:text-sm text-center leading-tight max-w-[100px] md:max-w-[130px] group-hover:text-white transition-colors duration-300">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Subtle bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 text-sm">
            E muitos outros clientes satisfeitos em Brasília e região
          </p>
        </motion.div>
      </div>
    </section>
  );
}
