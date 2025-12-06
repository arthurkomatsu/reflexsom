/**
 * Google Analytics helper
 * This module provides utilities for tracking events with Google Analytics
 */

// Declare gtag as global
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Initialize Google Analytics with the provided measurement ID
 */
export function initGA(measurementId: string): void {
  if (!measurementId || typeof window === 'undefined') return;

  // Add gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

/**
 * Track a page view
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
}

/**
 * Track WhatsApp button click
 */
export function trackWhatsAppClick(source: string): void {
  trackEvent('whatsapp_click', {
    source,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track equipment view
 */
export function trackEquipmentView(equipmentName: string): void {
  trackEvent('equipment_view', {
    equipment_name: equipmentName,
  });
}

/**
 * Track contact action
 */
export function trackContactAction(method: string): void {
  trackEvent('contact', {
    method,
  });
}
