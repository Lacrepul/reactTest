import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';

export default class Home extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            resError : '',
        }
    }
    
    async onSubmit(e){
        e.preventDefault();
        const {email , password} = this.state;

        let response = await fetch('login', {
        headers : 
        {'Content-Type': 'application/json',
        'Accept': 'application/json'},
        method: 'POST',
        body: JSON.stringify({email , password}),
        })
        if (response.status == 200){
            this.setState({err: false});
            this.props.history.push('/note');
        }else{
            let result = await response.json();
            emailId.value="";
            passwordId.value="";
            this.setState({err: true});
            this.setState({resError : result['errors']['email'][0]});
        }
    }
        
    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
        }

    render(){
        let resError = this.state.resError;
        let error = this.state.err ;
        return  <div>
                    <div id="header" className="text">NOTEBOOK</div>
                    <div id="container" className="container">
                        <div className="form-group">
                            {error != undefined && <div className='alert alert-danger' style={{width:270}} role="alert">{resError}</div>}
                        </div>
                        <Link to="/register" className="btn btn-outline-success">Register</Link>

                        <form onSubmit= {this.onSubmit.bind(this)} id="saveForm" style={{marginTop: 15}} method="POST">
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" id="emailId" placeholder="Email" onChange={this.onChange.bind(this)} required></input>
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control" name="password" id="passwordId" placeholder="Password" onChange={this.onChange.bind(this)} required></input>
                            </div>
                            <button type="submit" className="btn btn-outline-success">Login</button>
                        </form>
                    </div>
               </div>
    }
}