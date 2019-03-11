import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import axios from 'axios'

class Vehicles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vehicles: [],
    }
  }

  async componentDidMount() {
    axios.get('/vehicles/')
      .then(json => {
        this.setState({ vehicles: json.data })
      })
  }

  render() {
    return (
      <div>
      <h2>Vehicles</h2>
        <Table striped responsive="sm" size="sm">
            <thead>
            <tr>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>VIN</th>
                <th>Displacement</th>
            </tr>
            </thead>
            <tbody>
              {this.state.vehicles.map( vehicle =>
                <tr key={vehicle.id}>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.manufacturer}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.vin}</td>
                  <td>{vehicle.engine_displacement_liters}L</td>
                </tr>
              )}
            </tbody>
        </Table>
      </div>
    );
  }
}

export default Vehicles