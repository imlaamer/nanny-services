import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { store, persistor } from './redux/store.js';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <Provider store={store}>
          <BrowserRouter basename="/react-vite">
            <App />
          </BrowserRouter>
        </Provider>
      </HelmetProvider>
    </PersistGate>
  </React.StrictMode>
);
