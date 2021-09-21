const WeatherPrediction = require("./WeatherPrediction");

class WindPrediction extends WeatherPrediction {
  constructor(time, place, unit, from, to, directions) {
    super(time, place, "Wind", unit, from, to);
    this._directions = directions;
  }

  directions() {
    return this._directions;
  }

  convertToMPH() {
    if (this._unit === "mph") return;

    this._unit = "mph";
    this._from *= 2.237;
    this._to *= 2.237;
  }

  convertToMS() {
    if (this._unit === "m/s") return;

    this._unit = "m/s";
    this._from /= 2.237;
    this._to /= 2.237;
  }

  //should match place, type, unit, and data.value should be between from/to and directions should include the data.directions
  matches(data) {
    return (
      this.place() == data.place() &&
      this.type() == data.type() &&
      this.unit() == data.unit() &&
      this.from() <= data.value() &&
      data.value() <= this.to() &&
      this.directions().includes(data.direction())
    );
  }
}

module.exports = WindPrediction;
