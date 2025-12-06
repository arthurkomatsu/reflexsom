import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { registerServiceWorker } from './utils/serviceWorker';
import { initGA } from './utils/analytics';
import { GA_MEASUREMENT_ID } from './constants';

// Initialize Google Analytics
if (GA_MEASUREMENT_ID) {
  initGA(GA_MEASUREMENT_ID);
}

// Register service worker for PWA
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
