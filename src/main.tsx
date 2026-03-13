import App from '@/App';
import { initAnalytics } from '@/analytics';
import { initConsoleEasterEgg } from '@/lib/consoleEasterEgg';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@/i18n/config';
import { HashRouter } from 'react-router-dom';

initAnalytics();
initConsoleEasterEgg();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
