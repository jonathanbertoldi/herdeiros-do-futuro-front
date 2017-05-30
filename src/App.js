import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>      
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer to="/">
                <a>Herdeiros do Futuro</a>
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/eventos">
                <NavItem eventKey={1}>Eventos</NavItem>
              </LinkContainer>
              <LinkContainer to="/itens">
                <NavItem eventKey={2}>Itens</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          {this.props.children}
          <hr />
          2017 - FATEC Ipiranga
        </div>
      </div>
    );
  }
}

export default App;
