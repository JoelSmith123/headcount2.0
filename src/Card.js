import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Card.css'

class Card extends Component {
  constructor({ location, stats, displayActiveCard, findByName, getLocationFromActiveCard }) {
    super();
    this.state = {
      selected: false
    }
  }

  cardStats = () => {
    const statValues = Object.values(this.props.stats).map(statValue => statValue)
    const statKeys = Object.keys(this.props.stats).map(statKey => statKey)

    return statKeys.map((key, index) => (
      <h4 className={'stats ' + (statValues[index] > 0.5 ? 'higher-stats' : 'lower-stats')} key={index}>{statKeys[index]}: {statValues[index]}</h4>
    ))    
  }

  handleClick = (event) => {
    const prevSelectedState = this.state.selected

    this.setState({
      selected: !prevSelectedState
    })

    this.props.getLocationFromActiveCard(this.props.location)
  }

  render() {
    return (
      <div className={this.state.selected ? 'Card active-card' : 'Card'} onClick={this.handleClick}>
        <h3 className='location'>{this.props.location}</h3>
          { this.cardStats() }
      </div>
    )    
  }
}

Card.propTypes = {
  location: PropTypes.string,
  stats: PropTypes.object
}

export default Card