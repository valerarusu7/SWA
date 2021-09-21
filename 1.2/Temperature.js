const WeatherData = require("./WeatherData");

class Temperature extends WeatherData {
  constructor(time, place, unit, value) {
    super(time, place, "Temperature", unit, value);
  }

  convertToF() {
    if (this._unit === "F") return;

    this._unit = "F";
    this._value = (this._value * 9) / 5 + 32;
  }

  convertToC() {
    if (this._unit === "C") return;

    this._unit = "C";
    this._value = ((this._value - 32) * 5) / 9;
  }
}

module.exports = Temperature;
