const WeatherData = require("./WeatherData");

class CloudCoverage extends WeatherData {
  constructor(time, place, unit, value) {
    super(time, place, "CloudCoverage", unit, value);
  }
}

module.exports = CloudCoverage;
