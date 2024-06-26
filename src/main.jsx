import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ConfigProvider from 'antd/lib/config-provider';

import App from './App.jsx';

import { store, persistor } from './redux/store.js';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <PersistGate loading={null} persistor={persistor}>
    <HelmetProvider>
      <ConfigProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    </HelmetProvider>
  </PersistGate>
  // </React.StrictMode>
);
