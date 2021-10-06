const EventData = require("./EventData");

class WeatherData extends EventData {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit);
    this._value = value;
  }

  value() {
    return this._value;
  }

  toString() {
    return `Time: ${this.time()}, Place: ${this.place()}, Type: ${this.type()}, Value/unit: ${this.value()} ${this.unit()}`;
  }
}

module.exports = WeatherData;
