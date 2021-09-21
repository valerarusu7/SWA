export const DataType = (type, unit) => ({
  type,
  unit,
  type() {
    return this.type;
  },
  unit() {
    return this.unit;
  },
});
