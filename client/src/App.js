import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import NoMatch from './pages/NoMatch.js'; 
import './App.css';

class App extends Component {
  state = {
    username: "",
    watchList: []
  }
  
  
  render() {
      
    return (
        <Router className="router">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route  path="/home" component={Home} />
            <Route component={NoMatch} />
          </Switch>
      </Router>
    );
  }
}

export default App;
