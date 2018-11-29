import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

const Card = ({ location, stats }) => {

  const statValues = Object.values(stats).map(statValue => statValue)
  const statKeys = Object.keys(stats).map(statKey => statKey)

  const statPairs = statKeys.map((key, index) => (
    <h4 className={'stats ' + (statValues[index] > 0.5 ? 'higher-stats' : 'lower-stats')} key={index}>{statKeys[index]}: {statValues[index]}</h4>
  ))

  return (
    <div className='Card'>
      <h3 className='location'>{location}</h3>
      { statPairs }
    </div>
  )
}

Card.propTypes = {
  location: PropTypes.string,
  stats: PropTypes.object
}

export default Card