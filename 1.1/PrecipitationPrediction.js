import { WeatherPrediction } from "./WeatherPrediction";

export const PrecipitationPrediction = (typesPrecipitation) => {
  return Object.assign(
    {
      typesPrecipitation,
      typesPrecipitation() {
        return this.typesPrecipitation;
      },
      convertToInches() {
        if (this.unit() == "MM") {
          this.unit = "INCH";
          this.from /= 25.4;
          this.to /= 25.4;
        }
      },
      convertToMM() {
        if (this.unit() == "MM") {
          this.unit = "INCH";
          this.from *= 25.4;
          this.to *= 25.4;
        }
      },
    },
    WeatherPrediction()
  );
};
