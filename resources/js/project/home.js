import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';
import { HomeFetch } from './services/HomeFetchs/HomeFetch.js';

export default class Home extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            resError : '',
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    async onSubmit(e){
        e.preventDefault();
        const {email , password} = this.state;
        let result = HomeFetch(email, password);
        let currentComponent = this;
        result.then(function(result){
            if(result == "200"){
                currentComponent.setState({err: false});
                currentComponent.props.history.push('/note');
            }else{
                emailId.value="";
                passwordId.value="";
                currentComponent.setState({err: true});
                currentComponent.setState({resError : result});
            }
        });
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

                        <form onSubmit={this.onSubmit.bind(this)} id="saveForm" style={{marginTop: 15}} method="POST">
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