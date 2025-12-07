import { describe, it, expect } from 'vitest';
import {
  WHATSAPP_PHONE_FORMATTED,
  INSTAGRAM_USERNAME,
  INSTAGRAM_URL,
  WHATSAPP_MESSAGES,
  buildWhatsAppUrl,
  COMPANY,
} from '../constants';

describe('Constants', () => {
  describe('Contact Information', () => {
    it('should have correct phone format', () => {
      expect(WHATSAPP_PHONE_FORMATTED).toBe('(61) 98303-3900');
    });

    it('should have correct Instagram username', () => {
      expect(INSTAGRAM_USERNAME).toBe('reflex_som');
    });

    it('should build correct Instagram URL', () => {
      expect(INSTAGRAM_URL).toBe('https://www.instagram.com/reflex_som');
    });
  });

  describe('WhatsApp Messages', () => {
    it('should have default message', () => {
      expect(WHATSAPP_MESSAGES.default).toContain('Reflex Som');
    });

    it('should have quote message', () => {
      expect(WHATSAPP_MESSAGES.quote).toContain('orçamento');
    });

    it('should generate equipment message with name', () => {
      const message = WHATSAPP_MESSAGES.equipment('Sky Walker');
      expect(message).toContain('Sky Walker');
      expect(message).toContain('orçamento');
    });

    it('should generate pricing message with name', () => {
      const message = WHATSAPP_MESSAGES.pricing('Low Fog');
      expect(message).toContain('Low Fog');
    });
  });

  describe('buildWhatsAppUrl', () => {
    it('should build URL with default message', () => {
      const url = buildWhatsAppUrl();
      expect(url).toContain('https://wa.me/');
      expect(url).toContain('text=');
    });

    it('should build URL with custom message', () => {
      const customMessage = 'Hello World';
      const url = buildWhatsAppUrl(customMessage);
      expect(url).toContain(encodeURIComponent(customMessage));
    });

    it('should properly encode special characters', () => {
      const messageWithSpecialChars = 'Olá! Como você está?';
      const url = buildWhatsAppUrl(messageWithSpecialChars);
      expect(url).toContain(encodeURIComponent(messageWithSpecialChars));
    });
  });

  describe('Company Information', () => {
    it('should have correct company name', () => {
      expect(COMPANY.name).toBe('Reflex Som');
    });

    it('should have correct location', () => {
      expect(COMPANY.location).toContain('Brasília');
    });

    it('should have years of experience', () => {
      expect(COMPANY.yearsOfExperience).toBeGreaterThanOrEqual(30);
    });

    it('should have events completed', () => {
      expect(COMPANY.eventsCompleted).toBeGreaterThan(0);
    });

    it('should have karaoke songs count', () => {
      expect(COMPANY.karaokesSongs).toBeGreaterThanOrEqual(40000);
    });
  });
});
