const WeatherPrediction = require("./WeatherPrediction");

class CloudCoveragePrediction extends WeatherPrediction {
  constructor(time, place, unit, from, to) {
    super(time, place, "CloudCoverage", unit, from, to);
  }
}

module.exports = CloudCoveragePrediction;
