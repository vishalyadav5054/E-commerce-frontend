import React, { useContext } from "react";
import { CartContext } from "../pages/CartContext";
import { Link } from "react-router-dom";
const Navigation = () => {
  const {cart}=useContext(CartContext);
  const logo = {
    width: "20%",
    marginLeft:"50px"
  };
  const home={
    marginLeft:"50px"
  }
  return (
    <>
    
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand " to="/">
            
             <img src="/images/pizzahome.png" style={logo} alt="logo" />
             <strong>Pizza</strong>
            
        </Link>
        <form className="form-inline">
          <Link className="navbar-brand nav-item active link-secondary"style={home} to="/">
            Home
          </Link>
          <Link className="navbar-brand nav-item active  link-secondary" to="/product">
            Products
          </Link>
          <Link className="navbar-brand nav-item active link-secondary" to="/Cart">
          <i className="fa-solid fa-cart-shopping"><strong>{cart.totalItems}</strong></i>
          </Link>
        </form>
      </nav>
    </>
  );
};

export default Navigation;
