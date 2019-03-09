import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class Vehicles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: [],
    };
  }

  async componentDidMount() {
    axios.get('/vehicles/')
      .then(res => {
        console.log(res);
        const vehicles = res.data;
        this.setState({ vehicles });
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
            </tr>
            </thead>
            <tbody>
              {this.state.vehicles.map( vehicle =>
                <tr key={vehicle.id}>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.manufacturer}</td>
                  <td>{vehicle.model}</td>
                </tr>
              )}
            </tbody>
        </Table>
      </div>
    );
  }
}

export default Vehicles;