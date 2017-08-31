import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../img/marvel-logo.png';

export default class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = { activeNavKey: 1 };
    this.handleNavSelect = this.handleNavSelect.bind(this);
  }

  handleNavSelect(navKey){
    this.setState({ activeNavKey: navKey });
  }

  render(){
    return(
      <Navbar collapseOnSelect={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/hero">
              <a>
                <img src={logo} className="app-logo" alt="logo" />
                Marvel Searcher
              </a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav activeKey={this.state.activeNavKey}>
            <LinkContainer to="/hero">
              <NavItem eventKey={1} onSelect={this.handleNavSelect}>Heroes</NavItem>
            </LinkContainer>
            <LinkContainer to="/comic">
              <NavItem eventKey={2} onSelect={this.handleNavSelect}>Comics</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight className="tagline">
            Find all your favorite Marvel stuff.
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
