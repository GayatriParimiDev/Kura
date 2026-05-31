import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// -------------------------------------------------------------
// BENIGN SANDBOX WEBSOCKET INTERCEPTOR
// Silences Hot Module Replacement connection failures expected
// under AI Studio's sandbox dev-server proxy configuration.
// -------------------------------------------------------------
if (typeof window !== 'undefined') {
  const isBenignMsg = (msg: string | undefined | null) => {
    if (!msg) return false;
    const lower = msg.toLowerCase();
    return (
      lower.includes('websocket') ||
      lower.includes('failed to connect to websocket') ||
      lower.includes('hmr') ||
      lower.includes('socket closed') ||
      lower.includes('closed without opened')
    );
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const msg = reason instanceof Error ? reason.message : String(reason);
    if (isBenignMsg(msg)) {
      event.preventDefault();
      event.stopPropagation();
      console.debug('[KURA Debug] Prevented benign sandbox connection warning:', msg);
    }
  });

  window.addEventListener('error', (event) => {
    if (isBenignMsg(event.message)) {
      event.preventDefault();
      event.stopPropagation();
      console.debug('[KURA Debug] Prevented benign sandbox connection error:', event.message);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
