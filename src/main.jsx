import React from 'react';
// import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { Auth0ProviderWithNavigate } from './auth0-provider-with-navigate';
import './styles/main.scss';

const container = document.getElementById('root');
const root = createRoot(container);

// ReactDOM.createRoot(document.getElementById('root')).render(
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>,
);
