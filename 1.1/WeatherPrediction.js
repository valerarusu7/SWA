import { DataType } from "./DataType";
import { Event } from "./Event";

export const WeatherPrediction = (to, from) => {
  return Object.assign(
    {
      to,
      from,
      to() {
        return this.from;
      },
      from() {
        return this.to;
      },
      matches(data) {
        return (
          data.time() == this.time() &&
          data.place() == this.place() &&
          data.type() == this.type() &&
          data.unit() == this.unit() &&
          this.to() <= data.value() &&
          this.from() >= data.value()
        );
      },
      toString() {
        return `Time: ${this.time()}, Place: ${this.place()}, Type: ${this.type()}, To-From (unit): ${this.from()}-${this.to()} (${this.unit()})`;
      },
    },
    Event(),
    DataType()
  );
};
