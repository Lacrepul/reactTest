import React, { Component } from 'react';

class AddProduct extends Component {
 
    constructor(props) {
      super(props);
         /* Initialize the state. */
         this.state = {
            newProduct: {
                name: '',
                detail: '',
            }
          }
       
      //Boilerplate code for binding methods with `this`
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
    }
     
    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {
       
      /*Duplicating and updating the state */
      var state = Object.assign({}, this.state.newProduct); 
      state[key] = e.target.value;
      this.setState({newProduct: state });
    }
   /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
      //preventDefault prevents page reload   
      e.preventDefault();
      /*A call back to the onAdd props. The current
       *state is passed as a param
       */
      this.props.onAdd(this.state.newProduct);
    }
   
    render() {
       
      return(
        <div> 
          <h2> Add new product </h2>
          <form onSubmit={this.handleSubmit}>
            <label> name: 
             { /*On every keystroke, the handeInput method is invoked */ }
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
   
  export default AddProduct;