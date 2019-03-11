import React, { Component } from "react"
import {Line} from 'react-chartjs-2'
import axios from 'axios'
import { groupBy } from 'lodash'
import moment, { utc }  from 'moment'
import { randomColor } from 'randomcolor'

class Fuel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fuel: []
    }
  }

  //format inputs into chartable points
  chartFuelEntry(date,liters,distance) {
    return {
      x: utc(date, moment.ISO_8601).format('MM/DD/YYYY HH:mm'),
      y: Number.parseFloat(liters / (distance / 100)).toFixed(2)
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/fuel/')

    const fuel = []

    //produces an object composed of keys of 'vehicle' (url)
    //each key is an array of the grouped elements (fuel url results)
    const vehicles = groupBy(data, 'vehicle')

    //vehicle[0] is the vehicle's url
    //vehicle[1] holds an array of objects matching the response's json
    for (const vehicle of Object.entries(vehicles)){
      
      const vehicle_fuel = []
      
      //pull vehicle info from url
      const info = await axios.get(vehicle[0])

      //loop through the fuel data and map it to chartable objects (x,y)
      for (const fuel_entry of Object.values(vehicle[1])){
        vehicle_fuel.push(
          this.chartFuelEntry(
            fuel_entry['date'],
            fuel_entry['liters'],
            fuel_entry['distance']
            )
          )
      }
      
      //generate something hopefully different but not too different for the set
      const colour = randomColor({luminosity: 'bright', hue: '#3498DB'})

      //construct our dataset for this vehicle
      fuel.push({
        label: `${info.data.year} ${info.data.manufacturer} ${info.data.model}`,
        fill: false,
        backgroundColor: colour,
        borderColor: '#ecf0f1',
        borderCapStyle: 'butt',
        borderJoinStyle: 'butt',
        pointBorderWidth: 1,
        lineTension: 0,
        pointHoverRadius: 5,
        pointRadius: 5,
        pointHitRadius: 15,
        data: vehicle_fuel
      })
    }

    this.setState({
      fuel : fuel
    })
  }

  render() {
    return (
      <div>
      <h2>Fuel</h2>
        <Line 
          data={{ datasets: this.state.fuel }}
          options={{
            responsive: true,
            hover: 'dataset',
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  parser: 'MM/DD/YYYY HH:mm',
                  tooltipFormat: 'll HH:mm'
                },
                scaleLabel: {
                  display: true,
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'L/100km'
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}

export default Fuel