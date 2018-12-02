import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import './CardContainer.css'

const CardContainer = ({ findAllMatches,
                         updateCardSelect, 
                         getLocationFromActiveCard, 
                         searchVal, 
                         activeCards,
                         findAverage,
                         compareDistrictAverages
 }) => {
  const districts = findAllMatches(searchVal)
  const districtCards = districts.map((district, index) => (
    <Card {...district} key={index} displayActiveCard={false} getLocationFromActiveCard={getLocationFromActiveCard} />
  ))

  const selectedCardsArr = updateCardSelect()
  const selectedCards = () => {
    if (selectedCardsArr[0] && !selectedCardsArr[1]) {    
       return selectedCardsArr.map((selectedCard, index) => (
        <Card {...selectedCard} displayActiveCard={true} key={index} getLocationFromActiveCard={getLocationFromActiveCard} />
      ))
    } else if (selectedCardsArr[1] && !selectedCardsArr[2]) {
      const preComparedCardsArr = selectedCardsArr.map((selectedCard, index) => (
        <Card {...selectedCard} displayActiveCard={true} key={index} getLocationFromActiveCard={getLocationFromActiveCard} />
      ))
      const comparingCard = <Card 
                              firstCardTitle={selectedCardsArr[0].location}
                              secondCardTitle={selectedCardsArr[1].location}
                              firstCardAverage={findAverage(selectedCardsArr[0].location)}
                              secondCardAverage={findAverage(selectedCardsArr[1].location)}
                              comparedAverages={compareDistrictAverages(selectedCardsArr[0].location, selectedCardsArr[1].location)}
                              key={Date.now()} />

      preComparedCardsArr.splice(1, 0, comparingCard)
      return preComparedCardsArr
    } 
  }

  return (
    <div className='CardContainer'>
      <div className={selectedCards() ? 'selected-cards selected-cards-active' : 'selected-cards'}>
        { selectedCards() }
      </div>
      <div className='district-cards'>
        { districtCards }    
      </div>
    </div>
  )
}

CardContainer.propTypes = {
  findAllMatches: PropTypes.func,
  findByName: PropTypes.func,
  searchVal: PropTypes.string
}

export default CardContainer

