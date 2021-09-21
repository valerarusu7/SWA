const EventData = require("./EventData");

class WeatherPrediction extends EventData {
  constructor(time, place, type, unit, from, to) {
    super(time, place, type, unit);
    this._from = from;
    this._to = to;
  }

  from() {
    return this._from;
  }

  to() {
    return this._to;
  }

  matches(data) {
    return (
      this.place() == data.place() &&
      this.type() == data.type() &&
      this.unit() == data.unit() &&
      this.from() <= data.value() &&
      data.value() <= this.to()
    );
  }

  toString() {
    return `Time: ${this.time()}, Place: ${this.place()}, Type: ${this.type()}, To-From (unit): ${this.from()}-${this.to()} (${this.unit()})`;
  }
}

module.exports = WeatherPrediction;
