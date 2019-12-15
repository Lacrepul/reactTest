import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';
import Product  from './productOperations/Product.js';
import AddProduct  from './productOperations/AddProduct.js';
import Update  from './productOperations/UpdateProduct.js';
import { GeneralGetUsernameFetch } from './services/GeneralGetUsernameFetch.js';
import { NoteGetProductsFetch } from './services/noteFetchs/NoteGetProductsFetch.js';
import { NoteAddProductFetch } from './services/noteFetchs/NoteAddProductFetch.js';
import { NoteDeleteFetch } from './services/noteFetchs/NoteDeleteFetch';
import { NoteUpdateFetch } from './services/noteFetchs/NoteUpdateFetch';

export default class Note extends React.Component{
 
    constructor() {
        super();
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
        let currentComponent = this;
        let resultGetUsername = GeneralGetUsernameFetch();
        let resultGetProducts = NoteGetProductsFetch();

        resultGetUsername.then(result => {
            return currentComponent.setState({ username : result });
        });

        resultGetProducts.then(result => {
            return currentComponent.setState({ products : result });
        });
    }

    handleAddProduct(product) {
        let currentComponent = this;
        let resultAddProduct = NoteAddProductFetch(product);

        resultAddProduct.then(result => {
            return  currentComponent.setState((prevState)=> ({
                        products: prevState.products.concat(result),
                        currentProduct : result
                    }));
        });

        currentComponent.setState({createArea : false});
    }

    renderProducts() {
        return this.state.products.map(product => {
            let key = product.id;
            if(this.state.username.name == product.nameUser){
                return (
                    <li key={key} style={{textAlign:'left'}}>
                        <div className="btn-group"  role="group" aria-label="Basic example" style={{boxSizing: 'border-box'}}>
                        <button type="button" aria-pressed="true" className="btn btn-secondary active" onClick={() =>(this.handleDelete(product))} style={{width:80}}>Delete</button>
                        <input type="button" className="btn btn-outline-secondary" onClick={() =>(this.handleClick(product))} value={product.name} style={{paddingRight:20, paddingLeft:20}}></input>
                        <button type="button" aria-pressed="true"  className="btn btn-secondary active" onClick={()=>(this.clickUpdate (product))} style={{width:80}}>Update</button>
                        </div>
                    </li>
                );
            }
        })
    }
    
    clickUpdate (product){
        this.setState({createArea : false});
        let prevCurrentProduct = this.state.currentProduct;
        this.setState({currentProduct: product});
        if((prevCurrentProduct != this.state.currentProduct) &&  this.state.textArea == true){//prev1 != current2 && true
            this.setState({textArea : true});
        }else if((this.state.textArea == false)){
            this.setState({textArea : true});
        }else if((prevCurrentProduct == product) && (this.state.textArea == true)){
            this.setState({textArea : false});
        }
    }


    handleClick(product) {
        this.setState({textArea: false});
        this.setState({createArea: false});
        this.setState({currentProduct:product});
    }
      
    handleDelete(product) {
        this.setState({textArea: false});
        this.setState({createArea: false});
        const currentProduct = product;
        let currentComponent = this;
        NoteDeleteFetch(product);
        var array = currentComponent.state.products.filter(function(item) {
            return item !== currentProduct
        });
        currentComponent.setState({ products: array, currentProduct: null});
    }

    clickCreate(){
        this.setState({textArea : false});
        if(this.state.createArea == false){
            this.setState({createArea : true})
        }else{
            this.setState({createArea : false})
        }
    }

    async handleUpdate(product){
        let currentComponent = this;
        const currentProduct = this.state.currentProduct;
        let result = NoteUpdateFetch(currentProduct, product);
        var array = this.state.products.filter(function(item) {
            return item !== currentProduct
            })
        var array = this.state.products.filter(function(item) {
        return item !== currentProduct
        })
        result.then(result => {
            return  currentComponent.setState(() =>({
                    products: array.concat(result),
                    currentProduct : result
                    }))
        });
        this.setState({textArea : false});
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render(){
        let createArea = this.state.createArea;
        let textArea = this.state.textArea; 
        return <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Menu
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to='/profile' className="btn btn-outline-success">
                                            Profile
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <form action="http://127.0.0.1:8000/logout" method="POST">
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
                        <div className="row" style={{marginTop:50}}>
                            
                            <div className="col-5" >
                                <ul className="list-group">
                                    { this.renderProducts() }
                                </ul>
                            </div> 

                            <div className="col-7">
                                <ul className="list-group">
                                    <div className="alert alert-dark" id="alertList" role="alert">
                                        <Product product={this.state.currentProduct} />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm"><button onClick={()=>this.clickCreate()} type="button" id="createButt" className="btn btn-outline-success btn-block">Press to create new Note</button></div>
                                        <div className="col-sm"></div>
                                    </div>
                                    <div style={{marginLeft:0}} className="row">{textArea != false && <Update onUPD={this.handleUpdate}/>}{createArea != false && <AddProduct onAdd={this.handleAddProduct}/>} </div>
                                </ul>
                            </div>

                        </div>
                    </div>                  
               </div>
    }
}
