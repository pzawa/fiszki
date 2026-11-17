import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { requestPersistentStorage } from './db';
import './styles.css';

// Prosimy przeglądarkę, żeby nie usuwała danych przy braku miejsca.
requestPersistentStorage();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HashRouter (#/kategorie) działa na każdym statycznym hostingu i w trybie offline. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
