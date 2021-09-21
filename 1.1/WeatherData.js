import { DataType } from "./DataType";
import { Event } from "./Event";

export const WeatherData = (value) => {
  return Object.assign(
    {
      value,
      value() {
        return this.value;
      },
      toString() {
        return `Time: ${this.time} , Place: ${this.place}, Type: ${this.type}, Unit: ${this.unit}`;
      },
    },
    Event(),
    DataType()
  );
};
