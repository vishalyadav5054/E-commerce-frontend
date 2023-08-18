import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Singleproduct from "./pages/Singleproduct";
import { CartContext } from "./pages/CartContext";
import Navigation from "./components/Navigation";
const getll=()=>{
  const _cart=localStorage.getItem('cart');
  if(_cart){
    return JSON.parse(_cart);
  }else{
    return {};
  }
}
const App = () => {
  const [cart, setCart] = useState(getll());
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart));
  },[cart]);
  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product" element={<Product />} />
            <Route exact path="/product/:_id" element={<Singleproduct />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </CartContext.Provider>
      </Router>
    </>
  );
};

export default App;
