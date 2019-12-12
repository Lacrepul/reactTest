import React, { Component } from 'react';
import { GeneralGetUsernameFetch } from 'C:/openServer/OSPanel/domains/blog/resources/js/project/services/GeneralGetUsernameFetch.js';

class AddProduct extends Component {

    constructor(props) {
      super(props);
      this.state = {
        newProduct: {
          name: '',
          detail: '',
          nameUser: '',
        }
      } 
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
    }
    
    componentDidMount() {
      let resultGetUsername = GeneralGetUsernameFetch();
      let currentComponent = this;
      resultGetUsername.then(result => {
        return currentComponent.setState({newProduct: {nameUser : result.name}});
      });
    }
     
    handleInput(key, e) {
      var state = Object.assign({}, this.state.newProduct); 
      state[key] = e.target.value;
      this.setState({newProduct: state });
    }
    handleSubmit(e) {
      e.preventDefault();
      this.props.onAdd(this.state.newProduct);
    }

    refreshInputs(){
      nameId.value = '';
      detailId.value = '';
    }
   
    render() {
       
      return(
        <div> 
          <form onSubmit={this.handleSubmit}>
            <ul>
              <li style={{marginBottom:0, marginTop: 16}}>
                  <input className="alert alert-dark" id="nameId" type="string" placeholder="Name" onChange={(e)=>this.handleInput('name',e)} />
              </li>
              <li style={{margin:0}}>
                    <input className="alert alert-dark" id="detailId" style={{height:148, width:633, margin:0}} type="text" placeholder="Note" onChange={(e)=>this.handleInput('detail',e)} />
              </li>
            </ul>   
            <input onClick={()=>this.refreshInputs()} className="btn btn-outline-success btn-block" type="submit" value="Create New Note" />
          </form>
      </div>)
    }
  }
   
  export default AddProduct;