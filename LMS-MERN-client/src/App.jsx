import React from 'react'
import { AppContextProvider } from './context/AppContext';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <AppContextProvider>
    <div>App</div>
    </AppContextProvider>
    </BrowserRouter>
  )
}

export default App