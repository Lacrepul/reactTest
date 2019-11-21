import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './project/nav.js';
import Home from './project/home.js';
import Register from './project/register.js';
import NotFound from './project/notfound.js';
import Prod from './project/prod.js';

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>,
    document.getElementById("app")
)