import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { Route, Switch } from "react-router-dom"
import axios from 'axios'
import Fuel from "./Fuel"
import Vehicles from "./Vehicles"
import Footer from "./Footer"
import Header from "./Header"
import '../css/bootstrap.min.css'
import '../css/index.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fuel: [],
      vehicles: [],
      companies: [],
      isLoaded: false,
    }
  }

  async componentDidMount() {
    const fuel = await axios.get('/fuel/')
    const vehicles = await axios.get('/vehicles/')
    const companies = await axios.get('/companies/')

    this.setState({
      fuel: fuel.data,
      vehicles: vehicles.data,
      companies: companies.data,
      isLoaded: true 
    })
  }


  render() {
    if(!this.state.isLoaded) {
      return(
        <div className="app">
          <Container fluid className="content">
            <Header />

            <h2>Loading...</h2>
            </Container>

          <Footer />
        </div>
      )
    } else {
      return (
        <div className="app">
          <Container fluid className="content">
            <Header />

            <Switch>
              <Route exact path="/" render={ (props) => 
                <Fuel {...props} fuel={this.state.fuel} vehicles={this.state.vehicles} companies={this.state.companies}/>
              }/>
              <Route exact path="/vehicles" render={ (props) => 
                <Vehicles {...props} vehicles={this.state.vehicles}/>
              }/>
            </Switch>
          </Container>

          <Footer />
        </div>
      )
    }
  }
}
export default App