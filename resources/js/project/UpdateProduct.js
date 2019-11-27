import React, { Component } from 'react';

class Update extends Component {
 
    constructor(props) {
      super(props);
         this.state = {
            newProduct: {
                name: '',
                detail: '',
                username: '',
            }
         }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
    }
    
    componentDidMount() {
      fetch('username')
      .then(response => {
          return response.text();
      })
      .then(username => {
          this.setState({newProduct: {'nameUser' : username}});
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
   
    render() {
       
      return(
        <div> 
          <h2> Update product </h2>
          <form onSubmit={this.handleSubmit}>
            <label> name: 
              <input type="string" onChange={(e)=>this.handleInput('name',e)} />
            </label>
             
            <label> detail: 
              <input type="text" onChange={(e)=>this.handleInput('detail',e)} />
            </label>
               
            <input type="submit" value="Submit" />
          </form>
      </div>)
    }
  }
   
  export default Update;