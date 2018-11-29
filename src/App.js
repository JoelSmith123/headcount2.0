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
      searchVal: ''
    }
  }

  handleSearchChange = (event) => {
    this.setState({
      searchVal: event.target.value
    })
  }

  render() {
    const { findAllMatches, findByName } = this.state.repository
    return (
      <div>
        <h1 className='title'>Welcome To Headcount 2.0</h1>
        <input className='search' type='search' value={this.state.searchVal} onChange={this.handleSearchChange} placeholder=' Search...' />
        <CardContainer findAllMatches={findAllMatches} findByName={findByName} searchVal={this.state.searchVal} />
      </div>
    );
  }
}

export default App;
