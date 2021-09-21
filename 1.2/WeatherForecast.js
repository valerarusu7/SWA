const WeatherDataCollection = require("./WeatherDataCollection");
const TemperaturePrediction = require("./TemperaturePrediction");
const PrecipitationPrediction = require("./PrecipitationPrediction");
const WindPrediction = require("./WindPrediction");

class WeatherForecast extends WeatherDataCollection {
  constructor(data) {
    super();
    this.weatherPredictions = data;
  }

  add(data) {
    this.weatherPredictions = data;
  }

  data() {
    return this.weatherPredictions;
  }

  convertToUSUnits() {
    this.data().map((data) => {
      switch (data.constructor) {
        case TemperaturePrediction:
          data.convertToF();
          break;
        case PrecipitationPrediction:
          data.convertToInches();
          break;
        case WindPrediction:
          data.convertToMPH();
          break;
      }
    });
  }

  convertToInternationalUnits() {
    this.data().map((data) => {
      switch (data.constructor) {
        case TemperaturePrediction:
          data.convertToC();
          break;
        case PrecipitationPrediction:
          data.convertToMM();
          break;
        case WindPrediction:
          data.convertToMS();
          break;
      }
    });
  }
}

module.exports = WeatherForecast;
