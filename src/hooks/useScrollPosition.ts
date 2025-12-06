import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollY: number;
  isScrolled: boolean;
}

/**
 * Custom hook to track scroll position
 * @param threshold - The scroll threshold to determine if page is scrolled (default: 50)
 * @returns Object containing scrollY position and isScrolled boolean
 */
export function useScrollPosition(threshold: number = 50): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    isScrolled: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition({
        scrollY: currentScrollY,
        isScrolled: currentScrollY > threshold,
      });
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollPosition;
}
