class EventData {
  constructor(time, place, type, unit) {
    this._time = time;
    this._place = place;
    this._type = type;
    this._unit = unit;
  }

  time() {
    return this._time;
  }

  place() {
    return this._place;
  }

  type() {
    return this._type;
  }

  unit() {
    return this._unit;
  }
}

module.exports = EventData;
