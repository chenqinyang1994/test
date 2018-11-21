import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';
ReactDOM.render(<HashRouter>
    <App>
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/user" component={User} />
    </App>
</HashRouter>, document.querySelector('#root'));