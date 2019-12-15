import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';
import { RegisterFetch } from './services/registerFetchs/RegisterFetch';
 
export default class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name : '',
            password_confirmation : '',
            email : '',
            password : '',
            resError : '',
            resError2 : '',

        }
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
        }

    async onSubmit(e){
        e.preventDefault();
        const {name, email, password, password_confirmation} = this.state;
        let result = RegisterFetch(name, email, password, password_confirmation);
        let currentComponent = this;
        let nameId = document.getElementById('nameId');
        let passwordId = document.getElementById('passwordId');
        let confirmId = document.getElementById('confirmId');
        let emailId = document.getElementById('emailId');
        result.then(function(result){
            if (result == '200'){
                currentComponent.setState({err: false});
                currentComponent.props.history.push('/note');
            }else if (result == '500'){
                nameId.value="";
                passwordId.value="";
                emailId.value="";
                confirmId.value="";
                currentComponent.setState({resError : 'This Name/Email already exists'});
                currentComponent.setState({err: true});
            }else{
                nameId.value="";
                passwordId.value="";
                emailId.value="";
                confirmId.value="";
                currentComponent.setState({resError : result[0]});
                currentComponent.setState({resError2 : result[1]});
                currentComponent.setState({err: true});
            }
        });
    }

    render(){
        let resError = this.state.resError;
        let resError2 = this.state.resError2;

        let error = this.state.err ;
        return <div>
                    <div id="header" className="text">NOTEBOOK</div>
                    <div id="container" className="container">
                        {error != undefined && <div className='alert alert-danger' role="alert">{resError}<br></br>{resError2}</div>}

                        <Link to="/" className="btn btn-outline-info" style={{marginBottom: 15}}>Back</Link>

                        <form method="POST" id="signInId" onSubmit= {this.onSubmit.bind(this)}>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Username" id='nameId' name="name" onChange={this.onChange.bind(this)}></input>
                            </div>

                            <div className="form-group">
                                <input className="form-control" type="password" placeholder="Password" id='passwordId' name="password" onChange={this.onChange.bind(this)}></input>
                            </div>

                            <div className="form-group">
                                <input className="form-control" type="password" placeholder="Confirm Password" id='confirmId' name="password_confirmation" onChange={this.onChange.bind(this)}></input>
                            </div>
                            
                            <div className="form-group">
                                <input className="form-control" type="email" placeholder="Email" name="email" id='emailId' onChange={this.onChange.bind(this)}></input>
                                
                            </div>
                                <button className="btn btn-outline-success" type="submit">
                                    Registration
                                </button>
                        </form>
                    </div>
                </div>
    }
}