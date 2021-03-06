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
    return this.state.activeCards.reduce((acc, activeCard) => {
      acc.push(findByName(activeCard))
      return acc
    }, [])
  }

  getLocationFromActiveCard = (location) => {
    if (this.state.activeCards.length <= 1) {
      this.setState({
        activeCards: [...this.state.activeCards, location]
      })      
    } else {
      const replacedActiveCards = [...this.state.activeCards]
      replacedActiveCards.splice(1, 1, location)
      this.setState({
        activeCards: replacedActiveCards
      })
    }
  }

  render() {
    const { findAllMatches, findAverage, compareDistrictAverages } = this.state.repository
    return (
      <div className='App'>
        <header className='header'>
          <h1 className='title'>Welcome To Headcount 2.0</h1>
          <input className='search' type='search' value={this.state.searchVal} onChange={this.handleSearchChange} placeholder=' Search by district name...' />
        </header>
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
