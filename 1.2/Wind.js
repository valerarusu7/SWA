const WeatherData = require("./WeatherData");

class Wind extends WeatherData {
  constructor(time, place, unit, value, direction) {
    super(time, place, "Wind", unit, value);
    this._direction = direction;
  }

  direction() {
    return this._direction;
  }

  convertToMPH() {
    if (this._unit === "mph") return;

    this._unit = "mph";
    this._value *= 2.237;
  }

  convertToMS() {
    if (this._unit === "m/s") return;

    this._unit = "m/s";
    this._value /= 2.237;
  }
}

module.exports = Wind;
