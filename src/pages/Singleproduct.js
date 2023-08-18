import  {  useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
const Singleproduct = () => {
    const [product,setProduct]=useState({});
    const params=useParams();
    const history=useNavigate();
    console.log(params);
    useEffect(()=>{
        fetch(`https://dark-cyan-barnacle-belt.cyclic.app/api/products/${params._id}`)
        .then((res)=>{
            return res.json();
        }).then((pro) =>{
            setProduct(pro);
        })
    },[params._id]);
    const handleClick=()=>{
        history(-1);
    }
    const size = {
        width: "100%",
    };
  return (
    <>
      <div className="container px-4 py-5" id="hanging-icons">
        <div>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleClick}>
            Back
          </button>
        </div>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col d-flex align-items-start">
            <div className="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
            <div className="d-flex flex-wrap flex-sm-nowrap">
              <div style={{ marginRight: "30px" }}>
                <img
                  src="/images/propizz.jpeg"
                  alt="pizza1"
                  className="img-thumbnail text-center"
                  style={size}
                />
              </div>
              <div>
                <h6>{product.name}</h6>
                <p>{product.size}</p>
                <h6>${product.price}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singleproduct;
