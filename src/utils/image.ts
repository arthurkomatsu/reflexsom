/**
 * Image utility functions for responsive images and optimization
 */

/**
 * Generate srcset string for responsive images
 * @param baseSrc - Base image path (e.g., '/assets/hero-bg.png')
 * @param widths - Array of widths to generate (default: common breakpoints)
 * @returns srcset string for use in img or source elements
 */
export function generateSrcSet(
  baseSrc: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  const lastDotIndex = baseSrc.lastIndexOf('.');
  if (lastDotIndex === -1) return baseSrc;

  const extension = baseSrc.slice(lastDotIndex + 1);
  const basePath = baseSrc.slice(0, lastDotIndex);

  return widths.map((w) => `${basePath}-${w}w.${extension} ${w}w`).join(', ');
}

/**
 * Generate image paths for different formats
 * @param baseSrc - Base image path (e.g., '/assets/hero-bg.png')
 * @returns Object with paths for different formats
 */
export function getImageFormats(baseSrc: string): {
  original: string;
  webp: string;
  avif: string;
} {
  const lastDotIndex = baseSrc.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return { original: baseSrc, webp: baseSrc, avif: baseSrc };
  }

  const basePath = baseSrc.slice(0, lastDotIndex);

  return {
    original: baseSrc,
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`,
  };
}

/**
 * Get optimal sizes attribute based on layout context
 */
export const IMAGE_SIZES = {
  // Full width on mobile, half on tablet, third on desktop
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  // Full width on all devices
  hero: '100vw',
  // Fixed size thumbnail
  thumbnail: '(max-width: 640px) 50vw, 200px',
  // Gallery layout
  gallery: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
} as const;
