class DateInterval {
  constructor(from, to) {
    this._from = from;
    this._to = to;
  }

  from() {
    return this._from;
  }

  to() {
    return this._to;
  }

  contains(date) {
    return this._from <= date && date <= this._to;
  }
}

module.exports = DateInterval;
