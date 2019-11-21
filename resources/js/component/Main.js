import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
//import AddProduct from './AddProduct';

 
/* Main Component */
class Main extends Component {
 
  constructor() {
   
    super();
    //Initialize the state in the constructor
    this.state = {
        products: [],
        currentProduct: null
    }
    //this.handleAddProduct = this.handleAddProduct.bind(this);
    //this.handleDelete = this.handleDelete.bind(this);
  }
  /*componentDidMount() is a lifecycle method
   * that gets called after the component is rendered
   */
    componentDidMount() {
    /* fetch API in action */
        fetch('/api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                //Fetched product is stored in the state
                this.setState({ products });
            });
    }
        /*Fetch API for post request */
    /*handleAddProduct(product) {
     
        product.price = Number(product.price);

        fetch( 'api/products/', {
            method:'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
             
            body: JSON.stringify(product)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            //update the state of products and currentProduct
            this.setState((prevState)=> ({
                products: prevState.products.concat(data),
                currentProduct : data
            }))
        })
      
    }*/
        /* When using list you need to specify a key
        * attribute that is unique for each list item
        */
    renderProducts() {
        return this.state.products.map(product => {
            return (
            <li /*onClick={() =>this.handleClick(product)}*/ key={product.id} >
                { product.price } 
            </li>       
            );
        })
    }

   /* handleClick(product) {
        //handleClick is used to set the state
        this.setState({currentProduct:product});  
    }*/

    /*handleDelete() {
    
        const currentProduct = this.state.currentProduct;
        fetch( 'api/products/' + this.state.currentProduct.id, 
            { method: 'delete' })
            .then(response => {

              var array = this.state.products.filter(function(item) {
              return item !== currentProduct
            });
          
            this.setState({ products: array, currentProduct: null});
       
        });
    }*/
   
    render() {
        return (
          /* The extra divs are for the css styles */
              <div>
                  <div>
                   <h3> All products </h3>
                    <ul>
                      { this.renderProducts() }
                    </ul> 
                  </div> 
              </div>
        );
    }
}
///VIEW
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
//<AddProduct onAdd={this.handleAddProduct} />
//<Product product={this.state.currentProduct} />