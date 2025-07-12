import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/student/Home.jsx';
import Footer from './pages/student/Footer.jsx';


const App= () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/footer" element={<Footer/>} />
      </Routes>
    </div>
  )
}

export default App;