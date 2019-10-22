import React from 'react';
import logo from './logo.svg';
import { Component } from 'react';
import UserStatus from './containers/UserStatus';
import Home from './containers/Home';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Expenses</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item active">
                <Link to="/login">Users</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={UserStatus} />
        </div>
      </Router>
    );
  }
}
