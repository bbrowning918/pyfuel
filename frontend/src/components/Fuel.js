import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class Fuel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fuel: [],
    };
  }

  async componentDidMount() {
    axios.get('/fuel/')
      .then(res => {
        console.log(res);
        const fuel = res.data;
        this.setState({ fuel });
      })
  }

  render() {
    return (
      <div>
      <h2>Fuel</h2>
        <Table striped responsive="sm" size="sm">
            <thead>
            <tr>
                <th>Date</th>
                <th>Vehicle</th>
                <th>Liters</th>
                <th>Distance</th>
                <th>City</th>
                <th>Company</th>
                <th>Notes</th>
            </tr>
            </thead>
            <tbody>
              {this.state.fuel.map( fuel =>
                <tr key={fuel.id}>
                  <td>{fuel.date}</td>
                  <td>{fuel.vehicle}</td>
                  <td>{fuel.liters}</td>
                  <td>{fuel.distance}</td>
                  <td>{fuel.city}</td>
                  <td>{fuel.company}</td>
                  <td>{fuel.notes}</td>
                </tr>
              )}
            </tbody>
        </Table>
      </div>
    );
  }
}

export default Fuel;