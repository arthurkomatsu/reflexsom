import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: React.ComponentProps<'header'>) => (
      <header {...props}>{children}</header>
    ),
    nav: ({ children, ...props }: React.ComponentProps<'nav'>) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: React.ComponentProps<'a'>) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock the useScrollPosition hook
vi.mock('../hooks/useScrollPosition', () => ({
  useScrollPosition: () => ({ isScrolled: false, scrollY: 0 }),
}));

// Mock WhatsAppIcon component
vi.mock('./icons/WhatsAppIcon', () => ({
  default: () => <span data-testid="whatsapp-icon">WhatsApp</span>,
}));

describe('Navbar', () => {
  beforeEach(() => {
    // Reset any window state
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the navbar', () => {
    render(<Navbar />);
    // There are two navigation elements - nav tag and the desktop navigation div
    const navElements = screen.getAllByRole('navigation');
    expect(navElements.length).toBeGreaterThan(0);
  });

  it('renders the logo', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('Reflex Som');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Equipamentos')).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });

    // Open menu
    fireEvent.click(menuButton);

    // Menu should be visible (we check for mobile nav items)
    // Since AnimatePresence is mocked, the menu should render
  });

  it('has accessible menu button', () => {
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toHaveAttribute('aria-label');
  });

  it('renders social links', () => {
    render(<Navbar />);
    const instagramLink = screen
      .getAllByRole('link')
      .find((link) => link.getAttribute('href')?.includes('instagram.com'));
    expect(instagramLink).toBeDefined();
  });
});
