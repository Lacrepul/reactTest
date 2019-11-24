import React, { Component } from 'react';
 
/* Stateless component or pure component
 * { product } syntax is the object destructing
 */

const Product = ({product}) => {
    
  const divStyle = {
      /*code omitted for brevity */
  }
 
  //if the props product is null, return Product doesn't exist
  if(!product) {
    return(<div style={divStyle}>  Product Doesnt exist </div>);
  }
     
  //Else, display the product data
  return(
        <div>
          <p>
            {product.description}
          </p>
          <button>Delete</button>
        </div>
        )
}

export default Product;