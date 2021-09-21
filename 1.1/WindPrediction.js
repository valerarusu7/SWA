import { WeatherPrediction } from "./WeatherPrediction";

export const WindPrediction = (dirs) => {
  return Object.assign(
    {
      dirs,
      directions() {
        return this.dirs;
      },
      convertToMPH() {
        if (this.unit() == "MS") {
          this.unit = "MPH";
          this.from *= 2.237;
          this.to *= 2.237;
        }
      },
      convertToMS() {
        if (this.unit() == "MPH") {
          this.unit = "MS";
          this.from /= 2.237;
          this.to /= 2.237;
        }
      },
    },
    WeatherPrediction()
  );
};
