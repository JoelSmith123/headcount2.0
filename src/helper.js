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

  findAverage = (districtName) => {
    // console.log(this.stats[districtName])
    return
  }

  findByName = (name) => {
    if (!name) {
      return 
    } else {
      name = name.toUpperCase()
      return Object.values(this.stats).find(location => {
        return location.location === name
      })
    }
  }

  findAllMatches = (searchVal) => {
    if (!searchVal) {
      return Object.values(this.stats)
    } else {
      searchVal = searchVal.toUpperCase();

      const matchingLocations = Object.keys(this.stats).filter(location => {
        return location.includes(searchVal)
      })

      if (matchingLocations[0] === undefined) {
        return []
      } else {
        return matchingLocations.map(location => {
          return this.stats[location]
        })        
      }
    }
  }
}

