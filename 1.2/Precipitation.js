const WeatherData = require("./WeatherData");

class Precipitation extends WeatherData {
  constructor(time, place, unit, value, precipitationType) {
    super(time, place, "Precipitation", unit, value);
    this._precipitationType = precipitationType;
  }

  precipitationType() {
    return this._precipitationType;
  }

  convertToInches() {
    if (this._unit === "in") return;

    this._unit = "in";
    this._value /= 25.4;
  }

  convertToMM() {
    if (this._unit === "mm") return;

    this._unit = "mm";
    this._value *= 25.4;
  }
}

module.exports = Precipitation;
