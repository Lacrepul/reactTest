import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Note from './project/note.js';
import Home from './project/home.js';
import Register from './project/register.js';
//import Profile from './project/profile.js';

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
            </Switch>
        </div>
    </Router>,
    document.getElementById("root")
)