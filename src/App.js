import React, { Component } from 'react';
import './App.css';
import Characters from './characters'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://www.captaincomic.com/eBaypictures/Marvel222.png" className="App-logo" alt="logo" />
          <h2>Marvel Heroes</h2>
        </div>
        <div className="mainContent">
          <Characters />
        </div>
      </div>
    );
  }
}

export default App;
