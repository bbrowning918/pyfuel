import React, { Component } from "react"
import { ToggleButton, ToggleButtonGroup} from 'react-bootstrap'
import { Line } from 'react-chartjs-2'
import { groupBy, find, forEach } from 'lodash'
import moment, { utc }  from 'moment'
import { randomColor } from 'randomcolor'

class Fuel extends Component {
  constructor(props) {
    super(props)

    //produces an object composed of arrays keyed on 'vehicle' (ie the vehicle's url)
    //the array's values are the fuel objects
    this.grouped_fuel = groupBy(props.fuel, 'vehicle')

    //find a way to sync these to the theme colours instead
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

    //colours should be assigned to a vehicle explicitly instead of looping
    //pass down with the rest of it in props from App, something like:
    //this.vehicles = assignColours(props.vehicles, colours)

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

    this.state = {
      timeframe: 'all'
    }

    this.setTimeFrame = this.setTimeFrame.bind(this) //bind for our toggle buttons above the chart
  }

  setTimeFrame(timeframe) {
    this.setState({ timeframe });
  }

  //given a date we check if it would pass the filter for state.timeframe set by the radio toggle buttons
  checkTimeFrame(date) {
    switch(this.state.timeframe) {
      case 'ytd':
        if(moment().startOf('year').isBefore(date)){
          return true
        } else {
          return false
        }
      case '12m':
        if(moment().subtract(12, 'months').isBefore(date)){
          return true
        } else {
          return false
        }
      case '3yr':
        if(moment().subtract(3, 'years').isBefore(date)){
          return true
        } else {
          return false
        }
      case 'all':
        return true
      default:
        //you broke it D:
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

    //extra counter used for colour assignment
    let i = 0

    //arrow func to pass component scope
    forEach (groups, (fuel_array, vehicle_key) => {
      //pull vehicle data based on matching vehicle key (url)
      const vehicle = find(this.props.vehicles, function(v) { return v.url === vehicle_key})
      
      //loop through the fuel data and map it to x,y point coordinates
      const data_points = []
      for (const fuel_entry of fuel_array.values()){
        //filter the data so we only show the timeframe selected
        if(this.checkTimeFrame(fuel_entry['date'])){
          data_points.push(
            this.formatDataPoint(fuel_entry['date'],fuel_entry['liters'],fuel_entry['distance'])
          )
        }
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

    return dataset
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h2>Fuel Economy</h2>
          <ToggleButtonGroup
            type="radio"
            name="timeframe"
            value={this.state.timeframe}
            onChange={this.setTimeFrame}
          >
            <ToggleButton variant="outline-primary" value={'ytd'}>YTD</ToggleButton>
            <ToggleButton variant="outline-primary" value={'12m'}>Last 12 months</ToggleButton>
            <ToggleButton variant="outline-primary" value={'3yr'}>Last 3 years</ToggleButton>
            <ToggleButton variant="outline-primary" value={'all'}>All time</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Line 
          data={{ datasets: this.formatDataSet(this.grouped_fuel) }}
          height={this.chart_height}
          options={this.chart_options}
        />
      </div>
    )
  }
}

export default Fuel