/**
 * Error Tracking Utility
 *
 * This module provides a simple interface for error tracking that can be
 * integrated with services like Sentry, LogRocket, or similar.
 *
 * To enable Sentry:
 * 1. Install: npm install @sentry/react
 * 2. Set VITE_SENTRY_DSN in your .env file
 * 3. Uncomment the Sentry initialization code below
 */

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  extra?: Record<string, unknown>;
}

/**
 * Initialize error tracking (call this in main.tsx)
 */
export function initErrorTracking(): void {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  if (!sentryDsn || !import.meta.env.PROD) {
    console.log('[ErrorTracking] Running in development mode - errors will be logged to console');
    return;
  }

  // Uncomment below to enable Sentry
  // import('@sentry/react').then((Sentry) => {
  //   Sentry.init({
  //     dsn: sentryDsn,
  //     environment: import.meta.env.MODE,
  //     tracesSampleRate: 0.1,
  //     replaysSessionSampleRate: 0.1,
  //     replaysOnErrorSampleRate: 1.0,
  //   });
  // });
}

/**
 * Capture an error with optional context
 */
export function captureError(error: Error, context?: ErrorContext): void {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    ...context,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  // In development, log to console
  if (!import.meta.env.PROD) {
    console.error('[ErrorTracking] Captured error:', errorInfo);
    return;
  }

  // In production, send to error tracking service
  // Uncomment below to send to Sentry
  // import('@sentry/react').then((Sentry) => {
  //   Sentry.captureException(error, {
  //     tags: {
  //       component: context?.component,
  //       action: context?.action,
  //     },
  //     extra: context?.extra,
  //   });
  // });

  // Fallback: log to console in production if Sentry not configured
  console.error('[ErrorTracking] Production error:', errorInfo);
}

/**
 * Capture a message/warning
 */
export function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info'
): void {
  const logMethod =
    level === 'error' ? console.error : level === 'warning' ? console.warn : console.log;

  if (!import.meta.env.PROD) {
    logMethod(`[ErrorTracking] ${level.toUpperCase()}: ${message}`);
    return;
  }

  // Uncomment below to send to Sentry
  // import('@sentry/react').then((Sentry) => {
  //   Sentry.captureMessage(message, level);
  // });

  logMethod(`[ErrorTracking] ${level.toUpperCase()}: ${message}`);
}

/**
 * Set user context for error tracking
 */
export function setUser(userId: string | null): void {
  if (!import.meta.env.PROD) {
    console.log(`[ErrorTracking] Set user: ${userId}`);
    return;
  }

  // Uncomment below to set user in Sentry
  // import('@sentry/react').then((Sentry) => {
  //   if (userId) {
  //     Sentry.setUser({ id: userId });
  //   } else {
  //     Sentry.setUser(null);
  //   }
  // });
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category: string = 'user-action',
  data?: Record<string, unknown>
): void {
  if (!import.meta.env.PROD) {
    console.log(`[ErrorTracking] Breadcrumb: [${category}] ${message}`, data);
    return;
  }

  // Uncomment below to add breadcrumb in Sentry
  // import('@sentry/react').then((Sentry) => {
  //   Sentry.addBreadcrumb({
  //     message,
  //     category,
  //     data,
  //     level: 'info',
  //   });
  // });
}
