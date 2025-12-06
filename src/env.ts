/**
 * Environment variable validation
 * This module validates and exports all environment variables used in the app
 */

interface EnvConfig {
  WHATSAPP_PHONE: string;
  INSTAGRAM_USERNAME: string;
  GA_MEASUREMENT_ID: string;
  IS_PRODUCTION: boolean;
}

function validateEnv(): EnvConfig {
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '5561983033900';
  const instagramUsername = import.meta.env.VITE_INSTAGRAM_USERNAME || 'reflex_som';
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

  // Validate phone number format (should be digits only)
  if (!/^\d+$/.test(whatsappPhone)) {
    console.warn('VITE_WHATSAPP_PHONE should contain only digits');
  }

  // Validate Instagram username format
  if (!/^[a-zA-Z0-9._]+$/.test(instagramUsername)) {
    console.warn('VITE_INSTAGRAM_USERNAME contains invalid characters');
  }

  // Warn if GA is not configured in production
  if (import.meta.env.PROD && !gaMeasurementId) {
    console.warn('VITE_GA_MEASUREMENT_ID is not set - analytics will be disabled');
  }

  return {
    WHATSAPP_PHONE: whatsappPhone,
    INSTAGRAM_USERNAME: instagramUsername,
    GA_MEASUREMENT_ID: gaMeasurementId,
    IS_PRODUCTION: import.meta.env.PROD,
  };
}

export const env = validateEnv();
