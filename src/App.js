import React, { Component } from 'react'
import kinderData from './data/kindergartners_in_full_day_program.js';
import './App.css'
import CardContainer from './CardContainer'
import DistrictRepository from './helper'

class App extends Component {
  constructor() {
    super();
    this.state = {
      repository: new DistrictRepository(kinderData),
      searchVal: '',
      activeCards: []
    }
  }

  handleSearchChange = (event) => {
    this.setState({
      searchVal: event.target.value
    })
  }

  updateCardSelect = () => {
    const { findByName } = this.state.repository
    const activeCardArr = []
    for(let i=0; i<this.state.activeCards.length; i++) {
      activeCardArr.push(findByName(this.state.activeCards[i]))
    }
    return activeCardArr
  }

  getLocationFromActiveCard = (location) => {
    if (this.state.activeCards.length <= 1) {
      this.setState({
        activeCards: [...this.state.activeCards, location]
      })      
    } else {
      return
    }
  }


  render() {
    const { findAllMatches, findAverage, compareDistrictAverages } = this.state.repository
    return (
      <div>
        <h1 className='title'>Welcome To Headcount 2.0</h1>
        <input className='search' type='search' value={this.state.searchVal} onChange={this.handleSearchChange} placeholder=' Search...' />
        <CardContainer  findAllMatches={findAllMatches}
                        updateCardSelect={this.updateCardSelect}
                        getLocationFromActiveCard={this.getLocationFromActiveCard}
                        searchVal={this.state.searchVal} 
                        activeCards={this.state.activeCards}
                        findAverage={findAverage}
                        compareDistrictAverages={compareDistrictAverages} />
      </div>
    );
  }
}

export default App;
