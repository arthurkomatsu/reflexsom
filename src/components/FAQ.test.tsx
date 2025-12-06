import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from './FAQ';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: React.ComponentProps<'span'>) => (
      <span {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn(), inView: true }),
}));

describe('FAQ', () => {
  it('renders the FAQ section', () => {
    render(<FAQ />);
    expect(screen.getByText('Perguntas Frequentes')).toBeInTheDocument();
  });

  it('renders all FAQ questions', () => {
    render(<FAQ />);
    expect(screen.getByText('Qual a área de atendimento da Reflex Som?')).toBeInTheDocument();
    expect(screen.getByText('A instalação está inclusa no serviço?')).toBeInTheDocument();
  });

  it('first FAQ item is open by default', () => {
    render(<FAQ />);
    const firstAnswer = screen.getByText(/Atendemos Brasília, todo o Distrito Federal/);
    expect(firstAnswer).toBeInTheDocument();
  });

  it('toggles FAQ items on click', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    const secondQuestion = buttons.find((btn) =>
      btn.textContent?.includes('Qual a antecedência necessária')
    );

    if (secondQuestion) {
      fireEvent.click(secondQuestion);
      expect(screen.getByText(/Recomendamos reservar com pelo menos 15 dias/)).toBeInTheDocument();
    }
  });

  it('FAQ buttons have aria-expanded attribute', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    const faqButtons = buttons.filter((btn) => btn.hasAttribute('aria-expanded'));
    expect(faqButtons.length).toBeGreaterThan(0);
  });

  it('renders the CTA section', () => {
    render(<FAQ />);
    expect(screen.getByText('Ainda tem dúvidas?')).toBeInTheDocument();
    expect(screen.getByText('Falar no WhatsApp')).toBeInTheDocument();
  });
});
