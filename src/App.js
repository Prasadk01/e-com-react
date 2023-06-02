import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCartPage from './pages/ShoppingCartPage';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home addToCart={handleAddToCart} />} />
          <Route path="/cart" element={<ShoppingCartPage cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
