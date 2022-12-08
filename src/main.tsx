import { worker } from '@uidotdev/react-query-api';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

new Promise(res => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: 'bypass',
    }),
  )
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
