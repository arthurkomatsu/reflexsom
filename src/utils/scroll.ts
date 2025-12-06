/**
 * Smoothly scrolls to a section by its ID or selector
 */
export function scrollToSection(sectionId: string): void {
  const element = document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Event handler for anchor clicks that prevents default and scrolls to section
 */
export function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  callback?: () => void
): void {
  e.preventDefault();
  scrollToSection(href);
  callback?.();
}
