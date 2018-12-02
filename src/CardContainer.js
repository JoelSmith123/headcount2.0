import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import './CardContainer.css'

const CardContainer = ({ findAllMatches, updateCardSelect, getLocationFromActiveCard, searchVal, activeCard }) => {
  const districts = findAllMatches(searchVal)
  const districtCards = districts.map((district, index) => (
    <Card {...district} key={index} displayActiveCard={this.displayActiveCard} getLocationFromActiveCard={getLocationFromActiveCard} />
  ))

  const selectedCardsArr = updateCardSelect()
  const selectedCards = () => {
    if (selectedCardsArr) {      
      return <Card {...selectedCardsArr} displayActiveCard={this.displayActiveCard} getLocationFromActiveCard={getLocationFromActiveCard} />
    }
  }

  return (
    <div className='CardContainer'>
      <div className='selectedCards'>
        { selectedCards() }
      </div>
      <div className='districtCards'>
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