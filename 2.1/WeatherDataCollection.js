class WeatherDataCollection {
  getCurrentPlace() {
    return this.place;
  }
  setCurrentPlace(place) {
    this.place = place;
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
  setCurrentPeriod(period) {
    this.period = period;
  }
  clearCurrentPeriod() {
    this.period = undefined;
  }
}

module.exports = WeatherDataCollection;
