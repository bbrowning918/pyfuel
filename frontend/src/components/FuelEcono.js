import React, { Component } from "react"
import { Line } from 'react-chartjs-2'
import { find, forEach } from 'lodash'
import moment, { utc }  from 'moment'
import { randomColor } from 'randomcolor'

//this charts the fuel economy of each fuel entry, further grouped by each vehicle
class FuelEcono extends Component {
  constructor(props) {
    super(props)

    //these should be passed in as props and tied to a specific vehicle
    this.colours = ['#3498DB', '#E74C3C', '#fd7e14', '#F39C12', '#18BC9C', '#e83e8c']

    //in the event we have more vehicles than colours, we want each one to
    //be distinct in some way but still fit in asthetically with everything
    //the first colours.length number of vehicles will use the base colours
    const original_length = this.colours.length
    for (let i = original_length; i < this.props.vehicles.length; i ++) {
      this.colours.push(
        //for any vehicles past than length index we will generate
        //a new colour based on an original, we looping through the set
        //for an even distribution of hues
        randomColor({luminosity: 'bright', hue: this.colours[i % original_length]})
      )
    }

    //chart defaults and settings, use state once we need to change them
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

  //takes a lodash.groupBy object
  //the vehicle (url) is the key to each array
  //the array itself is all the fuel entries macthed to that vehicle
  formatDataSet(groups) {
    const dataset = []

    //extra counter used for colour assignment
    let i = 0

    //break down our groups into keys and values
    forEach (groups, (fuel_array, vehicle_key) => {

      //pull vehicle data based on matching vehicle_key to a vehicle url
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
        backgroundColor: this.colours[i], //assumption that this will exist and not overrun, should be vehicle.colour
        borderColor: this.colours[i],
        lineTension: 0,
        pointHoverRadius: 5,
        pointRadius: 5,
        pointHitRadius: 5,
        data: data_points
      })

      i++
    })

    //pass back a fomratted dataset for the line chart
    return dataset
  }

  render() {
    return (
      <Line 
        data={{ datasets: this.formatDataSet(this.props.fuel) }}
        height={this.chart_height}
        options={this.chart_options}
      />
    )
  }
}

export default FuelEcono