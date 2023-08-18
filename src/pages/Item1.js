import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
const Item1 = (props) => {
  const { cart, setCart } = useContext(CartContext);
  const [ isToggle, setIsToggle ] = useState(false);
  const handleAdd = (event, produ) => {
    event.preventDefault();
    let _cart={...cart};
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[produ._id]) {
      _cart.items[produ._id] += 1;
    } else {
      _cart.items[produ._id] = 1;
    }
    if (_cart.totalItems) {
      _cart.totalItems +=1;
    } else {
      _cart.totalItems = 1;
    }
    setCart(_cart);
    setIsToggle(true);
    
    setTimeout(() => {
      setIsToggle(false);
    }, 1000);   
  };
  
  const { produ } = props;
  const size = {
    width: "60%",
  };
  const br = {
    borderRadius: "23px",
  };

  return (
    <div className="col-12 pb-2 col-sm-4 text-ceter">
      <Link className="navbar-brand" to={`/product/${produ._id}`}>
        <img
          src="./images/propizz.jpeg"
          alt="pizza1"
          className="img-thumbnail text-center"
          style={size}
        />
        <h6 className="text-justify">{produ.name}</h6>
        <p>{produ.size}</p>
        <div className="d-flex justify-content-between">
          <div>
            <strong>${produ.price}</strong>
          </div>
          <div>
            <button
              type="button"
              className={`${isToggle? 'btn btn-outline-success btn-sm' : 'btn btn-outline-warning btn-sm'}`}
              style={br}
              onClick={(e) => {
                handleAdd(e, produ);
              }}
              id="addbutton"
            >
              {`${isToggle?"ADDED":"ADD"}`}
            </button>
          </div>
          <div>
            <p></p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item1;
