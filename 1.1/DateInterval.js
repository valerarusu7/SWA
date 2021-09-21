export const DateInterval = (from, to) => ({
  from,
  to,
  from() {
    return this.from;
  },
  to() {
    return this.to;
  },
  contains(date) {
    return this.from <= date && date <= this.to;
  },
});
