import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component{
  render(){
    return(
      <div className="App-header">
        <img src="http://www.captaincomic.com/eBaypictures/Marvel222.png" className="App-logo" alt="logo" />
        <h2>Marvel Heroes</h2>
        <div className="top-menu">
          <ul>
            <li><Link to="/hero">Heroes</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}
