import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Route, Switch, Link} from "react-router-dom";
import Fuel from "./Fuel";
import Vehicles from "./Vehicles";
import '../css/bootstrap.min.css';
import '../css/index.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Container fluid className="content">
          <Navbar variant="dark" bg="primary" expand="lg" fixed="top">
            <Navbar.Brand>PyFuel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link" to="/">Fuel</Link>
                <Link className="nav-link" to="/vehicles">Vehicles</Link>
                <Nav.Link href="http://localhost:8000/" target="_blank">API</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route exact path="/" component={Fuel}/>
            <Route exact path="/vehicles" component={Vehicles}/>
          </Switch>
        </Container>

        <div className="footer">
          2019 Ben Browning - <a href="http://github.com/bbrowning918/pyfuel">GitHub</a>
        </div>
      </div>
    );
  }
}

export default App;
