export default class DistrictRepository {
  constructor(stats) {
    this.stats = stats.reduce((acc, stat) => {
      if (!acc[stat.Location.toUpperCase()]) {
        acc[stat.Location.toUpperCase()] = {
          location: stat.Location.toUpperCase()            
        };

        acc[stat.Location.toUpperCase()].stats = {
          ...acc[stat.Location.toUpperCase()].stats,       
          [stat.TimeFrame]: isNaN(stat.Data) ? 0 : Math.round(stat.Data * 1000) / 1000
        };

      } else {
        acc[stat.Location.toUpperCase()].location = stat.Location.toUpperCase();
        acc[stat.Location.toUpperCase()].stats = {
          ...acc[stat.Location.toUpperCase()].stats,       
          [stat.TimeFrame]: isNaN(stat.Data) ? 0 : Math.round(stat.Data * 1000) / 1000
        }
      }
      return acc
    }, {})
  }

  findByName = (name) => {
    if (!name) {
      return
    } else {
      name = name.toUpperCase()
      const matchingLocations = Object.keys(this.stats).filter(location => {
        return location.includes(name)
      })
      return matchingLocations.map(location => {
        return this.stats[location]
      })
    }
  }

  findAllMatches = (searchVal) => {
    if (!searchVal) {
      return Object.values(this.stats)
    } else if (Object.keys(this.stats).includes(searchVal.toUpperCase())){
      searchVal = searchVal.toUpperCase();
      return Object.values(this.stats[searchVal])
    } else {
      return []
    }
  }

}
