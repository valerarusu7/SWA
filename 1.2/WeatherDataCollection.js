class WeatherDataCollection {
  getCurrentPlace() {
    return this.place;
  }
  clearCurrentPlace() {
    this.place = undefined;
  }
  getCurrentType() {
    return this.type;
  }
  setCurrentType(type) {
    this.type = type;
  }
  clearCurrentType() {
    this.type = undefined;
  }
  getCurrentPeriod() {
    return this.period;
  }
}

WeatherDataCollection.prototype.clearCurrentPeriod = function () {
  this.period = undefined;
};
WeatherDataCollection.prototype.setCurrentPeriod = function (period) {
  this.period = period;
};
WeatherDataCollection.prototype.setCurrentPlace = function (place) {
  this.place = place;
};

module.exports = WeatherDataCollection;
