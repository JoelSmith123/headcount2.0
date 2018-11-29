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
    const district = Object.values(this.stats).find(location => {
        return location.location === districtName
      })
    const districtStats = Object.values(district.stats)
    const districtTotal = districtStats.reduce((acc, stat) => {
      return acc += stat
    }, 0)

    return Math.round((districtTotal / districtStats.length) * 1000) / 1000 
  }

  compareDistrictAverages = (districtOne, districtTwo) => {
    districtOne = districtOne.toUpperCase()
    districtTwo = districtTwo.toUpperCase()
    const districtOneAvg = this.findAverage(districtOne)
    const districtTwoAvg = this.findAverage(districtTwo)

    return {[districtOne]: districtOneAvg, [districtTwo]: districtTwoAvg, 'compared': Math.round((districtOneAvg / districtTwoAvg) * 1000) / 1000}
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

