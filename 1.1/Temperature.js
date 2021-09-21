import { WeatherData } from "./WeatherData";

export const Temperature = () => {
  return Object.assign(
    {
      convertToF() {
        if (this.unit() == "C") {
          this.unit = "F";
          this.value *= 9.0 / 5;
          this.value += 32;
        }
      },

      convertToC() {
        if (this.unit() == "F") {
          this.unit = "C";
          this.value -= 32;
          this.value /= 9.0 / 5;
        }
      },
    },
    WeatherData()
  );
};
