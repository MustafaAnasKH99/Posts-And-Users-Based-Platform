import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Switch, browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App.js'

Meteor.startup(() => {
    render(
    <Router history={browserHistory}>
        <Switch>
        <Route exact path="/" component={App}/>
        </Switch>
    </Router>, 
    document.getElementById('react-target')
    );
})