const WeatherData = require("./WeatherData");

class Precipitation extends WeatherData {
  constructor(time, place, unit, value, precipitationType) {
    super(time, place, "Precipitation", unit, value);
    this._precipitationType = precipitationType;
  }

  precipitationType() {
    return this._precipitationType;
  }

  convertToInches() {
    if (this._unit === "in")
      return Precipitation(this.time, this.place, this.unit, this.value, this.precipitationType);

    unit = "in";
    value = this._value / 25.4;
    return Precipitation(this.time, this.place, unit, value, this.precipitationType);
  }

  convertToMM() {
    if (this._unit === "mm")
      return Precipitation(this.time, this.place, this.unit, this.value, this.precipitationType);

    unit = "mm";
    value = this._value * 25.4;
    return Precipitation(this.time, this.place, unit, value, this.precipitationType);
  }
}

module.exports = Precipitation;
