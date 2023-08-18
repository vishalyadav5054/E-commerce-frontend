import  { useEffect, useState } from "react";
import Item1 from "./Item1";
const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dark-cyan-barnacle-belt.cyclic.app/api/products")
      .then((res) => {
        return res.json();
      })
      .then((pro) => {
        setProducts(pro);
        console.log(pro);
      });
  }, []);
  return (
    <>
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Products</h2>
      </div>

      <div className="container">
        <div className="row">
          {products.map((ele) => (
            <Item1 key={ele._id} produ={ele} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;