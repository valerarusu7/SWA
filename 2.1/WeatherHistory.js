const WeatherData = require("./WeatherData")
const Temperature = require("./Temperature");
const Precipitation = require("./Precipitation");
const Wind = require("./Wind");
const DateInterval = require("./DateInterval");

class WeatherHistory {
  constructor(data) {
    this.weatherData = data;
  }

  forPlace(place) {
    return new WeatherHistory(this.data().filter(element => element.place == place));
  }

  forType(type) {
    return new WeatherHistory(this.data().filter(element => element.type == type));
  }

  forPeriod(period) {
    return new WeatherHistory(this.data().map(element => {
      if (period.contains(element.time)) {
        return element;
      }
    }));
  }

  including(data) {
    return new WeatherHistory(this.data().concat(data));
  }

  convertToUSUnits() {
    return new WeatherHistory(this.data().map((data) => {
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
    }));
  }

  convertToInternationalUnits() {
    return new WeatherHistory(this.data().map((data) => {
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
    }));
  }

  lowestValues() {
    if (this.data() === undefined || this.data().length == 0) {
      return undefined
    }
    if (this.data().every(e => e.type !== this.data()[0].type)) {
      return undefined
    }
    return this.data().reduce((a, b) => Math.min(a.value, b.value));
  }

  data() {
    return this.weatherData;
  }
}

module.exports = WeatherHistory;
