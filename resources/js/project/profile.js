import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';

export default class Profile extends React.Component{
    render(){
        return <div>
                    <form action="logout" method="POST">
                        <button type="submit" className="btn btn-outline-info" id="logoutButt">
                            logout
                        </button>
                    </form>
                    <div id="header" className="text">Your Profile</div>
                    <div class="container" id="container">
                        <div class="pull-right">
                            <Link to="/note" className="btn btn-outline-info" style={{marginBottom: 15}}>Back</Link>
                        </div>

                        <div class="form-group" id="username">
                            <input type="text" className="form-control" name="usernameProfile" placeholder="asdsad" readOnly></input>
                        </div>

                        <form method="POST">
                            <div className="form-group">
                                <input type="email" className="form-control" value="" name="email" placeholder="aasdasd" readOnly></input>
                            </div>
                                <button type="submit" id="saveId" className="btn btn-outline-success">Change Password</button>
                        </form>		

                        <div className="alert alert-light" role="alert" id="footer">
                            &copy;Copyright by Poul Vasenev, 2019 
                        </div>
                    </div>
               </div>
    }
}