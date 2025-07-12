import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <AppContextProvider>
    <App />
    </AppContextProvider>
  </BrowserRouter>
  </React.StrictMode>
)
