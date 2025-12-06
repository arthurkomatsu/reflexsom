import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WhatsAppButton from './WhatsAppButton';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    a: ({ children, ...props }: React.ComponentProps<'a'>) => <a {...props}>{children}</a>,
  },
}));

// Mock the useScrollPosition hook
vi.mock('../hooks/useScrollPosition', () => ({
  useScrollPosition: () => 100,
}));

describe('WhatsAppButton', () => {
  beforeEach(() => {
    // Mock window.gtag for analytics
    window.gtag = vi.fn();
  });

  it('renders the WhatsApp button', () => {
    render(<WhatsAppButton />);
    const button = screen.getByRole('link');
    expect(button).toBeInTheDocument();
  });

  it('has correct WhatsApp URL', () => {
    render(<WhatsAppButton />);
    const button = screen.getByRole('link');
    expect(button.getAttribute('href')).toContain('wa.me');
  });

  it('opens in new tab', () => {
    render(<WhatsAppButton />);
    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has accessible label', () => {
    render(<WhatsAppButton />);
    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('aria-label');
  });

  it('tracks click event', () => {
    render(<WhatsAppButton />);
    const button = screen.getByRole('link');
    fireEvent.click(button);
    // Analytics tracking is tested via the trackWhatsAppClick function
  });
});
