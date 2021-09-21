const WeatherPrediction = require("./WeatherPrediction");

class TemperaturePrediction extends WeatherPrediction {
  constructor(time, place, unit, from, to) {
    super(time, place, "Temperature", unit, from, to);
  }

  convertToF() {
    if (this._unit === "F") return;

    this._unit = "F";
    this._to = (this._to * 9) / 5 + 32;
    this._from = (this._from * 9) / 5 + 32;
  }

  convertToC() {
    if (this._unit === "C") return;

    this._unit = "C";
    this._to = ((this._to - 32) * 5) / 9;
    this._from = ((this._from - 32) * 5) / 9;
  }
}

module.exports = TemperaturePrediction;
