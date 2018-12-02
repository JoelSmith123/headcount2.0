import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import './CardContainer.css'

class CardContainer extends Component {
  constructor({ findAllMatches,
                updateCardSelect, 
                getLocationFromActiveCard, 
                searchVal, 
                activeCards,
                findAverage,
                compareDistrictAverages }) {
    super();
  }

  districtCards = () => {
    const districts = this.props.findAllMatches(this.props.searchVal)
    return districts.map((district, index) => (
      <Card {...district} key={index} displayActiveCard={this.props.activeCards.includes(district.location)} getLocationFromActiveCard={this.props.getLocationFromActiveCard} />
    ))    
  }

  selectedCards = () => {
    const selectedCardsArr = this.props.updateCardSelect()
    if (selectedCardsArr[0] && !selectedCardsArr[1]) {    
       return selectedCardsArr.map((selectedCard, index) => (
        <Card {...selectedCard} displayActiveCard={true} key={index} getLocationFromActiveCard={this.props.getLocationFromActiveCard} />
      ))
    } else if (selectedCardsArr[1] && !selectedCardsArr[2]) {
      const preComparedCardsArr = selectedCardsArr.map((selectedCard, index) => (
        <Card {...selectedCard} displayActiveCard={true} key={index} getLocationFromActiveCard={this.props.getLocationFromActiveCard} />
      ))
      const comparingCard = <Card 
                              firstCardTitle={selectedCardsArr[0].location}
                              secondCardTitle={selectedCardsArr[1].location}
                              firstCardAverage={this.props.findAverage(selectedCardsArr[0].location)}
                              secondCardAverage={this.props.findAverage(selectedCardsArr[1].location)}
                              comparedAverages={this.props.compareDistrictAverages(selectedCardsArr[0].location, selectedCardsArr[1].location)}
                              key={Date.now()} />

      preComparedCardsArr.splice(1, 0, comparingCard)
      return preComparedCardsArr
    } 
  }

  render() {    
    return (
      <div className='CardContainer'>
        <div className={this.selectedCards() ? 'selected-cards selected-cards-active' : 'selected-cards'}>
          { this.selectedCards() }
        </div>
        <div className='district-cards'>
          { this.districtCards() }    
        </div>
      </div>
    )
  }
}

CardContainer.propTypes = {
  findAllMatches: PropTypes.func,
  updateCardSelect: PropTypes.func,
  getLocationFromActiveCard: PropTypes.func,
  searchVal: PropTypes.string,
  activeCards: PropTypes.array,
  findAverage: PropTypes.func,
  compareDistrictAverages: PropTypes.func
}

export default CardContainer

