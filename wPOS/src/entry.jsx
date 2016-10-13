import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

const App = require('./App.jsx');
const Order = require('./pages/Order.jsx');
const Home = require('./pages/Home.jsx');
const NotFound = require('./pages/NotFound.jsx');

render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path="Today" component={Home}/>
        <Route path="Order" component={Order}/>
        <Route path="*" component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('app'));
