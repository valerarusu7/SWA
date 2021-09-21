import { WeatherPrediction } from "./WeatherPrediction";

export const TemperaturePrediction = () => {
  return Object.assign(
    {
      convertToF() {
        if (this.unit() == "C") {
          this.unit = "F";
          this.from *= 9.0 / 5;
          this.from += 32;
          this.to *= 9.0 / 5;
          this.to += 32;
        }
      },
      convertToC() {
        if (this.unit() == "F") {
          this.unit = "C";
          this.from -= 32;
          this.from /= 9.0 / 5;
          this.to -= 32;
          this.to /= 9.0 / 5;
        }
      },
    },
    WeatherPrediction()
  );
};
