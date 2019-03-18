import React, { Component } from "react"
import { Doughnut } from 'react-chartjs-2'
import { find, forEach } from 'lodash'
import { randomColor } from 'randomcolor'

//quick and dirty, goal is a stateless componenet that just renders the doughnut
//this charts how many times each company was used to fill up for any set of fuel entries
class FuelCompany extends Component {
  constructor(props) {
    super(props)

    //colours should be passed in as props so they're consistent and tied to a company
    //currenly quite wonky as the set of companies can change based on timeframe of the fuel
    //so the same company isn't a consistent colour across timeframes
    this.colours = ['#3498DB', '#E74C3C', '#fd7e14', '#F39C12', '#18BC9C', '#e83e8c']

    
    //in the event we have more companies than colours, we want each one to
    //be distinct in some way but still fit in asthetically with everything
    //the first colours.length number of companies will use the base colours
    const original_length = this.colours.length
    for (let i = original_length; i <this.props.companies.length; i ++) {
      this.colours.push(
        //for any companies past than length index we will generate
        //a new colour based on an original, we looping through the set
        //for an even distribution of hues
        randomColor({luminosity: 'bright', hue: this.colours[i % original_length]})
      )
    }
  }

  //we're expecting a lodash.groupBy object
  //the fuel company (it's API url) is the key to each array
  //the array itself is all the fuel entries macthed to that company
  formatData(groups) {
    const data = []
    const backgroundColor = []
    const hoverBackgroundColor = []
    const labels = []

    //extra counter used for colour assignment
    let i = 0

    //break down groups into keys and values
    forEach (groups, (fuel_array, company_key) => {

      //retrieve the actual company by matching company_key to a company url
      const company = find(this.props.companies, function(c) { return c.url === company_key})

      //format our data for the doughnut chart
      //label it by name, and show how many fillups happened at that company
      labels.push(`${company.name}`)
      data.push(fuel_array.length)
      hoverBackgroundColor.push(this.colours[i])
      backgroundColor.push(this.colours[i])

      i++
    })

    //kick back a formatted object for the doughtnut to render
    return {
      labels: labels, 
      datasets: [{
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor
      }] 
    }
  }

  //given the number of companies a better colour scheme is needed to address the legend
  //the colour set is often too similiar for it to be useful so as of right now we just hide it
  render() {
    return (
      <Doughnut 
        data={this.formatData(this.props.fuel)}
        options={{legend: {display: false}}}
      />
    )
  }
}

export default FuelCompany