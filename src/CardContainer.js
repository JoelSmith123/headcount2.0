import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import './CardContainer.css'

const CardContainer = ({ findAllMatches, findByName, searchVal }) => {
  const districts = findAllMatches(searchVal)
  const districtCards = districts.map((district, index) => (
    <Card {...district} key={index} />
  ))

  return (
    <div className='CardContainer'>
      { districtCards }
    </div>
  )
}

CardContainer.propTypes = {
  findAllMatches: PropTypes.func,
  findByName: PropTypes.func,
  searchVal: PropTypes.string
}

export default CardContainer