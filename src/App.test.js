import App from './App';
import React from 'react'
import { shallow, mount } from 'enzyme'


describe('App', () => {
  test('matches the snapshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

  test('updates state on searchVal change', () => {
    const wrapper = mount(<App />)
    const instance = wrapper.instance()
    const mockEvent = {
      preventDefault() {},
      target: {value: 'COLORADO'}
    }
    instance.handleSearchChange(mockEvent);
    expect(wrapper.state().searchVal).toEqual('COLORADO')
  })

  test('returns selected cards based on state', () => {
    const wrapper = mount(<App />)
    const instance = wrapper.instance()
    const mockObject = {
      location: 'COLORADO',
      stats: {
        2004: 0.24,
        2005: 0.278,
        2006: 0.337,
        2007: 0.395,
        2008: 0.536,
        2009: 0.598,
        2010: 0.64,
        2011: 0.672,
        2012: 0.695,
        2013: 0.703,
        2014: 0.741
      }
    }
    wrapper.setState({activeCards: ['COLORADO']})
    expect(instance.updateCardSelect()).toEqual([mockObject])
  })

  test('updates state when a card is selected', () => {
    const wrapper = mount(<App />)
    const instance = wrapper.instance()
    instance.getLocationFromActiveCard('COLORADO')
    expect(wrapper.state().activeCards[0]).toEqual('COLORADO')
  })  
})


