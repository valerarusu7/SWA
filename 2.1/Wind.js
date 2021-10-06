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
    if (this._unit === "mph")
      return new Wind(this.time, this.place, this.unit, this.value, this.direction);

    unit = "mph";
    value = this._value * 2.237;
    return new Wind(this.time, this.place, unit, value, this.direction)
  }

  convertToMS() {
    if (this._unit === "m/s")
      return new Wind(this.time, this.place, this.unit, this.value, this.direction);

    unit = "m/s";
    value = this._value / 2.237;
    return new Wind(this.time, this.place, unit, value, this.direction)
  }
}

module.exports = Wind;
