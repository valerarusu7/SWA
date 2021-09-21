import { WeatherData } from "./WeatherData";

export const Precipitation = (precipitationType) => {
  return Object.assign(
    {
      precipitationType,
      precipitationType() {
        return this.precipitationType;
      },
      convertToInches() {
        if (this.unit() == "MM") {
          this.unit = "INCH";
          this.value /= 25.4;
        }
      },
      convertToMM() {
        if (this.unit() === "MM") {
          this.unit = "INCH";
          this.value *= 25.4;
        }
      },
    },
    WeatherData()
  );
};
