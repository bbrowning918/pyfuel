import React, { Component } from "react"
import {Line} from 'react-chartjs-2'
import { groupBy, find, forEach } from 'lodash'
import moment, { utc }  from 'moment'
import { randomColor } from 'randomcolor'

class Fuel extends Component {
  constructor(props) {
    super()

    //should try and pass/inject these from the bootstrap theme
    this.hues = ['#3498DB', '#E74C3C', '#fd7e14', '#F39C12', '#18BC9C', '#e83e8c']

    //chart defaults and settings
    this.datetime_style = 'DD/MM/YYYY HH:mm'
    this.chart_height = 110
    this.chart_options = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            parser: this.datetime_style,
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
    }
  }

  //format a datetime and calculate L/100km so it can be placed on a chart
  formatDataPoint(datetime, liters, distance) {
    return ({
      //x asis is a datetime point matching our chosen style
      x: utc(datetime, moment.ISO_8601).format(this.datetime_style),
      //y axis is L/100km, rounded to 2 digits
      y: Number.parseFloat(liters / (distance / 100)).toFixed(2)
    })
  }

  //takes a lodash.groupBy object and formats our data for our chart
  formatDataSet(groups) {
    const dataset = []

    //extra counter used for colour generation
    let i = 0

    //arrow func to pass component scope
    forEach (groups, (fuel_array, vehicle_key) => {
      //generate a (random) colour sequentially by looping on our hues array
      //guarentees distinct (and hopefully appealing) colours up to hues.length
      const colour = randomColor({luminosity: 'bright', hue: this.hues[i % this.hues.length]})
      i++

      //pull vehicle data based on matching vehicle key (url)
      const vehicle = find(this.props.vehicles, function(v) { return v.url === vehicle_key})
      
      //loop through the fuel data and map it to x,y point coordinates
      const data_points = []
      for (const fuel_entry of fuel_array.values()){
        data_points.push(
          this.formatDataPoint(fuel_entry['date'],fuel_entry['liters'],fuel_entry['distance'])
        )
      }
      
      //construct and format our data for this vehicle and add to the set
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
    })

    return dataset
  }

  render() {
    //produces an object composed of arrays keyed on 'vehicle' (ie the vehicle's url)
    //the array's values are the fuel objects
    const data = groupBy(this.props.fuel, 'vehicle')

    return (
      <div>
      <h2>Fuel Economy</h2>
        <Line 
          data={{ datasets: this.formatDataSet(data) }}
          height={this.chart_height}
          options={this.chart_options}
        />
      </div>
    )
  }
}

export default Fuel