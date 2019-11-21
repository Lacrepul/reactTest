import React from 'react';

export default class extends React.Component{

    constructor() {
   
        super();
        //Initialize the state in the constructor
        this.state = {
            products: []
        }
    }

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

    renderProducts() {
        return this.state.products.map(product => {
            return (
                    <li key={product.id}>
                        { product.title } 
                    </li>       
                    );
        })
    }

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