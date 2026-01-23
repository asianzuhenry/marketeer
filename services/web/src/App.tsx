import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { CartPage } from "./pages/CartPage";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { getLocalCartItems, setLocalCartItems } from "./utils/localCartStorage";
import { ProductsPage } from "./pages/ProductsPage";

function App() {
  const [productIndex, setProductIndex] = useState(0);
  const [cartItems, setCartItems] = useState<number[]>(() => getLocalCartItems());

  useEffect(() => {
    // save cart items to local storage whenever cartItems changes
    setLocalCartItems(cartItems);
  }, [cartItems]);

  return (
    <>
      <NavBar cartItems={cartItems} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage setProductIndex={setProductIndex} setCartItems={setCartItems} cartItems={cartItems} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/products" element={<ProductsPage />} />

          <Route
            path="/productdetails"
            element={
              <ProductDetailPage
                productIndex={productIndex}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
