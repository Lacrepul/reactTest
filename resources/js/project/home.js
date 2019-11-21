import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';

export default class Home extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
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
        body: 
        JSON.stringify({email , password})
        })
        if (response.status != 200){
        return alert('НЕПРАВИЛЬНЫЙ ЛОГИН\ПАРОЛЬ');
        }else{
            this.props.history.push('/note');
        }
    }
        
    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
        }

    render(){
        return <div id="container" className="container">
                    <Link to="/register" className="btn btn-outline-success">Register</Link>

                    <form onSubmit= {this.onSubmit.bind(this)} id="saveForm" style={{marginTop: 15}} method="POST">
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.onChange.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onChange.bind(this)} required></input>
                        </div>
                        <button type="submit" className="btn btn-outline-success">Login</button>
                    </form>
               </div>;
    }
}