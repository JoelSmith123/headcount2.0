import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Card.css'

class Card extends Component {
  constructor({ location,
                stats, 
                displayActiveCard, 
                findByName, 
                getLocationFromActiveCard,
                comparedAverages }) {
    super();
    this.state = {
      selected: false
    }
  }

  componentDidMount() {
    if (this.props.displayActiveCard) {
      this.setState({selected: true})
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
    if (!this.props.firstCardTitle) {
      return (
        <div className={this.state.selected ? 'Card active-card' : 'Card'} onClick={this.handleClick}>
          <h3 className='location'>{this.props.location}</h3>
            { this.cardStats() }
        </div>
      )          
    } else {
      return (
        <div className='Card active-card comparing-card'>
          <h3 className='location location-comparison'>{Object.keys(this.props.comparedAverages)[0]}:</h3>
          <h3 className='average'>{Object.values(this.props.comparedAverages)[0]}</h3>
          <h3 className='combined-average-title'>COMBINED AVERAGE:</h3>
          <h3 className='combined-average-value'>{Object.values(this.props.comparedAverages)[2]}</h3>
          <h3 className='location location-comparison'>{Object.keys(this.props.comparedAverages)[1]}:</h3>
          <h3 className='average'>{Object.values(this.props.comparedAverages)[1]}</h3>
        </div>
      )
    }
  }
}

Card.propTypes = {
  location: PropTypes.string,
  stats: PropTypes.object,
  displayActiveCard: PropTypes.bool,
  findByName: PropTypes.func,
  getLocationFromActiveCard: PropTypes.func,
  comparedAverages: PropTypes.object
}

export default Card

