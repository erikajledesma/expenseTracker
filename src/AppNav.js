import React, { Component } from 'react';
import {Nav, Navbar, NavItem, NavbarBrand, NavLink } from 'reactstrap';

class AppNav extends Component {
    state = {  }
    render() {
        return (
          <div>
            <Navbar color='light' light expand="md">
              <NavbarBrand href="/"><img alt= "brand" width='80px' src= "/expenselogo.png"/></NavbarBrand>
                <Nav className="ml-auto" color='black' navbar>
                  <NavItem>
                    <NavLink href="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/categories/">Categories</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/expenses/">Expenses</NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
          </div>
        );
      }
}
 
export default AppNav;