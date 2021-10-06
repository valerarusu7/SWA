const WeatherData = require("./WeatherData");

class Temperature extends WeatherData {
  constructor(time, place, unit, value) {
    super(time, place, "Temperature", unit, value);
  }

  convertToF() {
    if (this._unit === "F")
      return new Temperature(this.time, this.place, this.unit, this.value);
    unit = "F";
    value = (this._value * 9) / 5 + 32;
    return new Temperature(this.time, this.place, unit, value);
  }

  convertToC() {
    if (this._unit === "C")
      return new Temperature(this.time, this.place, this.unit, this.value);

    unit = "C";
    value = ((this._value - 32) * 5) / 9;
    return new Temperature(this.time, this.place, unit, value);
  }
}

module.exports = Temperature;
