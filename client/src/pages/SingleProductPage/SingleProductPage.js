import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../../MyContext';
import "./SingleProductPage.css";

const SingleProductPage = () => {
  const params = useParams();
  const {products} = useContext(MyContext);
  let singleProduct = products.find(p => p._id === params.id);

  useEffect(() => {
    singleProduct = products.find(p => p._id === params.id);
  }, [params]);

  return (
    <div>
      {singleProduct && <div className="product-card">
        <div className="product-image">
          <img src={singleProduct.image} alt={singleProduct.title}/>
        </div>
        <div className="product-info">
          <h5>{singleProduct.title}</h5>
          <h6>{singleProduct.price}$</h6>
        </div>
      </div>}
    </div>
  )
}

export default SingleProductPage