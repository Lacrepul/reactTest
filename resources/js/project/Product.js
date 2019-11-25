import React, { Component } from 'react';
 
/* Stateless component or pure component
 * { product } syntax is the object destructing
 */

const Product = ({product}) => {
 
  //if the props product is null, return Product doesn't exist
  if(!product) {
    return(<div>  Product Doesnt exist </div>);
  }
     
  //Else, display the product data
  return(
        <div>
          <p>
            {product.detail}
          </p>
          
        </div>
        )
}

export default Product;