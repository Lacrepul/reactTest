import React from 'react';
import {Link}  from 'react-router-dom';
import { GeneralGetUsernameFetch } from './services/GeneralGetUsernameFetch.js';

export default class Profile extends React.Component{
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            profile: {},
        }
    }

    componentDidMount() {
        let result = GeneralGetUsernameFetch();
        result.then(profile => {
            this.setState({profile});
        });
    }

    render(){
        let profile = this.state.profile;
        return <div>
                    <form action="logout" method="POST">
                        <button type="submit" className="btn btn-outline-info" id="logoutButt">
                            logout
                        </button>
                    </form>
                    <div id="header" className="text">Your Profile</div>
                    <div className="container" id="container">
                        <div className="pull-right">
                            <Link to="/note" className="btn btn-outline-info" style={{marginBottom: 15}}>Back</Link>
                        </div>

                        <div className="form-group" id="username">
                            <input type="text" className="form-control" name="usernameProfile" placeholder={profile.name} readOnly></input>
                        </div>

                        <form method="POST">
                            <div className="form-group">
                                <input type="email" className="form-control" value="" name="email" placeholder={profile.email} readOnly></input>
                            </div>
                                <button type="submit" id="saveId" className="btn btn-outline-success">Change Password</button>
                        </form>		
                    </div>
               </div>
    }
}