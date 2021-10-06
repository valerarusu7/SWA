const CloudCoverage = require("./CloudCoverage");
const CloudCoveragePrediction = require("./CloudCoveragePrediction");
const DateInterval = require("./DateInterval");
const Precipitation = require("./Precipitation");
const PrecipitationPrediction = require("./PrecipitationPrediction");
const Temperature = require("./Temperature");
const TemperaturePrediction = require("./TemperaturePrediction");
const WeatherForecast = require("./WeatherForecast");
const WeatherHistory = require("./WeatherHistory");
const Wind = require("./Wind");
const WindPrediction = require("./WindPrediction");

/* DateInterval */
console.log("---TEST--- DateInterval");
let dateInterval = new DateInterval(new Date(2018, 1), new Date(2025, 1));
console.log(`---dateInterval ${JSON.stringify(dateInterval)}`);
let currentDate = new Date();
console.log(
  `---dateInterval contains the current date (${new Date()}): ${dateInterval.contains(
    currentDate
  )}`
);
console.log();

/* Temperature & TemperaturePrediction */
console.log("---TEST--- Temperature & TemperaturePrediction");
let temperature = new Temperature(new Date(), "Horsens", "C", 18);
let temperaturePrediction = new TemperaturePrediction(
  new Date(),
  "Paris",
  "C",
  16,
  24
);
console.log(`---Temperature in Celsius: ${JSON.stringify(temperature)}`);
temperature.convertToF();
console.log(`---Temperature in Fahrenheit: ${JSON.stringify(temperature)}`);
console.log(
  `---TemperaturePrediction in Celsius: ${JSON.stringify(
    temperaturePrediction
  )}`
);
temperaturePrediction.convertToF();
console.log(
  `---TemperaturePrediction in Fahrenheit: ${JSON.stringify(
    temperaturePrediction
  )}`
);
console.log(
  `---Prediction match the real temperature? ${temperaturePrediction.matches(
    temperature
  )}`
);
console.log();

/* Weather History */
console.log("---TEST--- WeatherHistory");
let history = new WeatherHistory([
  new Temperature(new Date(), "Paris", "C", 17),
  new Wind(new Date(), "Paris", "m/s", 7, "south-west"),
  new Precipitation(new Date(), "Paris", "mm", 20, "Rain"),
  new CloudCoverage(new Date(), "Paris", "Okta", 3),
]);
console.log("---Current weather data in history:");
history.data().forEach((data) => {
  console.log(JSON.stringify(data));
});
history.convertToUSUnits();
console.log("---Converted to US units:");
history.data().forEach((data) => {
  console.log(JSON.stringify(data));
});
console.log();

/* Weather Forecast */
console.log("---TEST--- WeatherForecast");
let forecast = new WeatherForecast([
  new TemperaturePrediction(new Date(), "Paris", "C", 17, 22),
  new WindPrediction(new Date(), "Paris", "m/s", 2, 6, "south-west"),
  new PrecipitationPrediction(new Date(), "Paris", "mm", 20, 30, [
    "Rain",
    "Snow",
  ]),
  new CloudCoveragePrediction(new Date(), "Paris", "Okta", 3, 6),
]);
console.log("---Current weather data in forecast:");
forecast.data().forEach((data) => {
  console.log(JSON.stringify(data));
});
forecast.convertToUSUnits();
console.log("---Converted to US units:");
forecast.data().forEach((data) => {
  console.log(JSON.stringify(data));
});
