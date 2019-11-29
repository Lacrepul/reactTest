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
              createArea: false,
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
                            <button type="button" aria-pressed="true" className="btn btn-secondary active" onClick={() =>(this.handleDelete(product))} style={{width:80}}>Delete</button>
                            <input type="button" className="btn btn-outline-secondary" onClick={() =>(this.handleClick(product))} value={product.name} style={{paddingRight:20, paddingLeft:20}}></input>
                            <button type="button" aria-pressed="true"  className="btn btn-secondary active" onClick={()=>(this.clickUPD (product))} style={{width:80}}>Update</button>
                            </div>
                        </li>
                    );
                }
            })
        }
      
        clickUPD (product){
            let prevCurrentProduct = this.state.currentProduct;
            this.setState({currentProduct: product});
            if((prevCurrentProduct != this.state.currentProduct) &&  this.state.textArea == true){//prev1 != current2 && true
                this.setState({textArea : true});
            }else if((this.state.textArea == false)){
                this.setState({textArea : true});
            }else if((prevCurrentProduct == product) && (this.state.textArea == true)){
                this.setState({textArea : false});
            }/*else if ((this.state.textArea == false)){
                this.setState({textArea : true});
            }*/
        }


          handleClick(product) {
            this.setState({textArea: false});
            this.setState({createArea: false});
            //handleClick is used to set the state
            this.setState({currentProduct:product});
          }
      
          handleDelete(product) {
            this.setState({textArea: false});
            this.setState({createArea: false});
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

          clickCreate(){
            if(this.state.createArea == false){
                this.setState({createArea : true})
            }else{
                this.setState({createArea : false})
            }
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
        let createArea = this.state.createArea;
        let textArea = this.state.textArea; 
        return <div>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Menu
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to='/profile' className="btn btn-outline-success">
                                Profile
                            </Link>
                            <div class="dropdown-divider"></div>
                            <form action="logout" method="POST">
                                <button type="submit" className="btn btn-outline-info">
                                    Logout
                                </button>
                            </form>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </nav>
                    
                    <div className="container">
                        <div id="header" className="text">NOTEBOOK</div>
                        <div className="row" style={{marginTop:100}}>
                            
                            <div className="col-5" >
                                <ul className="list-group">
                                    { this.renderProducts() }
                                </ul>
                            </div> 

                            <div className="col-7">
                                <ul className="list-group">
                                    <div className="alert alert-dark" style={{height:150}} role="alert">
                                        <Product product={this.state.currentProduct} />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm"><button onClick={()=>this.clickCreate()} type="button" id="createButt" className="btn btn-outline-info btn-block">Create new Note</button></div>
                                        <div className="col-sm">{textArea != false && <Update onUPD={this.handleUpdate}/>}{createArea != false && <AddProduct onAdd={this.handleAddProduct}/>}</div>
                                    </div>
                                   
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="container">
                    </div>
                    
               </div>
    }
}
