const WeatherPrediction = require("./WeatherPrediction");

class TemperaturePrediction extends WeatherPrediction {
  constructor(time, place, unit, from, to) {
    super(time, place, "Temperature", unit, from, to);
  }

  convertToF() {
    if (this._unit === "F")
      return new TemperaturePrediction(this.time, this.place, this.unit, this.from, this.to);

    unit = "F";
    to = (this._to * 9) / 5 + 32;
    from = (this._from * 9) / 5 + 32;
    return new TemperaturePrediction(this.time, this.place, unit, from, to);
  }

  convertToC() {
    if (this._unit === "C")
      return new TemperaturePrediction(this.time, this.place, this.unit, this.from, this.to);

    unit = "C";
    to = ((this._to - 32) * 5) / 9;
    from = ((this._from - 32) * 5) / 9;
    return new TemperaturePrediction(this.time, this.place, unit, from, to);
  }
}

module.exports = TemperaturePrediction;
