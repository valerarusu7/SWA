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
    if (this._unit === "mph")
      return new WindPrediction(this.time, this.place, this.unit, this.from, this.to, this.directions);

    unit = "mph";
    from = this._from * 2.237;
    to = this._to * 2.237;
    return new WindPrediction(this.time, this.place, unit, from, to, this.directions);
  }

  convertToMS() {
    if (this._unit === "m/s")
      return new WindPrediction(this.time, this.place, this.unit, this.from, this.to, this.directions);

    unit = "m/s";
    from = this._from / 2.237;
    to = this._to / 2.237;
    return new WindPrediction(this.time, this.place, unit, from, to, this.directions);
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
