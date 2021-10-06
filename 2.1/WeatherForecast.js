const WeatherDataCollection = require("./WeatherDataCollection");
const TemperaturePrediction = require("./TemperaturePrediction");
const PrecipitationPrediction = require("./PrecipitationPrediction");
const WindPrediction = require("./WindPrediction");

class WeatherForecast {
  constructor(data) {
    this.weatherPredictions = data;
  }

  forPlace(place) {
    return new WeatherForecast(this.data().filter(element => element.place == place));
  }

  forType(type) {
    return new WeatherForecast(this.data().filter(element => element.type == type));
  }

  forPeriod(period) {
    return new WeatherForecast(
      this.data().map(element => {
        if (period.contains(element)) {
          return element;
        }
      })
    )
  }

  /**
   *  Documentation on implementation of this method is not sufficient. Therefore, I assume that
   *  all the elements of the array have to exist inside the object.  
   *
   */
  including(data) {
    if (data.every(element => this.data().includes(element))) {
      return new WeatherForecast(data);
    } else {
      return null;
    }
  }

  convertToUSUnits() {
    return new WeatherForecast(this.data().map((data) => {
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
    }));
  }

  convertToInternationalUnits() {
    return new WeatherForecast(this.data().map((data) => {
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
    }));
  }


  /**
   * Poor documentation. I have to make assumption that the method should return undefined
   * in case of different types.
   */
  averageFromValue() {
    if (this.data() === undefined || this.data().length == 0) {
      return undefined
    }
    if (this.data().every(e => e.type !== this.data()[0].type)) {
      return undefined
    }
    return this.data().reduce((p, c) => p.from() + c.from(), 0) / this.data().length;
  }

  /**
   * Poor documentation. I have to make assumption that the method should return undefined
   * in case of different types.
   */
  averageToValue() {
    if (this.data() === undefined || this.data().length == 0) {
      return undefined
    }
    if (this.data().every(e => e.type !== this.data()[0].type)) {
      return undefined
    }
    return this.data().reduce((p, c) => p.to() + c.to(), 0) / this.data().length;
  }

  data() {
    return this.weatherPredictions;
  }
}

module.exports = WeatherForecast;
