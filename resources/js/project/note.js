import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';
import Product  from './Product.js';
import AddProduct  from './AddProduct.js';
import Update  from './UpdateProduct.js';


export default class Note extends React.Component{
 
        constructor() {
         
          super();
          //Initialize the state in the constructor
          this.state = {
              products: [],
              currentProduct: null,
              username: '',
          }
          this.handleAddProduct = this.handleAddProduct.bind(this);
          this.handleDelete = this.handleDelete.bind(this);
          this.handleUpdate = this.handleUpdate.bind(this);
        }

          componentDidMount() {

            fetch('username')
                .then(response => {
                    return response.text();
                })
                .then(username => {
                    //Fetched product is stored in the state
                    this.setState({username});
                });

            fetch('/api/products')
                .then(response => {
                    return response.json();
                })
                .then(products => {
                    //Fetched product is stored in the state
                    this.setState({products});
                });
          }
              /*Fetch API for post request */
          handleAddProduct(product) {
           
              //product.price = Number(product.price);
      
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
            
          }
              /* When using list you need to specify a key
              * attribute that is unique for each list item
              */
        renderProducts() {
            return this.state.products.map(product => {
                let key = product.name;
                if(this.state.username == product.nameUser){
                    return (
                        <li key={key} onClick={() =>this.handleClick(product)}>
                            <div>{key}</div>
                            <input type="button" className="btn btn-outline-secondary" style={{width:200}} id="inputNameId" name="inputNameName" value={product.name} readOnly></input>
                        </li>
                    );
                }
            })
        }
      
          handleClick(product) {
            //handleClick is used to set the state
            this.setState({currentProduct:product});  
          }
      
          handleDelete() {
          
            const currentProduct = this.state.currentProduct;
            fetch( 'api/products/' + this.state.currentProduct.id, 
                { method: 'delete' })
                .then(response => {
    
                var array = this.state.products.filter(function(item) {
                return item !== currentProduct
                });
            
                this.setState({ products: array, currentProduct: null});
            
                });
          }

          handleUpdate(product) {
 
            const currentProduct = this.state.currentProduct;
            fetch( 'api/products/' + currentProduct.id, {
                method:'put',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(response => {
                return response.json();
            })
            /////
            .then( data => {
                /* Updating the state */
                var array = this.state.products.filter(function(item) {
                  return item != currentProduct
              })
                this.setState((prevState)=> ({
                    products: array.concat(product),
                    currentProduct : product
                }))
            }) 
          }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render(){
        return <div>
            <div>{JSON.stringify(this.state.currentProduct)}</div>
                    <form action="logout" method="POST">
                        <button type="submit" className="btn btn-outline-info" id="logoutButt">
                            Logout
                        </button>
                    </form>

                    <div className="container">
                        <Link to='/profile' className="btn btn-outline-success" id="profileButt">
                            Profile
                        </Link>
                        <div id="header" className="text">NOTEBOOK</div>
                        <div className="row" style={{marginTop:100}}>
                            
                            <div className="col-5" >
                                <ul className="list-group">
                                    { this.renderProducts() }
                                </ul>
                            </div> 
                            <button onClick={() =>this.handleDelete()}>Delete</button>
                            <AddProduct onAdd={this.handleAddProduct}/>
                            <Update onUPD={this.handleUpdate}/>
                            <div className="col-7">
                                <div className="btn btn-success btn-block" id="textareaHeader">Your Note</div>
                                <ul className="list-group">
                                    <Product product={this.state.currentProduct} />
                                </ul>
                            </div>

                        </div>
                    </div>
               </div>
    }
}
