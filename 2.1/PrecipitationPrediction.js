const WeatherPrediction = require("./WeatherPrediction");

class PrecipitationPrediction extends WeatherPrediction {
  constructor(time, place, unit, from, to, types) {
    super(time, place, "Precipitation", unit, from, to);
    this._types = types;
  }

  types() {
    return this._types;
  }

  convertToInches() {
    if (this._unit === "in")
      return new PrecipitationPrediction(this.time, this.place, this.unit, this.from, this.to, this.types)

    unit = "in";
    from = this._from / 25.4;
    to = this._to / 25.4;
    return new PrecipitationPrediction(this.time, this.place, unit, from, to, this.types)
  }

  convertToMM() {
    if (this._unit === "mm")
      return new PrecipitationPrediction(this.time, this.place, this.unit, this.from, this.to, this.types)

    unit = "mm";
    from = this._from * 25.4;
    to = this._to * 25.4;
    return new PrecipitationPrediction(this.time, this.place, unit, from, to, this.types)
  }

  //should match place, type, unit, and data.value should be between from/to and types should include the data.precipitationType
  matches(data) {
    return (
      this.place() == data.place() &&
      this.type() == data.type() &&
      this.unit() == data.unit() &&
      this.from() <= data.value() &&
      data.value() <= this.to() &&
      this.types.includes(data.precipitationType())
    );
  }
}

module.exports = PrecipitationPrediction;
