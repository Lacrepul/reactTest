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
              textArea: false,
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
                let key = product.id;
                if(this.state.username == product.nameUser){
                    return (
                        <li key={key} style={{textAlign:'left'}}>
                            <div className="btn-group"  role="group" aria-label="Basic example" style={{boxSizing: 'border-box'}}>
                            <button type="button" className="btn btn-secondary" onClick={() =>(this.handleDelete(product))} style={{width:80}}>Delete</button>
                            <input type="button" className="btn btn-outline-secondary" onClick={() =>(this.handleClick(product))} value={product.name} style={{paddingRight:20, paddingLeft:20}}></input>
                            <button type="button" className="btn btn-secondary" style={{width:80}}>Update</button>
                            </div>
                        </li>
                    );
                }
            })
        }
      
          handleClick(product) {
            //handleClick is used to set the state
            this.setState({currentProduct:product});
            this.setState({textArea: true});
          }
      
          handleDelete(product) {
            const currentProduct = product;
            fetch( 'api/products/' + product.id, 
                { method: 'delete' })
                .then(response => {
    
                var array = this.state.products.filter(function(item) {
                return item !== currentProduct
                });
            
                this.setState({ products: array, currentProduct: null});
            
                });
          }

          async handleUpdate(product){
            const currentProduct = this.state.currentProduct;
    
            let response = await fetch('api/products/' + currentProduct.id, {
            headers : 
            {'Content-Type': 'application/json',
            'Accept': 'application/json'},
            method: 'PUT',
            body: JSON.stringify(product),
            })
            var array = this.state.products.filter(function(item) {
                return item !== currentProduct
            })
            let result = await response.json();
            this.setState(() =>({
                products: array.concat(result),
                currentProduct : result
            }))
            }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render(){
        let textArea = this.state.textArea; 
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

                            <div className="col-7">
                                <ul className="list-group">
                                    <Product product={this.state.currentProduct} />
                                </ul>
                            </div>

                        </div>
                    </div>
                    {textArea == true && <Update onUPD={this.handleUpdate}/>}
                    <AddProduct onAdd={this.handleAddProduct}/>
                    <button onClick={() =>this.handleDelete()}>Delete</button>
               </div>
    }
}
