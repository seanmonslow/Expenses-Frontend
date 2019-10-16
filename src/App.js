import React from 'react';
import logo from './logo.svg';
import { Component } from 'react';
import UserStatus from './containers/UserStatus';

export default class App extends Component {
  render() {
    return (
      <div>
        <UserStatus />
      </div>
    );
  }
}
