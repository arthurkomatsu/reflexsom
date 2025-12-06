import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn(), inView: true }),
}));

describe('About', () => {
  it('renders the about section', () => {
    render(<About />);
    expect(screen.getByText('Sobre Nós')).toBeInTheDocument();
  });

  it('renders the main heading', () => {
    render(<About />);
    expect(screen.getByText('Transformando')).toBeInTheDocument();
    expect(screen.getByText('sonhos em luz')).toBeInTheDocument();
  });

  it('renders company history', () => {
    render(<About />);
    expect(screen.getByText(/Foi em 1985 que André Aroeira começou/)).toBeInTheDocument();
    expect(screen.getByText(/Em 1995 nasceu oficialmente/)).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(<About />);
    expect(screen.getByText('Tradição')).toBeInTheDocument();
    expect(screen.getByText('Equipe Especializada')).toBeInTheDocument();
    expect(screen.getByText('Equipamentos Premium')).toBeInTheDocument();
    expect(screen.getByText('Atendimento Personalizado')).toBeInTheDocument();
  });

  it('renders years badge', () => {
    render(<About />);
    expect(screen.getByText('30+')).toBeInTheDocument();
    expect(screen.getByText('Anos')).toBeInTheDocument();
  });

  it('renders the main image with alt text', () => {
    render(<About />);
    const image = screen.getByAltText('Evento');
    expect(image).toBeInTheDocument();
  });
});
