import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, ExternalLink } from 'lucide-react';
import { INSTAGRAM_USERNAME, INSTAGRAM_URL } from '../constants';
import InstagramSkeleton from './InstagramSkeleton';

// Calculate iframe height based on screen width
function getIframeHeight(width: number): number {
  if (width < 480) return 400; // Mobile small
  if (width < 640) return 480; // Mobile
  if (width < 768) return 550; // Tablet small
  if (width < 1024) return 650; // Tablet
  return 750; // Desktop
}

export default function Gallery() {
  const [iframeHeight, setIframeHeight] = useState(750);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const AUTO_RETRY_DELAY = 2000; // 2 seconds between auto retries

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const updateHeight = () => {
      setIframeHeight(getIframeHeight(window.innerWidth));
    };

    // Set initial height
    updateHeight();

    // Update on resize
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Timeout for loading - if it takes too long, trigger retry
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        if (isLoading) {
          // Infinite retry on timeout
          setRetryCount((prev) => prev + 1);
        }
      }, 15000); // 15 second timeout
      return () => clearTimeout(timeout);
    }
  }, [isLoading, retryCount]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    // Infinite retry on error
    setTimeout(() => {
      setRetryCount((prev) => prev + 1);
      setIsLoading(true);
    }, AUTO_RETRY_DELAY);
  };

  return (
    <section id="galeria" className="section-padding bg-dark-50 relative">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Portfólio
          </span>
          <h2 className="heading-lg text-white mt-2 mb-4">
            Nosso <span className="text-gradient">Instagram</span>
          </h2>
          <p className="text-white/60 text-lg">
            Acompanhe nossos eventos mais recentes diretamente do nosso Instagram. De embaixadas a
            shows, cada projeto é tratado com a mesma dedicação.
          </p>
        </motion.div>

        {/* Instagram Profile Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden">
            {/* Loading skeleton */}
            {isLoading && <InstagramSkeleton height={iframeHeight} />}

            {/* Instagram Feed Iframe */}
            <div
              className={`relative w-full bg-dark overflow-hidden ${isLoading ? 'absolute opacity-0' : ''}`}
            >
              <iframe
                key={retryCount}
                src={`https://www.instagram.com/${INSTAGRAM_USERNAME}/embed`}
                className="w-full border-0"
                style={{
                  height: `${iframeHeight}px`,
                  background: '#0a0a0a',
                  colorScheme: 'dark',
                  overflow: 'hidden',
                }}
                scrolling="no"
                title="Feed do Instagram da Reflex Som"
                aria-label={`Visualizar feed do Instagram @${INSTAGRAM_USERNAME}`}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
              />
            </div>
          </div>
        </motion.div>

        {/* CTA to follow on Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-full text-white font-semibold hover:opacity-90 transition-opacity group"
          >
            <Instagram className="w-6 h-6" />
            Siga @{INSTAGRAM_USERNAME} no Instagram
            <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
