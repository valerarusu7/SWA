import { PrecipitationPrediction } from "./PrecipitationPrediction";
import { TemperaturePrediction } from "./TemperaturePrediction";
import { WindPrediction } from "./WindPrediction";

export const WeatherForecast = (data = [], period = Date(0)) => {
  return Object.assign({
    data,
    period,
    getCurrentPlace() {
      return this.place();
    },
    setCurrentPlace(place_) {
      this.place = place_;
      return this;
    },
    clearCurrentPlace() {
      this.place = "";
      return this;
    },
    getCurrentType() {
      return this.type();
    },
    setCurrentType(type_) {
      this.type = type_;
      return this;
    },
    clearCurrentType() {
      this.type = "";
      return this;
    },
    getCurrentPeriod() {
      return this.period;
    },
    setCurrentPeriod(currentPeriod) {
      this.period = currentPeriod;
      return this;
    },
    clearCurrentPeriod() {
      this.period = new Date();
      return this;
    },
    add(data_) {
      this.data.push(data_);
    },
    data() {
      return this.data;
    },
    convertToUsUnits() {
      for (var i = 0; i < this.data.length; ++i) {
        if (this.data[i] instanceof TemperaturePrediction) {
          this.data[i].convertToF();
        }
        if (this.data[i] instanceof PrecipitationPrediction) {
          this.data[i].convertToInches();
        }
        if (this.data[i] instanceof WindPrediction) {
          this.data[i].convertToMPH();
        }
      }
    },
    convertToInternationalUnits() {
      for (var i = 0; i < this.data.length; ++i) {
        if (this.data[i] instanceof TemperaturePrediction) {
          this.data[i].convertToC();
        }
        if (this.data[i] instanceof PrecipitationPrediction) {
          this.data[i].convertToMM();
        }
        if (this.data[i] instanceof WindPrediction) {
          this.data[i].convertToMS();
        }
      }
    },
  });
};
