import React, { Component } from "react"
import Table from 'react-bootstrap/Table'

class Vehicles extends Component {
  constructor(props) {
    super()
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
              {this.props.vehicles.map( vehicle =>
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
    )
  }
}
export default Vehicles