import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Services from './Services';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: React.ComponentProps<'a'>) => <a {...props}>{children}</a>,
  },
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn(), inView: true }),
}));

describe('Services', () => {
  it('renders the services section', () => {
    render(<Services />);
    expect(screen.getByText('Nossos Serviços')).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<Services />);
    expect(screen.getByText('Iluminação Profissional')).toBeInTheDocument();
    expect(screen.getByText('Efeitos Especiais')).toBeInTheDocument();
    expect(screen.getByText('DJ Profissional')).toBeInTheDocument();
    expect(screen.getByText('Telões e Projeção')).toBeInTheDocument();
    expect(screen.getByText('Videokê')).toBeInTheDocument();
  });

  it('renders service features', () => {
    render(<Services />);
    expect(screen.getByText('Moving Heads')).toBeInTheDocument();
    expect(screen.getByText('PAR LEDs')).toBeInTheDocument();
    expect(screen.getByText('Low Fog')).toBeInTheDocument();
  });

  it('renders WhatsApp CTA link', () => {
    render(<Services />);
    const whatsappLink = screen.getByRole('link', { name: /mande sua dúvida/i });
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute('href');
    expect(whatsappLink.getAttribute('href')).toContain('wa.me');
  });
});
