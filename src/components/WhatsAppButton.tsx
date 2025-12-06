import { motion } from 'framer-motion';
import { buildWhatsAppUrl } from '../constants';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp Button */}
      <motion.a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-16 h-16 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 flex items-center justify-center hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Entrar em contato pelo WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </motion.a>
    </div>
  );
}
