import { NavBar } from './Components/NavBar'
import { Footer } from './Components/Footer'
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  const [productIndex, setProductIndex] = useState(1);
  return <>
    <NavBar />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setProductIndex={setProductIndex} />} />
        <Route path='/productdetails' element={<ProductDetailPage productIndex={productIndex} />} />
      </Routes>
    </Router>
    <Footer />
  </>
}

export default App
