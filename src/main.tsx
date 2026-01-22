import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/config';
import { HashRouter } from 'react-router-dom';
import App from './App';
import 'overlayscrollbars/overlayscrollbars.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
