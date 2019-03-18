import React, { Component } from "react"
import { ToggleButton, ToggleButtonGroup} from 'react-bootstrap'
import { groupBy } from 'lodash'
import moment  from 'moment'
import FuelEcono from "./FuelEcono"
import FuelCompany from "./FuelCompany"

//overall state control for the different charting components related to fuel
//allows filtering by timeframes
class Fuel extends Component {
  constructor(props) {
    super(props)

    //colours should be assigned to vehicles and companies explicitly in state
    //instead of in each child components so they can be passed down (and not change)
    //something like: vehicles = assignColours(props.vehicles, colours)

    this.state = {
      timeframe: 'all',
      fuel: this.props.fuel
    }

    this.setFuelState = this.setFuelState.bind(this)
  }

  //given a timeframe, we update state.fuel to be the filtered set from props.fuel for that time frame
  setFuelState(timeframe) {
    const filtered_fuel = []
    for (const fuel of this.props.fuel){
      switch(timeframe) {
        case 'ytd':
          if(moment().startOf('year').isBefore(fuel.date)){
            filtered_fuel.push(fuel)
          } 
          break;
        case '12m':
          if(moment().subtract(12, 'months').isBefore(fuel.date)){
            filtered_fuel.push(fuel)
          }
          break;
        case '3yr':
          if(moment().subtract(3, 'years').isBefore(fuel.date)){
            filtered_fuel.push(fuel)
          }
          break;
        default: //synonymous with 'all' time, which is the same as props.fuel
          filtered_fuel.push(fuel) //could also just setState here and breakout early
      }
    }

    this.setState({timeframe: timeframe, fuel: filtered_fuel })
  }

  render() {
    //our toggle button group lets us filter the fuel data by a set of time spans
    //which we will reflect as a filtered set in the state and pass to child components for charting purposes

    //groupBy produces an object composed of arrays keyed on the value of the second arg
    //as an example 'vehicle' would have fuel.vehicle (ie a url) as a key
    //the array's values are the grouped entries for that key
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h2>Fuel Economy</h2>
          <ToggleButtonGroup
            type="radio"
            name="timeframe"
            value={this.state.timeframe}
            onChange={this.setFuelState}
          >
            <ToggleButton variant="outline-primary" value={'ytd'}>YTD</ToggleButton>
            <ToggleButton variant="outline-primary" value={'12m'}>Last 12 months</ToggleButton>
            <ToggleButton variant="outline-primary" value={'3yr'}>Last 3 years</ToggleButton>
            <ToggleButton variant="outline-primary" value={'all'}>All time</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <FuelEcono 
          fuel={groupBy(this.state.fuel, 'vehicle')}
          vehicles={this.props.vehicles}
        />
        <h4>Fill-ups by Company</h4>
        <FuelCompany
          fuel={groupBy(this.state.fuel, 'company')}
          companies={this.props.companies}
        />
      </div>
      
    )
  }
}

export default Fuel