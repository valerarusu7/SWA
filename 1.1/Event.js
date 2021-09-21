export const Event = (time, place) => ({
  time,
  place,
  time() {
    return this.time;
  },
  place() {
    return this.place;
  },
});
