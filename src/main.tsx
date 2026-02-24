import App from '@/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { scan } from 'react-scan';
import './index.css';
import '@/i18n/config';
import { HashRouter } from 'react-router-dom';

// scan({ enabled: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
