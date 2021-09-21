const WeatherDataCollection = require("./WeatherDataCollection");
const Temperature = require("./Temperature");
const Precipitation = require("./Precipitation");
const Wind = require("./Wind");

class WeatherHistory extends WeatherDataCollection {
  constructor(data) {
    super();
    this.weatherData = data;
  }
  add(data) {
    this.weatherData = data;
  }
  data() {
    return this.weatherData;
  }

  convertToUSUnits() {
    this.data().map((data) => {
      switch (data.constructor) {
        case Temperature:
          data.convertToF();
          break;
        case Precipitation:
          data.convertToInches();
          break;
        case Wind:
          data.convertToMPH();
          break;
      }
    });
  }

  convertToInternationalUnits() {
    this.data().map((data) => {
      switch (data.constructor) {
        case Temperature:
          data.convertToC();
          break;
        case Precipitation:
          data.convertToMM();
          break;
        case Wind:
          data.convertToMS();
          break;
      }
    });
  }
}

module.exports = WeatherHistory;
