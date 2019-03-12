import React, { Component } from "react"
import {Line} from 'react-chartjs-2'
import { groupBy, find } from 'lodash'
import moment, { utc }  from 'moment'
import { randomColor } from 'randomcolor'

class Fuel extends Component {
  constructor(props) {
    super()
  }

  //formats chartable points from a data set
  //x axis is datetime
  //y axis is liters per 100 km
  chartFuelEconomy(date,liters,distance) {
    return {
      x: utc(date, moment.ISO_8601).format('MM/DD/YYYY HH:mm'),
      y: Number.parseFloat(liters / (distance / 100)).toFixed(2)
    }
  }

  render() {
    const dataset = []

    //produces an object composed of arrays keyed on 'vehicle' (ie a url)
    //that contains the grouped elements (fuel objects)
    const fuel_groups = groupBy(this.props.fuel, 'vehicle')

    //fuel_group[0] is the vehicle's url identifier
    //fuel_group[1] holds the array of fuel data
    for (const fuel_group of Object.entries(fuel_groups)){
      
      const data_points = []
      
      //pull vehicle data based on matching vehicle url
      const vehicle = find(this.props.vehicles, function(v) { return v.url === fuel_group[0]})

      //loop through the fuel data and map it to chartable objects (x,y)
      for (const fuel_entry of Object.values(fuel_group[1])){
        data_points.push(
          this.chartFuelEconomy(
            fuel_entry['date'],
            fuel_entry['liters'],
            fuel_entry['distance']
          )
        )
      }
      
      //generates a colour based on the url (bright and same hue as sample)
      const colour = randomColor({luminosity: 'bright', hue: '#3498DB', seed: fuel_group[0]})

      //construct and format our dataset for this vehicle and add to the set
      dataset.push({
        label: `${vehicle.year} ${vehicle.manufacturer} ${vehicle.model}`,
        fill: false,
        backgroundColor: colour,
        borderColor: colour,
        lineTension: 0,
        pointHoverRadius: 5,
        pointRadius: 5,
        pointHitRadius: 5,
        data: data_points
      })
    }

    return (
      <div>
      <h2>Fuel Economy</h2>
        <Line 
          data={{ datasets: dataset }}
          height={ 110 }
          options={{
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
    )
  }
}

export default Fuel