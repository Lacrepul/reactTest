import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';
 
export default class Register extends React.Component{
    render(){
        return <div id="container" className="container">
            
                    <Link to="/" className="btn btn-outline-info" style={{marginBottom: 15}}>Register</Link>

                    <form action="/register" method="POST" id="signInId">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Username" name="name"></input>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type="password" placeholder="Password" name="password"></input>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type="password" placeholder="Confirm Password" name="password_confirmation"></input>
                        </div>
                        
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Email" name="email"></input>
                            
                        </div>
                            <button className="btn btn-outline-success" type="submit">
                                Registration
                            </button>
                    </form>
                </div>;
    }
}