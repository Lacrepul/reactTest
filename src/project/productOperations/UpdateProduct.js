import React, { Component } from 'react';
import { GeneralGetUsernameFetch } from 'C:/openServer/OSPanel/domains/blog/resources/js/project/services/GeneralGetUsernameFetch.js';

class Update extends Component {
 
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
      this.props.onUPD(this.state.newProduct);
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
                      <input className="alert alert-dark" type="string" id="nameId" placeholder="Name" onChange={(e)=>this.handleInput('name',e)} />
                  </li>
                  <li style={{margin:0}}>
                        <input className="alert alert-dark" id="detailId" style={{height:148, width:633, margin:0}} type="text" placeholder="Note" onChange={(e)=>this.handleInput('detail',e)} />
                  </li>
                </ul>   
                <input className="btn btn-outline-secondary btn-block" onClick={()=>this.refreshInputs()} type="submit" value="Update Note" />
              </form>
            </div>)
    }
  }
   
  export default Update;