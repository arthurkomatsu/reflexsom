// Contact information (from environment variables with fallbacks)
const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || '5561983033900';

// Public constants
export const WHATSAPP_PHONE_FORMATTED = '(61) 98303-3900';
export const INSTAGRAM_USERNAME = import.meta.env.VITE_INSTAGRAM_USERNAME || 'reflex_som';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}`;
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Default WhatsApp messages
export const WHATSAPP_MESSAGES = {
  default: 'Olá! Gostaria de saber mais sobre os serviços da Reflex Som.',
  quote: 'Olá! Gostaria de solicitar um orçamento.',
  equipment: (name: string) =>
    `Olá! Gostaria de saber mais sobre o ${name} e solicitar um orçamento.`,
  pricing: (name: string) => `Olá! Gostaria de um orçamento para ${name}.`,
};

// Build WhatsApp URL helper
export const buildWhatsAppUrl = (message: string = WHATSAPP_MESSAGES.default): string =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

// Company information
export const COMPANY = {
  name: 'Reflex Som',
  location: 'Park Way, Brasília - DF',
  yearsOfExperience: 30,
  eventsCompleted: 1500,
  karaokesSongs: 10000,
};
