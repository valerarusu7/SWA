import { WeatherData } from "./WeatherData";

export const Wind = (direction_) => {
  return Object.assign(
    {
      direction_,
      direction() {
        return this.direction_;
      },
      convertToMPH() {
        if (this.unit() == "MS") {
          this.unit = "MPH";
          this.value *= 2.237;
        }
      },
      convertToMS() {
        if (this.unit() == "MPH") {
          this.unit = "MS";
          this.value /= 2.237;
        }
      },
    },
    WeatherData()
  );
};
