import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
const Cart = () => {
  let totalSum = 0;
  const [item, setItems] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    if (!cart.items) {
      return;
    }
    fetch("https://dark-cyan-barnacle-belt.cyclic.app/api/products/cart-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => {
        return res.json();
      })
      .then((pro) => {
        setItems(pro);
      });
  }, [cart]);
  const handleDelete = (id) => {
    let _cart = { ...cart };
    let qty = _cart.items[id];
    _cart.items[id] = 0;
    delete _cart.items[id];
    _cart.totalItems -= qty;
    setCart(_cart);
    const tempitems = item.filter((e) => {
      return e._id !== id;
    });
    setItems(tempitems);
  };
  const handleOrder=()=>{
    if(!item.length){
      alert("Please add Items!")
    }else{
      let tr=window.confirm("Do you want to place order?");
      if(tr){
        alert("Order Placed Successfully!")
      }else{
        alert("Order Cancelled!")
      }
      
    }
    setCart({});
    setItems([]);
  }
  const handleDecrement = (id) => {
    if (cart.items[id] > 1) {
      let _cart = { ...cart };
      _cart.items[id] -= 1;
      _cart.totalItems -= 1;
      setCart(_cart);
    } else {
      handleDelete(id);
    }
  };
  const handleIncrement = (id) => {
    let qty = cart.items[id];
    qty = qty + 1;
    let _cart = { ...cart };
    _cart.items[id] = qty;
    _cart.totalItems += 1;
    setCart(_cart);
  };
  const getSum = (id, price) => {
    let sum = cart.items[id] * price;
    totalSum = totalSum + sum;
    let obj = {
      ts: totalSum,
      s: sum,
    };
    return obj;
  };
  const size = {
    width: "50%",
  };
  return (
    <>
      <div className="container px-4 py-5" id="featured-3">
        <h5 className="pb-2 border-bottom">Cart Items</h5>
      </div>
      <div className="container text-center">
        {item.map((ele) => {
          return (
            <div className="row mt-2">
              <div className="col-6 col-md-3">
                <div className="row mt-2">
                  <div className="col">
                    <img
                      src="./images/propizz.jpeg"
                      alt="pizza1"
                      className="img-thumbnail text-center"
                      style={size}
                    />
                  </div>
                  <div className="col">
                    <span style={{ marginLeft: "10px" }}>{ele.name}</span>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <span>
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-md"
                    style={{
                      borderRadius: "50%",
                      marginRight: "10px",
                      height: "40px",
                    }}
                    onClick={() => {
                      handleDecrement(ele._id);
                    }}
                  >
                    -
                  </button>
                </span>
                <span>{cart.items[ele._id]}</span>
                <span>
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-md"
                    style={{
                      borderRadius: "50%",
                      marginLeft: "10px",
                      height: "40px",
                    }}
                    onClick={() => {
                      handleIncrement(ele._id);
                    }}
                  >
                    +
                  </button>
                </span>
              </div>
              <div className="col-6 col-md-3 mt-3 mt-sm-0">
                ${getSum(ele._id, ele.price).s}
              </div>
              <div className="col-6 col-md-3 mt-3 mt-sm-0">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm btn-sm-md  "
                  style={{ borderRadius: "23px" }}
                  onClick={() => {
                    handleDelete(ele._id);
                  }}
                >
                  DELETE
                </button>
              </div>
              <div className="mt-2">
              <hr />
              </div>
            </div>
          );
        })}
        <div className="row">
          <div className="col-3"></div>
          <div className="col-3"></div>
          <div className="col-3"></div>
          <div className="col-12 col-sm-3 ">
            <strong> Grand Total: $</strong>
            {totalSum}
          </div>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-3"></div>
          <div className="col-3"></div>
          <div className="col-12 col-sm-3 ">
            <button
              type="button"
              className="btn btn-outline-success btn-sm btn-sm-md mt-2 "
              style={{ borderRadius: "23px" }}
              onClick={handleOrder}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
