/**
 * Shared TypeScript interfaces and types
 */

// Equipment types
export interface EquipmentDetailedInfo {
  whatIs: string;
  howItWorks: string;
  benefits: string[];
  useCases: string[];
  technicalDetails: string;
  tips: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  specs: string[];
  idealFor: string;
  detailedInfo: EquipmentDetailedInfo;
}

// Service types
export interface ServiceFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}

// Testimonial types
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// FAQ types
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
}

// Company statistics
export interface CompanyStat {
  id: string;
  value: string;
  label: string;
}

// Contact information
export interface ContactInfo {
  phone: string;
  phoneFormatted: string;
  instagram: string;
  instagramUrl: string;
  location: string;
  hours: string;
}

// Cookie consent types
export type CookieConsentStatus = 'pending' | 'accepted' | 'rejected';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}
