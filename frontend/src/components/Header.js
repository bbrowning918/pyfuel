import React, { Component } from 'react'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom"

class Header extends Component {
    render() {
        return (
            <Navbar variant="dark" bg="primary" expand="lg" fixed="top">
              <Navbar.Brand>PyFuel</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link className="nav-link" to="/">Fuel</Link>
                  <Link className="nav-link" to="/vehicles">Vehicles</Link>
                  <Nav.Link href={process.env.REACT_APP_API_HOST} target="_blank">API</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Header