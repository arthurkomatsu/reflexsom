import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  webpSrc?: string;
}

/**
 * LazyImage component with loading state, fade-in animation, and fallback support
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fallbackSrc = '/assets/placeholder.svg',
  webpSrc,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Determine the image source (use fallback if error)
  const imageSrc = hasError ? fallbackSrc : src;

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Skeleton loading state */}
      {!isLoaded && !hasError && <div className="absolute inset-0 bg-dark-100 animate-pulse" />}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-dark-100 flex items-center justify-center">
          <div className="text-white/40 text-sm text-center p-4">
            <svg
              className="w-8 h-8 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Imagem indisponível
          </div>
        </div>
      )}

      {/* Actual image with WebP support */}
      {isInView &&
        !hasError &&
        (webpSrc ? (
          <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <motion.img
              src={imageSrc}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? 'eager' : 'lazy'}
              onLoad={handleLoad}
              onError={handleError}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className={`w-full h-full object-cover ${isLoaded ? '' : 'invisible'}`}
            />
          </picture>
        ) : (
          <motion.img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className={`w-full h-full object-cover ${isLoaded ? '' : 'invisible'}`}
          />
        ))}
    </div>
  );
}
